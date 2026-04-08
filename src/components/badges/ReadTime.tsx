interface Props {
  videos: number;
  description: string;
}

export default function ReadTime({ videos, description }: Props) {
  const mins = Math.max(1, Math.ceil(videos * 3 + description.split(" ").length / 200));
  return (
    <span className="text-xs text-gray-400" aria-label={`${mins} min read`}>
      {mins} min
    </span>
  );
}
