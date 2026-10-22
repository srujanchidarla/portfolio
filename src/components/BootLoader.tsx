"use client";

import { useEffect, useState } from "react";
import { useBoot } from "@/components/BootProvider";

const BOOT_SEEN_KEY = "portfolio-boot-seen";
const BOOT_MS = 980;
const EXIT_MS = 280;

export default function BootLoader() {
  const { markBootReady } = useBoot();
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const skipId = window.setTimeout(() => {
        setShow(false);
        markBootReady();
      }, 0);
      return () => window.clearTimeout(skipId);
    }

    try {
      if (sessionStorage.getItem(BOOT_SEEN_KEY)) {
        const skipId = window.setTimeout(() => {
          setShow(false);
          markBootReady();
        }, 0);
        return () => window.clearTimeout(skipId);
      }
    } catch {
      /* private browsing */
    }

    let cancelled = false;
    document.body.classList.add("boot-loading");

    const leaveId = window.setTimeout(() => {
      if (cancelled) return;
      setLeaving(true);
      window.setTimeout(() => {
        if (cancelled) return;
        try {
          sessionStorage.setItem(BOOT_SEEN_KEY, "1");
        } catch {
          /* ignore */
        }
        setShow(false);
        markBootReady();
      }, EXIT_MS);
    }, BOOT_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(leaveId);
      document.body.classList.remove("boot-loading");
    };
  }, [markBootReady]);

  useEffect(() => {
    if (!show) document.body.classList.remove("boot-loading");
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`boot-loader${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="boot-splash">
        <p className="boot-splash__kicker">Portfolio</p>
        <p className="boot-hybrid__name">Srujan Chidarla</p>
        <p className="boot-splash__line">Systems · products · discipline</p>
        <div className="boot-hybrid__bar" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
