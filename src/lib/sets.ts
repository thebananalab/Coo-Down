export type Perch = { y: number; xStart: number; xEnd: number };

export type GameSet = {
  id: string;
  name: string;
  subtitle: string;
  perches: Perch[];
  totalPigeons: number;
  /** CSS color var used to accent this set's card and HUD. */
  accent: string;
};

export const SETS: GameSet[] = [
  {
    id: "cables",
    name: "Cables de luz",
    subtitle: "Palomas en fila sobre el cableado",
    perches: [
      { y: 32, xStart: 8, xEnd: 92 },
      { y: 56, xStart: 14, xEnd: 86 },
    ],
    totalPigeons: 16,
    accent: "var(--dusk-sky-bottom)",
  },
  {
    id: "tejados",
    name: "Tejados",
    subtitle: "Toda la azotea es suya",
    perches: [
      { y: 42, xStart: 4, xEnd: 36 },
      { y: 58, xStart: 32, xEnd: 68 },
      { y: 74, xStart: 62, xEnd: 96 },
    ],
    totalPigeons: 18,
    accent: "var(--night-sky-bottom)",
  },
  {
    id: "balcones",
    name: "Balcones",
    subtitle: "Ocupando cada barandilla",
    perches: [
      { y: 26, xStart: 10, xEnd: 90 },
      { y: 50, xStart: 10, xEnd: 90 },
      { y: 74, xStart: 10, xEnd: 90 },
    ],
    totalPigeons: 18,
    accent: "var(--facade)",
  },
];

export function getSet(id: string): GameSet | undefined {
  return SETS.find((s) => s.id === id);
}
