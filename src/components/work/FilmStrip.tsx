"use client";

import { useEffect, useRef, type ReactNode } from "react";

const PIN_QUERY = "(min-width: 961px) and (prefers-reduced-motion: no-preference)";

/**
 * The rest of the work as a strip of film. On desktop the strip pins while you scroll
 * and the frames slide past sideways, each one leaning toward the centre of the gate;
 * on phones it is a swipeable row that snaps frame by frame.
 */
export default function FilmStrip({ children, count }: { children: ReactNode; count: number }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const mq = window.matchMedia(PIN_QUERY);
    const frames = Array.from(track.children) as HTMLElement[];
    let overflow = 0;
    let tick = 0;

    const setCounter = (active: number) => {
      if (counterRef.current) counterRef.current.textContent = String(active + 1).padStart(2, "0");
    };

    // Frames lean toward the gate centre; the nearest one is the "current" frame.
    const lean = () => {
      const vw = window.innerWidth;
      let nearest = 0;
      let best = Infinity;
      frames.forEach((frame, i) => {
        const r = frame.getBoundingClientRect();
        const d = (r.left + r.width / 2 - vw / 2) / vw;
        const clamped = Math.max(-1, Math.min(1, d));
        frame.style.setProperty("--lean", clamped.toFixed(3));
        frame.style.setProperty("--lean-abs", Math.abs(clamped).toFixed(3));
        if (Math.abs(d) < best) {
          best = Math.abs(d);
          nearest = i;
        }
      });
      setCounter(nearest);
    };

    const update = () => {
      tick = 0;
      if (mq.matches) {
        const rect = outer.getBoundingClientRect();
        const run = Math.max(1, rect.height - window.innerHeight);
        const p = Math.min(1, Math.max(0, -rect.top / run));
        track.style.transform = `translate3d(${(-p * overflow).toFixed(1)}px, 0, 0)`;
        outer.style.setProperty("--strip", p.toFixed(3));
      } else {
        const p = track.scrollLeft / Math.max(1, track.scrollWidth - track.clientWidth);
        outer.style.setProperty("--strip", p.toFixed(3));
      }
      lean();
    };
    const queue = () => {
      if (!tick) tick = requestAnimationFrame(update);
    };

    const measure = () => {
      if (mq.matches) {
        outer.classList.add("is-pinned");
        track.style.transform = "";
        overflow = Math.max(0, track.scrollWidth - window.innerWidth);
        outer.style.height = `${window.innerHeight + overflow}px`;
      } else {
        outer.classList.remove("is-pinned");
        outer.style.height = "";
        track.style.transform = "";
        overflow = 0;
      }
      update();
    };

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    measure();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", measure);
    track.addEventListener("scroll", queue, { passive: true });
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", measure);
      track.removeEventListener("scroll", queue);
      mq.removeEventListener("change", measure);
      cancelAnimationFrame(tick);
    };
  }, []);

  return (
    <div ref={outerRef} className="wk-strip">
      <div className="wk-strip__gate">
        <div className="wk-strip__head wrap" aria-hidden="true">
          <span className="wk-strip__label">More work · scroll the reel</span>
          <span className="wk-strip__count">
            <span ref={counterRef}>01</span> / {String(count).padStart(2, "0")}
          </span>
          <span className="wk-strip__bar">
            <span />
          </span>
        </div>
        <div ref={trackRef} className="wk-strip__track">
          {children}
        </div>
      </div>
    </div>
  );
}
