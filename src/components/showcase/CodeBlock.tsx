"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

function highlightTs(code: string): string {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(\/\/.*$)/gm, '<span class="hl-comment">$1</span>')
    .replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, '<span class="hl-string">$1</span>')
    .replace(
      /\b(async|await|const|let|return|for|if|throw|function|yield|new|typeof|in|of)\b/g,
      '<span class="hl-keyword">$1</span>'
    )
    .replace(/\b(\d+\.?\d*s?)\b/g, '<span class="hl-number">$1</span>');
}

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="code-block__bar">
        <span className="code-block__lang">{language}</span>
        <button
          type="button"
          className="code-block__copy"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="code-block__pre">
        <code dangerouslySetInnerHTML={{ __html: highlightTs(code) }} />
      </pre>
    </div>
  );
}
