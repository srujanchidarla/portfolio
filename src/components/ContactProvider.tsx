"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

const ContactModal = dynamic(() => import("@/components/ContactModal"), { ssr: false });
const AvatarChatWidget = dynamic(() => import("@/components/avatar/AvatarChatWidget"), {
  ssr: false,
});

interface ContactContextValue {
  openContact: () => void;
  closeContact: () => void;
  isOpen: boolean;
  openAvatarChat: () => void;
}

const ContactContext = createContext<ContactContextValue | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openContact = useCallback(() => setIsOpen(true), []);
  const closeContact = useCallback(() => setIsOpen(false), []);
  const openAvatarChat = useCallback(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("portfolio-open-avatar-chat"));
  }, []);

  return (
    <ContactContext.Provider value={{ openContact, closeContact, isOpen, openAvatarChat }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeContact} />
      <AvatarChatWidget />
    </ContactContext.Provider>
  );
}

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error("useContact must be used within ContactProvider");
  }
  return ctx;
}
