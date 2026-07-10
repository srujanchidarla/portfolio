"use client";

import { motion } from "framer-motion";
import { SKILL_CATEGORIES } from "@/lib/skills";
import CompetencyGrid, { CategoryIcon } from "./skills/CompetencyGrid";
import SkillBar from "./skills/SkillBar";
import ToolsGrid from "./skills/ToolsGrid";

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="wrap">
        {/* Tier 1 */}
        <motion.header
          className="skills-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">Core Competencies</p>
          <h2 className="section-title">
            I Ship <span className="gradient-text">Production Systems</span>
          </h2>
          <p className="section-subtitle">
            Depth across architecture, full-stack delivery, and performance — backed
            by production metrics, not buzzwords.
          </p>
        </motion.header>

        <CompetencyGrid />

        {/* Tier 2 */}
        <div className="skills-tier">
          <h3 className="skills-tier__title">Technical Skills</h3>
          <p className="skills-tier__subtitle">
            Proficiency measured by production usage, project complexity, and years of hands-on work.
          </p>

          <div className="skills-categories">
            {SKILL_CATEGORIES.map((category, ci) => (
              <motion.div
                key={category.id}
                className="skill-category"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: ci * 0.06 }}
              >
                <div className="skill-category__header">
                  <CategoryIcon type={category.icon} />
                  <h4>{category.label}</h4>
                </div>
                <div className="skill-category__bars">
                  {category.skills.map((skill, si) => (
                    <SkillBar key={skill.name} skill={skill} index={si} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tier 3 */}
        <div className="skills-tier">
          <h3 className="skills-tier__title">Tools & Frameworks</h3>
          <p className="skills-tier__subtitle">
            Hover any skill for years of experience and a key project reference.
          </p>

          <div className="skills-legend" aria-label="Proficiency legend">
            <span className="skills-legend__item">
              <span className="skills-legend__dot skills-legend__dot--advanced" />
              Advanced
            </span>
            <span className="skills-legend__item">
              <span className="skills-legend__dot skills-legend__dot--intermediate" />
              Intermediate
            </span>
            <span className="skills-legend__item">
              <span className="skills-legend__dot skills-legend__dot--learning" />
              Learning
            </span>
          </div>

          <ToolsGrid />
        </div>
      </div>
    </section>
  );
}
