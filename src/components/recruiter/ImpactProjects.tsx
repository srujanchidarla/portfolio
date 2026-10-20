"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { IMPACT_PROJECTS } from "@/lib/recruiter-home";

const PROJECT_ORDER = [
  "algochronicle",
  "campfirechai",
  "jobhuntos",
  "neocortex",
  "agriwise",
  "studyglobal",
  "fitconnect",
] as const;

const CURATED_PROJECTS = [...IMPACT_PROJECTS].sort(
  (a, b) => PROJECT_ORDER.indexOf(a.id) - PROJECT_ORDER.indexOf(b.id)
);

type Project = (typeof IMPACT_PROJECTS)[number];

function getPreviewUrl(project: Project): string | undefined {
  const p = project as unknown as { previewImage?: string };
  return p.previewImage;
}

function getBestLink(project: Project): string | undefined {
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

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function ProjectPreview({
  title,
  accent,
  href,
  previewImage,
  tag,
}: {
  title: string;
  accent: string;
  href?: string;
  previewImage?: string;
  tag?: string;
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
            sizes="(max-width: 1024px) 100vw, 860px"
            onError={() => setHasImage(false)}
          />
        ) : (
          <div className="rh-projects__preview-fallback" aria-hidden="true">
            <span className="rh-projects__preview-monogram">{title.charAt(0)}</span>
            <span className="rh-projects__preview-fallback-name">{title}</span>
            {tag ? <span className="rh-projects__preview-fallback-tag">{tag}</span> : null}
          </div>
        )}
      </div>
    </a>
  );
}

function ProjectCaseStudy({ project, titleId }: { project: Project; titleId?: string }) {
  const href = "href" in project ? project.href : undefined;
  const liveHref = "liveHref" in project ? project.liveHref : undefined;
  const previewImage = getPreviewUrl(project);
  const bestLink = getBestLink(project);

  return (
    <>
      <div className="rh-projects__card-header">
        <div className="rh-projects__card-heading">
          <span className="rh-projects__tag">{project.tag}</span>
          <h3 id={titleId}>
            {project.title}
            {"subtitle" in project && project.subtitle ? (
              <span className="rh-projects__subtitle"> — {project.subtitle}</span>
            ) : null}
          </h3>
          <p className="rh-projects__journey">{project.journey}</p>
          <p className="rh-projects__role">
            <strong>My role</strong>
            <span>{project.role}</span>
          </p>
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
        />
        {project.resultDetail ? (
          <p className="rh-projects__preview-caption">{project.resultDetail}</p>
        ) : null}
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
              Live demo
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
    </>
  );
}

function ProjectTile({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const previewImage = getPreviewUrl(project);
  const [hasImage, setHasImage] = useState(true);
  const showImage = Boolean(previewImage) && hasImage;

  return (
    <motion.button
      type="button"
      className="rh-projects__tile"
      style={{ "--proj-color": project.color } as React.CSSProperties}
      onClick={onOpen}
      custom={index}
      variants={tileVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className="rh-projects__tile-media">
        {showImage ? (
          <Image
            src={previewImage as string}
            alt={`${project.title} preview`}
            fill
            className="rh-projects__tile-img"
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 380px"
            onError={() => setHasImage(false)}
          />
        ) : (
          <div className="rh-projects__tile-fallback" aria-hidden="true">
            <span>{project.title.charAt(0)}</span>
          </div>
        )}
        <span className="rh-projects__tile-tag">{project.tag}</span>
      </div>
      <div className="rh-projects__tile-body">
        <h3>{project.title}</h3>
        <p>{project.journey}</p>
        <div className="rh-projects__tile-meta">
          <span className="rh-projects__tile-result">{project.result}</span>
          <span className="rh-projects__tile-cta">
            Case study
            <ArrowUpRight size={13} aria-hidden="true" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  const titleId = `project-modal-title-${project.id}`;

  return createPortal(
    <motion.div
      className="proj-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        className="proj-modal"
        style={{ "--proj-color": project.color } as React.CSSProperties}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="proj-modal__close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={18} />
        </button>
        <div className="proj-modal__scroll">
          <ProjectCaseStudy project={project} titleId={titleId} />
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function ImpactProjects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const featured = CURATED_PROJECTS[0];
  const rest = CURATED_PROJECTS.slice(1);
  const activeProject = rest.find((p) => p.id === activeId) ?? null;

  return (
    <section id="projects" className="rh-projects">
      <div className="wrap">
        <motion.header
          className="rh-section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="section-eyebrow">Selected work</p>
          <h2 className="section-title">
            Products with <span className="gradient-text">real decisions behind them</span>
          </h2>
          <p className="section-subtitle">
            Seven projects — AlgoChronicle up close below, six more a click away for the
            full case study.
          </p>
        </motion.header>

        <motion.article
          className="rh-projects__card rh-projects__card--featured"
          style={{ "--proj-color": featured.color } as React.CSSProperties}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35 }}
        >
          <span className="rh-projects__featured-label">Featured</span>
          <ProjectCaseStudy project={featured} />
        </motion.article>

        <h3 className="rh-projects__more-heading">More projects</h3>
        <div className="rh-projects__tiles">
          {rest.map((p, i) => (
            <ProjectTile key={p.id} project={p} index={i} onOpen={() => setActiveId(p.id)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject ? (
          <ProjectModal project={activeProject} onClose={() => setActiveId(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
