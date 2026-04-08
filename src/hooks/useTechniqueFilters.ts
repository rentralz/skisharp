"use client";

import { useState, useMemo } from "react";
import type { Technique, DifficultyRating } from "@/data/techniques";

export interface FilterState {
  rating: DifficultyRating | "all";
  terrain: string | "all";
}

export interface UseTechniqueFiltersResult {
  filters: FilterState;
  setRating: (r: DifficultyRating | "all") => void;
  setTerrain: (t: string | "all") => void;
  clearFilters: () => void;
  filtered: Technique[];
  allTerrain: string[];
}

export function useTechniqueFilters(
  techniques: Technique[],
  initialRating?: DifficultyRating | "all"
): UseTechniqueFiltersResult {
  const [rating, setRating] = useState<DifficultyRating | "all">(initialRating ?? "all");
  const [terrain, setTerrain] = useState<string | "all">("all");

  const allTerrain = useMemo(
    () => Array.from(new Set(techniques.flatMap((t) => t.terrain))).sort(),
    [techniques]
  );

  const filtered = useMemo(
    () =>
      techniques.filter((t) => {
        const ratingMatch = rating === "all" || t.rating === rating;
        const terrainMatch = terrain === "all" || t.terrain.includes(terrain);
        return ratingMatch && terrainMatch;
      }),
    [techniques, rating, terrain]
  );

  const clearFilters = () => {
    setRating("all");
    setTerrain("all");
  };

  return {
    filters: { rating, terrain },
    setRating,
    setTerrain,
    clearFilters,
    filtered,
    allTerrain,
  };
}
