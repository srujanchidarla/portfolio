"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LOCAL_GUIDE, SITE, SITE_IMAGES } from "@/lib/site";
import { STORY_BEATS } from "@/lib/recruiter-home";

export default function TheStory() {
  const [active, setActive] = useState(STORY_BEATS.length - 1);

  return (
    <section id="story" className="rh-story">
      <div className="wrap">
        <motion.header
          className="rh-section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="section-eyebrow">Beyond code</p>
          <h2 className="section-title">
            Why I&apos;m <span className="gradient-text">ready</span>
          </h2>
          <p className="section-subtitle">
            Athlete, learner, builder — not a leadership résumé, but a complete person excited for
            my first full-time opportunity.
          </p>
        </motion.header>

        <div className="rh-story__timeline">
          {STORY_BEATS.map((beat, i) => (
            <button
              key={beat.year}
              type="button"
              className={`rh-story__beat${active === i ? " is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="rh-story__year">{beat.year}</span>
              <span className="rh-story__beat-title">{beat.title}</span>
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          className="rh-story__panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="rh-story__highlight">{STORY_BEATS[active].highlight}</p>
          <p className="rh-story__text">{STORY_BEATS[active].text}</p>
        </motion.div>

        <a
          href={SITE.localGuide}
          target="_blank"
          rel="noopener noreferrer"
          className="rh-story__local-guide"
          aria-label="View Srujan's Google Local Guide Level 9 profile on Google Maps"
        >
          <div className="rh-story__local-guide-media">
            <Image
              src={SITE_IMAGES.localGuide}
              alt="Google Local Guide Level 9 — Srujan Chidarla · 10k+ contributions, 52k+ points, 58M+ views"
              width={720}
              height={900}
              className="rh-story__local-guide-img"
              sizes="(max-width: 768px) 100vw, 280px"
            />
          </div>
          <div className="rh-story__local-guide-body">
            <p className="rh-story__local-guide-eyebrow">Google Maps</p>
            <h3>Local Guide Level {LOCAL_GUIDE.level}</h3>
            <p>
              I document places as I explore — the same curiosity and attention to detail I bring
              to product UX and shipping.
            </p>
            <div className="rh-story__local-guide-stats">
              <div>
                <strong>{LOCAL_GUIDE.contributions}</strong>
                <span>contributions</span>
              </div>
              <div>
                <strong>{LOCAL_GUIDE.points}</strong>
                <span>points</span>
              </div>
              <div>
                <strong>{LOCAL_GUIDE.views}</strong>
                <span>views</span>
              </div>
            </div>
            <span className="rh-story__link">
              See what I&apos;ve posted to Google Maps
              <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </div>
        </a>

        <div className="rh-story__grid">
          <div className="rh-story__card">
            <h3>Athletics</h3>
            <p>
              I play almost every sport — handball, track, volleyball, badminton, basketball,
              cricket, football, and more. State-level medals taught me discipline, multitasking,
              and team mentality. Same energy I bring to sprint planning and shipping deadlines.
            </p>
            <a href="/about#athlete" className="rh-story__link">
              See athlete gallery
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="rh-story__card">
            <h3>Always learning</h3>
            <p>
              I&apos;m constantly exploring — AI/ML through Neocortex, networking through coursework,
              new frameworks through side projects. 18+ certifications, hackathons, and a curiosity
              that doesn&apos;t switch off when class ends.
            </p>
          </div>

          <div className="rh-story__card">
            <h3>Neocortex ambition</h3>
            <p>
              My most ambitious side project: a 15-agent local-first life OS. It&apos;s not finished —
              but it shows I&apos;m willing to take on hard problems, learn unfamiliar stacks, and
              stay disciplined over months of building.
            </p>
            <a
              href="https://github.com/srujanchidarla/neocortex"
              target="_blank"
              rel="noopener noreferrer"
              className="rh-story__link"
            >
              View Neocortex on GitHub
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="rh-story__card">
            <h3>Why I&apos;m excited</h3>
            <p>
              I want a team with mentorship, psychological safety to ask questions, and a culture
              where junior engineers ship real code. I&apos;m not looking for the biggest title — I&apos;m
              looking for the right place to grow into the engineer I know I can become.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
