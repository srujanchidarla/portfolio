"use client";

import { motion } from "framer-motion";
import { Calendar, Download, GraduationCap, MapPin } from "lucide-react";
import { HIRING_ROLES } from "@/lib/recruiter-home";
import { LOOKING_FOR } from "@/lib/hiring";
import { getScheduleHref, ROLE_RESUMES, SITE, WORK_AUTH } from "@/lib/site";

export default function HiringSignal() {
  const scheduleHref = getScheduleHref();

  return (
    <section id="hire" className="rh-hire">
      <div className="wrap rh-hire__inner">
        <motion.header
          className="rh-section-header rh-section-header--center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow">New grad hiring</p>
          <h2 className="section-title">
            Open to <span className="gradient-text">work</span>
          </h2>
          <p className="rh-hire__cta-line">
            <span>1 · Backend Engineer (Scale Expert)</span>
            <span className="rh-hire__cta-sep" aria-hidden="true">
              |
            </span>
            <span>2 · AI Engineer (LLM Expert)</span>
            <span className="rh-hire__cta-sep" aria-hidden="true">
              |
            </span>
            <span>3 · Full-Stack (Shipping Expert)</span>
          </p>
          <p className="section-subtitle">
            I&apos;m pursuing these 3 roles strategically. Pick one below to learn why I&apos;m your
            best candidate for that specific role.
          </p>
        </motion.header>

        <div className="rh-hire__quick">
          <a href="#role-strategy" className="btn-primary">
            Explore role fit
          </a>
          <a href={scheduleHref} className="btn-secondary">
            <Calendar size={16} aria-hidden="true" />
            Schedule 15-min call
          </a>
          <a href="#contact" className="btn-secondary">
            Quick apply · Contact
          </a>
        </div>

        <div className="rh-hire__resume-row">
          <span className="rh-hire__resume-label">Download my</span>
          <a href={ROLE_RESUMES.backend.href} download className="rh-hire__resume-link">
            <Download size={13} aria-hidden="true" />
            Backend Engineer
          </a>
          <span className="rh-hire__cta-sep" aria-hidden="true">
            |
          </span>
          <a href={ROLE_RESUMES.ai.href} download className="rh-hire__resume-link">
            <Download size={13} aria-hidden="true" />
            AI Engineer
          </a>
          <span className="rh-hire__cta-sep" aria-hidden="true">
            |
          </span>
          <a href={ROLE_RESUMES.fullstack.href} download className="rh-hire__resume-link">
            <Download size={13} aria-hidden="true" />
            Full-Stack Engineer
          </a>
          <span className="rh-hire__resume-label">resume</span>
        </div>

        <p className="rh-hire__work-auth">{WORK_AUTH.line}</p>

        <div className="rh-hire__roles">
          {HIRING_ROLES.map((role) => (
            <a key={role} href="#role-strategy" className="rh-hire__role-chip">
              {role}
            </a>
          ))}
        </div>

        <div className="rh-hire__meta">
          <span>
            <GraduationCap size={16} aria-hidden="true" />
            Graduating {SITE.gradDate} · 4.0 GPA
          </span>
          <span>
            <MapPin size={16} aria-hidden="true" />
            {SITE.location}
          </span>
          <span>
            <Calendar size={16} aria-hidden="true" />
            Available after graduation
          </span>
        </div>

        <div className="rh-hire__looking">
          {LOOKING_FOR.map((col) => (
            <div key={col.id} className="rh-hire__col">
              <h3>{col.title}</h3>
              <ul>
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
