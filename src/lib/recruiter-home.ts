import { SITE } from "./site";

export const HERO_METRICS = {
  gpa: 4.0,
  projectsShipped: 6,
  dailyRequests: 2_000_000,
} as const;

/** How I actually work — not a role picker */
export const PROOF_CARDS = [
  {
    id: "backend",
    label: "In production",
    headline: "Systems at 2M+ req/day",
    subline: "APIs · reliability · databases",
    detail:
      "At Cognizant I contributed to Spring Boot microservices on a platform serving 500+ enterprise users at 99.9% uptime and ~2M+ requests/day — learning what production reliability, query optimization, and shipping under load actually feel like.",
    metrics: ["2M+ req/day", "99.9% uptime", "Spring Boot", "Docker / CI"],
    color: "#34d399",
    icon: "scale",
  },
  {
    id: "ai",
    label: "With models",
    headline: "LLM features in real products",
    subline: "Routing · streaming · failover",
    detail:
      "JobHuntOS routes Claude, Gemini, and Groq with SSE streaming and graceful provider failover — live on the Chrome Web Store. Neocortex pushes further with 15 agents and a 6-provider chain.",
    metrics: ["JobHuntOS live", "Multi-LLM routing", "SSE streaming", "FastAPI agents"],
    color: "#8b5cf6",
    icon: "impact",
  },
  {
    id: "fullstack",
    label: "Shipped",
    headline: "Products from idea to deploy",
    subline: "UI · API · data · launch",
    detail:
      "CampfireChai, AlgoChronicle, StudyGlobal, JobHuntOS — complete UIs, APIs, data models, and deploys. WalletGyde internship: 35% engagement ↑ and 40% faster transactions while finishing my Master's.",
    metrics: ["6 featured apps", "CampfireChai live", "35% engagement ↑", "Chrome Store"],
    color: "#f97316",
    icon: "person",
  },
] as const;

