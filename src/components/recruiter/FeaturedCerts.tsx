"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/certifications";

const FEATURED_IDS = [
  "aws-cp",
  "google-ux",
  "databricks-genai",
  "prompt-eng",
  "nextjs",
  "angular",
] as const;

const featuredSet = new Set<string>(FEATURED_IDS);

function CertItem({
  cert,
  delay = 0,
}: {
  cert: (typeof CERTIFICATIONS)[number];
  delay?: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25, delay }}
    >
      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="rh-certs__item">
        <span className="rh-certs__title">{cert.title}</span>
        <span className="rh-certs__meta">
          {cert.issuer} · {cert.issued}
        </span>
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    </motion.li>
  );
}

export default function FeaturedCerts() {
  const [expanded, setExpanded] = useState(false);

  const featured = FEATURED_IDS.map((id) => CERTIFICATIONS.find((c) => c.id === id)).filter(
    (c): c is (typeof CERTIFICATIONS)[number] => Boolean(c)
  );
  const rest = CERTIFICATIONS.filter((c) => !featuredSet.has(c.id));
  const hiddenCount = rest.length;

  return (
    <section id="certifications" className="rh-certs">
      <div className="wrap">
        <motion.header
          className="rh-section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <p className="section-eyebrow">Credentials</p>
          <h2 className="section-title">
            Certifications that <span className="gradient-text">signal learning</span>
          </h2>
          <p className="section-subtitle">
            Featured credentials across cloud, AI, and full-stack — {CERTIFICATIONS.length} total
            with links to verify.
          </p>
        </motion.header>

        <ul className="rh-certs__list">
          {featured.map((cert, i) => (
            <CertItem key={cert.id} cert={cert} delay={i * 0.03} />
          ))}
          <AnimatePresence initial={false}>
            {expanded
              ? rest.map((cert, i) => (
                  <CertItem key={cert.id} cert={cert} delay={Math.min(i, 8) * 0.03} />
                ))
              : null}
          </AnimatePresence>
        </ul>

        {hiddenCount > 0 ? (
          <div className="rh-certs__more">
            <button
              type="button"
              className="btn-secondary rh-certs__toggle"
              aria-expanded={expanded}
              aria-controls="certifications"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? (
                <>
                  Show less
                  <ChevronUp size={16} aria-hidden="true" />
                </>
              ) : (
                <>
                  Show {hiddenCount} more
                  <ChevronDown size={16} aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        ) : null}

        <p className="rh-certs__footer">
          {expanded
            ? `${CERTIFICATIONS.length} verified credentials — each links to the issuer.`
            : `${featured.length} featured · ${CERTIFICATIONS.length} total with verification links.`}
        </p>
      </div>
    </section>
  );
}
