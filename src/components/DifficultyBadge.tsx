import type { DifficultyRating } from "@/data/techniques";

interface Props {
  difficulty: number;
  rating: DifficultyRating;
}

const RATING_LABELS: Record<DifficultyRating, string> = {
  green: "Green",
  blue: "Blue",
  black: "Black",
  "double-black": "Double Black",
};

const DOT_COLORS: Record<DifficultyRating, string> = {
  green: "bg-[#22c55e]",
  blue: "bg-[#3b82f6]",
  black: "bg-[#1a1a2e]",
  "double-black": "bg-[#7c3aed]",
};

const TEXT_COLORS: Record<DifficultyRating, string> = {
  green: "text-[#22c55e]",
  blue: "text-[#3b82f6]",
  black: "text-[#d1d5db]",
  "double-black": "text-[#7c3aed]",
};

export default function DifficultyBadge({ difficulty, rating }: Props) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${DOT_COLORS[rating]}`}
        aria-hidden="true"
      />
      <span className={`text-xs font-semibold ${TEXT_COLORS[rating]}`}>
        {RATING_LABELS[rating]} &mdash; Level {difficulty}
      </span>
    </span>
  );
}
