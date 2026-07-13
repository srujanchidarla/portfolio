"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useBoot } from "@/components/BootProvider";

export default function MetricCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { bootReady } = useBoot();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 40, damping: 18 });
  const [display, setDisplay] = useState("0");
  const started = useRef(false);

  useEffect(() => {
    if (!bootReady || !inView || started.current) return;
    started.current = true;
    motionValue.set(value);
  }, [bootReady, inView, motionValue, value]);

  useEffect(() => {
    return spring.on("change", (v) => {
      setDisplay(
        decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US")
      );
    });
  }, [spring, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
