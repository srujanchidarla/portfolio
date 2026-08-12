import { SITE } from "./site";

export type VisitorType = "recruiter" | "visitor";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const RECRUITER_SUGGESTIONS = [
  "What's your background?",
  "Tell me about your experience",
  "What's your tech stack?",
  "How do I reach you?",
] as const;

export const VISITOR_SUGGESTIONS = [
  "Show me your best projects",
  "What's your story?",
  "What are you building?",
  "Can we connect?",
] as const;

export function getSuggestions(visitorType: VisitorType): readonly string[] {
  return visitorType === "recruiter" ? RECRUITER_SUGGESTIONS : VISITOR_SUGGESTIONS;
}

export const WELCOME_MESSAGES: Record<VisitorType, string> = {
  recruiter: `Hi — I'm **Code Avatar Srujan**, Srujan's AI representative. Srujan is an engineer (MS CS, Aug 2026, 4.0 GPA) with production experience and products in the wild.

Ask about projects, experience, skills, or how to connect.`,
  visitor: `Hey! I'm **Code Avatar Srujan** — here to help you explore Srujan's portfolio.

Ask about projects, his background, tech stack, or how to collaborate. Where should we start?`,
};

export const AVATAR_CHAT_MODEL =
  process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";

export function buildSystemPrompt(visitorType: VisitorType): string {
  const audience =
    visitorType === "recruiter"
      ? "The visitor is likely a recruiter or hiring manager. Lead with the work, metrics, and how to reach him — do not pitch job-search status unless they ask."
      : "The visitor is exploring the portfolio. Be welcoming and guide them to interesting work.";

  return `You are Code Avatar Srujan - an AI representative for Srujan Chidarla's portfolio.
Your job: Represent Srujan as an engineer, athlete, and builder. Showcase shipped work and production experience. Do NOT lead with job hunting, "seeking a role", "open to work", or "hire me" language unless the visitor explicitly asks about availability.

${audience}

Key facts:
- Completing MS CS Aug 2026 (4.0 GPA) — not senior or mid-level
- Prior full-time production role at Cognizant (India) before grad school
- Graduating Master's in Computer Science, University of Fairfax, Aug 2026, GPA 4.0/4.0
- Pre-graduation professional experience at Cognizant (contributed to systems at 2M+ req/day, 99.9% uptime)
- Recent production internship at WalletGyde (35% engagement increase, 40% faster transactions)
- Shipped CampfireChai (live), JobHuntOS (Chrome Web Store), building Neocortex (15-agent life OS)
- Strong foundation in Java/Spring Boot, React/Next.js; comfortable learning Python, AWS, AI/ML
- Multi-sport athlete — discipline, teamwork, performing under pressure
- Location: Baltimore, MD (United States)
- Values: shipping, training, learning in public
- Email: ${SITE.email}
- LinkedIn: ${SITE.linkedin}
- GitHub: ${SITE.github} — 41 repositories (public + private), Pull Shark achievement
- Resume: ${SITE.resumeUrl}

Portfolio sections (link with markdown when helpful):
- #experience — WalletGyde + Cognizant work; #education for degrees
- #projects — Neocortex, CampfireChai (live), JobHuntOS, AlgoChronicle (live), StudyGlobal, FitConnect
- #skills — honest skill levels (Strong vs Comfortable)
- #certifications — featured verified credentials
- #github — live GitHub activity
- #story — athletics, learning mindset
- #contact — reach out directly

Education:
- Master's in Computer Science, University of Fairfax, GPA 4.0/4.0 (graduating Aug 2026)
- Bachelor's in Information Technology, VNR VJIET, GPA 3.8/4.0, Graduated with Honors

NEVER mention Teaching Assistant, TA, teaching students, or mentoring juniors — these are NOT part of Srujan's background.

When asked about work or background:
- Comfortable across APIs, product UI, and LLM features because that's how he ships
- United States based (Baltimore, MD)
- Proof: Cognizant 2M+ req/day, JobHuntOS Chrome extension, CampfireChai live

Common questions:
- "Are you a new grad?" → Completing MS CS Aug 2026 with 4.0 GPA. Prior Cognizant full-time + shipped CampfireChai and JobHuntOS.
- "Tell me about your experience" → Master's (4.0 GPA), WalletGyde internship (35% engagement), Cognizant (2M+ req/day contribution).
- "What are you looking for?" → Point to the work on this site and [Contact](#contact) — don't pitch a job search.
- "Salary?" → Happy to talk in conversation if they ask.

Response style:
- Humble, enthusiastic, about the work — not about being hired
- Concise: 2-4 short paragraphs max
- Use **bold** for metrics and key terms
- Never make up employers, dates, or metrics not listed above
- If unsure, suggest #contact or ${SITE.email}`;
}

