"use client";

import { ramp, useStory } from "./ScrollStory";

const FIT =
  "Strong match on TypeScript, Node and distributed systems. Lead with the 2M req/day work. Gap: Go — mention the Java services instead.";

const FIELDS = [
  ["Full name", "Srujan Chidarla"],
  ["Email", "srujan@…"],
  ["LinkedIn", "linkedin.com/in/srujan-chidarla"],
  ["Work authorization", "Yes"],
  ["Why this role?", "I build systems that stay up…"],
] as const;

const BULLETS = [
  { text: "Spring Boot services at 2M+ requests/day", match: true },
  { text: "Angular routing performance, 30% faster", match: false },
  { text: "Multi-provider LLM routing with SSE streaming", match: true },
];

function clock(p: number) {
  const s = Math.round(p * 118);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** JobHuntOS: one application, from reading the posting to a filled form, in about two minutes. */
export default function JobHuntFlow() {
  const { p, step } = useStory();
  const streamed = Math.round(FIT.length * ramp(p, 0.02, 0.23));
  const filled = Math.round(FIELDS.length * ramp(p, 0.52, 0.74));
  const done = step === 3;

  return (
    <div className={`sv sv-job${done ? " is-done" : ""}`}>
      <div className="sv-job__top">
        <p className="sv__kicker">Example posting · Software Engineer, New Grad</p>
        <span className="sv-job__clock">{done ? "✓ " : ""}{clock(p)}</span>
      </div>

      <div className="sv-job__fit">
        <p className="sv-job__label">
          Fit analysis <em>streaming</em>
        </p>
        <p className="sv-job__stream">
          {FIT.slice(0, streamed)}
          {streamed < FIT.length ? <i className="sv-job__caret" /> : null}
        </p>
      </div>

      <ul className={`sv-job__resume${step >= 1 ? " is-sorted" : ""}`}>
        {BULLETS.map((b) => (
          <li key={b.text} className={b.match ? "is-match" : ""}>
            {b.text}
          </li>
        ))}
      </ul>

      <div className="sv-job__form">
        {FIELDS.map(([label, value], i) => (
          <label key={label} className={i < filled ? "is-filled" : ""}>
            <span>{label}</span>
            <span className="sv-job__input">{i < filled ? value : ""}</span>
          </label>
        ))}
      </div>

      <p className={`sv-job__key${done ? " is-on" : ""}`}>🔒 Your model key never left your browser</p>
    </div>
  );
}
