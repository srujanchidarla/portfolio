import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { coverLabel, getCaseStudy } from "@/lib/case-studies";
import { CURATED_PROJECTS, IMPACT_PROJECTS, SHOWCASE_METRICS } from "@/lib/recruiter-home";
import BrowserFrame from "@/components/work/BrowserFrame";
import ProjectGlyph from "@/components/work/ProjectGlyph";
import ProjectShowcase from "@/components/work/ProjectShowcase";
import LapHeader from "@/components/fx/LapHeader";

type Project = (typeof IMPACT_PROJECTS)[number];

function liveSite(project: Project) {
  return "liveHref" in project ? project.liveHref : undefined;
}

function num(index: number) {
  return String(index + 1).padStart(2, "0");
}

/** One project on the pinned showcase stage. */
function Slide({ project, index, total }: { project: Project; index: number; total: number }) {
  const study = getCaseStudy(project.id);
  const live = liveSite(project);
  const metrics = SHOWCASE_METRICS[project.id] ?? [];

  return (
    <article
      className="ps-slide"
      style={{ "--proj-color": project.color, "--i": index } as CSSProperties}
      aria-label={`${project.title}, project ${index + 1} of ${total}`}
    >
      <span className="ps-slide__ghost" aria-hidden="true">
        {num(index)}
      </span>

      <div className="ps-slide__copy">
        <p className="wk-feature__index">
          <span>{num(index)}</span>
          {coverLabel(project.id)}
          {live ? <em className="wk-live">Live</em> : null}
        </p>
        <h3 className="ps-slide__title">{project.title}</h3>
        <p className="ps-slide__summary">{study?.summary ?? project.solution}</p>

        {metrics.length ? (
          <dl className="ps-slide__metrics">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

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

      <Link
        href={`/work/${project.id}`}
        className="ps-slide__media"
        aria-label={`${project.title} case study`}
        tabIndex={-1}
      >
        <span className="ps-slide__float">
          <BrowserFrame project={project} sizes="(max-width: 960px) 100vw, 720px" />
          <ProjectGlyph id={project.id} color={project.color} />
        </span>
      </Link>
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
      <span className="wk-tile__media">
        <BrowserFrame project={project} sizes="(max-width: 720px) 100vw, 560px" />
        <ProjectGlyph id={project.id} color={project.color} />
      </span>
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

const SHOWCASE_COUNT = 4;

export default function ImpactProjects() {
  const lead = CURATED_PROJECTS.slice(0, SHOWCASE_COUNT);
  const rest = CURATED_PROJECTS.slice(SHOWCASE_COUNT);

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
          lede="Six products, from the data model to the deploy. Keep scrolling and each one takes the stage; open any for how it was built and what got in the way."
        />
      </div>

      <ProjectShowcase items={lead.map(({ id, title, color }) => ({ id, title, color }))}>
        {lead.map((project, index) => (
          <Slide key={project.id} project={project} index={index} total={lead.length} />
        ))}
      </ProjectShowcase>

      <div className="wrap">
        <div className="wk-grid">
          {rest.map((project, index) => (
            <Tile key={project.id} project={project} index={index + lead.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
