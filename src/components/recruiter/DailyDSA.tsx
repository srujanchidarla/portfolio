import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { ALGOCHRONICLE, fetchDSAActivity } from "@/lib/algochronicle";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default async function DailyDSA() {
  let data;
  try {
    data = await fetchDSAActivity();
  } catch {
    data = null;
  }

  const hasProblems = Boolean(data?.recentProblems.length);

  if (!hasProblems) {
    return (
      <section id="daily-dsa" className="rh-dsa" aria-labelledby="daily-dsa-title">
        <div className="wrap">
          <header className="rh-section-header">
            <p className="section-eyebrow">Interview prep · live feed</p>
            <h2 id="daily-dsa-title" className="section-title">
              Daily <span className="gradient-text">DSA practice</span>
            </h2>
            <p className="section-subtitle">
              Solve → push to{" "}
              <a href={ALGOCHRONICLE.dsaRepo} target="_blank" rel="noopener noreferrer">
                dsa-problems
              </a>{" "}
              → auto-publish on AlgoChronicle. Consistency recruiters can verify.
            </p>
          </header>

          <div className="rh-dsa__empty">
            <p className="rh-dsa__empty-title">Pipeline is live — feed syncing</p>
            <p className="rh-dsa__empty-text">
              Structured DSA folders in GitHub sync to AlgoChronicle for streaks, stats, and
              revision views. Open the tracker or repo to see the latest activity.
            </p>
            <div className="rh-dsa__actions">
              <a
                href={ALGOCHRONICLE.siteUrl}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open AlgoChronicle
                <ExternalLink size={14} aria-hidden="true" />
              </a>
              <Link
                href={ALGOCHRONICLE.dsaRepo}
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                dsa-problems repo
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const [latest, ...rest] = data!.recentProblems;
  const log = rest.slice(0, 4);

  return (
    <section id="daily-dsa" className="rh-dsa" aria-labelledby="daily-dsa-title">
      <div className="wrap">
        <header className="rh-section-header">
          <p className="section-eyebrow">Interview prep · live feed</p>
          <h2 id="daily-dsa-title" className="section-title">
            Daily <span className="gradient-text">DSA practice</span>
          </h2>
          <p className="section-subtitle">
            Solve → push to{" "}
            <a href={ALGOCHRONICLE.dsaRepo} target="_blank" rel="noopener noreferrer">
              dsa-problems
            </a>{" "}
            → Auto-publish on AlgoChronicle. Consistency recruiters can verify.
          </p>
        </header>

        <div className="rh-dsa__layout">
          <article className="rh-dsa__featured">
            <p className="rh-dsa__featured-label">Latest solved</p>
            <p className="rh-dsa__featured-day">Day {latest.dayNumber}</p>
            <h3 className="rh-dsa__featured-title">{latest.title}</h3>
            <div className="rh-dsa__featured-meta">
              {[latest.platform, latest.difficulty, latest.pattern].filter(Boolean).join(" · ")}
            </div>
            {latest.date && (
              <time className="rh-dsa__featured-date" dateTime={latest.date}>
                {formatDate(latest.date)}
              </time>
            )}
            <div className="rh-dsa__metrics" aria-label="Practice stats">
              <div>
                <strong>{data!.currentStreak}</strong>
                <span>streak</span>
              </div>
              <div>
                <strong>{data!.totalProblems}</strong>
                <span>logged</span>
              </div>
              <div>
                <strong>{data!.latestDay}</strong>
                <span>latest day</span>
              </div>
            </div>
          </article>

          <div className="rh-dsa__feed">
            <p className="rh-dsa__feed-label">Recent log</p>
            <ol className="rh-dsa__timeline">
              {log.map((problem) => (
                <li key={problem.id} className="rh-dsa__row">
                  <span className="rh-dsa__row-day">D{problem.dayNumber}</span>
                  <div className="rh-dsa__row-body">
                    <span className="rh-dsa__row-title">{problem.title}</span>
                    <span className="rh-dsa__row-meta">
                      {[problem.platform, problem.difficulty, problem.pattern]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </div>
                  {problem.date && (
                    <time className="rh-dsa__row-date" dateTime={problem.date}>
                      {formatDate(problem.date)}
                    </time>
                  )}
                </li>
              ))}
            </ol>

            <div className="rh-dsa__actions">
              <a
                href={ALGOCHRONICLE.siteUrl}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open AlgoChronicle
                <ExternalLink size={14} aria-hidden="true" />
              </a>
              <Link
                href={ALGOCHRONICLE.dsaRepo}
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source repo
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
