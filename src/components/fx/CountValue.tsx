"use client";

import { useEffect, useRef } from "react";

const NUMBER = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/;

/**
 * A stat like "~2 ms", "2,500+" or "4.0" that counts up from zero when it scrolls into view.
 * The server renders the final text, so it reads correctly without JS and for crawlers.
 * Inside a pinned slide (`[data-count-gate]` with `data-state`), it waits for that slide to be the active one and
 * replays each time it comes back. Text with no number ("Live") is left alone.
 */
export default function CountValue({ value, duration = 1100 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(NUMBER);
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, before, digits, after] = match;
    const target = Number(digits.replace(/,/g, ""));
    const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
    const grouped = digits.includes(",");
    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      return grouped ? Number(fixed).toLocaleString("en-US", { minimumFractionDigits: decimals }) : fixed;
    };
    const show = (n: number) => {
      el.textContent = `${before}${format(n)}${after}`;
    };

    // A pinned slide marks itself `data-count-gate`; its `data-state` is set later, once pinned.
    const gate = el.closest<HTMLElement>("[data-count-gate]");
    let visible = false;
    let ran = false;
    let frame = 0;

    const run = () => {
      cancelAnimationFrame(frame);
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        show(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const ready = () => !gate?.dataset.state || gate.dataset.state === "active";
    const check = () => {
      if (visible && ready()) {
        if (!ran) {
          ran = true;
          run();
        }
      } else if (gate?.dataset.state && !ready() && ran) {
        // The slide left the stage: keep the number while it fades, count again when it returns.
        ran = false;
      }
    };

    // Start from zero only if the number is not on screen yet, so nothing visible flickers.
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight || !ready()) show(0);
    else ran = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        check();
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    const mo = gate ? new MutationObserver(check) : null;
    if (gate) mo?.observe(gate, { attributes: true, attributeFilter: ["data-state"] });

    return () => {
      io.disconnect();
      mo?.disconnect();
      cancelAnimationFrame(frame);
      show(target);
    };
  }, [value, duration]);

  return <span ref={ref}>{value}</span>;
}
