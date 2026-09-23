import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "linear-gradient(135deg, #10306a, #020a18)" }}>
        <svg width="180" height="180" viewBox="0 0 48 48">
          <defs>
            <linearGradient id="a" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#3d8dff" />
              <stop offset="1" stopColor="#1fd8c8" />
            </linearGradient>
          </defs>
          <g fill="none" strokeLinecap="round" strokeWidth="3.2">
            <circle cx="24" cy="12.5" r="3.6" stroke="#fff" />
            <path d="M24 16.1V37.5M17 21.5h14" stroke="#fff" />
            <path d="M11.5 28.5a12.5 12.5 0 0 0 25 0" stroke="url(#a)" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
