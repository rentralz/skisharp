"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoEntry } from "@/data/techniques";

interface Props {
  videos: VideoEntry[];
}

export default function VideoEmbed({ videos }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeVideo = videos[activeIndex];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const posterUrl = `https://img.youtube.com/vi/${activeVideo.videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="space-y-3">
      {/* Tab switcher — only shown when multiple videos */}
      {videos.length > 1 && (
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Video options">
          {videos.map((video, i) => (
            <button
              key={video.videoId}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => { setActiveIndex(i); setIsLoaded(false); }}
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
      )}

      {/* Embed container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-xl overflow-hidden bg-black"
        style={{ paddingBottom: "56.25%" }}
      >
        {isLoaded ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedUrl}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            className="absolute inset-0 w-full h-full group"
            onClick={() => setIsLoaded(true)}
            aria-label={`Play ${activeVideo.title}`}
          >
            {/* Poster image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterUrl}
              alt={activeVideo.title}
              className="w-full h-full object-cover"
            />
            {/* Play overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#e8722a]/90 group-hover:bg-[#e8722a] flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
                <svg
                  className="w-7 h-7 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Channel attribution */}
      <div className="flex items-center justify-between px-1">
        <div className="text-sm text-gray-400">
          <span className="text-gray-500">via </span>
          <a
            href={activeVideo.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e8722a] hover:text-[#f08040] transition-colors font-medium"
          >
            {activeVideo.channel}
          </a>
          {activeVideo.teachingStyle && (
            <span className="text-gray-500"> &mdash; {activeVideo.teachingStyle}</span>
          )}
        </div>
        <a
          href={activeVideo.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-3 py-1 rounded-full bg-[#e8722a]/10 border border-[#e8722a]/20 text-[#e8722a] hover:bg-[#e8722a]/20 transition-colors font-medium"
        >
          Subscribe
        </a>
      </div>
    </div>
  );
}
