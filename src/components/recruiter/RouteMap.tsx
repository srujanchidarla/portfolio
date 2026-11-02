"use client";

import { useEffect, useRef } from "react";

/** Three stops in the empty lower-right of the card (viewBox units, 600×300, sliced). */
const PINS = [
  { x: 470, y: 236 },
  { x: 528, y: 196 },
  { x: 578, y: 228 },
];
const ROUTE = `M${PINS[0].x} ${PINS[0].y} Q 492 192 ${PINS[1].x} ${PINS[1].y} T ${PINS[2].x} ${PINS[2].y}`;

/**
 * Topographic card background. As the card scrolls up the screen the route draws itself
 * and a traveller walks it, lighting each pin as it arrives.
 */
export default function RouteMap() {
  const routeRef = useRef<SVGPathElement>(null);
  const walkerRef = useRef<SVGGElement>(null);
  const pinsRef = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const route = routeRef.current;
    const walker = walkerRef.current;
    const card = route?.closest<HTMLElement>(".lg__card");
    if (!route || !walker || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const length = route.getTotalLength();
    // Where along the route each pin sits, found by sampling for the nearest point.
    const stops = PINS.map((pin) => {
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i <= 120; i++) {
        const pt = route.getPointAtLength((i / 120) * length);
        const dist = Math.hypot(pt.x - pin.x, pt.y - pin.y);
        if (dist < bestDist) {
          bestDist = dist;
          best = i / 120;
        }
      }
      return best;
    });

    card.classList.add("is-walking");
    let tick = 0;
    const update = () => {
      tick = 0;
      const rect = card.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the card's top is at 90% of the viewport, 1 once it reaches 30%.
      const p = Math.min(1, Math.max(0, (vh * 0.9 - rect.top) / (vh * 0.6)));
      route.style.strokeDashoffset = String(1 - p);
      const pt = route.getPointAtLength(p * length);
      walker.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
      walker.style.opacity = p > 0.01 && p < 0.995 ? "1" : "0";
      pinsRef.current.forEach((pin, i) => pin?.classList.toggle("is-reached", p >= stops[i] - 0.01));
    };
    const queue = () => {
      if (!tick) tick = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      card.classList.remove("is-walking");
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      cancelAnimationFrame(tick);
    };
  }, []);

  return (
    <svg className="lg__contours" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <ellipse key={i} cx={470} cy={150} rx={40 + i * 46} ry={26 + i * 30} transform={`rotate(${-12 + i * 2} 470 150)`} />
      ))}
      <path ref={routeRef} className="lg__route" d={ROUTE} pathLength={1} />
      {PINS.map((pin, i) => (
        <g
          key={i}
          ref={(el) => {
            pinsRef.current[i] = el;
          }}
          className="lg__pin"
          style={{ animationDelay: `${0.25 + i * 0.35}s` }}
        >
          <circle cx={pin.x} cy={pin.y - 13} r="11" className="lg__pin-halo" />
          <ellipse cx={pin.x} cy={pin.y + 1} rx="4" ry="1.5" className="lg__pin-shadow" />
          <path
            d={`M${pin.x} ${pin.y} c-5 -6 -7 -9.5 -7 -13 a7 7 0 1 1 14 0 c0 3.5 -2 7 -7 13z`}
            className="lg__pin-body"
          />
          <circle cx={pin.x} cy={pin.y - 13} r="2.5" className="lg__pin-dot" />
        </g>
      ))}
      <g ref={walkerRef} className="lg__walker">
        <circle r="7" className="lg__walker-ring" />
        <circle r="3.5" className="lg__walker-dot" />
      </g>
    </svg>
  );
}
