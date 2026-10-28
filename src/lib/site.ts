export const PRIMARY_ROLE = {
  title: "Software Engineer",
  short: "Engineer",
  tagline: "Software Engineer",
  headline:
    "MS CS grad (Aug 2026, 4.0 GPA) — system design, computer networks, and production AI systems at 2M+ req/day.",
} as const;

export const SITE = {
  name: "Srujan Chidarla",
  role: PRIMARY_ROLE.tagline,
  tagline: "System design · Networks · AI · MS CS grad, Aug 2026",
  status: "Engineer · athlete · builder",
  gradDate: "August 2026",
  email: "srujanchidarla.uof@gmail.com",
  linkedin: "https://www.linkedin.com/in/srujan-chidarla",
  github: "https://github.com/srujanchidarla",
  leetcode: "https://leetcode.com/u/srujanchidarla/",
  website: "https://srujanchidarla.com",
  localGuide: "https://www.google.com/maps/contrib/117828540649458317543",
  localGuideShort: "https://maps.app.goo.gl/MAkrodDNB5Lktii9A",
  localGuidePhotos:
    "https://www.google.com/maps/contrib/117828540649458317543/photos/@39.0235484,-76.9385184,11z/data=!3m1!4b1!4m3!8m2!3m1!1e1?entry=ttu",
  resumeUrl: "/resume",
  lastUpdated: "September 23, 2026",
} as const;

export type RoleResumeKey = "backend" | "platform" | "ai" | "fullstack";

/** Role-tailored resumes — set `available: true` when the file exists in /public/resumes/ */
export const ROLE_RESUMES: Record<
  RoleResumeKey,
  { label: string; href: string; shortLabel: string; available: boolean }
> = {
  backend: {
    label: "Backend Engineer",
    href: "/resumes/Srujan-Chidarla-Backend.md",
    shortLabel: "Backend",
    available: true,
  },
  platform: {
    label: "Platform Engineer",
    href: "/resumes/Srujan-Chidarla-Platform.md",
    shortLabel: "Platform",
    available: true,
  },
  ai: {
    label: "AI Engineer",
    href: "/resumes/Srujan-Chidarla-AI.md",
    shortLabel: "AI",
    available: true,
  },
  fullstack: {
    label: "Full-Stack Engineer",
    href: "/resumes/Srujan-Chidarla-FullStack.md",
    shortLabel: "Full-Stack",
    available: true,
  },
};

/** True when at least one role-specific resume file is available */
export const ROLE_RESUMES_AVAILABLE = (
  Object.keys(ROLE_RESUMES) as RoleResumeKey[]
).some((key) => ROLE_RESUMES[key].available);

/** Best download link for a role — falls back to backend resume, then site PDF */
export function getRoleResumeDownload(role: RoleResumeKey): {
  href: string;
  label: string;
} {
  const preferred = ROLE_RESUMES[role];
  if (preferred.available) {
    return { href: preferred.href, label: preferred.label };
  }
  if (ROLE_RESUMES.backend.available) {
    return { href: ROLE_RESUMES.backend.href, label: ROLE_RESUMES.backend.label };
  }
  return { href: SITE.resumeUrl, label: "Resume" };
}

/**
 * Free scheduling — set NEXT_PUBLIC_SCHEDULE_URL in .env.local
 * e.g. "https://cal.com/yourname/15min" or a Google Appointment Schedule link.
 * Falls back to mailto when empty.
 */
export const SCHEDULE_URL = process.env.NEXT_PUBLIC_SCHEDULE_URL ?? "";

/** Prefills a free email request for a 15-minute intro call (or uses SCHEDULE_URL) */
export function getScheduleHref(): string {
  if (SCHEDULE_URL) return SCHEDULE_URL;
  const subject = encodeURIComponent("15-min intro call with Srujan");
  const body = encodeURIComponent(
    `Hi Srujan,\n\nI'd like to schedule a 15-minute intro call.\n\nPreferred times (timezone):\n- \n- \n\nRole / team:\n\nThanks!`
  );
  return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
}

export const WORK_AUTH = {
  line: "Authorized to work in the US via STEM OPT (36 months). No immediate sponsorship required.",
} as const;

