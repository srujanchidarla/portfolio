import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import BrowserFrame from "@/components/work/BrowserFrame";
import CaseToc from "@/components/work/CaseToc";
import { coverLabel, explorePages, type CaseStudy as CaseStudyContent } from "@/lib/case-studies";
import { PROJECTS } from "@/lib/projects";
import { IMPACT_PROJECTS } from "@/lib/recruiter-home";

type Project = (typeof IMPACT_PROJECTS)[number];

function linksFor(project: Project) {
  const links: { label: string; href: string }[] = [];
  if ("liveHref" in project && project.liveHref) {
    links.push({ label: "Live site", href: project.liveHref });
  }
  if ("href" in project && project.href) {
    links.push({
      label: project.id === "jobhuntos" ? "Chrome Web Store" : "GitHub",
      href: project.href,
    });
  }
  if ("dsaRepoHref" in project && project.dsaRepoHref) {
    links.push({ label: "DSA repo", href: project.dsaRepoHref });
  }
  return links;
}

function statusOf(project: Project) {
  if (project.tag.includes("In progress")) return { label: "In progress", live: false };
  if ("liveHref" in project && project.liveHref) return { label: "Live", live: true };
  return { label: "Shipped", live: false };
}

function SectionHead({ num, title, lede }: { num: string; title: string; lede?: string }) {
  return (
    <header className="cs-sec__head" data-reveal>
      <span className="cs-sec__num">{num}</span>
      <h2>{title}</h2>
      {lede ? <p>{lede}</p> : null}
    </header>
  );
}

