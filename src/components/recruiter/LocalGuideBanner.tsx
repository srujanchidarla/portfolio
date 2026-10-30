import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { LOCAL_GUIDE, SITE, SITE_IMAGES } from "@/lib/site";

/** Topographic contour lines for the card background. */
function Contours() {
  return (
    <svg className="lg__contours" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <ellipse key={i} cx={470} cy={150} rx={40 + i * 46} ry={26 + i * 30} transform={`rotate(${-12 + i * 2} 470 150)`} />
      ))}
    </svg>
  );
}

export default function LocalGuideBanner() {
  return (
    <section id="local-guide" className="lg" aria-label={`Google Local Guide Level ${LOCAL_GUIDE.level}`}>
      <div className="wrap">
        <a href={SITE.localGuide} target="_blank" rel="noopener noreferrer" className="lg__card" data-spot>
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
