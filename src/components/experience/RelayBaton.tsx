"use client";

import { useEffect, useRef } from "react";

const INSET = 24;

/**
 * A baton that runs down the experience track as you scroll, filling the line behind it
 * and lighting each job's marker as it passes. Lives inside `.xps__relay`.
 */
export default function RelayBaton() {
  const batonRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const baton = batonRef.current;
    const fill = fillRef.current;
    const relay = baton?.parentElement;
    if (!baton || !fill || !relay) return;

    const markers = Array.from(relay.querySelectorAll<HTMLElement>(".xp__baton"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = relay.getBoundingClientRect();
      const track = Math.max(1, rect.height - INSET * 2);
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - rect.top - INSET) / track));
      const y = progress * track;
      baton.style.transform = `translate(-50%, ${y}px)`;
      fill.style.transform = `scaleY(${progress})`;
      for (const marker of markers) {
        const m = marker.getBoundingClientRect();
        marker.classList.toggle("is-lit", m.top + m.height / 2 - rect.top - INSET <= y + 2);
      }
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
    <>
      <span ref={fillRef} className="relay-fill" aria-hidden="true" />
      <span ref={batonRef} className="relay-baton" aria-hidden="true" />
    </>
  );
}
