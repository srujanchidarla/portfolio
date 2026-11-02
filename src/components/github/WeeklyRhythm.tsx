"use client";

import { useState, type PointerEvent } from "react";
import type { ContributionDay } from "@/lib/github";

const W = 720;
const H = 92;
const PAD_TOP = 22;
const PAD_BOTTOM = 4;

function weekLabel(date: string) {
  return new Date(date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** Contributions summed per week, drawn as a line that traces itself in when scrolled to. */
export default function WeeklyRhythm({ weeks }: { weeks: ContributionDay[][] }) {
  const [active, setActive] = useState<number | null>(null);

  const series = weeks
    .map((week) => {
      const first = week.find((d) => d.date);
      return first ? { date: first.date, total: week.reduce((sum, d) => sum + d.count, 0) } : null;
    })
    .filter((w): w is { date: string; total: number } => w !== null);

  if (series.length < 4) return null;

  const max = Math.max(1, ...series.map((w) => w.total));
  const x = (i: number) => (i / (series.length - 1)) * W;
  const y = (v: number) => PAD_TOP + (1 - v / max) * (H - PAD_TOP - PAD_BOTTOM);
  const line = series.map((w, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(w.total).toFixed(1)}`).join(" ");
  const area = `${line} L${W} ${H} L0 ${H} Z`;
  const peak = series.reduce((best, w, i) => (w.total > series[best].total ? i : best), 0);
  const shown = active ?? peak;

  const onMove = (event: PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    setActive(Math.max(0, Math.min(series.length - 1, Math.round(ratio * (series.length - 1)))));
  };

  return (
    <figure className="gh-rhythm" data-cue>
      <figcaption className="gh-rhythm__cap">
        <span>Weekly rhythm</span>
        <span className="gh-rhythm__read" aria-live="polite">
          <strong>{series[shown].total}</strong> {active === null ? "in the peak week" : "contributions"} · week of{" "}
          {weekLabel(series[shown].date)}
        </span>
      </figcaption>
      <div className="gh-rhythm__frame">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="gh-rhythm__plot"
          role="img"
          aria-label={`Weekly contributions over the last year, peaking at ${series[peak].total} in the week of ${weekLabel(series[peak].date)}`}
          onPointerMove={onMove}
          onPointerLeave={() => setActive(null)}
        >
          <line x1="0" y1={H - 0.5} x2={W} y2={H - 0.5} className="gh-rhythm__base" />
          <path d={area} className="gh-rhythm__area" />
          <path d={line} className="gh-rhythm__line" pathLength={1} vectorEffect="non-scaling-stroke" />
          <line
            x1={x(shown)}
            y1={PAD_TOP - 6}
            x2={x(shown)}
            y2={H}
            className="gh-rhythm__cross"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span
          className="gh-rhythm__dot"
          style={{ left: `${(x(shown) / W) * 100}%`, top: `${(y(series[shown].total) / H) * 100}%` }}
          aria-hidden="true"
        />
      </div>
    </figure>
  );
}
