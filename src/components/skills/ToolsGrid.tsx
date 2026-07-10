"use client";

import { motion } from "framer-motion";
import type { ToolSkill } from "@/lib/skills";
import { TOOLS, LEVEL_LABELS } from "@/lib/skills";

function ToolPill({ tool, index }: { tool: ToolSkill; index: number }) {
  return (
    <motion.div
      className={`tool-pill tool-pill--${tool.level} group`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      tabIndex={0}
    >
      <span className="tool-pill__check" aria-hidden="true">✓</span>
      <span className="tool-pill__name">{tool.name}</span>
      <span className="tool-pill__level">({LEVEL_LABELS[tool.level]})</span>

      <div className="tool-pill__tooltip" role="tooltip">
        <strong>{tool.years}</strong>
        <span>{tool.project}</span>
      </div>
    </motion.div>
  );
}

export default function ToolsGrid() {
  return (
    <div className="tools-grid">
      {TOOLS.map((tool, i) => (
        <ToolPill key={tool.name} tool={tool} index={i} />
      ))}
    </div>
  );
}
