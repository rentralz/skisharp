"use client";

import { useEffect, useRef } from "react";
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
  } = useTechniqueFilters(techniques);

  const resultHeadline =
    filters.discipline === "all"
      ? "Browse the full technique library"
      : `${DISCIPLINES[filters.discipline].label} technique library`;

  const resultDescription =
    filters.discipline === "all"
      ? "Use the filters to narrow the library by discipline, difficulty, and terrain."
      : `Filter TurnLab's ${DISCIPLINES[filters.discipline].pluralLabel.toLowerCase()} by difficulty and terrain to find the right next skill to practice.`;

  const countLabel =
    filters.discipline === "all"
      ? `${filtered.length} technique${filtered.length !== 1 ? "s" : ""} currently shown`
      : `${filtered.length} ${DISCIPLINES[filters.discipline].label.toLowerCase()} technique${filtered.length !== 1 ? "s" : ""} currently shown`;

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
        <p className="text-xs font-semibold text-[#e8722a] uppercase tracking-[0.2em] mb-2">Live filters</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{resultHeadline}</h2>
        <p className="text-gray-500">{resultDescription}</p>
        <p className="text-sm text-gray-500 mt-2">{countLabel}</p>
      </div>

      <TechniqueFilterBar
        filters={filters}
        allTerrain={allTerrain}
        onDisciplineChange={handleDisciplineChange}
        onRatingChange={handleRatingChange}
        onTerrainChange={handleTerrainChange}
      />

      <AdUnit slot="techniques-listing" format="horizontal" className="max-w-3xl mx-auto" />

      <TechniqueGrid
        techniques={filtered}
        filters={filters}
        disciplineTechniqueCount={disciplineTechniqueCount}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
}
