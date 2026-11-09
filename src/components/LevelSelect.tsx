import { SETS } from "@/lib/sets";
import { isUnlocked } from "@/lib/progress";

export function LevelSelect({
  completed,
  onPick,
}: {
  completed: Set<string>;
  onPick: (id: string) => void;
}) {
  const orderedIds = SETS.map((s) => s.id);

  return (
    <div className="relative flex aspect-[9/16] h-[100dvh] max-h-[100dvh] w-full max-w-[min(100vw,calc(100dvh*9/16))] flex-col items-center gap-[4vmin] overflow-y-auto bg-[var(--ink)] px-[8%] py-[8%] text-center">
      <h1
        className="text-[clamp(20px,5vmin,32px)] leading-tight text-[var(--mustard)] drop-shadow-[0.3vmin_0.3vmin_0_var(--ink)]"
        style={{ fontFamily: "var(--font-pixel)" }}
      >
        Espanta Palomas
      </h1>
      <p
        className="text-[clamp(12px,2.2vmin,15px)] text-[var(--cream)]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Elige un set para empezar
      </p>

      <div className="flex w-full flex-1 flex-col justify-center gap-[3vmin]">
        {SETS.map((set, i) => {
          const unlocked = isUnlocked(i, completed, orderedIds);
          const won = completed.has(set.id);
          return (
            <button
              key={set.id}
              type="button"
              disabled={!unlocked}
              onClick={() => onPick(set.id)}
              className="relative border-[0.6vmin] border-[var(--ink)] px-[6%] py-[5%] text-left shadow-[0.9vmin_0.9vmin_0_var(--clay)] transition-transform enabled:active:translate-x-[0.4vmin] enabled:active:translate-y-[0.4vmin] disabled:opacity-50"
              style={{ background: set.accent }}
            >
              <p
                className="text-[clamp(14px,3vmin,19px)] leading-none text-[var(--cream)] drop-shadow-[0.2vmin_0.2vmin_0_var(--ink)]"
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                {unlocked ? set.name : "🔒 ???"}
              </p>
              <p
                className="mt-[1.5vmin] text-[clamp(11px,2vmin,14px)] text-[var(--cream)] opacity-90"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {unlocked ? set.subtitle : "Completa el set anterior"}
              </p>
              {won && (
                <span className="absolute top-[4%] right-[4%] text-[clamp(16px,3.4vmin,22px)]">⭐⭐⭐</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
