"use client";

import { useEffect } from "react";

/**
 * Site-wide motion layer.
 * - `[data-reveal]` elements get `is-in` when they scroll into view (works for server components).
 * - `[data-cue]` elements get `is-cued` once their top passes 70% of the viewport. Unlike
 *   `[data-reveal]` they are never hidden, so they can host a section's signature animation.
 * - `[data-spot]` elements track the pointer in `--mx` / `--my` for the spotlight hover.
 * - `[data-progress]` elements get `--p`, 0 → 1 as they travel from the bottom of the
 *   viewport to its middle, for scroll-scrubbed effects. Only on-screen ones are updated.
 */
export default function MotionFX() {
  useEffect(() => {
    const root = document.documentElement;
    // The pre-paint script adds `js`; re-add it if a root re-render reset <html>'s classes.
    root.classList.add("js", "fx-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const cueIo = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-cued");
          cueIo.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -30% 0px" }
    );

    const live = new Set<HTMLElement>();
    let tick = 0;
    const scrub = () => {
      tick = 0;
      const vh = window.innerHeight;
      for (const el of live) {
        const rect = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.5 + rect.height * 0.5)));
        el.style.setProperty("--p", p.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!tick) tick = requestAnimationFrame(scrub);
    };
    const progressIo = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) live.add(el);
        else live.delete(el);
      }
      onScroll();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Tracked in memory: attributes added here would trip hydration of streamed sections.
    const seen = new WeakSet<Element>();
    const scrubbed = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
      document.querySelectorAll<HTMLElement>("[data-cue]:not(.is-cued)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        cueIo.observe(el);
      });
      document.querySelectorAll<HTMLElement>("[data-progress]").forEach((el) => {
        if (scrubbed.has(el)) return;
        scrubbed.add(el);
        progressIo.observe(el);
      });
    };
    scan();

    let queued = 0;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    let frame = 0;
    let last: PointerEvent | null = null;
    const onMove = (event: PointerEvent) => {
      last = event;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!last) return;
        const target = (last.target as Element | null)?.closest?.<HTMLElement>("[data-spot]");
        if (!target) return;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${last.clientX - rect.left}px`);
        target.style.setProperty("--my", `${last.clientY - rect.top}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      cueIo.disconnect();
      progressIo.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(tick);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(queued);
    };
  }, []);

  return null;
}
