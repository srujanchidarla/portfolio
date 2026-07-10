"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import { RECRUITER_CONTACT } from "@/lib/recruiter-home";
import { useContact } from "@/components/ContactProvider";

export default function RecruiterCTA() {
  const { openContact } = useContact();

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

          <a href={`mailto:${RECRUITER_CONTACT.email}`} className="btn-primary rh-cta__email">
            {RECRUITER_CONTACT.email}
            <ArrowRight size={18} aria-hidden="true" />
          </a>

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
            <button type="button" className="rh-cta__card" onClick={openContact}>
              <strong>Schedule a call</strong>
              <span>Book a quick intro</span>
            </button>
            <a
              href={RECRUITER_CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rh-cta__card"
            >
              <strong>GitHub</strong>
              <span>github.com/srujanchidarla</span>
            </a>
            <a href={RECRUITER_CONTACT.resume} download className="rh-cta__card">
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
          </div>

          <p className="rh-cta__updated">
            Last updated <time dateTime="2026-07-06">{SITE.lastUpdated}</time>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
