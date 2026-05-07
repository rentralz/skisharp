"use client";

import AdUnit from "@/components/AdUnit";
import TechniqueFilterBar from "@/components/TechniqueFilterBar";
import TechniqueGrid from "@/components/TechniqueGrid";
import { DISCIPLINES } from "@/data/disciplines";
import { techniques } from "@/data/techniques";
import { useTechniqueFilters } from "@/hooks/useTechniqueFilters";

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
        onDisciplineChange={setDiscipline}
        onRatingChange={setRating}
        onTerrainChange={setTerrain}
      />

      <AdUnit slot="techniques-listing" format="horizontal" className="max-w-3xl mx-auto" />

      <TechniqueGrid
        techniques={filtered}
        filters={filters}
        disciplineTechniqueCount={disciplineTechniqueCount}
        onClearFilters={clearFilters}
      />
    </div>
  );
}
