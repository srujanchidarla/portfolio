"use client";

import { useEffect, useRef, useState } from "react";
import { useBoot } from "@/components/BootProvider";

const BOOT_FRAMES = [
  { emoji: "🏃", label: "Warming up" },
  { emoji: "🏋️", label: "Building strength" },
  { emoji: "💻", label: "Booting systems" },
  { emoji: "⚖️", label: "Balancing load" },
  { emoji: "🤖", label: "Routing models" },
  { emoji: "📡", label: "Syncing signals" },
  { emoji: "🚀", label: "Ready to ship" },
] as const;

const BOOT_SEEN_KEY = "portfolio-boot-seen";
/** Must match CSS stage timing (7 × 0.8s) */
const TOTAL_MS = 5600;
const EXIT_MS = 480;

export default function BootLoader() {
  const { markBootReady } = useBoot();
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const markBootReadyRef = useRef(markBootReady);
  markBootReadyRef.current = markBootReady;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      markBootReadyRef.current();
      return;
    }

    try {
      if (sessionStorage.getItem(BOOT_SEEN_KEY)) {
        setShow(false);
        markBootReadyRef.current();
        return;
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
        markBootReadyRef.current();
      }, EXIT_MS);
    }, TOTAL_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(leaveId);
      document.body.classList.remove("boot-loading");
    };
  }, []);

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
      <div className="boot-hybrid">
        <div className="boot-hybrid__track" aria-hidden="true">
          <span className="boot-hybrid__lane" />
          {BOOT_FRAMES.map((item) => (
            <span key={item.label} className="boot-hybrid__runner">
              {item.emoji}
            </span>
          ))}
        </div>

        <div className="boot-hybrid__identity">
          <p className="boot-hybrid__name">Srujan Chidarla</p>
          <p className="boot-hybrid__theme">
            <span>CODE</span>
            <i aria-hidden="true">×</i>
            <span>DISCIPLINE</span>
          </p>
        </div>

        <div className="boot-hybrid__terminal">
          <span className="boot-hybrid__prompt" aria-hidden="true">
            &gt;
          </span>
          <div className="boot-hybrid__labels">
            {BOOT_FRAMES.map((item) => (
              <p key={item.label} className="boot-hybrid__label">
                {item.label}
                <span className="boot-hybrid__cursor" aria-hidden="true" />
              </p>
            ))}
          </div>
        </div>

        <div className="boot-hybrid__bar" aria-hidden="true">
          <span />
        </div>

        <div className="boot-hybrid__pipeline" aria-hidden="true">
          {BOOT_FRAMES.map((item) => (
            <span key={item.label} className="boot-hybrid__dot">
              {item.emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
