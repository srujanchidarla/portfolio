"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import {
  AppWindow,
  Building2,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Cpu,
  Network,
  Pause,
  Play,
  RotateCcw,
  Router,
  Server,
  Signpost,
  type LucideIcon,
} from "lucide-react";
import {
  JOURNEY_ACTORS,
  JOURNEY_PHASES,
  JOURNEY_STEPS,
  MAP_TRACK,
  SHAPE_NAMES,
  actorOf,
  layerOf,
  type ActorId,
} from "@/lib/network-journey";
import { usePrefersReducedMotion } from "@/components/fx/usePrefersReducedMotion";

const ICONS: Record<ActorId, LucideIcon> = {
  browser: AppWindow,
  os: Cpu,
  router: Router,
  isp: Building2,
  dns: Signpost,
  backbone: Network,
  edge: Cloud,
  server: Server,
};

/** How long each step stays on screen while playing */
const DWELL = 2200;
const LAST = JOURNEY_STEPS.length - 1;

type Props = {
  active: number;
  playing: boolean;
  onSelect: (index: number) => void;
  onPlayingChange: (playing: boolean) => void;
};

function Lines({ tall, from, to }: { tall: boolean; from: ActorId; to: ActorId }) {
  const pos = (id: ActorId) => {
    const a = actorOf(id);
    return tall ? { x: a.mx, y: a.my } : { x: a.x, y: a.y };
  };
  const track = MAP_TRACK.map(pos);
  const isp = pos("isp");
  const dns = pos("dns");
  const a = pos(from);
  const b = pos(to);
  return (
    <svg
      className={`nm-lines nm-lines--${tall ? "tall" : "wide"}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline points={track.map((p) => `${p.x},${p.y}`).join(" ")} vectorEffect="non-scaling-stroke" />
      <line x1={isp.x} y1={isp.y} x2={dns.x} y2={dns.y} className="nm-lines__dns" vectorEffect="non-scaling-stroke" />
      {from !== to ? (
        <line
          key={`${from}-${to}`}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          className="nm-lines__hot"
          pathLength={1}
          vectorEffect="non-scaling-stroke"
        />
      ) : null}
    </svg>
  );
}

/**
 * The trip as a playable map: a packet flies between the machines involved in each step,
 * with a running clock and the step explained underneath.
 */
export default function PacketMap({ active, playing, onSelect, onPlayingChange }: Props) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const autoStarted = useRef(false);

  const step = JOURNEY_STEPS[active];
  const layer = layerOf(step.layer);
  const from = actorOf(step.from);
  const to = actorOf(step.to);
  const elapsed = JOURNEY_STEPS.slice(0, active + 1).reduce((sum, s) => sum + s.ms, 0);

  // Advance while playing; stop on the last step.
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (active >= LAST) onPlayingChange(false);
      else onSelect(active + 1);
    }, DWELL);
    return () => window.clearTimeout(timer);
  }, [playing, active, onSelect, onPlayingChange]);

  // Start playing the first time the map scrolls into view; pause whenever it leaves.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !autoStarted.current && !reduced) {
          autoStarted.current = true;
          onPlayingChange(true);
        } else if (!entry.isIntersecting) {
          onPlayingChange(false);
        }
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, onPlayingChange]);

  const go = (index: number) => {
    onPlayingChange(false);
    onSelect(Math.max(0, Math.min(LAST, index)));
  };

  const togglePlay = () => {
    if (playing) onPlayingChange(false);
    else {
      if (active >= LAST) onSelect(0);
      onPlayingChange(true);
    }
  };

  const packetStyle = {
    "--x0": `${from.x}%`,
    "--y0": `${from.y}%`,
    "--x1": `${to.x}%`,
    "--y1": `${to.y}%`,
    "--mx0": `${from.mx}%`,
    "--my0": `${from.my}%`,
    "--mx1": `${to.mx}%`,
    "--my1": `${to.my}%`,
    "--layer": layer.color,
  } as CSSProperties;

  return (
    <div ref={rootRef} id="map" className="nm" style={{ "--layer": layer.color } as CSSProperties}>
      <div className="nm__phases" role="group" aria-label="Jump to a phase">
        {JOURNEY_PHASES.map((phase, i) => {
          const first = JOURNEY_STEPS.findIndex((s) => s.phase === i);
          return (
            <button
              key={phase.name}
              type="button"
              className={step.phase === i ? "is-on" : step.phase > i ? "is-done" : undefined}
              aria-pressed={step.phase === i}
              onClick={() => go(first)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {phase.name}
            </button>
          );
        })}
      </div>

      <div className="nm__stage">
        <Lines tall={false} from={step.from} to={step.to} />
        <Lines tall from={step.from} to={step.to} />

        {JOURNEY_ACTORS.map((actor) => {
          const Icon = ICONS[actor.id];
          const on = actor.id === step.from || actor.id === step.to;
          return (
            <div
              key={actor.id}
              className={`nm-actor nm-actor--${actor.id}${on ? " is-on" : ""}`}
              style={
                {
                  "--x": `${actor.x}%`,
                  "--y": `${actor.y}%`,
                  "--mx": `${actor.mx}%`,
                  "--my": `${actor.my}%`,
                } as CSSProperties
              }
            >
              <span className="nm-actor__icon">
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className="nm-actor__label">
                <strong>{actor.label}</strong>
                <span>{actor.sub}</span>
              </span>
            </div>
          );
        })}

        <span
          key={active}
          className={`nm-packet${step.from === step.to ? " is-local" : ""}`}
          style={packetStyle}
          aria-hidden="true"
        >
          <i />
          {step.packet ? <b>{step.packet}</b> : null}
        </span>
      </div>

      <div className="nm__panel" aria-live="polite">
        <div className="nm__panel-head">
          <span className="nm__count">
            Step {active + 1} <span>/ {JOURNEY_STEPS.length}</span>
          </span>
          <span className="nm__clock">
            ≈ {elapsed} <small>ms</small>
          </span>
        </div>
        <h3 className="nm__title">{step.title}</h3>
        <p className="nm__detail">{step.detail}</p>
        <p className="nm__tags">
          <span className="nm__layer">
            <i />
            {layer.short} · {layer.name}
          </span>
          <span>{SHAPE_NAMES[step.shape]}</span>
          <span>
            {from.label}
            {step.from !== step.to ? ` → ${to.label}` : ""}
          </span>
        </p>
      </div>

      <div className="nm__controls">
        <button type="button" className="nm__btn" onClick={() => go(0)} aria-label="Back to the first step">
          <RotateCcw size={16} aria-hidden="true" />
        </button>
        <button type="button" className="nm__btn" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous step">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button type="button" className="nm__btn nm__btn--play" onClick={togglePlay}>
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          {playing ? "Pause" : active >= LAST ? "Replay" : "Play"}
        </button>
        <button type="button" className="nm__btn" onClick={() => go(active + 1)} disabled={active === LAST} aria-label="Next step">
          <ChevronRight size={18} aria-hidden="true" />
        </button>
        <input
          type="range"
          className="nm__scrub"
          min={0}
          max={LAST}
          value={active}
          onChange={(event) => go(Number(event.target.value))}
          aria-label="Step"
          aria-valuetext={`Step ${active + 1}: ${step.title}`}
          style={{ "--fill": `${(active / LAST) * 100}%` } as CSSProperties}
        />
      </div>
    </div>
  );
}
