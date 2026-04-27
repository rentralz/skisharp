"use client";

import { useCallback, useSyncExternalStore } from "react";
import { getTechniqueById, getTechniqueBySlug, type TechniqueId } from "@/data/techniques";

interface ProgressData {
  practiced: Record<string, number>; // technique id → timestamp
  bookmarked: Record<string, number>; // technique id → timestamp
  streak: number;
  lastPracticeDate: string | null; // YYYY-MM-DD
}

const STORAGE_KEY = "turnlab_progress";
const PROGRESS_EVENT = "turnlab:progress-change";
const EMPTY_PROGRESS: ProgressData = {
  practiced: {},
  bookmarked: {},
  streak: 0,
  lastPracticeDate: null,
};

let cachedRawProgress: string | null | undefined;
let cachedProgressSnapshot: ProgressData = EMPTY_PROGRESS;

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function normalizeTechniqueKey(key: string): TechniqueId | null {
  const techniqueById = key.includes(":")
    ? getTechniqueById(key as TechniqueId)
    : undefined;

  if (techniqueById) {
    return techniqueById.id;
  }

  const techniqueBySlug = getTechniqueBySlug(key);
  if (techniqueBySlug) {
    return techniqueBySlug.id;
  }

  return null;
}

function normalizeProgressEntries(entries: unknown): Record<string, number> {
  if (!isRecord(entries)) {
    return {};
  }

  const normalized: Record<string, number> = {};

  for (const [key, value] of Object.entries(entries)) {
    const techniqueId = normalizeTechniqueKey(key);
    const timestamp = toFiniteNumber(value);

    if (!techniqueId || timestamp === null) {
      continue;
    }

    normalized[techniqueId] = Math.max(normalized[techniqueId] ?? 0, timestamp);
  }

  return normalized;
}

function normalizeProgressData(value: unknown): ProgressData {
  if (!isRecord(value)) {
    return EMPTY_PROGRESS;
  }

  const streak = toFiniteNumber(value.streak) ?? 0;

  return {
    practiced: normalizeProgressEntries(value.practiced),
    bookmarked: normalizeProgressEntries(value.bookmarked),
    streak,
    lastPracticeDate: typeof value.lastPracticeDate === "string" ? value.lastPracticeDate : null,
  };
}

function loadProgress(): ProgressData {
  if (typeof window === "undefined") {
    return EMPTY_PROGRESS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw === cachedRawProgress) {
      return cachedProgressSnapshot;
    }

    cachedRawProgress = raw;
    cachedProgressSnapshot = raw ? normalizeProgressData(JSON.parse(raw)) : EMPTY_PROGRESS;

    return cachedProgressSnapshot;
  } catch {
    cachedRawProgress = null;
    cachedProgressSnapshot = EMPTY_PROGRESS;
    return EMPTY_PROGRESS;
  }
}

function saveProgress(data: ProgressData) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const serialized = JSON.stringify(data);
    cachedRawProgress = serialized;
    cachedProgressSnapshot = data;
    localStorage.setItem(STORAGE_KEY, serialized);
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  } catch {}
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleProgressChange = () => onStoreChange();
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener(PROGRESS_EVENT, handleProgressChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(PROGRESS_EVENT, handleProgressChange);
    window.removeEventListener("storage", handleStorage);
  };
}

function calcStreak(data: ProgressData, today: string): number {
  if (!data.lastPracticeDate) return 0;
  const last = new Date(data.lastPracticeDate);
  const now = new Date(today);
  const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return data.streak;
  if (diffDays === 1) return data.streak; // will be incremented on practice
  return 0; // streak broken
}

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, loadProgress, () => EMPTY_PROGRESS);

  const togglePracticed = useCallback((techniqueId: TechniqueId) => {
    if (!getTechniqueById(techniqueId)) {
      return;
    }

    const current = loadProgress();
    const next = { ...current, practiced: { ...current.practiced } };
    const today = getToday();

    if (next.practiced[techniqueId]) {
      delete next.practiced[techniqueId];
    } else {
      next.practiced[techniqueId] = Date.now();
      const currentStreak = calcStreak(next, today);
      if (next.lastPracticeDate !== today) {
        next.streak = currentStreak + 1;
        next.lastPracticeDate = today;
      }
    }

    saveProgress(next);
  }, []);

  const toggleBookmark = useCallback((techniqueId: TechniqueId) => {
    if (!getTechniqueById(techniqueId)) {
      return;
    }

    const current = loadProgress();
    const next = { ...current, bookmarked: { ...current.bookmarked } };

    if (next.bookmarked[techniqueId]) {
      delete next.bookmarked[techniqueId];
    } else {
      next.bookmarked[techniqueId] = Date.now();
    }

    saveProgress(next);
  }, []);

  const isPracticed = useCallback(
    (techniqueId: TechniqueId) => !!progress.practiced[techniqueId],
    [progress.practiced],
  );

  const isBookmarked = useCallback(
    (techniqueId: TechniqueId) => !!progress.bookmarked[techniqueId],
    [progress.bookmarked],
  );

  const practicedTechniqueIds = Object.keys(progress.practiced) as TechniqueId[];
  const bookmarkedTechniqueIds = Object.keys(progress.bookmarked) as TechniqueId[];

  const stats = {
    practicedCount: practicedTechniqueIds.length,
    bookmarkedCount: bookmarkedTechniqueIds.length,
    streak: progress.streak,
    practicedTechniqueIds,
    bookmarkedTechniqueIds,
  };

  return { togglePracticed, toggleBookmark, isPracticed, isBookmarked, stats };
}
