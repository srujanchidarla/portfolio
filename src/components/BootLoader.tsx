"use client";

import { useEffect, useState } from "react";
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
const MIN_MS = 1200;
const FRAME_MS = 280;

export default function BootLoader() {
  const { markBootReady } = useBoot();
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [frame, setFrame] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      markBootReady();
      return;
    }

    try {
      if (sessionStorage.getItem(BOOT_SEEN_KEY)) {
        setShow(false);
        markBootReady();
        return;
      }
    } catch {
      /* private browsing */
    }

    let cancelled = false;
    let finished = false;
    const started = performance.now();

    document.body.classList.add("boot-loading");

    const frameTimer = window.setInterval(() => {
      setFrame((prev) => (prev + 1) % BOOT_FRAMES.length);
    }, FRAME_MS);

    const progressTimer = window.setInterval(() => {
      const elapsed = performance.now() - started;
      setProgress(Math.min(100, (elapsed / MIN_MS) * 100));
    }, 40);

    const finish = () => {
      if (cancelled || finished) return;
      finished = true;

      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      window.setTimeout(() => {
        if (cancelled) return;
        setProgress(100);
        setFrame(BOOT_FRAMES.length - 1);
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
        }, 420);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      window.setTimeout(finish, MIN_MS + 1400);
    }

    return () => {
      cancelled = true;
      window.clearInterval(frameTimer);
      window.clearInterval(progressTimer);
      window.removeEventListener("load", finish);
      document.body.classList.remove("boot-loading");
    };
  }, [markBootReady]);

  useEffect(() => {
    if (!show) document.body.classList.remove("boot-loading");
  }, [show]);

  if (!show) return null;

  const current = BOOT_FRAMES[frame];

  return (
    <div
      className={`boot-loader${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="boot-loader__track" aria-hidden="true">
        <span className="boot-loader__runner">{current.emoji}</span>
      </div>

      <p className="boot-loader__brand">Srujan Chidarla</p>
      <p className="boot-loader__label">{current.label}</p>

      <div className="boot-loader__bar" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="boot-loader__pipeline" aria-hidden="true">
        {BOOT_FRAMES.map((item, i) => (
          <span
            key={item.label}
            className={`boot-loader__dot${i === frame ? " is-active" : ""}${i < frame ? " is-done" : ""}`}
          >
            {item.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
