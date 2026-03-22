import Link from "next/link";
import type { Technique } from "@/data/techniques";
import DifficultyBadge from "./DifficultyBadge";

interface Props {
  technique: Technique;
}

const GRADIENT_BY_RATING = {
  green: "from-emerald-900 via-emerald-800 to-emerald-700",
  blue: "from-blue-950 via-blue-900 to-blue-700",
  black: "from-gray-950 via-gray-900 to-gray-700",
  "double-black": "from-purple-950 via-purple-900 to-purple-700",
};

const TERRAIN_COLORS: Record<string, string> = {
  Groomed: "bg-blue-900/60 text-blue-200 border border-blue-700/40",
  Moguls: "bg-gray-800/60 text-gray-200 border border-gray-600/40",
  Powder: "bg-sky-900/60 text-sky-200 border border-sky-700/40",
  Trees: "bg-green-900/60 text-green-200 border border-green-700/40",
  Ice: "bg-cyan-900/60 text-cyan-200 border border-cyan-700/40",
};

export default function TechniqueCard({ technique }: Props) {
  const gradient = GRADIENT_BY_RATING[technique.rating];
  const primaryVideo = technique.youtubeVideos.find((v) => v.isPrimary) ?? technique.youtubeVideos[0];

  return (
    <Link
      href={`/techniques/${technique.slug}`}
      aria-label={`View technique: ${technique.title}`}
      className="group block rounded-xl overflow-hidden bg-[#111827] border border-white/5 hover:border-[#e8722a]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#e8722a]/10"
    >
      {/* Thumbnail */}
      <div className={`relative h-44 bg-gradient-to-br ${gradient} overflow-hidden`}>
        {/* YouTube thumbnail */}
        {primaryVideo && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`https://img.youtube.com/vi/${primaryVideo.videoId}/hqdefault.jpg`}
            alt={`Video thumbnail: ${technique.title} skiing technique`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center group-hover:bg-[#e8722a]/80 group-hover:border-[#e8722a] transition-all duration-300">
            <svg
              className="w-6 h-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Video count badge */}
        <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full font-medium">
          {technique.youtubeVideos.length} video{technique.youtubeVideos.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <DifficultyBadge difficulty={technique.difficulty} rating={technique.rating} />
        </div>

        <h3 className="text-white font-semibold text-lg mb-1.5 group-hover:text-[#e8722a] transition-colors">
          {technique.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2">
          {technique.description}
        </p>

        {/* Terrain tags */}
        <div className="flex flex-wrap gap-1.5">
          {technique.terrain.map((t) => (
            <span
              key={t}
              className={`text-xs px-2 py-0.5 rounded-full ${TERRAIN_COLORS[t] ?? "bg-gray-800 text-gray-300"}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
