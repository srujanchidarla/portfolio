import { ROLE_RESUMES, SITE } from "./site";

export const LOOKING_FOR = [
  {
    id: "role",
    title: "What I'm looking for",
    items: [
      "Backend Engineer — distributed systems & scale",
      "AI Engineer — LLM integration & multi-model systems",
      "Full-Stack Engineer — startup shipping speed",
      "New grad / entry-level with mentorship",
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
    medal: "1",
    expertLabel: "Scale Expert",
    title: "Backend Engineer",
    subtitle: "Distributed Systems",
    focus: "Building scalable microservices at massive scale",
    advantage: "2M+ daily requests at 99.9% uptime — proven production exposure",
    stack: ["Java / Spring Boot", "Microservices", "AWS", "Kubernetes"],
    companyTypes: ["Payments infra", "Fintech platforms", "Cloud & API companies"],
    demand: "High demand",
    demandDetail: "Fintech, cloud, AI infrastructure",
    demandTrend: "High",
    resumeHref: ROLE_RESUMES.backend.href,
  },
  {
    id: "ai" as const,
    rank: 2,
    medal: "2",
    expertLabel: "LLM Expert",
    title: "AI Engineer",
    subtitle: "LLM Integration",
    focus: "Production AI systems with multi-model orchestration",
    advantage:
      "JobHuntOS on the Chrome Web Store — multi-LLM routing with intelligent failover across 100+ job board formats",
    stack: ["Claude API", "Gemini API", "Groq API", "Prompt Eng", "RAG"],
    companyTypes: ["LLM platforms", "AI product teams", "ML infrastructure"],
    demand: "Explosive growth",
    demandDetail: "163–414% YoY · 3.4 open roles per candidate",
    demandTrend: "163–414% YoY",
    resumeHref: ROLE_RESUMES.ai.href,
  },
  {
    id: "fullstack" as const,
    rank: 3,
    medal: "3",
    expertLabel: "Shipping Expert",
    title: "Full-Stack Engineer",
    subtitle: "Startup-Focused",
    focus: "Ship complete products end-to-end — concept to production",
    advantage:
      "5 shipped applications: CampfireChai (live), JobHuntOS (Chrome Store), StudyGlobal (beta), Neocortex (in progress)",
    stack: ["React 19", "Next.js", "Node.js", "MongoDB", "Realtime"],
    companyTypes: ["Series A/B startups", "Product-led SaaS", "0→1 product teams"],
    demand: "Stable demand",
    demandDetail: "Startups value shipping speed",
    demandTrend: "Stable",
    resumeHref: ROLE_RESUMES.fullstack.href,
  },
] as const;

export type RoleStrategyId = (typeof ROLE_STRATEGY)[number]["id"];

export const ROLE_STRATEGY_WHY =
  "These roles match where the market is hiring and align with my strongest proof — scale, AI systems, and shipping products end-to-end.";

export const ROLE_WHY_HIRE = [
  {
    id: "backend" as const,
    title: "Backend Engineer",
    bullets: [
      "I've operated at 2M+ requests daily. Most engineers haven't. That's rare.",
      "I understand the full stack of reliability: microservices design, database optimization, circuit breakers, monitoring, deployment automation.",
      "I teach system design — deep understanding, not surface level.",
    ],
  },
  {
    id: "ai" as const,
    title: "AI Engineer",
    bullets: [
      "I didn't just use LLMs. I shipped JobHuntOS to the Chrome Web Store handling real user workloads.",
      "I've integrated Claude, Gemini, and Groq — understanding trade-offs between providers, cost optimization, and intelligent routing.",
      "My system handles multi-model failures gracefully — production reliability, not demo code.",
    ],
  },
  {
    id: "fullstack" as const,
    title: "Full-Stack Engineer",
    bullets: [
      "I ship products. Not components. Not boilerplate. End-to-end: from architecture to deployment.",
      "5 production applications deployed and live. CampfireChai has real-time coordination. StudyGlobal is a live beta for international students.",
      "I understand the full stack deeply: frontend responsiveness, backend optimization, database design, deployment automation.",
    ],
  },
] as const;

export const ROLE_FIT = [
  {
    id: "backend" as const,
    title: "Backend Engineer",
    heading: "Why I'm your fit",
    experience: "2M+ req/day at 99.9% uptime for 500+ enterprise users",
    proof: "Spring Boot microservices at Cognizant, system design teaching",
    know: "Scaling databases, distributed cache, microservices patterns, CI/CD",
    example:
      "At Cognizant, I optimized a bottleneck query reducing P99 latency from 250ms to 50ms affecting 2M daily users.",
  },
  {
    id: "ai" as const,
    title: "AI Engineer",
    heading: "Why I'm your fit",
    experience: "JobHuntOS deployed to Chrome Web Store with multi-LLM orchestration",
    proof: "Claude / Gemini / Groq integration, prompt engineering, streaming APIs",
    know: "LLM routing, fallback logic, cost optimization, handling provider failures",
    example:
      "JobHuntOS intelligently routes requests between Claude (reasoning), Gemini (analysis), and Groq (speed) with automatic failover if one provider fails.",
  },
  {
    id: "fullstack" as const,
    title: "Full-Stack Engineer",
    heading: "Why I'm your fit",
    experience: "5 production applications from concept to deployment",
    proof: "CampfireChai (live), JobHuntOS (Chrome Web Store), StudyGlobal (live beta)",
    know: "Rapid prototyping, database design, real-time systems, deployment automation",
    example:
      "I built CampfireChai full-stack in 2 months: React 19 frontend, Node.js backend, Socket.io real-time, deployed on Vercel.",
  },
] as const;

export const MARKET_POSITION = {
  reality: [
    {
      id: "backend",
      label: "Backend roles",
      detail: "High demand across fintech, cloud, and API infrastructure",
    },
    {
      id: "ai",
      label: "AI roles",
      detail: "Explosive growth — 3.4 open roles per qualified candidate",
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
  { id: "resume", label: "Resume", sublabel: "Download PDF", href: SITE.resumeUrl, icon: "📄", external: true },
  { id: "linkedin", label: "LinkedIn", sublabel: "Professional profile", href: SITE.linkedin, icon: "💼", external: true },
  { id: "github", label: "GitHub", sublabel: "Code samples", href: SITE.github, icon: "🔗", external: true },
  { id: "email", label: "Email", sublabel: "Direct contact", href: `mailto:${SITE.email}`, icon: "📧", external: false },
  { id: "chat", label: "Let's Talk", sublabel: "Chat or schedule a call", icon: "💬", action: "contact" as const },
] as const;
