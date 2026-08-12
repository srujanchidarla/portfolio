import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock3, FileText } from "lucide-react";
import { formatWritingDate } from "@/lib/writing";
import {
  researchKindLabel,
  researchStatusLabel,
  type ResearchItem,
} from "@/lib/research";

export default function ResearchNote({ item }: { item: ResearchItem }) {
  return (
    <article className="sd-article">
      <Link href="/research" className="sd-article__back">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to research
      </Link>

      <header className="sd-article__header">
        <p className="section-eyebrow">
          {researchKindLabel(item.kind)} · {researchStatusLabel(item.status)}
        </p>
        <h1 className="sd-article__title">{item.title}</h1>
        {item.subtitle ? <p className="sd-article__subtitle">{item.subtitle}</p> : null}
        <div className="sd-article__meta">
          <time dateTime={item.date}>{formatWritingDate(item.date)}</time>
          {item.readingMinutes ? (
            <span>
              <Clock3 size={14} aria-hidden="true" />
              {item.readingMinutes} min read
            </span>
          ) : null}
          {item.venue ? <span>{item.venue}</span> : null}
          <span className="sd-article__tags">
            {item.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
        </div>
        <p className="research-note__authors">{item.authors.join(", ")}</p>
      </header>

      {(item.pdf || item.externalUrl) && (
        <div className="research-note__links">
          {item.pdf ? (
            <a href={item.pdf} className="btn-primary" target="_blank" rel="noopener noreferrer">
              <FileText size={14} aria-hidden="true" />
              PDF
            </a>
          ) : null}
          {item.externalUrl ? (
            <a
              href={item.externalUrl}
              className="btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Venue / DOI
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      )}

      <p className="research-note__abstract">{item.abstract}</p>

      {item.sections?.length ? (
        <div className="sd-article__body">
          {item.sections.map((section) => (
            <section key={section.heading} className="sd-article__section">
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      ) : null}

      {item.openQuestions?.length ? (
        <section className="sd-article__takeaways">
          <h2>Open questions</h2>
          <ul>
            {item.openQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <footer className="sd-article__footer">
        <Link href="/research" className="btn-secondary">
          All research
        </Link>
      </footer>
    </article>
  );
}
