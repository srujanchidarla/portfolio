"use client";

import { motion } from "framer-motion";
import { ACHIEVEMENTS, PROFILE_HIGHLIGHTS } from "@/lib/credibility";
import CredibilityCard from "./credibility/CredibilityCard";
import ProfileHighlightCard from "./credibility/ProfileHighlightCard";

export default function Credibility() {
  return (
    <section id="credibility" className="credibility-section">
      <div className="wrap">
        <motion.header
          className="credibility-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">Proof of Credibility</p>
          <h2 className="section-title">
            Verified <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Education, production scale, community trust, and certifications —
            factual credentials backed by verifiable records.
          </p>
        </motion.header>

        <div className="cred-grid">
          {ACHIEVEMENTS.map((achievement, i) => (
            <CredibilityCard key={achievement.id} achievement={achievement} index={i} />
          ))}
        </div>

        <div className="profile-highlights">
          <h3 className="profile-highlights__heading">Beyond engineering</h3>
          <div className="profile-highlights__grid">
            {PROFILE_HIGHLIGHTS.map((highlight, i) => (
              <ProfileHighlightCard key={highlight.id} highlight={highlight} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
