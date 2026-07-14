import Link from "next/link";
import { ExternalLink, Flame, Calendar, Code2, RefreshCw } from "lucide-react";
import { ALGOCHRONICLE, fetchDSAActivity } from "@/lib/algochronicle";

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr + "T12:00:00");
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function DailyDSA() {
  let data;
  try {
    data = await fetchDSAActivity();
  } catch {
    return null;
  }

  if (data.recentProblems.length === 0) return null;

  return (
    <section id="daily-dsa" className="rh-dsa">
      <div className="wrap">
        <header className="rh-section-header rh-section-header--center">
          <p className="section-eyebrow">Interview prep · live</p>
          <h2 className="section-title">
            Daily <span className="gradient-text">DSA practice</span>
          </h2>
          <p className="section-subtitle">
            Push a problem to{" "}
            <a href={ALGOCHRONICLE.dsaRepo} target="_blank" rel="noopener noreferrer">
              dsa-problems
            </a>{" "}
            → AlgoChronicle updates automatically. Proof recruiters can verify.
          </p>
        </header>

        <div className="rh-dsa__stats">
          <div className="rh-dsa__stat">
            <Flame size={18} aria-hidden="true" />
            <div>
              <strong>{data.currentStreak}</strong>
              <span>Current streak</span>
            </div>
          </div>
          <div className="rh-dsa__stat">
            <Calendar size={18} aria-hidden="true" />
            <div>
              <strong>{data.totalProblems}</strong>
              <span>Problems logged</span>
            </div>
          </div>
          <div className="rh-dsa__stat">
            <Code2 size={18} aria-hidden="true" />
            <div>
              <strong>Day {data.latestDay}</strong>
              <span>Latest folder</span>
            </div>
          </div>
        </div>

        {data.syncStatus === "repo-ahead" && (
          <p className="rh-dsa__sync-note" role="status">
            <RefreshCw size={14} aria-hidden="true" />
            Repo is ahead of the live dashboard — redeploy AlgoChronicle webhook fix, then push
            again to sync.
          </p>
        )}

        <ul className="rh-dsa__list">
          {data.recentProblems.map((problem) => (
            <li key={problem.id} className="rh-dsa__item">
              <div className="rh-dsa__item-top">
                <span className="rh-dsa__day">Day {problem.dayNumber}</span>
                {problem.difficulty && (
                  <span className={`rh-dsa__diff rh-dsa__diff--${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                  </span>
                )}
                <span className="rh-dsa__platform">{problem.platform}</span>
              </div>
              <h3 className="rh-dsa__title">{problem.title}</h3>
              {problem.pattern && <p className="rh-dsa__pattern">{problem.pattern}</p>}
              {problem.date && (
                <time className="rh-dsa__date" dateTime={problem.date}>
                  {formatDate(problem.date)}
                </time>
              )}
            </li>
          ))}
        </ul>

        <div className="rh-dsa__actions">
          <Link href={ALGOCHRONICLE.siteUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
            View AlgoChronicle
            <ExternalLink size={16} aria-hidden="true" />
          </Link>
          <Link
            href={ALGOCHRONICLE.consistencyUrl}
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Streak &amp; heatmap
          </Link>
          <Link href={ALGOCHRONICLE.dsaRepo} className="btn-secondary" target="_blank" rel="noopener noreferrer">
            dsa-problems repo
          </Link>
        </div>
      </div>
    </section>
  );
}
