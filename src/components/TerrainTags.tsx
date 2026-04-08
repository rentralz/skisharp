interface Props {
  terrain: string[];
}

export default function TerrainTags({ terrain }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {terrain.map((t) => (
        <span
          key={t}
          className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
