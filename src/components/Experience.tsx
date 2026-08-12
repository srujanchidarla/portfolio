"use client";

import { motion } from "framer-motion";
import { EDUCATION, EXPERIENCES } from "@/lib/experience";
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
          <p className="section-eyebrow">Work history</p>
          <h2 className="section-title">
            Experience that <span className="gradient-text">grounds the degree</span>
          </h2>
          <p className="section-subtitle">
            Production engineering at Cognizant, then a fintech internship during my MS — the work
            that sits behind the degree.
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
              <ExperienceCard exp={exp} />
            </motion.div>
          ))}
        </div>

        <div id="education" className="rh-education">
          <h3 className="rh-education__title">Education</h3>
          <ul className="rh-education__list">
            {EDUCATION.map((ed) => (
              <li key={ed.id}>
                <div className="rh-education__row">
                  <strong>{ed.school}</strong>
                  <span>{ed.duration}</span>
                </div>
                <p className="rh-education__degree">{ed.degree}</p>
                <p className="rh-education__detail">
                  {ed.detail} · {ed.location}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
