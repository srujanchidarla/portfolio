import type { CSSProperties } from "react";
import { BarChart3, Layers, Server } from "lucide-react";
import { PROOF_CARDS } from "@/lib/recruiter-home";
import LapHeader from "@/components/fx/LapHeader";
import DisciplineDiagram from "@/components/recruiter/DisciplineDiagram";

const ICONS = {
  scale: BarChart3,
  ship: Layers,
  infra: Server,
} as const;

/** The one number that anchors each discipline. */
const HEADLINE_STAT: Record<string, { value: string; unit: string }> = {
  "system-design": { value: "2M+", unit: "requests / day" },
  fullstack: { value: "7", unit: "apps shipped" },
  networking: { value: "TCP/IP", unit: "to the deploy pipeline" },
};

export default function ProofSection() {
  return (
    <section id="proof" className="lap dz">
      <div className="wrap">
        <LapHeader
          lap="02"
          eyebrow="How I work"
          title={
            <>
              Built in production, <em>shipped for people</em>
            </>
          }
          lede="Full-stack development, system design, and networking — shown through work, not job titles."
        />

        <div className="dz__grid">
          {PROOF_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon];
            const stat = HEADLINE_STAT[card.id];
            return (
              <article
                key={card.id}
                className="dz__col"
                style={{ "--dz-color": card.color, "--d": `${i * 0.08}s` } as CSSProperties}
                data-reveal
                data-spot
              >
                <div className="dz__top">
                  <span className="dz__icon" aria-hidden="true">
                    <Icon size={17} />
                  </span>
                  <span className="dz__label">{card.label}</span>
                </div>
                <div className="dz__diagram">
                  <DisciplineDiagram id={card.id} />
                </div>
                {stat ? (
                  <p className="dz__stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.unit}</span>
                  </p>
                ) : null}
                <h3 className="dz__title">{card.headline}</h3>
                <p className="dz__sub">{card.subline}</p>
                <p className="dz__detail">{card.detail}</p>
                <ul className="dz__chips">
                  {card.metrics.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
