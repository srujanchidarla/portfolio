"use client";

import { motion } from "framer-motion";
import { Calendar, GraduationCap, MapPin } from "lucide-react";
import { HIRING_ROLES } from "@/lib/recruiter-home";
import { LOOKING_FOR } from "@/lib/hiring";
import { SITE } from "@/lib/site";

export default function HiringSignal() {
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
            {SITE.status.replace("🎓 ", "")}
          </h2>
          <p className="section-subtitle">
            Recent graduate ready for growth. I&apos;m looking for mentorship, a learning culture, and
            a team where I can ship code, learn production systems, and grow as an engineer.
          </p>
        </motion.header>

        <div className="rh-hire__roles">
          {HIRING_ROLES.map((role) => (
            <span key={role} className="rh-hire__role-chip">
              {role}
            </span>
          ))}
        </div>

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
      </div>
    </section>
  );
}
