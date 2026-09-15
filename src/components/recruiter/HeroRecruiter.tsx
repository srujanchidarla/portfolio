"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, MessageCircle, Trophy } from "lucide-react";
import { SITE, PRIMARY_ROLE, SITE_IMAGES } from "@/lib/site";
import { HERO_METRICS } from "@/lib/recruiter-home";
import { useContact } from "@/components/ContactProvider";
import ParticleBackground from "@/components/ParticleBackground";
import MetricCounter from "./MetricCounter";

function GitHubLogo() {
  return (
    <svg viewBox="0 0 24 24" className="hero__mobile-social-svg" aria-label="GitHub" role="img">
      <path
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.88 1.53 2.32 1.09 2.88.84.09-.65.34-1.09.62-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.68-.1-.26-.45-1.3.1-2.66 0 0 .84-.27 2.75 1.03A9.45 9.45 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.92-1.3 2.75-1.03 2.75-1.03.55 1.36.2 2.4.1 2.66.64.69 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.93.68 1.88v2.8c0 .27.18.59.69.48A10 10 0 0 0 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInLogo() {
  return (
    <svg viewBox="0 0 24 24" className="hero__mobile-social-svg" aria-label="LinkedIn" role="img">
      <path
        d="M2 2h4.4v4.3H2zM4.2 7.9h4.4v13.1H4.2zM9.4 7.9h4.2v1.8h.1c.6-1.2 2-2.4 4.2-2.4 4.5 0 5.4 3 5.4 6.8V21h-4.4v-19.5c0-1.6-.2-3.6-2.4-3.6-2.3 0-2.6 1.8-2.6 3.4V21H9.4z"
        fill="currentColor"
      />
    </svg>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function HeroRecruiter() {
  const { openContact, openAvatarChat } = useContact();

  return (
    <section id="hero" className="hero">
      <ParticleBackground />

      <div className="wrap hero__inner">
        <div className="hero__layout">
          <div className="hero__grid">
            <div className="hero__content">
              <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="hero__badges"
              >
                <span className="hero__badge hero__badge--grad">
                  <span className="hero__badge-dot" aria-hidden="true" />
                  MS CS · {SITE.gradDate} · 4.0 GPA
                </span>
                <span className="hero__badge hero__badge--athlete">
                  <Trophy size={12} aria-hidden="true" />
                  Multi-sport athlete
                </span>
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="hero__title"
              >
                Hi, I&apos;m <span className="gradient-text">Srujan</span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="hero__role"
              >
                {PRIMARY_ROLE.tagline}
              </motion.p>

              <motion.p
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="hero__desc"
              >
                I build across the stack — production systems at <strong>2M+ req/day</strong>,
                system design under real load, and networks coursework (TCP/IP, BGP/OSPF) that
                informs how I think about services. Shipped{" "}
                <strong>JobHuntOS</strong>, <strong>CampfireChai</strong>, and{" "}
                <strong>AlgoChronicle</strong>. MS CS at 4.0, graduating Aug 2026.
              </motion.p>

              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="hero__metrics"
              >
                <div className="hero__metric">
                  <MetricCounter
                    value={HERO_METRICS.gpa}
                    suffix="/4.0"
                    decimals={1}
                    className="hero__metric-value"
                  />
                  <span>GPA · theory</span>
                </div>
                <div className="hero__metric">
                  <MetricCounter
                    value={HERO_METRICS.dailyRequests}
                    suffix="+"
                    className="hero__metric-value"
                  />
                  <span>req/day · production</span>
                </div>
                <div className="hero__metric">
                  <MetricCounter
                    value={HERO_METRICS.projectsShipped}
                    className="hero__metric-value"
                  />
                  <span>featured apps</span>
                </div>
              </motion.div>

              <motion.div
                custom={5}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="hero__actions"
              >
                <a href="#projects" className="btn-primary">
                  See what I&apos;ve built
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
                <button type="button" className="btn-secondary" onClick={openAvatarChat}>
                  <MessageCircle size={15} aria-hidden="true" />
                  Ask my AI avatar
                </button>
                <button type="button" onClick={openContact} className="btn-secondary">
                  Let&apos;s connect
                </button>
              </motion.div>
            </div>

            <motion.div
              className="hero__visual"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="hero__photo-frame">
                <Image
                  src={SITE_IMAGES.hero}
                  alt="Srujan Chidarla working on his laptop at a café"
                  fill
                  priority
                  className="hero__photo"
                  sizes="(max-width: 1024px) 100vw, 380px"
                />
                <div className="hero__photo-glow" aria-hidden="true" />
                <p className="hero__photo-caption">
                  <span className="hero__photo-dot" aria-hidden="true" />
                  Shipping code in the wild
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <section className="hero__mobile-card" aria-label="Srujan Chidarla profile">
        <div className="hero__mobile-photo-wrap">
          <Image
            src={SITE_IMAGES.hero}
            alt="Srujan Chidarla working on his laptop at a café"
            fill
            priority
            className="hero__mobile-photo"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>

        <div className="hero__mobile-content">
          <div className="hero__mobile-badges">
            <span className="hero__badge hero__badge--grad">
              <span className="hero__badge-dot" aria-hidden="true" />
              MS CS · {SITE.gradDate} · 4.0 GPA
            </span>
            <span className="hero__badge hero__badge--athlete">
              <Trophy size={12} aria-hidden="true" />
              Multi-sport athlete
            </span>
          </div>

          <h1 className="hero__mobile-title">Srujan Chidarla</h1>
          <p className="hero__mobile-caption">{PRIMARY_ROLE.headline}</p>

          <div className="hero__mobile-metrics">
            <div className="hero__metric">
              <MetricCounter
                value={HERO_METRICS.gpa}
                suffix="/4.0"
                decimals={1}
                className="hero__metric-value"
              />
              <span>GPA</span>
            </div>
            <div className="hero__metric">
              <MetricCounter
                value={HERO_METRICS.dailyRequests}
                suffix="+"
                className="hero__metric-value"
              />
              <span>req/day</span>
            </div>
            <div className="hero__metric">
              <MetricCounter
                value={HERO_METRICS.projectsShipped}
                className="hero__metric-value"
              />
              <span>apps shipped</span>
            </div>
          </div>

          <div className="hero__mobile-actions">
            <a href="#projects" className="btn-primary hero__mobile-cta-primary">
              See what I&apos;ve built
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            <div className="hero__mobile-actions-row">
              <button type="button" className="btn-secondary" onClick={openAvatarChat}>
                <MessageCircle size={15} aria-hidden="true" />
                Ask AI avatar
              </button>
              <button type="button" onClick={openContact} className="btn-secondary">
                Let&apos;s connect
              </button>
            </div>
          </div>

          <div className="hero__mobile-socials">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__mobile-social hero__mobile-social--github"
              aria-label="GitHub"
            >
              <GitHubLogo />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__mobile-social hero__mobile-social--linkedin"
              aria-label="LinkedIn"
            >
              <LinkedInLogo />
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
