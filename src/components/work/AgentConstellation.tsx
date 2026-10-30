const AGENTS = [
  { name: "Jarvis", role: "plans the day" },
  { name: "Stark", role: "career" },
  { name: "Hercules", role: "biometrics" },
  { name: "Turing", role: "review" },
  { name: "Cicero", role: "interviews" },
  { name: "Heisenberg", role: "safety" },
] as const;

/** Cover art for Neocortex: agents orbiting one local backend. */
export default function AgentConstellation() {
  const cx = 320;
  const cy = 200;
  const nodes = AGENTS.map((agent, i) => {
    const angle = (i / AGENTS.length) * Math.PI * 2 - Math.PI / 2;
    return { ...agent, x: cx + Math.cos(angle) * 210, y: cy + Math.sin(angle) * 132 };
  });

  return (
    <div className="agents" role="img" aria-label="Neocortex: six of fifteen agents around a local FastAPI core">
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="agents-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx={cx} cy={cy} rx="210" ry="132" className="agents__orbit" />
        <ellipse cx={cx} cy={cy} rx="140" ry="88" className="agents__orbit agents__orbit--inner" />
        {nodes.map((node) => (
          <line key={`l-${node.name}`} x1={cx} y1={cy} x2={node.x} y2={node.y} className="agents__wire" />
        ))}
        <circle cx={cx} cy={cy} r="74" fill="url(#agents-core)" />
        <circle cx={cx} cy={cy} r="30" className="agents__core" />
        <text x={cx} y={cy + 5} className="agents__core-label">
          core
        </text>
        {nodes.map((node, i) => (
          <g key={node.name} className="agents__node" style={{ animationDelay: `${i * 0.4}s` }}>
            <circle cx={node.x} cy={node.y} r="7" />
            <text x={node.x} y={node.y - 16} className="agents__name">
              {node.name}
            </text>
            <text x={node.x} y={node.y + 24} className="agents__role">
              {node.role}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
