"use client";

import type { CSSProperties } from "react";
import { ramp, useStory } from "./ScrollStory";

const CULPRITS = [
  { bad: "Pages rendered on every request", fix: "Time-based page caching", at: 0.56 },
  { bad: "A cron job's full run, 4× an hour", fix: "Idempotent background jobs", at: 0.66 },
  { bad: "A live listener on every open tab", fix: "Leaderboard stored as one document", at: 0.76 },
];

/** AlgoChronicle: the Vercel CPU-limit outage and the fix, replayed as server time falls. */
export default function AlgoOutage() {
  const { p, step } = useStory();

  // Server work per page view: ~290 ms until the fix lands, then down to ~2 ms.
  const fall = ramp(p, 0.5, 0.88);
  const ms = Math.max(2, Math.round(290 * Math.pow(1 - fall, 2.4) + 2 * fall));
  // Daily CPU against the free plan's 4-hour limit: fills, trips, then drains.
  const cpu = p < 0.5 ? ramp(p, 0, 0.42) : 1 - 0.93 * ramp(p, 0.52, 0.9);
  const paused = step === 1;
  const cached = step >= 2;

  return (
    <div className={`sv sv-algo${paused ? " is-paused" : ""}${cached ? " is-cached" : ""}`}>
      <div className="sv-algo__meter">
        <p className="sv__kicker">Server work per page view</p>
        <p className="sv-algo__ms">
          <strong>{cached ? "~" : ""}{ms}</strong>
          <span>ms</span>
        </p>
        <p className={`sv-algo__badge${cached ? " is-good" : paused ? " is-bad" : ""}`}>
          {paused ? "Deployment paused" : cached ? "Served from the edge" : "Rendered on every request"}
        </p>
      </div>

      <div className="sv-algo__cpu">
        <p className="sv__kicker">
          Server CPU vs. the free plan&apos;s 4-hour limit
          <b>{Math.round(cpu * 100)}%</b>
        </p>
        <span className="sv-algo__bar">
          <span style={{ transform: `scaleX(${cpu})` } as CSSProperties} />
        </span>
      </div>

      <div className="sv-algo__path">
        {["Browser", "Edge cache", "Server", "Firestore"].map((hop, i) => (
          <span key={hop} className={`sv-algo__hop sv-algo__hop--${i}`}>
            {hop}
          </span>
        ))}
        <span className="sv-algo__packet" />
      </div>

      <ul className="sv-algo__list">
        {CULPRITS.map((c) => {
          const fixed = p >= c.at;
          return (
            <li key={c.bad} className={fixed ? "is-fixed" : step >= 1 ? "is-culprit" : ""}>
              <i>{fixed ? "✓" : step >= 1 ? "!" : "·"}</i>
              <span>{fixed ? c.fix : c.bad}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
