import type { CSSProperties } from "react";

const ICON_COLORS: Record<string, string> = {
  java: "#f89820",
  node: "#68a063",
  python: "#3776ab",
  cpp: "#00599c",
  api: "#3b9eff",
  react: "#61dafb",
  js: "#f7df1e",
  ts: "#3178c6",
  ui: "#a78bfa",
  responsive: "#34d399",
  aws: "#ff9900",
  docker: "#2496ed",
  cicd: "#e8c547",
  arch: "#3b9eff",
  mongo: "#47a248",
  sql: "#336791",
  dbopt: "#67d4ff",
};

const ICON_LABELS: Record<string, string> = {
  java: "Jv",
  node: "Nd",
  python: "Py",
  cpp: "C+",
  api: "API",
  react: "Rx",
  js: "JS",
  ts: "TS",
  ui: "UI",
  responsive: "RWD",
  aws: "AWS",
  docker: "Dk",
  cicd: "CI",
  arch: "Arc",
  mongo: "Mg",
  sql: "SQL",
  dbopt: "DB",
};

export function SkillIcon({ id }: { id: string }) {
  const color = ICON_COLORS[id] ?? "#3b9eff";
  const label = ICON_LABELS[id] ?? id.slice(0, 2).toUpperCase();

  return (
    <span
      className="skill-icon"
      style={{ "--icon-color": color } as CSSProperties}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}
