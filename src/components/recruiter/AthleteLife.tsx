"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ATHLETE_MEDIA } from "@/lib/site";
import { SPORTS } from "@/lib/recruiter-home";

function StrengthCarousel({
  slides,
  label,
  caption,
}: {
  slides: readonly { src: string; alt: string }[];
  label: string;
  caption: string;
}) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  useEffect(() => {
    if (total <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 4200);
    return () => window.clearInterval(id);
  }, [total]);

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + total) % total);
  };

  return (
    <>
      <div
        className="rh-athlete__media rh-athlete__media--carousel"
        style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`rh-athlete__slide${i === index ? " is-active" : ""}`}
            aria-hidden={i !== index}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="rh-athlete__img rh-athlete__img--portrait"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className="rh-athlete__carousel-controls">
        <button
          type="button"
          className="rh-athlete__nav-btn"
          onClick={() => go(-1)}
          aria-label="Previous strength photo"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="rh-athlete__dots">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              className={`rh-athlete__dot${i === index ? " is-active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Show strength photo ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          className="rh-athlete__nav-btn"
          onClick={() => go(1)}
          aria-label="Next strength photo"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <figcaption className="rh-athlete__caption">
        <span className="rh-athlete__label">{label}</span>
        <span className="rh-athlete__text">{caption}</span>
      </figcaption>
    </>
  );
}

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
            Track, gym, and multi-sport training — the same consistency I bring to learning,
            shipping, and showing up for a team.
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
                item.type === "carousel" ? " rh-athlete__card--carousel" : ""
              }`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              {"slides" in item && item.slides ? (
                <StrengthCarousel
                  slides={item.slides}
                  label={item.label}
                  caption={item.caption}
                />
              ) : (
                <>
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
                </>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
