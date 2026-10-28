"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ATHLETE_MEDIA, SPORTS_CERTIFICATES } from "@/lib/site";
import { SPORTS } from "@/lib/recruiter-home";

const VIDEO = ATHLETE_MEDIA.find((item) => item.type === "video")!;
const STILLS = ATHLETE_MEDIA.filter((item) => item.type === "image");
const CERTS = SPORTS_CERTIFICATES;

export default function AthleteLife() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const active = activeIndex === null ? null : CERTS[activeIndex];

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setActiveIndex(null), []);

  const openAt = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + CERTS.length - 1) % CERTS.length));
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % CERTS.length));
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>('button[aria-label="Close certificate"]')
        ?.focus();
    });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [activeIndex, close, showPrev, showNext]);

  return (
    <section id="athlete" className="rh-athlete">
      <div className="wrap">
        <header className="rh-athlete__header">
          <p className="section-eyebrow">Off the field</p>
          <h2 className="section-title">
            Athlete <span className="gradient-text">discipline</span>
          </h2>
          <p className="rh-athlete__lede">
            Same daily reps that ship products — track, gym, and multi-sport.
          </p>
          <p className="rh-athlete__sports" aria-label="Sports I play">
            {SPORTS.join(" · ")}
          </p>
        </header>

        <div className="rh-athlete__stage">
          <motion.figure
            className="rh-athlete__feature"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35 }}
          >
            <video
              className="rh-athlete__feature-media"
              src={VIDEO.src}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              aria-label={VIDEO.alt}
            />
            <figcaption className="rh-athlete__shot-cap">{VIDEO.label}</figcaption>
          </motion.figure>

          <div className="rh-athlete__aside">
            <div className="rh-athlete__stills">
              {STILLS.map((item, i) => (
                <motion.figure
                  key={item.id}
                  className={`rh-athlete__still rh-athlete__still--${item.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: 0.05 + i * 0.05 }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="rh-athlete__still-img"
                    sizes="(max-width: 768px) 50vw, 28vw"
                  />
                  <figcaption className="rh-athlete__shot-cap">{item.label}</figcaption>
                </motion.figure>
              ))}
            </div>

            <div className="rh-athlete__proof">
              <p className="rh-athlete__proof-label">State sports · medals</p>
              <div className="rh-athlete__strip" role="list">
                {CERTS.map((cert, index) => (
                  <button
                    key={cert.id}
                    type="button"
                    className="rh-athlete__thumb"
                    role="listitem"
                    title={`${cert.title} — ${cert.detail}`}
                    aria-label={`View certificate: ${cert.title}, ${cert.detail}`}
                    onClick={() => openAt(index)}
                  >
                    <Image
                      src={cert.src}
                      alt=""
                      fill
                      className="rh-athlete__thumb-img"
                      sizes="140px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {active && activeIndex !== null ? (
              <motion.div
                className="rh-athlete-lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={close}
                role="presentation"
              >
                <motion.div
                  ref={dialogRef}
                  className="rh-athlete-lightbox__dialog"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="rh-athlete-lightbox__close"
                    aria-label="Close certificate"
                    onClick={close}
                  >
                    <X size={18} strokeWidth={2.2} />
                  </button>

                  <button
                    type="button"
                    className="rh-athlete-lightbox__nav rh-athlete-lightbox__nav--prev"
                    aria-label="Previous certificate"
                    onClick={showPrev}
                  >
                    <ChevronLeft size={22} strokeWidth={2.2} />
                  </button>

                  <div className="rh-athlete-lightbox__frame">
                    <Image
                      src={active.src}
                      alt={active.alt}
                      width={1600}
                      height={1180}
                      className="rh-athlete-lightbox__img"
                      sizes="(max-width: 900px) 92vw, 860px"
                      priority
                    />
                  </div>

                  <button
                    type="button"
                    className="rh-athlete-lightbox__nav rh-athlete-lightbox__nav--next"
                    aria-label="Next certificate"
                    onClick={showNext}
                  >
                    <ChevronRight size={22} strokeWidth={2.2} />
                  </button>

                  <div className="rh-athlete-lightbox__meta">
                    <p id={titleId} className="rh-athlete-lightbox__title">
                      {active.title}
                    </p>
                    <p className="rh-athlete-lightbox__detail">
                      {active.detail}
                      <span className="rh-athlete-lightbox__count" aria-hidden="true">
                        {" "}
                        · {activeIndex + 1}/{CERTS.length}
                      </span>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
