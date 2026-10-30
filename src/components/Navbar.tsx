"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { SITE } from "@/lib/site";
import { useTheme } from "@/components/ThemeProvider";

const NAV_LINKS = [
  { href: "/#projects", label: "Work", num: "01" },
  { href: "/#experience", label: "Experience", num: "03" },
  { href: "/#writing", label: "Writing", num: "07" },
  { href: "/about", label: "About", num: "08" },
  { href: "/#contact", label: "Contact", num: "10" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggle } = useTheme();
  const pathname = usePathname();

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.hash) {
      window.history.replaceState(null, "", "/");
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className={`nv${scrolled ? " nv--scrolled" : ""}${menuOpen ? " nv--open" : ""}`}>
      <div className="nv__bar">
        <Link
          href="/"
          className="nv__brand"
          aria-label={`${SITE.name}, home`}
          onClick={handleBrandClick}
        >
          <span className="nv__mark" aria-hidden="true">
            SC
          </span>
          <span className="nv__name">
            Srujan<em>Chidarla</em>
          </span>
        </Link>

        <nav className="nv__links" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="nv__link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nv__actions">
          <span className="nv__status" title="Graduating August 2026, open to roles">
            <span className="nv__pulse" aria-hidden="true" />
            Open to work
          </span>
          {/* Both icons render; CSS picks one from html[data-theme] so SSR and client markup match. */}
          <button
            type="button"
            className="nv__icon nv__theme"
            onClick={toggle}
            aria-label="Toggle light and dark theme"
            title="Toggle theme"
          >
            <Sun size={16} aria-hidden="true" className="nv__theme-sun" />
            <Moon size={16} aria-hidden="true" className="nv__theme-moon" />
          </button>
          <a href={SITE.resumeUrl} className="nv__resume">
            Resume
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="nv__burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nv-sheet"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="nv-sheet" className="nv__sheet" hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          <ol className="nv__sheet-links">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} style={{ animationDelay: `${0.04 + i * 0.05}s` }}>
                <Link href={link.href} onClick={() => setMenuOpen(false)}>
                  <span className="nv__sheet-num">{link.num}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="nv__sheet-foot">
          <a href={SITE.resumeUrl} className="btn-primary" onClick={() => setMenuOpen(false)}>
            View resume
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              toggle();
              setMenuOpen(false);
            }}
          >
            <Sun size={15} aria-hidden="true" className="nv__theme-sun" />
            <Moon size={15} aria-hidden="true" className="nv__theme-moon" />
            <span className="nv__theme-sun">Light mode</span>
            <span className="nv__theme-moon">Dark mode</span>
          </button>
          <a className="nv__sheet-mail" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </div>
      </div>
    </header>
  );
}
