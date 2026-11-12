"use client";

import { ramp, useStory } from "./ScrollStory";

const PROVIDERS = ["P1", "P2", "P3", "P4", "P5", "P6"];
const AGENTS = [
  { name: "Jarvis", job: "plans the day" },
  { name: "Stark", job: "career" },
  { name: "Hercules", job: "biometrics" },
  { name: "Turing", job: "review" },
  { name: "Cicero", job: "interviews" },
];

/** Neocortex: a request survives a failed provider, then fans out to the agents. */
export default function NeocortexChain() {
  const { p, step } = useStory();
  const p1Failed = p >= 0.38;
  const answered = p >= 0.6;
  const fan = ramp(p, 0.76, 0.96);

  return (
    <div className="sv sv-neo">
      <p className="sv-neo__ask">
        <b>Jarvis</b> → “Build my morning brief”
      </p>

      <div className="sv-neo__chain">
        <p className="sv__kicker">Six-provider model chain</p>
        <ol>
          {PROVIDERS.map((name, i) => {
            const state =
              i === 0 && p1Failed ? "fail" : i === 1 && answered ? "ok" : (i === 0 && step >= 1) || (i === 1 && p1Failed) ? "try" : "idle";
            return (
              <li key={name} className={`is-${state}`}>
                <span>{state === "fail" ? "✕" : state === "ok" ? "✓" : name}</span>
              </li>
            );
          })}
        </ol>
        <p className="sv-neo__status">
          {answered ? "P2 answered, the plan still arrives" : p1Failed ? "P1 timed out, falling through…" : step >= 1 ? "Trying P1…" : "Waiting"}
        </p>
      </div>

      <div className={`sv-neo__fan${step >= 3 ? " is-on" : ""}`}>
        <span className="sv-neo__core">core</span>
        <ul>
          {AGENTS.map((agent, i) => {
            const lit = fan >= (i + 1) / AGENTS.length - 0.05;
            const killed = agent.name === "Stark" && step >= 3;
            return (
              <li key={agent.name} className={killed ? "is-killed" : lit ? "is-lit" : ""}>
                <strong>{agent.name}</strong>
                <span>{killed ? "paused · kill switch" : agent.job}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
