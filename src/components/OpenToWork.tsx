"use client";

import { motion } from "framer-motion";
import { LOOKING_FOR, VALUE_PROPS } from "@/lib/hiring";

export default function OpenToWork() {
  return (
    <section id="open-to-work" className="open-to-work">
      <div className="wrap">
        <motion.header
          className="open-to-work__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">Ideal Fit</p>
          <h2 className="section-title">
            What I&apos;m <span className="gradient-text">Looking For</span>
          </h2>
          <p className="section-subtitle">
            Clear on the role, company, and environment where I can deliver the most value.
          </p>
        </motion.header>

        <div className="looking-for-grid">
          {LOOKING_FOR.map((col, i) => (
            <motion.div
              key={col.id}
              className="looking-for-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <h3 className="looking-for-card__title">{col.title}</h3>
              <ul className="looking-for-card__list">
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="open-to-work__divider" />

        <motion.header
          className="open-to-work__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-eyebrow">Value Proposition</p>
          <h2 className="section-title">
            Why <span className="gradient-text">Hire Me</span>
          </h2>
        </motion.header>

        <div className="value-props-grid">
          {VALUE_PROPS.map((card, i) => (
            <motion.article
              key={card.id}
              className="value-prop-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <span className="value-prop-card__icon" aria-hidden="true">
                {card.icon}
              </span>
              <h3 className="value-prop-card__title">{card.title}</h3>
              <p className="value-prop-card__desc">{card.description}</p>
              <p className="value-prop-card__example">{card.example}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
