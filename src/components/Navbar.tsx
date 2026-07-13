"use client";

import { useEffect, useState } from "react";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { SITE, PRIMARY_ROLE } from "@/lib/site";
import { useContact } from "@/components/ContactProvider";
import { useTheme } from "@/components/ThemeProvider";

const NAV_LINKS = [
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#hire", label: "Hiring" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const { openContact } = useContact();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="wrap navbar__inner">
        <a href="#hero" className="navbar__brand font-mono">
          {SITE.name.split(" ")[0]}
          <span className="navbar__brand-dot">.</span>
        </a>

        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <a
            href={SITE.resumeUrl}
            download
            className="navbar__resume"
            aria-label="Download resume PDF"
          >
            <Download size={15} aria-hidden="true" />
            <span>Resume</span>
          </a>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>

          <button type="button" className="navbar__badge" onClick={openContact}>
            <span className="navbar__badge-dot" aria-hidden="true" />
            Available · {PRIMARY_ROLE.short}
          </button>

          <button
            type="button"
            className="navbar__menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="navbar__mobile" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={SITE.resumeUrl}
            download
            className="navbar__resume navbar__resume--mobile"
            onClick={() => setMenuOpen(false)}
          >
            <Download size={15} aria-hidden="true" />
            Download Resume (PDF)
          </a>
          <button
            type="button"
            className="theme-toggle theme-toggle--mobile"
            onClick={() => {
              toggle();
              setMenuOpen(false);
            }}
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <button type="button" className="navbar__badge navbar__badge--mobile" onClick={openContact}>
            Available · {PRIMARY_ROLE.title}
          </button>
        </nav>
      )}
    </header>
  );
}
