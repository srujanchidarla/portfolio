import type { ArchLayer } from "@/lib/showcases";

export default function ArchitectureDiagram({ layers }: { layers: ArchLayer[] }) {
  return (
    <div className="arch-diagram">
      {layers.map((layer, i) => (
        <div key={layer.id} className="arch-diagram__group">
          <div className="arch-diagram__node">
            <div className="arch-diagram__node-header">
              <span className="arch-diagram__label">{layer.label}</span>
              <span className="arch-diagram__tech">{layer.tech}</span>
            </div>
            <p className="arch-diagram__desc">{layer.description}</p>
          </div>
          {i < layers.length - 1 && (
            <div className="arch-diagram__arrow" aria-hidden="true">
              <span className="arch-diagram__arrow-line" />
              <span className="arch-diagram__arrow-head">▼</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
