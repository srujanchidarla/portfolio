import { SITE } from "@/lib/site";

/** Printable resume — open /resume and use Print → Save as PDF */
export default function ResumeDocument() {
  return (
    <article className="resume-doc">
      <header className="resume-doc__header">
        <h1>{SITE.name}</h1>
        <p className="resume-doc__role">
          Software Engineer · System Design · Networks · AI Systems
        </p>
        <p className="resume-doc__contact">
          {SITE.email} ·{" "}
          <a href={SITE.website}>srujanchidarla.com</a> ·{" "}
          <a href={SITE.linkedin}>linkedin.com/in/srujan-chidarla</a> ·{" "}
          <a href={SITE.github}>github.com/srujanchidarla</a>
        </p>
      </header>

      <section>
        <h2>Summary</h2>
        <p>
          Software engineer with <strong>3+ years</strong> at the intersection of{" "}
          <strong>system design</strong>, <strong>computer networks</strong>, and{" "}
          <strong>production AI</strong>. Operated Spring Boot microservices at{" "}
          <strong>2M+ req/day</strong> and <strong>99.9% uptime</strong>; cut hot-path{" "}
          <strong>P99 latency from ~250ms to ~50ms</strong>. Ships AI with real routing and
          failover — <strong>JobHuntOS</strong> (Chrome Web Store) and <strong>Neocortex</strong>{" "}
          (15 agents, 6-provider chain). MS CS in TCP/IP, BGP/OSPF, distributed systems (
          <strong>GPA 4.0/4.0</strong>, graduated Aug 2026). Open to relocate nationwide · STEM OPT
          (36 months).
        </p>
      </section>

      <section>
        <h2>Technical Skills</h2>
        <ul className="resume-doc__skills">
          <li>
            <strong>System Design & Networks:</strong> Microservices, distributed systems, latency
            trade-offs, backpressure & failover, TCP/IP, BGP/OSPF, load balancing, Socket.io, SSE
          </li>
          <li>
            <strong>AI & LLM Systems:</strong> Multi-provider orchestration (Claude, Gemini, Groq),
            prompt pipelines, SSE streaming, agent architectures, graceful degradation, BYOK
          </li>
          <li>
            <strong>Languages & Frameworks:</strong> Java, Spring Boot, Python, FastAPI,
            TypeScript/JavaScript, Node.js, Express, Next.js, React 19, C++
          </li>
          <li>
            <strong>Data & Cloud:</strong> PostgreSQL, MySQL, MongoDB, Firebase, AWS, Docker,
            Kubernetes, CI/CD (GitHub Actions, Azure DevOps), Chrome MV3, Cisco Packet Tracer
          </li>
        </ul>
      </section>

      <section>
        <h2>Professional Experience</h2>

        <div className="resume-doc__job">
          <div className="resume-doc__job-top">
            <h3>WalletGyde — Full-Stack Web Developer (Internship)</h3>
            <span>Jan 2025 – Dec 2025 · Denver, CO (Remote)</span>
          </div>
          <ul>
            <li>
              Shipped fintech APIs on Next.js + Supabase (PostgreSQL) with auth and validation (
              <strong>35% engagement ↑</strong>)
            </li>
            <li>
              Improved transaction path by <strong>40%</strong> via schema design, indexing, and
              query tuning
            </li>
            <li>
              Raised mobile Lighthouse scores by <strong>30%</strong> through API and frontend
              performance work
            </li>
          </ul>
        </div>

        <div className="resume-doc__job">
          <div className="resume-doc__job-top">
            <h3>Cognizant Technology Solutions — Software Engineer</h3>
            <span>Mar 2021 – Apr 2024 · Hyderabad, India</span>
          </div>
          <ul>
            <li>
              Spring Boot microservices at <strong>2M+ daily requests</strong> with{" "}
              <strong>99.9% uptime</strong> for 500+ enterprise users
            </li>
            <li>
              Reduced <strong>P99 latency from ~250ms to ~50ms</strong> on a congested service path
              (query + API hop optimization)
            </li>
            <li>
              Cut SPA page-load times by <strong>30%</strong>; integrated Azure DevOps APIs (
              <strong>20% productivity ↑</strong>)
            </li>
            <li>
              Supported Docker and CI/CD across dev, staging, and production; design reviews and
              reliability practices
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Selected Projects — Systems · Networks · AI</h2>

        <div className="resume-doc__job">
          <div className="resume-doc__job-top">
            <h3>JobHuntOS — Multi-Model LLM System</h3>
            <span>Chrome Web Store · SSE · Claude / Gemini / Groq</span>
          </div>
          <ul>
            <li>
              Production LLM router with timeouts, failover, and streaming across 100+ ATS formats;
              BYOK privacy; ~2 min/application
            </li>
          </ul>
        </div>

        <div className="resume-doc__job">
          <div className="resume-doc__job-top">
            <h3>Neocortex — Multi-Agent Life OS</h3>
            <span>In development · FastAPI · 6-provider failover</span>
          </div>
          <ul>
            <li>
              15 domain agents, inter-agent coordination, SQLite persistence, safety kill switches,
              37 backend test suites
            </li>
          </ul>
        </div>

        <div className="resume-doc__job">
          <div className="resume-doc__job-top">
            <h3>CampfireChai (Wildmate) — Real-Time + AI Coordination</h3>
            <span>Live · Socket.io · LLM fallbacks</span>
          </div>
          <ul>
            <li>
              WebSocket trip chat across 15+ metro hubs; Magic Paste AI drafting with multi-provider
              LLM fallbacks
            </li>
          </ul>
        </div>

        <div className="resume-doc__job">
          <div className="resume-doc__job-top">
            <h3>AlgoChronicle — Event-Driven Publish Pipeline</h3>
            <span>Live · GitHub Actions → Firestore</span>
          </div>
          <ul>
            <li>
              Push-triggered ingest pipeline (C++/Java/Python) with zero manual logging and live
              streak dashboards
            </li>
          </ul>
        </div>

        <div className="resume-doc__job">
          <div className="resume-doc__job-top">
            <h3>FitConnect — Booking System Design</h3>
            <span>Real-time scheduling architecture</span>
          </div>
          <ul>
            <li>
              Conflict-free venue/trainer booking design; <strong>60% booking increase</strong>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Education</h2>
        <p>
          <strong>University of Fairfax</strong> — M.S. Computer Science · Aug 2024 – Aug 2026 ·
          GPA 4.0/4.0
          <br />
          <em>
            Coursework: System Design · Distributed Systems · Computer Networks (TCP/IP, BGP/OSPF) ·
            AI/ML Integration
          </em>
          <br />
          <br />
          <strong>VNR VJIET</strong> — B.Tech Information Technology · Aug 2018 – Aug 2021 · GPA
          3.8/4.0 · Graduated with Honors
        </p>
      </section>

      <section>
        <h2>Certifications</h2>
        <p>
          <strong>AI:</strong> Prompt Engineering · Generative AI Fundamentals (Databricks) ·{" "}
          <strong>Networks & Cloud:</strong> Cisco Packet Tracer · AWS Cloud Practitioner ·{" "}
          <strong>Engineering:</strong> Learning Next.js · Google UX Design · Angular · Modern Java
          · React.js · HackerRank Problem Solving
        </p>
      </section>

      <section>
        <h2>Additional</h2>
        <p>
          GitHub: 41 repos · 303+ contributions/year · Pull Shark · Google Local Guide Level 9 ·
          Multi-sport athlete · Open to relocate nationwide
        </p>
      </section>
    </article>
  );
}
