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
    <svg viewBox="0 0 496 512" className="hero__mobile-social-svg" aria-label="GitHub" role="img">
      <path
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInLogo() {
  return (
    <svg viewBox="0 0 448 512" className="hero__mobile-social-svg" aria-label="LinkedIn" role="img">
      <path
        d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
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
                  MS CS grad · {SITE.gradDate} · 4.0 GPA
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
                <strong>JobHuntOS</strong>, <strong>Wildmate</strong>, and{" "}
                <strong>AlgoChronicle</strong>. MS CS at 4.0, graduated Aug 2026.
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
              MS CS grad · {SITE.gradDate} · 4.0 GPA
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
