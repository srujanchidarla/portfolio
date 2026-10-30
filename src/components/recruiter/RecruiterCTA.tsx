"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Calendar, Check, Copy, Download, Mail, MessageCircle, Share2 } from "lucide-react";
import { getScheduleHref, SITE } from "@/lib/site";
import { RECRUITER_CONTACT } from "@/lib/recruiter-home";
import { useContact } from "@/components/ContactProvider";
import { canSharePortfolio, sharePortfolio } from "@/lib/share-portfolio";
import { GitHubLogo, LeetCodeLogo, LinkedInLogo } from "@/components/fx/BrandLogos";

const PROFILES = [
  { href: RECRUITER_CONTACT.linkedin, label: "LinkedIn", handle: "in/srujan-chidarla", Logo: LinkedInLogo },
  { href: RECRUITER_CONTACT.github, label: "GitHub", handle: "srujanchidarla", Logo: GitHubLogo },
  { href: RECRUITER_CONTACT.leetcode, label: "LeetCode", handle: "u/srujanchidarla", Logo: LeetCodeLogo },
];

const CONFETTI = ["var(--c-primary)", "var(--c-field)", "#f5c542", "var(--c-text)"];

/** Small burst of confetti from an element (skipped when the visitor prefers less motion). */
function burst(from: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = from.getBoundingClientRect();
  for (let i = 0; i < 18; i++) {
    const bit = document.createElement("span");
    bit.className = "fin__confetti";
    bit.style.left = `${rect.left + rect.width / 2}px`;
    bit.style.top = `${rect.top + rect.height / 2}px`;
    bit.style.background = CONFETTI[i % CONFETTI.length];
    document.body.appendChild(bit);
    const angle = (i / 18) * Math.PI * 2 + Math.random() * 0.4;
    const dist = 60 + Math.random() * 70;
    bit
      .animate(
        [
          { transform: "translate(-50%, -50%) rotate(0deg)", opacity: 1 },
          {
            transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${
              Math.sin(angle) * dist + 40
            }px)) rotate(${Math.random() * 540}deg)`,
            opacity: 0,
          },
        ],
        { duration: 800 + Math.random() * 400, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" }
      )
      .finished.finally(() => bit.remove());
  }
}

export default function RecruiterCTA() {
  const { openContact, openAvatarChat } = useContact();
  const scheduleHref = getScheduleHref();
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setCanShare(canSharePortfolio());
  }, []);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(RECRUITER_CONTACT.email);
      setCopied(true);
      if (copyRef.current) burst(copyRef.current);
    } catch {
      window.location.href = `mailto:${RECRUITER_CONTACT.email}`;
    }
  };

  return (
    <section id="contact" className="lap fin">
      <div className="fin__checker" aria-hidden="true" />
      <div className="wrap fin__inner">
        {/* Finish tape: snaps in two when the section arrives. */}
        <div className="fin__tape" data-cue aria-hidden="true">
          <span className="fin__tape-half fin__tape-half--l">
            <span>Finish · Finish · Finish · Finish · Finish ·</span>
          </span>
          <span className="fin__tape-half fin__tape-half--r">
            <span>Finish · Finish · Finish · Finish · Finish ·</span>
          </span>
        </div>
        <p className="lap-head__eyebrow fin__eyebrow" data-reveal>
          <span className="lap-head__lap">Lap 10</span>
          <span className="lap-head__rule" aria-hidden="true" />
          Finish line
        </p>
        <h2 className="fin__title" data-reveal>
          Let&apos;s build something <em>that ships.</em>
        </h2>
        <p className="fin__lede" data-reveal>
          MS CS · 4.0 · graduating August 2026 · open to relocate anywhere in the US. I respond quickly.
        </p>

        <div className="fin__mail" data-reveal>
          <a href={`mailto:${RECRUITER_CONTACT.email}`} className="fin__email">
            <Mail size={18} aria-hidden="true" />
            {RECRUITER_CONTACT.email}
          </a>
          <button
            ref={copyRef}
            type="button"
            className="fin__copy"
            onClick={copyEmail}
            aria-label={copied ? "Email copied" : "Copy email address"}
          >
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        <div className="fin__actions" data-reveal>
          <a href={SITE.resumeUrl} className="btn-primary">
            <Download size={16} aria-hidden="true" />
            View resume
          </a>
          <a href={scheduleHref} className="btn-secondary">
            <Calendar size={16} aria-hidden="true" />
            Schedule a call
          </a>
          <button type="button" className="btn-secondary" onClick={openAvatarChat}>
            <MessageCircle size={16} aria-hidden="true" />
            Ask my AI avatar
          </button>
          {canShare ? (
            <button type="button" className="btn-secondary" onClick={() => void sharePortfolio()}>
              <Share2 size={16} aria-hidden="true" />
              Share
            </button>
          ) : null}
        </div>

        <ul className="fin__profiles" data-reveal>
          {PROFILES.map(({ href, label, handle, Logo }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="fin__profile" data-spot>
                <span className="fin__profile-logo" aria-hidden="true">
                  <Logo className="fin__profile-svg" />
                </span>
                <span className="fin__profile-copy">
                  <strong>{label}</strong>
                  <span>{handle}</span>
                </span>
                <ArrowUpRight size={16} aria-hidden="true" className="fin__profile-go" />
              </a>
            </li>
          ))}
          <li>
            <button type="button" className="fin__profile" onClick={openContact} data-spot>
              <span className="fin__profile-logo" aria-hidden="true">
                <Mail size={18} />
              </span>
              <span className="fin__profile-copy">
                <strong>Message me</strong>
                <span>All the ways to reach me</span>
              </span>
              <ArrowUpRight size={16} aria-hidden="true" className="fin__profile-go" />
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}
