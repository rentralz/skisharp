import { notFound } from "next/navigation";
import Link from "next/link";
import { techniques, getTechniqueBySlug } from "@/data/techniques";
import DifficultyBadge from "@/components/DifficultyBadge";
import VideoEmbed from "@/components/VideoEmbed";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import AdUnit from "@/components/AdUnit";
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

  const currentIndex = techniques.findIndex((t) => t.slug === slug);
  const prev = currentIndex > 0 ? techniques[currentIndex - 1] : null;
  const next = currentIndex < techniques.length - 1 ? techniques[currentIndex + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: technique.title,
    description: technique.description,
    step: technique.timestamps.map((ts, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: ts.label,
      text: ts.detail,
    })),
    ...(technique.youtubeVideos[0] && {
      video: {
        "@type": "VideoObject",
        name: technique.youtubeVideos[0].title,
        embedUrl: `https://www.youtube.com/embed/${technique.youtubeVideos[0].videoId}`,
        thumbnailUrl: `https://img.youtube.com/vi/${technique.youtubeVideos[0].videoId}/maxresdefault.jpg`,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] font-[family-name:var(--font-inter)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <Breadcrumbs crumbs={[{label:'Techniques',href:'/techniques'},{label:technique.title}]} />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Title block */}
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <DifficultyBadge difficulty={technique.difficulty} rating={technique.rating} />
            {technique.terrain.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            {technique.title}
          </h1>
          {/* Promise subtitle */}
          <p className="text-lg text-[#e8722a] font-medium leading-relaxed max-w-2xl mb-4">
            {technique.promise}
          </p>
          <p className="text-base text-gray-400 leading-relaxed max-w-2xl">{technique.description}</p>
        </div>

        {/* Video embed */}
        <section>
          <h2 className="text-xl font-bold text-white mb-2">Watch &amp; Learn</h2>
          {technique.youtubeVideos.length > 1 && (
            <p className="text-xs text-gray-500 mb-3">
              Not clicking? Try a different teaching style below:
            </p>
          )}
          <VideoEmbed videos={technique.youtubeVideos} />
        </section>

        {/* Timeline timestamps */}
        {technique.timestamps.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-5">Key Moments</h2>
            <div className="relative pl-4">
              {/* Vertical line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-white/10" aria-hidden="true" />
              <div className="space-y-0">
                {technique.timestamps.map((ts, i) => (
                  <div key={ts.time} className="relative flex gap-4 pb-6 last:pb-0">
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-[5px] mt-1 w-2.5 h-2.5 rounded-full bg-[#e8722a] border-2 border-[#0d1b2a] flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div className="pl-5">
                      <div className="flex items-center gap-3 mb-0.5">
                        <span className="text-[#e8722a] font-mono text-sm font-bold">
                          {ts.time}
                        </span>
                        <span className="text-white font-semibold text-sm">{ts.label}</span>
                        <span className="text-xs text-gray-600 font-normal">Step {i + 1}</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{ts.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* What it feels like */}
        {technique.feels.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-5">What It Should Feel Like</h2>
            <ul className="space-y-3">
              {technique.feels.map((feel, i) => (
                <li
                  key={i}
                  className="flex gap-3 p-4 rounded-xl bg-white/3 border border-white/5"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-center mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-200 text-sm leading-relaxed">{feel}</span>
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
                <div key={i} className="rounded-xl border border-white/5 overflow-hidden">
                  <div className="bg-red-950/40 border-b border-red-900/30 px-5 py-3.5 flex gap-3 items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs flex items-center justify-center mt-0.5">
                      ✕
                    </span>
                    <p className="text-red-300 text-sm leading-relaxed">{item.mistake}</p>
                  </div>
                  <div className="bg-emerald-950/25 px-5 py-3.5 flex gap-3 items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-center mt-0.5">
                      ✓
                    </span>
                    <p className="text-emerald-300 text-sm leading-relaxed">{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Practice drills */}
        {technique.drills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-5">Practice Drills</h2>
            <div className="space-y-3">
              {technique.drills.map((drill, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl bg-[#e8722a]/5 border border-[#e8722a]/15 hover:border-[#e8722a]/25 transition-colors"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#e8722a]/15 border border-[#e8722a]/25 text-[#e8722a] text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-gray-300 text-sm leading-relaxed pt-0.5">{drill}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Prerequisites + Next Steps */}
        {(technique.prerequisites.length > 0 || technique.nextSteps.length > 0) && (
          <div className="grid sm:grid-cols-2 gap-6">
            {technique.prerequisites.length > 0 && (
              <section className="rounded-xl bg-white/3 border border-white/5 p-5">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  Prerequisites
                </h3>
                <ul className="space-y-2">
                  {technique.prerequisites.map((prereqSlug) => {
                    const pre = getTechniqueBySlug(prereqSlug);
                    return pre ? (
                      <li key={prereqSlug}>
                        <Link
                          href={`/techniques/${prereqSlug}`}
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
                  {technique.nextSteps.map((nextSlug) => {
                    const nextTech = getTechniqueBySlug(nextSlug);
                    return nextTech ? (
                      <li key={nextSlug}>
                        <Link
                          href={`/techniques/${nextSlug}`}
                          className="text-[#e8722a] hover:text-[#f08040] text-sm font-medium transition-colors"
                        >
                          {nextTech.title} &rarr;
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </section>
            )}
          </div>
        )}

        {/* Prev / Current / Next progression cards */}
        <section>
          <h2 className="text-xl font-bold text-white mb-5">Your Progression</h2>
          <div className="grid grid-cols-3 gap-3">
            {prev ? (
              <Link
                href={`/techniques/${prev.slug}`}
                className="group rounded-xl bg-white/3 border border-white/5 hover:border-white/15 p-4 transition-all"
              >
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">&larr; Previous</p>
                <p className="text-white text-sm font-semibold group-hover:text-[#e8722a] transition-colors line-clamp-2">
                  {prev.title}
                </p>
                <p className="text-gray-600 text-xs mt-1">Level {prev.difficulty}</p>
              </Link>
            ) : (
              <div className="rounded-xl border border-white/5 p-4 opacity-30">
                <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Previous</p>
                <p className="text-gray-600 text-sm">Start of path</p>
              </div>
            )}

            <div className="rounded-xl bg-[#e8722a]/10 border border-[#e8722a]/25 p-4">
              <p className="text-xs text-[#e8722a] uppercase tracking-wide mb-2">Current</p>
              <p className="text-white text-sm font-semibold line-clamp-2">{technique.title}</p>
              <p className="text-[#e8722a]/60 text-xs mt-1">Level {technique.difficulty}</p>
            </div>

            {next ? (
              <Link
                href={`/techniques/${next.slug}`}
                className="group rounded-xl bg-white/3 border border-white/5 hover:border-white/15 p-4 transition-all"
              >
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Next Up &rarr;</p>
                <p className="text-white text-sm font-semibold group-hover:text-[#e8722a] transition-colors line-clamp-2">
                  {next.title}
                </p>
                <p className="text-gray-600 text-xs mt-1">Level {next.difficulty}</p>
              </Link>
            ) : (
              <div className="rounded-xl border border-white/5 p-4 opacity-30">
                <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Next Up</p>
                <p className="text-gray-600 text-sm">End of path</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Ad — between content and footer */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AdUnit slot="technique-detail" format="horizontal" />
      </div>

      <Footer />
    </div>
  );
}
