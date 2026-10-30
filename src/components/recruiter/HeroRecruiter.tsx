"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { LEETCODE_STREAK, LOCAL_GUIDE, SITE, SITE_IMAGES } from "@/lib/site";
import { useContact } from "@/components/ContactProvider";
import HeroIdentityReel from "@/components/recruiter/HeroIdentityReel";
import { HERO_PRODUCT_LOGOS } from "@/lib/hero-reel";
import {
  GitHubLogo,
  GmailLogo,
  LeetCodeLogo,
  LinkedInLogo,
  MapsLogo,
} from "@/components/fx/BrandLogos";

const TICKER = [
  "2M+ requests/day in production",
  "99.9% uptime",
  "MS CS · 4.0 GPA",
  "7 apps shipped",
  "JobHuntOS on the Chrome Web Store",
  `LeetCode ${LEETCODE_STREAK.title}`,
  `Google Local Guide L${LOCAL_GUIDE.level} · ${LOCAL_GUIDE.views} views`,
  "State-level handball & 4×100m relay",
];

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
      const next = to * (1 - Math.pow(1 - progress, 3));
      setValue(decimals > 0 ? Number(next.toFixed(decimals)) : Math.round(next));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setValue(to);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, delay, duration, decimals, reduce]);

  return decimals > 0 ? value.toFixed(decimals) : value.toLocaleString("en-US");
}

function Stat({ label, finalText, children }: { label: string; finalText: string; children: ReactNode }) {
  return (
    <div className="hx__stat" aria-label={`${finalText} ${label}`}>
      <span className="hx__stat-value" aria-hidden="true">
        <span className="hx__stat-live">{children}</span>
        <span className="hx__stat-sizer">{finalText}</span>
      </span>
      <span className="hx__stat-label" aria-hidden="true">
        {label}
      </span>
    </div>
  );
}

function HeroStats() {
  return (
    <div className="hx__stats">
      <Stat label="GPA, MS CS" finalText="4.0">
        <CountUp to={4} delay={500} duration={1200} decimals={1} />
      </Stat>
      <Stat label="Requests / day" finalText="2M+">
        <CountUp to={2} delay={420} duration={1300} />
        M+
      </Stat>
      <Stat label="Apps shipped" finalText="7">
        <CountUp to={7} delay={650} duration={1000} />
      </Stat>
      <Stat label="Day DSA badge" finalText={String(LEETCODE_STREAK.days)}>
        <CountUp to={LEETCODE_STREAK.days} delay={760} duration={1300} />
      </Stat>
    </div>
  );
}

const SOCIALS = [
  { href: SITE.github, label: "GitHub", Logo: GitHubLogo, external: true },
  { href: SITE.linkedin, label: "LinkedIn", Logo: LinkedInLogo, external: true },
  { href: SITE.leetcode, label: "LeetCode", Logo: LeetCodeLogo, external: true },
  { href: `mailto:${SITE.email}`, label: "Email", Logo: GmailLogo, external: false },
  { href: SITE.localGuide, label: "Google Local Guide", Logo: MapsLogo, external: true },
];

