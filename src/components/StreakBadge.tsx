"use client";

import { useEffect, useState } from "react";

export default function StreakBadge() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const key = "turnlab_last_visit";
    const today = new Date().toDateString();
    const last = localStorage.getItem(key);
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (last === yesterday) {
      const prev = parseInt(localStorage.getItem("turnlab_streak") || "0", 10);
      setStreak(prev + 1);
      localStorage.setItem("turnlab_streak", String(prev + 1));
    } else if (last !== today) {
      setStreak(1);
      localStorage.setItem("turnlab_streak", "1");
    } else {
      setStreak(parseInt(localStorage.getItem("turnlab_streak") || "0", 10));
    }
    localStorage.setItem(key, today);
  }, []);

  if (streak < 2) return null;

  return (
    <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
      🔥 {streak}d
    </span>
  );
}
