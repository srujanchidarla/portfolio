"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PacketMap from "@/components/writing/PacketMap";
import JourneyFlowchart from "@/components/writing/JourneyFlowchart";
import { NETWORK_JOURNEY } from "@/lib/writing";
import {
  JOURNEY_SCENARIOS,
  JOURNEY_STEPS,
  scenarioForExit,
  scenarioStart,
} from "@/lib/network-journey";

const [HAPPY] = JOURNEY_SCENARIOS;
const DECISIONS = JOURNEY_STEPS.filter((s) => s.exits).length;
const FAILURES = JOURNEY_STEPS.reduce((n, s) => n + (s.exits?.filter((e) => e.kind === "error" || e.kind === "retry").length ?? 0), 0);

/** The google.com deep dive: a playable packet map, then the full flowchart. */
export default function NetworkJourneyArticle() {
  const [scenarioId, setScenarioId] = useState(HAPPY.id);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  const scenario = JOURNEY_SCENARIOS.find((s) => s.id === scenarioId) ?? HAPPY;
  const activeStep = scenario.frames[frame].step;

  const pickScenario = (id: string) => {
    const next = JOURNEY_SCENARIOS.find((s) => s.id === id) ?? HAPPY;
    setScenarioId(next.id);
    setFrame(scenarioStart(next));
    setPlaying(true);
  };

  // A flowchart node: show it in the current scenario if it's there, otherwise on the first visit.
  const selectStep = (index: number) => {
    setPlaying(false);
    const here = scenario.frames.findIndex((f) => f.step === index && f.exit === undefined && !f.drop);
    if (here >= 0) return setFrame(here);
    setScenarioId(HAPPY.id);
    setFrame(HAPPY.frames.findIndex((f) => f.step === index));
  };

  const playExit = (step: number, exit: number) => {
    const found = scenarioForExit(step, exit);
    if (!found) return;
    setScenarioId(found.scenario.id);
    setFrame(Math.max(0, found.frame - 1));
    setPlaying(true);
    document.getElementById("map")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article className="nj">
      <Link href="/#writing" className="sd-article__back">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to writing
      </Link>

      <header className="nj__header">
        <p className="section-eyebrow">Deep dive · interactive</p>
        <h1 className="sd-article__title">
          What really happens when you type <code>google.com</code> and hit Enter
        </h1>
        <p className="sd-article__subtitle">{NETWORK_JOURNEY.summary}</p>
        <dl className="wr-trip__stats nj__stats">
          {NETWORK_JOURNEY.stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>
                {stat.value}
                {"unit" in stat ? <small>{stat.unit}</small> : null}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <section className="nj__section" aria-labelledby="nj-map">
        <h2 id="nj-map">The packet map</h2>
        <p className="nj__lede">
          Pick a route or something that can go wrong, then play it or step through it yourself. The dot is your
          request; the clock is roughly how long the trip has taken so far.
        </p>
        <PacketMap
          scenario={scenario}
          frame={frame}
          playing={playing}
          onFrame={setFrame}
          onPlayingChange={setPlaying}
          onScenario={pickScenario}
        />
      </section>

      <section className="nj__section" aria-labelledby="nj-flow">
        <h2 id="nj-flow">The flowchart</h2>
        <p className="nj__lede">
          All {JOURNEY_STEPS.length} steps and {DECISIONS} decisions, with every exit labelled: the answer that
          keeps the trip going, and {FAILURES} ways it can fail or retry. Tap a shape to read what it does, or
          play any outcome on the map.
        </p>
        <JourneyFlowchart active={activeStep} onSelect={selectStep} onPlayExit={playExit} />
      </section>
    </article>
  );
}
