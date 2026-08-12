import { SITE, getRoleResumeDownload } from "./site";

export const LOOKING_FOR = [
  {
    id: "role",
    title: "What I'm looking for",
    items: [
      "Software Engineer — new grad / entry-level",
      "Teams that ship APIs, products, and LLM features",
      "Mentorship and a culture of asking questions",
      "Ownership of real problems, not busywork",
    ],
  },
  {
    id: "culture",
    title: "Team & culture",
    items: [
      "Engineers who mentor and pair",
      "Psychological safety to ask questions",
      "Ship-and-learn rhythm (not hero culture)",
      "Diverse, collaborative teams",
    ],
  },
  {
    id: "location",
    title: "Logistics",
    items: [
      `Graduating ${SITE.gradDate} · available to start after`,
      "United States · STEM OPT (36 months)",
      "No immediate sponsorship required",
      "Remote or on-site — open to relocating",
    ],
  },
] as const;

export const ROLE_STRATEGY = [
  {
    id: "backend" as const,
    rank: 1,
    medal: "Scale",
    expertLabel: "Reliability · APIs",
    title: "Backend Engineer",
    subtitle: "Distributed Systems",
    focus: "Building scalable microservices and operating them under load",
    advantage: "2M+ daily requests at 99.9% uptime — proven production exposure",
    stack: ["Java / Spring Boot", "Microservices", "AWS", "Docker"],
    companyTypes: ["Payments infra", "Fintech platforms", "Cloud & API companies"],
    demand: "High demand",
    demandDetail: "Fintech, cloud, AI infrastructure",
    demandTrend: "High",
    resumeHref: getRoleResumeDownload("backend").href,
  },
  {
    id: "ai" as const,
    rank: 2,
    medal: "LLM",
    expertLabel: "Orchestration · Streaming",
    title: "AI Engineer",
    subtitle: "LLM Integration",
    focus: "Production AI systems with multi-model orchestration",
    advantage:
      "JobHuntOS on the Chrome Web Store — multi-LLM routing with intelligent failover across 100+ job board formats",
    stack: ["Claude API", "Gemini API", "Groq API", "Prompt Eng", "SSE"],
    companyTypes: ["LLM platforms", "AI product teams", "ML infrastructure"],
    demand: "High growth",
    demandDetail: "Strong demand for shipping AI in product",
    demandTrend: "Rising",
    resumeHref: getRoleResumeDownload("ai").href,
  },
  {
    id: "fullstack" as const,
    rank: 3,
    medal: "Ship",
    expertLabel: "End-to-end · Product",
    title: "Full-Stack Engineer",
    subtitle: "Startup-Focused",
    focus: "Ship complete products end-to-end — concept to production",
    advantage:
      "6 shipped applications: CampfireChai (live), JobHuntOS (Chrome Store), AlgoChronicle (live), StudyGlobal (beta), Neocortex (in progress)",
    stack: ["React 19", "Next.js", "Node.js", "MongoDB", "Realtime"],
    companyTypes: ["Series A/B startups", "Product-led SaaS", "0→1 product teams"],
    demand: "Stable demand",
    demandDetail: "Startups value shipping speed",
    demandTrend: "Stable",
    resumeHref: getRoleResumeDownload("fullstack").href,
  },
] as const;

export type RoleStrategyId = (typeof ROLE_STRATEGY)[number]["id"];

export const ROLE_STRATEGY_WHY =
  "One engineer, three depths — scale, AI systems, and end-to-end shipping. Same proof set; pick the resume that matches your open role.";

