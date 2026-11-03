"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PacketMap from "@/components/writing/PacketMap";
import JourneyFlowchart from "@/components/writing/JourneyFlowchart";
import { NETWORK_JOURNEY } from "@/lib/writing";
import { JOURNEY_STEPS } from "@/lib/network-journey";

/** The google.com deep dive: a playable packet map, then the full flowchart. */
export default function NetworkJourneyArticle() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

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
          Press play, or step through it yourself. The dot is your request; the clock is roughly how long the trip
          has taken so far on a cold cache.
        </p>
        <PacketMap active={active} playing={playing} onSelect={setActive} onPlayingChange={setPlaying} />
      </section>

      <section className="nj__section" aria-labelledby="nj-flow">
        <h2 id="nj-flow">The flowchart</h2>
        <p className="nj__lede">
          All {JOURNEY_STEPS.length} steps, plus the work that happens quietly alongside them. Tap any shape to
          read what it does; the map follows along.
        </p>
        <JourneyFlowchart
          active={active}
          onSelect={(index) => {
            setPlaying(false);
            setActive(index);
          }}
        />
      </section>
    </article>
  );
}
