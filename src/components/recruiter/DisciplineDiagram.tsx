import type { CSSProperties } from "react";

/** Small live diagrams for the three disciplines; animated in moves.css (`.dd-*`). */

function LoadBalancer() {
  const servers = [20, 52, 84];
  return (
    <svg viewBox="0 0 280 104" className="dd dd--lb" role="img" aria-label="Load balancer spreading requests across three servers">
      {servers.map((y) => (
        <line key={y} x1="58" y1="52" x2="214" y2={y} className="dd__wire" />
      ))}
      <rect x="14" y="36" width="44" height="32" rx="9" className="dd__node dd__node--main" />
      <text x="36" y="56" className="dd__tag">LB</text>
      {servers.map((y, i) => (
        <g key={`s-${y}`} className="dd-lb__server">
          <rect x="214" y={y - 12} width="52" height="24" rx="7" className="dd__node" />
          {/* Lights up as its packet lands (packet travel is 90% of a 1.8s cycle). */}
          <circle cx="226" cy={y} r="3" className="dd__led" style={{ animationDelay: `${i * 0.6 + 1.6}s` }} />
          <line x1="236" y1={y} x2="256" y2={y} className="dd__slot" />
        </g>
      ))}
      {servers.map((y, i) => (
        <circle
          key={`p-${y}`}
          cx="58"
          cy="52"
          r="4"
          className="dd__packet dd-lb__packet"
          style={{ "--dx": "156px", "--dy": `${y - 52}px`, animationDelay: `${i * 0.6}s` } as CSSProperties}
        />
      ))}
    </svg>
  );
}

function Layers() {
  const layers = [
    { label: "UI", y: 10 },
    { label: "API", y: 40 },
    { label: "DB", y: 70 },
  ];
  return (
    <svg viewBox="0 0 280 104" className="dd dd--stack" role="img" aria-label="UI, API and database layers stacking into one product">
      {layers.map((layer, i) => (
        <g key={layer.label} className="dd-stack__layer" style={{ animationDelay: `${0.15 + (2 - i) * 0.16}s` }}>
          <rect x="40" y={layer.y} width="200" height="24" rx="7" className="dd__node" />
          <text x="60" y={layer.y + 16} className="dd__tag dd__tag--start">
            {layer.label}
          </text>
          <line x1="104" y1={layer.y + 12} x2="220" y2={layer.y + 12} className="dd__slot" />
        </g>
      ))}
      <circle cx="252" cy="22" r="4" className="dd__packet dd-stack__trip" />
      <line x1="252" y1="22" x2="252" y2="82" className="dd__wire dd__wire--dash" />
    </svg>
  );
}

function Handshake() {
  const legs = [
    { label: "SYN", x1: 44, y1: 26, x2: 236, y2: 44 },
    { label: "SYN-ACK", x1: 236, y1: 54, x2: 44, y2: 72 },
    { label: "ACK", x1: 44, y1: 82, x2: 236, y2: 100 },
  ];
  return (
    <svg viewBox="0 0 280 110" className="dd dd--tcp" role="img" aria-label="TCP three-way handshake: SYN, SYN-ACK, ACK">
      <text x="44" y="12" className="dd__tag">client</text>
      <text x="236" y="12" className="dd__tag">server</text>
      <line x1="44" y1="18" x2="44" y2="108" className="dd__life" />
      <line x1="236" y1="18" x2="236" y2="108" className="dd__life" />
      {legs.map((leg, i) => (
        <g key={leg.label} className={`dd-tcp__leg dd-tcp__leg--${i}`}>
          <line
            x1={leg.x1}
            y1={leg.y1}
            x2={leg.x2}
            y2={leg.y2}
            pathLength={1}
            className="dd-tcp__arrow"
          />
          <text
            x={(leg.x1 + leg.x2) / 2}
            y={(leg.y1 + leg.y2) / 2 - 5}
            className="dd__tag dd-tcp__label"
          >
            {leg.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function DisciplineDiagram({ id }: { id: string }) {
  if (id === "system-design") return <LoadBalancer />;
  if (id === "fullstack") return <Layers />;
  if (id === "networking") return <Handshake />;
  return null;
}
