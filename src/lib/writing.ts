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
    id: "networking-to-microservices",
    title: "TCP backpressure taught me more about microservices than most blog posts",
    date: "2026-08-22",
    summary:
      "Computer networks coursework (congestion control, flow control, BGP/OSPF) maps cleanly onto service design: queues, rate limits, circuit breakers, and why P99 latency matters when the pipe fills up.",
    tags: ["Networking", "System Design", "Backend"],
    href: "/research/networking-microservices-bridge",
  },
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
      "Why Wildmate and JobHuntOS matter more on a résumé than another unfinished tutorial clone — and how recruiters actually scan portfolios.",
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

/** Deep dive: what happens between typing "google.com" and seeing the page. */
export const NETWORK_JOURNEY = {
  title: "What really happens when you type google.com and hit Enter",
  summary:
    "I mapped the whole trip — every packet, protocol, and process — into a flowchart with the right shape for every step, phases colored by OSI layer, and the background work most diagrams leave out.",
  href: "/writing/google-com",
  stats: [
    { value: "29+", label: "distinct steps" },
    { value: "6", label: "network layers" },
    { value: "70k+", label: "autonomous systems" },
    { value: "100–500", unit: "ms", label: "end to end" },
  ],
  phases: [
    { name: "Application", detail: "URL parsing, HSTS check, DNS resolution" },
    { name: "Transport", detail: "TCP SYN → SYN-ACK → ACK, then TLS 1.3 in one round trip" },
    { name: "Network", detail: "HTTP → segment → packet → frame; ARP finds the router" },
    { name: "Internet", detail: "NAT, then BGP across 10–20 networks" },
    { name: "Server", detail: "Anycast to the nearest edge; Maglev picks a healthy server" },
    { name: "Return", detail: "Back by maybe another route; DOM + CSSOM become pixels" },
  ],
} as const;
