"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  HERO_REEL_CERT_INTERVAL_MS,
  HERO_REEL_INTERVAL_MS,
  HERO_REEL_ITEMS,
  type HeroReelItem,
} from "@/lib/hero-reel";

const SLIDE_HEIGHT = 236;

function ReelCard({ item, certIndex }: { item: HeroReelItem; certIndex: number }) {
  if (item.kind === "text") {
    return (
      <div className="hero__reel-text">
        <p className="hero__reel-lead">{item.lead}</p>
        <p className="hero__reel-line">
          I train most days
          <br />
          and ship the rest.
        </p>
      </div>
    );
  }

  const gallery = item.images?.length ? item.images : [item.image];
  const image = gallery[certIndex % gallery.length] ?? item.image;

  return (
    <div className="hero__reel-card">
      <span className={`hero__reel-media${item.mediaClass ? ` ${item.mediaClass}` : ""}`}>
        {item.images?.length ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={image}
              className="hero__reel-cert"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="220px"
                className="hero__reel-img"
                style={{ objectPosition: item.objectPosition }}
              />
            </motion.span>
          </AnimatePresence>
        ) : (
          <Image
            src={image}
            alt=""
            fill
            sizes="220px"
            className="hero__reel-img"
            style={
              item.mediaClass?.includes("logo")
                ? undefined
                : { objectPosition: item.objectPosition }
            }
          />
        )}
      </span>
      <span className="hero__reel-meta">
        <span className="hero__reel-eyebrow">{item.eyebrow}</span>
        <strong>{item.title}</strong>
        {item.blurb ? <span className="hero__reel-blurb">{item.blurb}</span> : null}
      </span>
    </div>
  );
}

export default function HeroIdentityReel() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [certIndex, setCertIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = HERO_REEL_ITEMS[index] ?? HERO_REEL_ITEMS[0];
  const sportsGallery =
    active.kind === "media" && active.images?.length ? active.images : null;

  useEffect(() => {
    if (reduceMotion || paused) return;

    if (sportsGallery) {
      const id = window.setTimeout(() => {
        if (certIndex + 1 < sportsGallery.length) {
          setCertIndex(certIndex + 1);
          return;
        }
        setCertIndex(0);
        setIndex((current) => (current + 1) % HERO_REEL_ITEMS.length);
      }, HERO_REEL_CERT_INTERVAL_MS);
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(() => {
      setIndex((current) => {
        const next = (current + 1) % HERO_REEL_ITEMS.length;
        const nextItem = HERO_REEL_ITEMS[next];
        if (nextItem?.kind === "media" && nextItem.images?.length) setCertIndex(0);
        return next;
      });
    }, HERO_REEL_INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [certIndex, index, paused, reduceMotion, sportsGallery]);

  return (
    <div
      className={`hero__reel${paused ? " is-paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="hero__reel-viewport" aria-live="polite">
        {reduceMotion ? (
          <div className="hero__reel-slide is-static">
            <a href={active.href} className="hero__reel-link" aria-label={`Open ${active.label}`}>
              <ReelCard item={active} certIndex={0} />
            </a>
          </div>
        ) : (
          <motion.div
            className="hero__reel-track"
            animate={{ y: -index * SLIDE_HEIGHT }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {HERO_REEL_ITEMS.map((item) => (
              <div key={item.id} className="hero__reel-slide">
                <a
                  href={item.href}
                  className="hero__reel-link"
                  aria-label={`Open ${item.label}`}
                  tabIndex={item.id === active.id ? 0 : -1}
                >
                  <ReelCard
                    item={item}
                    certIndex={item.id === "sports" ? certIndex : 0}
                  />
                </a>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
