import { SITE } from "./site";

export const HERO_METRICS = {
  gpa: 4.0,
  projectsShipped: 13,
  dailyRequests: 2_000_000,
} as const;

/** Featured on homepage — full list available via more links */
export const HOMEPAGE_PROJECT_LIMIT = 3;

export const PROOF_CARDS = [
  {
    id: "graduate",
    label: "New grad ready",
    headline: "Master's graduate, Aug 2026 · 4.0 GPA",
    subline: "Shipped code while studying",
    detail:
      "I'm finishing my MS in Computer Science with a 4.0 GPA. While in school I've shipped CampfireChai live, JobHuntOS to the Chrome Store, and I'm building Neocortex — proof I can learn fast and deliver.",
    metrics: ["4.0/4.0 GPA", "Aug 2026 grad", "13+ projects", "First role ready"],
    color: "#f97316",
    icon: "scale",
  },
  {
    id: "production",
    label: "Production exposure",
    headline: "I've shipped in real environments",
    subline: "Cognizant · WalletGyde · side projects",
    detail:
      "Before and during grad school I contributed to systems at 2M+ req/day, drove 35% engagement at a fintech startup, and kept shipping personal projects. I'm not senior — but I'm not starting from zero either.",
    metrics: ["2M+ req/day exposure", "35% engagement ↑", "CampfireChai live", "JobHuntOS shipped"],
    color: "#34d399",
    icon: "impact",
  },
  {
    id: "complete",
    label: "Beyond code",
    headline: "Athlete · learner · builder",
    subline: "Discipline + curiosity + community",
    detail:
      "State-level athletics taught me discipline and teamwork. I'm constantly exploring AI/ML and new stacks through projects like Neocortex. Google Local Guide Level 9 (58M+ views) — same curiosity I bring to codebases.",
    metrics: ["State medals", "AI/ML curious", "Local Guide L9", "Team player"],
    color: "#e8c547",
    icon: "person",
  },
] as const;

export const IMPACT_PROJECTS = [
  {
    id: "neocortex",
    title: "Neocortex",
    subtitle: "Jarvis Life OS",
    tag: "AI · Multi-Agent · In progress",
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
    id: "campfirechai",
    title: "CampfireChai",
    tag: "Community · Full-Stack · Live",
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
    id: "jobhuntos",
    title: "JobHuntOS",
    tag: "AI · Chrome Extension",
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
    id: "studyglobal",
    title: "StudyGlobal",
    tag: "EdTech · Full-Stack",
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
    journey: "Most complex production-style system I designed",
    problem:
      "Fitness venues and trainers had no unified way to handle bookings and community coordination.",
    solution:
      "Venue booking, trainer discovery, scheduling, and community sports features in a single platform.",
    learned:
      "System design for real-time coordination, database modeling for bookings, and balancing feature scope with shipping.",
    result: "60% increase in bookings",
    resultDetail: "Full architecture with real-time coordination and clear UX.",
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
      { name: "Java / Spring Boot", strength: "Strong" as SkillStrength, years: "4+ yrs learning", proof: "Cognizant production foundation", level: 82 },
      { name: "Node.js / Express", strength: "Strong" as SkillStrength, years: "3+ yrs learning", proof: "CampfireChai · JobHuntOS", level: 78 },
      { name: "Python / FastAPI", strength: "Comfortable" as SkillStrength, years: "Learning", proof: "Neocortex · actively deepening", level: 65 },
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
      { name: "MongoDB", strength: "Comfortable" as SkillStrength, years: "2+ yrs learning", proof: "CampfireChai production data", level: 68 },
      { name: "AWS / Docker", strength: "Comfortable" as SkillStrength, years: "Learning", proof: "Cloud Practitioner cert · eager to deepen", level: 62 },
    ],
  },
  {
    id: "networking",
    label: "Networking",
    skills: [
      { name: "TCP/IP & OSI Model", strength: "Strong" as SkillStrength, years: "Coursework + practice", proof: "Computer Networks · Cognizant", level: 78 },
      { name: "BGP & Routing", strength: "Comfortable" as SkillStrength, years: "Learning", proof: "Router config · path selection", level: 65 },
      { name: "LAN/WAN & Firewalls", strength: "Comfortable" as SkillStrength, years: "Learning", proof: "DNS · DHCP · switches", level: 62 },
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
    text: "Moved to the US for my Master's at University of Fairfax. 4.0 GPA, 13+ projects, and shipping CampfireChai and JobHuntOS while studying. Learning never stopped.",
    highlight: "4.0 GPA · shipping while studying",
  },
  {
    year: "Now",
    title: "Ready for what's next",
    text: "Graduating Aug 2026 and excited for my first full-time role. I want a team with mentorship, a learning culture, and real problems to solve. I'm ready to ship, listen, and grow.",
    highlight: "First full-time role · Aug 2026",
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

export const HIRING_ROLES = [
  "Backend Engineer (Scale Expert)",
  "AI Engineer (LLM Expert)",
  "Full-Stack (Shipping Expert)",
] as const;

export const RECRUITER_CONTACT = {
  email: SITE.email,
  linkedin: SITE.linkedin,
  github: SITE.github,
  resume: SITE.resumeUrl,
} as const;
