// Illustrated backdrop rendered beneath the hero photograph. It gives the
// first paint an immediate sense of place and remains as a fallback when the
// photograph is unavailable.

const PALETTE = ["#0a58b8", "#10306a", "#1570e0", "#1fd8c8", "#d8e2ee", "#0a1f45", "#3d8dff"];

const containers = Array.from({ length: 4 }, (_, row) =>
  Array.from({ length: 16 }, (_, col) => {
    // Pseudo-random but stable colour pattern (no Math.random during render).
    const seed = (row * 31 + col * 17 + ((row * col) % 7)) % PALETTE.length;
    const skip = row === 3 && (col % 5 === 0 || col === 15);
    return skip ? null : { x: 900 + col * 30, y: 518 - row * 17, fill: PALETTE[seed] };
  }),
).flat();

export function HeroScene() {
  return (
    <svg
      className="absolute inset-0 size-full"
      viewBox="0 -110 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#020a18" />
          <stop offset="0.55" stopColor="#0a1f45" />
          <stop offset="1" stopColor="#1b5fa8" />
        </linearGradient>
        <radialGradient id="hs-sun" cx="0.72" cy="0.6" r="0.45">
          <stop offset="0" stopColor="#5ee9dc" stopOpacity="0.45" />
          <stop offset="0.35" stopColor="#3d8dff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#3d8dff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hs-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d3a78" />
          <stop offset="1" stopColor="#020a18" />
        </linearGradient>
      </defs>

      <rect y="-110" width="1600" height="120" fill="#020a18" />
      <rect width="1600" height="560" fill="url(#hs-sky)" />
      <rect width="1600" height="900" fill="url(#hs-sun)" />
      <rect y="560" width="1600" height="340" fill="url(#hs-sea)" />

      {/* Sea shimmer */}
      <g stroke="#5ee9dc" strokeLinecap="round" opacity="0.35">
        {Array.from({ length: 22 }, (_, i) => {
          const y = 575 + i * i * 0.65 + i * 4;
          const w = 40 + i * 9;
          const x = 1150 - w / 2 + ((i * 53) % 90) - 45;
          return <line key={i} x1={x} x2={x + w} y1={y} y2={y} strokeWidth={1 + i * 0.08} opacity={1 - i / 26} />;
        })}
      </g>

      {/* Container ship */}
      <g>
        <path d="M842 540 L1470 540 L1455 590 L880 590 Q858 575 842 540 Z" fill="#051430" />
        <path d="M850 548 L1466 548" stroke="#1570e0" strokeWidth="3" opacity="0.8" />
        {containers.map((c, i) => c && <rect key={i} x={c.x} y={c.y} width="28" height="15" rx="1.5" fill={c.fill} opacity="0.92" />)}
        <path d="M1398 470 h46 v70 h-46 Z" fill="#0a1f45" />
        <path d="M1392 462 h58 v10 h-58 Z" fill="#d8e2ee" />
        <path d="M1404 480 h34 M1404 492 h34" stroke="#5ee9dc" strokeWidth="3" opacity="0.7" />
        <path d="M1428 462 v-24 h8 v24" fill="#10306a" />
        {/* Wake */}
        <path d="M1455 590 Q1530 600 1620 598" stroke="#dcebff" strokeWidth="2" fill="none" opacity="0.35" />
        <path d="M1440 596 Q1520 612 1620 616" stroke="#dcebff" strokeWidth="1.5" fill="none" opacity="0.2" />
      </g>
      <rect y="590" width="1600" height="310" fill="url(#hs-sea)" opacity="0.35" />
    </svg>
  );
}
