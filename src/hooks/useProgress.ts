"use client";

import { useState, useEffect, useCallback } from "react";

interface ProgressData {
  practiced: Record<string, number>; // slug → timestamp
  bookmarked: Record<string, number>; // slug → timestamp
  streak: number;
  lastPracticeDate: string | null; // YYYY-MM-DD
}

const STORAGE_KEY = "turnlab_progress";

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadProgress(): ProgressData {
  if (typeof window === "undefined") {
    return { practiced: {}, bookmarked: {}, streak: 0, lastPracticeDate: null };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { practiced: {}, bookmarked: {}, streak: 0, lastPracticeDate: null };
}

function saveProgress(data: ProgressData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
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
  const [progress, setProgress] = useState<ProgressData>(loadProgress);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const togglePracticed = useCallback((slug: string) => {
    setProgress((prev) => {
      const next = { ...prev, practiced: { ...prev.practiced } };
      const today = getToday();
      if (next.practiced[slug]) {
        delete next.practiced[slug];
      } else {
        next.practiced[slug] = Date.now();
        // Update streak
        const currentStreak = calcStreak(next, today);
        if (next.lastPracticeDate !== today) {
          next.streak = currentStreak + 1;
          next.lastPracticeDate = today;
        }
      }
      saveProgress(next);
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((slug: string) => {
    setProgress((prev) => {
      const next = { ...prev, bookmarked: { ...prev.bookmarked } };
      if (next.bookmarked[slug]) {
        delete next.bookmarked[slug];
      } else {
        next.bookmarked[slug] = Date.now();
      }
      saveProgress(next);
      return next;
    });
  }, []);

  const isPracticed = useCallback((slug: string) => !!progress.practiced[slug], [progress]);
  const isBookmarked = useCallback((slug: string) => !!progress.bookmarked[slug], [progress]);

  const stats = {
    practicedCount: Object.keys(progress.practiced).length,
    bookmarkedCount: Object.keys(progress.bookmarked).length,
    streak: progress.streak,
    practicedSlugs: Object.keys(progress.practiced),
    bookmarkedSlugs: Object.keys(progress.bookmarked),
  };

  return { togglePracticed, toggleBookmark, isPracticed, isBookmarked, stats };
}
