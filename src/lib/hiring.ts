import { SITE, getRoleResumeDownload } from "./site";

export const LOOKING_FOR = [
  {
    id: "work",
    title: "What I value",
    items: [
      "Teams that ship real products and reliable services",
      "Ownership of meaningful problems, not busywork",
      "Mentorship and a culture of asking questions",
      "Ship-and-learn rhythm with strong engineering fundamentals",
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
      "Open to relocating anywhere in the US — remote or on-site",
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
    focus: "Building and operating scalable microservices under real production load",
    advantage:
      "2M+ daily requests at 99.9% uptime — P99 latency optimized from 250ms to 50ms on a hot path",
    stack: ["Java / Spring Boot", "Microservices", "PostgreSQL", "Docker"],
    companyTypes: ["Fintech & payments", "Cloud & API companies", "High-scale SaaS"],
    demand: "Highest volume",
    demandDetail: "Steady demand; distributed systems skills carry a pay premium",
    demandTrend: "High",
    resumeHref: getRoleResumeDownload("backend").href,
  },
  {
    id: "platform" as const,
    rank: 2,
    medal: "Infra",
    expertLabel: "CI/CD · Cloud · Deploy",
    title: "Platform Engineer",
    subtitle: "Infrastructure",
    focus: "CI/CD pipelines, cloud deploys, and the tooling other engineers build on",
    advantage:
      "AlgoChronicle push-to-publish pipeline, Cognizant Docker/CI workflows, and multi-app Vercel deploys — plus networks coursework (TCP/IP, BGP/OSPF)",
    stack: ["GitHub Actions", "Docker", "AWS", "Azure DevOps"],
    companyTypes: ["Developer tools", "Cloud-native startups", "Platform & infra teams"],
    demand: "Fastest growing",
    demandDetail: "IDP and platform engineering expanding across large orgs",
    demandTrend: "Rising",
    resumeHref: getRoleResumeDownload("platform").href,
  },
  {
    id: "ai" as const,
    rank: 3,
    medal: "LLM",
    expertLabel: "Orchestration · Streaming",
    title: "AI Engineer",
    subtitle: "LLM Integration",
    focus: "Production AI systems with multi-model orchestration and graceful failover",
    advantage:
      "JobHuntOS on the Chrome Web Store — multi-LLM routing with SSE streaming across 100+ ATS formats",
    stack: ["Claude API", "Gemini API", "Groq API", "SSE", "FastAPI"],
    companyTypes: ["AI product teams", "LLM platforms", "ML infrastructure"],
    demand: "High growth",
    demandDetail: "Strong demand; crowded for new grads — best for AI-specific roles",
    demandTrend: "Rising",
    resumeHref: getRoleResumeDownload("ai").href,
  },
  {
    id: "fullstack" as const,
    rank: 4,
    medal: "Ship",
    expertLabel: "End-to-end · Product",
    title: "Full-Stack Engineer",
    subtitle: "Startup-Focused",
    focus: "Ship complete products end-to-end — concept to production",
    advantage:
      "6 shipped applications including CampfireChai (live), JobHuntOS (Chrome Store), and AlgoChronicle (live)",
    stack: ["React 19", "Next.js", "Node.js", "MongoDB", "Realtime"],
    companyTypes: ["Series A/B startups", "0→1 product teams", "Founding engineer roles"],
    demand: "Stable volume",
    demandDetail: "Most openings; lower ceiling than backend/platform specialization",
    demandTrend: "Stable",
    resumeHref: getRoleResumeDownload("fullstack").href,
  },
] as const;

export type RoleStrategyId = (typeof ROLE_STRATEGY)[number]["id"];

export const ROLE_STRATEGY_WHY =
  "One engineer, four depths — ranked by market fit and my proof set. Backend and platform are primary; AI and full-stack are strong secondary tracks for the right team.";

export const ROLE_WHY_HIRE = [
  {
    id: "backend" as const,
    title: "Backend Engineer",
    bullets: [
      "I've contributed on production systems serving 2M+ requests/day at 99.9% uptime — real load, not demo traffic.",
      "I optimized a bottleneck query from P99 ~250ms to ~50ms under high traffic — I care about latency, not just features.",
      "MS coursework in distributed systems and computer networks backs the production experience with theory.",
    ],
  },
  {
    id: "platform" as const,
    title: "Platform Engineer",
    bullets: [
      "I built AlgoChronicle's push-to-publish pipeline — GitHub Actions → Firestore → live site with zero manual steps.",
      "At Cognizant I supported Docker deployments and Azure DevOps CI/CD across dev, staging, and production.",
      "Networks coursework (TCP/IP, BGP/OSPF) plus cloud deploy experience gives me a rare full-stack-to-infra bridge.",
    ],
  },
  {
    id: "ai" as const,
    title: "AI Engineer",
    bullets: [
      "I shipped JobHuntOS to the Chrome Web Store with multi-provider LLM routing and automatic failover.",
      "I've integrated Claude, Gemini, and Groq — provider trade-offs, cost awareness, and graceful degradation.",
      "Neocortex extends this with 15 agents and a 6-provider chain — best fit for AI product teams, not research labs.",
    ],
  },
  {
    id: "fullstack" as const,
    title: "Full-Stack Engineer",
    bullets: [
      "I ship products end-to-end: UI, API, data model, and deploy — not just components.",
      "Live products: CampfireChai, JobHuntOS, AlgoChronicle, StudyGlobal — plus Neocortex in progress.",
      "WalletGyde internship: 35% engagement ↑ and 40% faster transactions while finishing my Master's.",
    ],
  },
] as const;

export const ROLE_FIT = [
  {
    id: "backend" as const,
    title: "Backend Engineer",
    heading: "Why I'm your fit",
    experience: "Spring Boot microservices at 2M+ req/day · 99.9% uptime · on-call discipline",
    proof: "Cognizant production APIs · P99 latency optimization · Node/FastAPI backends on side projects",
    know: "REST design, indexing, caching, microservices patterns, reliability under load",
    example:
      "On a Cognizant service path I helped optimize a bottleneck query, improving P99 latency from ~250ms to ~50ms under high traffic.",
  },
  {
    id: "platform" as const,
    title: "Platform Engineer",
    heading: "Why I'm your fit",
    experience: "CI/CD at Cognizant · automated deploy pipelines on AlgoChronicle and live apps",
    proof: "GitHub Actions → Firestore sync · Docker deployments · Azure DevOps integration (20% productivity ↑)",
    know: "CI/CD, Docker, cloud deploys, observability concepts, networks fundamentals (TCP/IP, routing)",
    example:
      "AlgoChronicle: push a dayXXX folder to GitHub and the live site updates automatically — Actions parse READMEs, sync Firestore, and refresh streaks with no manual step.",
  },
  {
    id: "ai" as const,
    title: "AI Engineer",
    heading: "Why I'm your fit",
    experience: "JobHuntOS on the Chrome Web Store with multi-LLM orchestration",
    proof: "Claude / Gemini / Groq routing · SSE streaming · Neocortex 15-agent system",
    know: "LLM routing, fallback logic, cost-aware provider choice, streaming API design",
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
      label: "Backend + distributed systems",
      detail: "Highest job volume among high-paying SWE roles; specialization beats generic Java/React",
    },
    {
      id: "platform",
      label: "Platform / infra",
      detail: "Fastest-growing track — IDP teams expanding at large orgs in 2026",
    },
    {
      id: "ai",
      label: "AI / LLM integration",
      detail: "High demand for production AI; crowded for new grads unless role is AI-specific",
    },
    {
      id: "fullstack",
      label: "Full-Stack",
      detail: "Most openings; best for early-stage startups where ownership beats specialization",
    },
  ],
  competitive: [
    "Production scale (2M+ req/day) — most new grads don't have this",
    "System design + networks coursework — depth beyond typical full-stack portfolios",
    "Full-stack shipping proof — six featured apps, not tutorial clones",
    "LLM product shipped (JobHuntOS) — real product constraints, not demos",
    "4.0 MS GPA while building in public — consistency and discipline",
  ],
} as const;

