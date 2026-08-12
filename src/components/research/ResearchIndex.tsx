import Link from "next/link";
import { ArrowUpRight, FileText, Lightbulb, Microscope } from "lucide-react";
import { formatWritingDate } from "@/lib/writing";
import {
  RESEARCH_IDEAS,
  RESEARCH_PAPERS,
  researchHref,
  researchKindLabel,
  researchStatusLabel,
  type ResearchItem,
} from "@/lib/research";

function ResearchCard({ item }: { item: ResearchItem }) {
  const href = researchHref(item);

  return (
    <Link href={href} className="research-card">
      <div className="research-card__meta">
        <span className="research-card__kind">{researchKindLabel(item.kind)}</span>
        <time dateTime={item.date}>{formatWritingDate(item.date)}</time>
      </div>
      <h3 className="research-card__title">{item.title}</h3>
      <p className="research-card__abstract">{item.abstract}</p>
      <div className="research-card__footer">
        <span className="research-card__venue">{item.venue ?? researchStatusLabel(item.status)}</span>
        <span className="research-card__cta">
          Read note
          <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default function ResearchIndex() {
  return (
    <div className="research-page">
      <header className="rh-section-header research-page__header">
        <p className="section-eyebrow">
          <Microscope size={14} aria-hidden="true" />
          Lab notes
        </p>
        <h1 className="section-title">
          Research <span className="gradient-text">and ideas</span>
        </h1>
        <p className="section-subtitle">
          Papers and preprints when they exist. Working notes and open questions in the meantime —
          labeled as ideas, not publications.
        </p>
      </header>

      <section className="research-block" aria-labelledby="research-papers-heading">
        <div className="research-block__head">
          <h2 id="research-papers-heading">
            <FileText size={18} aria-hidden="true" />
            Papers
          </h2>
          <p>Peer-reviewed work and preprints. PDF and venue go here when a piece is real.</p>
        </div>

        {RESEARCH_PAPERS.length === 0 ? (
          <div className="research-empty">
            <p className="research-empty__title">No papers yet</p>
            <p className="research-empty__text">
              When a paper or preprint is ready, it lands here with title, authors, venue, abstract,
              and a PDF. Until then this shelf stays empty on purpose.
            </p>
          </div>
        ) : (
          <div className="research-grid">
            {RESEARCH_PAPERS.map((item) => (
              <ResearchCard key={item.slug} item={item} />
            ))}
          </div>
        )}
      </section>

      <section className="research-block" aria-labelledby="research-ideas-heading">
        <div className="research-block__head">
          <h2 id="research-ideas-heading">
            <Lightbulb size={18} aria-hidden="true" />
            Ideas
          </h2>
          <p>Questions I am actually chewing on while shipping products. Not citations.</p>
        </div>

        {RESEARCH_IDEAS.length === 0 ? (
          <div className="research-empty">
            <p className="research-empty__title">No notes yet</p>
            <p className="research-empty__text">Open questions and sketches will show up here.</p>
          </div>
        ) : (
          <div className="research-grid">
            {RESEARCH_IDEAS.map((item) => (
              <ResearchCard key={item.slug} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
