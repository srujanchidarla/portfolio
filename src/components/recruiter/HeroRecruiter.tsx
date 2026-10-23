"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SITE, SITE_IMAGES } from "@/lib/site";
import { ALGOCHRONICLE } from "@/lib/algochronicle";
import { useContact } from "@/components/ContactProvider";

function GitHubLogo() {
  return (
    <svg viewBox="0 0 496 512" className="hero__social-svg hero__social-svg--github" aria-hidden="true">
      <path
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
        fill="currentColor"
      />
    </svg>
  );
}

function LeetCodeLogo() {
  return (
    <svg viewBox="0 0 24 24" className="hero__social-svg" aria-hidden="true">
      <path
        fill="#FFA116"
        d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"
      />
    </svg>
  );
}

function LinkedInLogo() {
  return (
    <svg viewBox="0 0 448 512" className="hero__social-svg" aria-hidden="true">
      <path
        d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
        fill="#0A66C2"
      />
    </svg>
  );
}

function GmailLogo() {
  return (
    <svg viewBox="0 0 48 48" className="hero__social-svg" aria-hidden="true">
      <path fill="#4caf50" d="M45 16.2 35 23.7V40h7c1.657 0 3-1.343 3-3V16.2z" />
      <path fill="#1e88e5" d="M3 16.2 13 23.7V40H6c-1.657 0-3-1.343-3-3V16.2z" />
      <path fill="#e53935" d="m35 11.2-11 8.25-11-8.25-1 4.8 12 9 12-9z" />
      <path fill="#c62828" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859A4.298 4.298 0 0 0 7.298 8C4.924 8 3 9.924 3 12.298z" />
      <path fill="#fbc02d" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341A4.298 4.298 0 0 1 40.702 8C43.076 8 45 9.924 45 12.298z" />
    </svg>
  );
}

function MapsLogo() {
  return (
    <svg viewBox="0 0 24 24" className="hero__social-svg" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      />
      <circle cx="12" cy="9" r="2.6" fill="#fff" />
    </svg>
  );
}

function AlgoLive() {
  return (
    <a
      href={ALGOCHRONICLE.siteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hero__launch"
    >
      <span className="hero__launch-dot" aria-hidden="true" />
      AlgoChronicle is live
      <ArrowRight size={13} className="hero__launch-arrow" aria-hidden="true" />
    </a>
  );
}

function CountUp({
  to,
  delay,
  duration,
  decimals = 0,
}: {
  to: number;
  delay: number;
  duration: number;
  decimals?: number;
}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }

    let frame = 0;
    const startAt = performance.now() + delay;
    const tick = (now: number) => {
      const elapsed = now - startAt;
      if (elapsed < 0) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, elapsed / duration);
      const eased = to > 20 ? 1 - Math.pow(1 - progress, 3) : progress;
      const next = to * eased;
      setValue(decimals > 0 ? Number(next.toFixed(decimals)) : Math.round(next));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setValue(to);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, delay, duration, decimals, reduce]);

  if (decimals > 0) return value.toFixed(decimals);
  return value.toLocaleString("en-US");
}

function Metric({
  label,
  finalText,
  value,
}: {
  label: string;
  finalText: string;
  value: ReactNode;
}) {
  return (
    <div className="hero__metric" aria-label={`${finalText} ${label}`}>
      <span className="hero__metric-value">
        <span className="hero__metric-count" aria-hidden="true">
          {value}
        </span>
        <span className="hero__metric-count hero__metric-count--sizer" aria-hidden="true">
          {finalText}
        </span>
      </span>
      <span aria-hidden="true">{label}</span>
    </div>
  );
}

function HeroProof({ centered = false }: { centered?: boolean }) {
  return (
    <div className={centered ? "hero__proof hero__proof--center" : "hero__proof"}>
      <div className="hero__proof-metrics">
        <Metric
          label="GPA"
          finalText="4.0/4.0"
          value={
            <>
              <CountUp to={4} delay={550} duration={1200} decimals={1} />
              /4.0
            </>
          }
        />
        <Metric
          label="req/day"
          finalText="1,999,999+"
          value={
            <>
              <CountUp to={1999999} delay={450} duration={1800} />+
            </>
          }
        />
        <Metric
          label="apps shipped"
          finalText="7"
          value={<CountUp to={7} delay={700} duration={1000} />}
        />
      </div>
    </div>
  );
}

