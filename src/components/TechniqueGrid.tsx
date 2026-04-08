import type { Technique } from "@/data/techniques";
import TechniqueCard from "./TechniqueCard";

interface Props {
  techniques: Technique[];
  onClearFilters: () => void;
}

export default function TechniqueGrid({ techniques, onClearFilters }: Props) {
  if (techniques.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg">No techniques match your filters.</p>
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
