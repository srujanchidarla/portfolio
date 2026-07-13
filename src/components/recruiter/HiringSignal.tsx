"use client";

import { motion } from "framer-motion";
import { Calendar, GraduationCap, MapPin } from "lucide-react";
import { LOOKING_FOR } from "@/lib/hiring";
import { getScheduleHref, PRIMARY_ROLE, SITE, WORK_AUTH } from "@/lib/site";
import RoleStrategy from "./RoleStrategy";

export default function HiringSignal() {
  const scheduleHref = getScheduleHref();

  return (
    <section id="hire" className="rh-hire">
      <div className="wrap rh-hire__inner">
        <motion.header
          className="rh-section-header rh-section-header--center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow">New grad hiring</p>
          <h2 className="section-title">
            Open to <span className="gradient-text">work</span>
          </h2>
          <p className="section-subtitle">
            {PRIMARY_ROLE.headline}
          </p>
        </motion.header>

        <div className="rh-hire__quick">
          <a href={scheduleHref} className="btn-primary">
            <Calendar size={16} aria-hidden="true" />
            Schedule 15-min call
          </a>
          <a href="#contact" className="btn-secondary">
            Contact me
          </a>
        </div>

        <p className="rh-hire__work-auth">{WORK_AUTH.line}</p>

        <div className="rh-hire__meta">
          <span>
            <GraduationCap size={16} aria-hidden="true" />
            Graduating {SITE.gradDate} · 4.0 GPA
          </span>
          <span>
            <MapPin size={16} aria-hidden="true" />
            {SITE.location}
          </span>
          <span>
            <Calendar size={16} aria-hidden="true" />
            Available after graduation
          </span>
        </div>

        <div className="rh-hire__looking">
          {LOOKING_FOR.map((col) => (
            <div key={col.id} className="rh-hire__col">
              <h3>{col.title}</h3>
              <ul>
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <RoleStrategy embedded />
      </div>
    </section>
  );
}
