"use client";

import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";
import { useContact } from "@/components/ContactProvider";

export default function HiringBanner() {
  const { openContact } = useContact();

  return (
    <section className="hiring-banner" aria-label="Open to work">
      <div className="wrap hiring-banner__inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hiring-banner__content"
        >
          <p className="hiring-banner__eyebrow">🚀 Actively looking for a full-time role</p>
          <h2 className="hiring-banner__title">
            Senior Full-Stack Engineer · Backend · System Design
          </h2>
          <p className="hiring-banner__sub">
            Ready to bring production-scale experience to a team that values impact,
            ownership, and continuous growth.
          </p>

          <div className="hiring-banner__actions">
            <button type="button" className="btn-hiring-primary" onClick={openContact}>
              Let&apos;s Talk
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <a href={SITE.resumeUrl} className="btn-hiring-secondary" download>
              <Download size={16} aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