function HeroSocials() {
  return (
    <ul className="hx__socials" aria-label="Profiles">
      {SOCIALS.map(({ href, label, Logo, external }) => (
        <li key={label}>
          <a
            href={href}
            className="hx__social"
            aria-label={label}
            title={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <Logo className="hx__social-svg" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function SignedWord({ word, delay, step }: { word: string; delay: number; step: number }) {
  return word.split("").map((letter, index) => (
    <span
      key={`${word}-${index}`}
      className="hx__letter"
      style={{ animationDelay: `${(delay + index * step).toFixed(2)}s` }}
    >
      {letter}
    </span>
  ));
}

/** Outer lane (inset 40 in a 900×640 box), run counter-clockwise like a real race. */
const OUTER_LANE = "M450 600 H580 A280 280 0 0 0 580 40 H320 A280 280 0 0 0 320 600 Z";

/** Concentric stadium lanes drawn behind the portrait. */
function TrackLanes() {
  const lanes = [0, 1, 2, 3, 4, 5];
  return (
    <svg className="hx__lanes" viewBox="0 0 900 640" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {lanes.map((lane) => {
        const inset = 40 + lane * 38;
        const w = 900 - inset * 2;
        const h = 640 - inset * 2;
        return (
          <rect
            key={lane}
            x={inset}
            y={inset}
            width={w}
            height={h}
            rx={h / 2}
            pathLength={1}
            className="hx__lane"
            style={{ animationDelay: `${0.2 + lane * 0.12}s` }}
          />
        );
      })}
      {lanes.slice(0, 5).map((lane) => (
        <text key={lane} x={454} y={640 - 40 - lane * 38 - 12} className="hx__lane-num">
          {5 - lane}
        </text>
      ))}
      <line x1="450" y1="400" x2="450" y2="600" className="hx__lane-start" />
      {/* A runner on the outer lane: a fading trail with a bright head. */}
      <g className="hx__runner">
        <path d={OUTER_LANE} pathLength={1} className="hx__runner-trail" />
        <path d={OUTER_LANE} pathLength={1} className="hx__runner-head" />
      </g>
    </svg>
  );
}

function AthleteCard() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduce || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 9).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 11).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="hx-card" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="hx-card__inner">
        <div className="hx-card__head">
          <span>New grad SWE</span>
          <span>United States</span>
        </div>
        <div className="hx-card__photo">
          <Image
            src={SITE_IMAGES.hero}
            alt="Portrait of Srujan Chidarla"
            fill
            priority
            sizes="(max-width: 860px) 70vw, 360px"
          />
        </div>
        <div className="hx-card__foot">
          <div>
            <strong>Srujan Chidarla</strong>
            <span>Entry-level · MS CS ’26</span>
          </div>
          <span className="hx-card__bib" aria-hidden="true">
            26
          </span>
        </div>
        <span className="hx-card__pin hx-card__pin--tl" aria-hidden="true" />
        <span className="hx-card__pin hx-card__pin--tr" aria-hidden="true" />
        <span className="hx-card__sheen" aria-hidden="true" />
      </div>
    </div>
  );
}

function Ticker() {
  const items = TICKER.map((item) => (
    <li key={item}>
      <span className="hx-ticker__star" aria-hidden="true">
        ✦
      </span>
      {item}
    </li>
  ));
  return (
    <div className="hx-ticker" aria-label="Highlights">
      <ul className="hx-ticker__row">{items}</ul>
      <ul className="hx-ticker__row" aria-hidden="true">
        {items}
      </ul>
    </div>
  );
}

export default function HeroRecruiter() {
  const { openContact } = useContact();

  return (
    <section id="hero" className="hx">
      <div className="hx__bg" aria-hidden="true">
        <span className="hx__glow" />
        <span className="hx__grid-lines" />
      </div>

      <div className="wrap hx__layout">
        <div className="hx__copy">
          <h1 className="hx__name" aria-label="Srujan Chidarla">
            <span className="hx__first" aria-hidden="true">
              <SignedWord word="Srujan" delay={0.15} step={0.06} />
            </span>
            <span className="hx__last" aria-hidden="true">
              <SignedWord word="Chidarla" delay={0.55} step={0.06} />
            </span>
          </h1>

          <p className="hx__lede hx-in" style={{ animationDelay: "0.85s" }}>
            I build systems that stay up,
            <br />
            <em>and products people come back to.</em>
          </p>

          <div className="hx__metrics hx-in" style={{ animationDelay: "0.95s" }}>
            <HeroStats />
          </div>

          <div className="hx__actions hx-in" style={{ animationDelay: "1.05s" }}>
            <a href="#projects" className="btn-primary">
              View my work
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            <button type="button" onClick={openContact} className="btn-secondary">
              Let&apos;s connect
            </button>
          </div>

          <div className="hx__social-row hx-in" style={{ animationDelay: "1.15s" }}>
            <HeroSocials />
          </div>

          <ul className="hx__apps hx-in" style={{ animationDelay: "1.2s" }} aria-label="Live products">
            {HERO_PRODUCT_LOGOS.map((product) => (
              <li key={product.id}>
                <a href={product.liveUrl} target="_blank" rel="noopener noreferrer" className="hx__app">
                  <span className="hx__app-logo" aria-hidden="true">
                    <Image src={product.image} alt="" width={28} height={28} />
                  </span>
                  <span className="hx__app-copy">
                    <strong>{product.title}</strong>
                    <span>{product.blurb}</span>
                  </span>
                  <ArrowUpRight size={15} aria-hidden="true" className="hx__app-go" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hx__stage">
          <TrackLanes />
          <AthleteCard />
          <aside className="hx__reel-dock" aria-label="Highlights reel">
            <HeroIdentityReel compact />
          </aside>
        </div>
      </div>

      <Ticker />
    </section>
  );
}
