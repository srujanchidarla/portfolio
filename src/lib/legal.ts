import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const LEGAL_LAST_UPDATED = "August 24, 2026";
export const LEGAL_LAST_UPDATED_ISO = "2026-08-24";

export type LegalSlug =
  | "privacy"
  | "terms"
  | "cookies"
  | "data"
  | "disclaimer"
  | "accessibility"
  | "license"
  | "security";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "h3"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export type LegalPageContent = {
  slug: LegalSlug;
  title: string;
  description: string;
  eyebrow: string;
  summary: string;
  blocks: LegalBlock[];
};

export const LEGAL_PAGES: Record<LegalSlug, LegalPageContent> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    description:
      "How Srujan Chidarla’s portfolio website and mobile app collect, use, and protect your information.",
    eyebrow: "Legal",
    summary:
      "This portfolio is operated by Srujan Chidarla. We collect minimal data, do not sell personal information, and do not require an account to browse.",
    blocks: [
      {
        type: "p",
        text: `Effective date: ${LEGAL_LAST_UPDATED}. This Privacy Policy applies to ${SITE.website}, related subpages, and the optional Android/iOS app that loads this site (collectively, the “Service”).`,
      },
      {
        type: "h3",
        text: "Who we are",
      },
      {
        type: "p",
        text: `The Service is operated by ${SITE.name} (“we”, “us”, “our”). For privacy questions or requests, contact ${SITE.email}.`,
      },
      {
        type: "h3",
        text: "What we collect",
      },
      {
        type: "ul",
        items: [
          "Usage analytics — anonymous page views and performance metrics via Vercel Analytics (no advertising profiles).",
          "Server logs — standard hosting logs (IP address, browser type, timestamps, requested URLs) retained by Vercel as our host.",
          "AI chat messages — text you submit in the optional “AI avatar” chat is sent to our server and forwarded to Anthropic for processing. We do not operate a user account system and do not persist chat transcripts in our own database.",
          "Theme preference — dark/light mode stored locally in your browser (localStorage).",
          "Email — if you email us directly, we receive whatever you choose to send (not through an on-site form).",
        ],
      },
      {
        type: "h3",
        text: "What we do not collect",
      },
      {
        type: "ul",
        items: [
          "No account registration, passwords, or payment information on this Service.",
          "No sale of personal information.",
          "No targeted advertising based on cross-site tracking.",
          "No intentional collection from children under 13.",
        ],
      },
      {
        type: "h3",
        text: "How we use information",
      },
      {
        type: "ul",
        items: [
          "Operate, secure, and improve the Service.",
          "Respond to AI chat questions about my work and availability.",
          "Display public GitHub activity and project metadata.",
          "Understand aggregate traffic to improve content and performance.",
          "Respond to emails you send voluntarily.",
        ],
      },
      {
        type: "h3",
        text: "Third-party processors",
      },
      {
        type: "table",
        headers: ["Provider", "Purpose", "Privacy link"],
        rows: [
          [
            "Vercel",
            "Hosting, CDN, server logs, Analytics",
            "https://vercel.com/legal/privacy-policy",
          ],
          [
            "Anthropic",
            "AI chat responses (when API is configured)",
            "https://www.anthropic.com/legal/privacy",
          ],
          [
            "GitHub",
            "Public repository stats and activity",
            "https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement",
          ],
          [
            "Google (Calendar)",
            "Optional “Schedule a call” link only — opens Google Calendar",
            "https://policies.google.com/privacy",
          ],
        ],
      },
      {
        type: "h3",
        text: "Legal bases (EEA/UK visitors)",
      },
      {
        type: "p",
        text: "Where GDPR applies: we rely on legitimate interests to operate and secure the site and to understand aggregate usage; your consent when you choose to use the AI chat or email us; and compliance with legal obligations where required.",
      },
      {
        type: "h3",
        text: "Retention",
      },
      {
        type: "ul",
        items: [
          "Chat messages — processed in real time; not stored in our application database. Anthropic and server logs may retain data per their policies.",
          "Analytics — aggregated; retention per Vercel Analytics.",
          "Server logs — retention per Vercel.",
          "Email — kept as long as needed to respond and maintain correspondence.",
          "localStorage theme — until you clear site data.",
        ],
      },
      {
        type: "h3",
        text: "Your rights",
      },
      {
        type: "p",
        text: `Depending on your location, you may have rights to access, correct, delete, or restrict processing of personal data, and to object or withdraw consent. Because we store very little identifiable data, many requests may already be satisfied by default. Contact ${SITE.email} and we will respond within a reasonable time.`,
      },
      {
        type: "h3",
        text: "California (CCPA/CPRA)",
      },
      {
        type: "p",
        text: "We do not sell or share personal information for cross-context behavioral advertising. California residents may request disclosure or deletion by emailing us.",
      },
      {
        type: "h3",
        text: "International transfers",
      },
      {
        type: "p",
        text: "Data may be processed in the United States where our hosting and AI providers operate. We use reputable providers with appropriate safeguards.",
      },
      {
        type: "h3",
        text: "Changes",
      },
      {
        type: "p",
        text: "We may update this policy. The “Last updated” date at the bottom reflects the latest version. Continued use after changes constitutes acceptance of the updated policy.",
      },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms of Use",
    description: "Rules for using Srujan Chidarla’s portfolio website and mobile app.",
    eyebrow: "Legal",
    summary:
      "By using this site or app, you agree to these terms. The Service is an informational portfolio — not a commercial product or employment contract.",
    blocks: [
      {
        type: "p",
        text: `Effective date: ${LEGAL_LAST_UPDATED}. These Terms of Use (“Terms”) govern access to ${SITE.website} and the related mobile app.`,
      },
      {
        type: "h3",
        text: "Acceptance",
      },
      {
        type: "p",
        text: "By accessing the Service, you agree to these Terms and our Privacy Policy. If you do not agree, do not use the Service.",
      },
      {
        type: "h3",
        text: "Purpose of the Service",
      },
      {
        type: "p",
        text: "The Service presents my professional portfolio, writing, projects, and contact information. It may include an AI-powered chat assistant that answers questions about my background. Nothing on the Service constitutes a job offer, contract, or professional advice.",
      },
      {
        type: "h3",
        text: "Acceptable use",
      },
      {
        type: "p",
        text: "You agree not to:",
      },
      {
        type: "ul",
        items: [
          "Use the Service for unlawful, harassing, or abusive purposes.",
          "Attempt to probe, scan, or test vulnerabilities without authorization.",
          "Overload or disrupt servers (including automated scraping beyond reasonable public access).",
          "Submit malware, spam, or content that infringes others’ rights.",
          "Misrepresent AI chat output as guaranteed factual statements about hiring decisions or legal obligations.",
        ],
      },
      {
        type: "h3",
        text: "AI chat",
      },
      {
        type: "p",
        text: "The AI avatar provides informational responses based on configured prompts and public portfolio content. It may be inaccurate or incomplete. Do not rely on it for legal, financial, or hiring commitments. See the Disclaimer.",
      },
      {
        type: "h3",
        text: "Intellectual property",
      },
      {
        type: "p",
        text: `Site content (text, design, media, resume) is owned by ${SITE.name} unless otherwise noted. Third-party trademarks belong to their owners. See the License page for code and content licensing details.`,
      },
      {
        type: "h3",
        text: "Third-party links",
      },
      {
        type: "p",
        text: "Links to GitHub, LinkedIn, Google Calendar, and other sites are provided for convenience. We are not responsible for third-party content or policies.",
      },
      {
        type: "h3",
        text: "Disclaimer of warranties",
      },
      {
        type: "p",
        text: 'The Service is provided “as is” and “as available” without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.',
      },
      {
        type: "h3",
        text: "Limitation of liability",
      },
      {
        type: "p",
        text: "To the fullest extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages arising from use of the Service.",
      },
      {
        type: "h3",
        text: "Termination",
      },
      {
        type: "p",
        text: "We may suspend or restrict access if these Terms are violated or to protect the Service.",
      },
      {
        type: "h3",
        text: "Governing law",
      },
      {
        type: "p",
        text: "These Terms are governed by the laws of the United States and the State of Maryland, without regard to conflict-of-law rules, except where mandatory consumer protection laws in your jurisdiction apply.",
      },
      {
        type: "h3",
        text: "Contact",
      },
      {
        type: "p",
        text: `Questions about these Terms: ${SITE.email}.`,
      },
    ],
  },
  cookies: {
    slug: "cookies",
    title: "Cookie & Storage Policy",
    description:
      "Cookies, local storage, and similar technologies used on this portfolio.",
    eyebrow: "Legal",
    summary:
      "We use minimal client-side storage and privacy-oriented analytics — not advertising cookies.",
    blocks: [
      {
        type: "p",
        text: `Effective date: ${LEGAL_LAST_UPDATED}. This policy explains cookies and similar browser storage on ${SITE.website} and the mobile app WebView.`,
      },
      {
        type: "h3",
        text: "What are cookies and local storage?",
      },
      {
        type: "p",
        text: "Cookies are small text files stored by your browser. Local storage holds data in your browser for longer periods. Both help sites remember preferences.",
      },
      {
        type: "h3",
        text: "What we use",
      },
      {
        type: "table",
        headers: ["Name / type", "Purpose", "Duration", "Essential?"],
        rows: [
          [
            "theme (localStorage)",
            "Remembers dark/light mode",
            "Until cleared",
            "Yes — UI preference",
          ],
          [
            "Vercel Analytics",
            "Anonymous usage metrics",
            "Per Vercel policy",
            "No — analytics",
          ],
          [
            "Hosting session cookies",
            "Security and routing (if set by host)",
            "Session / short",
            "Yes — operation",
          ],
        ],
      },
      {
        type: "h3",
        text: "What we do not use",
      },
      {
        type: "ul",
        items: [
          "No advertising or social-media tracking pixels on this Service.",
          "No third-party marketing remarketing cookies.",
        ],
      },
      {
        type: "h3",
        text: "Consent banner (EEA / UK / CH)",
      },
      {
        type: "p",
        text: "Visitors likely located in the European Economic Area, United Kingdom, or Switzerland see a banner to accept analytics or choose essential-only mode. Your choice is stored in localStorage under cookie-consent until you clear site data.",
      },
      {
        type: "h3",
        text: "Managing preferences",
      },
      {
        type: "ul",
        items: [
          "Clear site data in your browser to reset theme, consent, and any cached state.",
          "Use browser settings to block cookies — the site should still work; theme may not persist.",
          "Mobile app: clear WebView/cache in app settings or reinstall the app.",
        ],
      },
      {
        type: "h3",
        text: "More information",
      },
      {
        type: "p",
        text: "See our Privacy Policy and Data Storage page for how analytics and chat data are handled.",
      },
    ],
  },
  data: {
    slug: "data",
    title: "Data Storage & Processing",
    description:
      "Detailed inventory of data categories, storage locations, and retention for app store compliance.",
    eyebrow: "Legal",
    summary:
      "Transparency table for Google Play Data safety and Apple App Privacy — what is collected, where it goes, and how long it lasts.",
    blocks: [
      {
        type: "p",
        text: `Effective date: ${LEGAL_LAST_UPDATED}. This page supplements the Privacy Policy with a technical inventory for regulators, app stores, and security reviewers.`,
      },
      {
        type: "h3",
        text: "Data inventory",
      },
      {
        type: "table",
        headers: [
          "Category",
          "Examples",
          "Collected?",
          "Stored by us?",
          "Shared with",
          "Purpose",
        ],
        rows: [
          [
            "Identifiers",
            "IP address in server logs",
            "Yes (automatic)",
            "Hosting logs only",
            "Vercel",
            "Security, abuse prevention",
          ],
          [
            "Usage data",
            "Pages viewed, device type (aggregate)",
            "Yes",
            "Analytics provider",
            "Vercel Analytics",
            "Improve site performance",
          ],
          [
            "User content",
            "AI chat messages",
            "If you use chat",
            "Not in app DB",
            "Anthropic",
            "Generate chat replies",
          ],
          [
            "Contact info",
            "Email you send us",
            "If you email",
            "Email inbox",
            "Email provider",
            "Correspondence",
          ],
          [
            "Preferences",
            "Theme (dark/light)",
            "Yes",
            "Your device only",
            "None",
            "UI preference",
          ],
          [
            "Financial",
            "Payment cards",
            "No",
            "—",
            "—",
            "—",
          ],
          [
            "Precise location",
            "GPS",
            "No",
            "—",
            "—",
            "—",
          ],
        ],
      },
      {
        type: "h3",
        text: "Processing flow — AI chat",
      },
      {
        type: "ol",
        items: [
          "You type a message in the browser or mobile app.",
          "Message is sent over HTTPS to our `/api/chat` endpoint on Vercel.",
          "Our server forwards the conversation (with limits: max 12 messages, 2,000 chars each) to Anthropic’s API.",
          "The response is returned to your device and shown in the chat UI.",
          "We do not write chat content to our own database.",
        ],
      },
      {
        type: "h3",
        text: "Processing flow — GitHub activity",
      },
      {
        type: "ol",
        items: [
          "Our server fetches public GitHub API data for my profile and repositories.",
          "Results are cached temporarily for performance.",
          "No visitor personal data is sent to GitHub.",
        ],
      },
      {
        type: "h3",
        text: "Security",
      },
      {
        type: "ul",
        items: [
          "HTTPS enforced in production.",
          "API keys (Anthropic, GitHub) stored as server environment variables — never exposed to the browser.",
          "GitHub webhook endpoint verifies HMAC signatures.",
          "Chat endpoint validates payload size and message limits.",
        ],
      },
      {
        type: "h3",
        text: "Deletion requests",
      },
      {
        type: "p",
        text: `Email ${SITE.email} with “Data request” in the subject. Include enough detail to identify your request (approximate date/time of chat or email). We will coordinate deletion where we control the data and point you to third-party processors where we do not.`,
      },
      {
        type: "h3",
        text: "App store declarations",
      },
      {
        type: "ul",
        items: [
          "Google Play Data safety: Data collected — app activity (analytics); messages (user-provided chat). Data not sold. Encryption in transit.",
          "Apple App Privacy: Data linked to you — minimal (server logs may include IP). Data used for analytics and product functionality.",
        ],
      },
    ],
  },
  disclaimer: {
    slug: "disclaimer",
    title: "Disclaimer",
    description:
      "Limitations on portfolio content, AI chat, and third-party information.",
    eyebrow: "Legal",
    summary:
      "Portfolio and AI content is informational only — not professional, legal, or hiring advice.",
    blocks: [
      {
        type: "h3",
        text: "General information only",
      },
      {
        type: "p",
        text: "All content on this Service — including project descriptions, metrics, resume material, research notes, and blog posts — is provided for general information. While I strive for accuracy, content may become outdated or contain errors.",
      },
      {
        type: "h3",
        text: "AI avatar chat",
      },
      {
        type: "ul",
        items: [
          "Responses are generated by AI and may be wrong, incomplete, or outdated.",
          "AI output does not create a binding offer, interview commitment, or employment relationship.",
          "For hiring or collaboration decisions, contact me directly via email or LinkedIn.",
          "Do not submit sensitive personal data (SSN, passwords, health information) in chat.",
        ],
      },
      {
        type: "h3",
        text: "No professional advice",
      },
      {
        type: "p",
        text: "Nothing on this Service constitutes legal, financial, medical, or immigration advice. Consult qualified professionals for those matters.",
      },
      {
        type: "h3",
        text: "External projects and links",
      },
      {
        type: "p",
        text: "Projects may link to separate applications with their own terms and privacy policies. Metrics cited reflect my understanding at the time of writing and may differ in production systems.",
      },
      {
        type: "h3",
        text: "Availability",
      },
      {
        type: "p",
        text: "The Service may be unavailable during maintenance or outages. We do not guarantee uninterrupted access.",
      },
    ],
  },
  accessibility: {
    slug: "accessibility",
    title: "Accessibility Statement",
    description:
      "Commitment to accessible design and how to report barriers on this portfolio.",
    eyebrow: "Legal",
    summary:
      "We aim for WCAG 2.1 Level AA practices: keyboard navigation, semantic HTML, skip links, and sufficient contrast.",
    blocks: [
      {
        type: "h3",
        text: "Our commitment",
      },
      {
        type: "p",
        text: `${SITE.name} is committed to making ${SITE.website} usable for as many people as possible, including users of assistive technology.`,
      },
      {
        type: "h3",
        text: "Measures we take",
      },
      {
        type: "ul",
        items: [
          "Semantic HTML landmarks and heading structure.",
          "Skip-to-content link on all main layouts.",
          "Keyboard-operable navigation, modals, and chat widget.",
          "Visible focus states and aria labels on interactive controls.",
          "Responsive layout for mobile, tablet, and desktop.",
          "Dark and light themes with readable contrast targets.",
          "Reduced motion respected where Framer Motion allows system preferences.",
        ],
      },
      {
        type: "h3",
        text: "Known limitations",
      },
      {
        type: "ul",
        items: [
          "Custom cursor effects are decorative; core navigation does not depend on them.",
          "Some animations may still run unless your OS enables prefers-reduced-motion.",
          "Third-party embeds (e.g., external maps or calendar links) follow their own accessibility.",
        ],
      },
      {
        type: "h3",
        text: "Feedback",
      },
      {
        type: "p",
        text: `If you encounter a barrier, email ${SITE.email} with “Accessibility” in the subject. Include the page URL and a description of the issue. I aim to respond within 5 business days.`,
      },
      {
        type: "h3",
        text: "Standards",
      },
      {
        type: "p",
        text: "We target WCAG 2.1 Level AA where feasible. This statement was last reviewed on " + LEGAL_LAST_UPDATED + ".",
      },
    ],
  },
  license: {
    slug: "license",
    title: "License & Copyright",
    description:
      "Copyright notice and licensing terms for portfolio content and source code.",
    eyebrow: "Legal",
    summary:
      "Portfolio content is © Srujan Chidarla. Open-source dependencies remain under their respective licenses.",
    blocks: [
      {
        type: "h3",
        text: "Website content",
      },
      {
        type: "p",
        text: `Unless otherwise noted, all original content on ${SITE.website} — including text, resume copy, design, logos, diagrams, and media — is © ${new Date().getFullYear()} ${SITE.name}. All rights reserved. You may not copy, redistribute, or create derivative works for commercial use without written permission.`,
      },
      {
        type: "h3",
        text: "Permitted use",
      },
      {
        type: "ul",
        items: [
          "View and share links to public pages.",
          "Download or print the resume for recruiting purposes.",
          "Quote brief excerpts with attribution and a link to the source.",
        ],
      },
      {
        type: "h3",
        text: "Source code",
      },
      {
        type: "p",
        text: `Source code for this site may be available at ${SITE.github}/portfolio. If no LICENSE file is present in the repository, code is provided for viewing only — not for redistribution. Contact me if you wish to reuse components under a written license.`,
      },
      {
        type: "h3",
        text: "Third-party software",
      },
      {
        type: "p",
        text: "This Service is built with open-source software including Next.js, React, Tailwind CSS, Framer Motion, Lucide icons, and Capacitor (mobile shell). Each project is subject to its own license (typically MIT or Apache-2.0). See package.json and node_modules for full notices.",
      },
      {
        type: "h3",
        text: "Trademarks",
      },
      {
        type: "p",
        text: "GitHub, LinkedIn, Google, Apple, Google Play, App Store, Anthropic, and Vercel are trademarks of their respective owners. Project names (JobHuntOS, CampfireChai, etc.) refer to my work and may be updated over time.",
      },
      {
        type: "h3",
        text: "DMCA / copyright concerns",
      },
      {
        type: "p",
        text: `If you believe content infringes your copyright, contact ${SITE.email} with identification of the work, the URL on our Service, and your contact information.`,
      },
    ],
  },
  security: {
    slug: "security",
    title: "Security Policy",
    description:
      "How to report security vulnerabilities on Srujan Chidarla’s portfolio website and mobile app.",
    eyebrow: "Legal",
    summary:
      "I welcome responsible disclosure of security issues. Please report vulnerabilities privately before public disclosure.",
    blocks: [
      {
        type: "p",
        text: `Effective date: ${LEGAL_LAST_UPDATED}. This Security Policy applies to ${SITE.website}, its API routes, and the optional Android/iOS app shell that loads this site.`,
      },
      {
        type: "h3",
        text: "Scope",
      },
      {
        type: "ul",
        items: [
          "Website and subpages hosted at srujanchidarla.com",
          "Serverless API routes (/api/chat, /api/github/*, /api/dsa-activity)",
          "Capacitor mobile app that loads the production website",
        ],
      },
      {
        type: "h3",
        text: "Out of scope",
      },
      {
        type: "ul",
        items: [
          "Third-party services (Vercel, Anthropic, GitHub, Google Calendar) — report to them directly",
          "Social engineering, phishing, or physical attacks",
          "Denial-of-service or load tests against production",
          "Issues in third-party projects linked from the portfolio unless they directly compromise this site",
          "Missing security headers or best-practice hardening without demonstrable impact",
        ],
      },
      {
        type: "h3",
        text: "How to report",
      },
      {
        type: "p",
        text: `Email ${SITE.email} with subject line “Security vulnerability report”, or use the machine-readable contact in /.well-known/security.txt. Include:`,
      },
      {
        type: "ul",
        items: [
          "Description of the issue and potential impact",
          "Steps to reproduce (URLs, request samples, screenshots)",
          "Your assessment of severity (optional)",
          "Whether you want public credit (name/handle) after fix",
        ],
      },
      {
        type: "h3",
        text: "Safe harbor",
      },
      {
        type: "p",
        text: "I will not pursue legal action against researchers who act in good faith: avoid privacy violations, data destruction, and service disruption; do not access data belonging to others; and give reasonable time to remediate before public disclosure.",
      },
      {
        type: "h3",
        text: "Response timeline",
      },
      {
        type: "ul",
        items: [
          "Acknowledgment — within 3 business days",
          "Initial assessment — within 10 business days",
          "Fix or mitigation — timeline depends on severity; critical issues prioritized",
        ],
      },
      {
        type: "h3",
        text: "Recognition",
      },
      {
        type: "p",
        text: "With your permission, I may thank reporters in release notes or a security acknowledgments section. There is no paid bug bounty program at this time.",
      },
      {
        type: "h3",
        text: "Preferred practices for researchers",
      },
      {
        type: "ul",
        items: [
          "Use test accounts and minimal proof-of-concept data only",
          "Do not exfiltrate personal data from chat logs or server logs",
          "Report webhook or API key exposure immediately — do not use leaked credentials",
        ],
      },
      {
        type: "h3",
        text: "Related policies",
      },
      {
        type: "p",
        text: "See also our Privacy Policy and Data Storage page for how user data is handled.",
      },
    ],
  },
};

export const LEGAL_NAV: { slug: LegalSlug; label: string; href: string }[] = [
  { slug: "privacy", label: "Privacy", href: "/privacy" },
  { slug: "terms", label: "Terms", href: "/terms" },
  { slug: "cookies", label: "Cookies", href: "/cookies" },
  { slug: "data", label: "Data", href: "/data" },
  { slug: "disclaimer", label: "Disclaimer", href: "/disclaimer" },
  { slug: "accessibility", label: "Accessibility", href: "/accessibility" },
  { slug: "license", label: "License", href: "/license" },
  { slug: "security", label: "Security", href: "/security" },
];

export function getLegalMetadata(slug: LegalSlug): Metadata {
  const page = LEGAL_PAGES[slug];
  return {
    title: `${page.title} | ${SITE.name}`,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SITE.website}/${slug}`,
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export function getAllLegalSlugs(): LegalSlug[] {
  return Object.keys(LEGAL_PAGES) as LegalSlug[];
}
