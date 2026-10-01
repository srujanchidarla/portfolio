/** Loading placeholder shown while GitHubActivity's live data streams in. */
export default function GitHubActivitySkeleton() {
  return (
    <section id="github" className="github-section" aria-hidden="true">
      <div className="wrap">
        <header className="github-header">
          <p className="section-eyebrow">Open Source Activity</p>
          <h2 className="section-title">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <div className="skeleton" style={{ height: 16, width: "70%", margin: "0 auto 24px" }} />
        </header>

        <div className="github-stats">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="github-stat-card" key={i}>
              <div className="skeleton" style={{ height: 28, width: "60%", margin: "0 auto 10px" }} />
              <div className="skeleton" style={{ height: 11, width: "80%", margin: "0 auto" }} />
            </div>
          ))}
        </div>

        <div className="github-main-grid">
          <div className="gh-graph">
            <div className="skeleton" style={{ height: 16, width: 160, marginBottom: 20 }} />
            <div className="skeleton" style={{ height: 160, borderRadius: 14 }} />
          </div>
          <div className="gh-lang">
            <div className="skeleton" style={{ height: 16, width: 140, marginBottom: 20 }} />
            <div className="skeleton" style={{ height: 160, borderRadius: 14 }} />
          </div>
        </div>

        <div className="github-repos">
          <div className="skeleton" style={{ height: 18, width: 220, marginBottom: 16 }} />
          <div className="github-repos__grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="skeleton" style={{ height: 120, borderRadius: 14 }} key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
