export const SITE = {
  name: "Srujan Chidarla",
  role: "New Grad · Full-Stack Engineer",
  tagline: "MS CS Aug 2026 · 4.0 GPA · Shipped CampfireChai & JobHuntOS · Seeking first full-time role",
  location: "United States",
  status: "🎓 Seeking my first full-time role",
  gradDate: "August 2026",
  email: "srujanchidarla.uof@gmail.com",
  linkedin: "https://www.linkedin.com/in/srujan-chidarla",
  github: "https://github.com/srujanchidarla",
  website: "https://srujanchidarla.com",
  localGuide: "https://www.google.com/maps/contrib/117828540649458317543",
  resumeUrl: "/resume.pdf",
  lastUpdated: "July 10, 2026",
} as const;

export const SITE_IMAGES = {
  /** Cropped café headshot — hero */
  hero: "/images/hero.jpg",
  /** Camaro outdoor — personality / athletics */
  story: "/images/20251031_134830.jpg",
  /** Mural café / MacBook — coding lifestyle */
  coding: "/images/IMG_5502.jpg",
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
    id: "badminton",
    type: "video" as const,
    src: "/media/athlete-reel.mp4",
    alt: "Srujan playing badminton",
    label: "Badminton",
    caption: "Court time — focus, footwork, and follow-through.",
    span: "normal" as const,
  },
] as const;

/** Verified profile stats — used as fallback and to supplement the public API */
export const GITHUB_PROFILE = {
  username: "srujanchidarla",
  totalRepos: 41,
  followers: 6,
  stars: 7,
  achievement: "Pull Shark",
  bio: "Full-stack Developer | Coding Enthusiast | Tech Explorer — constantly learning, coding, and exploring the ever-evolving tech landscape.",
  contributionsLastYear: 303,
} as const;
