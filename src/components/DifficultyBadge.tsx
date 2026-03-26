import type { DifficultyRating } from "@/data/techniques";

interface Props {
  difficulty: number;
  rating: DifficultyRating;
}

const BADGE_STYLES: Record<DifficultyRating, { bg: string; text: string; dot: string; label: string }> = {
  green: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", label: "Green" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500", label: "Blue" },
  black: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-800", label: "Black" },
  "double-black": { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-600", label: "Expert" },
};

export default function DifficultyBadge({ difficulty, rating }: Props) {
  const style = BADGE_STYLES[rating];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
      <span className={`w-2 h-2 rounded-full ${style.dot}`} aria-hidden="true" />
      {style.label} — Level {difficulty}
    </span>
  );
}
