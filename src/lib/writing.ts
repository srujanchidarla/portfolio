export type WritingPost = {
  id: string;
  title: string;
  date: string; // ISO date
  summary: string;
  tags: readonly string[];
  /** LinkedIn post URL — update when you publish */
  href: string;
};

/**
 * Tech notes mirrored from LinkedIn (~2 major tech-news takes regularly).
 * Replace `href` with the exact LinkedIn post URL after publishing.
 */
export const WRITING_POSTS: WritingPost[] = [
  {
    id: "ai-agents-2026",
    title: "Why multi-agent systems are leaving the demo phase",
    date: "2026-07-08",
    summary:
      "A short take on how agent orchestration is moving from toy demos into real product workflows — and what that means for full-stack engineers learning AI tooling.",
    tags: ["AI", "Agents", "Engineering"],
    href: "https://www.linkedin.com/in/srujan-chidarla",
  },
  {
    id: "nextjs-performance",
    title: "What Next.js performance work actually looks like in production",
    date: "2026-06-24",
    summary:
      "Caching, image strategy, and shipping less JavaScript — practical notes from building recruiter-facing apps where first load still matters.",
    tags: ["Next.js", "Performance", "Web"],
    href: "https://www.linkedin.com/in/srujan-chidarla",
  },
  {
    id: "new-grad-shipping",
    title: "New grads don't need a perfect stack — they need shipped proof",
    date: "2026-06-10",
    summary:
      "Why CampfireChai and JobHuntOS matter more on a résumé than another unfinished tutorial clone — and how recruiters actually scan portfolios.",
    tags: ["Career", "New Grad", "Portfolio"],
    href: "https://www.linkedin.com/in/srujan-chidarla",
  },
  {
    id: "browser-extensions",
    title: "Chrome MV3 taught me more about constraints than any course",
    date: "2026-05-28",
    summary:
      "Shipping JobHuntOS to the Chrome Web Store: permissions, streaming APIs, and designing for strangers who install your extension once.",
    tags: ["Chrome", "Extensions", "Product"],
    href: "https://www.linkedin.com/in/srujan-chidarla",
  },
] as const;

export function formatWritingDate(iso: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
