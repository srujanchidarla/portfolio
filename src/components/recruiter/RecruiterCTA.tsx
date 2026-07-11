"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Download, MessageCircle } from "lucide-react";
import { getScheduleHref, SITE } from "@/lib/site";
import { RECRUITER_CONTACT } from "@/lib/recruiter-home";
import { useContact } from "@/components/ContactProvider";

export default function RecruiterCTA() {
  const { openContact } = useContact();
  const scheduleHref = getScheduleHref();

  return (
    <section id="contact" className="rh-cta">
      <div className="wrap">
        <motion.div
          className="rh-cta__inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-title">
            Let&apos;s <span className="gradient-text">connect</span>
          </h2>
          <p className="section-subtitle">
            Graduating {SITE.gradDate} with a 4.0 GPA — excited to connect with teams hiring new
            grads. I respond quickly.
          </p>

          <div className="rh-cta__actions">
            <a href={`mailto:${RECRUITER_CONTACT.email}`} className="btn-primary">
              {RECRUITER_CONTACT.email}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href={SITE.resumeUrl} download className="btn-secondary rh-cta__resume-btn">
              <Download size={16} aria-hidden="true" />
              Download Resume (PDF)
            </a>
            <a href={scheduleHref} className="btn-secondary">
              <Calendar size={16} aria-hidden="true" />
              Schedule 15-min call
            </a>
          </div>

          <div className="rh-cta__grid">
            <a
              href={RECRUITER_CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rh-cta__card"
            >
              <strong>LinkedIn</strong>
              <span>linkedin.com/in/srujan-chidarla</span>
            </a>
            <a href={scheduleHref} className="rh-cta__card">
              <strong>Schedule a call</strong>
              <span>Free 15-min intro · email request</span>
            </a>
            <a
              href={RECRUITER_CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rh-cta__card"
            >
              <strong>GitHub</strong>
              <span>github.com/srujanchidarla</span>
            </a>
            <a href={SITE.resumeUrl} download className="rh-cta__card">
              <strong>Resume</strong>
              <span>Download PDF</span>
            </a>
            <button
              type="button"
              className="rh-cta__card rh-cta__card--chat"
              onClick={() => {
                document.querySelector<HTMLButtonElement>(".avatar-chat-fab")?.click();
              }}
            >
              <MessageCircle size={18} aria-hidden="true" />
              <strong>Ask my AI avatar</strong>
              <span>Questions about my work & availability</span>
            </button>
            <button type="button" className="rh-cta__card" onClick={openContact}>
              <strong>Message me</strong>
              <span>Open contact form</span>
            </button>
          </div>

          <p className="rh-cta__updated">
            Last updated <time dateTime="2026-07-10">{SITE.lastUpdated}</time>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
