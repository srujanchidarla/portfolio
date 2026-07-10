"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { PROJECT_SHOWCASES } from "@/lib/showcases";
import ShowcasePanel from "./showcase/ShowcasePanel";

export default function ProjectShowcases() {
  const [activeId, setActiveId] = useState(PROJECT_SHOWCASES[0].id);
  const active = PROJECT_SHOWCASES.find((s) => s.id === activeId) ?? PROJECT_SHOWCASES[0];

  return (
    <section id="showcases" className="showcases-section">
      <div className="wrap">
        <motion.header
          className="showcases-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">Under the Hood</p>
          <h2 className="section-title">
            Code <span className="gradient-text">Showcases</span>
          </h2>
          <p className="section-subtitle">
            Architecture decisions, optimized code paths, and measurable impact —
            the engineering behind each project.
          </p>
        </motion.header>

        <div className="showcase-tabs" role="tablist" aria-label="Project showcases">
          {PROJECT_SHOWCASES.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={activeId === s.id}
              className={`showcase-tab${activeId === s.id ? " showcase-tab--active" : ""}`}
              style={{ "--tab-accent": s.accent } as CSSProperties}
              onClick={() => setActiveId(s.id)}
            >
              {s.title}
            </button>
          ))}
        </div>

        <ShowcasePanel showcase={active} />
      </div>
    </section>
  );
}
