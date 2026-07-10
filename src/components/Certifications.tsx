"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { CERT_CATEGORIES, CERTIFICATIONS, type CertCategory } from "@/lib/certifications";

const CATEGORY_ORDER: CertCategory[] = [
  "cloud",
  "ai",
  "frontend",
  "backend",
  "design",
  "tools",
  "fundamentals",
];

export default function Certifications() {
  return (
    <section id="certifications" className="certifications-section">
      <div className="wrap">
        <motion.header
          className="certifications-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">Credentials</p>
          <h2 className="section-title">
            Certifications & <span className="gradient-text">Learning</span>
          </h2>
          <p className="section-subtitle">
            {CERTIFICATIONS.length} verified credentials across cloud, AI, full-stack
            development, design, and fundamentals — each with a verifiable certificate.
          </p>
        </motion.header>

        {CATEGORY_ORDER.map((category) => {
          const certs = CERTIFICATIONS.filter((c) => c.category === category);
          if (certs.length === 0) return null;

          return (
            <div key={category} className="cert-group">
              <h3 className="cert-group__title">{CERT_CATEGORIES[category]}</h3>
              <div className="cert-grid">
                {certs.map((cert, i) => (
                  <motion.a
                    key={cert.id}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-card"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                  >
                    <div className="cert-card__top">
                      <span className="cert-card__title">{cert.title}</span>
                      <ExternalLink size={14} className="cert-card__icon" aria-hidden="true" />
                    </div>
                    <p className="cert-card__issuer">{cert.issuer}</p>
                    <p className="cert-card__date">{cert.issued}</p>
                  </motion.a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
