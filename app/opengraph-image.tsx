import { ImageResponse } from "next/og";

export const alt = "NAVA Maritime Transport — Moving the World Across the Sea";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "white",
          background: "linear-gradient(135deg, #020a18 0%, #0a1f45 55%, #0a58b8 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="88" height="88" viewBox="0 0 48 48">
            <defs>
              <linearGradient id="a" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#3d8dff" />
                <stop offset="1" stopColor="#1fd8c8" />
              </linearGradient>
            </defs>
            <rect width="48" height="48" rx="12" fill="#10306a" />
            <g fill="none" strokeLinecap="round" strokeWidth="3.2">
              <circle cx="24" cy="12.5" r="3.6" stroke="#fff" />
              <path d="M24 16.1V37.5M17 21.5h14" stroke="#fff" />
              <path d="M11.5 28.5a12.5 12.5 0 0 0 25 0" stroke="url(#a)" />
            </g>
          </svg>
          <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: 18 }}>NAVA</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>Moving the World</div>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, color: "#5ee9dc" }}>
            Across the Sea.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "rgba(255,255,255,0.7)" }}>
            Maritime transport · Global logistics · 45+ countries
          </div>
        </div>
      </div>
    ),
    size,
  );
}