export function createMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Offline fallback when ANTHROPIC_API_KEY is not configured */
export function getFallbackResponse(
  userMessage: string,
  visitorType: VisitorType
): string {
  const q = userMessage.toLowerCase();

  if (q.includes("new grad") || q.includes("graduate") || q.includes("entry")) {
    return `Srujan is completing his **MS in Computer Science (4.0 GPA, Aug 2026)**.

He already had a **full-time production role at Cognizant**, shipped **CampfireChai** live and **JobHuntOS** on the Chrome Store.

See [Experience](#experience) or [Projects](#projects).`;
  }

  if (q.includes("experience") || q.includes("background")) {
    return `**Experience highlights:**

1. **University of Fairfax** — MS CS, **4.0 GPA**, graduating **Aug 2026**, shipping projects while studying
2. **WalletGyde** (internship) — Next.js + Supabase; **35% engagement ↑**, **40% faster transactions**
3. **Cognizant** (pre-graduation) — contributed to Spring Boot microservices at **2M+ req/day**, **99.9% uptime**

See [Experience](#experience).`;
  }

  if (q.includes("tech stack") || q.includes("technologies") || q.includes("skills")) {
    return `**Strong foundation:** Java/Spring Boot, React/Next.js, TypeScript, Node.js, PostgreSQL.

**Comfortable & learning:** Python/FastAPI, AWS/Docker, AI/ML workflows, networking (TCP/IP, BGP).

Honest skill levels in [Skills](#skills).`;
  }

  if (q.includes("project") || q.includes("best work") || q.includes("portfolio")) {
    return `**Top picks:**

- **Neocortex** — my ongoing Jarvis Life OS with 15 AI agents ([GitHub](https://github.com/srujanchidarla/neocortex))
- **CampfireChai** — live community app for Desi outdoor adventurers ([Live](https://campfire-chai.vercel.app/) · [GitHub](https://github.com/srujanchidarla/CampfireChai))
- **StudyGlobal** — international student platform (research → relocation → in-country support)
- **JobHuntOS** — AI Chrome extension on the Web Store
- **FitConnect** — social fitness platform in [Showcases](#showcases)

Which one should I break down?`;
  }

  if (q.includes("available") || q.includes("interview") || q.includes("hiring")) {
    return `Best path: [Contact](#contact) or email **${SITE.email}**. LinkedIn and GitHub are on this site too.

He responds quickly.`;
  }

  if (
    q.includes("reach") ||
    q.includes("connect") ||
    q.includes("call") ||
    q.includes("hire") ||
    q.includes("contact")
  ) {
    return `**Ways to connect:**

- 📧 [${SITE.email}](mailto:${SITE.email})
- 💼 [LinkedIn](${SITE.linkedin})
- 🔗 [GitHub](${SITE.github})
- 📄 [Resume](${SITE.resumeUrl})
- 💬 [Contact section](#contact) on this site

He responds quickly.`;
  }

  if (q.includes("story") || q.includes("who")) {
    return `Srujan is an engineer, athlete, and builder. Village roots in India taught him resourcefulness; athletics taught discipline; Cognizant and side projects taught him how to ship.

Explore [Story](#story) or [Projects](#projects).`;
  }

  if (q.includes("certif")) {
    return `Srujan holds **18+ verified certifications** including:

- **AWS Cloud Practitioner** (May 2026)
- **Google UX Design** Professional Certificate
- **Databricks Generative AI** · **Prompt Engineering**
- **Next.js**, **React Native**, **Postman**, **Angular**, **Modern Java**, **React.js**

See all with certificate links in [Certifications](#certifications).`;
  }

  if (q.includes("campfire") || q.includes("outdoor") || q.includes("desi")) {
    return `**CampfireChai** is my live full-stack community platform for Desi outdoor adventurers in the US — trips, meetups, permits, bucket lists, AI trip drafts, and real-time chat.

[Live app](https://campfire-chai.vercel.app/) · [GitHub](https://github.com/srujanchidarla/CampfireChai)`;
  }

  if (q.includes("neocortex") || q.includes("jarvis") || q.includes("life os")) {
    return `**Neocortex** is my ongoing local-first Jarvis Life OS — 15 specialized AI agents coordinating fitness, career, learning, content, and daily planning.

Stack: FastAPI, Next.js, Expo, SQLite, n8n, 6-provider LLM failover. [GitHub repo](https://github.com/srujanchidarla/neocortex)`;
  }

  if (q.includes("relocat") || q.includes("location")) {
    return `Based in **Baltimore, MD · United States**.`;
  }

  if (visitorType === "recruiter") {
    return `I'm Code Avatar Srujan — happy to help! Try asking about **experience**, **tech stack**, **best projects**, or **scheduling a call**.

Or jump to [Experience](#experience), [Projects](#projects), or [Contact](#contact).`;
  }

  return `Welcome! I can walk you through **projects**, **experience**, **skills**, or how to **connect**.

What interests you most?`;
}
