"use client";

import { useCallback, useRef, type CSSProperties, type ReactNode } from "react";
import { scrollToPin, useScrollPin } from "@/components/fx/useScrollPin";

const PIN_QUERY = "(min-width: 961px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";

type Item = { id: string; title: string; color: string };

/**
 * The lead projects as one pinned stage: scroll and each project takes the screen in turn,
 * its browser frame sliding in while the copy rises. A rail along the bottom fills per
 * project and jumps straight to one. Phones, short screens and reduced motion get a plain
 * stacked list of the same slides.
 */
export default function ProjectShowcase({ items, children }: { items: Item[]; children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLOListElement>(null);
  const activeRef = useRef(-1);
  const n = items.length;

  const onProgress = useCallback(
    (p: number, pinned: boolean) => {
      const slides = slidesRef.current ? (Array.from(slidesRef.current.children) as HTMLElement[]) : [];
      const fills = railRef.current ? (Array.from(railRef.current.children) as HTMLElement[]) : [];

      if (!pinned) {
        activeRef.current = -1;
        for (const slide of slides) {
          slide.inert = false;
          slide.removeAttribute("data-state");
        }
        return;
      }

      // Each slide owns an equal stretch of the run; the first and last are already on screen
      // while the stage scrolls in and out, so the boundaries sit at the half-way marks.
      const pos = p * (n - 1);
      const active = Math.min(n - 1, Math.max(0, Math.round(pos)));
      slides.forEach((slide, i) => {
        slide.style.setProperty("--local", Math.min(1, Math.max(0, pos - i + 0.5)).toFixed(3));
      });
      // Rail segment i spans its slide's stretch; the first starts at 0 and the last ends at the end.
      fills.forEach((li, i) => {
        const lo = i === 0 ? 0 : i - 0.5;
        const hi = i === n - 1 ? n - 1 : i + 0.5;
        const fill = hi > lo ? (pos - lo) / (hi - lo) : 1;
        li.style.setProperty("--fill", Math.min(1, Math.max(0, fill)).toFixed(3));
      });

      if (active === activeRef.current) return;
      activeRef.current = active;
      outerRef.current?.style.setProperty("--ps-color", items[active].color);
      slides.forEach((slide, i) => {
        slide.dataset.state = i === active ? "active" : i < active ? "past" : "next";
        slide.inert = i !== active;
        // Boots the browser frame (the `.is-in` moves) the first time a slide takes the stage.
        if (i === active) slide.classList.add("is-in");
      });
      fills.forEach((li, i) => li.classList.toggle("is-current", i === active));
    },
    [items, n]
  );

  useScrollPin(outerRef, {
    query: PIN_QUERY,
    run: ({ height }) => (n - 1) * height * 0.9,
    onProgress,
  });

  const jump = (i: number) => {
    const outer = outerRef.current;
    if (outer) scrollToPin(outer, n > 1 ? i / (n - 1) : 0);
  };

  return (
    <div ref={outerRef} className="ps" style={{ "--n": n } as CSSProperties}>
      <div className="ps__stage">
        <span className="ps__wash" aria-hidden="true" />
        <div ref={slidesRef} className="ps__slides wrap">
          {children}
        </div>
        <nav className="ps__rail wrap" aria-label="Jump to a project">
          <ol ref={railRef}>
            {items.map((item, i) => (
              <li key={item.id} style={{ "--proj-color": item.color } as CSSProperties}>
                <button type="button" onClick={() => jump(i)}>
                  <span className="ps__rail-num">{String(i + 1).padStart(2, "0")}</span>
                  {item.title}
                </button>
                <span className="ps__rail-bar" aria-hidden="true">
                  <span />
                </span>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
