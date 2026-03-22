import { notFound } from "next/navigation";
import Link from "next/link";
import { techniques, getTechniqueBySlug } from "@/data/techniques";
import DifficultyBadge from "@/components/DifficultyBadge";
import VideoEmbed from "@/components/VideoEmbed";
import type { Metadata } from "next";

export function generateStaticParams() {
  return techniques.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const technique = getTechniqueBySlug(slug);
  if (!technique) return {};
  return {
    title: technique.title,
    description: technique.description,
  };
}

export default async function TechniqueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const technique = getTechniqueBySlug(slug);

  if (!technique) {
    notFound();
  }

  const prevIndex = techniques.findIndex((t) => t.slug === slug) - 1;
  const nextIndex = techniques.findIndex((t) => t.slug === slug) + 1;
  const prev = prevIndex >= 0 ? techniques[prevIndex] : null;
  const next = nextIndex < techniques.length ? techniques[nextIndex] : null;

  return (
    <div className="min-h-screen bg-[#0d1b2a] font-[family-name:var(--font-inter)]">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-[#0d1b2a]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-white">
            Ski<span className="text-[#e8722a]">Sharp</span>
          </Link>
          <Link
            href="/techniques"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            &larr; All Techniques
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Title block */}
        <div>
          <div className="mb-4">
            <DifficultyBadge difficulty={technique.difficulty} rating={technique.rating} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {technique.title}
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">{technique.description}</p>

          {/* Terrain tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {technique.terrain.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Promise callout */}
        <div className="rounded-xl bg-[#e8722a]/10 border border-[#e8722a]/20 p-5">
          <p className="text-sm font-semibold text-[#e8722a] uppercase tracking-wide mb-1">
            What you&apos;ll gain
          </p>
          <p className="text-white leading-relaxed">{technique.promise}</p>
        </div>

        {/* Video embed */}
        <section>
          <h2 className="text-xl font-bold text-white mb-5">Watch &amp; Learn</h2>
          <VideoEmbed videos={technique.youtubeVideos} />
        </section>

        {/* Timestamps */}
        {technique.timestamps.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-5">Key Moments</h2>
            <div className="space-y-3">
              {technique.timestamps.map((ts) => (
                <div
                  key={ts.time}
                  className="flex gap-4 p-4 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <span className="text-[#e8722a] font-mono text-sm font-bold flex-shrink-0 w-12 pt-0.5">
                    {ts.time}
                  </span>
                  <div>
                    <p className="text-white font-semibold text-sm">{ts.label}</p>
                    <p className="text-gray-400 text-sm mt-0.5">{ts.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* What it feels like */}
        {technique.feels.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-5">What It Should Feel Like</h2>
            <ul className="space-y-3">
              {technique.feels.map((feel, i) => (
                <li key={i} className="flex gap-3 text-gray-300">
                  <span className="text-[#e8722a] flex-shrink-0 mt-0.5">&#x2713;</span>
                  <span>{feel}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Common mistakes */}
        {technique.mistakes.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-5">Common Mistakes &amp; Fixes</h2>
            <div className="space-y-4">
              {technique.mistakes.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/5 overflow-hidden"
                >
                  <div className="bg-red-950/30 border-b border-white/5 px-5 py-3 flex gap-3">
                    <span className="text-red-400 flex-shrink-0">&#x2717;</span>
                    <p className="text-red-300 text-sm">{item.mistake}</p>
                  </div>
                  <div className="bg-emerald-950/20 px-5 py-3 flex gap-3">
                    <span className="text-emerald-400 flex-shrink-0">&#x2713;</span>
                    <p className="text-emerald-300 text-sm">{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Prerequisites + Next Steps */}
        <div className="grid sm:grid-cols-2 gap-6">
          {technique.prerequisites.length > 0 && (
            <section className="rounded-xl bg-white/3 border border-white/5 p-5">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Prerequisites
              </h3>
              <ul className="space-y-2">
                {technique.prerequisites.map((slug) => {
                  const pre = getTechniqueBySlug(slug);
                  return pre ? (
                    <li key={slug}>
                      <Link
                        href={`/techniques/${slug}`}
                        className="text-[#e8722a] hover:text-[#f08040] text-sm font-medium transition-colors"
                      >
                        &larr; {pre.title}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </section>
          )}

          {technique.nextSteps.length > 0 && (
            <section className="rounded-xl bg-white/3 border border-white/5 p-5">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Level Up Next
              </h3>
              <ul className="space-y-2">
                {technique.nextSteps.map((slug) => {
                  const next = getTechniqueBySlug(slug);
                  return next ? (
                    <li key={slug}>
                      <Link
                        href={`/techniques/${slug}`}
                        className="text-[#e8722a] hover:text-[#f08040] text-sm font-medium transition-colors"
                      >
                        {next.title} &rarr;
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </section>
          )}
        </div>

        {/* Prev / Next navigation */}
        <nav className="flex items-center justify-between pt-6 border-t border-white/5">
          {prev ? (
            <Link
              href={`/techniques/${prev.slug}`}
              className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <span>&larr;</span>
              <span className="group-hover:underline">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/techniques/${next.slug}`}
              className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <span className="group-hover:underline">{next.title}</span>
              <span>&rarr;</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
    </div>
  );
}
