"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Rocket, User } from "lucide-react";
import { PROOF_CARDS } from "@/lib/recruiter-home";

const ICONS = {
  scale: BarChart3,
  impact: Rocket,
  person: User,
} as const;

export default function ProofSection() {
  const [active, setActive] = useState(0);
  const card = PROOF_CARDS[active];
  const Icon = ICONS[card.icon];

  return (
    <section id="proof" className="rh-proof">
      <div className="wrap">
        <motion.header
          className="rh-section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="section-eyebrow">Why me</p>
          <h2 className="section-title">
            New grad who <span className="gradient-text">ships</span>
          </h2>
          <p className="section-subtitle">
            Honest positioning — graduating soon, already building in production, hungry to learn
            on the right team.
          </p>
        </motion.header>

        <div className="rh-proof__tabs" role="tablist" aria-label="Track record areas">
          {PROOF_CARDS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={`rh-proof__tab${active === i ? " is-active" : ""}`}
              onClick={() => setActive(i)}
              style={{ "--tab-color": c.color } as React.CSSProperties}
            >
              {c.label}
            </button>
          ))}
        </div>

        <motion.article
          key={card.id}
          role="tabpanel"
          className="rh-proof__card"
          style={{ "--proof-color": card.color } as React.CSSProperties}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="rh-proof__card-icon" aria-hidden="true">
            <Icon size={24} />
          </div>
          <div className="rh-proof__card-body">
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
          </div>
        </motion.article>
      </div>
    </section>
  );
}
