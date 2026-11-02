import type { CSSProperties } from "react";
import type { TeardownLayer } from "@/lib/case-studies";

/**
 * Exploded view of a project. The layers sit stacked like one product, then pull apart
 * as the section scrolls up (`--p` from MotionFX); hovering a row in the legend lifts its slab.
 */
export default function Teardown({ layers }: { layers: readonly TeardownLayer[] }) {
  const count = layers.length;
  return (
    <div className="td" data-progress style={{ "--count": count } as CSSProperties}>
      <div className="td__stage" aria-hidden="true">
        <div className="td__stack">
          {layers.map((layer, i) => (
            <div key={layer.name} className="td__slab" style={{ "--i": i, "--z": count - 1 - i } as CSSProperties}>
              <span className="td__slab-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="td__slab-name">{layer.name}</span>
              <span className="td__slab-parts">
                {layer.parts.map((part) => (
                  <i key={part} />
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ol className="td__legend">
        {layers.map((layer, i) => (
          <li key={layer.name} className="td__item" style={{ "--i": i } as CSSProperties}>
            <span className="td__item-num">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{layer.name}</h3>
              <p>{layer.note}</p>
              <ul className="td__parts">
                {layer.parts.map((part) => (
                  <li key={part}>{part}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
