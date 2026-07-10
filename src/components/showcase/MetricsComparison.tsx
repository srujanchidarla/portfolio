import type { PerformanceMetric } from "@/lib/showcases";

export default function MetricsComparison({
  metrics,
  verified,
}: {
  metrics: PerformanceMetric[];
  verified?: string;
}) {
  return (
    <div className="metrics-compare">
      <div className="metrics-compare__grid">
        {metrics.map((m) => (
          <div key={m.label} className="metrics-compare__card">
            <span className="metrics-compare__label">{m.label}</span>
            <div className="metrics-compare__values">
              <span className="metrics-compare__before">{m.before}</span>
              <span className="metrics-compare__arrow" aria-hidden="true">→</span>
              <span className="metrics-compare__after">{m.after}</span>
              <span className="metrics-compare__bolt" aria-hidden="true">⚡</span>
            </div>
          </div>
        ))}
      </div>
      {verified && (
        <p className="metrics-compare__verified">
          <span aria-hidden="true">✓</span> {verified}
        </p>
      )}
    </div>
  );
}
