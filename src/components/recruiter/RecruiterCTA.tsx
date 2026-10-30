"use client";

import { useEffect, useState } from "react";
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

export default function RecruiterCTA() {
  const { openContact, openAvatarChat } = useContact();
  const scheduleHref = getScheduleHref();
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);

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
    } catch {
      window.location.href = `mailto:${RECRUITER_CONTACT.email}`;
    }
  };

  return (
    <section id="contact" className="lap fin">
      <div className="fin__checker" aria-hidden="true" />
      <div className="wrap fin__inner">
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
