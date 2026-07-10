"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { ProfileHighlight } from "@/lib/credibility";

export default function ProfileHighlightCard({
  highlight,
  index,
}: {
  highlight: ProfileHighlight;
  index: number;
}) {
  const isExternal = highlight.link?.startsWith("http");

  return (
    <motion.article
      className="profile-highlight"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <h3 className="profile-highlight__title">{highlight.title}</h3>
      <p className="profile-highlight__subtitle">{highlight.subtitle}</p>
      <ul className="profile-highlight__list">
        {highlight.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {highlight.link && highlight.linkLabel && (
        <a
          href={highlight.link}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="profile-highlight__link"
        >
          {highlight.linkLabel}
          {isExternal && <ExternalLink size={12} aria-hidden="true" />}
        </a>
      )}
    </motion.article>
  );
}
