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
      blurb?: string;
      image: string;
      images?: readonly string[];
      objectPosition: string;
      mediaClass?: string;
    };

/** Product logo cards used in the desktop reel and mobile hero strip. */
export const HERO_PRODUCT_LOGOS = [
  {
    id: "algochronicle",
    href: "/work/algochronicle",
    liveUrl: "https://www.algochronicle.com/",
    title: "AlgoChronicle",
    blurb: "Daily DSA journal with reminders that stick",
    image: "/project-logos/algochronicle.png",
  },
  {
    id: "wildmate",
    href: "/work/campfirechai",
    liveUrl: "https://wildmate.app/",
    title: "Wildmate",
    blurb: "Outdoor community for trips, crews & meetups",
    image: "/project-logos/wildmate.png",
  },
] as const;

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
    label: HERO_PRODUCT_LOGOS[0].title,
    href: HERO_PRODUCT_LOGOS[0].href,
    eyebrow: "Live product",
    title: HERO_PRODUCT_LOGOS[0].title,
    blurb: HERO_PRODUCT_LOGOS[0].blurb,
    image: HERO_PRODUCT_LOGOS[0].image,
    objectPosition: "center center",
    mediaClass: "hero__reel-media--logo",
  },
  {
    id: "wildmate",
    kind: "media",
    label: HERO_PRODUCT_LOGOS[1].title,
    href: HERO_PRODUCT_LOGOS[1].href,
    eyebrow: "Live product",
    title: HERO_PRODUCT_LOGOS[1].title,
    blurb: HERO_PRODUCT_LOGOS[1].blurb,
    image: HERO_PRODUCT_LOGOS[1].image,
    objectPosition: "center center",
    mediaClass: "hero__reel-media--logo",
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
