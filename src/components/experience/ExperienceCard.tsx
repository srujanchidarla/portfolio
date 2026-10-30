"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { Plus } from "lucide-react";
import type { Experience } from "@/lib/experience";
import CompanyLogo from "./CompanyLogo";

/** "35% Engagement ↑ · 40% Speed ↑ · Recent production ship" → figures with labels. */
function impactFigures(impact: string) {
  return impact.split(" · ").flatMap((part) => {
    const match = part.match(/^([\d.,]+[%MK+]*\+?)\s+(.+)$/);
    return match ? [{ value: match[1], label: match[2].replace("↑", "").trim(), up: part.includes("↑") }] : [];
  });
}

function startYear(duration: string) {
  const years = duration.match(/\d{4}/g) ?? [];
  if (years.length < 2 || years[0] === years[1]) return years[0] ?? "";
  return `${years[0]}–${years[1].slice(2)}`;
}

export default function ExperienceCard({ exp, defaultExpanded = false }: { exp: Experience; defaultExpanded?: boolean }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const panelId = `xp-panel-${exp.id}`;
  const figures = impactFigures(exp.impact);

  return (
    <article
      className={`xp${expanded ? " is-open" : ""}`}
      style={{ "--exp-color": exp.color } as CSSProperties}
    >
      <div className="xp__when">
        <span className="xp__year">{startYear(exp.duration)}</span>
        <span className="xp__span">{exp.duration}</span>
      </div>

      <span className="xp__baton" aria-hidden="true" />

      <div className="xp__card" data-spot>
        <header className="xp__head">
          <span className="xp__logo">
            <CompanyLogo exp={exp} />
          </span>
          <div className="xp__who">
            <h3>{exp.company}</h3>
            <p>
              {exp.role} <span>· {exp.location}</span>
            </p>
          </div>
          <span className="xp__type">{exp.category ?? exp.type}</span>
        </header>

        <p className="xp__headline">{exp.headline}</p>

        {figures.length ? (
          <ul className="xp__figures">
            {figures.map((f) => (
              <li key={f.label}>
                <strong>
                  {f.value}
                  {f.up ? <span aria-label="increase">↑</span> : null}
                </strong>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <button
          type="button"
          className="xp__toggle"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={panelId}
        >
          <Plus size={15} aria-hidden="true" />
          {expanded ? "Hide details" : "Achievements & stack"}
        </button>

        <div id={panelId} className="xp__body" hidden={!expanded}>
          <p className="xp__desc">{exp.description}</p>

          {exp.roles && exp.roles.length > 0 ? (
            <ol className="xp__roles" aria-label="Role progression">
              {exp.roles.map((r) => (
                <li key={r.title}>
                  <strong>{r.title}</strong>
                  <span>{r.period}</span>
                </li>
              ))}
            </ol>
          ) : null}

          <ul className="xp__wins">
            {exp.achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <ul className="xp__stack" aria-label="Tech stack">
            {exp.techStack.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
