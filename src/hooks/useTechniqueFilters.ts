"use client";

import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_DISCIPLINE, isDiscipline, type Discipline } from "@/data/disciplines";
import type { Technique, DifficultyRating } from "@/data/techniques";
import { useDisciplinePreference } from "./useDisciplinePreference";

export interface FilterState {
  discipline: Discipline | "all";
  rating: DifficultyRating | "all";
  terrain: string | "all";
}

export interface UseTechniqueFiltersResult {
  filters: FilterState;
  setDiscipline: (discipline: Discipline | "all") => void;
  setRating: (rating: DifficultyRating | "all") => void;
  setTerrain: (terrain: string | "all") => void;
  clearFilters: () => void;
  filtered: Technique[];
  allTerrain: string[];
  disciplineTechniqueCount: number;
}

const VALID_RATINGS: DifficultyRating[] = ["green", "blue", "black", "double-black"];

function isRating(value: string | null | undefined): value is DifficultyRating {
  return value !== null && VALID_RATINGS.includes(value as DifficultyRating);
}

function isFilterDiscipline(value: string | null | undefined): value is Discipline | "all" {
  return value === "all" || isDiscipline(value);
}

export function useTechniqueFilters(techniques: Technique[]): UseTechniqueFiltersResult {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { discipline: preferredDiscipline, setDiscipline: setPreferredDiscipline } = useDisciplinePreference();

  const allTerrain = useMemo(
    () => Array.from(new Set(techniques.flatMap((technique) => technique.terrain))).sort(),
    [techniques],
  );

  const rawDiscipline = searchParams.get("discipline");
  const rawRating = searchParams.get("rating");
  const rawTerrain = searchParams.get("terrain");
  const currentQuery = searchParams.toString();

  const filters = useMemo<FilterState>(() => {
    const discipline = isFilterDiscipline(rawDiscipline)
      ? rawDiscipline
      : preferredDiscipline ?? DEFAULT_DISCIPLINE;

    return {
      discipline,
      rating: isRating(rawRating) ? rawRating : "all",
      terrain: rawTerrain && allTerrain.includes(rawTerrain) ? rawTerrain : "all",
    };
  }, [allTerrain, preferredDiscipline, rawDiscipline, rawRating, rawTerrain]);

  const updateUrl = useCallback(
    (nextFilters: FilterState) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("discipline", nextFilters.discipline);

      if (nextFilters.rating === "all") {
        params.delete("rating");
      } else {
        params.set("rating", nextFilters.rating);
      }

      if (nextFilters.terrain === "all") {
        params.delete("terrain");
      } else {
        params.set("terrain", nextFilters.terrain);
      }

      const queryString = params.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const params = new URLSearchParams(currentQuery);
    let didSanitize = false;

    if (!isFilterDiscipline(rawDiscipline)) {
      params.set("discipline", preferredDiscipline ?? DEFAULT_DISCIPLINE);
      didSanitize = true;
    }

    if (rawRating && !isRating(rawRating)) {
      params.delete("rating");
      didSanitize = true;
    }

    if (rawTerrain && !allTerrain.includes(rawTerrain)) {
      params.delete("terrain");
      didSanitize = true;
    }

    if (!didSanitize) {
      return;
    }

    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }, [allTerrain, currentQuery, pathname, preferredDiscipline, rawDiscipline, rawRating, rawTerrain, router]);

  const setDiscipline = useCallback(
    (discipline: Discipline | "all") => {
      if (discipline !== "all") {
        setPreferredDiscipline(discipline);
      }

      updateUrl({ ...filters, discipline });
    },
    [filters, setPreferredDiscipline, updateUrl],
  );

  const setRating = useCallback(
    (rating: DifficultyRating | "all") => {
      updateUrl({ ...filters, rating });
    },
    [filters, updateUrl],
  );

  const setTerrain = useCallback(
    (terrain: string | "all") => {
      updateUrl({ ...filters, terrain });
    },
    [filters, updateUrl],
  );

  const clearFilters = useCallback(() => {
    updateUrl({ discipline: filters.discipline, rating: "all", terrain: "all" });
  }, [filters.discipline, updateUrl]);

  const disciplineTechniqueCount = useMemo(() => {
    if (filters.discipline === "all") {
      return techniques.length;
    }

    return techniques.filter((technique) => technique.discipline === filters.discipline).length;
  }, [filters.discipline, techniques]);

  const filtered = useMemo(
    () =>
      techniques.filter((technique) => {
        const disciplineMatch = filters.discipline === "all" || technique.discipline === filters.discipline;
        const ratingMatch = filters.rating === "all" || technique.rating === filters.rating;
        const terrainMatch = filters.terrain === "all" || technique.terrain.includes(filters.terrain);

        return disciplineMatch && ratingMatch && terrainMatch;
      }),
    [filters.discipline, filters.rating, filters.terrain, techniques],
  );

  return {
    filters,
    setDiscipline,
    setRating,
    setTerrain,
    clearFilters,
    filtered,
    allTerrain,
    disciplineTechniqueCount,
  };
}