export const IMPACT_PROJECTS = [
  {
    id: "neocortex",
    title: "Neocortex",
    subtitle: "Jarvis Life OS",
    tag: "AI · Multi-Agent · In progress",
    role: "Solo engineer · product, architecture, backend, and UI",
    lanes: ["AI", "Backend"],
    journey: "Most ambitious — learning new tech at scale",
    problem:
      "My day spans fitness, job search, DSA practice, and deep work — but every tool lives in a different app.",
    solution:
      "A local-first life OS: FastAPI backend with 15 specialized agents, Next.js command center, Expo mobile HUD, and a 6-provider LLM failover chain.",
    learned:
      "Ambitious scope is fine if you break it into agents. I learned Python/FastAPI deeply, multi-agent orchestration, and how to stay disciplined on a long-running side project.",
    result: "15 agents orchestrated",
    resultDetail: "Jarvis, Stark, Hercules, Turing, Cicero — each agent owns one domain of my life.",
    stack: ["FastAPI", "Python", "Next.js", "Expo", "SQLite", "n8n", "Groq", "Gemini"],
    color: "#8b5cf6",
    href: "https://github.com/srujanchidarla/neocortex",
  },
  {
    id: "jobhuntos",
    title: "JobHuntOS",
    tag: "AI · Chrome Extension",
    role: "Solo engineer · extension, LLM routing, and product delivery",
    lanes: ["AI", "Full-Stack"],
    previewImage: "/project-previews/jobhuntos.jpg",
    journey: "First product in the Chrome Web Store",
    problem:
      "Job applications take hours — tailoring resumes, fighting ATS forms, hunting recruiters.",
    solution:
      "MV3 Chrome extension with BYOK LLM routing, streaming fit analysis, resume export, and smart autofill.",
    learned:
      "Browser extension architecture (MV3), streaming APIs, and shipping a product strangers actually install. Small scope, real users.",
    result: "Live on Chrome Web Store",
    resultDetail: "~2 min per application across LinkedIn, Greenhouse, Workday, Lever & more.",
    stack: ["Chrome MV3", "Node.js", "SSE", "LLM Router"],
    color: "#6366f1",
    href: "https://chromewebstore.google.com/detail/jobhuntos/cmdfelnbelngbjahjeglfkaoeclcnjec",
    liveHref: "https://job-hunt-os-eosin.vercel.app/",
  },
  {
    id: "campfirechai",
    title: "CampfireChai",
    tag: "Community · Full-Stack · Live",
    role: "Solo full-stack engineer · product through deployment",
    lanes: ["Full-Stack", "Backend"],
    previewImage: "/project-previews/campfirechai.png",
    journey: "First full-stack app shipped to real users",
    problem:
      "Desi outdoor groups in the US had no single place for trips, permits, carpools, and crew matching.",
    solution:
      "Full-stack monorepo: React 19 + Vite frontend, Express 5 + MongoDB API, Socket.io real-time chat, and AI trip drafts — live on Vercel.",
    learned:
      "How to ship end-to-end: database design, real-time features, deployment, and iterating from user feedback. This taught me production full-stack ownership.",
    result: "Live on Vercel",
    resultDetail: "15+ metro hubs, real-time trip coordination, and Magic Paste AI drafting.",
    stack: ["React 19", "Node.js", "Express", "MongoDB", "Socket.io", "Vite"],
    color: "#f59e0b",
    href: "https://github.com/srujanchidarla/CampfireChai",
    liveHref: "https://campfire-chai.vercel.app/",
  },
  {
    id: "algochronicle",
    title: "AlgoChronicle",
    tag: "DSA · Automation · Live",
    role: "Solo engineer · automation, data pipeline, and frontend",
    lanes: ["Backend", "Full-Stack"],
    journey: "Turning GitHub commits into a self-updating coding journal",
    problem:
      "DSA practice is easy to start and hard to sustain — manual logging breaks streaks and progress gets lost across platforms.",
    solution:
      "Automated DSA tracker: push a `dayXXX_*` folder to dsa-problems, GitHub Actions syncs to Firestore, and AlgoChronicle updates with streaks, stats, and revision views.",
    learned:
      "CI/CD automation end-to-end, parsing structured READMEs in Actions, Firebase admin on Vercel, and building a product I'd actually use daily for interview prep.",
    result: "Live on Vercel",
    resultDetail:
      "40-day schedule, streak tracking, platform/complexity stats, spaced-revision views, and zero manual logging after push.",
    stack: ["Next.js", "TypeScript", "Firebase", "GitHub Actions", "Tailwind"],
    color: "#22c55e",
    href: "https://github.com/srujanchidarla/algochronicle",
    liveHref: "https://algochronicle.vercel.app/",
    dsaRepoHref: "https://github.com/srujanchidarla/dsa-problems",
  },
  {
    id: "studyglobal",
    title: "StudyGlobal",
    tag: "EdTech · Full-Stack",
    role: "Full-stack engineer · product flow and API integrations",
    lanes: ["Full-Stack"],
    previewImage: "/project-previews/studyglobal.jpg",
    journey: "Learning product thinking for a real audience",
    problem:
      "International students struggle with fragmented visa, housing, and relocation tools.",
    solution:
      "End-to-end platform with cost-of-living APIs, document vault, university matching, and visa workflows.",
    learned:
      "How to design for a specific user journey (international students) and integrate third-party APIs into a coherent product.",
    result: "40% faster visa workflows",
    resultDetail: "One place for the full journey — from research to in-country support.",
    stack: ["Next.js", "TypeScript", "API Integration", "PostgreSQL"],
    color: "#3b82f6",
    liveHref: "https://studyglobalscholar.netlify.app/",
  },
  {
    id: "fitconnect",
    title: "FitConnect",
    tag: "HealthTech · Full-Stack",
    role: "System designer · data model, booking flows, and frontend",
    lanes: ["Full-Stack", "Backend"],
    journey: "Most complex production-style system I designed",
    problem:
      "Fitness venues and trainers had no unified way to handle bookings and community coordination.",
    solution:
      "Venue booking, trainer discovery, scheduling, and community sports features in a single platform.",
    learned:
      "System design for real-time coordination, database modeling for bookings, and balancing feature scope with shipping.",
    result: "Booking system design",
    resultDetail: "Architecture for venues, trainers, and real-time slot coordination.",
    stack: ["React", "Node.js", "Real-time", "System Design"],
    color: "#10b981",
  },
] as const;

