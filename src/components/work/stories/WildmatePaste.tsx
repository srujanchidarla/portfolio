"use client";

import { useId } from "react";
import { ramp, useStory } from "./ScrollStory";

const NOTE: { text: string; tag?: "time" | "place" | "todo" }[] = [
  { text: "sat?? leave " },
  { text: "denver ~6am", tag: "time" },
  { text: ", hike " },
  { text: "mohawk lakes", tag: "place" },
  { text: " from " },
  { text: "spruce creek TH", tag: "place" },
  { text: ", lunch at the upper lake. " },
  { text: "need 2 cars", tag: "todo" },
  { text: " + " },
  { text: "someone bring the stove", tag: "todo" },
];

const STOPS = [
  { time: "6:00", name: "Leave Denver", x: 14, y: 70 },
  { time: "8:00", name: "Spruce Creek Trailhead", x: 52, y: 48 },
  { time: "12:30", name: "Lunch, Upper Mohawk Lake", x: 84, y: 22 },
];

const ROUTE = "M14 70 C 26 66, 34 56, 52 48 S 74 34, 84 22";

/** Wildmate: Magic Paste turns a group-chat note into a routed itinerary the crew shares. */
export default function WildmatePaste() {
  const { p, step } = useStory();
  const draw = ramp(p, 0.5, 0.74);
  const clip = useId();

  return (
    <div className="sv sv-wild">
      <div className={`sv-wild__note${step >= 1 ? " is-parsed" : ""}`}>
        <p className="sv__kicker">Example note, pasted as-is</p>
        <p className="sv-wild__text">
          {NOTE.map((part, i) =>
            part.tag ? (
              <mark key={i} className={`is-${part.tag}`}>
                {part.text}
              </mark>
            ) : (
              <span key={i}>{part.text}</span>
            )
          )}
        </p>
      </div>

      <div className="sv-wild__map">
        <svg viewBox="0 0 100 80" preserveAspectRatio="none">
          {[0, 1, 2, 3, 4].map((r) => (
            <ellipse key={r} cx="70" cy="30" rx={14 + r * 11} ry={9 + r * 7} className="sv-wild__contour" />
          ))}
          <defs>
            <clipPath id={clip}>
              {/* The route runs left to right, so revealing it from the left draws it. */}
              <rect x="0" y="0" width={10 + draw * 80} height="80" />
            </clipPath>
          </defs>
          <path d={ROUTE} className="sv-wild__route-bg" />
          <path d={ROUTE} className="sv-wild__route" clipPath={`url(#${clip})`} />
        </svg>
        {STOPS.map((stop, i) => (
          <span
            key={stop.name}
            className={`sv-wild__pin${step >= 2 && 10 + draw * 80 >= stop.x - 1 ? " is-on" : ""}`}
            style={{ left: `${stop.x}%`, top: `${(stop.y / 80) * 100}%` }}
          >
            <b>{i + 1}</b>
          </span>
        ))}
      </div>

      <ol className={`sv-wild__plan${step >= 1 ? " is-on" : ""}`}>
        {STOPS.map((stop, i) => (
          <li key={stop.name} style={{ transitionDelay: `${i * 0.08}s` }}>
            <time>{stop.time}</time>
            {stop.name}
          </li>
        ))}
      </ol>

      <ul className={`sv-wild__crew${step >= 3 ? " is-on" : ""}`}>
        <li>🚗 Carpool · 2 cars</li>
        <li>🔥 Stove · claimed</li>
        <li>💬 4 going</li>
      </ul>
    </div>
  );
}
