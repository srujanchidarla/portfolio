"use client";

import { useEffect } from "react";
import { useBoot } from "@/components/BootProvider";

/** The page is the introduction. Metrics can count as soon as the hero is on screen. */
export default function BootLoader() {
  const { markBootReady } = useBoot();

  useEffect(() => {
    markBootReady();
  }, [markBootReady]);

  return null;
}
