"use client";

import { useState } from "react";
import type { VideoEntry } from "@/data/techniques";
import VideoTabSwitcher from "./VideoTabSwitcher";
import VideoFacade from "./VideoFacade";
import ChannelAttribution from "./ChannelAttribution";

interface Props {
  videos: VideoEntry[];
}

export default function VideoEmbed({ videos }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeVideo = videos[activeIndex];
  const posterUrl = `https://img.youtube.com/vi/${activeVideo.videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="space-y-3">
      <VideoTabSwitcher
        videos={videos}
        activeIndex={activeIndex}
        onSelect={(i) => setActiveIndex(i)}
      />
      <VideoFacade
        title={activeVideo.title}
        posterUrl={posterUrl}
        embedUrl={embedUrl}
      />
      <ChannelAttribution video={activeVideo} />
    </div>
  );
}
