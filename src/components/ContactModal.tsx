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
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    requestAnimationFrame(() => {
      const closeBtn = dialogRef.current?.querySelector<HTMLElement>('button[aria-label="Close contact modal"]');
      closeBtn?.focus();
    });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
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
              type="button"
              onClick={onClose}
              aria-label="Close contact modal"
              className="modal-close"
            >
              <X size={20} />
            </button>

            <h2 id="contact-title" className="modal-title font-mono">
              Let&apos;s <span className="gradient-text">Talk</span>
            </h2>
            <p className="modal-lead">
              Questions about the work, a collaboration, or just want to say hi — I read everything.
            </p>

            <div className="modal-actions">
              <a href={`mailto:${SITE.email}`} className="btn-primary modal-actions__btn">
                <Mail size={18} aria-hidden="true" />
                {SITE.email}
              </a>

              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary modal-actions__btn"
              >
                <ExternalLink size={18} aria-hidden="true" />
                LinkedIn Profile
              </a>

              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary modal-actions__btn"
              >
                <Code2 size={18} aria-hidden="true" />
                GitHub Profile
              </a>

              <a href={SITE.resumeUrl} className="btn-secondary modal-actions__btn">
                View Resume
              </a>
            </div>

            <div className="modal-location">
              <MapPin size={16} aria-hidden="true" />
              {SITE.location}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
