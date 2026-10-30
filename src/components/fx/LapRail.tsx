"use client";

import { useEffect, useRef, useState } from "react";

export const LAPS = [
  { id: "hero", lap: "00", label: "Start" },
  { id: "projects", lap: "01", label: "Work" },
  { id: "proof", lap: "02", label: "Disciplines" },
  { id: "experience", lap: "03", label: "Experience" },
  { id: "daily-dsa", lap: "04", label: "Practice" },
  { id: "skills", lap: "05", label: "Stack" },
  { id: "certifications", lap: "06", label: "Credentials" },
  { id: "writing", lap: "07", label: "Writing" },
  { id: "athlete", lap: "08", label: "Off track" },
  { id: "github", lap: "09", label: "Open source" },
  { id: "contact", lap: "10", label: "Finish" },
] as const;

/** Desktop race-split rail: where you are on the page, as laps. */
export default function LapRail() {
  const [active, setActive] = useState(0);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleY(${progress})`;

      const line = window.innerHeight * 0.35;
      let current = 0;
      LAPS.forEach((lap, index) => {
        const el = document.getElementById(lap.id);
        if (el && el.getBoundingClientRect().top <= line) current = index;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav className="lap-rail" aria-label="Page sections">
      <span className="lap-rail__track" aria-hidden="true">
        <span ref={barRef} className="lap-rail__fill" />
      </span>
      <ol>
        {LAPS.map((lap, index) => (
          <li key={lap.id}>
            <a
              href={`#${lap.id}`}
              className={`lap-rail__item${index === active ? " is-active" : ""}${
                index < active ? " is-done" : ""
              }`}
              aria-current={index === active ? "true" : undefined}
            >
              <span className="lap-rail__dot" aria-hidden="true" />
              <span className="lap-rail__num">{lap.lap}</span>
              <span className="lap-rail__label">{lap.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
