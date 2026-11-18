"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";
import TechniqueFilterBar from "@/components/TechniqueFilterBar";
import TechniqueGrid from "@/components/TechniqueGrid";
import { DISCIPLINES, type Discipline } from "@/data/disciplines";
import type { DifficultyRating } from "@/data/techniques";
import { techniques } from "@/data/techniques";
import { useTechniqueFilters } from "@/hooks/useTechniqueFilters";
import { trackEvent } from "@/lib/analytics";

export default function TechniquesPageClient() {
  const {
    filters,
    setDiscipline,
    setRating,
    setTerrain,
    clearFilters,
    filtered,
    allTerrain,
    disciplineTechniqueCount,
    query,
    setQuery,
    commitQuery,
    committedQuery,
    searchActive,
    outsideMatchCount,
    showAllMatches,
  } = useTechniqueFilters(techniques);

  const resultHeadline =
    filters.discipline === "all"
      ? "Browse the full technique library"
      : `${DISCIPLINES[filters.discipline].label} technique library`;

  const resultDescription =
    filters.discipline === "all"
      ? "Use the filters to narrow the library by discipline, difficulty, and terrain."
      : `Filter TurnLab's ${DISCIPLINES[filters.discipline].pluralLabel.toLowerCase()} by difficulty and terrain to find the right next skill to practice.`;

  const scopeLabel = filters.discipline === "all" ? "" : `${DISCIPLINES[filters.discipline].label.toLowerCase()} `;
  const plural = filtered.length !== 1 ? "s" : "";
  const countLabel = searchActive
    ? `${filtered.length} ${scopeLabel}technique${plural} match \u201c${query.trim()}\u201d`
    : `${filtered.length} ${scopeLabel}technique${plural} currently shown`;
  const outsideLabel = `${outsideMatchCount} more match${outsideMatchCount === 1 ? "" : "es"} in other disciplines or levels.`;

  const hasTrackedInitialView = useRef(false);

  useEffect(() => {
    if (hasTrackedInitialView.current) {
      return;
    }

    hasTrackedInitialView.current = true;
    trackEvent("techniques_library_view", {
      discipline_filter: filters.discipline,
      rating_filter: filters.rating,
      terrain_filter: filters.terrain,
      results_count: filtered.length,
    });
  }, [filtered.length, filters.discipline, filters.rating, filters.terrain]);

  const handleDisciplineChange = (discipline: Discipline | "all") => {
    trackEvent("techniques_filter_change", {
      filter_type: "discipline",
      selected_value: discipline,
      discipline_filter: discipline,
      rating_filter: filters.rating,
      terrain_filter: filters.terrain,
      results_before_change: filtered.length,
    });
    setDiscipline(discipline);
  };

  const handleRatingChange = (rating: DifficultyRating | "all") => {
    trackEvent("techniques_filter_change", {
      filter_type: "rating",
      selected_value: rating,
      discipline_filter: filters.discipline,
      rating_filter: rating,
      terrain_filter: filters.terrain,
      results_before_change: filtered.length,
    });
    setRating(rating);
  };

  const handleTerrainChange = (terrain: string | "all") => {
    trackEvent("techniques_filter_change", {
      filter_type: "terrain",
      selected_value: terrain,
      discipline_filter: filters.discipline,
      rating_filter: filters.rating,
      terrain_filter: terrain,
      results_before_change: filtered.length,
    });
    setTerrain(terrain);
  };

  // One event per finished search (after a pause, Enter, or leaving the box),
  // not per keystroke. Named apart from GA4's own view_search_results.
  const lastTrackedQuery = useRef(committedQuery);
  useEffect(() => {
    if (!committedQuery || committedQuery === lastTrackedQuery.current) {
      return;
    }
    lastTrackedQuery.current = committedQuery;
    trackEvent("techniques_search", {
      search_term: committedQuery.slice(0, 60),
      results_count: filtered.length,
      other_matches_count: outsideMatchCount,
      discipline_filter: filters.discipline,
    });
  }, [committedQuery, filtered.length, filters.discipline, outsideMatchCount]);

  const handleShowAllMatches = () => {
    trackEvent("techniques_search_show_all", {
      search_term: query.trim().slice(0, 60),
      results_before_change: filtered.length,
    });
    showAllMatches();
  };

  const clearSearch = () => {
    setQuery("");
    commitQuery();
  };

  const handleClearFilters = () => {
    trackEvent("techniques_filter_clear", {
      discipline_filter: filters.discipline,
      rating_filter: filters.rating,
      terrain_filter: filters.terrain,
      results_before_change: filtered.length,
    });
    clearFilters();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <p className="text-xs font-semibold text-[#b35816] uppercase tracking-[0.2em] mb-2">Live filters</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{resultHeadline}</h2>
        <p className="text-gray-500">{resultDescription}</p>
        <p className="text-sm text-gray-500 mt-2" role="status">
          {countLabel}
          {searchActive && outsideMatchCount > 0 && filtered.length > 0 && (
            <>
              {" "}
              {outsideLabel}{" "}
              <button
                type="button"
                onClick={handleShowAllMatches}
                className="font-medium text-[#b35816] underline underline-offset-2 hover:text-[#8f4412]"
              >
                Show all matches
              </button>
            </>
          )}
        </p>
      </div>

      <TechniqueFilterBar
        filters={filters}
        allTerrain={allTerrain}
        query={query}
        onQueryChange={setQuery}
        onQueryCommit={commitQuery}
        onDisciplineChange={handleDisciplineChange}
        onRatingChange={handleRatingChange}
        onTerrainChange={handleTerrainChange}
      />

      <AdUnit slot="techniques-listing" format="horizontal" className="max-w-3xl mx-auto" />

      {searchActive && filtered.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          <p className="text-lg font-semibold text-gray-900">
            No {scopeLabel}techniques match &ldquo;{query.trim()}&rdquo;.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm">
            {outsideMatchCount > 0
              ? outsideLabel
              : "Try another word, like \u201cstop\u201d, \u201ccarving\u201d or \u201cmoguls\u201d, or take the level check."}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
            {outsideMatchCount > 0 && (
              <button
                type="button"
                onClick={handleShowAllMatches}
                className="text-[#b35816] transition-colors hover:text-[#8f4412]"
              >
                Show all matches
              </button>
            )}
            <button
              type="button"
              onClick={clearSearch}
              className="text-[#b35816] transition-colors hover:text-[#8f4412]"
            >
              Clear search
            </button>
            {outsideMatchCount === 0 && (
              <Link href="/quiz" className="text-[#b35816] transition-colors hover:text-[#8f4412]">
                Take the 1-minute level check
              </Link>
            )}
          </div>
        </div>
      ) : (
        <TechniqueGrid
          techniques={filtered}
          filters={filters}
          disciplineTechniqueCount={disciplineTechniqueCount}
          onClearFilters={handleClearFilters}
        />
      )}
    </div>
  );
}