function HeroSocials({ centered = false }: { centered?: boolean }) {
  return (
    <div className={`hero__socials${centered ? " hero__socials--center" : ""}`}>
      <a
        href={SITE.github}
        target="_blank"
        rel="noopener noreferrer"
        className="hero__social hero__social--github"
        aria-label="GitHub"
      >
        <GitHubLogo />
      </a>
      <a
        href={SITE.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="hero__social"
        aria-label="LinkedIn"
      >
        <LinkedInLogo />
      </a>
      <a
        href={SITE.leetcode}
        target="_blank"
        rel="noopener noreferrer"
        className="hero__social"
        aria-label="LeetCode"
      >
        <LeetCodeLogo />
      </a>
      <a href={`mailto:${SITE.email}`} className="hero__social" aria-label="Email">
        <GmailLogo />
      </a>
      <a
        href={SITE.localGuide}
        target="_blank"
        rel="noopener noreferrer"
        className="hero__social"
        aria-label="Google Local Guide"
      >
        <MapsLogo />
      </a>
    </div>
  );
}

function SignedWord({
  word,
  delay,
  step,
}: {
  word: string;
  delay: number;
  step: number;
}) {
  return word.split("").map((letter, index) => (
    <span
      key={`${word}-${index}`}
      className="hero__sign-letter"
      style={{ animationDelay: `${(delay + index * step).toFixed(2)}s` }}
    >
      {letter}
    </span>
  ));
}

function SignedName({ className }: { className: string }) {
  return (
    <h1 className={className} aria-label="Srujan Chidarla">
      <span className="hero__sign" aria-hidden="true">
        <SignedWord word="Srujan" delay={0.2} step={0.08} />
        <span className="hero__sign-gap"> </span>
        <em>
          <SignedWord word="Chidarla" delay={0.84} step={0.08} />
        </em>
      </span>
    </h1>
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
  const { openContact } = useContact();

  return (
    <section id="hero" className="hero">
      <div className="wrap hero__inner">
        <div className="hero__layout">
          <div className="hero__grid">
            <div className="hero__content">
              <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="hero__eyebrow"
              >
                <p className="hero__kicker">Software engineer</p>
                <AlgoLive />
              </motion.div>

              <SignedName className="hero__title" />

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="hero__role"
              >
                I build systems that stay up,
                <br />
                and products people finish.
              </motion.p>

              <HeroProof />

              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="hero__actions"
              >
                <a href="#projects" className="btn-primary">
                  View my work
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
                <button type="button" onClick={openContact} className="btn-secondary">
                  Let&apos;s connect
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <HeroSocials />
              </motion.div>
            </div>

            <div className="hero__portrait">
              <motion.aside
                className="hero__note"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="hero__note-lead">Engineer, athlete, builder.</p>
                <p className="hero__note-line">
                  I train most days
                  <br />
                  and ship the rest.
                </p>
              </motion.aside>

              <motion.div
                className="hero__visual"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="hero__photo-frame">
                  <div className="hero__glow" aria-hidden="true" />
                  <Image
                    src={SITE_IMAGES.hero}
                    alt="Portrait of Srujan Chidarla"
                    fill
                    priority
                    className="hero__photo"
                    sizes="300px"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <section className="hero__mobile-card" aria-label="Srujan Chidarla profile">
        <div className="hero__mobile-content">
          <div className="hero__eyebrow hero__eyebrow--center">
            <p className="hero__kicker hero__kicker--mobile">Software engineer</p>
            <AlgoLive />
          </div>

          <SignedName className="hero__mobile-title" />
          <p className="hero__mobile-caption">
            I build systems that stay up,
            <br />
            and products people finish.
          </p>

          <HeroProof centered />

          <div className="hero__mobile-actions">
            <a href="#projects" className="btn-primary hero__mobile-cta-primary">
              View my work
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            <button type="button" onClick={openContact} className="btn-secondary">
              Let&apos;s connect
            </button>
          </div>

          <HeroSocials centered />
        </div>

        <div className="hero__mobile-portrait">
          <aside className="hero__note">
            <p className="hero__note-lead">Engineer, athlete, builder.</p>
            <p className="hero__note-line">
              I train most days
              <br />
              and ship the rest.
            </p>
          </aside>
          <div className="hero__mobile-photo-wrap">
            <div className="hero__glow" aria-hidden="true" />
            <Image
              src={SITE_IMAGES.hero}
              alt="Portrait of Srujan Chidarla"
              fill
              priority
              className="hero__mobile-photo"
              sizes="220px"
            />
          </div>
        </div>
      </section>
    </section>
  );
}
