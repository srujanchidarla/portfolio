"use client";

import { useState } from "react";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  Bot,
  Database,
  Globe,
  Handshake,
  Layers,
  MonitorSmartphone,
  Newspaper,
  Route,
  Server,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { NETWORK_JOURNEY, WRITING_POSTS, formatWritingDate } from "@/lib/writing";
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

const PHASE_ICONS = [Globe, Handshake, Layers, Route, Server, MonitorSmartphone];

/** A packet runs the six phases of a page load; each stop lights as it passes. */
function PacketJourney() {
  return (
    <article className="wr-trip" data-reveal data-spot>
      <div className="wr-trip__copy">
        <p className="wr-essay__eyebrow">
          <Workflow size={14} aria-hidden="true" />
          Deep dive · interactive flowchart
        </p>
        <h3 className="wr-trip__title">
          What really happens when you type <code>google.com</code> and hit Enter
        </h3>
        <p className="wr-trip__summary">{NETWORK_JOURNEY.summary}</p>
        <dl className="wr-trip__stats">
          {NETWORK_JOURNEY.stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>
                {stat.value}
                {"unit" in stat ? <small>{stat.unit}</small> : null}
              </dd>
            </div>
          ))}
        </dl>
        <div className="wr-essay__actions">
          <a href={NETWORK_JOURNEY.artifactHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Open the interactive map
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href={NETWORK_JOURNEY.flowchartHref} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Flowchart
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="wr-trip__route" data-cue>
        <p className="wr-trip__url" aria-hidden="true">
          <span>https://</span>google.com<i />
        </p>
        <ol className="wr-trip__phases" aria-label="The six phases of a page load">
          {NETWORK_JOURNEY.phases.map((phase, i) => {
            const Icon = PHASE_ICONS[i];
            return (
              <li key={phase.name} style={{ "--i": i } as CSSProperties}>
                <span className="wr-trip__node">
                  <Icon size={16} aria-hidden="true" />
                </span>
                <span className="wr-trip__phase">
                  <span className="wr-trip__num">{String(i + 1).padStart(2, "0")}</span>
                  <strong>{phase.name}</strong>
                  <span>{phase.detail}</span>
                </span>
              </li>
            );
          })}
        </ol>
        <p className="wr-trip__done" aria-hidden="true">
          200 OK · page painted
        </p>
      </div>
    </article>
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
            <svg className="wr-essay__squiggle" viewBox="0 0 220 14" aria-hidden="true">
              <path
                d="M2 9 C 20 2, 34 13, 52 7 S 86 2, 104 8 S 140 13, 158 6 S 196 3, 218 8"
                pathLength={1}
              />
            </svg>
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

        <PacketJourney />

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
