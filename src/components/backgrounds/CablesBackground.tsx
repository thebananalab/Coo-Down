export function CablesBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cables-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--dusk-sky-top)" />
          <stop offset="100%" stopColor="var(--dusk-sky-bottom)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="100" fill="url(#cables-sky)" />
      <circle cx="80" cy="18" r="7" fill="var(--mustard)" opacity="0.85" />
      {[12, 22, 38, 65, 88].map((x, i) => (
        <circle key={x} cx={x} cy={8 + ((i * 7) % 15)} r="0.5" fill="var(--cream)" opacity="0.7" />
      ))}

      {/* Postes */}
      <rect x="4" y="20" width="1.4" height="80" fill="var(--wire)" />
      <rect x="94.6" y="20" width="1.4" height="80" fill="var(--wire)" />
      <rect x="2" y="19" width="6" height="1.2" fill="var(--wire)" />
      <rect x="92" y="19" width="6" height="1.2" fill="var(--wire)" />

      {/* Cables con ligero cateteo */}
      <path d="M 5 32 Q 50 36 95 32" stroke="var(--wire)" strokeWidth="0.6" fill="none" />
      <path d="M 10 56 Q 50 60 90 56" stroke="var(--wire)" strokeWidth="0.6" fill="none" />
    </svg>
  );
}
