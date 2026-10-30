"use client";

import { useState, type CSSProperties } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/certifications";
import { CertBrandIcon, certAccentHex } from "@/lib/cert-icons";
import LapHeader from "@/components/fx/LapHeader";

const FEATURED_IDS = ["aws-cp", "google-ux", "databricks-genai", "prompt-eng", "nextjs", "angular"] as const;

const featuredSet = new Set<string>(FEATURED_IDS);

type Cert = (typeof CERTIFICATIONS)[number];

function CertItem({ cert, featured = false, index = 0 }: { cert: Cert; featured?: boolean; index?: number }) {
  return (
    <li
      className={featured ? "cred__item is-featured" : "cred__item"}
      style={{ "--i": index } as CSSProperties}
    >
      <a
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        className="cred__link"
        style={{ "--cert-color": `#${certAccentHex(cert.id)}` } as CSSProperties}
        data-spot
      >
        <span className="cred__icon" aria-hidden="true">
          <CertBrandIcon certId={cert.id} size={18} />
        </span>
        <span className="cred__copy">
          <span className="cred__title">{cert.title}</span>
          <span className="cred__meta">
            {cert.issuer} · {cert.issued}
          </span>
        </span>
        <span className="cred__verify">
          Verify
          <ArrowUpRight size={13} aria-hidden="true" />
        </span>
      </a>
    </li>
  );
}

export default function FeaturedCerts() {
  const [expanded, setExpanded] = useState(false);

  const featured = FEATURED_IDS.map((id) => CERTIFICATIONS.find((c) => c.id === id)).filter(
    (c): c is Cert => Boolean(c)
  );
  const rest = CERTIFICATIONS.filter((c) => !featuredSet.has(c.id));

  return (
    <section id="certifications" className="lap cred">
      <div className="wrap">
        <LapHeader
          lap="06"
          eyebrow="Credentials"
          title={
            <>
              Certifications that <em>signal learning</em>
            </>
          }
          lede={`Featured credentials across cloud, AI, and full-stack — ${CERTIFICATIONS.length} in total, each linked to the issuer.`}
        />

        <ul className="cred__grid" id="cred-list" data-reveal>
          {featured.map((cert, i) => (
            <CertItem key={cert.id} cert={cert} featured index={i} />
          ))}
          {expanded ? rest.map((cert) => <CertItem key={cert.id} cert={cert} />) : null}
        </ul>

        {rest.length > 0 ? (
          <div className="cred__more">
            <button
              type="button"
              className="btn-secondary"
              aria-expanded={expanded}
              aria-controls="cred-list"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "Show fewer" : `Show all ${CERTIFICATIONS.length}`}
              {expanded ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
            </button>
            <span className="cred__count">
              {expanded ? CERTIFICATIONS.length : featured.length} / {CERTIFICATIONS.length} shown
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
