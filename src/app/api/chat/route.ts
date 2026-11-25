import { NextResponse } from "next/server";
import type { VisitorType } from "@/lib/avatar-chat";
import { SYSTEM_PROMPT, audienceNote, getFallbackResponse } from "@/lib/avatar-chat-server";
import { askProviders } from "@/lib/avatar-providers";

export const maxDuration = 40;

interface ChatRequestBody {
  messages: { role: "user" | "assistant"; content: string }[];
  visitorType?: VisitorType;
}

const MAX_BODY_BYTES = 32_000;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 2_000;

/** Best-effort per-IP limit (per server instance) so the chat can't be used to run up the bill. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 25;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function isValidMessage(value: unknown): value is ChatRequestBody["messages"][number] {
  if (!value || typeof value !== "object") return false;
  const message = value as { role?: unknown; content?: unknown };
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= MAX_MESSAGE_CHARS
  );
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  let body: Partial<ChatRequestBody>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { messages, visitorType = "visitor" } = body;
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > MAX_MESSAGES ||
    !messages.every(isValidMessage)
  ) {
    return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
  }
  if (visitorType !== "visitor" && visitorType !== "recruiter") {
    return NextResponse.json({ error: "Invalid visitor type" }, { status: 400 });
  }

  // The conversation must open with the visitor: drop the widget's greeting and anything before
  // the first question.
  const firstUser = messages.findIndex((m) => m.role === "user");
  const conversation = firstUser === -1 ? [] : messages.slice(firstUser);
  const lastUser = [...conversation].reverse().find((m) => m.role === "user");
  if (!lastUser) {
    return NextResponse.json({ error: "User message required" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        error: "rate_limited",
        content: `That's a lot of questions! Give it a few minutes, or reach Srujan directly through [Contact](/#contact).`,
      },
      { status: 429 }
    );
  }

  const offline = () =>
    NextResponse.json({ content: getFallbackResponse(lastUser.content, visitorType), fallback: true });

  const answer = await askProviders([SYSTEM_PROMPT, audienceNote(visitorType)], conversation);
  if (!answer) return offline();
  return NextResponse.json({ content: answer.text, fallback: false, provider: answer.provider });
}
