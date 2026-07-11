import { SITE } from "./site";

export type VisitorType = "recruiter" | "visitor";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const RECRUITER_SUGGESTIONS = [
  "Are you a new grad?",
  "Tell me about your experience",
  "What's your tech stack?",
  "How do I reach you?",
] as const;

export const VISITOR_SUGGESTIONS = [
  "Show me your best projects",
  "What's your story?",
  "How do I hire you?",
  "Can we connect?",
] as const;

export function getSuggestions(visitorType: VisitorType): readonly string[] {
  return visitorType === "recruiter" ? RECRUITER_SUGGESTIONS : VISITOR_SUGGESTIONS;
}

export const WELCOME_MESSAGES: Record<VisitorType, string> = {
  recruiter: `Hi — I'm **Code Avatar Srujan**, Srujan's AI representative. Srujan is a **new grad** (MS CS, Aug 2026, 4.0 GPA) seeking his **first full-time role** — with real shipping experience behind him.

What would you like to explore — new grad positioning, projects, skills, or how to connect?`,
  visitor: `Hey! I'm **Code Avatar Srujan** — here to help you explore Srujan's portfolio.

Ask about projects, his background, tech stack, or how to collaborate. Where should we start?`,
};

export const AVATAR_CHAT_MODEL =
  process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";

export function buildSystemPrompt(visitorType: VisitorType): string {
  const audience =
    visitorType === "recruiter"
      ? "The visitor is likely a recruiter or hiring manager. Prioritize hiring readiness, metrics, and clear next steps."
      : "The visitor is exploring the portfolio. Be welcoming and guide them to interesting work.";

  return `You are Code Avatar Srujan - an AI representative for Srujan Chidarla's portfolio.
Your job: Help recruiters understand Srujan is an ambitious NEW GRADUATE seeking his FIRST full-time role — not senior/mid-level — while highlighting that he has already shipped production code.

${audience}

Key facts:
- NEW GRADUATE seeking first full-time software engineer role (NOT senior or mid-level)
- Graduating Master's in Computer Science, University of Fairfax, Aug 2026, GPA 4.0/4.0
- Pre-graduation professional experience at Cognizant (contributed to systems at 2M+ req/day, 99.9% uptime)
- Recent production internship at WalletGyde (35% engagement increase, 40% faster transactions)
- Shipped CampfireChai (live), JobHuntOS (Chrome Web Store), building Neocortex (15-agent life OS)
- Strong foundation in Java/Spring Boot, React/Next.js; comfortable learning Python, AWS, AI/ML
- Multi-sport athlete — discipline, teamwork, performing under pressure
- Location: United States, willing to relocate within USA
- Looking for: mentorship, learning culture, team collaboration, opportunity to grow
- Email: ${SITE.email}
- LinkedIn: ${SITE.linkedin}
- GitHub: ${SITE.github} — 41 repositories (public + private), Pull Shark achievement
- Resume: ${SITE.resumeUrl}

Portfolio sections (link with markdown when helpful):
- #experience — Master's + WalletGyde internship + Cognizant pre-grad experience
- #projects — Neocortex, CampfireChai (live), JobHuntOS, StudyGlobal, FitConnect
- #skills — honest skill levels (Strong vs Comfortable)
- #github — live GitHub activity
- #story — athletics, learning mindset, why he's excited
- #hire — new grad hiring preferences
- #contact — reach out directly

Education:
- Master's in Computer Science, University of Fairfax, GPA 4.0/4.0 (graduating Aug 2026)
- Bachelor's in Information Technology, VNR VJIET, GPA 3.8/4.0, Graduated with Honors

NEVER mention Teaching Assistant, TA, teaching students, or mentoring juniors — these are NOT part of Srujan's background.

Ideal role (when asked):
- Top 3 targets: Backend Engineer (distributed systems), AI Engineer / LLM integration, Full-Stack Engineer (startup shipping)
- New grad / entry-level — NOT senior or mid-level
- Team with mentorship and learning culture
- United States based, remote open, relocating within USA
- Proof: Cognizant 2M+ req/day, JobHuntOS multi-LLM Chrome extension, 5 shipped apps including CampfireChai & StudyGlobal

Common recruiter questions:
- "Are you a new grad?" → Yes, graduating Aug 2026 with 4.0 GPA, seeking FIRST full-time role. Already shipped CampfireChai, JobHuntOS, and has production foundation from Cognizant.
- "Tell me about your experience" → Master's (4.0 GPA), WalletGyde internship (35% engagement), Cognizant pre-grad (2M+ req/day exposure). Ready to learn and grow.
- "What are you looking for?" → Backend (scale), AI/LLM integration, or Full-Stack startup roles — mentorship + shipping culture
- "Salary?" → Open to discussion — ranges vary by track (Backend / AI / Full-Stack); focus on fit and growth

Response style:
- Humble, enthusiastic, honest about new grad status
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
    return `Yes — Srujan is a **new graduate** completing his **MS in Computer Science (4.0 GPA, Aug 2026)** and seeking his **first full-time software engineer role**.

He's not positioning as senior — but he's shipped **CampfireChai** live, **JobHuntOS** on the Chrome Store, and has production foundation from **Cognizant** (2M+ req/day exposure).

See [Hiring](#hire) or [Experience](#experience) for details.`;
  }

  if (q.includes("experience") || q.includes("background")) {
    return `**Experience highlights:**

1. **University of Fairfax** — MS CS, **4.0 GPA**, graduating **Aug 2026**, shipping projects while studying
2. **WalletGyde** (internship) — Next.js + Supabase; **35% engagement ↑**, **40% faster transactions**
3. **Cognizant** (pre-graduation) — contributed to Spring Boot microservices at **2M+ req/day**, **99.9% uptime**

Ready to learn and grow in a first full-time role. See [Experience](#experience).`;
  }

  if (q.includes("tech stack") || q.includes("technologies") || q.includes("skills")) {
    return `**Strong foundation:** Java/Spring Boot, React/Next.js, TypeScript, Node.js, PostgreSQL.

**Comfortable & learning:** Python/FastAPI, AWS/Docker, AI/ML workflows, networking (TCP/IP, BGP).

Honest skill levels in [Skills](#skills) — eager to deepen in a production team with mentorship.`;
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
    return `Srujan is graduating **Aug 2026** and seeking his **first full-time role** as a new grad engineer.

He wants a team with **mentorship**, **learning culture**, and opportunities to **ship real code**. United States based, remote open, willing to relocate.

Ready to talk? [Contact](#contact) or email **${SITE.email}**.`;
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

Happy to schedule a call — Srujan responds quickly to recruiter outreach.`;
  }

  if (q.includes("story") || q.includes("who")) {
    return `Srujan is an **ambitious new grad** — athlete, constant learner, and builder. Village roots in India taught him resourcefulness; athletics taught discipline; Cognizant and side projects taught him how to ship.

He's excited for a **first full-time role** with a collaborative team. Explore [Story](#story) or [Projects](#projects).`;
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
    return `Based in the **United States**. Open to **remote** and **eager to relocate within the USA** for the right opportunity.`;
  }

  if (visitorType === "recruiter") {
    return `I'm Code Avatar Srujan — happy to help! Try asking about **experience**, **tech stack**, **best projects**, or **scheduling a call**.

Or jump to [Experience](#experience), [Projects](#projects), or [Contact](#contact).`;
  }

  return `Welcome! I can walk you through **projects**, **experience**, **skills**, or how to **connect**.

What interests you most?`;
}
