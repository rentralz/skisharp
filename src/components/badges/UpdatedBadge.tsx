interface Props {
  date: string; // ISO date string e.g. "2025-03"
}

export default function UpdatedBadge({ date }: Props) {
  const formatted = new Date(date + "-01").toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return <span className="text-xs text-gray-400">Updated {formatted}</span>;
}
