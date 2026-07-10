"use client";

import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
    } else {
      const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isHash = href.startsWith("#");
        const isMail = href.startsWith("mailto:");
        if (isHash) {
          parts.push(
            <a key={match.index} href={href} className="avatar-chat__link">
              {label}
            </a>
          );
        } else {
          parts.push(
            <a
              key={match.index}
              href={href}
              target={isMail ? undefined : "_blank"}
              rel={isMail ? undefined : "noopener noreferrer"}
              className="avatar-chat__link"
            >
              {label}
              {!isMail && <ExternalLink size={11} aria-hidden="true" />}
            </a>
          );
        }
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export default function ChatMessage({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const paragraphs = content.split(/\n\n+/);

  return (
    <div className={`avatar-chat__msg avatar-chat__msg--${role}`}>
      {paragraphs.map((para, i) => (
        <p key={i}>{renderInline(para.replace(/\n/g, " "))}</p>
      ))}
    </div>
  );
}
