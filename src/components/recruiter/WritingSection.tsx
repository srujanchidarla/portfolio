"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { SITE } from "@/lib/site";
import { WRITING_POSTS, formatWritingDate } from "@/lib/writing";

const FEATURED = WRITING_POSTS.slice(0, 3);

export default function WritingSection() {
  return (
    <section id="writing" className="rh-writing">
      <div className="wrap">
        <motion.header
          className="rh-section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="section-eyebrow">Tech notes</p>
          <h2 className="section-title">
            Writing that <span className="gradient-text">keeps me sharp</span>
          </h2>
          <p className="section-subtitle">
            Short takes on major tech news and what I&apos;m learning while shipping — also posted on
            LinkedIn a couple times a week.
          </p>
        </motion.header>

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
              viewport={{ once: true, margin: "-40px" }}
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
    </section>
  );
}
