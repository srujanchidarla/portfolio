import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

/** Three stops in the empty lower-right of the card (viewBox units, 600×300, sliced). */
const PINS = [
  { x: 470, y: 236 },
  { x: 528, y: 196 },
  { x: 578, y: 228 },
];
import { LOCAL_GUIDE, SITE, SITE_IMAGES } from "@/lib/site";

/** Topographic contour lines for the card background. */
function Contours() {
  return (
    <svg className="lg__contours" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <ellipse key={i} cx={470} cy={150} rx={40 + i * 46} ry={26 + i * 30} transform={`rotate(${-12 + i * 2} 470 150)`} />
      ))}
      <path
        className="lg__route"
        d={`M${PINS[0].x} ${PINS[0].y} Q 492 192 ${PINS[1].x} ${PINS[1].y} T ${PINS[2].x} ${PINS[2].y}`}
        pathLength={1}
      />
      {PINS.map((pin, i) => (
        <g key={i} className="lg__pin" style={{ animationDelay: `${0.25 + i * 0.35}s` }}>
          <ellipse cx={pin.x} cy={pin.y + 1} rx="4" ry="1.5" className="lg__pin-shadow" />
          <path
            d={`M${pin.x} ${pin.y} c-5 -6 -7 -9.5 -7 -13 a7 7 0 1 1 14 0 c0 3.5 -2 7 -7 13z`}
            className="lg__pin-body"
          />
          <circle cx={pin.x} cy={pin.y - 13} r="2.5" className="lg__pin-dot" />
        </g>
      ))}
    </svg>
  );
}

export default function LocalGuideBanner() {
  return (
    <section id="local-guide" className="lg" aria-label={`Google Local Guide Level ${LOCAL_GUIDE.level}`}>
      <div className="wrap">
        <a href={SITE.localGuide} target="_blank" rel="noopener noreferrer" className="lg__card" data-spot data-cue>
          <Contours />

          <span className="lg__media">
            <Image
              src={SITE_IMAGES.localGuide}
              alt="Google Local Guide profile card"
              width={600}
              height={600}
              quality={92}
              sizes="(max-width: 720px) 60vw, 300px"
            />
          </span>

          <span className="lg__copy">
            <span className="lg__eyebrow">
              <MapPin size={14} aria-hidden="true" />
              Google Maps · {LOCAL_GUIDE.tagline}
            </span>
            <span className="lg__title">
              Local Guide <span className="lg__level">L{LOCAL_GUIDE.level}</span>
            </span>
            <span className="lg__line">
              Photos, reviews, and answers on Google Maps — viewed {LOCAL_GUIDE.views} times.
            </span>

            <span className="lg__stats">
              <span>
                <strong>{LOCAL_GUIDE.contributions}</strong>
                contributions
              </span>
              <span>
                <strong>{LOCAL_GUIDE.points}</strong>
                points
              </span>
              <span>
                <strong>{LOCAL_GUIDE.views}</strong>
                views
              </span>
            </span>

            <span className="lg__progress">
              <span className="lg__track" aria-hidden="true">
                <span style={{ width: `${LOCAL_GUIDE.pointsProgress}%` }} />
              </span>
              <span className="lg__progress-label">
                {LOCAL_GUIDE.pointsExact} / {LOCAL_GUIDE.pointsGoal} points to Level 10
              </span>
            </span>

            <span className="lg__badges">
              {LOCAL_GUIDE.badges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </span>

            <span className="lg__mix">
              {LOCAL_GUIDE.breakdown.map((item) => (
                <span key={item.label}>
                  <strong>{item.value}</strong> {item.label}
                </span>
              ))}
            </span>
          </span>

          <span className="lg__cta">
            View profile
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </a>
      </div>
    </section>
  );
}
