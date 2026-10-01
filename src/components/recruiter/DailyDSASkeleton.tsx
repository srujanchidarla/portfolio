/** Loading placeholder shown while DailyDSA's live data streams in. */
export default function DailyDSASkeleton() {
  return (
    <section id="daily-dsa" className="rh-dsa" aria-hidden="true">
      <div className="wrap">
        <header className="rh-section-header">
          <p className="section-eyebrow">Interview prep · live feed</p>
          <h2 className="section-title">
            Daily <span className="gradient-text">DSA practice</span>
          </h2>
          <div className="skeleton" style={{ height: 16, width: "50%", marginTop: 12 }} />
        </header>

        <div className="rh-dsa__layout">
          <article className="rh-dsa__featured">
            <div className="skeleton" style={{ height: 12, width: 100, marginBottom: 10 }} />
            <div className="skeleton" style={{ height: 28, width: "70%", marginBottom: 14 }} />
            <div className="skeleton" style={{ height: 12, width: "90%", marginBottom: 20 }} />
            <div className="rh-dsa__metrics" aria-hidden="true">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <div className="skeleton" style={{ height: 22, width: 36, margin: "0 auto 6px" }} />
                  <div className="skeleton" style={{ height: 10, width: 48, margin: "0 auto" }} />
                </div>
              ))}
            </div>
          </article>

          <div className="rh-dsa__feed">
            <div className="skeleton" style={{ height: 12, width: 90, marginBottom: 14 }} />
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="skeleton"
                style={{ height: 44, marginBottom: 10, borderRadius: 8 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
