/** Milestones on the horizontal career track in the Experience lap, oldest first. */
export type CareerMilestone = {
  year: string;
  /** Month or a short qualifier shown beside the year */
  when?: string;
  title: string;
  detail: string;
  kind: "school" | "work" | "ship" | "now";
  /** A headline number shown on the card */
  stat?: { value: string; label: string };
};

export const CAREER_MILESTONES: CareerMilestone[] = [
  {
    year: "2018",
    when: "Aug",
    title: "B.Tech, Information Technology",
    detail: "VNR VJIET, Hyderabad. The start line: data structures, networks, and my first real code.",
    kind: "school",
  },
  {
    year: "2021",
    when: "Mar",
    title: "Software Engineer at Cognizant",
    detail: "Spring Boot microservices for 500+ enterprise users, with Docker and CI/CD from dev to prod.",
    kind: "work",
    stat: { value: "2M+", label: "requests / day" },
  },
  {
    year: "2021",
    when: "Aug",
    title: "Graduated with honors",
    detail: "B.Tech in Information Technology, finished while already shipping production code.",
    kind: "school",
    stat: { value: "3.8", label: "GPA" },
  },
  {
    year: "2022",
    when: "Nov",
    title: "Programmer Analyst (Full Stack)",
    detail: "Promoted. Query indexing and API-hop analysis on services that had to stay up.",
    kind: "work",
    stat: { value: "99.9%", label: "uptime" },
  },
  {
    year: "2024",
    when: "Aug",
    title: "MS in Computer Science",
    detail: "University of Fairfax: advanced algorithms, distributed systems, and computer networks.",
    kind: "school",
  },
  {
    year: "2025",
    title: "Full-stack intern at WalletGyde",
    detail: "A Next.js and Supabase fintech platform, shipped in a small team alongside coursework.",
    kind: "work",
    stat: { value: "40%", label: "faster transactions" },
  },
  {
    year: "2025",
    title: "Shipped Wildmate & JobHuntOS",
    detail: "Real-time trip planning with Socket.io, and a Chrome extension with multi-provider LLM routing.",
    kind: "ship",
    stat: { value: "100+", label: "ATS formats" },
  },
  {
    year: "2026",
    title: "AlgoChronicle goes live",
    detail: "A free DSA platform. Rebuilt around caching and idempotent jobs after a CPU-limit outage.",
    kind: "ship",
    stat: { value: "2 ms", label: "from ~290 ms" },
  },
  {
    year: "2026",
    when: "Aug",
    title: "Master's, 4.0 GPA",
    detail: "Finished the MS with a perfect GPA and a stack of shipped products along the way.",
    kind: "school",
    stat: { value: "4.0", label: "GPA" },
  },
  {
    year: "Now",
    title: "Next lap: your team",
    detail: "1,000+ GitHub contributions and a 50-day LeetCode badge. Looking for an entry-level SWE role.",
    kind: "now",
  },
];

export const MILESTONE_KIND_LABEL: Record<CareerMilestone["kind"], string> = {
  school: "Education",
  work: "Work",
  ship: "Shipped",
  now: "Today",
};
