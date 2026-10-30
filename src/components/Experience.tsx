import { GraduationCap } from "lucide-react";
import { EDUCATION, EXPERIENCES } from "@/lib/experience";
import ExperienceCard from "./experience/ExperienceCard";
import RelayBaton from "./experience/RelayBaton";
import LapHeader from "@/components/fx/LapHeader";

function gpa(detail: string) {
  const [first, ...rest] = detail.split(" · ");
  const match = first.match(/GPA\s+([\d.]+)\/([\d.]+)/);
  return match ? { value: match[1], scale: match[2], note: rest.join(" · ") } : { value: "", scale: "", note: detail };
}

export default function Experience() {
  return (
    <section id="experience" className="lap xps">
      <div className="wrap">
        <LapHeader
          lap="03"
          eyebrow="Work history"
          title={
            <>
              Experience that <em>grounds the degree</em>
            </>
          }
          lede="Production engineering at Cognizant, then a fintech internship during my MS — the work that sits behind the degree."
        />

        <div className="xps__relay">
          <RelayBaton />
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} data-reveal>
              <ExperienceCard exp={exp} />
            </div>
          ))}
        </div>

        <div id="education" className="edu">
          <p className="edu__label">
            <GraduationCap size={16} aria-hidden="true" />
            Education
          </p>
          <ul className="edu__grid">
            {EDUCATION.map((ed) => {
              const score = gpa(ed.detail);
              return (
                <li key={ed.id} className="edu__card" data-reveal data-spot>
                  <div className="edu__score" aria-label={`GPA ${score.value} of ${score.scale}`}>
                    <strong>{score.value}</strong>
                    <span>/ {score.scale} GPA</span>
                  </div>
                  <div className="edu__copy">
                    <p className="edu__degree">{ed.degree}</p>
                    <p className="edu__school">
                      {ed.school} · {ed.location}
                    </p>
                    <p className="edu__note">{score.note}</p>
                  </div>
                  <span className="edu__dates">{ed.duration}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
