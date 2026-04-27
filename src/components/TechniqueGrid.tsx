import { DISCIPLINES } from "@/data/disciplines";
import type { Technique } from "@/data/techniques";
import type { FilterState } from "@/hooks/useTechniqueFilters";
import TechniqueCard from "./TechniqueCard";

interface Props {
  techniques: Technique[];
  filters: FilterState;
  disciplineTechniqueCount: number;
  onClearFilters: () => void;
}

function buildFilterSummary(filters: FilterState) {
  const parts: string[] = [];

  if (filters.rating !== "all") {
    parts.push(filters.rating.replace("double-black", "double black"));
  }

  if (filters.terrain !== "all") {
    parts.push(filters.terrain);
  }

  return parts.join(" + ");
}

export default function TechniqueGrid({
  techniques,
  filters,
  disciplineTechniqueCount,
  onClearFilters,
}: Props) {
  if (techniques.length === 0) {
    const filterSummary = buildFilterSummary(filters);
    const scopedDiscipline = filters.discipline === "all" ? null : filters.discipline;
    const disciplineLabel = scopedDiscipline
      ? DISCIPLINES[scopedDiscipline].label.toLowerCase()
      : "technique";

    let headline = "No techniques match your filters.";
    let detail = filterSummary
      ? `Try clearing ${filterSummary} to widen the library.`
      : "Try a different discipline, difficulty, or terrain filter.";

    if (scopedDiscipline && disciplineTechniqueCount === 0) {
      headline = `No ${disciplineLabel} techniques are published yet.`;
      detail = `TurnLab doesn't have any ${disciplineLabel} technique pages live yet.`;
    } else if (scopedDiscipline) {
      headline = `No ${disciplineLabel} techniques match this filter set yet.`;
      detail = filterSummary
        ? `We don't currently have ${disciplineLabel} content for ${filterSummary}.`
        : `Try another ${disciplineLabel} difficulty or terrain combination.`;
    }

    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg text-gray-900 font-semibold">{headline}</p>
        <p className="mt-2 text-sm max-w-xl mx-auto">{detail}</p>
        <button
          onClick={onClearFilters}
          className="mt-4 text-[#e8722a] hover:text-[#f08040] text-sm font-medium transition-colors"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {techniques.map((technique) => (
        <TechniqueCard key={technique.id} technique={technique} />
      ))}
    </div>
  );
}
