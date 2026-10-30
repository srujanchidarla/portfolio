"use client";

import { useEffect, useState } from "react";

/** Sticky table of contents for a case study; highlights the section in view. */
export default function CaseToc({ items }: { items: readonly { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  const activeIndex = Math.max(0, items.findIndex((item) => item.id === active));

  return (
    <nav className="cs-toc" aria-label="On this page">
      <p className="cs-toc__title">On this page</p>
      <ol>
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={index === activeIndex ? "is-active" : index < activeIndex ? "is-done" : undefined}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
