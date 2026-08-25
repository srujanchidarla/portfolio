import Link from "next/link";
import { LEGAL_LAST_UPDATED, LEGAL_LAST_UPDATED_ISO, LEGAL_PAGES, LEGAL_NAV } from "@/lib/legal";
import { SITE } from "@/lib/site";

export default function LegalIndex() {
  return (
    <article className="legal-doc">
      <header className="legal-doc__header">
        <p className="section-eyebrow">Legal</p>
        <h1 className="legal-doc__title">Policies & compliance</h1>
        <p className="legal-doc__summary">
          Required disclosures for {SITE.website} and the Android/iOS portfolio app — privacy,
          terms, cookies, data processing, and accessibility.
        </p>
        <p className="legal-doc__meta">
          Last updated{" "}
          <time dateTime={LEGAL_LAST_UPDATED_ISO}>{LEGAL_LAST_UPDATED}</time>
        </p>
      </header>

      <ul className="legal-index">
        {LEGAL_NAV.map(({ slug, href }) => {
          const page = LEGAL_PAGES[slug];
          return (
            <li key={slug}>
              <Link href={href} className="legal-index__card">
                <strong>{page.title}</strong>
                <span>{page.description}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="legal-doc__body">
        <h2>App store requirements</h2>
        <p>
          Use <Link href="/privacy">Privacy Policy</Link> and{" "}
          <Link href="/data">Data Storage</Link> URLs when submitting to Google Play and Apple App
          Store. Support contact:{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </div>
    </article>
  );
}
