"use client";

import { type TechniqueId } from "@/data/techniques";
import { useProgress } from "@/hooks/useProgress";
import { trackEvent } from "@/lib/analytics";

interface Props {
  techniqueId: TechniqueId;
}

export default function ProgressButtons({ techniqueId }: Props) {
  const { togglePracticed, toggleBookmark, isPracticed, isBookmarked, stats } = useProgress();
  const practiced = isPracticed(techniqueId);
  const bookmarked = isBookmarked(techniqueId);

  const handlePracticedToggle = () => {
    trackEvent("technique_progress_toggle", {
      technique_id: techniqueId,
      next_state: practiced ? "remove_practiced" : "mark_practiced",
      current_streak: stats.streak,
      practiced_count: stats.practicedCount,
    });
    togglePracticed(techniqueId);
  };

  const handleBookmarkToggle = () => {
    trackEvent("technique_bookmark_toggle", {
      technique_id: techniqueId,
      next_state: bookmarked ? "remove_bookmark" : "save_bookmark",
      bookmarked_count: stats.bookmarkedCount,
    });
    toggleBookmark(techniqueId);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePracticedToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            practiced
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-gray-100 text-[#646464] border border-gray-200 hover:border-[#B4835A] hover:text-[#B4835A]"
          }`}
          aria-pressed={practiced}
        >
          {practiced ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
              Practiced ✓
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
              Mark as Practiced
            </>
          )}
        </button>

        <button
          onClick={handleBookmarkToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            bookmarked
              ? "bg-amber-50 text-amber-700 border border-amber-200"
              : "bg-gray-100 text-[#646464] border border-gray-200 hover:border-[#B4835A] hover:text-[#B4835A]"
          }`}
          aria-pressed={bookmarked}
        >
          {bookmarked ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/></svg>
              Saved
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
              Save technique
            </>
          )}
        </button>
      </div>

      {/* Mini streak indicator */}
      {stats.streak > 0 && (
        <p className="text-xs text-[#B4835A] font-medium">
          🔥 {stats.streak} day streak · {stats.practicedCount} techniques practiced
        </p>
      )}
    </div>
  );
}
