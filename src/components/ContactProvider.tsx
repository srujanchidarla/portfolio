"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import ContactModal from "@/components/ContactModal";
import AvatarChatWidget from "@/components/avatar/AvatarChatWidget";

interface ContactContextValue {
  openContact: () => void;
  closeContact: () => void;
  isOpen: boolean;
}

const ContactContext = createContext<ContactContextValue | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openContact = useCallback(() => setIsOpen(true), []);
  const closeContact = useCallback(() => setIsOpen(false), []);

  return (
    <ContactContext.Provider value={{ openContact, closeContact, isOpen }}>
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
