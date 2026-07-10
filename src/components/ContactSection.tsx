"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { RECRUITER_LINKS } from "@/lib/hiring";
import { useContact } from "@/components/ContactProvider";

export default function ContactSection() {
  const { openContact } = useContact();

  return (
    <section id="contact" className="contact-section">
      <div className="wrap">
        <motion.div
          className="contact-section__inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="contact-section__intro">
            <p className="section-eyebrow">Get In Touch</p>
            <h2 className="section-title">
              Let&apos;s build something <span className="gradient-text">together</span>
            </h2>
            <p className="section-subtitle">
              Recruiting for a full-time role? I&apos;d love to hear about your team.
              Multiple ways to connect — pick what works best.
            </p>
            <button type="button" className="btn-primary" onClick={openContact}>
              Let&apos;s Talk
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="recruiter-links">
            <p className="recruiter-links__label">Quick links for recruiters</p>
            <div className="recruiter-links__grid">
              {RECRUITER_LINKS.map((link) => {
                if ("action" in link && link.action === "contact") {
                  return (
                    <button
                      key={link.id}
                      type="button"
                      className="recruiter-link"
                      onClick={openContact}
                    >
                      <span className="recruiter-link__icon" aria-hidden="true">
                        {link.icon}
                      </span>
                      <span className="recruiter-link__text">
                        <strong>{link.label}</strong>
                        <span>{link.sublabel}</span>
                      </span>
                    </button>
                  );
                }

                return (
                  <a
                    key={link.id}
                    href={"href" in link ? link.href : "#"}
                    className="recruiter-link"
                    {...("external" in link && link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    {...(link.id === "resume" ? { download: true } : {})}
                  >
                    <span className="recruiter-link__icon" aria-hidden="true">
                      {link.icon}
                    </span>
                    <span className="recruiter-link__text">
                      <strong>{link.label}</strong>
                      <span>{link.sublabel}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        <p className="contact-section__updated">
          Portfolio last updated: <time dateTime="2026-07-05">{SITE.lastUpdated}</time>
        </p>
      </div>
    </section>
  );
}
