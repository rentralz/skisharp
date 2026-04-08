import Link from "next/link";
import type { Technique } from "@/data/techniques";
import DifficultyBadge from "./DifficultyBadge";
import DifficultyDots from "./badges/DifficultyDots";
import ReadTime from "./badges/ReadTime";
import UpdatedBadge from "./badges/UpdatedBadge";
import ShareButton from "./ShareButton";
import TerrainTags from "./TerrainTags";

interface Props {
  technique: Technique;
}

export default function TechniqueCard({ technique }: Props) {
  const primaryVideo =
    technique.youtubeVideos.find((v) => v.isPrimary) ?? technique.youtubeVideos[0];

  return (
    <Link
      href={`/techniques/${technique.slug}`}
      aria-label={`View technique: ${technique.title}`}
      className="group block rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative h-44 bg-gray-100 overflow-hidden">
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

        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center group-hover:bg-[#e8722a] group-hover:scale-110 transition-all duration-300">
            <svg
              className="w-5 h-5 text-gray-800 group-hover:text-white ml-0.5 transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div className="absolute top-3 right-3 bg-white/90 text-gray-700 text-xs px-2 py-1 rounded-full font-medium shadow-sm">
          {technique.youtubeVideos.length} video{technique.youtubeVideos.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <DifficultyBadge
            difficulty={technique.difficulty}
            rating={technique.rating}
          />{" "}
          <DifficultyDots level={technique.difficulty} />{" "}
          <ReadTime
            videos={technique.youtubeVideos.length}
            description={technique.description}
          />{" "}
          <ShareButton url={`/techniques/${technique.slug}`} />
        </div>

        <h3 className="text-gray-900 font-semibold text-lg mb-1.5 group-hover:text-[#e8722a] transition-colors">
          {technique.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
          {technique.description}
        </p>

        <TerrainTags terrain={technique.terrain} />
        {technique.updatedAt && <UpdatedBadge date={technique.updatedAt} />}
      </div>
    </Link>
  );
}
