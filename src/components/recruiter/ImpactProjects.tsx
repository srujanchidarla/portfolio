"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { coverImage, coverLabel } from "@/lib/case-studies";
import { IMPACT_PROJECTS } from "@/lib/recruiter-home";
import ProjectCover from "@/components/work/ProjectCover";

const PROJECT_ORDER = [
  "algochronicle",
  "campfirechai",
  "jobhuntos",
  "neocortex",
  "agriwise",
  "studyglobal",
] as const;

const CURATED_PROJECTS = [...IMPACT_PROJECTS].sort(
  (a, b) => PROJECT_ORDER.indexOf(a.id) - PROJECT_ORDER.indexOf(b.id)
);

type Project = (typeof IMPACT_PROJECTS)[number];

function liveSite(project: Project) {
  return "liveHref" in project ? project.liveHref : undefined;
}

export default function ImpactProjects() {
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
            Open a project for how it was built, the workflow, and what got in the way.
          </p>
        </motion.header>

        <div className="work-grid">
          {CURATED_PROJECTS.map((project, index) => {
            const image = coverImage(project.id);
            return (
              <Link
                key={project.id}
                href={`/work/${project.id}`}
                className={`work-card${index < 2 ? " work-card--feature" : ""}`}
                style={{ "--proj-color": project.color } as CSSProperties}
              >
                <ProjectCover
                  title={project.title}
                  image={image}
                  liveSrc={image ? undefined : liveSite(project)}
                  color={project.color}
                  sizes={
                    index < 2
                      ? "(max-width: 960px) 100vw, 540px"
                      : "(max-width: 960px) 100vw, 260px"
                  }
                />
                <span className="work-card__pill">{coverLabel(project.id)}</span>
                <span className="work-card__shade" aria-hidden="true" />
                <span className="work-card__caption">
                  <span className="work-card__title">{project.title}</span>
                  <span className="work-card__more">See case study</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
