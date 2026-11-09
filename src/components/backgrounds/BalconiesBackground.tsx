const RAILINGS = [
  { y: 26, xStart: 10, xEnd: 90 },
  { y: 50, xStart: 10, xEnd: 90 },
  { y: 74, xStart: 10, xEnd: 90 },
];

export function BalconiesBackground() {
  const windowRows = [10, 36, 60, 86];
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="100" height="100" fill="var(--facade)" />

      {windowRows.map((wy) =>
        [8, 28, 48, 68, 88].map((wx) => (
          <rect
            key={`${wx}-${wy}`}
            x={wx}
            y={wy}
            width="7"
            height="9"
            fill="var(--window-dark)"
            opacity="0.55"
          />
        )),
      )}

      {RAILINGS.map((r) => (
        <g key={r.y}>
          <rect x={r.xStart - 2} y={r.y + 2} width={r.xEnd - r.xStart + 4} height="2.2" fill="var(--sand)" />
          <rect x={r.xStart} y={r.y - 3} width={r.xEnd - r.xStart} height="1" fill="var(--railing)" />
          {Array.from({ length: 10 }, (_, i) => {
            const x = r.xStart + (i * (r.xEnd - r.xStart)) / 9;
            return <rect key={i} x={x - 0.3} y={r.y - 3} width="0.6" height="5" fill="var(--railing)" />;
          })}
        </g>
      ))}
    </svg>
  );
}
