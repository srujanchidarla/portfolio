import { ImageResponse } from "next/og";
import { PRIMARY_ROLE, SITE } from "@/lib/site";

export const runtime = "edge";
export const alt = `${SITE.name} — ${PRIMARY_ROLE.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #0a0a0c 0%, #1a1208 55%, #0a0a0c 100%)",
          color: "#f5f5f5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#f97316",
            marginBottom: 20,
          }}
        >
          New grad · Aug 2026
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, marginBottom: 16 }}>
          {SITE.name}
        </div>
        <div style={{ fontSize: 32, color: "#fdba74", marginBottom: 28 }}>{PRIMARY_ROLE.title}</div>
        <div style={{ fontSize: 24, color: "#d4d4d8", lineHeight: 1.45, maxWidth: 900 }}>
          2M+ req/day production experience · CampfireChai & JobHuntOS shipped · 4.0 GPA
        </div>
      </div>
    ),
    { ...size }
  );
}
