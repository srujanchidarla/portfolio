"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SITE_IMAGES } from "@/lib/site";
import { SPORTS, STORY_BEATS } from "@/lib/recruiter-home";

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

        <motion.div
          className="rh-story__photos"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <figure className="rh-story__photo rh-story__photo--main">
            <Image
              src={SITE_IMAGES.story}
              alt="Srujan Chidarla smiling outdoors — athlete and builder"
              width={640}
              height={960}
              className="rh-story__photo-img"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <figcaption className="rh-story__photo-caption">
              Athlete energy off the field — same discipline I bring to sprint planning.
            </figcaption>
          </figure>

          <figure className="rh-story__photo rh-story__photo--secondary">
            <Image
              src={SITE_IMAGES.coding}
              alt="Srujan Chidarla coding on a MacBook at a café"
              width={480}
              height={640}
              className="rh-story__photo-img"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <figcaption className="rh-story__photo-caption">
              Side projects don&apos;t stop when class ends.
            </figcaption>
          </figure>
        </motion.div>

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

        <div className="rh-story__grid">
          <div className="rh-story__card">
            <h3>Athletics</h3>
            <p>
              I play almost every sport — handball, track, volleyball, badminton, basketball,
              cricket, football, and more. State-level medals taught me discipline, multitasking,
              and team mentality. Same energy I bring to sprint planning and shipping deadlines.
            </p>
            <div className="rh-story__sports">
              {SPORTS.map((sport) => (
                <span key={sport} className="rh-story__sport-pill">
                  {sport}
                </span>
              ))}
            </div>
            <a href="#athlete" className="rh-story__link">
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
