import type { VideoEntry } from "@/data/techniques";

interface Props {
  videos: VideoEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function VideoTabSwitcher({ videos, activeIndex, onSelect }: Props) {
  if (videos.length <= 1) return null;

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Video options">
      {videos.map((video, i) => (
        <button
          key={video.videoId}
          role="tab"
          aria-selected={i === activeIndex}
          onClick={() => onSelect(i)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            i === activeIndex
              ? "bg-[#b35816] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          }`}
        >
          {video.isPrimary ? "Primary" : `Alt ${i}`}: {video.channel}
        </button>
      ))}
    </div>
  );
}
