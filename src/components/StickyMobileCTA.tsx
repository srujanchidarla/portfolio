"use client";

import { useEffect, useState } from "react";
import { Calendar, Download, Mail } from "lucide-react";
import { getScheduleHref, SITE } from "@/lib/site";
import { useContact } from "@/components/ContactProvider";

export default function StickyMobileCTA() {
  const { openContact } = useContact();
  const [visible, setVisible] = useState(false);
  const scheduleHref = getScheduleHref();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onScroll = () => {
      if (!mq.matches) {
        setVisible(false);
        return;
      }
      setVisible(window.scrollY > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-mobile-cta" role="navigation" aria-label="Quick actions">
      <a href={SITE.resumeUrl} download className="sticky-mobile-cta__btn">
        <Download size={16} aria-hidden="true" />
        Resume
      </a>
      <button type="button" className="sticky-mobile-cta__btn" onClick={openContact}>
        <Mail size={16} aria-hidden="true" />
        Contact
      </button>
      <a href={scheduleHref} className="sticky-mobile-cta__btn sticky-mobile-cta__btn--primary">
        <Calendar size={16} aria-hidden="true" />
        Schedule
      </a>
    </div>
  );
}
