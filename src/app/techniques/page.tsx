"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { techniques } from "@/data/techniques";
import type { DifficultyRating } from "@/data/techniques";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdUnit from "@/components/AdUnit";
import TechniqueFilterBar from "@/components/TechniqueFilterBar";
import TechniqueGrid from "@/components/TechniqueGrid";
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
  const searchParams = useSearchParams();
  const ratingParam = searchParams.get("rating");

  const VALID_RATINGS = new Set(["green", "blue", "black", "double-black"]);
  const initialRating =
    ratingParam && VALID_RATINGS.has(ratingParam)
      ? (ratingParam as DifficultyRating)
      : undefined;

  const {
    filters,
    setRating,
    setTerrain,
    clearFilters,
    filtered,
    allTerrain,
  } = useTechniqueFilters(techniques, initialRating);

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <Navbar />
      <Breadcrumbs crumbs={[{ label: "Techniques" }]} />

      {/* Header */}
      <div id="main-content" className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#e8722a] text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Curated technique library
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">All Techniques</h1>
          <p className="text-gray-500 text-lg">
            {filtered.length} technique{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <TechniqueFilterBar
          filters={filters}
          allTerrain={allTerrain}
          onRatingChange={setRating}
          onTerrainChange={setTerrain}
        />

        <AdUnit slot="techniques-listing" format="horizontal" className="max-w-3xl mx-auto" />

        <TechniqueGrid techniques={filtered} onClearFilters={clearFilters} />
      </div>
    </div>
  );
}
