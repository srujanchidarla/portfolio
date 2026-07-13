"use client";

import { motion } from "framer-motion";
import { EXPERIENCES } from "@/lib/experience";
import { SITE } from "@/lib/site";
import ExperienceCard from "./experience/ExperienceCard";

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="wrap">
        <motion.header
          className="experience-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">My path so far</p>
          <h2 className="section-title">
            Experience & <span className="gradient-text">learning</span>
          </h2>
          <p className="section-subtitle">
            Master&apos;s graduate ({SITE.gradDate}, 4.0 GPA) with pre-graduation production
            experience and recent internship work — ready to learn and grow in my first full-time
            role.
          </p>
        </motion.header>

        <div className="exp-list">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="exp-list__item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div
                className="exp-list__marker"
                style={{ background: exp.color }}
                aria-hidden="true"
              />
              <ExperienceCard exp={exp} defaultExpanded={i === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
