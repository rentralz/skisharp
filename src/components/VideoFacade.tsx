"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  title: string;
  posterUrl: string;
  embedUrl: string;
}

export default function VideoFacade({ title, posterUrl, embedUrl }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl overflow-hidden bg-black"
      style={{ paddingBottom: "56.25%" }}
    >
      {isLoaded ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          className="absolute inset-0 w-full h-full group"
          onClick={() => setIsLoaded(true)}
          aria-label={`Play ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
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
  );
}