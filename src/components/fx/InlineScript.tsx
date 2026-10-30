"use client";

/**
 * Runs `html` synchronously during HTML parsing (before first paint).
 * On the client it renders as inert text so React doesn't warn about script tags.
 */
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
