"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index, featured }: ProjectCardProps) {
  const highlights = featured ? project.highlights : project.highlights.slice(0, 2);

  return (
    <motion.article
      className={`project-card${featured ? " project-card--featured" : ""}`}
      style={
        {
          "--card-accent-a": project.gradient[0],
          "--card-accent-b": project.gradient[1],
        } as CSSProperties
      }
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <div className="project-card__accent" aria-hidden="true" />

      <div className="project-card__body">
        <div className="project-card__top">
          <span className="project-card__period">{project.period}</span>
          {project.status && (
            <span
              className={`project-card__status${project.ongoing ? " project-card__status--ongoing" : ""}`}
            >
              {project.status}
            </span>
          )}
        </div>

        {project.association && (
          <p className="project-card__association">{project.association}</p>
        )}

        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__tagline">{project.tagline}</p>

        {featured && (
          <p className="project-card__description">{project.description}</p>
        )}

        <ul className="project-card__highlights">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="project-card__footer">
          <div className="project-card__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-card__tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="project-card__links">
            {project.links.length > 0 ? (
              project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                >
                  {link.label}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              ))
            ) : (
              <span className="project-card__link project-card__link--muted">
                <Code2 size={13} aria-hidden="true" />
                In development
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
