import { GITHUB_PROFILE, SITE } from "./site";

export const GITHUB_USERNAME = SITE.github.replace("https://github.com/", "");
export const GITHUB_CACHE_TAG = "github-activity";
const REVALIDATE_SECONDS = 3600;

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  languages: string[];
  updatedAt: string;
  url: string;
  isPrivate: boolean;
}

export interface LanguageStat {
  name: string;
  bytes: number;
  percent: number;
}

export type GitHubDataSource = "github-api-authenticated" | "github-api-public" | "fallback";

export interface GitHubActivityData {
  username: string;
  profileUrl: string;
  bio: string;
  totalContributions: number;
  contributions: ContributionDay[];
  repos: GitHubRepo[];
  totalStars: number;
  totalRepos: number;
  publicRepos: number;
  privateRepos: number;
  followers: number;
  achievement: string;
  languageStats: LanguageStat[];
  groupedLanguageStats: LanguageStat[];
  topLanguage: string;
  pullRequests: number | null;
  issuesResolved: number | null;
  fetchedAt: string;
  hasPrivateAccess: boolean;
  contributionsIncludesPrivate: boolean;
  dataSource: GitHubDataSource;
}

const LANGUAGE_GROUPS: Record<string, string> = {
  JavaScript: "JavaScript/TypeScript",
  TypeScript: "JavaScript/TypeScript",
  Java: "Java",
  Python: "Python",
  "C++": "C++",
};

const GH_HEADERS: HeadersInit = {
  Accept: "application/vnd.github+json",
  "User-Agent": "srujan-portfolio",
  "X-GitHub-Api-Version": "2022-11-28",
};

const REPO_DESCRIPTIONS: Record<string, string> = {
  portfolio: "My personal portfolio — Next.js, recruiter-focused, live at srujanchidarla.com",
  "job-hunt-os": "JobHuntOS Chrome extension — AI job analysis, resume tailoring, and smart autofill",
  JobHuntOS: "JobHuntOS Chrome extension — AI job analysis, resume tailoring, and smart autofill",
  CampfireChai:
    "Full-stack AI community platform for South Asian diaspora outdoor adventurers in the US",
  neocortex:
    "Jarvis Life OS — biometrics, attention regulation, and autonomous networking with 15 AI agents",
};

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return GH_HEADERS;
  return { ...GH_HEADERS, Authorization: `Bearer ${token}` };
}

function levelFromGitHubContributionLevel(level: string): number {
  const map: Record<string, number> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };
  return map[level] ?? 0;
}

function parseContributionCalendar(calendar: {
  totalContributions: number;
  weeks: Array<{
    contributionDays: Array<{
      date: string;
      contributionCount: number;
      contributionLevel: string;
    }>;
  }>;
}): { total: number; days: ContributionDay[] } {
  const days: ContributionDay[] = [];
  for (const week of calendar.weeks ?? []) {
    for (const day of week.contributionDays ?? []) {
      days.push({
        date: day.date,
        count: day.contributionCount ?? 0,
        level: levelFromGitHubContributionLevel(day.contributionLevel ?? "NONE"),
      });
    }
  }
  return {
    total: calendar.totalContributions ?? days.reduce((s, d) => s + d.count, 0),
    days,
  };
}

function groupLanguages(stats: LanguageStat[]): LanguageStat[] {
  const grouped: Record<string, number> = {};
  for (const stat of stats) {
    const bucket = LANGUAGE_GROUPS[stat.name] ?? "Other";
    grouped[bucket] = (grouped[bucket] ?? 0) + stat.bytes;
  }
  const totalBytes = Object.values(grouped).reduce((s, b) => s + b, 0);
  if (totalBytes === 0) return [];

  return Object.entries(grouped)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percent: Math.round((bytes / totalBytes) * 100),
    }))
    .sort((a, b) => b.bytes - a.bytes);
}

function formatRelativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? "s" : ""} ago`;
}

async function githubGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T | null> {
  const token = process.env.GITHUB_TOKEN;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ query, variables }),
      next: { tags: [GITHUB_CACHE_TAG], revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) return null;
    const json = await res.json();
    if (json.errors?.length) {
      console.error("[github] GraphQL errors:", json.errors);
      return null;
    }
    return json.data as T;
  } catch (err) {
    console.error("[github] GraphQL fetch failed:", err);
    return null;
  }
}

interface GraphQLRepoNode {
  name: string;
  description: string | null;
  isPrivate: boolean;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string } | null;
  updatedAt: string;
  url: string;
  languages?: {
    edges: Array<{ size: number; node: { name: string } }>;
  };
}

interface GraphQLActivityPayload {
  bio: string | null;
  login: string;
  followers: { totalCount: number };
  repositories: { totalCount: number };
  allRepos: { nodes: Array<{ stargazerCount: number; isPrivate: boolean }> };
  contributionsCollection: {
    totalPullRequestContributions: number;
    totalIssueContributions: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: Array<{
        contributionDays: Array<{
          date: string;
          contributionCount: number;
          contributionLevel: string;
        }>;
      }>;
    };
  };
}

const AUTHENTICATED_QUERY = `
  query GitHubActivityAuthenticated {
    viewer {
      bio
      login
      followers { totalCount }
      repositories(
        ownerAffiliations: OWNER
        isFork: false
        first: 0
      ) {
        totalCount
      }
      allRepos: repositories(
        first: 100
        ownerAffiliations: OWNER
        isFork: false
      ) {
        nodes {
          stargazerCount
          isPrivate
        }
      }
      contributionsCollection {
        totalPullRequestContributions
        totalIssueContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
      recentRepos: repositories(
        first: 6
        orderBy: { field: UPDATED_AT, direction: DESC }
        ownerAffiliations: OWNER
        isFork: false
      ) {
        nodes {
          name
          description
          isPrivate
          stargazerCount
          forkCount
          primaryLanguage { name }
          updatedAt
          url
        }
      }
      langRepos: repositories(
        first: 15
        orderBy: { field: UPDATED_AT, direction: DESC }
        ownerAffiliations: OWNER
        isFork: false
      ) {
        nodes {
          name
          languages(first: 8, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name } }
          }
        }
      }
    }
  }
`;

const PUBLIC_USER_QUERY = `
  query GitHubActivityPublic($login: String!) {
    user(login: $login) {
      bio
      login
      followers { totalCount }
      repositories(ownerAffiliations: OWNER, isFork: false, first: 0) {
        totalCount
      }
      allRepos: repositories(
        first: 100
        ownerAffiliations: OWNER
        isFork: false
        privacy: PUBLIC
      ) {
        nodes {
          stargazerCount
          isPrivate
        }
      }
      contributionsCollection {
        totalPullRequestContributions
        totalIssueContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
      recentRepos: repositories(
        first: 6
        orderBy: { field: UPDATED_AT, direction: DESC }
        ownerAffiliations: OWNER
        isFork: false
        privacy: PUBLIC
      ) {
        nodes {
          name
          description
          isPrivate
          stargazerCount
          forkCount
          primaryLanguage { name }
          updatedAt
          url
        }
      }
      langRepos: repositories(
        first: 15
        orderBy: { field: UPDATED_AT, direction: DESC }
        ownerAffiliations: OWNER
        isFork: false
        privacy: PUBLIC
      ) {
        nodes {
          name
          languages(first: 8, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name } }
          }
        }
      }
    }
  }
