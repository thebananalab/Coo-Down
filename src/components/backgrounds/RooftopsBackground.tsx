const BUILDINGS = [
  { xStart: 4, xEnd: 36, y: 42 },
  { xStart: 32, xEnd: 68, y: 58 },
  { xStart: 62, xEnd: 96, y: 74 },
];

export function RooftopsBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="roofs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--night-sky-top)" />
          <stop offset="100%" stopColor="var(--night-sky-bottom)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="100" fill="url(#roofs-sky)" />
      <circle cx="18" cy="16" r="6" fill="var(--cream)" opacity="0.9" />
      {[30, 45, 58, 70, 85, 92].map((x, i) => (
        <circle key={x} cx={x} cy={6 + ((i * 11) % 20)} r="0.5" fill="var(--cream)" opacity="0.6" />
      ))}

      {BUILDINGS.map((b, bi) => (
        <g key={b.xStart}>
          <rect x={b.xStart} y={b.y} width={b.xEnd - b.xStart} height={100 - b.y} fill="var(--roof)" />
          <rect x={b.xStart} y={b.y - 1} width={b.xEnd - b.xStart} height={1.4} fill="var(--roof-edge)" />
          {bi === 1 && (
            <rect x={(b.xStart + b.xEnd) / 2 - 1} y={b.y - 6} width={2} height={6} fill="var(--roof-edge)" />
          )}
          {Array.from({ length: 4 }, (_, wi) => {
            const wx = b.xStart + 3 + wi * ((b.xEnd - b.xStart - 6) / 3);
            const wy = b.y + 6 + (wi % 2) * 8;
            if (wy > 94) return null;
            return <rect key={wi} x={wx} y={wy} width="2.4" height="2.4" fill="var(--mustard)" opacity="0.5" />;
          })}
        </g>
      ))}
    </svg>
  );
}
