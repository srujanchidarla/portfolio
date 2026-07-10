export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  period: string;
  tagline: string;
  description: string;
  highlights: string[];
  tags: string[];
  links: ProjectLink[];
  featured?: boolean;
  ongoing?: boolean;
  status?: string;
  association?: string;
  gradient: [string, string];
}

export const PROJECTS: Project[] = [
  {
    id: "neocortex",
    title: "Neocortex — Jarvis Life OS",
    period: "2025 – Present",
    tagline:
      "Local-first AI life OS with 15 specialized agents for fitness, career, learning, and daily planning",
    description:
      "A local-first, multi-agent personal operating system I designed and built to orchestrate daily life across health, career, learning, content, and focus — from a single command center with web and mobile HUDs.",
    highlights: [
      "FastAPI monorepo — 15 domain agents, SQLite write-queue, 6-provider LLM failover cascade",
      "Next.js glassmorphic command center + Expo mobile HUD (Health Connect, meal vision, morning briefs)",
      "Jarvis daily planning, Stark career scoring, Hercules biometrics, Turing SRS, Cicero interview coach",
      "Heisenberg safety layer with per-agent kill switches; 37 backend test suites",
    ],
    tags: [
      "FastAPI",
      "Python",
      "Next.js",
      "Expo",
      "Multi-Agent",
      "LLM",
      "n8n",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/srujanchidarla/neocortex",
      },
    ],
    featured: true,
    ongoing: true,
    status: "In active development",
    association: "Personal Project",
    gradient: ["#8b5cf6", "#3b9eff"],
  },
  {
    id: "campfirechai",
    title: "CampfireChai",
    period: "2025 – Present",
    tagline: "Community platform for Desi outdoor adventurers in the USA",
    description:
      "A full-stack community platform I built for Desi and Indian outdoor adventurers — trip discovery, meetups, bucket-list planning, permits, crew matching, and real-time trip coordination in one product across 15+ US metro hubs and all 50 states.",
    highlights: [
      "React 19 + Vite frontend, Express 5/Mongoose API — JWT auth, geo trip search, hub-based content",
      "Socket.io trip chat, shared logistics (gear, meals, carpools), member approvals",
      "AI trip drafting (Magic Paste) with multi-provider fallbacks; NPS events + Weather.gov integration",
      "Bucket lists with A–Z visit playbooks; seasonal recommendations by country, hub, and season",
    ],
    tags: [
      "React 19",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Vite",
      "Tailwind",
    ],
    links: [
      {
        label: "Live App",
        href: "https://campfire-chai.vercel.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/srujanchidarla/CampfireChai",
      },
    ],
    status: "Live",
    association: "Personal Project",
    gradient: ["#ea580c", "#f59e0b"],
  },
  {
    id: "jobhuntos",
    title: "JobHuntOS",
    period: "Jan 2026 – Jul 2026",
    tagline: "AI job analysis, resume tailoring, autofill, and recruiter outreach",
    description:
      "An AI-powered Chrome extension that turns every job application into a 2-minute workflow — analyze postings, tailor resumes, autofill applications, and find recruiters across 100+ job boards and ATS platforms.",
    highlights: [
      "Chrome Extension (MV3) — content scripts, service worker, shadow-DOM form scanning",
      "Node.js/Express API — SSE streaming, multi-provider LLM routing with fallbacks",
      "Resume PDF/DOCX pipeline, recruiter discovery, optional Notion tracking",
      "Privacy-first BYOK — shipped to Chrome Web Store",
    ],
    tags: [
      "Chrome MV3",
      "Node.js",
      "Express",
      "SSE",
      "LLM",
      "Next.js",
      "Railway",
    ],
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/jobhuntos/cmdfelnbelngbjahjeglfkaoeclcnjec",
      },
      {
        label: "Live Site",
        href: "https://job-hunt-backend-production-6ae1.up.railway.app",
      },
    ],
    status: "Live on Chrome Web Store",
    gradient: ["#0080FF", "#6366f1"],
  },
  {
    id: "algochronicle",
    title: "Algo Chronicle",
    period: "Nov 2025 – Apr 2026",
    tagline: "Automated DSA progress tracker with push-to-publish CI/CD",
    description:
      "A serverless learning journal that triggers a live website update on every GitHub commit — parsing code folder metadata into structured progress records with zero manual intervention.",
    highlights: [
      "GitHub Actions webhook → Next.js API ingestion pipeline",
      "Firestore streak management and real-time progress tracking",
      "Authenticated API routes with automated metadata parsing",
    ],
    tags: ["Next.js", "Firebase", "GitHub Actions", "CI/CD", "DSA"],
    links: [
      {
        label: "DSA Repo",
        href: "https://github.com/srujanchidarla/dsa-problems",
      },
    ],
    association: "University of Fairfax",
    gradient: ["#00d4aa", "#0080FF"],
  },
  {
    id: "studyglobal",
    title: "StudyGlobal",
    period: "Feb 2025 – Feb 2026",
    tagline: "Digital platform for international students abroad",
    description:
      "A comprehensive platform supporting international students from pre-application research through post-graduation — centralizing practical tools, local knowledge, and community resources universities and agencies don't cover.",
    highlights: [
      "End-to-end journey: research, relocation prep, and in-country support",
      "Cost-of-living API integration with personalized dashboards",
      "Built for students and university international services offices",
    ],
    tags: ["Next.js", "Full-Stack", "API Integration", "EdTech"],
    links: [],
    gradient: ["#3b82f6", "#1e3a5f"],
  },
  {
    id: "flightbuddy",
    title: "FlightBuddy",
    period: "Academic Project",
    tagline: "Connect with fellow travelers before you board",
    description:
      "A platform connecting long-distance and international flight passengers before boarding — users create profiles, enter flight details, and match with fellow travelers by language, country, and city.",
    highlights: [
      "Flight-search-inspired UX for intuitive navigation",
      "Profile-based matching with language and location filters",
      "Designed for pre-flight connection and travel collaboration",
    ],
    tags: ["React", "Full-Stack", "UX Design"],
    links: [],
    gradient: ["#38bdf8", "#0ea5e9"],
  },
];
