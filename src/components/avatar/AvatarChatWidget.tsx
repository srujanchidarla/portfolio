"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ChevronDown,
  MessageCircle,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useContact } from "@/components/ContactProvider";
import AvatarFace from "./AvatarFace";
import ChatMessage from "./ChatMessage";
import {
  WELCOME_MESSAGES,
  createMessageId,
  getSuggestions,
  type ChatMessage as ChatMessageType,
  type VisitorType,
} from "@/lib/avatar-chat";

export default function AvatarChatWidget() {
  const { openContact } = useContact();
  const [isOpen, setIsOpen] = useState(false);
  const [visitorType, setVisitorType] = useState<VisitorType | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = visitorType ? getSuggestions(visitorType) : [];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading, scrollToBottom]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const selectVisitorType = (type: VisitorType) => {
    setVisitorType(type);
    if (!hasGreeted) {
      setMessages([
        {
          id: createMessageId(),
          role: "assistant",
          content: WELCOME_MESSAGES[type],
        },
      ]);
      setHasGreeted(true);
    }
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    let activeType = visitorType;
    let baseMessages = messages;

    if (!activeType) {
      activeType = /recruit|hire|interview|role|position/i.test(trimmed)
        ? "recruiter"
        : "visitor";
      setVisitorType(activeType);
      if (!hasGreeted) {
        baseMessages = [
          {
            id: createMessageId(),
            role: "assistant",
            content: WELCOME_MESSAGES[activeType],
          },
        ];
        setHasGreeted(true);
      }
    }

    const userMsg: ChatMessageType = {
      id: createMessageId(),
      role: "user",
      content: trimmed,
    };

    const nextMessages = [...baseMessages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    if (/how do i reach|schedule|contact|call|connect|hire you/i.test(trimmed)) {
      setTimeout(() => openContact(), 800);
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          visitorType: activeType,
        }),
      });

      const data = await res.json();
      const reply =
        data.content ??
        "I'm having trouble connecting right now. Try the [Contact](#contact) section or email Srujan directly.";

      setMessages((prev) => [
        ...prev,
        { id: createMessageId(), role: "assistant", content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId(),
          role: "assistant",
          content:
            "Something went wrong on my end. Please use [Contact](#contact) to reach Srujan directly — he's quick to respond.",
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="avatar-chat"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            role="dialog"
            aria-label="Code Avatar Srujan chat"
          >
            <header className="avatar-chat__header">
              <div className="avatar-chat__identity">
                <div className="avatar-chat__avatar-wrap">
                  <AvatarFace size={44} />
                  <span className="avatar-chat__online" aria-label="Online" />
                </div>
                <div>
                  <p className="avatar-chat__name">
                    <Sparkles size={13} aria-hidden="true" />
                    Code Avatar Srujan
                  </p>
                  <p className="avatar-chat__tagline">AI representative · Hiring ready</p>
                </div>
              </div>
              <button
                type="button"
                className="avatar-chat__close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <ChevronDown size={18} />
              </button>
            </header>

            {!visitorType && (
              <div className="avatar-chat__onboarding">
                <p>Who&apos;s visiting today?</p>
                <div className="avatar-chat__onboarding-btns">
                  <button type="button" onClick={() => selectVisitorType("recruiter")}>
                    <Briefcase size={16} aria-hidden="true" />
                    I&apos;m a recruiter
                  </button>
                  <button type="button" onClick={() => selectVisitorType("visitor")}>
                    <UserRound size={16} aria-hidden="true" />
                    Just exploring
                  </button>
                </div>
              </div>
            )}

            {visitorType && (
              <div className="avatar-chat__mode">
                <span>Mode:</span>
                <button
                  type="button"
                  className={visitorType === "recruiter" ? "is-active" : ""}
                  onClick={() => {
                    setVisitorType("recruiter");
                    if (!hasGreeted) selectVisitorType("recruiter");
                  }}
                >
                  Recruiter
                </button>
                <button
                  type="button"
                  className={visitorType === "visitor" ? "is-active" : ""}
                  onClick={() => {
                    setVisitorType("visitor");
                    if (!hasGreeted) selectVisitorType("visitor");
                  }}
                >
                  Visitor
                </button>
              </div>
            )}

            <div className="avatar-chat__messages">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
              ))}
              {isLoading && (
                <div className="avatar-chat__typing" aria-live="polite">
                  <span />
                  <span />
                  <span />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {visitorType && suggestions.length > 0 && messages.length <= 2 && (
              <div className="avatar-chat__suggestions">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    disabled={isLoading}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form className="avatar-chat__input-row" onSubmit={handleSubmit}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  visitorType
                    ? "Ask about experience, projects, hiring..."
                    : "Select a mode above to start"
                }
                disabled={!visitorType || isLoading}
                rows={1}
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={!visitorType || !input.trim() || isLoading}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>

            <footer className="avatar-chat__footer">
              <button type="button" onClick={openContact}>
                Schedule a call
              </button>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="avatar-chat-fab"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close Code Avatar chat" : "Open Code Avatar chat"}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        {isOpen ? (
          <X size={22} />
        ) : (
          <>
            <AvatarFace size={36} />
            <span className="avatar-chat-fab__pulse" aria-hidden="true" />
          </>
        )}
        {!isOpen && (
          <span className="avatar-chat-fab__label">
            <MessageCircle size={12} aria-hidden="true" />
            Ask Srujan
          </span>
        )}
      </motion.button>
    </>
  );
}
