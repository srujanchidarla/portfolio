"use client";

import { useCallback, useRef, type CSSProperties } from "react";
import { useScrollPin } from "@/components/fx/useScrollPin";
import { CAREER_MILESTONES, MILESTONE_KIND_LABEL } from "@/lib/career-track";

const PIN_QUERY = "(min-width: 961px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)";
/** Where the runner stands, as a share of the viewport width (matches `--ct-runner` in CSS). */
const RUNNER = 0.3;

/**
 * The career so far as one lane of a running track. On desktop the section pins and the
 * lane runs sideways as you scroll down: the lane fills behind a runner, each milestone
 * lights as the runner reaches it, and the big year flips to match. Elsewhere it is a
 * vertical list along the same lane.
 */
export default function CareerTrack() {
  const outerRef = useRef<HTMLDivElement>(null);
  const moveRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  const runRef = useRef(0);
  const litRef = useRef(-1);

  const onProgress = useCallback((p: number, pinned: boolean) => {
    const move = moveRef.current;
    const track = trackRef.current;
    if (!move || !track) return;
    const stops = Array.from(track.children) as HTMLElement[];

    if (!pinned) {
      move.style.transform = "";
      move.style.removeProperty("--run");
      litRef.current = -1;
      stops.forEach((stop) => stop.classList.add("is-lit"));
      return;
    }

    const run = p * runRef.current;
    move.style.transform = `translate3d(${(-run).toFixed(1)}px, 0, 0)`;
    move.style.setProperty("--run", `${run.toFixed(1)}px`);

    // Every stop whose dot has reached the runner is lit.
    const runnerX = window.innerWidth * RUNNER + 4;
    let lit = 0;
    stops.forEach((stop, i) => {
      const passed = i === 0 || stop.getBoundingClientRect().left <= runnerX;
      stop.classList.toggle("is-lit", passed);
      if (passed) lit = i;
    });
    if (lit !== litRef.current) {
      litRef.current = lit;
      if (yearRef.current) yearRef.current.textContent = CAREER_MILESTONES[lit].year;
    }
  }, []);

  useScrollPin(outerRef, {
    query: PIN_QUERY,
    // Run until the last stop's dot reaches the runner.
    run: () => {
      const track = trackRef.current;
      const first = track?.firstElementChild as HTMLElement | null;
      const last = track?.lastElementChild as HTMLElement | null;
      runRef.current = first && last ? Math.max(0, last.offsetLeft - first.offsetLeft) : 0;
      return runRef.current;
    },
    onProgress,
    watch: [trackRef],
  });

  return (
    <div ref={outerRef} className="ct" role="group" aria-labelledby="ct-title">
      <div className="ct__stage">
        <div className="ct__head wrap">
          <p id="ct-title" className="ct__label">
            The route so far · 2018 → today
          </p>
          <span className="ct__year" aria-hidden="true">
            <span ref={yearRef}>{CAREER_MILESTONES[0].year}</span>
          </span>
        </div>

        <div className="ct__window">
          <span className="ct__runner" aria-hidden="true" />
          <div ref={moveRef} className="ct__move">
            <div className="ct__lane" aria-hidden="true">
              <span className="ct__line" />
              <span className="ct__fill" />
            </div>
            <ol ref={trackRef} className="ct__track">
              {CAREER_MILESTONES.map((stop, i) => (
                <li
                  key={`${stop.year}-${stop.title}`}
                  className={`ct-stop ct-stop--${stop.kind}`}
                  style={{ "--i": i } as CSSProperties}
                >
                  <span className="ct-stop__dot" aria-hidden="true" />
                  <p className="ct-stop__when">
                    <strong>{stop.year}</strong>
                    {stop.when ? <span>{stop.when}</span> : null}
                    <em>{MILESTONE_KIND_LABEL[stop.kind]}</em>
                  </p>
                  <h3 className="ct-stop__title">{stop.title}</h3>
                  <p className="ct-stop__detail">{stop.detail}</p>
                  {stop.stat ? (
                    <p className="ct-stop__stat">
                      <strong>{stop.stat.value}</strong>
                      <span>{stop.stat.label}</span>
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
