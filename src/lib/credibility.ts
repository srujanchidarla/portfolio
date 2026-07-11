import { SITE } from "./site";
import { FEATURED_CERT_TITLES } from "./certifications";

export type AchievementIcon =
  | "education"
  | "scale"
  | "community"
  | "certifications";

export interface Achievement {
  id: string;
  icon: AchievementIcon;
  title: string;
  organization: string;
  highlight: string;
  period: string;
  color: string;
  link?: string;
  linkLabel?: string;
  items?: string[];
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "masters",
    icon: "education",
    title: "Master's in Computer Science",
    organization: "University of Fairfax",
    highlight: "GPA: 4.0/4.0 (current student)",
    period: "Aug 2024 – Aug 2026",
    color: "#8b5cf6",
  },
  {
    id: "cognizant-scale",
    icon: "scale",
    title: "Built systems at scale",
    organization: "Cognizant Technology Solutions",
    highlight: "2M+ requests/day, 99.9% uptime",
    period: "3+ years",
    color: "#3b9eff",
  },
  {
    id: "local-guide",
    icon: "community",
    title: "Google Local Guide Level 9",
    organization: "Google Maps Community",
    highlight: "10k+ contributions · 52k+ points · 58M+ views",
    period: "Level 9 · Trusted by Google",
    color: "#34d399",
    link: SITE.localGuide,
    linkLabel: "View contributions on Google Maps",
  },
  {
    id: "certifications",
    icon: "certifications",
    title: "Certifications",
    organization: "18+ industry-validated credentials",
    highlight: "Cloud, AI, frontend, backend, design, and tools",
    period: "2022 – 2026",
    color: "#e8c547",
    link: "#certifications",
    linkLabel: "View all certifications",
    items: [...FEATURED_CERT_TITLES],
  },
];

export interface ProfileHighlight {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
  link?: string;
  linkLabel?: string;
}

export const SPORTS_ACHIEVEMENTS: ProfileHighlight = {
  id: "sports",
  title: "Sports Achievements",
  subtitle: "State-level competition · team leadership",
  items: [
    "Gold medal — State-Level Handball",
    "Bronze medal — State-Level High Jump",
    "1st place — 4×100m relay, Indian Open Inter Engineering Collegiate Sports Fest",
    "1st place — 4×400m relay, Indian Open Inter Engineering Collegiate Sports Fest",
    "2nd place — 4×100m relay, Vignan Mahotsav",
    "Represented school & college in track & field, handball, and volleyball",
  ],
};

export const OPEN_SOURCE: ProfileHighlight = {
  id: "opensource",
  title: "Open Source & Tools",
  subtitle: "Shipped extensions used in real workflows",
    items: [
      "Neocortex — local-first Jarvis Life OS with 15 AI agents (FastAPI, Next.js, Expo)",
      "CampfireChai — live outdoor community app for Desi adventurers (React, Node, MongoDB, Socket.io)",
      "JobHuntOS — AI Chrome extension for job search (MV3, LLM routing, Chrome Web Store)",
    "PixelPeek — Chrome extension for real-time media dimension analysis (privacy-first, local processing)",
    "TrueScreenshot — VS Code extension for exact code screenshots with syntax highlighting",
    "Contributions to open-source documentation and bug fixes",
  ],
  link: SITE.github,
  linkLabel: "View on GitHub",
};

export const VOLUNTEERING: ProfileHighlight = {
  id: "volunteering",
  title: "Community & Volunteering",
  subtitle: "Beyond the keyboard",
  items: [
    "Digital Cartography Contributor — Google Maps Local Guide (reviews, photos, location data)",
    "Student Volunteer — School Games Federation of India (Arts & Culture, 2014)",
    "Active contributor improving navigation accuracy and user experience globally",
  ],
  link: SITE.localGuide,
  linkLabel: "Google Maps profile",
};

export const PROFILE_HIGHLIGHTS = [SPORTS_ACHIEVEMENTS, OPEN_SOURCE, VOLUNTEERING];
