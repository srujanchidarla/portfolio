"use client";

import { useEffect, useState } from "react";

const MODAL_SELECTOR =
  ".sd-hop-overlay, .sd-modal-overlay, .modal-overlay, [role='dialog']";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [overModal, setOverModal] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const inModal = !!target?.closest(MODAL_SELECTOR);
      setOverModal(inModal);

      if (inModal) {
        setHovering(false);
        return;
      }

      const interactive = target?.closest(
        "a, button, [role='button'], input, textarea, label, summary, .rh-roles__card"
      );
      setHovering(!!interactive);
    };

    const onLeave = () => {
      setVisible(false);
      setOverModal(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!enabled || overModal) return null;

  return (
    <div
      className={`code-cursor${hovering ? " is-hover" : ""}${visible ? " is-visible" : ""}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      aria-hidden="true"
    >
      <span className="code-cursor__ring" />
      <span className="code-cursor__corners" />
      <span className="code-cursor__core">
        <span className="code-cursor__glyph code-cursor__glyph--idle">{`{ }`}</span>
        <span className="code-cursor__glyph code-cursor__glyph--hover">&lt;/&gt;</span>
      </span>
      <span className="code-cursor__caret" />
    </div>
  );
}
