interface Props {
  level: number; // 1-10
}

export default function DifficultyDots({ level }: Props) {
  return (
    <span className="flex gap-0.5 items-center" aria-label={`Difficulty: ${level}/10`}>
      {[...Array(10)].map((_, i) => (
        <span key={i} className={`text-xs ${i < level ? "text-[#B4835A]" : "text-gray-200"}`}>&#9679;</span>
      ))}
    </span>
  );
}
