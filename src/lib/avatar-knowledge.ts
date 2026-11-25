import { CAREER_MILESTONES } from "./career-track";
import { CASE_STUDIES } from "./case-studies";
import { CERTIFICATIONS } from "./certifications";
import { OPEN_SOURCE, SPORTS_ACHIEVEMENTS, VOLUNTEERING } from "./credibility";
import { EDUCATION, EXPERIENCES } from "./experience";
import { IMPACT_PROJECTS, SKILL_CLUSTERS, SPORTS, STORY_BEATS } from "./recruiter-home";
import { RESEARCH_ITEMS, researchHref } from "./research";
import { LEETCODE_STREAK, LOCAL_GUIDE, SITE, WORK_AUTH } from "./site";
import { SYSTEM_DESIGN_ESSAY } from "./system-design";
import { NETWORK_JOURNEY, WRITING_POSTS } from "./writing";

/**
 * Everything the avatar knows about Srujan, generated from the same data the site renders.
 * Update a project, job or certificate in `src/lib` and the avatar learns it on the next deploy —
 * there is no second copy of the facts to keep in sync.
 */

type Project = (typeof IMPACT_PROJECTS)[number];

const field = <K extends string>(project: Project, key: K): string | undefined =>
  key in project ? ((project as Record<string, unknown>)[key] as string | undefined) : undefined;

export function projectLinks(project: Project): string[] {
  const links = [`Case study: ${SITE.website}/work/${project.id}`];
  const live = field(project, "liveHref");
  const appStore = field(project, "appStoreHref");
  const repo = field(project, "href");
  const dsa = field(project, "dsaRepoHref");
  if (live) links.push(`Live: ${live}`);
  if (appStore) links.push(`App Store (iPhone): ${appStore}`);
  if (repo) links.push(`${project.id === "jobhuntos" ? "Chrome Web Store" : "GitHub"}: ${repo}`);
  if (dsa) links.push(`DSA solutions repo: ${dsa}`);
  return links;
}

function projectSection(project: Project): string {
  const study = CASE_STUDIES.find((c) => c.id === project.id);
  const lines = [
    `### ${project.title} (${project.tag})`,
    `Role: ${project.role}`,
    `One line: ${project.journey}`,
    `Problem: ${project.problem}`,
    `Approach: ${project.solution}`,
    `Result: ${project.result}. ${project.resultDetail}`,
    `Stack: ${project.stack.join(", ")}`,
    `What he learned: ${project.learned}`,
  ];
  if (study) {
    lines.push(`Summary: ${study.summary}`);
    lines.push(`Product: ${study.product}`);
    lines.push(`Features: ${study.aspects.map((a) => `${a.title} — ${a.text}`).join(" | ")}`);
    lines.push(`How he built it: ${study.workflow.join(" ")}`);
    lines.push(`Challenges: ${study.challenges.map((c) => `${c.title} — ${c.text}`).join(" | ")}`);
    if (study.stats?.length) lines.push(`Numbers: ${study.stats.map((s) => `${s.value} ${s.label}`).join(" · ")}`);
    if (study.layers.length) {
      lines.push(`Architecture: ${study.layers.map((l) => `${l.name}: ${l.parts.join(", ")}`).join(" | ")}`);
    }
  }
  lines.push(...projectLinks(project));
  return lines.join("\n");
}

