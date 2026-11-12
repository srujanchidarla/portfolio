"use client";

import { ramp, useStory } from "./ScrollStory";

/** `out` is the filter step that drops a destination (0 subject, 1 budget, 2 priorities); 9 stays. */
const PLACES = [
  { name: "Germany", flag: "🇩🇪", out: 9 },
  { name: "Canada", flag: "🇨🇦", out: 9 },
  { name: "Ireland", flag: "🇮🇪", out: 9 },
  { name: "United States", flag: "🇺🇸", out: 1 },
  { name: "United Kingdom", flag: "🇬🇧", out: 1 },
  { name: "Australia", flag: "🇦🇺", out: 2 },
  { name: "Netherlands", flag: "🇳🇱", out: 2 },
  { name: "France", flag: "🇫🇷", out: 0 },
  { name: "Japan", flag: "🇯🇵", out: 0 },
  { name: "New Zealand", flag: "🇳🇿", out: 2 },
  { name: "Sweden", flag: "🇸🇪", out: 1 },
  { name: "Italy", flag: "🇮🇹", out: 0 },
];

const FILTERS = ["Computer science", "Mid budget", "Work rights after"];
const COST = [
  { label: "Living", share: 0.46 },
  { label: "Net tuition", share: 0.38 },
  { label: "First-month setup", share: 0.16 },
];

/** Study Chapter: narrow the world to a shortlist, then cost the first year. */
export default function StudyShortlist() {
  const { p, step } = useStory();
  const cost = ramp(p, 0.78, 0.96);
  const kept = PLACES.filter((place) => place.out > step).length;

  return (
    <div className="sv sv-study">
      <ul className="sv-study__filters">
        {FILTERS.map((filter, i) => (
          <li key={filter} className={step >= i ? "is-on" : ""}>
            {filter}
          </li>
        ))}
      </ul>

      <p className="sv__kicker">
        Example search · {kept} of {PLACES.length} destinations {step >= 2 ? "· your shortlist" : "left"}
      </p>
      <ul className="sv-study__grid">
        {PLACES.map((place) => (
          <li key={place.name} className={place.out <= step ? "is-out" : step >= 2 ? "is-kept" : ""}>
            <span>{place.flag}</span>
            {place.name}
          </li>
        ))}
      </ul>

      <div className={`sv-study__cost${step >= 3 ? " is-on" : ""}`}>
        <p className="sv__kicker">Year one, not just rent · baselines, not quotes</p>
        <span className="sv-study__bar">
          {COST.map((part, i) => (
            <span
              key={part.label}
              className={`sv-study__seg sv-study__seg--${i}`}
              style={{ flexGrow: part.share * ramp(cost, i / 3, (i + 1) / 3) + 0.0001 }}
            />
          ))}
        </span>
        <ul>
          {COST.map((part, i) => (
            <li key={part.label} className={`sv-study__key sv-study__key--${i}`}>
              {part.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
