import { LEETCODE_STREAK, LOCAL_GUIDE, SITE_IMAGES, SPORTS_CERTIFICATES } from "@/lib/site";

export const HERO_REEL_INTERVAL_MS = 3200;
export const HERO_REEL_CERT_INTERVAL_MS = 2200;

export const HERO_SPORTS_CERTS = SPORTS_CERTIFICATES.map((item) => item.src);

export type HeroReelItem =
  | {
      id: "identity";
      kind: "text";
      label: string;
      href: string;
      lead: string;
      line: string;
    }
  | {
      id: string;
      kind: "media";
      label: string;
      href: string;
      eyebrow: string;
      title: string;
      image: string;
      images?: readonly string[];
      objectPosition: string;
      mediaClass?: string;
    };

/** Tight feed: who I am → shipped work → proof → athlete. */
export const HERO_REEL_ITEMS: HeroReelItem[] = [
  {
    id: "identity",
    kind: "text",
    label: "Identity",
    href: "#athlete",
    lead: "Engineer, athlete, builder.",
    line: "I train most days\nand ship the rest.",
  },
  {
    id: "algochronicle",
    kind: "media",
    label: "AlgoChronicle",
    href: "/work/algochronicle",
    eyebrow: "Live product",
    title: "AlgoChronicle",
    image: "/project-pages/algochronicle-today.jpg",
    objectPosition: "center top",
  },
  {
    id: "wildmate",
    kind: "media",
    label: "Wildmate",
    href: "/work/campfirechai",
    eyebrow: "Live product",
    title: "Wildmate",
    image: "/project-pages/wildmate-home.jpg",
    objectPosition: "center top",
  },
  {
    id: "leetcode",
    kind: "media",
    label: "LeetCode",
    href: "#daily-dsa",
    eyebrow: "LeetCode",
    title: LEETCODE_STREAK.title,
    image: SITE_IMAGES.leetcode50Days,
    objectPosition: "center 38%",
  },
  {
    id: "local-guide",
    kind: "media",
    label: "Guide",
    href: "#local-guide",
    eyebrow: "Google Maps",
    title: `Local Guide Level ${LOCAL_GUIDE.level}`,
    image: SITE_IMAGES.localGuide,
    objectPosition: "center center",
  },
  {
    id: "sports",
    kind: "media",
    label: "Sports",
    href: "#athlete",
    eyebrow: "Athletics",
    title: "State sports · medals",
    image: HERO_SPORTS_CERTS[0],
    images: HERO_SPORTS_CERTS,
    objectPosition: "center center",
    mediaClass: "hero__reel-media--cert",
  },
];
