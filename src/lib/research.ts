import { SITE } from "./site";

export type ResearchKind = "paper" | "preprint" | "idea";
export type ResearchStatus = "published" | "preprint" | "draft" | "idea";

export type ResearchSection = {
  heading: string;
  body: readonly string[];
};

export type ResearchItem = {
  slug: string;
  kind: ResearchKind;
  status: ResearchStatus;
  title: string;
  subtitle?: string;
  date: string;
  authors: readonly string[];
  venue?: string;
  abstract: string;
  tags: readonly string[];
  /** PDF in /public/research/ */
  pdf?: string;
  /** arXiv, DOI, conference page, etc. */
  externalUrl?: string;
  readingMinutes?: number;
  sections?: readonly ResearchSection[];
  openQuestions?: readonly string[];
};

/**
 * Research index — papers, preprints, and working ideas.
 *
 * Add a paper:
 * 1. Drop the PDF in `public/research/your-slug.pdf`
 * 2. Push an item with kind: "paper" | "preprint" and pdf: "/research/your-slug.pdf"
 * 3. Optional: fill `sections` for a long-form page at /research/your-slug
 *
 * Add an idea: kind: "idea", write `sections` + `openQuestions`.
 */
export const RESEARCH_ITEMS: readonly ResearchItem[] = [
  {
    slug: "llm-provider-failover",
    kind: "idea",
    status: "idea",
    title: "What failover actually means when a product depends on six LLMs",
    subtitle:
      "A working note from JobHuntOS and Neocortex — not a paper, a question I keep running into.",
    date: "2026-08-01",
    authors: [SITE.name],
    venue: "Working note",
    abstract:
      "Multi-provider routing is usually sold as “if Claude is down, call Gemini.” In a product, failover also means latency budgets, quality drift, cost cliffs, and what the user sees while the chain walks. I want a clearer model for that — not another wrapper SDK.",
    tags: ["LLMs", "Reliability", "Systems"],
    readingMinutes: 6,
    sections: [
      {
        heading: "The question",
        body: [
          "JobHuntOS routes Claude, Gemini, and Groq with SSE streaming and provider failover. Neocortex pushes that further with a six-provider chain. The engineering is real. The research question is still open: what should “the request succeeded” mean when the model that answered is not the model you wanted?",
          "Availability is the easy metric. Quality under substitution is the hard one. A fallback that returns in 400ms with a weaker model can be worse than a 2s wait for the primary — or better, if the user is mid-flow in a Chrome extension and the tab is about to background.",
        ],
      },
      {
        heading: "What I have observed shipping this",
        body: [
          "Timeouts and 429s are not the same failure. One is “try the next provider.” The other is “back off this key and maybe the whole vendor.” Treating them as one error class makes the chain look busy and still fail.",
          "Streaming changes the contract. Once tokens have started, swapping providers mid-response is a different product than retrying before the first byte. Most router diagrams ignore that.",
          "BYOK (bring your own key) makes failover a user-policy problem, not just an infra one. Some users have only one key. The honest UI is “this provider is down,” not a silent hop they did not consent to.",
        ],
      },
      {
        heading: "A sketch of the model I want",
        body: [
          "Score each attempt on four axes: time-to-first-token, cost, a cheap quality proxy (length, schema validity, or a tiny grader), and user-visible interruption. Failover is then a policy over that score, not a linked list of vendors.",
          "I do not have a dataset or a paper here. I have production traces from my own products and a suspicion that “N providers” is the wrong unit. The unit is interruption.",
        ],
      },
    ],
    openQuestions: [
      "When is a silent fallback worse than a visible retry?",
      "Can a tiny on-device grader catch quality cliffs cheaply enough to run on every hop?",
      "How should BYOK products express failover policy without turning settings into an SRE console?",
    ],
  },
  {
    slug: "agent-specialization-tax",
    kind: "idea",
    status: "idea",
    title: "Fifteen agents vs one planner: when specialization starts to cost more than it saves",
    subtitle:
      "Notes from building Neocortex — a local-first life OS with too many names on purpose.",
    date: "2026-07-18",
    authors: [SITE.name],
    venue: "Working note",
    abstract:
      "Splitting a personal OS into specialized agents (fitness, DSA, job search, deep work) feels clean on a whiteboard. Coordination tax shows up the first week you actually live in it: shared memory, conflicting goals, and the human who still has to be the router.",
    tags: ["Agents", "HCI", "Architecture"],
    readingMinutes: 5,
    sections: [
      {
        heading: "The question",
        body: [
          "Neocortex has fifteen specialized agents and a six-provider LLM chain. The bet was: one agent per domain, one owner per failure mode. The open question is when that bet stops paying rent.",
          "Recruiters do not need a multi-agent paper from a new grad. I still need a clear answer for myself, because the next six months of this project either become a product or a graveyard of prompts.",
        ],
      },
      {
        heading: "Where specialization helped",
        body: [
          "Scope. Jarvis vs Hercules vs Turing do not share a system prompt soup. When fitness advice leaked into job-search drafts, that was a routing bug I could see.",
          "Eval. I can tell whether the DSA agent is useful without waiting for the whole OS to feel “smart.” Small agents are easier to be honest about.",
        ],
      },
      {
        heading: "Where it hurt",
        body: [
          "Shared context. A Tuesday that includes a workout, a LeetCode set, and a recruiter screen is one human day. Fifteen agents do not automatically know that. I ended up rebuilding a thin planner anyway.",
          "Naming is not architecture. Fifteen names look like research. They can also be fifteen ways to avoid a boring CRUD layer and a calendar.",
        ],
      },
    ],
    openQuestions: [
      "What is the smallest agent set that still matches how a day actually feels?",
      "Should the human be an explicit agent in the graph, or only the UI?",
      "When does local-first memory beat another LLM hop for “what did I already decide?”",
    ],
  },
] as const;

export const RESEARCH_PAPERS = RESEARCH_ITEMS.filter(
  (item) => item.kind === "paper" || item.kind === "preprint"
);

export const RESEARCH_IDEAS = RESEARCH_ITEMS.filter((item) => item.kind === "idea");

export function getResearchItem(slug: string): ResearchItem | undefined {
  return RESEARCH_ITEMS.find((item) => item.slug === slug);
}

export function researchHref(item: ResearchItem): string {
  return `/research/${item.slug}`;
}

export function researchKindLabel(kind: ResearchKind): string {
  if (kind === "paper") return "Paper";
  if (kind === "preprint") return "Preprint";
  return "Idea";
}

export function researchStatusLabel(status: ResearchStatus): string {
  if (status === "published") return "Published";
  if (status === "preprint") return "Preprint";
  if (status === "draft") return "Draft";
  return "Working note";
}
