"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AI_ERA_ARCHITECTURE } from "@/lib/system-design";

const ALL_NODES = AI_ERA_ARCHITECTURE.flatMap((layer) =>
  layer.nodes.map((node) => ({ ...node, layerTitle: layer.title }))
);

export default function SystemArchitectureDiagram() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const active = useMemo(
    () => ALL_NODES.find((node) => node.id === activeId) ?? null,
    [activeId]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!activeId) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeId]);

  const hopModal =
    mounted && active
      ? createPortal(
          <div
            className="sd-hop-overlay"
            role="presentation"
            onClick={() => setActiveId(null)}
          >
            <div
              className="sd-hop-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="sd-hop-title"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="sd-hop-modal__close"
                onClick={() => setActiveId(null)}
                aria-label="Close hop details"
              >
                <X size={16} />
              </button>

              <div className="sd-hop-modal__icon" aria-hidden="true">
                {active.emoji}
              </div>
              <p className="sd-hop-modal__layer">{active.layerTitle}</p>
              <h3 id="sd-hop-title" className="sd-hop-modal__title">
                {active.label}
              </h3>
              <p className="sd-hop-modal__text">{active.detail}</p>
              <button
                type="button"
                className="btn-primary sd-hop-modal__done"
                onClick={() => setActiveId(null)}
              >
                Got it
              </button>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <figure className="sd-arch">
      <figcaption className="sd-arch__caption">
        <span className="sd-arch__eyebrow">AI-era request path</span>
        <strong>Click a node to inspect the hop</strong>
      </figcaption>

      <div className="sd-arch__flow">
        {AI_ERA_ARCHITECTURE.map((layer, layerIndex) => (
          <div key={layer.id} className="sd-arch__layer">
            <p className="sd-arch__layer-title">{layer.title}</p>
            <div className="sd-arch__nodes">
              {layer.nodes.map((node) => {
                const isActive = activeId === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    className={`sd-arch__node${isActive ? " is-active" : ""}`}
                    aria-haspopup="dialog"
                    aria-expanded={isActive}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveId(node.id);
                    }}
                  >
                    <span className="sd-arch__emoji" aria-hidden="true">
                      {node.emoji}
                    </span>
                    <span className="sd-arch__label">{node.label}</span>
                  </button>
                );
              })}
            </div>
            {layerIndex < AI_ERA_ARCHITECTURE.length - 1 ? (
              <div className="sd-arch__arrow" aria-hidden="true">
                ↓
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <p className="sd-arch__hint">Tap any hop for a popup explanation.</p>
      {hopModal}
    </figure>
  );
}
