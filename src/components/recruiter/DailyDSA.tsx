import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { ALGOCHRONICLE, fetchDSAActivity } from "@/lib/algochronicle";
import { LEETCODE_STREAK, SITE, SITE_IMAGES } from "@/lib/site";
import LapHeader from "@/components/fx/LapHeader";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function difficultyClass(difficulty?: string) {
  const key = difficulty?.toLowerCase() ?? "";
  return key === "easy" || key === "medium" || key === "hard" ? ` is-${key}` : "";
}

function PracticeActions() {
  return (
    <div className="dsa__actions">
      <a href={ALGOCHRONICLE.siteUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
        Open AlgoChronicle
        <ExternalLink size={14} aria-hidden="true" />
      </a>
      <a href={ALGOCHRONICLE.dsaRepo} className="btn-secondary" target="_blank" rel="noopener noreferrer">
        Source repo
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
      <a href={SITE.leetcode} className="btn-secondary" target="_blank" rel="noopener noreferrer">
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
  const days = hasProblems ? data!.latestDay : LEETCODE_STREAK.days;
  const grid = Array.from({ length: Math.min(days, 84) }, (_, i) => i);

  return (
    <section id="daily-dsa" className="lap dsa" aria-labelledby="daily-dsa-title">
      <div className="wrap">
        <LapHeader
          lap="04"
          id="daily-dsa-title"
          eyebrow="Interview prep · live feed"
          title={
            <>
              Daily <em>DSA practice</em>
            </>
          }
          lede={
            <>
              Solve → push to{" "}
              <a href={ALGOCHRONICLE.dsaRepo} target="_blank" rel="noopener noreferrer">
                dsa-problems
              </a>{" "}
              → publish on AlgoChronicle. Consistency anyone can verify.
            </>
          }
        />

        <div className="dsa__board">
          <div className="dsa__meter" data-reveal suppressHydrationWarning>
            <p className="dsa__kicker">{hasProblems ? "Practice days logged" : "Days on the badge"}</p>
            <p className="dsa__big">
              {/* Counts up from 0 in CSS when revealed; the real number stays in the DOM. */}
              <span className="dsa__count" style={{ "--to": days } as CSSProperties}>
                {days}
              </span>
              <span>days</span>
            </p>
            <ol className="dsa__days" aria-label={`${days} practice days`}>
              {grid.map((i) => (
                <li
                  key={i}
                  className={i === grid.length - 1 ? "is-today" : undefined}
                  style={{ opacity: 0.35 + (0.65 * (i + 1)) / grid.length, animationDelay: `${i * 12}ms` }}
                />
              ))}
            </ol>
            <ul className="dsa__counts">
              {hasProblems ? (
                <li>
                  <strong>{data!.totalProblems}</strong> problems logged
                </li>
              ) : null}
              <li>
                <strong>{LEETCODE_STREAK.days}</strong> day LeetCode badge
              </li>
              {data?.lastActivityDate ? (
                <li>
                  last solve <strong>{formatDate(data.lastActivityDate)}</strong>
                </li>
              ) : null}
            </ul>
          </div>

          <a
            href={LEETCODE_STREAK.href}
            target="_blank"
            rel="noopener noreferrer"
            className="dsa__badge"
            aria-label={`${LEETCODE_STREAK.title} on LeetCode`}
            data-reveal
            suppressHydrationWarning
            data-spot
          >
            <span className="dsa__badge-media">
              <Image
                src={SITE_IMAGES.leetcode50Days}
                alt=""
                width={575}
                height={1024}
                quality={92}
                sizes="(max-width: 720px) 40vw, 200px"
              />
            </span>
            <span className="dsa__badge-copy">
              <span className="dsa__badge-eyebrow">LeetCode</span>
              <strong>{LEETCODE_STREAK.title}</strong>
              <span>{LEETCODE_STREAK.note}</span>
              <span className="dsa__badge-cta">
                View badge
                <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </span>
          </a>
        </div>

        {hasProblems && latest ? (
          <div className="dsa__log" data-reveal suppressHydrationWarning>
            <article className="dsa__latest">
              <p className="dsa__kicker">
                Latest solved · <span>Day {latest.dayNumber}</span>
              </p>
              <span className="dsa__stamp" aria-hidden="true">
                Accepted
              </span>
              <h3>{latest.title}</h3>
              <p className="dsa__latest-meta">
                {latest.difficulty ? (
                  <span className={`dsa__diff${difficultyClass(latest.difficulty)}`}>{latest.difficulty}</span>
                ) : null}
                {[latest.platform, latest.pattern].filter(Boolean).join(" · ")}
              </p>
              {latest.date ? (
                <time className="dsa__latest-date" dateTime={latest.date}>
                  {formatDate(latest.date)}
                </time>
              ) : null}
            </article>

            <div className="dsa__feed">
              <p className="dsa__kicker">Recent log</p>
              <ol>
                {log.map((problem) => (
                  <li key={problem.id} className="dsa__row">
                    <span className="dsa__row-day">D{problem.dayNumber}</span>
                    <span className="dsa__row-body">
                      <span className="dsa__row-title">{problem.title}</span>
                      <span className="dsa__row-meta">
                        {[problem.platform, problem.pattern].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                    {problem.difficulty ? (
                      <span className={`dsa__diff${difficultyClass(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    ) : null}
                    {problem.date ? (
                      <time className="dsa__row-date" dateTime={problem.date}>
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
          <div className="dsa__empty" data-reveal suppressHydrationWarning>
            <p className="dsa__empty-title">Pipeline is live — feed syncing</p>
            <p>
              Structured DSA folders in GitHub sync to AlgoChronicle for streaks, stats, and revision views.
              Open the tracker or repo to see the latest activity.
            </p>
            <PracticeActions />
          </div>
        )}
      </div>
    </section>
  );
}
