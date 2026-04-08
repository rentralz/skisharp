import type { DifficultyRating } from "@/data/techniques";
import type { FilterState } from "@/hooks/useTechniqueFilters";

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
  onRatingChange: (r: DifficultyRating | "all") => void;
  onTerrainChange: (t: string | "all") => void;
}

export default function TechniqueFilterBar({
  filters,
  allTerrain,
  onRatingChange,
  onTerrainChange,
}: Props) {
  return (
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
              onClick={() => onRatingChange(value)}
              aria-pressed={filters.rating === value}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.rating === value
                  ? "bg-[#e8722a] text-gray-900"
                  : "bg-gray-50 text-gray-500 hover:bg-white/10 hover:text-gray-900 border border-gray-300"
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
            onClick={() => onTerrainChange("all")}
            aria-pressed={filters.terrain === "all"}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filters.terrain === "all"
                ? "bg-[#e8722a] text-gray-900"
                : "bg-gray-50 text-gray-500 hover:bg-white/10 hover:text-gray-900 border border-gray-300"
            }`}
          >
            All Terrain
          </button>
          {allTerrain.map((t) => (
            <button
              key={t}
              onClick={() => onTerrainChange(t)}
              aria-pressed={filters.terrain === t}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.terrain === t
                  ? "bg-[#e8722a] text-gray-900"
                  : "bg-gray-50 text-gray-500 hover:bg-white/10 hover:text-gray-900 border border-gray-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
