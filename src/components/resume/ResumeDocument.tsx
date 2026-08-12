import { SITE } from "@/lib/site";

/** Printable recruiter resume — open /resume and use Print → Save as PDF */
export default function ResumeDocument() {
  return (
    <article className="resume-doc">
      <header className="resume-doc__header">
        <h1>{SITE.name}</h1>
        <p className="resume-doc__role">
          Software Engineer · MS CS, Aug 2026
        </p>
        <p className="resume-doc__contact">
          Baltimore, MD · {SITE.email} ·{" "}
          <a href={SITE.linkedin}>linkedin.com/in/srujan-chidarla</a> ·{" "}
          <a href={SITE.github}>github.com/srujanchidarla</a> ·{" "}
          <a href={SITE.website}>srujanchidarla.com</a>
        </p>
      </header>

      <section>
        <h2>Summary</h2>
        <p>
          MS CS (4.0 GPA) with production experience contributing to Spring Boot microservices at{" "}
          <strong>2M+ req/day</strong> and <strong>99.9% uptime</strong>. Ships products and LLM
          systems — JobHuntOS (Chrome Web Store), CampfireChai (live), AlgoChronicle (live). STEM
          OPT eligible.
        </p>
      </section>

      <section>
        <h2>Skills</h2>
        <p>
          <strong>Backend:</strong> Java, Spring Boot, Node.js, Express, Python, FastAPI, REST, SSE
          <br />
          <strong>AI / LLM:</strong> Claude, Gemini, Groq routing, prompt engineering, multi-agent
          systems
          <br />
          <strong>Frontend:</strong> React, Next.js, TypeScript, Chrome MV3
          <br />
          <strong>Data / Cloud:</strong> PostgreSQL, MySQL, MongoDB, Firebase, AWS, Docker, CI/CD
        </p>
      </section>

      <section>
        <h2>Experience</h2>

        <div className="resume-doc__job">
          <div className="resume-doc__job-top">
            <h3>Cognizant Technology Solutions — Software Engineer</h3>
            <span>Mar 2021 – Apr 2024 · Hyderabad, India</span>
          </div>
          <ul>
            <li>
              Contributed to Spring Boot microservices processing <strong>2M+ daily requests</strong>{" "}
              with <strong>99.9% uptime</strong> for 500+ enterprise users
            </li>
            <li>
              Helped optimize a bottleneck query path, reducing P99 latency from 250ms to 50ms on a
              high-traffic service
            </li>
            <li>
              Supported Docker-based deployments and CI/CD across dev/staging/production; collaborated
              with senior engineers on design and reviews
            </li>
          </ul>
        </div>

        <div className="resume-doc__job">
          <div className="resume-doc__job-top">
            <h3>WalletGyde — Full-Stack Developer (Internship)</h3>
            <span>Dec 2024 – May 2025 · Remote</span>
          </div>
          <ul>
            <li>
              Built Next.js + Supabase (PostgreSQL) APIs for a fintech platform (
              <strong>35% engagement ↑</strong>, <strong>40% faster</strong> transaction processing)
            </li>
            <li>Raised mobile Lighthouse scores by 30% through API and frontend optimization</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Selected projects</h2>
        <ul>
          <li>
            <strong>JobHuntOS</strong> — Multi-LLM Chrome extension (SSE streaming, Claude/Gemini/Groq
            failover) · Chrome Web Store
          </li>
          <li>
            <strong>CampfireChai</strong> — Full-stack trip platform (React 19, Express, MongoDB,
            Socket.io) · Live on Vercel
          </li>
          <li>
            <strong>AlgoChronicle</strong> — GitHub Actions → Firestore publishing pipeline · Live
          </li>
          <li>
            <strong>Neocortex</strong> — FastAPI multi-agent life OS, 6-provider LLM failover · In
            progress
          </li>
        </ul>
      </section>

      <section>
        <h2>Education</h2>
        <p>
          <strong>University of Fairfax</strong> — M.S. Computer Science · Aug 2024 – Aug 2026
          (Expected) · GPA 4.0/4.0
          <br />
          <strong>VNR VJIET</strong> — B.Tech Information Technology · 2018 – 2021 · GPA 3.8/4.0 ·
          Honors
        </p>
      </section>

      <section>
        <h2>Additional</h2>
        <p>
          AWS Cloud Practitioner · Prompt Engineering · Databricks Generative AI · Google UX Design
          Certificate · Multi-sport athlete · Google Local Guide Level 9 · STEM OPT (36 months)
        </p>
      </section>
    </article>
  );
}
