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

/** Work experience only — education is rendered separately */
export const EXPERIENCES: Experience[] = [
  {
    id: "walletgyde",
    company: "WalletGyde",
    companyShort: "WG",
    role: "Full-Stack Web Developer",
    type: "Internship",
    category: "During Master's",
    duration: "Dec 2024 – May 2025",
    location: "Denver, USA · Remote",
    headline: "Shipped a fintech platform during my Master's — 35% engagement ↑",
    description:
      "Built and deployed a responsive financial platform while studying. Owned features from API design to frontend polish — recent hands-on production work during grad school.",
    achievements: [
      "Built Next.js + Supabase platform with RESTful APIs (35% engagement increase)",
      "Improved transaction processing speed by 40% through schema optimization",
      "Raised mobile Lighthouse scores by 30%",
      "Shipped in a small team while balancing graduate coursework",
    ],
    techStack: ["Next.js", "Node.js", "Supabase", "PostgreSQL", "TailwindCSS"],
    impact: "35% Engagement ↑ · 40% Speed ↑ · Recent production ship",
    color: "#10b981",
  },
  {
    id: "cognizant",
    company: "Cognizant Technology Solutions",
    companyShort: "CT",
    role: "Software Engineer",
    type: "Full-time · 2 yrs 7 mos",
    category: "Pre-MS professional experience",
    duration: "Mar 2021 – Apr 2024",
    location: "Hyderabad, India",
    headline: "Production foundation — contributed on systems at 2M+ req/day, 99.9% uptime",
    description:
      "Full-time engineering before graduate school. Contributed to enterprise Spring Boot microservices — learning production reliability, on-call discipline, and shipping under load.",
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

export const EDUCATION = [
  {
    id: "ms",
    school: "University of Fairfax",
    degree: "Master of Science in Computer Science",
    duration: "Aug 2024 – Aug 2026 (Expected)",
    detail: "GPA 4.0/4.0 · Shipping CampfireChai, JobHuntOS, and Neocortex while studying",
    location: "Fairfax, VA",
  },
  {
    id: "btech",
    school: "VNR VJIET",
    degree: "B.Tech, Information Technology",
    duration: "Aug 2018 – Aug 2021",
    detail: "GPA 3.8/4.0 · Graduated with Honors",
    location: "Hyderabad, India",
  },
] as const;
