"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { techniques } from "@/data/techniques";
import type { DifficultyRating } from "@/data/techniques";
import TechniqueCard from "@/components/TechniqueCard";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";

const RATINGS: { value: DifficultyRating | "all"; label: string }[] = [
  { value: "all", label: "All Levels" },
  { value: "green", label: "Green (Beginner)" },
  { value: "blue", label: "Blue (Intermediate)" },
  { value: "black", label: "Black (Advanced)" },
  { value: "double-black", label: "Double Black (Expert)" },
];

const VALID_RATINGS = new Set(["green", "blue", "black", "double-black"]);
const ALL_TERRAIN = Array.from(new Set(techniques.flatMap((t) => t.terrain)));

export default function TechniquesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1b2a]"><Navbar /><div className="max-w-6xl mx-auto px-4 py-20 text-center text-gray-400">Loading techniques...</div></div>}>
      <TechniquesContent />
    </Suspense>
  );
}

function TechniquesContent() {
  const searchParams = useSearchParams();
  const ratingParam = searchParams.get("rating");
  const initialRating = ratingParam && VALID_RATINGS.has(ratingParam)
    ? (ratingParam as DifficultyRating)
    : "all";

  const [selectedRating, setSelectedRating] = useState<DifficultyRating | "all">(initialRating);
  const [selectedTerrain, setSelectedTerrain] = useState<string | "all">("all");

  // Sync state when URL params change (e.g., nav link clicked)
  useEffect(() => {
    const r = searchParams.get("rating");
    if (r && VALID_RATINGS.has(r)) {
      setSelectedRating(r as DifficultyRating);
    } else if (!r) {
      setSelectedRating("all");
    }
  }, [searchParams]);

  const filtered = techniques.filter((t) => {
    const ratingMatch = selectedRating === "all" || t.rating === selectedRating;
    const terrainMatch = selectedTerrain === "all" || t.terrain.includes(selectedTerrain);
    return ratingMatch && terrainMatch;
  });

  return (
    <div className="min-h-screen bg-[#0d1b2a] font-[family-name:var(--font-inter)]">
      <Navbar />
      <Breadcrumbs crumbs={[{label:'Techniques'}]} />
      {/* Header */}
      <div id="main-content" className="bg-gradient-to-b from-[#0a1520] to-[#0d1b2a] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#e8722a] text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Curated technique library
          </p>
          <h1 className="text-4xl font-extrabold text-white mb-3">All Techniques</h1>
          <p className="text-gray-400 text-lg">
            {filtered.length} technique{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Difficulty filter */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Difficulty
            </p>
            <div className="flex flex-wrap gap-2">
              {RATINGS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setSelectedRating(value)}
                  aria-pressed={selectedRating === value}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedRating === value
                      ? "bg-[#e8722a] text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Terrain filter */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Terrain
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTerrain("all")}
                aria-pressed={selectedTerrain === "all"}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTerrain === "all"
                    ? "bg-[#e8722a] text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                All Terrain
              </button>
              {ALL_TERRAIN.map((terrain) => (
                <button
                  key={terrain}
                  onClick={() => setSelectedTerrain(terrain)}
                  aria-pressed={selectedTerrain === terrain}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTerrain === terrain
                      ? "bg-[#e8722a] text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {terrain}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((technique) => (
              <TechniqueCard key={technique.id} technique={technique} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">No techniques match your filters.</p>
            <button
              onClick={() => {
                setSelectedRating("all");
                setSelectedTerrain("all");
              }}
              className="mt-4 text-[#e8722a] hover:text-[#f08040] text-sm font-medium transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
