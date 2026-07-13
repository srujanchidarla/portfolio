"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Newspaper } from "lucide-react";
import { SITE } from "@/lib/site";
import { WRITING_POSTS, formatWritingDate } from "@/lib/writing";
import { SYSTEM_DESIGN_ESSAY } from "@/lib/system-design";
import SystemDesignModal from "@/components/writing/SystemDesignModal";

const FEATURED = WRITING_POSTS.slice(0, 3);

export default function WritingSection() {
  const [essayOpen, setEssayOpen] = useState(false);

  return (
    <section id="writing" className="rh-writing">
      <div className="wrap">
        <header className="rh-section-header">
          <p className="section-eyebrow">Tech notes</p>
          <h2 className="section-title">
            Writing that <span className="gradient-text">keeps me sharp</span>
          </h2>
          <p className="section-subtitle">
            Short LinkedIn takes plus a longer essay on system design in the AI era — how architecture
            evolved, and why it still matters when I ship.
          </p>
        </header>

        <div className="rh-writing__featured">
          <div className="rh-writing__featured-copy">
            <p className="rh-writing__featured-eyebrow">
              <BookOpen size={14} aria-hidden="true" />
              Featured essay
            </p>
            <h3 className="rh-writing__featured-title">{SYSTEM_DESIGN_ESSAY.title}</h3>
            <p className="rh-writing__featured-summary">{SYSTEM_DESIGN_ESSAY.summary}</p>
            <div className="rh-writing__featured-meta">
              <time dateTime={SYSTEM_DESIGN_ESSAY.date}>
                {formatWritingDate(SYSTEM_DESIGN_ESSAY.date)}
              </time>
              <span>{SYSTEM_DESIGN_ESSAY.readingMinutes} min read</span>
            </div>
            <div className="rh-writing__featured-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => setEssayOpen(true)}
              >
                Quick read (popup)
              </button>
              <Link href={SYSTEM_DESIGN_ESSAY.href} className="btn-secondary">
                Open full article
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <Link
            href={SYSTEM_DESIGN_ESSAY.href}
            className="rh-writing__featured-visual"
            aria-label="Open system design essay"
          >
            <span className="rh-writing__mini-arch" aria-hidden="true">
              <span>👥 → ⚖️ → 🔌</span>
              <span>↓</span>
              <span>🤖 → ⚡ → 🗄️</span>
              <span>↓</span>
              <span>📡 → 🚨</span>
            </span>
            <span className="rh-writing__featured-hint">Interactive architecture inside →</span>
          </Link>
        </div>

        <div className="rh-writing__grid">
          {FEATURED.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rh-writing__card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <div className="rh-writing__meta">
                <time dateTime={post.date}>{formatWritingDate(post.date)}</time>
                <span className="rh-writing__tags">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </span>
              </div>
              <h3 className="rh-writing__title">{post.title}</h3>
              <p className="rh-writing__summary">{post.summary}</p>
              <span className="rh-writing__link">
                Read on LinkedIn
                <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </motion.a>
          ))}
        </div>

        <div className="rh-writing__footer">
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rh-writing__all"
          >
            <Newspaper size={16} aria-hidden="true" />
            View all notes on LinkedIn
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      <SystemDesignModal isOpen={essayOpen} onClose={() => setEssayOpen(false)} />
    </section>
  );
}
