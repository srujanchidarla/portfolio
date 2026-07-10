"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, GraduationCap, MapPin, Trophy } from "lucide-react";
import { SITE, SITE_IMAGES } from "@/lib/site";
import { HERO_METRICS } from "@/lib/recruiter-home";
import { useContact } from "@/components/ContactProvider";
import ParticleBackground from "@/components/ParticleBackground";
import AnimatedTerminal from "@/components/AnimatedTerminal";
import MetricCounter from "./MetricCounter";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function HeroRecruiter() {
  const { openContact } = useContact();

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
              <span className="hero__badge hero__badge--active">
                <GraduationCap size={12} aria-hidden="true" />
                {SITE.status}
              </span>
              <span className="hero__badge hero__badge--grad">
                <span className="hero__badge-dot" aria-hidden="true" />
                MS CS · {SITE.gradDate} · 4.0 GPA
              </span>
              <span className="hero__badge">
                <MapPin size={12} aria-hidden="true" />
                {SITE.location}
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
              New Grad · Full-Stack Engineer · Eager to learn & ship
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hero__desc"
            >
              I&apos;m graduating with my <strong>Master&apos;s in CS (4.0 GPA)</strong> in{" "}
              {SITE.gradDate} — and I&apos;ve already shipped{" "}
              <strong>CampfireChai</strong> (live), <strong>JobHuntOS</strong> (Chrome Web Store),
              and I&apos;m building <strong>Neocortex</strong>. Before grad school I contributed to
              production systems at <strong>2M+ req/day</strong>. I&apos;m not looking for a senior
              role — I&apos;m looking for a team where I can{" "}
              <strong>learn, collaborate, and grow</strong>.
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hero__metrics"
            >
              <div className="hero__metric">
                <MetricCounter value={HERO_METRICS.gpa} suffix="/4.0" decimals={1} className="hero__metric-value" />
                <span>GPA</span>
              </div>
              <div className="hero__metric">
                <MetricCounter value={HERO_METRICS.projectsShipped} suffix="+" className="hero__metric-value" />
                <span>projects shipped</span>
              </div>
              <div className="hero__metric">
                <MetricCounter value={HERO_METRICS.dailyRequests} suffix="+" className="hero__metric-value" />
                <span>req/day exposure</span>
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
              <button type="button" onClick={openContact} className="btn-secondary">
                Let&apos;s connect
              </button>
            </motion.div>

            <motion.p
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hero__footnote"
            >
              {SITE.tagline}
            </motion.p>
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

        <motion.div
          className="hero__terminal-wrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <AnimatedTerminal />
        </motion.div>
      </div>
    </div>
    </section>
  );
}
