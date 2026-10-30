import LapHeader from "@/components/fx/LapHeader";

/** Loading placeholder shown while DailyDSA's live data streams in. */
export default function DailyDSASkeleton() {
  return (
    <section id="daily-dsa" className="lap dsa" aria-hidden="true">
      <div className="wrap">
        <LapHeader
          lap="04"
          eyebrow="Interview prep · live feed"
          title={
            <>
              Daily <em>DSA practice</em>
            </>
          }
        />
        <div className="dsa__board">
          <div className="dsa__meter">
            <div className="skeleton" style={{ height: 12, width: 140, marginBottom: 16 }} />
            <div className="skeleton" style={{ height: 72, width: 160, marginBottom: 20 }} />
            <div className="skeleton" style={{ height: 88, width: "100%" }} />
          </div>
          <div className="dsa__badge">
            <div className="skeleton" style={{ height: "100%", minHeight: 220, width: "100%" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
