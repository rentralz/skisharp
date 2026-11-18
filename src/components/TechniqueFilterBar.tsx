"use client";

import { useRef } from "react";
import { DISCIPLINES, type Discipline } from "@/data/disciplines";
import type { DifficultyRating } from "@/data/techniques";
import type { FilterState } from "@/hooks/useTechniqueFilters";

const DISCIPLINE_OPTIONS: { value: Discipline | "all"; label: string }[] = [
  { value: "ski", label: "Ski" },
  { value: "snowboard", label: "Snowboard" },
  { value: "all", label: "All disciplines" },
];

const RATINGS: { value: DifficultyRating | "all"; label: string }[] = [
  { value: "all", label: "All Levels" },
  { value: "green", label: "Green (Beginner)" },
  { value: "blue", label: "Blue (Intermediate)" },
  { value: "black", label: "Black (Advanced)" },
  { value: "double-black", label: "Double Black (Expert)" },
];

interface Props {
  filters: FilterState;
  allTerrain: string[];
  query: string;
  onQueryChange: (query: string) => void;
  onQueryCommit: () => void;
  onDisciplineChange: (discipline: Discipline | "all") => void;
  onRatingChange: (rating: DifficultyRating | "all") => void;
  onTerrainChange: (terrain: string | "all") => void;
}

function getFilterButtonClass(isActive: boolean) {
  return `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? "bg-[#e8722a] text-gray-900"
      : "bg-gray-50 text-gray-500 hover:bg-white/10 hover:text-gray-900 border border-gray-300"
  }`;
}

export default function TechniqueFilterBar({
  filters,
  allTerrain,
  query,
  onQueryChange,
  onQueryCommit,
  onDisciplineChange,
  onRatingChange,
  onTerrainChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedDisciplineLabel =
    filters.discipline === "all" ? "All disciplines" : DISCIPLINES[filters.discipline].pluralLabel;

  return (
    <div className="mb-8 space-y-5">
      <form
        role="search"
        aria-label="Technique library"
        onSubmit={(event) => {
          event.preventDefault();
          onQueryCommit();
          // Closes the phone keyboard so the results are visible.
          (document.activeElement as HTMLElement | null)?.blur();
        }}
      >
        <label
          htmlFor="technique-search"
          className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500"
        >
          Search
        </label>
        <div className="relative max-w-xl">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8a7f75]"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.45 4.39l3.08 3.08a.75.75 0 11-1.06 1.06l-3.08-3.08A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
          <input
            ref={inputRef}
            id="technique-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onBlur={onQueryCommit}
            placeholder={'Try "pizza", "stop" or "moguls"'}
            autoComplete="off"
            enterKeyHint="search"
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-base text-gray-900 placeholder:text-[#766d65] focus:border-[#b35816] focus:outline-none focus:ring-2 focus:ring-[#e8722a]/30 dark:placeholder:text-[#a89d92] [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                onQueryChange("");
                onQueryCommit();
                // The button disappears once the box is empty; keep focus in the box.
                inputRef.current?.focus();
              }}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#6b635b] transition-colors hover:text-[#222]"
              aria-label="Clear search"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
        </div>
      </form>

      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Discipline</p>
        <div className="flex flex-wrap gap-2">
          {DISCIPLINE_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onDisciplineChange(value)}
              aria-pressed={filters.discipline === value}
              className={getFilterButtonClass(filters.discipline === value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Difficulty</p>
        <div className="flex flex-wrap gap-2">
          {RATINGS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onRatingChange(value)}
              aria-pressed={filters.rating === value}
              className={getFilterButtonClass(filters.rating === value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Terrain</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTerrainChange("all")}
            aria-pressed={filters.terrain === "all"}
            className={getFilterButtonClass(filters.terrain === "all")}
          >
            All Terrain
          </button>
          {allTerrain.map((terrain) => (
            <button
              key={terrain}
              onClick={() => onTerrainChange(terrain)}
              aria-pressed={filters.terrain === terrain}
              className={getFilterButtonClass(filters.terrain === terrain)}
            >
              {terrain}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Currently browsing <span className="font-medium text-gray-900">{selectedDisciplineLabel}</span>.
      </p>
    </div>
  );
}
