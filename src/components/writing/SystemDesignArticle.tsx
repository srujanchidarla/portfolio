"use client";

import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import SystemArchitectureDiagram from "@/components/writing/SystemArchitectureDiagram";
import {
  SYSTEM_DESIGN_ESSAY,
  SYSTEM_DESIGN_SECTIONS,
  SYSTEM_DESIGN_TAKEAWAYS,
} from "@/lib/system-design";
import { formatWritingDate } from "@/lib/writing";

type Props = {
  /** When true, hide page chrome used on the standalone route */
  embedded?: boolean;
  onClose?: () => void;
};

export default function SystemDesignArticle({ embedded = false, onClose }: Props) {
  return (
    <article className={`sd-article${embedded ? " sd-article--embedded" : ""}`}>
      {!embedded ? (
        <Link href="/#writing" className="sd-article__back">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to writing
        </Link>
      ) : null}

      <header className="sd-article__header">
        <p className="section-eyebrow">Long-form note</p>
        <h1 id="sd-modal-title" className="sd-article__title">
          {SYSTEM_DESIGN_ESSAY.title}
        </h1>
        <p className="sd-article__subtitle">{SYSTEM_DESIGN_ESSAY.subtitle}</p>
        <div className="sd-article__meta">
          <time dateTime={SYSTEM_DESIGN_ESSAY.date}>
            {formatWritingDate(SYSTEM_DESIGN_ESSAY.date)}
          </time>
          <span>
            <Clock3 size={14} aria-hidden="true" />
            {SYSTEM_DESIGN_ESSAY.readingMinutes} min read
          </span>
          <span className="sd-article__tags">
            {SYSTEM_DESIGN_ESSAY.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
        </div>
      </header>

      <SystemArchitectureDiagram />

      <div className="sd-article__body">
        {SYSTEM_DESIGN_SECTIONS.map((section) => (
          <section key={section.id} className="sd-article__section">
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section className="sd-article__takeaways">
          <h2>Takeaways</h2>
          <ul>
            {SYSTEM_DESIGN_TAKEAWAYS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="sd-article__footer">
        {embedded && onClose ? (
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
        ) : null}
        {embedded ? (
          <Link href={SYSTEM_DESIGN_ESSAY.href} className="btn-primary">
            Open full page
          </Link>
        ) : (
          <Link href="/#writing" className="btn-secondary">
            Back to homepage writing
          </Link>
        )}
      </footer>
    </article>
  );
}
