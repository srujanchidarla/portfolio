import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ProjectCover from "@/components/work/ProjectCover";
import { coverImage, explorePages, type CaseStudy as CaseStudyContent } from "@/lib/case-studies";
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

export default function CaseStudy({
  project,
  study,
  others,
}: {
  project: Project;
  study: CaseStudyContent;
  others: readonly Project[];
}) {
  const image = coverImage(project.id);
  const liveSrc = "liveHref" in project ? project.liveHref : undefined;
  const links = linksFor(project);
  const pages = explorePages(project.id);

  return (
    <article className="case">
      <Link href="/#projects" className="sd-article__back">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to work
      </Link>

      <header className="case__header">
        <p className="section-eyebrow">{project.tag}</p>
        <h1 className="case__title">
          {project.title}
          {"subtitle" in project && project.subtitle ? (
            <span> {project.subtitle}</span>
          ) : null}
        </h1>
        <p className="case__summary">{study.summary}</p>
        <p className="case__role">{project.role}</p>
        {links.length ? (
          <div className="case__links">
            {links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <div className="case__hero" style={{ "--proj-color": project.color } as CSSProperties}>
        <ProjectCover
          title={project.title}
          image={image}
          liveSrc={image ? undefined : liveSrc}
          color={project.color}
          sizes="(max-width: 960px) 100vw, 960px"
        />
      </div>

      {pages.length ? (
        <section className="case__section">
          <h2>Explore the product</h2>
          <p>The pages worth opening. Each one is the live product.</p>
          <div className="case__shots">
            {pages.map((page) => (
              <a
                key={page.href}
                href={page.href}
                target="_blank"
                rel="noopener noreferrer"
                className="case__shot"
              >
                <span className="case__shot-media">
                  <Image src={page.image} alt="" fill sizes="(max-width: 720px) 100vw, 460px" />
                </span>
                <span className="case__shot-body">
                  <strong>{page.title}</strong>
                  <span>{page.note}</span>
                  <em>
                    Open page
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </em>
                </span>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className="case__section">
        <h2>The product</h2>
        <p>{study.product}</p>
        <div className="case__aspects">
          {study.aspects.map((aspect) => (
            <div key={aspect.title}>
              <h3>{aspect.title}</h3>
              <p>{aspect.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="case__section">
        <h2>How I worked</h2>
        <ol className="case__steps">
          {study.workflow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="case__section">
        <h2>Challenges</h2>
        <div className="case__challenges">
          {study.challenges.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="case__section">
        <h2>What shipped</h2>
        <p className="case__result">{project.result}</p>
        <p>{project.resultDetail}</p>
        <ul className="case__stack">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {others.length ? (
        <nav className="case__more" aria-label="More projects">
          <p>More work</p>
          <div>
            {others.map((item) => (
              <Link key={item.id} href={`/work/${item.id}`}>
                {item.title}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </article>
  );
}
