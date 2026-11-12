"use client";

import { useId } from "react";
import { ramp, useStory } from "./ScrollStory";

const STAGES = ["Soil", "Sow", "Grow", "Harvest", "Sell"];
/** Illustrative shape only (no axis values): price so far, then the forecast. */
const PRICE = "M0 50 L37 45 L75 47 L112 37 L150 40 L187 30";
const FORECAST = "M187 30 L225 25 L262 17 L300 22";
const LANGS = ["हिन्दी", "తెలుగు", "தமிழ்", "मराठी", "ಕನ್ನಡ", "বাংলা", "ગુજરાતી"];

/** AgriWise: one field through one season, from the soil test to the scheme that pays for it. */
export default function AgriSeason() {
  const { p, step } = useStory();
  const grow = ramp(p, 0.2, 0.62);
  const line = ramp(p, 0.5, 0.72);
  const forecast = ramp(p, 0.62, 0.76);
  const clip = useId();

  return (
    <div className="sv sv-agri">
      <ol className="sv-agri__season">
        {STAGES.map((stage, i) => (
          <li key={stage} className={p * 5 >= i ? "is-on" : ""}>
            {stage}
          </li>
        ))}
      </ol>

      <div className="sv-agri__field">
        <div className="sv-agri__crop" style={{ ["--g" as string]: grow }}>
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} style={{ ["--d" as string]: `${[0.1, 0.25, 0.05, 0.2, 0, 0.15, 0.3, 0.08, 0.18][i]}` }} />
          ))}
        </div>
        <p className={`sv-agri__card sv-agri__card--soil${step >= 0 ? " is-on" : ""}`}>
          <b>Soil &amp; crop</b> What this field is worth growing
        </p>
        <p className={`sv-agri__card sv-agri__card--rain${step >= 1 ? " is-on" : ""}`}>
          <b>⛈ Weather alert</b> Hold irrigation before the rain
        </p>
      </div>

      <div className={`sv-agri__chart${step >= 2 ? " is-on" : ""}`}>
        <p className="sv__kicker">Mandi price · 30-day forecast</p>
        <svg viewBox="0 0 300 60">
          <defs>
            <clipPath id={clip}>
              <rect x="0" y="0" width={line * 188} height="60" />
            </clipPath>
          </defs>
          <rect x="232" y="0" width="50" height="60" rx="4" className="sv-agri__window" style={{ opacity: forecast * 0.9 }} />
          <path d={PRICE} className="sv-agri__price" clipPath={`url(#${clip})`} />
          <path d={FORECAST} className="sv-agri__forecast" style={{ opacity: forecast }} />
        </svg>
        <p className="sv-agri__sell" style={{ opacity: forecast }}>
          Sell window
        </p>
      </div>

      <div className={`sv-agri__scheme${step >= 3 ? " is-on" : ""}`}>
        <p>
          <b>Crop loan scheme</b> Eligibility and the steps to apply
        </p>
        <ul>
          {LANGS.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
          <li>+15</li>
        </ul>
      </div>
    </div>
  );
}
