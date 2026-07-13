export const SYSTEM_DESIGN_ESSAY = {
  id: "system-design-ai-era",
  slug: "system-design",
  title: "System Design in the AI Era",
  subtitle: "How architecture evolved — and why it still decides who ships reliably",
  date: "2026-07-13",
  readingMinutes: 6,
  tags: ["System Design", "AI", "Architecture"] as const,
  href: "/writing/system-design",
  summary:
    "From monoliths to microservices to LLM-aware platforms — why system design still matters for new grads shipping real products, and how I apply it in CampfireChai, JobHuntOS, and production work.",
} as const;

export type ArchNode = {
  id: string;
  emoji: string;
  label: string;
  detail: string;
};

export type ArchLayer = {
  id: string;
  title: string;
  nodes: ArchNode[];
};

/** Interactive emoji architecture — AI-era request path */
export const AI_ERA_ARCHITECTURE: ArchLayer[] = [
  {
    id: "edge",
    title: "1 · Clients & Edge",
    nodes: [
      {
        id: "users",
        emoji: "👥",
        label: "Users",
        detail: "Web, mobile, extensions — every request starts here.",
      },
      {
        id: "cdn",
        emoji: "🌐",
        label: "CDN / Edge",
        detail: "Static assets + cache near the user for fast first paint.",
      },
      {
        id: "lb",
        emoji: "⚖️",
        label: "Load Balancer",
        detail: "Spreads traffic across healthy app instances (NGINX / cloud LB).",
      },
    ],
  },
  {
    id: "app",
    title: "2 · Application & AI plane",
    nodes: [
      {
        id: "api",
        emoji: "🔌",
        label: "API Gateway",
        detail: "Auth, rate limits, routing — one front door for services.",
      },
      {
        id: "services",
        emoji: "🧱",
        label: "Microservices",
        detail: "Domain services you own: jobs, trips, profiles, billing.",
      },
      {
        id: "llm",
        emoji: "🤖",
        label: "LLM Router",
        detail: "Multi-model orchestration with failover (Claude / Gemini / Groq).",
      },
    ],
  },
  {
    id: "data",
    title: "3 · Data & async",
    nodes: [
      {
        id: "cache",
        emoji: "⚡",
        label: "Cache",
        detail: "Hot reads (Redis) — cut latency before hitting the DB.",
      },
      {
        id: "db",
        emoji: "🗄️",
        label: "Primary DB",
        detail: "Source of truth — Postgres / Mongo with clear ownership.",
      },
      {
        id: "queue",
        emoji: "📬",
        label: "Queue / Workers",
        detail: "Background jobs, retries, and fan-out without blocking users.",
      },
    ],
  },
  {
    id: "ops",
    title: "4 · Observe & recover",
    nodes: [
      {
        id: "ci",
        emoji: "🚀",
        label: "CI / CD",
        detail: "Build → test → deploy. Shipping is part of the design.",
      },
      {
        id: "monitor",
        emoji: "📡",
        label: "Logging & APM",
        detail: "Metrics, traces, errors — you can't fix what you can't see.",
      },
      {
        id: "alert",
        emoji: "🚨",
        label: "Alerts",
        detail: "Page the right person before users feel the outage.",
      },
    ],
  },
] as const;

export const SYSTEM_DESIGN_SECTIONS = [
  {
    id: "why",
    heading: "Why I'm writing this",
    body: [
      "I'm not a principal architect. I'm a new grad who got early exposure to systems that served millions of requests a day, then spent the last year shipping my own products — CampfireChai, JobHuntOS, StudyGlobal, and Neocortex.",
      "Every time something broke (and things always break), the lesson was the same: cute demos don't survive traffic. System design is the difference between \"it works on my laptop\" and \"it still works at 2 a.m. when one dependency flakes.\"",
    ],
  },
  {
    id: "evolution",
    heading: "How system design evolved (in plain English)",
    body: [
      "Early web apps were often one big codebase talking to one database. That was fine — until releases blocked each other, one bug took the whole product down, and scaling meant buying a bigger box.",
      "Then we moved toward services: split domains, load balancers, caches, queues, and monitoring. The trade-off? More moving parts. You gain independent deployability and scale, but you inherit distributed failure modes — timeouts, partial outages, inconsistent reads.",
      "Cloud made that model default. CI/CD made shipping continuous. Observability stopped being optional. The \"architecture diagram\" stopped being a slide for interviews and became the map of how your product actually breathes.",
    ],
  },
  {
    id: "ai-era",
    heading: "What changed in the AI era",
    body: [
      "AI didn't replace system design — it added a new unreliable dependency in the hot path. An LLM call can be slow, expensive, rate-limited, or down. Prompt quality varies. Providers have different strengths (reasoning vs speed vs cost).",
      "So modern design asks new questions: Where do we put the model call? Do we stream? How do we fall back when Claude is throttled but Groq is fine? How do we keep secrets client-side (BYOK) while still shipping a product strangers can install?",
      "JobHuntOS forced me to answer those in production. Multi-LLM routing with failover isn't a buzzword there — it's how the Chrome extension stays useful when one provider hiccups. The architecture has to assume AI will fail gracefully, not perfectly.",
    ],
  },
  {
    id: "importance",
    heading: "Why it still matters for someone like me",
    body: [
      "Recruiters don't hire new grads to invent CAP theorem papers. They hire people who can reason about trade-offs: consistency vs latency, sync vs async, cache hit vs stale data, one service vs a tangle of five.",
      "At Cognizant-scale exposure I saw what 99.9% uptime feels like operationally. In CampfireChai I felt real-time coordination (Socket.io) meet product urgency. In StudyGlobal I cared about data shape for real users. System design is the thread connecting all of that.",
      "If you can sketch the request path — user → edge → API → service → cache/DB → queue → monitors — and explain one failure mode at each hop, you're already ahead of most tutorial portfolios.",
    ],
  },
  {
    id: "practice",
    heading: "How I practice it while shipping",
    body: [
      "Start from the user journey, not the buzzwords. Draw the path. Name ownership. Decide what must be sync vs what can wait in a queue.",
      "For AI features: isolate the LLM behind a router, set timeouts, log provider choice, and always have a degraded path (cached answer, simpler model, or honest \"try again\").",
      "Ship small, instrument early, and treat diagrams as living docs — update them when the product changes, not only before interviews.",
    ],
  },
] as const;

export const SYSTEM_DESIGN_TAKEAWAYS = [
  "System design evolved from monoliths → services → cloud platforms → AI-aware paths.",
  "AI adds latency, cost, and failure modes — design for failover, not demos.",
  "New grads win by explaining trade-offs with shipped proof, not jargon.",
  "If you can draw the path and name what breaks, you can grow into the role.",
] as const;
