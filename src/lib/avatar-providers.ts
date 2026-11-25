import Anthropic from "@anthropic-ai/sdk";

/**
 * The avatar tries providers in order: free tiers first (Gemini, Groq, OpenRouter, Cohere,
 * Together), then a small paid Claude model. A provider is skipped when its key is missing, and benched for a minute after
 * it reports a rate or quota limit, so visitors don't wait on a provider that is out of tokens.
 */

export type ChatTurn = { role: "user" | "assistant"; content: string };

export interface ProviderResult {
  provider: string;
  text: string;
}

interface Provider {
  name: string;
  enabled: () => boolean;
  call: (system: string[], messages: ChatTurn[]) => Promise<string>;
}

class LimitError extends Error {}

const BENCH_MS = 60_000;
const FREE_BUDGET_MS = 25_000;
const benchedUntil = new Map<string, number>();

/** Gemini and Groq both speak the OpenAI chat-completions format. */
async function openAICompatible(
  url: string,
  key: string,
  model: string,
  system: string[],
  messages: ChatTurn[],
  timeoutMs: number
): Promise<string> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      temperature: 0.4,
      messages: [{ role: "system", content: system.join("\n\n") }, ...messages],
    }),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (res.status === 429) throw new LimitError(`429 from ${url}`);
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 300)}`);
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ timeout: 12_000, maxRetries: 0 })
  : null;

/** Free (or free-tier) OpenAI-compatible providers, tried in this order. Models are overridable by env. */
const OPENAI_COMPATIBLE: { name: string; url: string; keyEnv: string; modelEnv: string; model: string }[] = [
  {
    name: "gemini",
    url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
    keyEnv: "GEMINI_API_KEY",
    modelEnv: "GEMINI_MODEL",
    model: "gemini-2.5-flash",
  },
  {
    name: "groq",
    url: "https://api.groq.com/openai/v1/chat/completions",
    keyEnv: "GROQ_API_KEY",
    modelEnv: "GROQ_MODEL",
    model: "llama-3.3-70b-versatile",
  },
  {
    name: "openrouter",
    url: "https://openrouter.ai/api/v1/chat/completions",
    keyEnv: "OPENROUTER_API_KEY",
    modelEnv: "OPENROUTER_MODEL",
    model: "meta-llama/llama-3.3-70b-instruct:free",
  },
  {
    name: "cohere",
    url: "https://api.cohere.ai/compatibility/v1/chat/completions",
    keyEnv: "COHERE_API_KEY",
    modelEnv: "COHERE_MODEL",
    model: "command-a-03-2025",
  },
  {
    name: "together",
    url: "https://api.together.xyz/v1/chat/completions",
    keyEnv: "TOGETHER_API_KEY",
    modelEnv: "TOGETHER_MODEL",
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
  },
];

const PROVIDERS: Provider[] = [
  ...OPENAI_COMPATIBLE.map(
    (p): Provider => ({
      name: p.name,
      enabled: () => Boolean(process.env[p.keyEnv]),
      call: (system, messages) =>
        openAICompatible(p.url, process.env[p.keyEnv]!, process.env[p.modelEnv] || p.model, system, messages, 9_000),
    })
  ),
  {
    name: "anthropic",
    enabled: () => anthropic !== null,
    call: async (system, messages) => {
      try {
        const response = await anthropic!.messages.create({
          model: process.env.ANTHROPIC_MODEL || "claude-haiku-5-5",
          max_tokens: 1024,
          system: [
            // The profile is identical on every request, so it is cached (cheaper repeat reads).
            { type: "text", text: system[0], cache_control: { type: "ephemeral" } },
            ...system.slice(1).map((text) => ({ type: "text" as const, text })),
          ],
          messages,
        });
        if (response.stop_reason === "refusal") return "";
        return response.content
          .flatMap((block) => (block.type === "text" ? [block.text] : []))
          .join("")
          .trim();
      } catch (error) {
        if (error instanceof Anthropic.RateLimitError) throw new LimitError("anthropic rate limit");
        throw error;
      }
    },
  },
];

/** Returns the first non-empty answer, or null when every provider is unavailable. */
export async function askProviders(system: string[], messages: ChatTurn[]): Promise<ProviderResult | null> {
  const started = Date.now();
  for (const provider of PROVIDERS) {
    if (!provider.enabled()) continue;
    // After 25s of free-tier failures, go straight to Claude so the request still finishes in time.
    if (provider.name !== "anthropic" && Date.now() - started > FREE_BUDGET_MS) continue;
    if ((benchedUntil.get(provider.name) ?? 0) > Date.now()) continue;
    try {
      const text = await provider.call(system, messages);
      if (text) return { provider: provider.name, text };
    } catch (error) {
      if (error instanceof LimitError) benchedUntil.set(provider.name, Date.now() + BENCH_MS);
      console.error(`Avatar chat: ${provider.name} failed —`, error instanceof Error ? error.message : error);
    }
  }
  return null;
}
