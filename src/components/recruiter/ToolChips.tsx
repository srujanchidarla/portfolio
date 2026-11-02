"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export type ToolInfo = {
  slug: string;
  title: string;
  hex: string;
  path: string;
  kind: string;
  what: string;
  used: string;
};

const GAP = 16;
const NAV_CLEARANCE = 96;

/**
 * Tool logos that explain themselves: hover or focus a chip for a short definition and
 * where I used it; tap to pin it open on touch screens. Escape or an outside tap closes it.
 */
export default function ToolChips({ tools }: { tools: readonly ToolInfo[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  // Keep the card on screen: slide it sideways near an edge, and drop it below the chip
  // when there is no room above (the fixed navbar covers the top of the viewport).
  useEffect(() => {
    if (!open) return;
    const li = listRef.current?.querySelector<HTMLElement>(`[data-tool="${open}"]`);
    const card = li?.querySelector<HTMLElement>(".tool-card");
    if (!li || !card) return;
    const chip = li.getBoundingClientRect();
    const width = card.offsetWidth;
    const ideal = chip.width / 2 - width / 2;
    const min = GAP - chip.left;
    const max = window.innerWidth - GAP - width - chip.left;
    card.style.setProperty("--card-x", `${Math.round(Math.min(max, Math.max(min, ideal)))}px`);
    card.classList.toggle("is-below", chip.top - card.offsetHeight - 12 < NAV_CLEARANCE);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(null);
        setPinned(false);
      }
    };
    const onDown = (event: PointerEvent) => {
      if (!listRef.current?.contains(event.target as Node)) {
        setOpen(null);
        setPinned(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <ul ref={listRef} className="stk__tools" aria-label="Tools" data-reveal>
      {tools.map((tool, i) => {
        const isOpen = open === tool.slug;
        const cardId = `tool-${tool.slug}`;
        return (
          <li
            key={tool.slug}
            data-tool={tool.slug}
            className={isOpen ? "is-open" : undefined}
            style={
              {
                "--tool": `#${tool.hex}`,
                "--d": `${i * 0.035}s`,
                // Deterministic "scatter" start positions; the logos magnet into place when the list reveals.
                "--sx": `${((i * 137) % 260) - 130}px`,
                "--sy": `${((i * 71) % 140) - 70}px`,
                "--sr": `${((i * 53) % 70) - 35}deg`,
              } as CSSProperties
            }
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse" && !pinned) setOpen(tool.slug);
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse" && !pinned) setOpen(null);
            }}
          >
            <button
              type="button"
              className="stk__tool"
              aria-expanded={isOpen}
              aria-controls={cardId}
              onClick={() => {
                if (isOpen && pinned) {
                  setOpen(null);
                  setPinned(false);
                } else {
                  setOpen(tool.slug);
                  setPinned(true);
                }
              }}
              onFocus={() => setOpen(tool.slug)}
              onBlur={() => {
                if (!pinned) setOpen(null);
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={tool.path} />
              </svg>
              <span>{tool.title}</span>
            </button>

            <div id={cardId} className="tool-card" role="region" aria-label={`About ${tool.title}`} hidden={!isOpen}>
              <span className="tool-card__head">
                <span className="tool-card__icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={tool.path} />
                  </svg>
                </span>
                <span>
                  <strong>{tool.title}</strong>
                  <span className="tool-card__kind">{tool.kind}</span>
                </span>
              </span>
              <p className="tool-card__what">{tool.what}</p>
              <p className="tool-card__used">
                <span>Where I used it</span>
                {tool.used}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
