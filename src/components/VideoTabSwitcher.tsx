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
              ? "bg-[#e8722a] text-white"
              : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          {video.isPrimary ? "Primary" : `Alt ${i}`}: {video.channel}
        </button>
      ))}
    </div>
  );
}
