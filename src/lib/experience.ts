export interface Experience {
  id: string;
  company: string;
  companyShort: string;
  role: string;
  type: string;
  category?: string;
  duration: string;
  location: string;
  headline: string;
  description: string;
  achievements: string[];
  techStack: string[];
  impact: string;
  color: string;
  logoUrl?: string;
  roles?: { title: string; period: string }[];
}

export const EXPERIENCES: Experience[] = [
  {
    id: "masters",
    company: "University of Fairfax",
    companyShort: "UF",
    role: "Master of Science in Computer Science",
    type: "Graduating Aug 2026",
    category: "Education",
    duration: "Aug 2024 – Aug 2026",
    location: "Fairfax, VA · United States",
    headline: "4.0 GPA — learning and building while completing my degree",
    description:
      "Recent graduate completing my Master's in Computer Science with a 4.0 GPA. I've balanced coursework with shipping real projects (Neocortex, CampfireChai, JobHuntOS) and applying production lessons from prior roles. Ready to learn and grow in my first full-time role.",
    achievements: [
      "Maintaining 4.0/4.0 GPA while shipping side projects and internships",
      "Deepened networking knowledge: TCP/IP, BGP, routing, and router fundamentals",
      "Built 13+ projects spanning full-stack, AI, and systems design",
      "Eager to bring discipline from athletics into a collaborative engineering team",
    ],
    techStack: ["Computer Networks", "System Design", "AI/ML", "Full-Stack"],
    impact: "4.0/4.0 GPA · Graduating Aug 2026 · 13+ projects shipped",
    color: "#8b5cf6",
  },
  {
    id: "walletgyde",
    company: "WalletGyde",
    companyShort: "WG",
    role: "Full-Stack Web Developer",
    type: "Internship",
    category: "Recent production experience",
    duration: "Dec 2024 – May 2025",
    location: "Denver, USA · Remote",
    headline: "Shipped a fintech platform during my Master's — 35% engagement ↑",
    description:
      "Built and deployed a responsive financial platform while studying. Owned features from API design to frontend polish — my most recent hands-on production experience before graduation.",
    achievements: [
      "Built Next.js + Supabase platform with RESTful APIs (35% engagement increase)",
      "Improved transaction processing speed by 40% through schema optimization",
      "Raised mobile Lighthouse scores by 30%",
      "Learned to move fast in a small team while balancing graduate coursework",
    ],
    techStack: ["Next.js", "Node.js", "Supabase", "PostgreSQL", "TailwindCSS"],
    impact: "35% Engagement ↑ · 40% Speed ↑ · Recent production ship",
    color: "#10b981",
  },
  {
    id: "cognizant",
    company: "Cognizant Technology Solutions",
    companyShort: "CT",
    role: "Full-Stack Developer / Software Engineer",
    type: "Full-time · 2 yrs 7 mos",
    category: "Pre-graduation professional experience",
    duration: "Mar 2021 – Apr 2024",
    location: "Hyderabad, India",
    headline: "My foundation in production — systems at 2M+ req/day, 99.9% uptime",
    description:
      "Professional experience before graduate school. Contributed to enterprise microservices on an Agile platform — where I learned what production reliability, on-call discipline, and shipping under pressure actually mean.",
    achievements: [
      "Contributed to Spring Boot microservices processing 2M+ requests/day (99.9% uptime)",
      "Reduced page load times by 30% through SPA optimization",
      "Integrated Azure DevOps APIs to sync sprint data (20% productivity improvement)",
      "Collaborated with senior engineers on system design and code reviews",
    ],
    techStack: ["Java", "Spring Boot", "React", "Angular", "MySQL", "AWS", "Docker"],
    impact: "2M+ Daily Requests · 99.9% Uptime · Production foundation",
    color: "#0070ad",
    roles: [
      { title: "Programmer Analyst (Full Stack)", period: "Nov 2022 – Apr 2024" },
      { title: "Program Analyst Trainee", period: "Oct 2021 – Oct 2022" },
    ],
  },
];
