"use client";

import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";
import { useContact } from "@/components/ContactProvider";

export default function HiringBanner() {
  const { openContact } = useContact();

  return (
    <section className="hiring-banner" aria-label="Get in touch">
      <div className="wrap hiring-banner__inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hiring-banner__content"
        >
          <p className="hiring-banner__eyebrow">Always building</p>
          <h2 className="hiring-banner__title">
            Software Engineer
          </h2>
          <p className="hiring-banner__sub">
            Production systems at 2M+ req/day, products in the wild, and a public practice streak.
          </p>

          <div className="hiring-banner__actions">
            <button type="button" className="btn-hiring-primary" onClick={openContact}>
              Let&apos;s Talk
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <a href={SITE.resumeUrl} className="btn-hiring-secondary">
              <Download size={16} aria-hidden="true" />
              View Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
