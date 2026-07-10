"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SKILL_CLUSTERS } from "@/lib/recruiter-home";

const STRENGTH_COLORS: Record<string, string> = {
  Strong: "var(--c-primary)",
  Comfortable: "var(--c-accent)",
  Foundational: "var(--c-muted)",
};

export default function SkillsImpact() {
  const [active, setActive] = useState(0);
  const cluster = SKILL_CLUSTERS[active];

  return (
    <section id="skills" className="rh-skills">
      <div className="wrap">
        <motion.header
          className="rh-section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="section-eyebrow">Technical foundation</p>
          <h2 className="section-title">
            Strong foundation in <span className="gradient-text">core stacks</span>
          </h2>
          <p className="section-subtitle">
            Honest about where I&apos;m strong vs. still learning — ready to deepen expertise in a
            production environment with mentorship.
          </p>
        </motion.header>

        <div className="rh-skills__panel">
          <div className="rh-skills__cluster-tabs" role="tablist" aria-label="Skill areas">
            {SKILL_CLUSTERS.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={active === i ? "is-active" : ""}
                onClick={() => setActive(i)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <motion.div
            key={cluster.id}
            role="tabpanel"
            className="rh-skills__bars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {cluster.skills.map((skill, si) => (
              <div key={skill.name} className="rh-skills__row">
                <div className="rh-skills__row-top">
                  <span className="rh-skills__name">{skill.name}</span>
                  <span
                    className="rh-skills__strength"
                    style={{ color: STRENGTH_COLORS[skill.strength] }}
                  >
                    {skill.strength}
                  </span>
                </div>
                <div className="rh-skills__track">
                  <motion.div
                    className="rh-skills__fill"
                    style={{ background: STRENGTH_COLORS[skill.strength] }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: si * 0.1 }}
                  />
                </div>
                <p className="rh-skills__proof">
                  {skill.years} · {skill.proof}
                </p>
              </div>
            ))}
          </motion.div>

          <p className="rh-skills__footer-note">
            Ready to deepen expertise in a production environment — especially AWS, distributed
            systems, and AI/ML workflows.
          </p>
        </div>
      </div>
    </section>
  );
}
