import type { VideoEntry } from "@/data/techniques";

interface Props {
  video: VideoEntry;
}

export default function ChannelAttribution({ video }: Props) {
  return (
    <div className="flex items-center justify-between px-1">
      <div className="text-sm text-gray-400">
        <span className="text-gray-500">via </span>
        <a
          href={video.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#e8722a] hover:text-[#f08040] transition-colors font-medium"
        >
          {video.channel}
        </a>
        {video.teachingStyle && (
          <span className="text-gray-500"> &mdash; {video.teachingStyle}</span>
        )}
      </div>
      <a
        href={video.channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs px-3 py-1 rounded-full bg-[#e8722a]/10 border border-[#e8722a]/20 text-[#e8722a] hover:bg-[#e8722a]/20 transition-colors font-medium"
      >
        Subscribe
      </a>
    </div>
  );
}