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
import { ROLE_RESUMES } from "@/lib/site";

export default function RoleStrategy() {
  const [activeRole, setActiveRole] = useState<RoleStrategyId>("backend");
  const [fitOpen, setFitOpen] = useState(true);

  const activeFit = ROLE_FIT.find((r) => r.id === activeRole) ?? ROLE_FIT[0];
  const activeWhy = ROLE_WHY_HIRE.find((r) => r.id === activeRole) ?? ROLE_WHY_HIRE[0];
  const activeStrategy = ROLE_STRATEGY.find((r) => r.id === activeRole) ?? ROLE_STRATEGY[0];
  const activeResume = ROLE_RESUMES[activeRole];

  return (
    <section id="role-strategy" className="rh-roles">
      <div className="wrap">
        <motion.header
          className="rh-section-header rh-section-header--center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <p className="section-eyebrow">Role strategy</p>
          <h2 className="section-title">
            Where I&apos;m <span className="gradient-text">aiming</span>
          </h2>
          <p className="section-subtitle">
            Three roles based on market demand and my strongest proof — scale, AI systems, and
            shipping products end-to-end. Pick one to see why I&apos;m your best candidate for that
            track.
          </p>
        </motion.header>

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

              <div className="rh-roles__meta-row">
                <div className="rh-roles__salary">
                  <span className="rh-roles__meta-label">Range</span>
                  <strong>{role.salary}</strong>
                  <span className="rh-roles__salary-note">{role.salaryNote}</span>
                </div>
                <div className="rh-roles__demand">
                  <span className="rh-roles__meta-label">
                    <TrendingUp size={12} aria-hidden="true" /> Demand
                  </span>
                  <strong>{role.demandTrend}</strong>
                  <span className="rh-roles__demand-detail">{role.demandDetail}</span>
                </div>
              </div>

              <div className="rh-roles__companies">
                {role.companies.map((c) => (
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
          <strong>Why I chose these 3:</strong> {ROLE_STRATEGY_WHY}
        </motion.p>

        <div className="rh-roles__resumes">
          <p className="rh-roles__resumes-label">Download my role-specific resume</p>
          <div className="rh-roles__resumes-row">
            {(Object.keys(ROLE_RESUMES) as Array<keyof typeof ROLE_RESUMES>).map((key) => {
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

                      <a
                        href={activeResume.href}
                        download
                        className="btn-primary rh-roles__fit-resume"
                      >
                        <Download size={16} aria-hidden="true" />
                        Download {activeResume.label} resume
                      </a>
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
      </div>
    </section>
  );
}
