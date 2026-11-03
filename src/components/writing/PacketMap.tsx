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
  EXIT_KINDS,
  JOURNEY_ACTORS,
  JOURNEY_PHASES,
  JOURNEY_SCENARIOS,
  JOURNEY_STEPS,
  MAP_TRACK,
  SHAPE_NAMES,
  actorOf,
  elapsedAt,
  layerOf,
  type ActorId,
  type JourneyScenario,
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

/** How long each frame stays on screen while playing; exits get a beat longer to read. */
const DWELL = 2200;
const EXIT_DWELL = 3400;

type Props = {
  scenario: JourneyScenario;
  frame: number;
  playing: boolean;
  onFrame: (index: number) => void;
  onPlayingChange: (playing: boolean) => void;
  onScenario: (id: string) => void;
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
          vectorEffect="non-scaling-stroke"
        />
      ) : null}
    </svg>
  );
}

/**
 * The trip as a playable map: pick a scenario, and a packet flies between the machines
 * involved in each step, takes the failure exits that scenario hits, and keeps a running clock.
 */
export default function PacketMap({ scenario, frame, playing, onFrame, onPlayingChange, onScenario }: Props) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const autoStarted = useRef(false);

  const frames = scenario.frames;
  const last = frames.length - 1;
  const current = frames[frame];
  const step = JOURNEY_STEPS[current.step];
  const exit = current.exit !== undefined ? step.exits![current.exit] : null;
  const kind = exit ? EXIT_KINDS[exit.kind] : current.drop ? EXIT_KINDS.retry : null;
  const layer = layerOf(step.layer);
  const tone = kind ? kind.color : layer.color;
  const from = actorOf(step.from);
  const to = actorOf(step.to);
  const elapsed = elapsedAt(frames, frame);
  const endsInError = frame === last && exit?.kind === "error";
  const packet = exit ? `${kind!.symbol} ${exit.when}` : current.drop ? "✗ lost" : step.packet;

  // Advance while playing; stop on the last frame.
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(
      () => {
        if (frame >= last) onPlayingChange(false);
        else onFrame(frame + 1);
      },
      exit || current.drop ? EXIT_DWELL : DWELL
    );
    return () => window.clearTimeout(timer);
  }, [playing, frame, last, exit, current.drop, onFrame, onPlayingChange]);

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
    onFrame(Math.max(0, Math.min(last, index)));
  };

  const togglePlay = () => {
    if (playing) onPlayingChange(false);
    else {
      if (frame >= last) onFrame(0);
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
    "--layer": tone,
  } as CSSProperties;

  const packetClass = [
    "nm-packet",
    current.drop ? "is-drop" : step.from === step.to || exit ? "is-local" : "",
    kind ? "is-exit" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} id="map" className="nm" style={{ "--layer": tone } as CSSProperties}>
      <div className="nm__scenarios">
        {(["path", "failure"] as const).map((group) => (
          <div key={group} className="nm__scenario-group" role="group" aria-label={group === "path" ? "Routes" : "What can go wrong"}>
            <span className="nm__scenario-label">{group === "path" ? "Routes" : "What can go wrong"}</span>
            <div className="nm__scenario-chips">
              {JOURNEY_SCENARIOS.filter((s) => s.group === group).map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`nm__scenario nm__scenario--${group}${s.id === scenario.id ? " is-on" : ""}`}
                  aria-pressed={s.id === scenario.id}
                  onClick={() => onScenario(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        ))}
        <p className="nm__scenario-blurb">{scenario.blurb}</p>
      </div>

      <div className="nm__phases" role="group" aria-label="Jump to a phase">
        {JOURNEY_PHASES.map((phase, i) => {
          const first = frames.findIndex((f) => JOURNEY_STEPS[f.step].phase === i);
          return (
            <button
              key={phase.name}
              type="button"
              className={step.phase === i ? "is-on" : step.phase > i ? "is-done" : undefined}
              aria-pressed={step.phase === i}
              disabled={first < 0}
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

        <span key={`${scenario.id}-${frame}`} className={packetClass} style={packetStyle} aria-hidden="true">
          <i />
          {packet ? <b>{packet}</b> : null}
        </span>
      </div>

      <div className="nm__panel" aria-live="polite">
        <div className="nm__panel-head">
          <span className="nm__count">
            Step {frame + 1} <span>/ {frames.length}</span>
          </span>
          <span className="nm__clock">
            ≈ {elapsed.toLocaleString("en-US")} <small>ms</small>
          </span>
        </div>
        <h3 className="nm__title">{step.title}</h3>
        <p className="nm__detail">{step.detail}</p>

        {kind ? (
          <div className="nm__outcome" style={{ "--kind": kind.color } as CSSProperties}>
            <p className="nm__outcome-head">
              <span>{kind.symbol}</span>
              {exit ? exit.when : "Lost in transit"}
              <em>{kind.name}</em>
            </p>
            <p>
              {exit
                ? exit.then
                : "The packet never reaches the other side. No acknowledgement comes back, and the sender's retransmission timer keeps running."}
            </p>
            {endsInError ? <p className="nm__outcome-end">The trip ends here. The page never loads.</p> : null}
          </div>
        ) : step.pass ? (
          <p className="nm__pass">
            <span>✓</span> {step.pass}
          </p>
        ) : null}

        <p className="nm__tags">
          <span className="nm__layer">
            <i style={{ background: layer.color }} />
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
        <button type="button" className="nm__btn" onClick={() => go(frame - 1)} disabled={frame === 0} aria-label="Previous step">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button type="button" className="nm__btn nm__btn--play" onClick={togglePlay}>
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          {playing ? "Pause" : frame >= last ? "Replay" : "Play"}
        </button>
        <button type="button" className="nm__btn" onClick={() => go(frame + 1)} disabled={frame === last} aria-label="Next step">
          <ChevronRight size={18} aria-hidden="true" />
        </button>
        <input
          type="range"
          className="nm__scrub"
          min={0}
          max={last}
          value={frame}
          onChange={(event) => go(Number(event.target.value))}
          aria-label="Step"
          aria-valuetext={`Step ${frame + 1}: ${step.title}`}
          style={{ "--fill": `${(frame / Math.max(1, last)) * 100}%` } as CSSProperties}
        />
      </div>
    </div>
  );
}
