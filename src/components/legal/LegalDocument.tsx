import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  LEGAL_LAST_UPDATED,
  LEGAL_LAST_UPDATED_ISO,
  LEGAL_NAV,
  LEGAL_PAGES,
  type LegalBlock,
  type LegalSlug,
} from "@/lib/legal";
import { SITE } from "@/lib/site";

function LegalBlockView({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h3":
      return <h2>{block.text}</h2>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="legal-table-wrap">
          <table className="legal-table">
            <thead>
              <tr>
                {block.headers.map((header) => (
                  <th key={header} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`}>
                      {cell.startsWith("http") ? (
                        <a href={cell} target="_blank" rel="noopener noreferrer">
                          {cell.replace(/^https?:\/\//, "").slice(0, 48)}
                          {cell.length > 56 ? "…" : ""}
                        </a>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default function LegalDocument({ slug }: { slug: LegalSlug }) {
  const page = LEGAL_PAGES[slug];

  return (
    <article className="legal-doc">
      <Link href="/legal" className="legal-doc__back">
        <ArrowLeft size={16} aria-hidden="true" />
        All legal pages
      </Link>

      <header className="legal-doc__header">
        <p className="section-eyebrow">{page.eyebrow}</p>
        <h1 className="legal-doc__title">{page.title}</h1>
        <p className="legal-doc__summary">{page.summary}</p>
        <p className="legal-doc__meta">
          Last updated{" "}
          <time dateTime={LEGAL_LAST_UPDATED_ISO}>{LEGAL_LAST_UPDATED}</time>
          {" · "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </header>

      <nav className="legal-doc__nav" aria-label="Legal pages">
        {LEGAL_NAV.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            aria-current={item.slug === slug ? "page" : undefined}
            className={item.slug === slug ? "is-active" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="legal-doc__body">
        {page.blocks.map((block, index) => (
          <LegalBlockView key={`${slug}-${index}`} block={block} />
        ))}
      </div>

      <footer className="legal-doc__footer">
        <p>
          Questions?{" "}
          <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(page.title)}`}>
            Contact {SITE.name}
          </a>
        </p>
      </footer>
    </article>
  );
}
