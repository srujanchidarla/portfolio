"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

const CARD_SELECTOR = "[data-kick]";
const BALL = 44;
const SPRINT_MS = 950;
const KICK_MS = 2300;

type Point = { x: number; y: number };

function center(el: Element, origin: DOMRect): Point {
  const r = el.getBoundingClientRect();
  return { x: r.left - origin.left + r.width / 2, y: r.top - origin.top + r.height / 2 };
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Athlete section choreography.
 * 1. Sprint: cards dash in from the left like runners leaving the blocks.
 * 2. Kick: a ball arcs through each card; every card it hits is knocked along the
 *    ball's path and springs back to its spot.
 * Plays once when the stage scrolls into view; `kick()` replays the ball.
 */
export function useKickoff(stageRef: RefObject<HTMLElement | null>, ballRef: RefObject<HTMLElement | null>) {
  const busy = useRef(false);

  const kick = useCallback(() => {
    const stage = stageRef.current;
    const ball = ballRef.current;
    if (!stage || !ball || busy.current || reducedMotion()) return;
    busy.current = true;

    const box = stage.getBoundingClientRect();
    const cards = Array.from(stage.querySelectorAll<HTMLElement>(CARD_SELECTOR));
    const hits = cards.map((card) => center(card, box));
    const start: Point = { x: -BALL * 1.5, y: box.height * 0.92 };
    const exit: Point = { x: box.width + BALL * 2, y: -BALL * 2 };

    // Arc between stops: lift the midpoint so the ball travels like a kicked ball, not a laser.
    const stops = [start, ...hits, exit];
    const points: (Point & { hit?: number })[] = [{ ...start }];
    stops.slice(1).forEach((p, i) => {
      const prev = stops[i];
      const dist = Math.hypot(p.x - prev.x, p.y - prev.y);
      points.push({ x: (prev.x + p.x) / 2, y: (prev.y + p.y) / 2 - Math.min(90, dist * 0.22) });
      points.push({ ...p, hit: i < hits.length ? i : undefined });
    });

    const lengths = points.map((p, i) => (i === 0 ? 0 : Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y)));
    const total = lengths.reduce((a, b) => a + b, 0);
    let run = 0;
    const frames = points.map((p, i) => {
      run += lengths[i];
      const offset = run / total;
      return {
        transform: `translate(${p.x - BALL / 2}px, ${p.y - BALL / 2}px) rotate(${offset * 900}deg) scale(${p.hit !== undefined ? 1.18 : 1})`,
        offset,
      };
    });

    ball.style.opacity = "1";
    const flight = ball.animate(frames, { duration: KICK_MS, easing: "linear", fill: "forwards" });

    let travelled = 0;
    points.forEach((p, i) => {
      travelled += lengths[i];
      if (p.hit === undefined) return;
      const card = cards[p.hit];
      const prev = points[i - 1];
      const dx = p.x - prev.x;
      const dy = p.y - prev.y;
      const len = Math.hypot(dx, dy) || 1;
      const push = Math.min(30, 14 + card.offsetWidth * 0.03);
      const ux = (dx / len) * push;
      const uy = (dy / len) * push;
      const spin = dx >= 0 ? 4 : -4;
      // Damped spring: knocked away, overshoots back, settles where it started.
      card.animate(
        [
          { transform: "none" },
          { transform: `translate(${ux}px, ${uy}px) rotate(${spin}deg) scale(0.97)`, offset: 0.16 },
          { transform: `translate(${-ux * 0.42}px, ${-uy * 0.42}px) rotate(${-spin * 0.5}deg)`, offset: 0.42 },
          { transform: `translate(${ux * 0.16}px, ${uy * 0.16}px) rotate(${spin * 0.2}deg)`, offset: 0.66 },
          { transform: `translate(${-ux * 0.05}px, ${-uy * 0.05}px)`, offset: 0.84 },
          { transform: "none" },
        ],
        { duration: 820, delay: (travelled / total) * KICK_MS - 30, easing: "ease-out" }
      );
      const ring = document.createElement("span");
      ring.className = "ot__impact";
      ring.style.left = `${p.x}px`;
      ring.style.top = `${p.y}px`;
      stage.appendChild(ring);
      ring
        .animate(
          [
            { transform: "translate(-50%, -50%) scale(0.2)", opacity: 0.9 },
            { transform: "translate(-50%, -50%) scale(2.6)", opacity: 0 },
          ],
          { duration: 560, delay: (travelled / total) * KICK_MS, easing: "ease-out", fill: "backwards" }
        )
        .finished.finally(() => ring.remove());
    });

    flight.finished.finally(() => {
      ball.style.opacity = "0";
      flight.cancel();
      busy.current = false;
    });
  }, [stageRef, ballRef]);

  const sprint = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return Promise.resolve();
    const cards = Array.from(stage.querySelectorAll<HTMLElement>(CARD_SELECTOR));
    stage.classList.add("is-sprinting");
    stage.classList.remove("is-armed");
    const runs = cards.map((card, i) =>
      card.animate(
        [
          { transform: "translateX(-110vw) skewX(-16deg)", filter: "blur(8px)", opacity: 0.4 },
          { transform: "translateX(4%) skewX(7deg)", filter: "blur(0px)", opacity: 1, offset: 0.72 },
          { transform: "translateX(-1%) skewX(-2deg)", offset: 0.88 },
          { transform: "none", filter: "blur(0px)", opacity: 1 },
        ],
        { duration: SPRINT_MS, delay: i * 120, easing: "cubic-bezier(0.2, 0.85, 0.25, 1)", fill: "backwards" }
      ).finished
    );
    return Promise.all(runs).finally(() => stage.classList.remove("is-sprinting"));
  }, [stageRef]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reducedMotion() || !("animate" in stage)) return;

    // Hide until the start gun so cards don't jump from rest to off-screen.
    stage.classList.add("is-armed");
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        void sprint().then(() => {
          timer = window.setTimeout(kick, 250);
        });
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    io.observe(stage);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      stage.classList.remove("is-armed");
    };
  }, [stageRef, sprint, kick]);

  return kick;
}
