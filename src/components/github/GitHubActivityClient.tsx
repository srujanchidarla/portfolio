"use client";

import { useState } from "react";
import { ExternalLink, Star, GitFork, HelpCircle, Lock, Award } from "lucide-react";
import type { ContributionDay, GitHubActivityData } from "@/lib/github";

const LEVEL_COLORS = [
  "var(--gh-level-0)",
  "var(--gh-level-1)",
  "var(--gh-level-2)",
  "var(--gh-level-3)",
  "var(--gh-level-4)",
];

function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <span className="gh-tooltip-wrap">
      {children}
      <span className="gh-tooltip" role="tooltip">
        {text}
      </span>
    </span>
  );
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function buildWeeks(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  if (days.length === 0) return weeks;

  let week: ContributionDay[] = [];
  const firstDay = new Date(days[0].date + "T12:00:00").getDay();
  for (let i = 0; i < firstDay; i++) week.push({ date: "", count: 0, level: 0 });
  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) weeks.push(week);
  return weeks;
}

function monthLabelsForWeeks(weeks: ContributionDay[][]): string[] {
  let lastMonth = -1;
  return weeks.map((week) => {
    const first = week.find((d) => d.date);
    if (!first) return "";
    const month = new Date(first.date + "T12:00:00").getMonth();
    if (month !== lastMonth) {
      lastMonth = month;
      return MONTH_LABELS[month];
    }
    return "";
  });
}

const CELL_PX = 12;
const CELL_GAP = 3;

