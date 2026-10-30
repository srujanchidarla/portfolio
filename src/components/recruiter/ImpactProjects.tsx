import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { coverLabel, getCaseStudy } from "@/lib/case-studies";
import { CURATED_PROJECTS, IMPACT_PROJECTS } from "@/lib/recruiter-home";
import BrowserFrame from "@/components/work/BrowserFrame";
import LapHeader from "@/components/fx/LapHeader";

type Project = (typeof IMPACT_PROJECTS)[number];

function liveSite(project: Project) {
  return "liveHref" in project ? project.liveHref : undefined;
}

function num(index: number) {
  return String(index + 1).padStart(2, "0");
}

function Feature({ project, index }: { project: Project; index: number }) {
  const study = getCaseStudy(project.id);
  const live = liveSite(project);

  return (
    <article
      className={`wk-feature${index % 2 ? " wk-feature--flip" : ""}`}
      style={{ "--proj-color": project.color } as CSSProperties}
      data-reveal
    >
      <Link
        href={`/work/${project.id}`}
        className="wk-feature__media"
        aria-label={`${project.title} case study`}
        data-spot
      >
        <BrowserFrame project={project} sizes="(max-width: 960px) 100vw, 680px" />
      </Link>

      <div className="wk-feature__body">
        <p className="wk-feature__index">
          <span>{num(index)}</span>
          {coverLabel(project.id)}
          {live ? <em className="wk-live">Live</em> : null}
        </p>
        <h3 className="wk-feature__title">{project.title}</h3>
        <p className="wk-feature__summary">{study?.summary ?? project.solution}</p>

        <dl className="wk-feature__facts">
          <div>
            <dt>Role</dt>
            <dd>{project.role.split(" · ")[0]}</dd>
          </div>
          <div>
            <dt>Shipped</dt>
            <dd>{project.resultDetail}</dd>
          </div>
        </dl>

        <ul className="wk-stack" aria-label="Stack">
          {project.stack.slice(0, 5).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="wk-feature__actions">
          <Link href={`/work/${project.id}`} className="btn-primary">
            Read the case study
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          {live ? (
            <a href={live} target="_blank" rel="noopener noreferrer" className="wk-link">
              Visit live
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function Tile({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/work/${project.id}`}
      className="wk-tile"
      style={{ "--proj-color": project.color } as CSSProperties}
      data-reveal
      data-spot
    >
      <BrowserFrame project={project} sizes="(max-width: 720px) 100vw, 560px" />
      <span className="wk-tile__body">
        <span className="wk-tile__meta">
          <span className="wk-tile__num">{num(index)}</span>
          {coverLabel(project.id)}
          {liveSite(project) ? <em className="wk-live">Live</em> : null}
        </span>
        <span className="wk-tile__title">
          {project.title}
          {"subtitle" in project && project.subtitle ? <small> {project.subtitle}</small> : null}
        </span>
        <span className="wk-tile__line">{project.journey}</span>
        <span className="wk-tile__go" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
      </span>
    </Link>
  );
}

export default function ImpactProjects() {
  const features = CURATED_PROJECTS.slice(0, 2);
  const rest = CURATED_PROJECTS.slice(2);

  return (
    <section id="projects" className="lap wk">
      <div className="wrap">
        <LapHeader
          lap="01"
          eyebrow="Selected work"
          title={
            <>
              Products with <em>real decisions</em> behind them
            </>
          }
          lede="Six products, from the data model to the deploy. Open one for how it was built, the workflow, and what got in the way."
        />

        <div className="wk-features">
          {features.map((project, index) => (
            <Feature key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="wk-grid">
          {rest.map((project, index) => (
            <Tile key={project.id} project={project} index={index + features.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