export type SkillStrength = "Strong" | "Comfortable" | "Foundational";

export const SKILL_CLUSTERS = [
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Java / Spring Boot", strength: "Strong" as SkillStrength, years: "4+ yrs learning", proof: "Cognizant · 2M+ req/day foundation", level: 82 },
      { name: "Node.js / Express", strength: "Strong" as SkillStrength, years: "3+ yrs learning", proof: "CampfireChai · JobHuntOS APIs", level: 78 },
      { name: "Python / FastAPI", strength: "Comfortable" as SkillStrength, years: "Learning", proof: "Neocortex agent backend", level: 65 },
    ],
  },
  {
    id: "ai",
    label: "AI / LLM",
    skills: [
      { name: "Multi-LLM orchestration", strength: "Strong" as SkillStrength, years: "Shipped", proof: "Claude · Gemini · Groq routing", level: 80 },
      { name: "Streaming APIs (SSE)", strength: "Strong" as SkillStrength, years: "Shipped", proof: "JobHuntOS real-time analysis", level: 76 },
      { name: "Prompt + agent design", strength: "Comfortable" as SkillStrength, years: "Learning", proof: "Neocortex · 15 agents", level: 68 },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React / Next.js", strength: "Strong" as SkillStrength, years: "3+ yrs learning", proof: "CampfireChai · StudyGlobal · portfolio", level: 80 },
      { name: "TypeScript", strength: "Strong" as SkillStrength, years: "3+ yrs learning", proof: "Production codebases", level: 76 },
      { name: "Real-time UI", strength: "Comfortable" as SkillStrength, years: "2+ yrs learning", proof: "Socket.io · live dashboards", level: 68 },
    ],
  },
  {
    id: "infra",
    label: "Cloud & Data",
    skills: [
      { name: "PostgreSQL / MySQL", strength: "Strong" as SkillStrength, years: "3+ yrs learning", proof: "Enterprise + Supabase", level: 75 },
      { name: "MongoDB / Firebase", strength: "Comfortable" as SkillStrength, years: "2+ yrs learning", proof: "CampfireChai · AlgoChronicle", level: 70 },
      { name: "AWS / Docker / CI", strength: "Comfortable" as SkillStrength, years: "Learning", proof: "Cloud Practitioner · GitHub Actions", level: 64 },
    ],
  },
] as const;

export const STORY_BEATS = [
  {
    year: "Roots",
    title: "Where I started",
    text: "I grew up in India with a love for sports and problem-solving. Village roots taught me resourcefulness — you figure things out with what you have. That mindset carried into how I learn code.",
    highlight: "Resourceful from day one",
  },
  {
    year: "2021",
    title: "Cognizant",
    text: "My first professional role — where I learned production isn't a tutorial. Millions of requests, on-call nights, and collaborating with engineers who knew more than me. I absorbed everything.",
    highlight: "Production foundation",
  },
  {
    year: "2024",
    title: "Masters in the US",
    text: "Moved to the US for my Master's at University of Fairfax. 4.0 GPA, featured shipped apps (CampfireChai, JobHuntOS, and more), and learning never stopped.",
    highlight: "4.0 GPA · shipping while studying",
  },
  {
    year: "Now",
    title: "Still building",
    text: "MS CS in progress (4.0). I ship products, train most days, and keep a public DSA streak. The through-line is the same: show up, finish, learn the next thing.",
    highlight: "Shipping while studying",
  },
] as const;

export const SPORTS = [
  "Handball",
  "Track & Field",
  "Volleyball",
  "Badminton",
  "Basketball",
  "Cricket",
  "Football",
  "Relay",
] as const;

export const HIRING_ROLES = ["Software Engineer"] as const;

export const RECRUITER_CONTACT = {
  email: SITE.email,
  linkedin: SITE.linkedin,
  github: SITE.github,
  resume: SITE.resumeUrl,
} as const;