function ContributionGraph({
  days,
  total,
  includesPrivate,
}: {
  days: ContributionDay[];
  total: number;
  includesPrivate: boolean;
}) {
  const [hovered, setHovered] = useState<ContributionDay | null>(null);
  const weeks = buildWeeks(days);
  const monthLabels = monthLabelsForWeeks(weeks);

  return (
    <div className="gh-graph">
      <div className="gh-graph__header">
        <div>
          <h3 className="gh-graph__title">Contribution activity</h3>
          <p className="gh-graph__stat">
            <strong>{total.toLocaleString()}</strong> contributions in the last year
            {!includesPrivate && (
              <span className="gh-graph__stat-note"> · public only</span>
            )}
            {includesPrivate && (
              <span className="gh-graph__stat-note"> · incl. private</span>
            )}
          </p>
        </div>
        <Tooltip text="Consistent contributions show discipline — peaks in Oct–Nov and spring match my heaviest shipping periods.">
          <button type="button" className="gh-info-btn" aria-label="About contributions">
            <HelpCircle size={15} />
          </button>
        </Tooltip>
      </div>

      {hovered && hovered.date && (
        <p className="gh-graph__hover">
          <strong>{hovered.count}</strong> contributions on{" "}
          {new Date(hovered.date + "T12:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}

      <div className="gh-graph__layout">
        <div className="gh-graph__day-labels" aria-hidden="true">
          {DAY_LABELS.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>

        <div className="gh-graph__chart">
          <div className="gh-graph__months" aria-hidden="true">
            {monthLabels.map((label, i) => (
              <div
                key={i}
                className="gh-graph__month-col"
                style={{ width: CELL_PX, marginRight: i < monthLabels.length - 1 ? CELL_GAP : 0 }}
              >
                {label ? <span>{label}</span> : null}
              </div>
            ))}
          </div>

          <div
            className="gh-graph__grid"
            style={{ gap: CELL_GAP }}
            role="img"
            aria-label={`${total} GitHub contributions in the last year`}
          >
            {weeks.map((week, wi) => (
              <div key={wi} className="gh-graph__week" style={{ gap: CELL_GAP }}>
                {week.map((day, di) => (
                  <div
                    key={`${wi}-${di}`}
                    className="gh-graph__cell"
                    style={{
                      width: CELL_PX,
                      height: CELL_PX,
                      background: LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0],
                    }}
                    onMouseEnter={() => day.date && setHovered(day)}
                    onMouseLeave={() => setHovered(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gh-graph__legend">
        <span>Less</span>
        {LEVEL_COLORS.map((color, i) => (
          <div key={i} className="gh-graph__legend-cell" style={{ background: color }} />
        ))}
        <span>More</span>
      </div>

      {!includesPrivate && (
        <p className="gh-graph__footnote">
          Add <code>GITHUB_TOKEN</code> to load private contributions in the heatmap via GitHub
          GraphQL API.
        </p>
      )}
    </div>
  );
}

const GROUP_COLORS: Record<string, string> = {
  "JavaScript/TypeScript": "#f97316",
  Java: "#f0a878",
  Python: "#34d399",
  "C++": "#a78bfa",
  Other: "#8b95a8",
};

function LanguageBar({
  detailed,
  grouped,
}: {
  detailed: GitHubActivityData["languageStats"];
  grouped: GitHubActivityData["groupedLanguageStats"];
}) {
  const top = detailed.slice(0, 6);
  const colors = ["#f97316", "#fbbf24", "#fb923c", "#34d399", "#a78bfa", "#8b95a8"];

  return (
    <div className="gh-lang">
      <div className="gh-lang__header">
        <h3 className="gh-lang__title">Coding activity</h3>
        <Tooltip text="Multiple languages across repos signals a true full-stack engineer — not a single-framework specialist.">
          <button type="button" className="gh-info-btn" aria-label="About languages">
            <HelpCircle size={15} />
          </button>
        </Tooltip>
      </div>

      <p className="gh-lang__subtitle">Most used languages (by repo bytes)</p>
      <div className="gh-lang__bars">
        {top.map((lang, i) => (
          <div key={lang.name} className="gh-lang__row">
            <span className="gh-lang__name">{lang.name}</span>
            <div className="gh-lang__track">
              <div
                className="gh-lang__fill"
                style={{ width: `${lang.percent}%`, background: colors[i % colors.length] }}
              />
            </div>
            <span className="gh-lang__pct">{lang.percent}%</span>
          </div>
        ))}
      </div>

      <p className="gh-lang__subtitle gh-lang__subtitle--spaced">Stack diversity</p>
      <div className="gh-lang__pie" role="img" aria-label="Language stack breakdown">
        {grouped.map((lang) => (
          <div
            key={lang.name}
            className="gh-lang__pie-segment"
            style={{
              flex: lang.percent,
              background: GROUP_COLORS[lang.name] ?? "#8b95a8",
            }}
            title={`${lang.name} ${lang.percent}%`}
          />
        ))}
      </div>
      <ul className="gh-lang__legend-list">
        {grouped.map((lang) => (
          <li key={lang.name}>
            <span
              className="gh-lang__legend-dot"
              style={{ background: GROUP_COLORS[lang.name] ?? "#8b95a8" }}
            />
            {lang.name}: {lang.percent}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GitHubActivityClient({ data }: { data: GitHubActivityData }) {
  return (
    <section id="github" className="github-section">
      <div className="wrap">
        <header className="github-header">
          <p className="section-eyebrow">Open Source Activity</p>
          <h2 className="section-title">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <p className="section-subtitle">
            {data.totalRepos} repositories, {data.totalContributions.toLocaleString()} contributions
            this year, and code across the full stack — pulled live from my GitHub.
          </p>

          <div className="github-profile-meta">
            <a
              href={data.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="github-profile-link"
            >
              @{data.username}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <span className="github-achievement">
              <Award size={14} aria-hidden="true" />
              {data.achievement}
            </span>
          </div>

          {data.bio && <p className="github-bio">{data.bio}</p>}
        </header>

        <div className="github-stats">
          <div className="github-stat-card">
            <span className="github-stat-card__value">{data.totalContributions.toLocaleString()}</span>
            <span className="github-stat-card__label">Contributions</span>
            <span className="github-stat-card__hint">last 12 months</span>
          </div>
          <div className="github-stat-card">
            <span className="github-stat-card__value">{data.totalRepos}</span>
            <span className="github-stat-card__label">
              <Tooltip text={`${data.publicRepos} public · ${data.privateRepos} private`}>
                <span>Repositories</span>
              </Tooltip>
            </span>
          </div>
          <div className="github-stat-card">
            <span className="github-stat-card__value">{data.totalStars}</span>
            <span className="github-stat-card__label">Total stars</span>
          </div>
          <div className="github-stat-card">
            <span className="github-stat-card__value">{data.followers}</span>
            <span className="github-stat-card__label">Followers</span>
          </div>
          {data.pullRequests !== null && (
            <div className="github-stat-card">
              <span className="github-stat-card__value">{data.pullRequests}</span>
              <span className="github-stat-card__label">Pull requests</span>
            </div>
          )}
          <div className="github-stat-card github-stat-card--lang">
            <span className="github-stat-card__value github-stat-card__lang">
              {data.topLanguage}
            </span>
            <span className="github-stat-card__label">Top language</span>
          </div>
        </div>

        <div className="github-main-grid">
          <ContributionGraph
            days={data.contributions}
            total={data.totalContributions}
            includesPrivate={data.contributionsIncludesPrivate}
          />
          <LanguageBar detailed={data.languageStats} grouped={data.groupedLanguageStats} />
        </div>

        <div className="github-repos">
          <h3 className="github-repos__title">Recently updated repositories</h3>
          <div className="github-repos__grid">
            {data.repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="github-repo-card"
              >
                <div className="github-repo-card__top">
                  <span className="github-repo-card__name font-mono">
                    {repo.isPrivate && <Lock size={12} className="github-repo-card__lock" aria-hidden="true" />}
                    {repo.name}
                  </span>
                  <ExternalLink size={14} className="github-repo-card__icon" aria-hidden="true" />
                </div>
                <p className="github-repo-card__desc">
                  {repo.description ?? "No description provided"}
                </p>
                <div className="github-repo-card__meta">
                  <span>
                    <Star size={13} aria-hidden="true" /> {repo.stars}
                  </span>
                  <span>
                    <GitFork size={13} aria-hidden="true" /> {repo.forks}
                  </span>
                  <span>Updated {repo.updatedAt}</span>
                </div>
                <div className="github-repo-card__langs">
                  {repo.isPrivate && (
                    <span className="github-repo-card__lang github-repo-card__lang--private">Private</span>
                  )}
                  {repo.languages.map((l) => (
                    <span key={l} className="github-repo-card__lang">
                      {l}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>

        <p className="github-freshness">
          {data.dataSource === "github-api-authenticated" && (
            <>Live from GitHub GraphQL API · includes private repos · </>
          )}
          {data.dataSource === "github-api-public" && (
            <>Live from GitHub GraphQL API · public data only · </>
          )}
          {data.dataSource === "fallback" && <>GitHub REST API (limited) · </>}
          Updated {new Date(data.fetchedAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
          {!data.hasPrivateAccess && (
            <> · Add <code>GITHUB_TOKEN</code> for private stats</>
          )}
        </p>
      </div>
    </section>
  );
}
