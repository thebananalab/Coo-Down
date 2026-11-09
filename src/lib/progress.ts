const STORAGE_KEY = "pigeon-game:completed";

function readCompleted(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? new Set(parsed.filter((v) => typeof v === "string")) : new Set();
  } catch {
    return new Set();
  }
}

function writeCompleted(ids: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // Storage can be unavailable (private mode, quota) — progress just
    // won't persist across visits, which is a harmless degradation.
  }
}

export function getCompletedSets(): Set<string> {
  return readCompleted();
}

export function markSetCompleted(id: string): Set<string> {
  const completed = readCompleted();
  completed.add(id);
  writeCompleted(completed);
  return completed;
}

/** First level is always unlocked; the rest unlock once the previous one is completed. */
export function isUnlocked(index: number, completed: Set<string>, orderedIds: string[]): boolean {
  if (index === 0) return true;
  const prev = orderedIds[index - 1];
  return prev !== undefined && completed.has(prev);
}