export function buildKnowledge(): string {
  return [
    "## Identity and contact",
    `Name: ${SITE.name}. ${SITE.role}. ${SITE.status}.`,
    `Master's in Computer Science completed ${SITE.gradDate} with a 4.0 GPA.`,
    `Work authorization: ${WORK_AUTH.line} Open to relocating anywhere in the US, and to remote roles.`,
    `Email: ${SITE.email} · LinkedIn: ${SITE.linkedin} · GitHub: ${SITE.github} · LeetCode: ${SITE.leetcode}`,
    `Website: ${SITE.website} · Resume: ${SITE.website}${SITE.resumeUrl}`,

    "## Education",
    ...EDUCATION.map((e) => `- ${e.degree}, ${e.school} (${e.location}), ${e.duration}. ${e.detail}`),

    "## Work experience",
    ...EXPERIENCES.map((x) =>
      [
        `### ${x.company} — ${x.role} (${x.type}), ${x.duration}, ${x.location}`,
        x.roles?.length ? `Titles: ${x.roles.map((r) => `${r.title} (${r.period})`).join("; ")}` : "",
        x.description,
        ...x.achievements.map((a) => `- ${a}`),
        `Tech: ${x.techStack.join(", ")}`,
      ]
        .filter(Boolean)
        .join("\n")
    ),

    "## Projects (he is the sole builder of each unless stated)",
    ...IMPACT_PROJECTS.map(projectSection),
    "### Smaller tools",
    ...OPEN_SOURCE.items.filter((i) => /PixelPeek|TrueScreenshot/.test(i)).map((i) => `- ${i}`),

    "## Career timeline (oldest first)",
    ...CAREER_MILESTONES.map((m) => `- ${m.year}${m.when ? ` ${m.when}` : ""}: ${m.title}. ${m.detail}`),

    "## Skills (his own honest levels)",
    ...SKILL_CLUSTERS.map(
      (c) => `- ${c.label}: ${c.skills.map((s) => `${s.name} — ${s.strength} (${s.proof})`).join("; ")}`
    ),

    `## Certifications (${CERTIFICATIONS.length} verified)`,
    ...CERTIFICATIONS.map((c) => `- ${c.title} — ${c.issuer}, ${c.issued}: ${c.url}`),

    "## Writing and research",
    `- ${NETWORK_JOURNEY.title}: ${SITE.website}${NETWORK_JOURNEY.href} — ${NETWORK_JOURNEY.summary}`,
    `- ${SYSTEM_DESIGN_ESSAY.title}: ${SITE.website}/writing/system-design`,
    ...RESEARCH_ITEMS.map((r) => `- ${r.title} (${r.kind}): ${SITE.website}${researchHref(r)}`),
    ...WRITING_POSTS.map((p) => `- LinkedIn post: ${p.title}`),

    "## Practice and community",
    `- LeetCode: ${LEETCODE_STREAK.title} (${LEETCODE_STREAK.note}). Every solution is published automatically to AlgoChronicle.`,
    `- Google Maps Local Guide Level ${LOCAL_GUIDE.level}: ${LOCAL_GUIDE.contributions} contributions, ${LOCAL_GUIDE.points} points (${LOCAL_GUIDE.pointsExact} of ${LOCAL_GUIDE.pointsGoal}), ${LOCAL_GUIDE.views} views. Badges: ${LOCAL_GUIDE.badges.join(", ")}. ${LOCAL_GUIDE.breakdown.map((b) => `${b.value} ${b.label}`).join(", ")}. Profile: ${SITE.localGuide}`,
    ...VOLUNTEERING.items.map((i) => `- ${i}`),
    "- GitHub: 1,000+ contributions; the live numbers are in the Open source section of the home page.",

    "## Athletics",
    `Sports: ${SPORTS.join(", ")}.`,
    ...SPORTS_ACHIEVEMENTS.items.map((i) => `- ${i}`),

    "## His story",
    ...STORY_BEATS.map((b) => `- ${b.year} · ${b.title}: ${b.text}`),

    "## Pages to link to (use these exact paths)",
    "- Home sections: /#projects, /#experience, /#education, /#skills, /#certifications, /#writing, /#athlete, /#local-guide, /#github, /#daily-dsa, /#contact",
    `- Case studies: ${IMPACT_PROJECTS.map((p) => `/work/${p.id} (${p.title})`).join(", ")}`,
    "- About and story: /about · Resume: /resume · google.com deep dive: /writing/google-com · System design essay: /writing/system-design",
  ].join("\n");
}
