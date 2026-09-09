"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { useContact } from "@/components/ContactProvider";

export default function Footer() {
  const { openContact } = useContact();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__cta">
          <div className="footer__cta-text">
            <span className="footer__badge">
              <span className="footer__badge-dot" aria-hidden="true" />
              Engineer · athlete · builder
            </span>
            <p className="footer__headline font-mono">
              Always shipping. Always training.
            </p>
          </div>
          <button type="button" className="btn-hiring-primary btn-hiring-primary--sm" onClick={openContact}>
            Let&apos;s Talk
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="footer__links">
          <a href={SITE.resumeUrl}>Resume</a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={SITE.localGuide} target="_blank" rel="noopener noreferrer">
            Local Guide
          </a>
          <a href={`mailto:${SITE.email}`}>Email</a>
          <Link href="/about">About</Link>
          <Link href="/#writing">Writing</Link>
          <Link href="/research">Research</Link>
          <Link href="/#github">GitHub activity</Link>
          <Link href="/#contact">Contact</Link>
        </div>

        <nav className="footer__legal" aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/data">Data</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/accessibility">Accessibility</Link>
          <Link href="/license">License</Link>
          <Link href="/security">Security</Link>
          <Link href="/legal">All policies</Link>
        </nav>

        <div className="footer__bottom">
          <p>
            © {year} {SITE.name}. Built with Next.js.
          </p>
          <p className="footer__updated">Last updated {SITE.lastUpdated}</p>
        </div>
      </div>
    </footer>
  );
}