/** Capability highlights — used by legacy OpenToWork section */
export const VALUE_PROPS = [
  {
    id: "system-design",
    icon: "⚙️",
    title: "System design at scale",
    description:
      "Contributed on production systems at 2M+ requests/day with 99.9% uptime — real load, not demo traffic.",
    example: "P99 latency optimization from ~250ms to ~50ms on a high-traffic service path.",
  },
  {
    id: "fullstack",
    icon: "◈",
    title: "Full-stack shipping",
    description:
      "Six featured apps from UI through API, data model, and deploy — CampfireChai, JobHuntOS, AlgoChronicle, and more.",
    example: "WalletGyde internship: 35% engagement ↑ and 40% faster transactions.",
  },
  {
    id: "networking",
    icon: "☁️",
    title: "Networking & systems",
    description:
      "MS coursework in TCP/IP, BGP/OSPF plus CI/CD and cloud deploy work on live products.",
    example: "AlgoChronicle push-to-publish: GitHub Actions → Firestore → live site.",
  },
] as const;

export const RECRUITER_LINKS = [
  { id: "resume", label: "Resume", sublabel: "View / print PDF", href: SITE.resumeUrl, icon: "📄", external: false },
  { id: "linkedin", label: "LinkedIn", sublabel: "Professional profile", href: SITE.linkedin, icon: "💼", external: true },
  { id: "github", label: "GitHub", sublabel: "Code samples", href: SITE.github, icon: "🔗", external: true },
  { id: "email", label: "Email", sublabel: "Direct contact", href: `mailto:${SITE.email}`, icon: "📧", external: false },
  { id: "chat", label: "Let's Talk", sublabel: "Chat or schedule a call", icon: "💬", action: "contact" as const },
] as const;
