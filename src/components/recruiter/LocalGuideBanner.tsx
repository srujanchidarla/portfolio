import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { LOCAL_GUIDE, SITE, SITE_IMAGES } from "@/lib/site";

export default function LocalGuideBanner() {
  return (
    <section id="local-guide" className="rh-lg" aria-label="Google Local Guide Level 9">
      <div className="wrap">
        <a
          href={SITE.localGuide}
          target="_blank"
          rel="noopener noreferrer"
          className="rh-lg__strip"
        >
          <span className="rh-lg__avatar-wrap">
            <Image
              src={SITE_IMAGES.localGuide}
              alt="Google Local Guide profile"
              width={600}
              height={600}
              quality={92}
              className="rh-lg__avatar"
              sizes="(max-width: 640px) 152px, 200px"
            />
          </span>

          <div className="rh-lg__copy">
            <p className="rh-lg__eyebrow">Google Maps</p>
            <p className="rh-lg__title">Local Guide Level {LOCAL_GUIDE.level}</p>
            <p className="rh-lg__tagline">{LOCAL_GUIDE.tagline}</p>
            <ul className="rh-lg__stats" aria-label="Local Guide stats">
              <li>
                <strong>{LOCAL_GUIDE.contributions}</strong>
                <span>contributions</span>
              </li>
              <li>
                <strong>{LOCAL_GUIDE.points}</strong>
                <span>points</span>
              </li>
              <li>
                <strong>{LOCAL_GUIDE.views}</strong>
                <span>views</span>
              </li>
            </ul>
            <p className="rh-lg__progress">
              <span className="rh-lg__track" aria-hidden="true">
                <span style={{ width: `${LOCAL_GUIDE.pointsProgress}%` }} />
              </span>
              <span>
                {LOCAL_GUIDE.pointsExact} of {LOCAL_GUIDE.pointsGoal} points
              </span>
            </p>
          </div>

          <span className="rh-lg__cta">
            View profile
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>

          <div className="rh-lg__details">
            <ul className="rh-lg__badges" aria-label="Local Guide badges">
              {LOCAL_GUIDE.badges.map((badge) => (
                <li key={badge}>{badge}</li>
              ))}
            </ul>
            <ul className="rh-lg__mix" aria-label="What the contributions are">
              {LOCAL_GUIDE.breakdown.map((item) => (
                <li key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </a>
      </div>
    </section>
  );
}
