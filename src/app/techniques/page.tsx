"use client";

import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdUnit from "@/components/AdUnit";
import TechniqueFilterBar from "@/components/TechniqueFilterBar";
import TechniqueGrid from "@/components/TechniqueGrid";
import { DISCIPLINES } from "@/data/disciplines";
import { techniques } from "@/data/techniques";
import { useTechniqueFilters } from "@/hooks/useTechniqueFilters";

function TechniquesPageFallback() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-gray-500">
        Loading techniques...
      </div>
    </div>
  );
}

export default function TechniquesPage() {
  return (
    <Suspense fallback={<TechniquesPageFallback />}>
      <TechniquesContent />
    </Suspense>
  );
}

function TechniquesContent() {
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

  const headerTitle =
    filters.discipline === "all"
      ? "All Techniques"
      : `${DISCIPLINES[filters.discipline].label} Techniques`;
  const headerDescription =
    filters.discipline === "all"
      ? "Browse the full TurnLab library across ski and snowboard."
      : `Browse TurnLab's curated ${DISCIPLINES[filters.discipline].pluralLabel.toLowerCase()} library.`;
  const countLabel =
    filters.discipline === "all"
      ? `${filtered.length} technique${filtered.length !== 1 ? "s" : ""} found`
      : `${filtered.length} ${DISCIPLINES[filters.discipline].label.toLowerCase()} technique${filtered.length !== 1 ? "s" : ""} found`;

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <Navbar />
      <Breadcrumbs crumbs={[{ label: "Techniques" }]} />

      <div id="main-content" className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#e8722a] text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Curated technique library
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{headerTitle}</h1>
          <p className="text-gray-500 text-lg mb-2">{headerDescription}</p>
          <p className="text-gray-500 text-lg">{countLabel}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
    </div>
  );
}
