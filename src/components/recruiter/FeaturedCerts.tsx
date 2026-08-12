"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/certifications";

const FEATURED_IDS = [
  "aws-cp",
  "google-ux",
  "databricks-genai",
  "prompt-eng",
  "nextjs",
  "angular",
] as const;

export default function FeaturedCerts() {
  const list = FEATURED_IDS.map((id) => CERTIFICATIONS.find((c) => c.id === id)).filter(
    (c): c is (typeof CERTIFICATIONS)[number] => Boolean(c)
  );

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
          {list.map((cert, i) => (
            <motion.li
              key={cert.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="rh-certs__item">
                <span className="rh-certs__title">{cert.title}</span>
                <span className="rh-certs__meta">
                  {cert.issuer} · {cert.issued}
                </span>
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </motion.li>
          ))}
        </ul>
        <p className="rh-certs__footer">
          {CERTIFICATIONS.length} verified credentials — each links to the issuer for verification.
        </p>
      </div>
    </section>
  );
}
