import type { CSSProperties } from "react";
import {
  siDocker,
  siExpress,
  siFastapi,
  siFirebase,
  siGithubactions,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siSocketdotio,
  siSpringboot,
  siSupabase,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import { SKILL_CLUSTERS } from "@/lib/recruiter-home";
import LapHeader from "@/components/fx/LapHeader";

const TOOLS = [
  siOpenjdk,
  siSpringboot,
  siNodedotjs,
  siExpress,
  siPython,
  siFastapi,
  siTypescript,
  siReact,
  siNextdotjs,
  siTailwindcss,
  siPostgresql,
  siMongodb,
  siFirebase,
  siSupabase,
  siSocketdotio,
  siDocker,
  siGithubactions,
];

const SEGMENTS = 5;

export default function SkillsImpact() {
  return (
    <section id="skills" className="lap stk">
      <div className="wrap">
        <LapHeader
          lap="05"
          eyebrow="Technical foundation"
          title={
            <>
              Tools I <em>actually use</em>
            </>
          }
          lede="Honest levels, each tied to where I used it — ready to deepen in production, not pretending expertise I haven't earned."
        />

        <ul className="stk__tools" aria-label="Tools">
          {TOOLS.map((icon, i) => (
            <li
              key={icon.slug}
              style={{ "--tool": `#${icon.hex}`, "--d": `${i * 0.03}s` } as CSSProperties}
              data-reveal
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={icon.path} />
              </svg>
              <span>{icon.title}</span>
            </li>
          ))}
        </ul>

        <div className="stk__bento">
          {SKILL_CLUSTERS.map((cluster, ci) => (
            <article
              key={cluster.id}
              className="stk__cluster"
              style={{ "--d": `${ci * 0.06}s` } as CSSProperties}
              data-reveal
              data-spot
            >
              <header>
                <span className="stk__cluster-num">{String(ci + 1).padStart(2, "0")}</span>
                <h3>{cluster.label}</h3>
              </header>
              <ul>
                {cluster.skills.map((skill) => {
                  const filled = Math.round(skill.level / (100 / SEGMENTS));
                  return (
                    <li key={skill.name} className="stk__skill">
                      <div className="stk__skill-top">
                        <span className="stk__skill-name">{skill.name}</span>
                        <span className={`stk__strength is-${skill.strength.toLowerCase()}`}>
                          {skill.strength}
                        </span>
                      </div>
                      <span
                        className="stk__meter"
                        role="img"
                        aria-label={`${skill.strength}: ${filled} of ${SEGMENTS}`}
                      >
                        {Array.from({ length: SEGMENTS }, (_, i) => (
                          <i key={i} className={i < filled ? "is-on" : undefined} />
                        ))}
                      </span>
                      <span className="stk__proof">
                        {skill.years} · {skill.proof}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
