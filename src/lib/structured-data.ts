import { EDUCATION } from "@/lib/experience";
import { PRIMARY_ROLE, SITE, SITE_IMAGES } from "@/lib/site";

const PERSON_ID = `${SITE.website}/#person`;
const WEBSITE_ID = `${SITE.website}/#website`;

/** Short forms people may type into a search box — ties them to the full name. */
export const NAME_VARIANTS = ["Srujan", "Srujan C", "Chidarla Srujan", "Srujan Chidarla"] as const;

/** One description that leads with the full name, shared by metadata and JSON-LD. */
export const PERSON_DESCRIPTION = `Srujan Chidarla is a software engineer and MS Computer Science graduate (${SITE.gradDate}, 4.0 GPA) building full-stack products, distributed systems, and production AI at 2M+ requests/day.`;

/** Person + WebSite graph, rendered once in the root layout. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE.name,
        givenName: "Srujan",
        familyName: "Chidarla",
        alternateName: NAME_VARIANTS.filter((name) => name !== SITE.name),
        url: SITE.website,
        image: `${SITE.website}${SITE_IMAGES.hero}`,
        email: `mailto:${SITE.email}`,
        jobTitle: PRIMARY_ROLE.title,
        description: PERSON_DESCRIPTION,
        alumniOf: EDUCATION.map((school) => ({
          "@type": "CollegeOrUniversity",
          name: school.school,
        })),
        knowsAbout: [
          "Software engineering",
          "Full-stack development",
          "System design",
          "Distributed systems",
          "Computer networks",
          "Artificial intelligence",
          "Java",
          "Spring Boot",
          "TypeScript",
          "React",
          "Next.js",
          "Python",
        ],
        sameAs: [SITE.linkedin, SITE.github, SITE.leetcode, SITE.localGuide],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE.website,
        name: SITE.name,
        alternateName: ["Srujan", "Srujan Chidarla Portfolio"],
        description: PERSON_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": PERSON_ID },
      },
    ],
  };
}

/** Marks the home page as Srujan's profile page (Google's ProfilePage rich result). */
export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: SITE.website,
    name: `${SITE.name} — ${PRIMARY_ROLE.title}`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    dateModified: new Date(SITE.lastUpdated).toISOString(),
  };
}

/** Serializes JSON-LD safely for a <script> tag (escapes `<` per the Next.js guide). */
export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
