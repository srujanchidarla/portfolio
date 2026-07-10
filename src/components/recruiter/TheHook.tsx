"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HERO_METRICS } from "@/lib/recruiter-home";
import MetricCounter from "./MetricCounter";

type HookMode = "graduate" | "ship";

const MODES: Record<
  HookMode,
  { title: string; metric: number; suffix: string; decimals?: number; label: string; story: string }
> = {
  graduate: {
    title: "Where I am now",
    metric: HERO_METRICS.gpa,
    suffix: "/4.0",
    decimals: 1,
    label: "GPA · graduating Aug 2026",
    story:
      "Finishing my Master's in Computer Science with a 4.0 GPA while shipping CampfireChai, JobHuntOS, and Neocortex. I'm an ambitious new grad — not hiding my experience, but honest that I want to learn and grow on a team.",
  },
  ship: {
    title: "What I've already shipped",
    metric: HERO_METRICS.projectsShipped,
    suffix: "+",
    label: "projects built",
    story:
      "From my first full-stack app to systems I contributed to at 2M+ req/day — each project taught me something new. I'm ready to deepen that in a production environment with mentorship and a collaborative culture.",
  },
};

export default function TheHook() {
  const [mode, setMode] = useState<HookMode>("graduate");
  const active = MODES[mode];

  return (
    <section id="hook" className="rh-hook">
      <div className="wrap">
        <motion.header
          className="rh-section-header rh-section-header--center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">New grad positioning</p>
          <h2 className="section-title">
            Ambitious graduate · <span className="gradient-text">proven shipper</span>
          </h2>
        </motion.header>

        <div className="rh-hook__toggle" role="tablist" aria-label="Focus area">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "graduate"}
            className={mode === "graduate" ? "is-active" : ""}
            onClick={() => setMode("graduate")}
          >
            New grad ready
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "ship"}
            className={mode === "ship" ? "is-active" : ""}
            onClick={() => setMode("ship")}
          >
            Already shipping
          </button>
        </div>

        <motion.div
          key={mode}
          className="rh-hook__panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="rh-hook__metric-side">
            <p className="rh-hook__mode-title">{active.title}</p>
            <MetricCounter
              value={active.metric}
              suffix={active.suffix}
              decimals={active.decimals}
              className="rh-hook__big-num"
            />
            <p className="rh-hook__mode-label">{active.label}</p>
          </div>
          <div className="rh-hook__story-side">
            <p>{active.story}</p>
            <p className="rh-hook__link">
              <a href="#experience">See my experience →</a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
