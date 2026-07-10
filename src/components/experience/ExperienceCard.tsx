"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import type { Experience } from "@/lib/experience";
import CompanyLogo from "./CompanyLogo";

interface ExperienceCardProps {
  exp: Experience;
  defaultExpanded?: boolean;
}

export default function ExperienceCard({ exp, defaultExpanded = false }: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const panelId = `exp-panel-${exp.id}`;

  return (
    <article
      className={`exp-card${expanded ? " exp-card--expanded" : ""}`}
      style={{ "--exp-color": exp.color } as CSSProperties}
    >
      <div className="exp-card__accent" aria-hidden="true" />

      <button
        type="button"
        className="exp-card__header-btn"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        <div className="exp-logo">
          <CompanyLogo exp={exp} />
        </div>

        <div className="exp-card__meta">
          <div className="exp-card__top-row">
            <h3 className="exp-card__company">{exp.company}</h3>
            <span className="exp-card__type">{exp.type}</span>
          </div>
          {exp.category && <p className="exp-card__category">{exp.category}</p>}
          <p className="exp-card__role">{exp.role}</p>
          <p className="exp-card__duration">
            {exp.duration} · {exp.location}
          </p>
        </div>

        <ChevronDown size={18} className="exp-card__chevron" aria-hidden="true" />
      </button>

      <div className="exp-card__summary">
        <p className="exp-card__headline">{exp.headline}</p>
        <p className="exp-card__impact">{exp.impact}</p>
      </div>

      {expanded && (
        <div id={panelId} className="exp-card__body" role="region">
          <p className="exp-card__desc">{exp.description}</p>

          {exp.roles && exp.roles.length > 0 && (
            <div className="exp-card__roles">
              <span className="exp-card__label">Role progression</span>
              <ul>
                {exp.roles.map((r) => (
                  <li key={r.title}>
                    <strong>{r.title}</strong>
                    <span>{r.period}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="exp-card__block">
            <span className="exp-card__label">Key achievements</span>
            <ul className="exp-card__achievements">
              {exp.achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="exp-card__block">
            <span className="exp-card__label">Tech stack</span>
            <div className="exp-card__tags">
              {exp.techStack.map((tag) => (
                <span key={tag} className="exp-card__tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
