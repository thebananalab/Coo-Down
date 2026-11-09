import { useMemo, useState } from "react";
import { LevelSelect } from "./components/LevelSelect";
import { GameBoard } from "./components/GameBoard";
import { getSet } from "./lib/sets";
import { getCompletedSets, markSetCompleted } from "./lib/progress";

export default function App() {
  const [completed, setCompleted] = useState<Set<string>>(() => getCompletedSets());
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeSet = useMemo(() => (activeId ? getSet(activeId) : undefined), [activeId]);

  if (activeSet) {
    return (
      <main className="flex min-h-[100dvh] w-full items-center justify-center bg-[var(--ink)]">
        <GameBoard
          key={activeSet.id}
          set={activeSet}
          onExit={() => setActiveId(null)}
          onComplete={() => {
            setCompleted(markSetCompleted(activeSet.id));
            setActiveId(null);
          }}
        />
      </main>
    );
  }

  return (
    <main className="flex min-h-[100dvh] w-full items-center justify-center bg-[var(--ink)]">
      <LevelSelect completed={completed} onPick={setActiveId} />
    </main>
  );
}
