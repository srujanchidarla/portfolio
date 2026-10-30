import type { CSSProperties, ReactNode } from "react";
import ProjectCover from "@/components/work/ProjectCover";
import AgentConstellation from "@/components/work/AgentConstellation";
import { coverImage } from "@/lib/case-studies";
import type { IMPACT_PROJECTS } from "@/lib/recruiter-home";

type Project = (typeof IMPACT_PROJECTS)[number];

export function projectHost(project: Project) {
  const href =
    ("liveHref" in project && project.liveHref) || ("href" in project && project.href) || "";
  if (!href) return project.title.toLowerCase();
  const url = new URL(href);
  const host = url.host.replace(/^www\./, "");
  return url.pathname.length > 1 && host === "github.com" ? `${host}${url.pathname}` : host;
}

/** A product screenshot inside minimal browser chrome. */
export default function BrowserFrame({
  project,
  sizes,
  image,
  host,
  className = "",
  children,
}: {
  project: Project;
  sizes: string;
  image?: string;
  host?: string;
  className?: string;
  children?: ReactNode;
}) {
  const src = image ?? coverImage(project.id);
  const live = "liveHref" in project ? project.liveHref : undefined;

  return (
    <div
      className={`bframe ${className}`.trim()}
      style={{ "--proj-color": project.color } as CSSProperties}
    >
      <div className="bframe__chrome" aria-hidden="true">
        <span className="bframe__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="bframe__url">{host ?? projectHost(project)}</span>
      </div>
      <div className="bframe__view">
        {src || live ? (
          <ProjectCover
            title={project.title}
            image={src}
            liveSrc={src ? undefined : live}
            color={project.color}
            sizes={sizes}
          />
        ) : (
          <AgentConstellation />
        )}
      </div>
      {children}
    </div>
  );
}
