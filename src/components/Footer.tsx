"use client";

import Link from "next/link";
import { ArrowRight, ArrowUp } from "lucide-react";
import { SITE } from "@/lib/site";
import { useContact } from "@/components/ContactProvider";

const COLUMNS = [
  {
    title: "Site",
    links: [
      { label: "Work", href: "/#projects" },
      { label: "Experience", href: "/#experience" },
      { label: "Writing", href: "/#writing" },
      { label: "Research", href: "/research" },
      { label: "About", href: "/about" },
      { label: "Resume", href: SITE.resumeUrl },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "LinkedIn", href: SITE.linkedin, external: true },
      { label: "GitHub", href: SITE.github, external: true },
      { label: "LeetCode", href: SITE.leetcode, external: true },
      { label: "Local Guide", href: SITE.localGuide, external: true },
      { label: "Email", href: `mailto:${SITE.email}` },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Security", href: "/security" },
      { label: "All policies", href: "/legal" },
    ],
  },
];

export default function Footer() {
  const { openContact } = useContact();
  const year = new Date().getFullYear();

  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft__top">
          <div className="ft__pitch">
            <p className="ft__badge">
              <span aria-hidden="true" />
              {SITE.status}
            </p>
            <p className="ft__line">
              Systems, products, and <em>the discipline to finish them.</em>
            </p>
            <button type="button" className="btn-primary" onClick={openContact}>
              Let&apos;s talk
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>

          <nav className="ft__cols" aria-label="Footer">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="ft__col-title">{col.title}</p>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {"external" in link && link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      ) : link.href.startsWith("/") && !link.href.startsWith(SITE.resumeUrl) ? (
                        <Link href={link.href}>{link.label}</Link>
                      ) : (
                        <a href={link.href}>{link.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="ft__wordmark" aria-hidden="true" data-cue>
          Srujan Chidarla
        </p>

        <div className="ft__bottom">
          <p>
            © {year} {SITE.name}. Built with Next.js.
          </p>
          <p>Last updated {SITE.lastUpdated}</p>
          <a href="#main-content" className="ft__top-link">
            Back to start
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
