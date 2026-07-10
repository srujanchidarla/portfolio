"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { TechnicalSkill } from "@/lib/skills";
import { SkillIcon } from "./SkillIcon";

interface SkillBarProps {
  skill: TechnicalSkill;
  index: number;
}

export default function SkillBar({ skill, index }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="skill-bar group">
      <div className="skill-bar__header">
        <div className="skill-bar__name">
          <SkillIcon id={skill.icon} />
          <span>{skill.name}</span>
        </div>
        <span className="skill-bar__percent">{skill.percent}%</span>
      </div>

      {/* Horizontal bar — desktop */}
      <div className="skill-bar__track skill-bar__track--horizontal" aria-hidden="true">
        <motion.div
          className="skill-bar__fill"
          initial={{ width: "0%" }}
          animate={inView ? { width: `${skill.percent}%` } : { width: "0%" }}
          transition={{ duration: 0.9, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      {/* Vertical bar — mobile */}
      <div className="skill-bar__track skill-bar__track--vertical" aria-hidden="true">
        <motion.div
          className="skill-bar__fill skill-bar__fill--vertical"
          initial={{ height: "0%" }}
          animate={inView ? { height: `${skill.percent}%` } : { height: "0%" }}
          transition={{ duration: 0.9, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <span className="skill-bar__vertical-label">{skill.percent}%</span>
      </div>

      <div className="skill-bar__tooltip" role="tooltip">
        <span>{skill.years} experience</span>
        <span className="skill-bar__tooltip-divider">·</span>
        <span>{skill.project}</span>
      </div>
    </div>
  );
}