`;

type AuthenticatedData = {
  viewer: GraphQLActivityPayload & {
    recentRepos: { nodes: GraphQLRepoNode[] };
    langRepos: { nodes: GraphQLRepoNode[] };
  };
};

type PublicData = {
  user: GraphQLActivityPayload & {
    recentRepos: { nodes: GraphQLRepoNode[] };
    langRepos: { nodes: GraphQLRepoNode[] };
  };
};

function mapRepos(nodes: GraphQLRepoNode[]): GitHubRepo[] {
  return nodes.map((r) => ({
    name: r.name,
    description: r.description ?? REPO_DESCRIPTIONS[r.name] ?? null,
    stars: r.stargazerCount,
    forks: r.forkCount,
    language: r.primaryLanguage?.name ?? null,
    languages: r.primaryLanguage ? [r.primaryLanguage.name] : [],
    updatedAt: formatRelativeDate(r.updatedAt),
    url: r.url,
    isPrivate: r.isPrivate,
  }));
}

function aggregateLanguageStats(langRepoNodes: GraphQLRepoNode[]): LanguageStat[] {
  const totals: Record<string, number> = {};
  for (const repo of langRepoNodes) {
    for (const edge of repo.languages?.edges ?? []) {
      totals[edge.node.name] = (totals[edge.node.name] ?? 0) + edge.size;
    }
  }
  const totalBytes = Object.values(totals).reduce((s, b) => s + b, 0);
  if (totalBytes === 0) return [];

  return Object.entries(totals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percent: Math.round((bytes / totalBytes) * 100),
    }))
    .sort((a, b) => b.bytes - a.bytes);
}

function buildFromGraphQL(
  profile: GraphQLActivityPayload & {
    recentRepos: { nodes: GraphQLRepoNode[] };
    langRepos: { nodes: GraphQLRepoNode[] };
  },
  source: GitHubDataSource,
  includesPrivate: boolean
): GitHubActivityData {
  const contributions = parseContributionCalendar(
    profile.contributionsCollection.contributionCalendar
  );
  const repos = mapRepos(profile.recentRepos.nodes);
  const languageStats = aggregateLanguageStats(profile.langRepos.nodes);
  const groupedLanguageStats = groupLanguages(languageStats);
  const allRepoNodes = profile.allRepos?.nodes ?? [];
  const totalStars = allRepoNodes.reduce((s, r) => s + r.stargazerCount, 0);
  const publicRepos = allRepoNodes.filter((r) => !r.isPrivate).length;
  const privateRepos = allRepoNodes.filter((r) => r.isPrivate).length;
  const totalRepoCount = profile.repositories.totalCount || GITHUB_PROFILE.totalRepos;

  return {
    username: profile.login,
    profileUrl: SITE.github,
    bio: profile.bio ?? GITHUB_PROFILE.bio,
    totalContributions: contributions.total,
    contributions: contributions.days,
    contributionsIncludesPrivate: includesPrivate,
    repos,
    totalStars: totalStars || GITHUB_PROFILE.stars,
    totalRepos: totalRepoCount,
    publicRepos: includesPrivate ? publicRepos : totalRepoCount,
    privateRepos: includesPrivate ? privateRepos : 0,
    followers: profile.followers.totalCount ?? GITHUB_PROFILE.followers,
    achievement: GITHUB_PROFILE.achievement,
    languageStats,
    groupedLanguageStats,
    topLanguage: languageStats[0]?.name ?? "TypeScript",
    pullRequests: profile.contributionsCollection.totalPullRequestContributions,
    issuesResolved: profile.contributionsCollection.totalIssueContributions,
    fetchedAt: new Date().toISOString(),
    hasPrivateAccess: includesPrivate,
    dataSource: source,
  };
}

async function fetchFromGitHubAPI(username: string): Promise<GitHubActivityData | null> {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    const data = await githubGraphQL<AuthenticatedData>(AUTHENTICATED_QUERY);
    if (data?.viewer) {
      return buildFromGraphQL(data.viewer, "github-api-authenticated", true);
    }
  }

  const data = await githubGraphQL<PublicData>(PUBLIC_USER_QUERY, { login: username });
  if (data?.user) {
    return buildFromGraphQL(data.user, "github-api-public", false);
  }

  return null;
}

/** REST fallback when GraphQL is unavailable */
async function fetchFallback(username: string): Promise<GitHubActivityData> {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      headers: GH_HEADERS,
      next: { tags: [GITHUB_CACHE_TAG], revalidate: REVALIDATE_SECONDS },
    }),
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`, {
      headers: GH_HEADERS,
      next: { tags: [GITHUB_CACHE_TAG], revalidate: REVALIDATE_SECONDS },
    }),
  ]);

  const user = userRes.ok ? await userRes.json() : null;
  const reposRaw: Array<{
    name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    updated_at: string;
    html_url: string;
    private: boolean;
  }> = reposRes.ok ? await reposRes.json() : [];

  return {
    username,
    profileUrl: SITE.github,
    bio: user?.bio ?? GITHUB_PROFILE.bio,
    totalContributions: GITHUB_PROFILE.contributionsLastYear,
    contributions: [],
    contributionsIncludesPrivate: false,
    repos: reposRaw
      .filter((r) => !(r as { fork?: boolean }).fork)
      .map((r) => ({
      name: r.name,
      description: r.description ?? REPO_DESCRIPTIONS[r.name] ?? null,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language,
      languages: r.language ? [r.language] : [],
      updatedAt: formatRelativeDate(r.updated_at),
      url: r.html_url,
      isPrivate: r.private,
    })),
    totalStars: GITHUB_PROFILE.stars,
    totalRepos: GITHUB_PROFILE.totalRepos,
    publicRepos: user?.public_repos ?? 0,
    privateRepos: Math.max(0, GITHUB_PROFILE.totalRepos - (user?.public_repos ?? 0)),
    followers: user?.followers ?? GITHUB_PROFILE.followers,
    achievement: GITHUB_PROFILE.achievement,
    languageStats: [],
    groupedLanguageStats: [],
    topLanguage: "TypeScript",
    pullRequests: null,
    issuesResolved: null,
    fetchedAt: new Date().toISOString(),
    hasPrivateAccess: false,
    dataSource: "fallback",
  };
}

export async function fetchGitHubActivity(): Promise<GitHubActivityData> {
  const live = await fetchFromGitHubAPI(GITHUB_USERNAME);
  if (live) return live;
  return fetchFallback(GITHUB_USERNAME);
}
