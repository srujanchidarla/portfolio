import type { ArchPattern } from "@/lib/showcases";

export default function ComponentDiagram({ pattern }: { pattern: ArchPattern }) {
  return (
    <div className="comp-diagram">
      <div className="comp-diagram__nodes">
        {pattern.nodes.map((node) => (
          <div
            key={node.name}
            className={`comp-diagram__node${node.memo ? " comp-diagram__node--memo" : ""}`}
          >
            <span className="comp-diagram__name">{node.name}</span>
            <span className="comp-diagram__role">{node.role}</span>
            {node.memo && <span className="comp-diagram__badge">memo</span>}
          </div>
        ))}
      </div>
      <ul className="comp-diagram__flows">
        {pattern.flows.map((flow) => (
          <li key={flow}>{flow}</li>
        ))}
      </ul>
    </div>
  );
}
