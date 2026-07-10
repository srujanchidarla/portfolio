"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  label: string;
  detail: string;
}

const STATS: Stat[] = [
  {
    value: 2,
    suffix: "M+",
    label: "Daily Requests Handled",
    detail: "across distributed microservices at scale",
  },
  {
    value: 99.9,
    suffix: "%",
    decimals: 1,
    label: "System Uptime",
    detail: "across all production systems",
  },
  {
    value: 4.0,
    suffix: "/4.0",
    decimals: 1,
    label: "GPA (Masters, CS)",
    detail: "Master of Science in Computer Science",
  },
];

function AnimatedCounter({
  value,
  suffix,
  prefix = "",
  decimals = 0,
  inView,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  inView: boolean;
}) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(v.toFixed(decimals)));
  }, [spring, decimals]);

  return (
    <>
      {prefix}
      <span>{display}</span>
      {suffix}
    </>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="stats-band" aria-label="Key metrics">
      <div ref={ref} className="wrap">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="stat-card__value">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  decimals={stat.decimals}
                  inView={inView}
                />
              </div>
              <p className="stat-card__label">{stat.label}</p>
              <p className="stat-card__detail">{stat.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
