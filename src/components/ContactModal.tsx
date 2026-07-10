"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ExternalLink, Code2, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={dialogRef}
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close contact modal"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "none",
                color: "var(--c-muted)",
                padding: 8,
                borderRadius: 8,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--c-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-muted)")}
            >
              <X size={20} />
            </button>

            <h2
              id="contact-title"
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Let&apos;s <span className="gradient-text">Talk</span>
            </h2>
            <p style={{ color: "var(--c-muted)", fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
              I&apos;m actively seeking a full-time role to build and scale distributed
              systems. Reach out — I&apos;d love to connect.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a
                href={`mailto:${SITE.email}`}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "flex-start" }}
              >
                <Mail size={18} />
                {SITE.email}
              </a>

              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ width: "100%", justifyContent: "flex-start" }}
              >
                <ExternalLink size={18} />
                LinkedIn Profile
              </a>

              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ width: "100%", justifyContent: "flex-start" }}
              >
                <Code2 size={18} />
                GitHub Profile
              </a>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 24,
                padding: "12px 16px",
                borderRadius: 12,
                background: "var(--c-surface2)",
                border: "1px solid var(--c-border)",
                fontSize: 13,
                color: "var(--c-muted)",
              }}
            >
              <MapPin size={16} style={{ color: "var(--c-primary)", flexShrink: 0 }} />
              {SITE.location} · Willing to relocate
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
