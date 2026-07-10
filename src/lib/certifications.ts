import { SITE } from "./site";

export type CertCategory =
  | "cloud"
  | "ai"
  | "frontend"
  | "backend"
  | "design"
  | "tools"
  | "fundamentals";

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  url: string;
  category: CertCategory;
}

export const CERT_CATEGORIES: Record<CertCategory, string> = {
  cloud: "Cloud & Infrastructure",
  ai: "AI & Machine Learning",
  frontend: "Frontend",
  backend: "Backend",
  design: "Design & UX",
  tools: "Tools & APIs",
  fundamentals: "Fundamentals",
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: "aws-cp",
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    issued: "May 2026",
    url: "https://www.linkedin.com/in/srujan-chidarla/",
    category: "cloud",
  },
  {
    id: "prompt-eng",
    title: "Prompt Engineering: How to Talk to the AIs",
    issuer: "LinkedIn Learning",
    issued: "Mar 2026",
    url: "https://www.linkedin.com/learning/certificates/dc0a2023bf516568c8682b785c1f4cdd6b73763d16c03d166b38ff66ee4a5720",
    category: "ai",
  },
  {
    id: "databricks-genai",
    title: "Generative AI Fundamentals",
    issuer: "Databricks",
    issued: "Jan 2026",
    url: "https://www.linkedin.com/in/srujan-chidarla/",
    category: "ai",
  },
  {
    id: "cisco-packet-tracer",
    title: "Cisco Packet Tracer",
    issuer: "Cisco",
    issued: "Feb 2026",
    url: "https://www.linkedin.com/in/srujan-chidarla/",
    category: "tools",
  },
  {
    id: "google-ux",
    title: "Google UX Design Professional Certificate",
    issuer: "Google · Coursera",
    issued: "Feb 2026",
    url: "https://www.coursera.org/account/accomplishments/professional-cert/8FOCWSKJBJOA",
    category: "design",
  },
  {
    id: "nextjs",
    title: "Learning Next.js",
    issuer: "LinkedIn Learning",
    issued: "Feb 2025",
    url: "https://www.linkedin.com/learning/certificates/16d95599e8307a5644a5cb529a55dd4c5f46bf0f441d4606373f2e3d51fcb070",
    category: "frontend",
  },
  {
    id: "postman",
    title: "Postman Essential Training",
    issuer: "LinkedIn Learning",
    issued: "Dec 2024",
    url: "https://www.linkedin.com/learning/certificates/9ca593b538607b57e548a44a2ede3b58db526a3e8aa6acc90d1614c4cc20eb4b",
    category: "tools",
  },
  {
    id: "react-native",
    title: "Become a React Native Developer",
    issuer: "LinkedIn Learning",
    issued: "Dec 2024",
    url: "https://www.linkedin.com/learning/certificates/e23e9e1e55d46fe5f98aea7222b41254bd25a5a09f7568dbaf0147aaa509ca21",
    category: "frontend",
  },
  {
    id: "hackerrank-ps",
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    issued: "2024",
    url: "https://www.hackerrank.com/certificates/B5F731D6723F",
    category: "fundamentals",
  },
  {
    id: "angular",
    title: "Angular Certified",
    issuer: "Udemy",
    issued: "Dec 2022",
    url: "https://www.udemy.com/certificate/UC-1cc71a5a-564e-4b2a-b113-c53846beaa26/",
    category: "frontend",
  },
  {
    id: "modern-java",
    title: "Modern Java Certified",
    issuer: "Udemy",
    issued: "Dec 2022",
    url: "https://www.udemy.com/certificate/UC-aa417410-414c-46b9-9fc6-15b470231598/",
    category: "backend",
  },
  {
    id: "reactjs",
    title: "React.js Certified",
    issuer: "Udemy",
    issued: "Sep 2022",
    url: "https://www.udemy.com/certificate/UC-fbebd109-4b1d-4c2d-bfb9-bc6591cdff3b/",
    category: "frontend",
  },
  {
    id: "javascript",
    title: "JavaScript Certified",
    issuer: "Udemy",
    issued: "Mar 2022",
    url: "https://www.udemy.com/certificate/UC-4341f4c5-a492-4bc7-a07b-f68adca8dc62/",
    category: "frontend",
  },
  {
    id: "git",
    title: "Git Certified",
    issuer: "Udemy",
    issued: "Feb 2022",
    url: "https://www.udemy.com/certificate/UC-08f71976-34d3-4e31-8636-0532d8e410fb/",
    category: "tools",
  },
  {
    id: "mysql",
    title: "MySQL Certified",
    issuer: "Udemy",
    issued: "Feb 2022",
    url: "https://www.udemy.com/certificate/UC-3d1718bd-9f9a-496c-951c-7c82239ade58/",
    category: "backend",
  },
  {
    id: "bootstrap",
    title: "Bootstrap Certified",
    issuer: "Udemy",
    issued: "Jan 2022",
    url: "https://www.udemy.com/certificate/UC-1d7865c0-c0e4-4b87-87af-e3671a9a669a/",
    category: "frontend",
  },
  {
    id: "html-css",
    title: "HTML & CSS Certified",
    issuer: "Udemy",
    issued: "Jan 2022",
    url: "https://www.udemy.com/certificate/UC-022d90a8-ecb2-46a2-b106-03120da985ce/",
    category: "frontend",
  },
  {
    id: "gcp-summit",
    title: "Google Cloud Migration Summit",
    issuer: "Google Cloud Skills Boost",
    issued: "2022",
    url: "https://www.skills.google/",
    category: "cloud",
  },
  {
    id: "c-programming",
    title: "Programming in C",
    issuer: "SSSIT Computer Education",
    issued: "2022",
    url: SITE.linkedin,
    category: "fundamentals",
  },
];

export const FEATURED_CERT_TITLES = [
  "AWS Cloud Practitioner",
  "Google UX Design",
  "Databricks Generative AI",
  "Prompt Engineering",
  "Learning Next.js",
  "Angular Certified",
] as const;
