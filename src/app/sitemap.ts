import type { MetadataRoute } from "next";
import { getAllLegalSlugs } from "@/lib/legal";
import { RESEARCH_ITEMS } from "@/lib/research";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.website;
  const legalPages = getAllLegalSlugs().map((slug) => ({
    url: `${base}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${base}/writing/system-design`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/research`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/legal`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...legalPages,
    ...RESEARCH_ITEMS.map((item) => ({
      url: `${base}/research/${item.slug}`,
      lastModified: new Date(item.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
