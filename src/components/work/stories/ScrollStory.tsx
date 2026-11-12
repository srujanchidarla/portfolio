"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { scrollToPin, useScrollPin } from "@/components/fx/useScrollPin";

const PIN_QUERY = "(min-width: 961px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";

export type StoryStep = { title: string; text: string };

type StoryState = {
  /** The step on screen, 0-based */
  step: number;
  /** Progress through the current step, 0 → 1 */
  local: number;
  /** Progress through the whole story, 0 → 1 */
  p: number;
  /** False on phones, short screens and reduced motion: visuals show their finished state */
  pinned: boolean;
};

const StoryContext = createContext<StoryState>({ step: 0, local: 0, p: 0, pinned: false });

/** For a story's visual: where the reader is in the story. */
export function useStory() {
  return useContext(StoryContext);
}

/** Linear 0 → 1 between two points of story progress. */
export function ramp(p: number, from: number, to: number) {
  return Math.min(1, Math.max(0, (p - from) / (to - from)));
}

/**
 * A pinned scroll story inside a case study: the step list on the left, the project's own
 * visual on the right. Scrolling walks through the steps; the visual reads `useStory()`.
 * Unpinned, every step is listed and the visual shows its finished state.
 */
export default function ScrollStory({
  label,
  steps,
  children,
}: {
  label: string;
  steps: StoryStep[];
  children: ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const n = steps.length;
  const [state, setState] = useState<StoryState>({ step: n - 1, local: 1, p: 1, pinned: false });

  const onProgress = useCallback(
    (p: number, pinned: boolean) => {
      if (!pinned) {
        setState((prev) => (prev.pinned || prev.p !== 1 ? { step: n - 1, local: 1, p: 1, pinned: false } : prev));
        return;
      }
      const pos = p * n;
      const step = Math.min(n - 1, Math.floor(pos));
      const local = Math.min(1, pos - step);
      setState((prev) =>
        prev.pinned && Math.abs(prev.p - p) < 0.0015 && prev.step === step ? prev : { step, local, p, pinned: true }
      );
    },
    [n]
  );

  useScrollPin(outerRef, {
    query: PIN_QUERY,
    run: ({ height }) => n * height * 0.7,
    onProgress,
  });

  const jump = (i: number) => {
    if (outerRef.current) scrollToPin(outerRef.current, (i + 0.15) / n);
  };

  return (
    <div ref={outerRef} className={`story${state.pinned ? " is-live is-pinned" : ""}`} data-step={state.step}>
      <div className="story__stage">
        <div className="story__steps">
          <p className="story__label">
            <span>{label}</span>
            <span className="story__count" aria-hidden="true">
              {String(state.step + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </p>
          <ol>
            {steps.map((s, i) => {
              const status = !state.pinned ? "done" : i < state.step ? "done" : i === state.step ? "active" : "next";
              return (
                <li key={s.title} className={`story-step is-${status}`}>
                  <button type="button" onClick={() => jump(i)} disabled={!state.pinned} tabIndex={state.pinned ? 0 : -1}>
                    <span className="story-step__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="story-step__title">{s.title}</span>
                  </button>
                  <p className="story-step__text">{s.text}</p>
                  <span className="story-step__bar" aria-hidden="true">
                    <span style={{ transform: `scaleX(${status === "active" ? state.local : status === "done" ? 1 : 0})` }} />
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="story__visual" aria-hidden="true">
          <StoryContext.Provider value={state}>{children}</StoryContext.Provider>
        </div>
      </div>
    </div>
  );
}
