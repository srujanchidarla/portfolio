"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

function getBestLink(project: Project): string | undefined {
  const p = project as unknown as { liveHref?: string; href?: string };
  return p.liveHref ?? p.href;
}

/** A public product homepage. Repo and store links stay as buttons, not previews. */
function getLiveSite(project: Project): string | undefined {
  if ("liveHref" in project && typeof project.liveHref === "string") return project.liveHref;
  return undefined;
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

const LIVE_WIDTH = 1280;

function useInView(rootMargin = "240px") {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setSeen(true);
        observer.disconnect();
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, seen]);

  return { ref, seen };
}

/** Scaled, non-interactive snapshot of a live homepage. Loads only once it nears the viewport. */
function LiveHomepage({ src, title }: { src: string; title: string }) {
  const { ref, seen } = useInView();
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  const scale = box.w > 0 ? box.w / LIVE_WIDTH : 0;
  const frameHeight = scale > 0 ? Math.max(1, Math.ceil(box.h / scale)) : 0;

  return (
    <div ref={ref} className={`rh-projects__live${ready ? " is-ready" : ""}`}>
      <div className="rh-projects__live-skeleton" aria-hidden="true" />
      {seen && scale > 0 ? (
        <iframe
          title={`${title} homepage`}
          src={src}
          className="rh-projects__live-frame"
          style={{ width: LIVE_WIDTH, height: frameHeight, transform: `scale(${scale})` }}
          sandbox="allow-scripts allow-same-origin allow-forms"
          referrerPolicy="origin"
          tabIndex={-1}
          onLoad={() => setReady(true)}
        />
      ) : null}
    </div>
  );
}

function PreviewFallback({ title, tag }: { title: string; tag?: string }) {
  return (
    <div className="rh-projects__preview-fallback" aria-hidden="true">
      <span className="rh-projects__preview-monogram">{title.charAt(0)}</span>
      <span className="rh-projects__preview-fallback-name">{title}</span>
      {tag ? <span className="rh-projects__preview-fallback-tag">{tag}</span> : null}
    </div>
  );
}

function ProjectPreview({
  title,
  accent,
  href,
  liveSrc,
  tag,
}: {
  title: string;
  accent: string;
  href?: string;
  liveSrc?: string;
  tag?: string;
}) {
  const domain = useMemo(() => getDomain(liveSrc ?? href), [liveSrc, href]);

  return (
    <div
      className="rh-projects__preview"
      style={{ "--proj-color": accent } as React.CSSProperties}
    >
      <div className="rh-projects__preview-bar" aria-hidden="true">
        <span className="rh-projects__preview-dots">
          <span />
          <span />
          <span />
        </span>
        <span className="rh-projects__preview-domain">
          {liveSrc ? <span className="rh-projects__preview-live">Live</span> : null}
          {domain ?? title.toLowerCase()}
        </span>
        <span className="rh-projects__preview-icon">
          <ExternalLink size={14} aria-hidden="true" />
        </span>
      </div>

      <div className={`rh-projects__preview-viewport${liveSrc ? "" : " is-placeholder"}`}>
        {liveSrc ? <LiveHomepage src={liveSrc} title={title} /> : <PreviewFallback title={title} tag={tag} />}
      </div>

      {href ? (
        <a
          className="rh-projects__preview-hit"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title}`}
        />
      ) : null}
    </div>
  );
}

function ProjectCaseStudy({ project, titleId }: { project: Project; titleId?: string }) {
  const href = "href" in project ? project.href : undefined;
  const liveHref = "liveHref" in project ? project.liveHref : undefined;
  const liveSrc = getLiveSite(project);
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
          liveSrc={liveSrc}
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
  lead = false,
  onOpen,
}: {
  project: Project;
  index: number;
  lead?: boolean;
  onOpen: () => void;
}) {
  const liveSrc = getLiveSite(project);

  return (
    <motion.button
      type="button"
      className={`rh-projects__tile${lead ? " rh-projects__tile--lead" : ""}`}
      style={{ "--proj-color": project.color } as React.CSSProperties}
      onClick={onOpen}
      custom={index}
      variants={tileVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className="rh-projects__tile-media">
        {liveSrc ? (
          <LiveHomepage src={liveSrc} title={project.title} />
        ) : (
          <div className="rh-projects__tile-fallback" aria-hidden="true">
            <span>{project.title.charAt(0)}</span>
          </div>
        )}
        <span className="rh-projects__tile-tag">{project.tag}</span>
      </div>
      <div className="rh-projects__tile-body">
        {lead ? <span className="rh-projects__tile-kicker">Featured</span> : null}
        <h3>
          {project.title}
          {"subtitle" in project && project.subtitle ? (
            <span className="rh-projects__subtitle"> — {project.subtitle}</span>
          ) : null}
        </h3>
        <p>{lead ? project.resultDetail : project.journey}</p>
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
  const activeProject = CURATED_PROJECTS.find((p) => p.id === activeId) ?? null;

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
            AlgoChronicle is up front. The other six sit in an even grid — open any card for
            the case study.
          </p>
        </motion.header>

        <div className="rh-projects__bento">
          {CURATED_PROJECTS.map((p, i) => (
            <ProjectTile
              key={p.id}
              project={p}
              index={i}
              lead={i === 0}
              onOpen={() => setActiveId(p.id)}
            />
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
