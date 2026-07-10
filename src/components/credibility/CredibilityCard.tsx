"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, BarChart3, ExternalLink, GraduationCap, Globe } from "lucide-react";
import type { Achievement } from "@/lib/credibility";

const ICONS = {
  education: GraduationCap,
  scale: BarChart3,
  community: Globe,
  certifications: BadgeCheck,
} as const;

export default function CredibilityCard({
  achievement,
  index,
}: {
  achievement: Achievement;
  index: number;
}) {
  const Icon = ICONS[achievement.icon];
  const isCerts = achievement.items && achievement.items.length > 0;
  const isExternalLink = achievement.link?.startsWith("http");

  return (
    <motion.article
      className={`cred-card${isCerts ? " cred-card--wide" : ""}`}
      style={{ "--cred-color": achievement.color } as React.CSSProperties}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <div className="cred-card__accent" aria-hidden="true" />

      <div className="cred-card__badge" aria-hidden="true">
        <Icon size={22} strokeWidth={1.75} />
        <Award size={12} className="cred-card__medal" />
      </div>

      <div className="cred-card__body">
        <h3 className="cred-card__title">{achievement.title}</h3>
        <p className="cred-card__org">{achievement.organization}</p>
        <p className="cred-card__highlight">{achievement.highlight}</p>

        {isCerts ? (
          <ul className="cred-card__certs">
            {achievement.items!.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        ) : null}

        <p className="cred-card__period">{achievement.period}</p>

        {achievement.link && achievement.linkLabel && (
          <a
            href={achievement.link}
            target={isExternalLink ? "_blank" : undefined}
            rel={isExternalLink ? "noopener noreferrer" : undefined}
            className="cred-card__link"
          >
            {achievement.linkLabel}
            {isExternalLink && <ExternalLink size={12} aria-hidden="true" />}
          </a>
        )}
      </div>
    </motion.article>
  );
}