export default function CaseStudy({
  project,
  study,
  next,
  index,
  total,
}: {
  project: Project;
  study: CaseStudyContent;
  next: Project;
  index: number;
  total: number;
}) {
  const links = linksFor(project);
  const pages = explorePages(project.id);
  const status = statusOf(project);
  const period = PROJECTS.find((item) => item.id === project.id)?.period;
  const [leadPage, ...restPages] = pages;

  const toc = [
    { id: "overview", label: "Overview" },
    ...(pages.length ? [{ id: "explore", label: "The product, live" }] : []),
    { id: "product", label: "What it does" },
    { id: "process", label: "How I worked" },
    { id: "challenges", label: "Challenges" },
    { id: "shipped", label: "What shipped" },
  ];
  const n = (id: string) => String(toc.findIndex((item) => item.id === id) + 1).padStart(2, "0");

  return (
    <article className="cs" style={{ "--proj-color": project.color } as CSSProperties}>
      <div className="cs-hero">
        <div className="cs-hero__glow" aria-hidden="true" />
        <div className="wrap">
          <div className="cs-hero__top">
            <Link href="/#projects" className="cs-back">
              <ArrowLeft size={16} aria-hidden="true" />
              All work
            </Link>
            <span className="cs-hero__count">
              Project {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <p className="cs-hero__kicker hx-in">
            <span className={`cs-status${status.live ? " is-live" : ""}`}>
              <i aria-hidden="true" />
              {status.label}
            </span>
            {coverLabel(project.id)} · {project.tag.split(" · ").slice(0, 2).join(" · ")}
          </p>
          <h1 className="cs-hero__title hx-in" style={{ animationDelay: "0.08s" }}>
            {project.title}
            {"subtitle" in project && project.subtitle ? <em> {project.subtitle}</em> : null}
          </h1>
          <p className="cs-hero__summary hx-in" style={{ animationDelay: "0.16s" }}>
            {study.summary}
          </p>

          <dl className="cs-facts hx-in" style={{ animationDelay: "0.24s" }}>
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            {period ? (
              <div>
                <dt>Timeline</dt>
                <dd>{period}</dd>
              </div>
            ) : null}
            <div>
              <dt>Focus</dt>
              <dd>{project.lanes.join(" · ")}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.stack.slice(0, 4).join(", ")}</dd>
            </div>
          </dl>

          {links.length ? (
            <div className="cs-links hx-in" style={{ animationDelay: "0.32s" }}>
              {links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={i === 0 ? "btn-primary" : "btn-secondary"}
                >
                  {link.label}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : null}

          <div className="cs-cover hx-in" style={{ animationDelay: "0.4s" }}>
            <BrowserFrame project={project} sizes="(max-width: 1200px) 100vw, 1180px" />
          </div>
        </div>
      </div>

      <div className="wrap cs-body">
        <aside className="cs-body__aside">
          <CaseToc items={toc} />
        </aside>

        <div className="cs-body__main">
          <section id="overview" className="cs-sec">
            <SectionHead num={n("overview")} title="Overview" />
            <p className="cs-lead" data-reveal>
              {study.product}
            </p>
            <div className="cs-split">
              <div className="cs-split__card" data-reveal>
                <p className="cs-split__label">The problem</p>
                <p>{project.problem}</p>
              </div>
              <span className="cs-split__arrow" aria-hidden="true">
                <ArrowRight size={18} />
              </span>
              <div className="cs-split__card cs-split__card--answer" data-reveal>
                <p className="cs-split__label">The approach</p>
                <p>{project.solution}</p>
              </div>
            </div>
          </section>

          {leadPage ? (
            <section id="explore" className="cs-sec">
              <SectionHead
                num={n("explore")}
                title="The product, live"
                lede="The pages worth opening. Each one is the real product — click through."
              />
              <div className="cs-gallery">
                {[leadPage, ...restPages].map((page, i) => (
                  <a
                    key={page.href}
                    href={page.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`cs-shot${i === 0 ? " cs-shot--lead" : ""}`}
                    data-reveal
                    data-spot
                  >
                    <span className="cs-shot__media">
                      <Image
                        src={page.image}
                        alt={`${project.title}: ${page.title}`}
                        fill
                        sizes={i === 0 ? "(max-width: 900px) 100vw, 820px" : "(max-width: 720px) 100vw, 400px"}
                      />
                    </span>
                    <span className="cs-shot__body">
                      <span className="cs-shot__num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="cs-shot__copy">
                        <strong>{page.title}</strong>
                        <span>{page.note}</span>
                      </span>
                      <ArrowUpRight size={16} aria-hidden="true" className="cs-shot__go" />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          <section id="product" className="cs-sec">
            <SectionHead num={n("product")} title="What it does" />
            <div className="cs-aspects">
              {study.aspects.map((aspect, i) => (
                <div key={aspect.title} className="cs-aspect" data-reveal data-spot>
                  <span className="cs-aspect__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{aspect.title}</h3>
                  <p>{aspect.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="process" className="cs-sec">
            <SectionHead num={n("process")} title="How I worked" />
            <ol className="cs-steps">
              {study.workflow.map((step, i) => (
                <li key={step} data-reveal>
                  <span className="cs-steps__dot" aria-hidden="true">
                    {i + 1}
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="challenges" className="cs-sec">
            <SectionHead num={n("challenges")} title="Challenges" />
            <div className="cs-challenges">
              {study.challenges.map((item, i) => (
                <div key={item.title} className="cs-challenge" data-reveal>
                  <span className="cs-challenge__tag">Challenge {String(i + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="shipped" className="cs-sec">
            <SectionHead num={n("shipped")} title="What shipped" />
            <div className="cs-result" data-reveal>
              <p className="cs-result__big">{project.result}</p>
              <p className="cs-result__detail">{project.resultDetail}</p>
              <ul className="wk-stack">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <blockquote className="cs-learned" data-reveal>
              <p className="cs-learned__label">What I learned</p>
              <p>{project.learned}</p>
            </blockquote>
          </section>
        </div>
      </div>

      <div className="wrap">
        <Link
          href={`/work/${next.id}`}
          className="cs-next"
          style={{ "--proj-color": next.color } as CSSProperties}
          data-reveal
          data-spot
        >
          <span className="cs-next__copy">
            <span className="cs-next__label">Next project</span>
            <span className="cs-next__title">{next.title}</span>
            <span className="cs-next__line">{next.journey}</span>
            <span className="cs-next__go">
              Read the case study
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </span>
          <span className="cs-next__media">
            <BrowserFrame project={next} sizes="(max-width: 900px) 100vw, 520px" />
          </span>
        </Link>
      </div>
    </article>
  );
}
