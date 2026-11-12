"use client";

import { useEffect, type RefObject } from "react";

type Options = {
  /** When this media query matches the section pins; otherwise it stays in normal flow. */
  query: string;
  /** Extra scroll distance (px) the pinned section consumes, measured on every resize. */
  run: (viewport: { width: number; height: number }) => number;
  /** Called on every frame the progress may have changed. `p` runs 0 → 1 through the pin. */
  onProgress: (p: number, pinned: boolean) => void;
  /** Elements whose size changes should trigger a re-measure (e.g. a track whose fonts load late). */
  watch?: RefObject<Element | null>[];
};

/** Height of the fixed navbar the pinned stage centres below. */
const NAV = 72;

/**
 * Pins a section's stage (its first child) and reports scroll progress through it.
 * The stage is only as tall as its content and sticks centred in the space below the
 * navbar, so there is no empty band above or below it before and after the pin.
 * The outer element gets `is-pinned`, an explicit height, `--stage-top`, and `--pin` (0 → 1).
 * Outside the query (phones, short screens, reduced motion) it is left in normal flow.
 */
export function useScrollPin(ref: RefObject<HTMLElement | null>, { query, run, onProgress, watch = [] }: Options) {
  useEffect(() => {
    const outer = ref.current;
    if (!outer) return;

    const mq = window.matchMedia(query);
    const stage = outer.firstElementChild as HTMLElement | null;
    let distance = 0;
    let top = 0;
    let tick = 0;

    const update = () => {
      tick = 0;
      if (!mq.matches) {
        onProgress(0, false);
        return;
      }
      const rect = outer.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (top - rect.top) / Math.max(1, distance)));
      outer.style.setProperty("--pin", p.toFixed(4));
      onProgress(p, true);
    };
    const queue = () => {
      if (!tick) tick = requestAnimationFrame(update);
    };

    const measure = () => {
      if (mq.matches) {
        outer.classList.add("is-pinned");
        const vh = window.innerHeight;
        const stageH = stage?.offsetHeight ?? vh;
        top = Math.max(NAV, Math.round(NAV + (vh - NAV - stageH) / 2));
        outer.style.setProperty("--stage-top", `${top}px`);
        distance = Math.max(0, run({ width: window.innerWidth, height: vh }));
        outer.style.height = `${stageH + distance}px`;
      } else {
        outer.classList.remove("is-pinned");
        outer.style.height = "";
        outer.style.removeProperty("--pin");
        outer.style.removeProperty("--stage-top");
        distance = 0;
        top = 0;
      }
      update();
    };

    const ro = new ResizeObserver(() => measure());
    if (stage) ro.observe(stage);
    for (const w of watch) if (w.current) ro.observe(w.current);
    measure();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
      cancelAnimationFrame(tick);
      outer.classList.remove("is-pinned");
      outer.style.height = "";
    };
    // The options are read once per mount; callers pass stable functions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, query]);
}

/** Scroll the window so a pinned section shows progress `p`. */
export function scrollToPin(outer: HTMLElement, p: number) {
  const rect = outer.getBoundingClientRect();
  const stageH = (outer.firstElementChild as HTMLElement | null)?.offsetHeight ?? 0;
  const stageTop = parseFloat(outer.style.getPropertyValue("--stage-top")) || 0;
  const distance = rect.height - stageH;
  const top = window.scrollY + rect.top - stageTop + distance * p;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}
