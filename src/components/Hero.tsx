"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { useContact } from "@/components/ContactProvider";
import ParticleBackground from "./ParticleBackground";
import AnimatedTerminal from "./AnimatedTerminal";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Hero() {
  const { openContact } = useContact();

  return (
    <section id="hero" className="hero">
      <ParticleBackground />

      <div className="wrap hero__inner">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
          {/* Left column */}
          <div className="hero__content">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hero__badges"
            >
              <span className="hero__badge hero__badge--active">
                <span className="hero__badge-dot" aria-hidden="true" />
                {SITE.status}
              </span>
              <span className="hero__badge">
                <MapPin size={12} aria-hidden="true" />
                {SITE.location}
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
              Full-Stack Engineer · System Design · Microservices
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hero__desc"
            >
              I&apos;ve built systems handling 2M+ daily requests with 99.9% uptime.
              Currently seeking a full-time role to scale distributed systems.
              Also an athlete — discipline shows everywhere I work.
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hero__actions"
            >
              <a href="#projects" className="btn-primary">
                View My Work
                <ArrowRight size={15} aria-hidden="true" />
              </a>
              <button type="button" onClick={openContact} className="btn-secondary">
                Let&apos;s Talk
              </button>
            </motion.div>

            <motion.p
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hero__footnote"
            >
              {SITE.tagline}
            </motion.p>
          </div>

          {/* Right column — terminal */}
          <motion.div
            className="hero__terminal-wrap w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <AnimatedTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
