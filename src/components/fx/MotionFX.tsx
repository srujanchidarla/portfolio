"use client";

import { useEffect } from "react";

/**
 * Site-wide motion layer.
 * - `[data-reveal]` elements get `is-in` when they scroll into view (works for server components).
 * - `[data-cue]` elements get `is-cued` once their top passes 70% of the viewport. Unlike
 *   `[data-reveal]` they are never hidden, so they can host a section's signature animation.
 * - `[data-spot]` elements track the pointer in `--mx` / `--my` for the spotlight hover.
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

    // Tracked in memory: attributes added here would trip hydration of streamed sections.
    const seen = new WeakSet<Element>();
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
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(queued);
    };
  }, []);

  return null;
}
