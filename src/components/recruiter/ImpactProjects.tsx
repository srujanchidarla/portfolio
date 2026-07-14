"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { IMPACT_PROJECTS } from "@/lib/recruiter-home";

function getPreviewUrl(project: (typeof IMPACT_PROJECTS)[number]): string | undefined {
  const p = project as unknown as { previewImage?: string };
  return p.previewImage;
}

function getBestLink(project: (typeof IMPACT_PROJECTS)[number]): string | undefined {
  const p = project as unknown as { liveHref?: string; href?: string };
  return p.liveHref ?? p.href;
}

function getDomain(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function ProjectPreview({
  title,
  accent,
  href,
  previewImage,
  tag,
  result,
  resultDetail,
}: {
  title: string;
  accent: string;
  href?: string;
  previewImage?: string;
  tag?: string;
  result?: string;
  resultDetail?: string;
}) {
  const [hasImage, setHasImage] = useState(true);
  const domain = useMemo(() => getDomain(href), [href]);
  const showImage = Boolean(previewImage) && hasImage;

  return (
    <a
      className="rh-projects__preview"
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      aria-label={href ? `Open ${title}` : undefined}
      style={{ "--proj-color": accent } as React.CSSProperties}
    >
      <div className="rh-projects__preview-bar" aria-hidden="true">
        <span className="rh-projects__preview-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="rh-projects__preview-domain">{domain ?? title.toLowerCase()}</span>
        <span className="rh-projects__preview-icon">
          <ExternalLink size={14} aria-hidden="true" />
        </span>
      </div>

      <div
        className={`rh-projects__preview-viewport${showImage ? "" : " is-placeholder"}`}
        style={{ position: "relative" }}
      >
        {showImage ? (
          <Image
            src={previewImage as string}
            alt={`${title} homepage preview`}
            fill
            className="rh-projects__preview-img"
            sizes="(max-width: 1024px) 100vw, 720px"
            onError={() => setHasImage(false)}
          />
        ) : (
          <div className="rh-projects__preview-fallback" aria-hidden="true">
            <span className="rh-projects__preview-monogram">{title.charAt(0)}</span>
            <span className="rh-projects__preview-fallback-name">{title}</span>
            {tag ? <span className="rh-projects__preview-fallback-tag">{tag}</span> : null}
          </div>
        )}

        {showImage ? (
          <div className="rh-projects__preview-overlay" aria-hidden="true">
            <div className="rh-projects__preview-overlay-title">{title}</div>
            {result ? (
              <div className="rh-projects__preview-overlay-result">{result}</div>
            ) : null}
            {resultDetail ? (
              <div className="rh-projects__preview-overlay-sub">{resultDetail}</div>
            ) : null}
          </div>
        ) : null}
      </div>
    </a>
  );
}

export default function ImpactProjects({ limit = IMPACT_PROJECTS.length }: { limit?: number }) {
  const hasMore = IMPACT_PROJECTS.length > limit;
  const [showAll, setShowAll] = useState(!hasMore);
  const visibleProjects = showAll ? IMPACT_PROJECTS : IMPACT_PROJECTS.slice(0, limit);
  const [active, setActive] = useState(Math.min(1, visibleProjects.length - 1));
  const project = visibleProjects[active] ?? visibleProjects[0];

  useEffect(() => {
    if (active >= visibleProjects.length) {
      setActive(0);
    }
  }, [active, visibleProjects.length]);
  const href = "href" in project ? project.href : undefined;
  const liveHref = "liveHref" in project ? project.liveHref : undefined;
  const previewImage = getPreviewUrl(project);
  const bestLink = getBestLink(project);

  return (
    <section id="projects" className="rh-projects">
      <div className="wrap">
        <motion.header
          className="rh-section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="section-eyebrow">Learning by building</p>
          <h2 className="section-title">
            Projects that <span className="gradient-text">taught me</span>
          </h2>
          <p className="section-subtitle">
            From my first full-stack ship to my most ambitious system — each project came with a
            lesson I carry forward.
          </p>
        </motion.header>

        <div className="rh-projects__nav" role="tablist" aria-label="Projects">
          {visibleProjects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={`rh-projects__tab${active === i ? " is-active" : ""}`}
              onClick={() => setActive(i)}
              style={{ "--proj-color": p.color } as React.CSSProperties}
            >
              <span className="rh-projects__tab-dot" aria-hidden="true" />
              <span className="rh-projects__tab-name">{p.title}</span>
            </button>
          ))}
        </div>

        <motion.article
          key={project.id}
          role="tabpanel"
          className="rh-projects__card"
          style={{ "--proj-color": project.color } as React.CSSProperties}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="rh-projects__card-header">
            <div className="rh-projects__card-heading">
              <span className="rh-projects__tag">{project.tag}</span>
              <h3>
                {project.title}
                {"subtitle" in project && project.subtitle ? (
                  <span className="rh-projects__subtitle"> — {project.subtitle}</span>
                ) : null}
              </h3>
              <p className="rh-projects__journey">{project.journey}</p>
            </div>
            <div className="rh-projects__result-badge">{project.result}</div>
          </div>

          <div className="rh-projects__preview-wrap">
            <ProjectPreview
              title={project.title}
              accent={project.color}
              href={bestLink}
              previewImage={previewImage}
              tag={project.tag}
              result={project.result}
              resultDetail={project.resultDetail}
            />
          </div>

          <div className="rh-projects__grid">
            <div className="rh-projects__block">
              <h4>The problem</h4>
              <p>{project.problem}</p>
            </div>
            <div className="rh-projects__block">
              <h4>What I built</h4>
              <p>{project.solution}</p>
            </div>
            <div className="rh-projects__block rh-projects__block--learned">
              <h4>What I learned</h4>
              <p>{project.learned}</p>
            </div>
          </div>

          <div className="rh-projects__footer">
            <div className="rh-projects__stack">
              {project.stack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="rh-projects__links">
              {liveHref && (
                <a
                  href={liveHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rh-projects__repo-link rh-projects__repo-link--live"
                >
                  {project.id === "jobhuntos" ? "Live demo" : "Live demo"}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rh-projects__repo-link"
                >
                  {project.id === "jobhuntos" ? "Chrome Web Store" : "GitHub"}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
              {"demoVideo" in project && project.demoVideo ? (
                <a
                  href={project.demoVideo as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rh-projects__repo-link rh-projects__repo-link--video"
                >
                  Demo video
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </div>
        </motion.article>

        {hasMore && !showAll ? (
          <div className="rh-projects__more-wrap">
            <button
              type="button"
              className="btn-secondary rh-projects__more-btn"
              onClick={() => {
                setShowAll(true);
                setActive(limit);
              }}
            >
              View {IMPACT_PROJECTS.length - limit} more projects
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
