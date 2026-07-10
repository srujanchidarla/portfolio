export type ProficiencyLevel = "advanced" | "intermediate" | "learning";

export interface Competency {
  id: string;
  title: string;
  description: string;
  level: ProficiencyLevel;
  years: string;
  example: string;
  icon: "microservices" | "fullstack" | "architecture" | "performance";
}

export interface TechnicalSkill {
  name: string;
  percent: number;
  years: string;
  project: string;
  icon: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: "backend" | "frontend" | "cloud" | "database";
  skills: TechnicalSkill[];
}

export interface ToolSkill {
  name: string;
  level: ProficiencyLevel;
  years: string;
  project: string;
}

export const COMPETENCIES: Competency[] = [
  {
    id: "microservices",
    title: "Microservices Architecture",
    description:
      "Designed and deployed Spring Boot microservices handling 2M+ requests/day",
    level: "advanced",
    years: "3+ years",
    example: "Cognizant — 99.9% uptime across production systems",
    icon: "microservices",
  },
  {
    id: "fullstack",
    title: "Full-Stack Development",
    description: "End-to-end development from databases to UI",
    level: "advanced",
    years: "3+ years",
    example: "Built 13+ projects spanning job search, edtech, and automation",
    icon: "fullstack",
  },
  {
    id: "system-design",
    title: "System Design & Optimization",
    description: "Architectural decisions for scale and reliability",
    level: "advanced",
    years: "3+ years",
    example: "30% page load improvement, 40% transaction speed improvement",
    icon: "architecture",
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description: "Identifying and removing bottlenecks",
    level: "advanced",
    years: "3+ years",
    example: "Database query optimization, API gateway tuning",
    icon: "performance",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "backend",
    label: "Backend",
    icon: "backend",
    skills: [
      { name: "Java / Spring Boot", percent: 90, years: "7+ years", project: "Cognizant microservices", icon: "java" },
      { name: "Node.js / Express", percent: 80, years: "3+ years", project: "JobHuntOS API", icon: "node" },
      { name: "Python", percent: 70, years: "2+ years", project: "Automation & scripting", icon: "python" },
      { name: "C++", percent: 65, years: "2+ years", project: "Algo Chronicle / DSA", icon: "cpp" },
      { name: "API Design", percent: 95, years: "3+ years", project: "REST, SSE, multi-provider LLM routing", icon: "api" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "frontend",
    skills: [
      { name: "React / Next.js", percent: 90, years: "3+ years", project: "Portfolio, JobHuntOS, StudyGlobal", icon: "react" },
      { name: "JavaScript (ES6+)", percent: 95, years: "5+ years", project: "Chrome extensions & SPAs", icon: "js" },
      { name: "TypeScript", percent: 85, years: "3+ years", project: "Next.js apps & SDK integrations", icon: "ts" },
      { name: "UI/UX Design", percent: 80, years: "2+ years", project: "Figma-to-production workflows", icon: "ui" },
      { name: "Responsive Design", percent: 90, years: "3+ years", project: "Mobile-first portfolio & dashboards", icon: "responsive" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Infrastructure",
    icon: "cloud",
    skills: [
      { name: "AWS (EC2, S3, Lambda)", percent: 80, years: "2+ years", project: "Cloud deployments & storage", icon: "aws" },
      { name: "Docker / Kubernetes", percent: 75, years: "2+ years", project: "Containerized microservices", icon: "docker" },
      { name: "CI/CD Pipelines", percent: 80, years: "2+ years", project: "Algo Chronicle push-to-publish", icon: "cicd" },
      { name: "System Architecture", percent: 85, years: "3+ years", project: "Distributed systems at scale", icon: "arch" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "database",
    skills: [
      { name: "MongoDB", percent: 85, years: "3+ years", project: "Document stores for web apps", icon: "mongo" },
      { name: "MySQL / PostgreSQL", percent: 90, years: "4+ years", project: "Relational schemas & optimization", icon: "sql" },
      { name: "Database Optimization", percent: 75, years: "2+ years", project: "Query tuning & indexing", icon: "dbopt" },
    ],
  },
];

export const TOOLS: ToolSkill[] = [
  { name: "Git / GitHub", level: "advanced", years: "5+ years", project: "All projects" },
  { name: "Spring Boot", level: "advanced", years: "4+ years", project: "Cognizant microservices" },
  { name: "Next.js", level: "advanced", years: "2+ years", project: "Portfolio & JobHuntOS" },
  { name: "React", level: "advanced", years: "3+ years", project: "13+ web applications" },
  { name: "MongoDB", level: "advanced", years: "3+ years", project: "Full-stack apps" },
  { name: "AWS", level: "advanced", years: "2+ years", project: "Cloud infrastructure" },
  { name: "Docker", level: "intermediate", years: "2+ years", project: "Service containerization" },
  { name: "Kubernetes", level: "intermediate", years: "1+ years", project: "Orchestration & scaling" },
  { name: "PostgreSQL", level: "advanced", years: "3+ years", project: "Production databases" },
  { name: "Angular", level: "intermediate", years: "2+ years", project: "Enterprise frontends" },
  { name: "Figma", level: "intermediate", years: "2+ years", project: "UI design & prototyping" },
  { name: "Postman", level: "advanced", years: "3+ years", project: "API testing & documentation" },
];

export const LEVEL_LABELS: Record<ProficiencyLevel, string> = {
  advanced: "Advanced",
  intermediate: "Intermediate",
  learning: "Learning",
};
