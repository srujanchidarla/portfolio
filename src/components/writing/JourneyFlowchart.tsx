"use client";

import { useState, type CSSProperties } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import {
  JOURNEY_LAYERS,
  JOURNEY_PHASES,
  JOURNEY_STEPS,
  SHAPE_NAMES,
  layerOf,
  type StepShape,
} from "@/lib/network-journey";

const SHAPES = Object.keys(SHAPE_NAMES) as StepShape[];

type Props = {
  /** The step the packet map is on, outlined here too */
  active: number;
  onSelect: (index: number) => void;
};

/**
 * The full flowchart: one lane per phase, a proper shape for every kind of step,
 * colored by OSI layer, with the background work running alongside each phase.
 */
export default function JourneyFlowchart({ active, onSelect }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div id="flowchart" className="fc">
      <div className="fc__legend">
        <div>
          <p className="fc__legend-title">Color = OSI layer</p>
          <ul>
            {JOURNEY_LAYERS.map((layer) => (
              <li key={layer.id} style={{ "--layer": layer.color } as CSSProperties}>
                <i className="fc__swatch" />
                {layer.short} {layer.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="fc__legend-title">Shape = kind of step</p>
          <ul>
            {SHAPES.map((shape) => (
              <li key={shape}>
                <i className={`fc__mini fc__mini--${shape}`} />
                {SHAPE_NAMES[shape]}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {JOURNEY_PHASES.map((phase, p) => (
        <section key={phase.name} className="fc-phase" data-reveal aria-labelledby={`fc-phase-${p}`}>
          <header className="fc-phase__head">
            <span className="fc-phase__num">{String(p + 1).padStart(2, "0")}</span>
            <div>
              <h3 id={`fc-phase-${p}`}>{phase.name}</h3>
              <p>{phase.blurb}</p>
            </div>
          </header>

          <div className="fc-phase__body">
            <ol className="fc-lane">
              {JOURNEY_STEPS.map((step, i) => {
                if (step.phase !== p) return null;
                const layer = layerOf(step.layer);
                const isOpen = open === i;
                return (
                  <li
                    key={step.title}
                    className={`fc-step${active === i ? " is-current" : ""}`}
                    style={{ "--layer": layer.color } as CSSProperties}
                  >
                    <div className="fc-step__row">
                      <button
                        type="button"
                        className={`fc-node fc-node--${step.shape}`}
                        aria-expanded={isOpen}
                        aria-controls={`fc-detail-${i}`}
                        onClick={() => {
                          setOpen(isOpen ? null : i);
                          onSelect(i);
                        }}
                      >
                        {step.shape === "data" ? <span className="fc-node__lip" aria-hidden="true" /> : null}
                        <span className="fc-node__num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="fc-node__title">{step.title}</span>
                        <span className="fc-node__layer">{layer.short}</span>
                      </button>
                      {step.branch ? <span className="fc-branch">{step.branch}</span> : null}
                    </div>
                    <div id={`fc-detail-${i}`} className="fc-step__detail" hidden={!isOpen}>
                      <p>{step.detail}</p>
                      <a href="#map" className="fc-step__map">
                        <ArrowUp size={13} aria-hidden="true" />
                        See it on the map
                      </a>
                    </div>
                  </li>
                );
              })}
            </ol>

            <aside className="fc-bg" aria-label={`Background work during ${phase.name}`}>
              <p className="fc-bg__title">
                <Sparkles size={13} aria-hidden="true" />
                Meanwhile, in the background
              </p>
              <ul>
                {phase.background.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      ))}
    </div>
  );
}
