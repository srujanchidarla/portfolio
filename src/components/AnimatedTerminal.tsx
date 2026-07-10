"use client";

import { useEffect, useState } from "react";

const LINES = [
  { type: "comment", text: "// system health check — production" },
  { type: "blank" },
  { type: "code", parts: [
    { cls: "code-keyword", text: "const " },
    { cls: "code-fn", text: "metrics" },
    { cls: "", text: " = " },
    { cls: "code-keyword", text: "await " },
    { cls: "code-fn", text: "getSystemStats" },
    { cls: "", text: "();" },
  ]},
  { type: "blank" },
  { type: "output", label: "daily_requests", value: "2,147,832", suffix: " req/day" },
  { type: "output", label: "uptime", value: "99.97", suffix: "%" },
  { type: "output", label: "p99_latency", value: "42", suffix: "ms" },
  { type: "output", label: "services", value: "12", suffix: " microservices" },
  { type: "blank" },
  { type: "success", text: "✓ All systems operational" },
  { type: "comment", text: "// new grad · MS CS Aug 2026 · 4.0 GPA" },
  { type: "comment", text: "// shipping: Neocortex · CampfireChai · JobHuntOS" },
  { type: "comment", text: "// seeking first full-time role" },
];

export default function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (visibleLines < LINES.length) {
      const delay = LINES[visibleLines]?.type === "blank" ? 120 : 380;
      const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    if (visibleLines >= LINES.length) {
      const reset = setTimeout(() => setVisibleLines(0), 6000);
      return () => clearTimeout(reset);
    }
  }, [visibleLines]);

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dot" style={{ background: "rgba(239,68,68,0.7)" }} />
        <div className="terminal-dot" style={{ background: "rgba(234,179,8,0.7)" }} />
        <div className="terminal-dot" style={{ background: "rgba(34,197,94,0.7)" }} />
        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 11,
            color: "var(--c-muted)",
            fontFamily: "var(--font-space-mono), monospace",
          }}
        >
          srujan@prod-cluster ~ %
        </span>
      </div>

      <div className="terminal-body">
        {LINES.slice(0, visibleLines).map((line, i) => {
          if (line.type === "blank") return <div key={i} style={{ height: 8 }} />;

          if (line.type === "comment") {
            return (
              <div key={i} className="code-comment">
                {line.text}
              </div>
            );
          }

          if (line.type === "code" && line.parts) {
            return (
              <div key={i}>
                {line.parts.map((part, j) => (
                  <span key={j} className={part.cls}>
                    {part.text}
                  </span>
                ))}
              </div>
            );
          }

          if (line.type === "output") {
            return (
              <div key={i} style={{ paddingLeft: 16 }}>
                <span className="code-fn">{line.label}</span>
                <span style={{ color: "var(--c-muted)" }}>: </span>
                <span className="code-number">{line.value}</span>
                <span className="code-string">{line.suffix}</span>
              </div>
            );
          }

          if (line.type === "success") {
            return (
              <div key={i} style={{ color: "#34d399", marginTop: 4 }}>
                {line.text}
              </div>
            );
          }

          return null;
        })}

        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 16,
            background: cursorVisible ? "var(--c-primary)" : "transparent",
            marginLeft: 2,
            verticalAlign: "text-bottom",
          }}
        />
      </div>
    </div>
  );
}
