import type { CSSProperties } from "react";
import {
  siDocker,
  siExpress,
  siFastapi,
  siFirebase,
  siGithubactions,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siSocketdotio,
  siSpringboot,
  siSupabase,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import { SKILL_CLUSTERS } from "@/lib/recruiter-home";
import LapHeader from "@/components/fx/LapHeader";
import ToolChips, { type ToolInfo } from "@/components/recruiter/ToolChips";

/** Each tool with a one-line definition and where I actually used it. */
const TOOLS: readonly ToolInfo[] = [
  {
    icon: siOpenjdk,
    kind: "Language · JVM",
    what: "Java, the statically typed language behind most enterprise backends; OpenJDK is its open-source runtime.",
    used: "Cognizant — services behind 2M+ requests a day.",
  },
  {
    icon: siSpringboot,
    kind: "Java framework",
    what: "Opinionated Java framework for production-ready web services and microservices with minimal setup.",
    used: "Cognizant — enterprise microservices at 99.9% uptime.",
  },
  {
    icon: siNodedotjs,
    kind: "JavaScript runtime",
    what: "Runs JavaScript on the server with non-blocking I/O, well suited to APIs and real-time apps.",
    used: "Wildmate and JobHuntOS APIs; WalletGyde platform.",
  },
  {
    icon: siExpress,
    kind: "Node.js web framework",
    what: "Minimal Node.js framework for routing, middleware, and building REST APIs.",
    used: "Wildmate — the Express 5 + MongoDB API.",
  },
  {
    icon: siPython,
    kind: "Language",
    what: "General-purpose language known for readability, used for backends, automation, data, and AI.",
    used: "Neocortex — the agent backend.",
  },
  {
    icon: siFastapi,
    kind: "Python web framework",
    what: "Fast, type-hinted Python framework for APIs, with async support and automatic OpenAPI docs.",
    used: "Neocortex — 15 agents behind one FastAPI backend.",
  },
  {
    icon: siTypescript,
    kind: "Language",
    what: "JavaScript with static types, which catches bugs at compile time and makes large codebases easier to change.",
    used: "AlgoChronicle (74k+ lines), Study Chapter, and this portfolio.",
  },
  {
    icon: siReact,
    kind: "UI library",
    what: "Component-based library for building interactive user interfaces.",
    used: "Wildmate (React 19) and every Next.js product here.",
  },
  {
    icon: siNextdotjs,
    kind: "React framework",
    what: "React framework with routing, server rendering, static generation, and API routes built in.",
    used: "AlgoChronicle, AgriWise, Study Chapter, Neocortex's command center, WalletGyde.",
  },
  {
    icon: siTailwindcss,
    kind: "CSS framework",
    what: "Utility-first CSS: style directly in markup with small composable classes.",
    used: "AlgoChronicle, AgriWise, and WalletGyde.",
  },
  {
    icon: siPostgresql,
    kind: "Relational database",
    what: "Open-source SQL database known for reliability, strong consistency, and rich querying.",
    used: "WalletGyde, through Supabase.",
  },
  {
    icon: siMongodb,
    kind: "Document database",
    what: "NoSQL database that stores flexible JSON-like documents instead of fixed tables.",
    used: "Wildmate — trips, crews, and chat.",
  },
  {
    icon: siFirebase,
    kind: "Backend platform",
    what: "Google's app platform: auth, the Firestore realtime database, hosting, and messaging.",
    used: "AlgoChronicle — accounts, synced progress, and the solve log.",
  },
  {
    icon: siSupabase,
    kind: "Backend platform",
    what: "Open-source Firebase alternative built on PostgreSQL, with auth, storage, and instant APIs.",
    used: "WalletGyde — the Next.js + Supabase platform.",
  },
  {
    icon: siSocketdotio,
    kind: "Real-time library",
    what: "Two-way, event-based communication between browser and server over WebSockets.",
    used: "Wildmate — live trip chat.",
  },
  {
    icon: siDocker,
    kind: "Containers",
    what: "Packages an app and its dependencies into a container that runs the same everywhere.",
    used: "Cognizant — containerized services.",
  },
  {
    icon: siGithubactions,
    kind: "CI/CD",
    what: "Automation built into GitHub: run tests, builds, and deploys on every push.",
    used: "AlgoChronicle — the push-to-publish pipeline.",
  },
].map(({ icon, ...info }) => ({ slug: icon.slug, title: icon.title, hex: icon.hex, path: icon.path, ...info }));

const SEGMENTS = 5;

export default function SkillsImpact() {
  return (
    <section id="skills" className="lap stk">
      <div className="wrap">
        <LapHeader
          lap="05"
          eyebrow="Technical foundation"
          title={
            <>
              Tools I <em>actually use</em>
            </>
          }
          lede="Honest levels, each tied to where I used it — ready to deepen in production, not pretending expertise I haven't earned."
        />

        <ToolChips tools={TOOLS} />

        <div className="stk__bento">
          {SKILL_CLUSTERS.map((cluster, ci) => (
            <article
              key={cluster.id}
              className="stk__cluster"
              style={{ "--d": `${ci * 0.06}s` } as CSSProperties}
              data-reveal
              data-spot
            >
              <header>
                <span className="stk__cluster-num">{String(ci + 1).padStart(2, "0")}</span>
                <h3>{cluster.label}</h3>
              </header>
              <ul>
                {cluster.skills.map((skill) => {
                  const filled = Math.round(skill.level / (100 / SEGMENTS));
                  return (
                    <li key={skill.name} className="stk__skill">
                      <div className="stk__skill-top">
                        <span className="stk__skill-name">{skill.name}</span>
                        <span className={`stk__strength is-${skill.strength.toLowerCase()}`}>
                          {skill.strength}
                        </span>
                      </div>
                      <span
                        className="stk__meter"
                        role="img"
                        aria-label={`${skill.strength}: ${filled} of ${SEGMENTS}`}
                      >
                        {Array.from({ length: SEGMENTS }, (_, i) => (
                          <i key={i} className={i < filled ? "is-on" : undefined} />
                        ))}
                      </span>
                      <span className="stk__proof">
                        {skill.years} · {skill.proof}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
