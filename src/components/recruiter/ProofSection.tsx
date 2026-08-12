"use client";

import { motion } from "framer-motion";
import { BarChart3, Rocket, Layers } from "lucide-react";
import { PROOF_CARDS } from "@/lib/recruiter-home";

const ICONS = {
  scale: BarChart3,
  impact: Rocket,
  person: Layers,
} as const;

export default function ProofSection() {
  return (
    <section id="proof" className="rh-proof">
      <div className="wrap">
        <motion.header
          className="rh-section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="section-eyebrow">How I work</p>
          <h2 className="section-title">
            Built in production, <span className="gradient-text">shipped for people</span>
          </h2>
          <p className="section-subtitle">
            A few facts about the work — not a menu of job titles.
          </p>
        </motion.header>

        <div className="rh-proof__pillars">
          {PROOF_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon];
            return (
              <motion.article
                key={card.id}
                className="rh-proof__pillar"
                style={{ "--proof-color": card.color } as React.CSSProperties}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="rh-proof__pillar-top">
                  <span className="rh-proof__pillar-icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <p className="rh-proof__pillar-label">{card.label}</p>
                </div>
                <h3>{card.headline}</h3>
                <p className="rh-proof__subline">{card.subline}</p>
                <p className="rh-proof__detail">{card.detail}</p>
                <div className="rh-proof__metrics">
                  {card.metrics.map((m) => (
                    <span key={m} className="rh-proof__metric-pill">
                      {m}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
