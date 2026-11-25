"use client";

import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

/**
 * Only these link kinds are rendered as links; anything else (javascript:, data:, …) stays text.
 * Section links (`#contact`, `/#contact`) resolve to the home page, so they work from any page.
 */
function safeHref(raw: string): { href: string; external: boolean; mail: boolean } | null {
  const href = raw.trim();
  if (/^mailto:[^\s]+$/i.test(href)) return { href, external: false, mail: true };
  if (/^https?:\/\/[^\s]+$/i.test(href)) {
    try {
      const url = new URL(href);
      const own = url.hostname.replace(/^www\./, "") === "srujanchidarla.com";
      return own
        ? { href: `${url.pathname}${url.search}${url.hash}`, external: false, mail: false }
        : { href, external: true, mail: false };
    } catch {
      return null;
    }
  }
  if (href.startsWith("#")) return { href: `/${href}`, external: false, mail: false };
  if (href.startsWith("/") && !href.startsWith("//")) return { href, external: false, mail: false };
  return null;
}

function renderInline(text: string, keyBase: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const token = match[0];
    const key = `${keyBase}-${match.index}`;

    if (token.startsWith("**")) {
      parts.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else {
      const [, label, rawHref] = /\[([^\]]+)\]\(([^)\s]+)\)/.exec(token) ?? [];
      const link = rawHref ? safeHref(rawHref) : null;
      if (!link) {
        parts.push(label ?? token);
      } else if (link.external) {
        parts.push(
          <a key={key} href={link.href} target="_blank" rel="noopener noreferrer" className="avatar-chat__link">
            {label}
            <ExternalLink size={11} aria-hidden="true" />
          </a>
        );
      } else {
        parts.push(
          <a key={key} href={link.href} className="avatar-chat__link">
            {label}
          </a>
        );
      }
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

const BULLET = /^\s*[-*•]\s+/;
const NUMBERED = /^\s*\d+[.)]\s+/;

/** Paragraphs, bullet lists and numbered lists, with **bold** and [links](…) inline. */
export default function ChatMessage({ role, content }: { role: "user" | "assistant"; content: string }) {
  const blocks: ReactNode[] = [];

  content.split(/\n{2,}/).forEach((block, b) => {
    const lines = block.split("\n").filter((line) => line.trim());
    let para: string[] = [];
    let list: { ordered: boolean; items: string[] } | null = null;

    const flushPara = () => {
      if (para.length) blocks.push(<p key={`p${b}-${blocks.length}`}>{renderInline(para.join(" "), `p${b}-${blocks.length}`)}</p>);
      para = [];
    };
    const flushList = () => {
      if (!list) return;
      const Tag = list.ordered ? "ol" : "ul";
      const k = `l${b}-${blocks.length}`;
      blocks.push(
        <Tag key={k}>
          {list.items.map((item, i) => (
            <li key={i}>{renderInline(item, `${k}-${i}`)}</li>
          ))}
        </Tag>
      );
      list = null;
    };

    for (const line of lines) {
      const ordered = NUMBERED.test(line);
      if (ordered || BULLET.test(line)) {
        flushPara();
        if (list && list.ordered !== ordered) flushList();
        list ??= { ordered, items: [] };
        list.items.push(line.replace(ordered ? NUMBERED : BULLET, ""));
      } else {
        flushList();
        para.push(line.replace(/^#+\s*/, ""));
      }
    }
    flushPara();
    flushList();
  });

  return <div className={`avatar-chat__msg avatar-chat__msg--${role}`}>{blocks}</div>;
}
