import type { GameSet, Perch } from "./sets";

export type Bird = {
  id: number;
  x: number;
  y: number;
  size: number;
  pose: number;
  flip: boolean;
  rot: number;
  dur: number;
  delay: number;
  fx: string;
  fy: string;
  fr: string;
};

function rand(seed: number) {
  const s = Math.sin(seed * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

function distribute(perches: Perch[], total: number): { perch: Perch; count: number }[] {
  const base = Math.floor(total / perches.length);
  let remainder = total - base * perches.length;
  return perches.map((perch) => {
    const count = base + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder--;
    return { perch, count };
  });
}

export function makeBirdsForSet(set: GameSet): Bird[] {
  const groups = distribute(set.perches, set.totalPigeons);
  const birds: Bird[] = [];
  let i = 0;
  for (const { perch, count } of groups) {
    for (let k = 0; k < count; k++) {
      const t = count === 1 ? 0.5 : k / (count - 1);
      const jx = (rand(i + 1) - 0.5) * 3.5;
      const jy = (rand(i + 99) - 0.5) * 1.5;
      const x = Math.min(Math.max(perch.xStart + t * (perch.xEnd - perch.xStart) + jx, 1), 94);
      birds.push({
        id: i,
        x: Math.round(x * 100) / 100,
        // Perch is the wire/roof-edge/railing line itself; sit the bird
        // just above it so its feet land on the perch.
        y: Math.round((perch.y + jy - 7) * 100) / 100,
        size: Math.round((14 + rand(i + 7) * 7) * 100) / 100,
        pose: Math.floor(rand(i + 21) * 5),
        flip: rand(i + 33) > 0.5,
        rot: Math.round((rand(i + 45) * 10 - 5) * 100) / 100,
        dur: Math.round((1.1 + rand(i + 57) * 1.1) * 100) / 100,
        delay: Math.round(rand(i + 69) * 120) / 100,
        fx: `${Math.round((rand(i + 81) > 0.5 ? 1 : -1) * (60 + rand(i + 91) * 60))}vw`,
        fy: `${-Math.round(40 + rand(i + 103) * 70)}vh`,
        fr: `${Math.round((rand(i + 111) - 0.5) * 160)}deg`,
      });
      i++;
    }
  }
  return birds;
}
