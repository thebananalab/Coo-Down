import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PixelDove } from "./PixelDove";
import { BACKGROUNDS } from "./backgrounds";
import { makeBirdsForSet, type Bird } from "@/lib/birds";
import type { GameSet } from "@/lib/sets";
import { playFanfare, playFlap } from "@/lib/audio";

export function GameBoard({
  set,
  onComplete,
  onExit,
}: {
  set: GameSet;
  onComplete: () => void;
  onExit: () => void;
}) {
  const birds = useMemo(() => makeBirdsForSet(set), [set]);
  const [scared, setScared] = useState<Set<number>>(() => new Set());
  const [puffs, setPuffs] = useState<{ id: number; x: number; y: number }[]>([]);
  const dragging = useRef(false);
  const puffId = useRef(0);
  const Background = BACKGROUNDS[set.id];

  const done = scared.size >= birds.length;

  useEffect(() => {
    if (done) playFanfare();
  }, [done]);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(onComplete, 1400);
    return () => clearTimeout(t);
  }, [done, onComplete]);

  const scare = useCallback((bird: Bird) => {
    setScared((prev) => {
      if (prev.has(bird.id)) return prev;
      const next = new Set(prev);
      next.add(bird.id);
      return next;
    });
    playFlap();
    setPuffs((prev) => {
      const id = puffId.current++;
      setTimeout(() => setPuffs((p) => p.filter((x) => x.id !== id)), 500);
      return [...prev, { id, x: bird.x, y: bird.y }];
    });
  }, []);

  const onPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && !dragging.current) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const holder = el?.closest("[data-bird]");
    if (!holder) return;
    const id = Number((holder as HTMLElement).dataset["bird"]);
    const bird = birds[id];
    if (bird && !scared.has(id)) scare(bird);
  };

  return (
    <div
      className="relative aspect-[9/16] h-[100dvh] max-h-[100dvh] w-full max-w-[min(100vw,calc(100dvh*9/16))] overflow-hidden select-none"
      style={{ touchAction: "none" }}
      onPointerDown={(e) => {
        dragging.current = true;
        onPointer(e);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
      onPointerMove={onPointer}
    >
      {Background ? <Background /> : null}

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-[9%] items-center justify-between border-b-[0.4vmin] border-[var(--ink)] bg-[var(--cream)]/90 px-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExit();
          }}
          className="pointer-events-auto border-[0.4vmin] border-[var(--ink)] bg-[var(--mustard)] px-[clamp(8px,1.8vmin,14px)] py-[clamp(4px,1vmin,8px)] text-[clamp(11px,2vmin,14px)] leading-none text-[var(--ink)] shadow-[0.3vmin_0.3vmin_0_var(--ink)]"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          ← Mapa
        </button>
        <p
          className="text-[clamp(12px,2.4vmin,16px)] leading-none text-[var(--ink)]"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          {scared.size}/{birds.length}
        </p>
      </div>

      {birds.map((b) => {
        const gone = scared.has(b.id);
        return (
          <div
            key={b.id}
            data-bird={gone ? undefined : b.id}
            className={`absolute z-10 ${gone ? "animate-shoo pointer-events-none" : ""}`}
            style={
              {
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.size}%`,
                "--rot": `${b.rot}deg`,
                "--fx": b.fx,
                "--fy": b.fy,
                "--fr": b.fr,
                transform: `rotate(${b.rot}deg)`,
              } as React.CSSProperties
            }
          >
            <div
              className="animate-idle"
              style={{ ["--dur" as string]: `${b.dur}s`, animationDelay: `${b.delay}s` }}
            >
              <PixelDove pose={b.pose} flip={b.flip} className="w-full" />
            </div>
          </div>
        );
      })}

      {puffs.map((p) => (
        <div
          key={p.id}
          className="animate-puff pointer-events-none absolute z-10 h-[8%] w-[8%] rounded-full"
          style={{
            left: `${p.x + 2}%`,
            top: `${p.y}%`,
            background: "radial-gradient(circle, var(--sand) 0 40%, transparent 70%)",
          }}
        />
      ))}

      {done && (
        <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center gap-[3vmin] bg-[var(--ink)]/75 text-center">
          <p
            className="animate-reveal text-[clamp(20px,5vmin,34px)] leading-none text-[var(--mustard)] drop-shadow-[0.3vmin_0.3vmin_0_var(--ink)]"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            ¡Nivel completado!
          </p>
          <div className="flex gap-[2vmin]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="animate-star-pop text-[clamp(26px,6vmin,40px)]"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                ⭐
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
