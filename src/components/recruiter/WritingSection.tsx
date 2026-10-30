"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, ArrowUpRight, BookOpen, Bot, Database, Newspaper, Server, Users, Zap } from "lucide-react";
import { SITE } from "@/lib/site";
import { WRITING_POSTS, formatWritingDate } from "@/lib/writing";
import { SYSTEM_DESIGN_ESSAY } from "@/lib/system-design";
import SystemDesignModal from "@/components/writing/SystemDesignModal";
import LapHeader from "@/components/fx/LapHeader";

const FEATURED = WRITING_POSTS.slice(0, 3);

const ARCH = [
  { Icon: Users, label: "Clients" },
  { Icon: Server, label: "Gateway" },
  { Icon: Bot, label: "LLM router" },
  { Icon: Zap, label: "Cache" },
  { Icon: Database, label: "Store" },
  { Icon: Activity, label: "Observe" },
];

/** Six-stage request path; dashed connectors animate the flow. */
function MiniArchitecture() {
  return (
    <ol className="wr-arch" aria-label="Request path: clients, gateway, LLM router, cache, store, observability">
      {ARCH.map(({ Icon, label }, i) => (
        <li key={label}>
          <span className="wr-arch__node" style={{ animationDelay: `${i * 0.35}s` }}>
            <Icon size={16} aria-hidden="true" />
          </span>
          <span className="wr-arch__label">{label}</span>
        </li>
      ))}
    </ol>
  );
}

export default function WritingSection() {
  const [essayOpen, setEssayOpen] = useState(false);

  return (
    <section id="writing" className="lap wr">
      <div className="wrap">
        <LapHeader
          lap="07"
          eyebrow="Tech notes"
          title={
            <>
              Writing that <em>keeps me sharp</em>
            </>
          }
          lede="Short takes plus a longer essay on system design in the AI era — how architecture evolved, and why it still matters when I ship."
        />

        <article className="wr-essay" data-reveal data-spot>
          <div className="wr-essay__copy">
            <p className="wr-essay__eyebrow">
              <BookOpen size={14} aria-hidden="true" />
              Featured essay · {SYSTEM_DESIGN_ESSAY.readingMinutes} min read
            </p>
            <h3 className="wr-essay__title">{SYSTEM_DESIGN_ESSAY.title}</h3>
            <p className="wr-essay__summary">{SYSTEM_DESIGN_ESSAY.summary}</p>
            <div className="wr-essay__actions">
              <Link href={SYSTEM_DESIGN_ESSAY.href} className="btn-primary">
                Read the essay
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <button type="button" className="btn-secondary" onClick={() => setEssayOpen(true)}>
                Quick summary
              </button>
            </div>
          </div>
          <Link href={SYSTEM_DESIGN_ESSAY.href} className="wr-essay__visual" aria-label="Open the system design essay">
            <MiniArchitecture />
            <span className="wr-essay__hint">
              Interactive architecture inside
              <ArrowUpRight size={13} aria-hidden="true" />
            </span>
          </Link>
        </article>

        <ol className="wr-list">
          {FEATURED.map((post) => {
            const isInternal = post.href.startsWith("/");
            const inner = (
              <>
                <time className="wr-row__date" dateTime={post.date}>
                  {formatWritingDate(post.date)}
                </time>
                <span className="wr-row__main">
                  <span className="wr-row__title">{post.title}</span>
                  <span className="wr-row__summary">{post.summary}</span>
                </span>
                <span className="wr-row__tags">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </span>
                <span className="wr-row__go">
                  {isInternal ? "Note" : "LinkedIn"}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
              </>
            );
            return (
              <li key={post.id} data-reveal>
                {isInternal ? (
                  <Link href={post.href} className="wr-row">
                    {inner}
                  </Link>
                ) : (
                  <a href={post.href} target="_blank" rel="noopener noreferrer" className="wr-row">
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ol>

        <div className="wr-foot">
          <Link href="/research" className="wk-link">
            <BookOpen size={15} aria-hidden="true" />
            Research &amp; ideas
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="wk-link">
            <Newspaper size={15} aria-hidden="true" />
            All notes on LinkedIn
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      <SystemDesignModal isOpen={essayOpen} onClose={() => setEssayOpen(false)} />
    </section>
  );
}