export const ROLE_WHY_HIRE = [
  {
    id: "backend" as const,
    title: "Backend Engineer",
    bullets: [
      "I've contributed on production systems serving 2M+ requests/day at 99.9% uptime — real load, not demo traffic.",
      "I care about reliability fundamentals: API design, database optimization, monitoring, and deploy discipline.",
      "I combine that foundation with modern Node/Python backends I ship myself on personal products.",
    ],
  },
  {
    id: "ai" as const,
    title: "AI Engineer",
    bullets: [
      "I didn't just use LLMs — I shipped JobHuntOS to the Chrome Web Store with multi-provider routing.",
      "I've integrated Claude, Gemini, and Groq — provider trade-offs, cost awareness, and failover.",
      "My systems degrade gracefully when a provider fails — production reliability, not demo code.",
    ],
  },
  {
    id: "fullstack" as const,
    title: "Full-Stack Engineer",
    bullets: [
      "I ship products end-to-end: UI, API, data model, and deploy — not just components.",
      "Featured live products: CampfireChai, JobHuntOS, AlgoChronicle, StudyGlobal — plus Neocortex in progress.",
      "Recent internship impact at WalletGyde: 35% engagement ↑ and 40% faster transactions.",
    ],
  },
] as const;

export const ROLE_FIT = [
  {
    id: "backend" as const,
    title: "Backend Engineer",
    heading: "Why I'm your fit",
    experience: "Contributed on Spring Boot microservices at 2M+ req/day · 99.9% uptime",
    proof: "Cognizant production APIs · AlgoChronicle CI/CD pipeline · Node/FastAPI backends",
    know: "REST design, indexing, Docker/CI, caching concepts, reliability habits",
    example:
      "On a Cognizant service path I helped optimize a bottleneck query, improving P99 latency from ~250ms to ~50ms under high traffic.",
  },
  {
    id: "ai" as const,
    title: "AI Engineer",
    heading: "Why I'm your fit",
    experience: "JobHuntOS on the Chrome Web Store with multi-LLM orchestration",
    proof: "Claude / Gemini / Groq routing · SSE streaming · Neocortex multi-agent work",
    know: "LLM routing, fallback logic, cost-aware provider choice, provider failure handling",
    example:
      "JobHuntOS routes between Claude (reasoning), Gemini (analysis), and Groq (speed) with automatic failover if a provider fails.",
  },
  {
    id: "fullstack" as const,
    title: "Full-Stack Engineer",
    heading: "Why I'm your fit",
    experience: "6 featured applications from concept toward production",
    proof: "CampfireChai (live), JobHuntOS (Chrome Store), AlgoChronicle (live), StudyGlobal (beta)",
    know: "Rapid prototyping, database design, real-time systems, deployment automation",
    example:
      "I built CampfireChai end-to-end: React 19 frontend, Node.js backend, Socket.io real-time, deployed on Vercel.",
  },
] as const;

export const MARKET_POSITION = {
  reality: [
    {
      id: "backend",
      label: "Backend roles",
      detail: "Steady demand across fintech, cloud, and API infrastructure",
    },
    {
      id: "ai",
      label: "AI roles",
      detail: "High demand for engineers who ship LLM features into real products",
    },
    {
      id: "fullstack",
      label: "Full-Stack",
      detail: "Stable demand — startups value shipping speed and ownership",
    },
  ],
  competitive: [
    "Production scale experience (2M+ req/day) — most new grads don't have this",
    "AI/LLM expertise with a shipped product — rare at this experience level",
    "System design teaching — signals deep understanding + communication skills",
    "4.0 MS GPA — consistency + discipline",
    "Full-stack depth — can architect and implement across the entire stack",
  ],
} as const;

/** Kept for OpenToWork / legacy — now role-aligned */
export const VALUE_PROPS = ROLE_WHY_HIRE.map((role) => ({
  id: role.id,
  icon: role.id === "backend" ? "⚙️" : role.id === "ai" ? "✦" : "◈",
  title: role.title,
  description: role.bullets[0],
  example: role.bullets[1],
}));

export const RECRUITER_LINKS = [
  { id: "resume", label: "Resume", sublabel: "View / print PDF", href: SITE.resumeUrl, icon: "📄", external: false },
  { id: "linkedin", label: "LinkedIn", sublabel: "Professional profile", href: SITE.linkedin, icon: "💼", external: true },
  { id: "github", label: "GitHub", sublabel: "Code samples", href: SITE.github, icon: "🔗", external: true },
  { id: "email", label: "Email", sublabel: "Direct contact", href: `mailto:${SITE.email}`, icon: "📧", external: false },
  { id: "chat", label: "Let's Talk", sublabel: "Chat or schedule a call", icon: "💬", action: "contact" as const },
] as const;
