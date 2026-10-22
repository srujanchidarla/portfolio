import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090c",
          borderRadius: 8,
          border: "1px solid rgba(232, 196, 154, 0.45)",
          color: "#e8c49a",
          fontSize: 21,
          fontWeight: 700,
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}
