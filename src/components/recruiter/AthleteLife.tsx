"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ATHLETE_MEDIA } from "@/lib/site";
import { SPORTS } from "@/lib/recruiter-home";

export default function AthleteLife() {
  return (
    <section id="athlete" className="rh-athlete">
      <div className="wrap">
        <motion.header
          className="rh-section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="section-eyebrow">Off the field</p>
          <h2 className="section-title">
            Athlete <span className="gradient-text">discipline</span>
          </h2>
          <p className="section-subtitle">
            Track, gym, and multi-sport training — the same consistency that shows up as 99.9%
            uptime thinking, long-running AI side projects, and finishing products end-to-end.
          </p>
        </motion.header>

        <div className="rh-athlete__sports" aria-label="Sports I play">
          {SPORTS.map((sport) => (
            <span key={sport} className="rh-athlete__sport">
              {sport}
            </span>
          ))}
        </div>

        <div className="rh-athlete__grid">
          {ATHLETE_MEDIA.map((item, i) => (
            <motion.figure
              key={item.id}
              className={`rh-athlete__card rh-athlete__card--${item.span}${
                item.type === "video" ? " rh-athlete__card--video" : ""
              }`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="rh-athlete__media">
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="rh-athlete__img"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <video
                    className="rh-athlete__video"
                    src={item.src}
                    muted
                    playsInline
                    loop
                    autoPlay
                    preload="metadata"
                    aria-label={item.alt}
                  />
                )}
              </div>
              <figcaption className="rh-athlete__caption">
                <span className="rh-athlete__label">{item.label}</span>
                <span className="rh-athlete__text">{item.caption}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
