"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import type { ProjectShowcase } from "@/lib/showcases";
import ArchitectureDiagram from "./ArchitectureDiagram";
import CodeBlock from "./CodeBlock";
import ComponentDiagram from "./ComponentDiagram";
import MetricsComparison from "./MetricsComparison";

export default function ShowcasePanel({ showcase }: { showcase: ProjectShowcase }) {
  return (
    <motion.div
      key={showcase.id}
      className="showcase-panel"
      style={{ "--showcase-accent": showcase.accent } as CSSProperties}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="showcase-block">
        <h3 className="showcase-block__title">System Architecture</h3>
        <p className="showcase-block__sub">
          Data flows top-down from the client through API layers to persistence and external services.
        </p>
        <ArchitectureDiagram layers={showcase.architecture} />
      </div>

      {showcase.codeHighlights.map((highlight, i) => (
        <div key={highlight.id} className="showcase-block">
          <p className="showcase-block__eyebrow">Code highlight {i + 1}</p>
          <h3 className="showcase-block__title">{highlight.title}</h3>
          <CodeBlock code={highlight.code} language={highlight.language} />
          <p className="showcase-block__explanation">{highlight.explanation}</p>
        </div>
      ))}

      {showcase.archPattern && (
        <div className="showcase-block">
          <p className="showcase-block__eyebrow">Architecture pattern</p>
          <h3 className="showcase-block__title">{showcase.archPattern.title}</h3>
          <p className="showcase-block__explanation">{showcase.archPattern.explanation}</p>
          <ComponentDiagram pattern={showcase.archPattern} />
        </div>
      )}

      <div className="showcase-block">
        <h3 className="showcase-block__title">Performance Impact</h3>
        <MetricsComparison metrics={showcase.metrics} verified={showcase.metricsVerified} />
      </div>

      <div className="showcase-block showcase-block--learnings">
        <h3 className="showcase-block__title">Key learnings</h3>
        <ol className="showcase-learnings">
          {showcase.learnings.map((item, i) => (
            <li key={item}>
              <span className="showcase-learnings__num">{i + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}
