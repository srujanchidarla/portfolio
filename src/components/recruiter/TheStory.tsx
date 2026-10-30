import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { STORY_BEATS } from "@/lib/recruiter-home";

const CARDS = [
  {
    title: "Athletics",
    text: "I play almost every sport — handball, track, volleyball, badminton, basketball, cricket, football, and more. State-level medals taught me discipline, multitasking, and team mentality. Same energy I bring to sprint planning and shipping deadlines.",
    link: { label: "See athlete gallery", href: "#athlete", external: false },
  },
  {
    title: "Always learning",
    text: "I'm constantly exploring — AI/ML through Neocortex, networking through coursework, new frameworks through side projects. 18+ certifications, hackathons, and a curiosity that doesn't switch off when class ends.",
  },
  {
    title: "Neocortex ambition",
    text: "My most ambitious side project: a 15-agent local-first life OS. It's not finished — but it shows I'm willing to take on hard problems, learn unfamiliar stacks, and stay disciplined over months of building.",
    link: { label: "View Neocortex on GitHub", href: "https://github.com/srujanchidarla/neocortex", external: true },
  },
  {
    title: "Why I'm excited",
    text: "I want a team with mentorship, psychological safety to ask questions, and a culture where junior engineers ship real code. I'm not looking for the biggest title — I'm looking for the right place to grow into the engineer I know I can become.",
  },
] as const;

export default function TheStory() {
  return (
    <section id="story" className="ab">
      <div className="ab__glow" aria-hidden="true" />
      <div className="wrap">
        <header className="ab__hero">
          <p className="lap-head__eyebrow hx-in">
            <span className="lap-head__lap">About</span>
            <span className="lap-head__rule" aria-hidden="true" />
            Beyond code
          </p>
          <h1 className="ab__title hx-in" style={{ animationDelay: "0.08s" }}>
            Who I am <em>off the clock</em>
          </h1>
          <p className="ab__lede hx-in" style={{ animationDelay: "0.16s" }}>
            Athlete, learner, builder — production work at Cognizant, products in the wild, and a
            training habit that doesn&apos;t turn off.
          </p>
        </header>

        <ol className="ab__splits">
          {STORY_BEATS.map((beat, i) => (
            <li
              key={beat.year}
              className={i === STORY_BEATS.length - 1 ? "ab__split is-now" : "ab__split"}
              style={{ "--d": `${i * 0.08}s` } as CSSProperties}
              data-reveal
            >
              <span className="ab__split-mark" aria-hidden="true" />
              <span className="ab__split-year">{beat.year}</span>
              <h2 className="ab__split-title">{beat.title}</h2>
              <p className="ab__split-high">{beat.highlight}</p>
              <p className="ab__split-text">{beat.text}</p>
            </li>
          ))}
        </ol>

        <div className="ab__cards">
          {CARDS.map((card, i) => (
            <article
              key={card.title}
              className="ab__card"
              style={{ "--d": `${(i % 2) * 0.08}s` } as CSSProperties}
              data-reveal
              data-spot
            >
              <span className="ab__card-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              {"link" in card ? (
                <a
                  href={card.link.href}
                  className="wk-link"
                  {...(card.link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {card.link.label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
