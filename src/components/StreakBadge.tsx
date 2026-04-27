"use client";

import { useEffect, useState } from "react";

function calculateVisitStreak() {
  const visitKey = "turnlab_last_visit";
  const streakKey = "turnlab_streak";
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const lastVisit = localStorage.getItem(visitKey);
  const previousStreak = parseInt(localStorage.getItem(streakKey) || "0", 10);

  if (lastVisit === yesterday) {
    return previousStreak + 1;
  }

  if (lastVisit !== today) {
    return 1;
  }

  return previousStreak;
}

export default function StreakBadge() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const nextStreak = calculateVisitStreak();
      localStorage.setItem("turnlab_streak", String(nextStreak));
      localStorage.setItem("turnlab_last_visit", new Date().toDateString());
      setStreak(nextStreak);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (streak < 2) return null;

  return (
    <span className="ml-2 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">
      🔥 {streak}d
    </span>
  );
}
