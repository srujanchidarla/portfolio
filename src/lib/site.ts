export const PRIMARY_ROLE = {
  title: "Software Engineer",
  short: "Engineer",
  tagline: "Software Engineer",
  headline:
    "MS CS (Aug 2026, 4.0 GPA) — production systems at 2M+ req/day, and products people actually use.",
} as const;

export const SITE = {
  name: "Srujan Chidarla",
  role: PRIMARY_ROLE.tagline,
  tagline: "MS CS Aug 2026 · 2M+ req/day · CampfireChai & JobHuntOS",
  location: "Baltimore, MD · United States",
  status: "Engineer · athlete · builder",
  gradDate: "August 2026",
  email: "srujanchidarla.uof@gmail.com",
  linkedin: "https://www.linkedin.com/in/srujan-chidarla",
  github: "https://github.com/srujanchidarla",
  website: "https://srujanchidarla.com",
  localGuide: "https://www.google.com/maps/contrib/117828540649458317543",
  localGuideShort: "https://maps.app.goo.gl/MAkrodDNB5Lktii9A",
  localGuidePhotos:
    "https://www.google.com/maps/contrib/117828540649458317543/photos/@39.0235484,-76.9385184,11z/data=!3m1!4b1!4m3!8m2!3m1!1e1?entry=ttu",
  resumeUrl: "/resume",
  lastUpdated: "August 11, 2026",
} as const;

export type RoleResumeKey = "backend" | "ai" | "fullstack";

/** Role-tailored resumes — set `available: true` when the file exists in /public/resumes/ */
export const ROLE_RESUMES: Record<
  RoleResumeKey,
  { label: string; href: string; shortLabel: string; available: boolean }
> = {
  backend: {
    label: "Backend Engineer",
    href: "/resumes/Srujan-Chidarla-Backend.md",
    shortLabel: "Backend",
    available: false,
  },
  ai: {
    label: "AI Engineer",
    href: "/resumes/Srujan-Chidarla-AI.md",
    shortLabel: "AI",
    available: false,
  },
  fullstack: {
    label: "Full-Stack Engineer",
    href: "/resumes/Srujan-Chidarla-FullStack.md",
    shortLabel: "Full-Stack",
    available: false,
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
  /** Cropped café headshot — hero */
  hero: "/images/hero.jpg",
  /** Mural café / MacBook — coding lifestyle */
  coding: "/images/IMG_5502.jpg",
  /** Google Local Guide Level 9 badge card */
  localGuide: "/images/google-local-guide.jpg",
} as const;

export const LOCAL_GUIDE = {
  level: 9,
  contributions: "10k+",
  points: "52k+",
  views: "58M+",
  tagline: "Explorer · Sanchari",
} as const;

/** Curated athlete media for the portfolio (recruiter-safe picks) */
export const ATHLETE_MEDIA = [
  {
    id: "track",
    type: "image" as const,
    src: "/media/track-sunset.jpg",
    alt: "Srujan on the track at sunset",
    label: "Track",
    caption: "Chase the sun — never outrun your purpose.",
    span: "wide" as const,
  },
  {
    id: "gym-mindset",
    type: "image" as const,
    src: "/media/gym-mindset.jpg",
    alt: "Srujan training in the gym under a Michael Jordan quote",
    label: "Mindset",
    caption: "Obstacles don't stop you — you climb, go through, or work around.",
    span: "tall" as const,
  },
  {
    id: "gym-strength",
    type: "carousel" as const,
    src: "/media/strength-back.jpeg",
    alt: "Srujan training — strength and discipline",
    label: "Strength",
    caption: "Same discipline that shows up in sprints and shipping.",
    span: "normal" as const,
    slides: [
      {
        src: "/media/strength-back.jpeg",
        alt: "Srujan training — back strength pose",
      },
      {
        src: "/media/strength-front-1.jpeg",
        alt: "Srujan — fitness progress, front view",
      },
      {
        src: "/media/strength-front-2.jpeg",
        alt: "Srujan — confident fitness portrait",
      },
      {
        src: "/media/strength-front-3.jpeg",
        alt: "Srujan — strength and presence",
      },
    ],
  },
  {
    id: "hybrid",
    type: "video" as const,
    src: "/media/hybridathlete-web.mp4",
    alt: "Srujan hybrid athlete training — track and gym",
    label: "Hybrid",
    caption: "Sprints, strength, and the same daily discipline.",
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
