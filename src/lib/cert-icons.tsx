import {
  siAngular,
  siBootstrap,
  siC,
  siCisco,
  siDatabricks,
  siGit,
  siGoogle,
  siGooglecloud,
  siHackerrank,
  siHtml5,
  siJavascript,
  siMysql,
  siNextdotjs,
  siOpenjdk,
  siPostman,
  siReact,
} from "simple-icons";
import { Cloud, Sparkles } from "lucide-react";

type BrandIcon = { path: string; hex: string };

const BRAND_ICON_BY_CERT_ID: Record<string, BrandIcon> = {
  "databricks-genai": siDatabricks,
  "cisco-packet-tracer": siCisco,
  "google-ux": siGoogle,
  nextjs: siNextdotjs,
  postman: siPostman,
  "react-native": siReact,
  "hackerrank-ps": siHackerrank,
  angular: siAngular,
  "modern-java": siOpenjdk,
  reactjs: siReact,
  javascript: siJavascript,
  git: siGit,
  mysql: siMysql,
  bootstrap: siBootstrap,
  "html-css": siHtml5,
  "gcp-summit": siGooglecloud,
  "c-programming": siC,
};

/**
 * AWS has no mark in simple-icons (they don't permit third-party use of their
 * logo), so it gets a generic cloud glyph tinted with their brand orange
 * instead of an unbranded default color.
 */
const FALLBACK_COLOR_BY_CERT_ID: Record<string, string> = {
  "aws-cp": "FF9900",
};

const DEFAULT_FALLBACK_COLOR = "64748b";

export function CertBrandIcon({ certId, size = 16 }: { certId: string; size?: number }) {
  const brand = BRAND_ICON_BY_CERT_ID[certId];

  if (!brand) {
    const Fallback = certId === "prompt-eng" ? Sparkles : Cloud;
    const color = FALLBACK_COLOR_BY_CERT_ID[certId];
    return (
      <Fallback
        size={size}
        aria-hidden="true"
        style={color ? { color: `#${color}` } : undefined}
      />
    );
  }

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill={`#${brand.hex}`}>
      <path d={brand.path} />
    </svg>
  );
}

export function certAccentHex(certId: string): string {
  return (
    BRAND_ICON_BY_CERT_ID[certId]?.hex ?? FALLBACK_COLOR_BY_CERT_ID[certId] ?? DEFAULT_FALLBACK_COLOR
  );
}
