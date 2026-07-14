/**
 * AlgoChronicle + dsa-problems activity for the portfolio widget.
 * Primary: GitHub dsa-problems (always matches repo). Secondary: AlgoChronicle API stats.
 */

export const ALGOCHRONICLE = {
  siteUrl: "https://algochronicle.vercel.app",
  logsApi: "https://algochronicle.vercel.app/api/getLogs",
  consistencyUrl: "https://algochronicle.vercel.app/consistency",
  dsaRepo: "https://github.com/srujanchidarla/dsa-problems",
  siteRepo: "https://github.com/srujanchidarla/algochronicle",
} as const;

export interface DSAProblemSummary {
  id: string;
  dayNumber: number;
  title: string;
  platform: string;
  pattern?: string;
  difficulty?: string;
  date: string;
  link?: string;
  folder: string;
}

export interface DSAActivityData {
  currentStreak: number;
  longestStreak: number;
  totalProblems: number;
  latestDay: number;
  recentProblems: DSAProblemSummary[];
  lastActivityDate: string | null;
  source: "algochronicle" | "github" | "mixed";
  syncStatus: "live" | "repo-ahead" | "offline";
}

const DSA_REPO = "srujanchidarla/dsa-problems";
const DAY_FOLDER_RE = /^day(\d{3})_/;

const GH_HEADERS: HeadersInit = {
  Accept: "application/vnd.github+json",
  "User-Agent": "srujan-portfolio",
  "X-GitHub-Api-Version": "2022-11-28",
};

interface GitHubContentItem {
  name: string;
  path: string;
  type: string;
}

interface AlgoStats {
  currentStreak?: number;
  longestStreak?: number;
  totalProblems?: number;
}

function parseReadmeMetadata(content: string, dayNumber: number, folder: string): Partial<DSAProblemSummary> {
  const meta: Record<string, string> = {};

  const yamlMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (yamlMatch) {
    for (const line of yamlMatch[1].split("\n")) {
      const m = line.match(/^([a-zA-Z]+):\s*(.+)$/);
      if (m) meta[m[1].toLowerCase()] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  }

  for (const line of content.split("\n")) {
    const table = line.match(/^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/);
    if (table) {
      const key = table[1].trim().toLowerCase().replace(/\s+/g, "");
      const value = table[2].trim();
      if (key && value && key !== "field" && !key.startsWith("-")) {
        meta[key] = value;
      }
    }
  }

  let title = meta.title;
  if (!title) {
    const heading = content.match(/^#\s+Day\s+\d+\s*[-–:]\s*(.+)$/m);
    if (heading) title = heading[1].trim();
  }

  return {
    id: folder,
    dayNumber,
    title: title || folder.replace(/^day\d{3}_/, "").replace(/_/g, " "),
    platform: meta.platform || "Practice",
    pattern: meta.pattern || meta.topic,
    difficulty: meta.difficulty,
    date: meta.date || "",
    link: meta.link,
    folder,
  };
}

function computeStreakFromDates(dates: string[]): { current: number; longest: number } {
  const unique = [...new Set(dates.filter(Boolean))].sort();
  if (unique.length === 0) return { current: 0, longest: 0 };

  let longest = 1;
  let run = 1;

  for (let i = 1; i < unique.length; i++) {
    const prev = new Date(unique[i - 1] + "T12:00:00");
    const curr = new Date(unique[i] + "T12:00:00");
    const diffDays = Math.round((curr.getTime() - prev.getTime()) / 86400000);
    if (diffDays === 1) {
      run++;
      longest = Math.max(longest, run);
    } else if (diffDays > 1) {
      run = 1;
    }
  }

  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const last = new Date(unique[unique.length - 1] + "T12:00:00");
  const daysSinceLast = Math.round((today.getTime() - last.getTime()) / 86400000);

  let current = 0;
  if (daysSinceLast <= 1) {
    current = 1;
    for (let i = unique.length - 2; i >= 0; i--) {
      const prev = new Date(unique[i] + "T12:00:00");
      const next = new Date(unique[i + 1] + "T12:00:00");
      const diff = Math.round((next.getTime() - prev.getTime()) / 86400000);
      if (diff === 1) current++;
      else break;
    }
  }

  return { current, longest };
}

async function fetchFromGitHub(limit = 6): Promise<{
  problems: DSAProblemSummary[];
  totalProblems: number;
  latestDay: number;
}> {
  const token = process.env.GITHUB_TOKEN;
  const headers = token ? { ...GH_HEADERS, Authorization: `Bearer ${token}` } : GH_HEADERS;

  const res = await fetch(`https://api.github.com/repos/${DSA_REPO}/contents?per_page=100`, {
    headers,
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}`);
  }

  const items = (await res.json()) as GitHubContentItem[];
  const folders = items
    .filter((item) => item.type === "dir" && DAY_FOLDER_RE.test(item.name))
    .map((item) => {
      const dayNumber = parseInt(item.name.match(DAY_FOLDER_RE)![1], 10);
      return { ...item, dayNumber };
    })
    .sort((a, b) => b.dayNumber - a.dayNumber);

  const recentFolders = folders.slice(0, limit);
  const problems: DSAProblemSummary[] = [];

  await Promise.all(
    recentFolders.map(async (folder) => {
      const readmeRes = await fetch(
        `https://raw.githubusercontent.com/${DSA_REPO}/main/${folder.path}/README.md`,
        { next: { revalidate: 1800 } }
      );
      if (!readmeRes.ok) return;
      const content = await readmeRes.text();
      const parsed = parseReadmeMetadata(content, folder.dayNumber, folder.name);
      problems.push(parsed as DSAProblemSummary);
    })
  );

  problems.sort((a, b) => b.dayNumber - a.dayNumber);

  return {
    problems,
    totalProblems: folders.length,
    latestDay: folders[0]?.dayNumber ?? 0,
  };
}

async function fetchAlgoChronicleStats(): Promise<AlgoStats | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(`${ALGOCHRONICLE.logsApi}?limit=1`, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = (await res.json()) as { stats?: AlgoStats; logs?: { dayNumber?: number }[] };
    return data.stats ?? null;
  } catch {
    return null;
  }
}

export async function fetchDSAActivity(): Promise<DSAActivityData> {
  const github = await fetchFromGitHub(6);
  const algoStats = await fetchAlgoChronicleStats();

  const dates = github.problems.map((p) => p.date).filter(Boolean);
  const githubStreak = computeStreakFromDates(dates);

  const algoTotal = algoStats?.totalProblems ?? 0;
  const syncStatus: DSAActivityData["syncStatus"] =
    algoTotal > 0 && algoTotal < github.totalProblems - 2
      ? "repo-ahead"
      : algoTotal > 0
        ? "live"
        : "repo-ahead";

  return {
    currentStreak: algoStats?.currentStreak ?? githubStreak.current,
    longestStreak: algoStats?.longestStreak ?? githubStreak.longest,
    totalProblems: Math.max(github.totalProblems, algoTotal),
    latestDay: github.latestDay,
    recentProblems: github.problems,
    lastActivityDate: dates.sort().at(-1) ?? null,
    source: algoStats ? "mixed" : "github",
    syncStatus,
  };
}
