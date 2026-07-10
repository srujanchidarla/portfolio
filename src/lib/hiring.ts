import { SITE } from "./site";

export const LOOKING_FOR = [
  {
    id: "role",
    title: "What I'm looking for",
    items: [
      "New grad / entry-level software engineer",
      "Full-stack or backend with mentorship",
      "Team collaboration & learning culture",
      "Opportunity to ship code and grow fast",
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
      "United States (based)",
      "Remote or on-site — open to relocating",
      "Eager to contribute from day one",
    ],
  },
] as const;

export const VALUE_PROPS = [
  {
    id: "ship",
    icon: "🚀",
    title: "I ship while learning",
    description:
      "CampfireChai live, JobHuntOS on the Chrome Store, Neocortex in progress — all while completing my Master's with a 4.0 GPA.",
    example: "Not just coursework — real products",
  },
  {
    id: "foundation",
    icon: "🏗️",
    title: "Production foundation",
    description:
      "Pre-grad experience at Cognizant (2M+ req/day) and WalletGyde taught me what reliable systems look like — ready to learn more on a team.",
    example: "Humble about seniority, confident about ability",
  },
  {
    id: "growth",
    icon: "📈",
    title: "Growth mindset",
    description:
      "Athlete discipline + constant curiosity (AI/ML, networking, new stacks). I want a team that invests in my growth as much as I invest in theirs.",
    example: "AWS cert, 18+ courses, always building",
  },
] as const;

export const RECRUITER_LINKS = [
  { id: "resume", label: "Resume", sublabel: "Download PDF", href: SITE.resumeUrl, icon: "📄", external: true },
  { id: "linkedin", label: "LinkedIn", sublabel: "Professional profile", href: SITE.linkedin, icon: "💼", external: true },
  { id: "github", label: "GitHub", sublabel: "Code samples", href: SITE.github, icon: "🔗", external: true },
  { id: "email", label: "Email", sublabel: "Direct contact", href: `mailto:${SITE.email}`, icon: "📧", external: false },
  { id: "chat", label: "Let's Talk", sublabel: "Chat or schedule a call", icon: "💬", action: "contact" as const },
] as const;
