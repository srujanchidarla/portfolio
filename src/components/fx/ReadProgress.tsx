"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/** Thin bar along the top of long reads (case studies, articles): how far through the page you are. */
export default function ReadProgress({ color }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      ref.current?.style.setProperty("--read", p.toFixed(4));
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="read-progress"
      aria-hidden="true"
      style={color ? ({ "--read-color": color } as CSSProperties) : undefined}
    />
  );
}
