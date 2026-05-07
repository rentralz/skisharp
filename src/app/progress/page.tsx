"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrackedLink from "@/components/TrackedLink";
import { techniques } from "@/data/techniques";
import { useProgress } from "@/hooks/useProgress";
import { trackEvent } from "@/lib/analytics";

export default function ProgressPage() {
  const { stats, isPracticed, isBookmarked, togglePracticed, toggleBookmark } = useProgress();

  const practicedTechniques = techniques.filter((t) => isPracticed(t.id));
  const bookmarkedTechniques = techniques.filter((t) => isBookmarked(t.id));
  const totalTechniques = techniques.length;
  const progressPct = Math.round((stats.practicedCount / totalTechniques) * 100);

  const practicedByRating = {
    green: practicedTechniques.filter((t) => t.rating === "green").length,
    blue: practicedTechniques.filter((t) => t.rating === "blue").length,
    black: practicedTechniques.filter((t) => t.rating === "black").length,
    "double-black": practicedTechniques.filter((t) => t.rating === "double-black").length,
  };

  const totalByRating = {
    green: techniques.filter((t) => t.rating === "green").length,
    blue: techniques.filter((t) => t.rating === "blue").length,
    black: techniques.filter((t) => t.rating === "black").length,
    "double-black": techniques.filter((t) => t.rating === "double-black").length,
  };

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <Navbar />

      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-[#222] mb-2">Your Progress</h1>
        <p className="text-[#646464] text-sm mb-8">
          Track your skiing journey. Data is saved locally on this device — no account needed.
        </p>

        {/* Stats overview */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-xl bg-[#F5F2EF] text-center">
            <p className="text-3xl font-bold text-[#222]">{stats.practicedCount}</p>
            <p className="text-xs text-[#888] mt-1">Practiced</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 text-center">
            <p className="text-3xl font-bold text-[#222]">{stats.bookmarkedCount}</p>
            <p className="text-xs text-[#888] mt-1">Saved</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 text-center">
            <p className="text-3xl font-bold text-[#B4835A]">
              {stats.streak > 0 ? `${stats.streak} 🔥` : "—"}
            </p>
            <p className="text-xs text-[#888] mt-1">Day Streak</p>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#222]">Overall Progress</span>
            <span className="text-sm text-[#B4835A] font-bold">{progressPct}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#B4835A] to-[#D4A574] rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-[#aaa] mt-1">{stats.practicedCount} of {totalTechniques} techniques</p>
        </div>

        {/* Progress by level */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-[#222] mb-4">By Level</h2>
          <div className="space-y-3">
            {[
              { key: "green" as const, label: "Green (Beginner)", color: "bg-emerald-500" },
              { key: "blue" as const, label: "Blue (Intermediate)", color: "bg-blue-500" },
              { key: "black" as const, label: "Black (Advanced)", color: "bg-gray-800" },
              { key: "double-black" as const, label: "Double Black (Expert)", color: "bg-purple-600" },
            ].map((level) => {
              const done = practicedByRating[level.key];
              const total = totalByRating[level.key];
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;
              return (
                <div key={level.key} className="flex items-center gap-4">
                  <span className={`w-3 h-3 rounded-full ${level.color} shrink-0`} />
                  <span className="text-sm text-[#222] w-44 shrink-0">{level.label}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${level.color} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-[#888] w-14 text-right shrink-0">{done}/{total}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bookmarked techniques */}
        {bookmarkedTechniques.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-[#222] mb-4">📌 Saved for Later</h2>
            <div className="space-y-2">
              {bookmarkedTechniques.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-200">
                  <TrackedLink
                    href={`/techniques/${t.slug}?discipline=${t.discipline}`}
                    linkKind="next"
                    eventName="progress_saved_technique_click"
                    eventParams={{
                      technique_slug: t.slug,
                      technique_title: t.title,
                      discipline: t.discipline,
                    }}
                    className="text-sm text-[#222] hover:text-[#B4835A] transition-colors font-medium"
                  >
                    {t.title}
                  </TrackedLink>
                  <div className="flex items-center gap-2">
                    {isPracticed(t.id) && <span className="text-xs text-emerald-600">✓ practiced</span>}
                    <button
                      onClick={() => {
                        trackEvent("progress_saved_remove_click", {
                          technique_id: t.id,
                          technique_slug: t.slug,
                          technique_title: t.title,
                          discipline: t.discipline,
                        });
                        toggleBookmark(t.id);
                      }}
                      className="text-xs text-[#aaa] hover:text-red-500 transition-colors"
                    >
                      remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recently practiced */}
        {practicedTechniques.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-[#222] mb-4">✅ Practiced</h2>
            <div className="space-y-2">
              {practicedTechniques.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-xl border border-emerald-100 bg-emerald-50/30">
                  <TrackedLink
                    href={`/techniques/${t.slug}?discipline=${t.discipline}`}
                    linkKind="next"
                    eventName="progress_practiced_technique_click"
                    eventParams={{
                      technique_slug: t.slug,
                      technique_title: t.title,
                      discipline: t.discipline,
                    }}
                    className="text-sm text-[#222] hover:text-[#B4835A] transition-colors font-medium"
                  >
                    {t.title}
                  </TrackedLink>
                  <button
                    onClick={() => {
                      trackEvent("progress_practiced_undo_click", {
                        technique_id: t.id,
                        technique_slug: t.slug,
                        technique_title: t.title,
                        discipline: t.discipline,
                      });
                      togglePracticed(t.id);
                    }}
                    className="text-xs text-[#aaa] hover:text-red-500 transition-colors"
                  >
                    undo
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {stats.practicedCount === 0 && stats.bookmarkedCount === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-4">🎿</p>
            <h2 className="text-xl font-bold text-[#222] mb-2">No progress yet</h2>
            <p className="text-[#888] text-sm mb-6 max-w-sm mx-auto">
              Start by taking the skill quiz to find your level, then mark techniques
              as practiced as you work through them.
            </p>
            <div className="flex items-center justify-center gap-3">
              <TrackedLink
                href="/quiz"
                linkKind="next"
                eventName="progress_empty_state_cta_click"
                eventParams={{ cta_target: "quiz" }}
                className="bg-[#222] hover:bg-[#333] text-white font-medium px-5 py-2 rounded-full text-sm transition-colors"
              >
                Take the Quiz →
              </TrackedLink>
              <TrackedLink
                href="/techniques"
                linkKind="next"
                eventName="progress_empty_state_cta_click"
                eventParams={{ cta_target: "techniques" }}
                className="text-[#B4835A] text-sm font-medium hover:text-[#9A7049] transition-colors"
              >
                Browse Techniques
              </TrackedLink>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
