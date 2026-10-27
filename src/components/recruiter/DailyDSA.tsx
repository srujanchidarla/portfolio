import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { ALGOCHRONICLE, fetchDSAActivity } from "@/lib/algochronicle";
import { LEETCODE_STREAK, SITE, SITE_IMAGES } from "@/lib/site";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function PracticeActions() {
  return (
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
      <a
        href={SITE.leetcode}
        className="btn-secondary"
        target="_blank"
        rel="noopener noreferrer"
      >
        LeetCode
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </div>
  );
}

export default async function DailyDSA() {
  let data;
  try {
    data = await fetchDSAActivity();
  } catch {
    data = null;
  }

  const hasProblems = Boolean(data?.recentProblems.length);
  const latest = hasProblems ? data!.recentProblems[0] : null;
  const log = hasProblems ? data!.recentProblems.slice(1, 5) : [];

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
            → publish on AlgoChronicle. Consistency recruiters can verify.
          </p>
        </header>

        <a
          href={LEETCODE_STREAK.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rh-dsa__proof"
          aria-label={`${LEETCODE_STREAK.title} on LeetCode`}
        >
          <span className="rh-dsa__proof-media">
            <Image
              src={SITE_IMAGES.leetcode50Days}
              alt=""
              width={575}
              height={1024}
              quality={90}
              className="rh-dsa__proof-img"
              sizes="(max-width: 720px) 120px, 168px"
            />
          </span>
          <span className="rh-dsa__proof-copy">
            <span className="rh-dsa__proof-eyebrow">LeetCode</span>
            <strong className="rh-dsa__proof-title">{LEETCODE_STREAK.title}</strong>
            <span className="rh-dsa__proof-note">{LEETCODE_STREAK.note}</span>
            <span className="rh-dsa__proof-stats" aria-label="Practice stats">
              <span>
                <em>{LEETCODE_STREAK.days}</em>
                days
              </span>
              {hasProblems ? (
                <>
                  <span>
                    <em>{data!.totalProblems}</em>
                    logged
                  </span>
                  <span>
                    <em>{data!.latestDay}</em>
                    latest day
                  </span>
                </>
              ) : null}
            </span>
          </span>
          <span className="rh-dsa__proof-cta">
            View badge
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </a>

        {hasProblems && latest ? (
          <div className="rh-dsa__board">
            <article className="rh-dsa__featured">
              <p className="rh-dsa__featured-label">Latest solved</p>
              <p className="rh-dsa__featured-day">Day {latest.dayNumber}</p>
              <h3 className="rh-dsa__featured-title">{latest.title}</h3>
              <div className="rh-dsa__featured-meta">
                {[latest.platform, latest.difficulty, latest.pattern].filter(Boolean).join(" · ")}
              </div>
              {latest.date ? (
                <time className="rh-dsa__featured-date" dateTime={latest.date}>
                  {formatDate(latest.date)}
                </time>
              ) : null}
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
                    {problem.date ? (
                      <time className="rh-dsa__row-date" dateTime={problem.date}>
                        {formatDate(problem.date)}
                      </time>
                    ) : null}
                  </li>
                ))}
              </ol>
              <PracticeActions />
            </div>
          </div>
        ) : (
          <div className="rh-dsa__empty">
            <p className="rh-dsa__empty-title">Pipeline is live — feed syncing</p>
            <p className="rh-dsa__empty-text">
              Structured DSA folders in GitHub sync to AlgoChronicle for streaks, stats, and
              revision views. Open the tracker or repo to see the latest activity.
            </p>
            <PracticeActions />
          </div>
        )}
      </div>
    </section>
  );
}
