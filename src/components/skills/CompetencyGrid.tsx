"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Gauge,
  Layers,
  Network,
  Server,
  Monitor,
  Cloud,
  Database,
} from "lucide-react";
import type { Competency } from "@/lib/skills";
import { COMPETENCIES, LEVEL_LABELS } from "@/lib/skills";

const ICONS = {
  microservices: Network,
  fullstack: Layers,
  architecture: Boxes,
  performance: Gauge,
} as const;

function CompetencyCard({ item, index }: { item: Competency; index: number }) {
  const Icon = ICONS[item.icon];

  return (
    <motion.article
      className="competency-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <div className="competency-card__icon" aria-hidden="true">
        <Icon size={22} strokeWidth={1.75} />
      </div>

      <div className="competency-card__header">
        <h3 className="competency-card__title">{item.title}</h3>
        <span className={`competency-card__level competency-card__level--${item.level}`}>
          {LEVEL_LABELS[item.level]} · {item.years}
        </span>
      </div>

      <p className="competency-card__desc">{item.description}</p>

      <div className="competency-card__hover">
        <span className="competency-card__hover-label">Proof</span>
        <p>{item.example}</p>
      </div>
    </motion.article>
  );
}

export default function CompetencyGrid() {
  return (
    <div className="competency-grid">
      {COMPETENCIES.map((item, i) => (
        <CompetencyCard key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}

export function CategoryIcon({ type }: { type: "backend" | "frontend" | "cloud" | "database" }) {
  const icons = { backend: Server, frontend: Monitor, cloud: Cloud, database: Database };
  const Icon = icons[type];
  return <Icon size={16} aria-hidden="true" />;
}