export const SITE_IMAGES = {
  /** Café portrait, background removed */
  hero: "/images/hero3.png",
  /** Mural café / MacBook — coding lifestyle */
  coding: "/images/IMG_5502.jpg",
  /** Google Local Guide Level 9 badge card */
  localGuide: "/images/google-local-guide.jpg",
  /** LeetCode 50 Days Badge 2026 */
  leetcode50Days: "/images/leetcode-50-days-2026.png",
} as const;

export const LEETCODE_STREAK = {
  days: 50,
  year: 2026,
  title: "50 Days Badge 2026",
  note: "Solving problems 50+ days in 2026",
  href: SITE.leetcode,
} as const;

export const LOCAL_GUIDE = {
  level: 9,
  contributions: "11k",
  points: "54k",
  views: "76M",
  pointsExact: "53,605",
  pointsGoal: "100,000",
  pointsProgress: 53.6,
  tagline: "Explorer · Sanchari",
  badges: [
    "Master Reviewer",
    "Master Photographer",
    "Master Trailblazer",
    "Master Fact Finder",
  ],
  breakdown: [
    { value: "7,268", label: "photos" },
    { value: "497", label: "videos" },
    { value: "421", label: "reviews" },
    { value: "2,005", label: "answers" },
    { value: "161", label: "places added" },
  ],
} as const;

/** State / district sports certificates */
export const SPORTS_CERTIFICATES = [
  {
    id: "cert-1",
    src: "/media/sports-certificates/1.jpeg",
    alt: "High jump — district winner, Inter-Polytechnic Sports Meet 2015-16",
    title: "High jump",
    detail: "District winner · 2016",
  },
  {
    id: "cert-2",
    src: "/media/sports-certificates/2.jpeg",
    alt: "Athletics 4×100m — third place, Vignan Mahotsav 2020",
    title: "4×100m relay",
    detail: "Vignan Mahotsav · III",
  },
  {
    id: "cert-3",
    src: "/media/sports-certificates/3.jpeg",
    alt: "Handball — A.P. State Mini Inter District Championship",
    title: "Handball",
    detail: "State mini · 2013-14",
  },
  {
    id: "cert-4",
    src: "/media/sports-certificates/4.jpeg",
    alt: "Handball — School Games Federation Telangana inter-district",
    title: "Handball",
    detail: "School Games · 2014-15",
  },
  {
    id: "cert-5",
    src: "/media/sports-certificates/5.jpeg",
    alt: "Relay — VNR VJIET Sports Fest merit certificate",
    title: "Relay",
    detail: "Sports Fest · merit",
  },
  {
    id: "cert-6",
    src: "/media/sports-certificates/6.jpeg",
    alt: "Relay 4×100m — first place, VNR VJIET Sports Fest 2020",
    title: "4×100m relay",
    detail: "Sports Fest · I place",
  },
] as const;

/** Curated athlete media for the portfolio (recruiter-safe picks) */
export const ATHLETE_MEDIA = [
  {
    id: "track",
    type: "image" as const,
    src: "/media/track-sunset.jpg",
    alt: "Srujan on the track at sunset",
    label: "Track",
    caption: "Never outrun your purpose.",
    span: "wide" as const,
  },
  {
    id: "gym-mindset",
    type: "image" as const,
    src: "/media/gym-mindset.jpg",
    alt: "Srujan training in the gym under a Michael Jordan quote",
    label: "Mindset",
    caption: "Climb it, go through it, or work around it.",
    span: "tall" as const,
  },
  {
    id: "hybrid",
    type: "video" as const,
    src: "/media/hybridathlete-web.mp4",
    alt: "Srujan hybrid athlete training — track and gym",
    label: "Hybrid",
    caption: "Sprints, strength, same daily reps.",
    span: "end" as const,
  },
] as const;

/** Verified profile stats — used as fallback and to supplement the public API */
export const GITHUB_PROFILE = {
  username: "srujanchidarla",
  totalRepos: 40,
  followers: 6,
  stars: 7,
  achievement: "Pull Shark",
  bio: "Full-stack Developer | Coding Enthusiast | Tech Explorer — constantly learning, coding, and exploring the ever-evolving tech landscape.",
  contributionsLastYear: 304,
} as const;
