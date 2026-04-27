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
  onDisciplineChange,
  onRatingChange,
  onTerrainChange,
}: Props) {
  const selectedDisciplineLabel =
    filters.discipline === "all" ? "All disciplines" : DISCIPLINES[filters.discipline].pluralLabel;

  return (
    <div className="mb-8 space-y-5">
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
