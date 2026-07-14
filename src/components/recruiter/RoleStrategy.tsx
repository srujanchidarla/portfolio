"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download, TrendingUp } from "lucide-react";
import {
  MARKET_POSITION,
  ROLE_FIT,
  ROLE_STRATEGY,
  ROLE_STRATEGY_WHY,
  ROLE_WHY_HIRE,
  type RoleStrategyId,
} from "@/lib/hiring";
import {
  PRIMARY_ROLE,
  ROLE_RESUMES,
  ROLE_RESUMES_AVAILABLE,
  SITE,
  getRoleResumeDownload,
  type RoleResumeKey,
} from "@/lib/site";

interface RoleStrategyProps {
  /** Render inside Hiring section (no duplicate section shell/header) */
  embedded?: boolean;
}

export default function RoleStrategy({ embedded = false }: RoleStrategyProps) {
  const [activeRole, setActiveRole] = useState<RoleStrategyId>("backend");
  const [fitOpen, setFitOpen] = useState(true);

  const activeFit = ROLE_FIT.find((r) => r.id === activeRole) ?? ROLE_FIT[0];
  const activeWhy = ROLE_WHY_HIRE.find((r) => r.id === activeRole) ?? ROLE_WHY_HIRE[0];
  const activeStrategy = ROLE_STRATEGY.find((r) => r.id === activeRole) ?? ROLE_STRATEGY[0];
  const activeResumeDownload = getRoleResumeDownload(activeRole);
  const availableRoleResumes = (Object.keys(ROLE_RESUMES) as RoleResumeKey[]).filter(
    (key) => ROLE_RESUMES[key].available
  );

  const content = (
    <>
      {!embedded ? (
        <motion.header
          className="rh-section-header rh-section-header--center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <p className="section-eyebrow">Role fit</p>
          <h2 className="section-title">
            Where I <span className="gradient-text">fit best</span>
          </h2>
          <p className="section-subtitle">
            Primary focus: <strong>{PRIMARY_ROLE.title}</strong>. Also strong fit for AI and
            full-stack tracks — pick one to see proof and examples.
          </p>
        </motion.header>
      ) : (
        <div id="role-strategy" className="rh-roles__embedded-header">
          <p className="section-eyebrow">Role fit</p>
          <h3 className="rh-roles__hire-title">
            Primary: {PRIMARY_ROLE.title} · also AI &amp; full-stack
          </h3>
          <p className="section-subtitle rh-roles__embedded-sub">
            Pick a track to see why I&apos;m a strong match — with concrete proof from production
            work.
          </p>
        </div>
      )}

      <div className="rh-roles__picker" role="tablist" aria-label="Target roles">
        {ROLE_STRATEGY.map((role) => (
          <button
            key={role.id}
            type="button"
            role="tab"
            aria-selected={activeRole === role.id}
            className={`rh-roles__picker-btn${activeRole === role.id ? " is-active" : ""}`}
            onClick={() => {
              setActiveRole(role.id);
              setFitOpen(true);
            }}
          >
            <span className="rh-roles__picker-rank">{role.medal}</span>
            <span className="rh-roles__picker-text">
              <strong>{role.title}</strong>
              <em>{role.expertLabel}</em>
            </span>
          </button>
        ))}
      </div>

      <div className="rh-roles__grid">
        {ROLE_STRATEGY.map((role, i) => (
          <motion.article
            key={role.id}
            className={`rh-roles__card${activeRole === role.id ? " is-active" : ""}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            onClick={() => {
              setActiveRole(role.id);
              setFitOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveRole(role.id);
                setFitOpen(true);
              }
            }}
            tabIndex={0}
            role="button"
            aria-pressed={activeRole === role.id}
          >
            <div className="rh-roles__card-top">
              <span className="rh-roles__rank" aria-label={`Priority ${role.rank}`}>
                {role.medal}
              </span>
              <div>
                <h3 className="rh-roles__title">{role.title}</h3>
                <p className="rh-roles__subtitle">
                  {role.subtitle} · {role.expertLabel}
                </p>
              </div>
            </div>

            <p className="rh-roles__focus">{role.focus}</p>
            <p className="rh-roles__advantage">
              <strong>My edge:</strong> {role.advantage}
            </p>

            <div className="rh-roles__stack">
              {role.stack.slice(0, 3).map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <div className="rh-roles__meta-row rh-roles__meta-row--demand-only">
              <div className="rh-roles__demand">
                <span className="rh-roles__meta-label">
                  <TrendingUp size={12} aria-hidden="true" /> Market demand
                </span>
                <strong>{role.demandTrend}</strong>
                <span className="rh-roles__demand-detail">{role.demandDetail}</span>
              </div>
            </div>

            <div className="rh-roles__companies">
              {role.companyTypes.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      <motion.p
        className="rh-roles__why-blurb"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <strong>Why these 3:</strong> {ROLE_STRATEGY_WHY}
      </motion.p>

      {ROLE_RESUMES_AVAILABLE ? (
        <div className="rh-roles__resumes">
          <p className="rh-roles__resumes-label">Download my role-specific resume</p>
          <div className="rh-roles__resumes-row">
            {availableRoleResumes.map((key) => {
              const resume = ROLE_RESUMES[key];
              return (
                <a
                  key={key}
                  href={resume.href}
                  download
                  className={`rh-roles__resume-btn${activeRole === key ? " is-active" : ""}`}
                >
                  <Download size={14} aria-hidden="true" />
                  {resume.shortLabel}
                </a>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="rh-roles__resume-note">
          <a href={SITE.resumeUrl} download className="rh-roles__resume-fallback">
            <Download size={14} aria-hidden="true" />
            Download resume (PDF)
          </a>
          <span className="rh-roles__resume-hint">
            Role-tailored resumes available on request.
          </span>
        </p>
      )}

      <motion.div
        className="rh-roles__fit"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
      >
        <button
          type="button"
          className={`rh-roles__fit-toggle${fitOpen ? " is-open" : ""}`}
          aria-expanded={fitOpen}
          onClick={() => setFitOpen((v) => !v)}
        >
          <span>
            My fit by role — <strong>{activeStrategy.title}</strong>
          </span>
          <ChevronDown size={18} aria-hidden="true" />
        </button>

        <AnimatePresence initial={false}>
          {fitOpen ? (
            <motion.div
              key={`fit-${activeRole}`}
              className="rh-roles__fit-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
            >
              <div className="rh-roles__fit-inner">
                <div className="rh-roles__fit-tabs" role="tablist" aria-label="Fit by role">
                  {ROLE_FIT.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      role="tab"
                      aria-selected={activeRole === role.id}
                      className={`rh-roles__fit-tab${activeRole === role.id ? " is-active" : ""}`}
                      onClick={() => setActiveRole(role.id)}
                    >
                      {role.title}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRole}
                    className="rh-roles__fit-body"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="rh-roles__fit-heading">
                      {activeFit.title} → {activeFit.heading}
                    </h3>

                    <dl className="rh-roles__fit-grid">
                      <div>
                        <dt>Experience</dt>
                        <dd>{activeFit.experience}</dd>
                      </div>
                      <div>
                        <dt>Proof</dt>
                        <dd>{activeFit.proof}</dd>
                      </div>
                      <div>
                        <dt>What I know</dt>
                        <dd>{activeFit.know}</dd>
                      </div>
                      <div className="rh-roles__fit-example">
                        <dt>Example</dt>
                        <dd>&ldquo;{activeFit.example}&rdquo;</dd>
                      </div>
                    </dl>

                    <ul className="rh-roles__hire-list">
                      {activeWhy.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>

                    {ROLE_RESUMES_AVAILABLE ? (
                      <a
                        href={activeResumeDownload.href}
                        download
                        className="btn-primary rh-roles__fit-resume"
                      >
                        <Download size={16} aria-hidden="true" />
                        Download {activeResumeDownload.label} resume
                      </a>
                    ) : (
                      <a href={SITE.resumeUrl} download className="btn-primary rh-roles__fit-resume">
                        <Download size={16} aria-hidden="true" />
                        Download resume (PDF)
                      </a>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="rh-roles__market"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
      >
        <header className="rh-roles__market-header">
          <p className="section-eyebrow">Market position · 2026</p>
          <h3 className="rh-roles__hire-title">
            Why I&apos;m <span className="gradient-text">competitive</span>
          </h3>
        </header>

        <div className="rh-roles__market-grid">
          <div className="rh-roles__market-reality">
            <h4>Market reality</h4>
            <ul>
              {MARKET_POSITION.reality.map((item) => (
                <li key={item.id}>
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rh-roles__market-edge">
            <h4>Why I&apos;m competitive</h4>
            <ul>
              {MARKET_POSITION.competitive.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );

  if (embedded) {
    return <div className="rh-roles rh-roles--embedded">{content}</div>;
  }

  return (
    <section id="role-strategy" className="rh-roles">
      <div className="wrap">{content}</div>
    </section>
  );
}
