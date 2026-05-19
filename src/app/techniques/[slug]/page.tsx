import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { DISCIPLINES } from "@/data/disciplines";
import { techniques, getTechniqueBySlug } from "@/data/techniques";
import { buildPageMetadata } from "@/lib/seo";
import DifficultyBadge from "@/components/DifficultyBadge";
import VideoEmbed from "@/components/VideoEmbed";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import AdUnit from "@/components/AdUnit";
import ProgressButtons from "@/components/ProgressButtons";

function getRelatedTechniques(current: typeof techniques[number], prevSlug: string | null, nextSlug: string | null) {
  const excluded = new Set([
    current.slug,
    prevSlug,
    nextSlug,
    ...current.prerequisites,
    ...current.nextSteps,
  ]);

  const scored = techniques
    .filter((t) => t.discipline === current.discipline && !excluded.has(t.id) && !excluded.has(t.slug))
    .map((t) => {
      let score = 0;
      const sharedTerrain = t.terrain.filter((tr) => current.terrain.includes(tr));
      score += sharedTerrain.length * 5;
      if (t.rating === current.rating) score += 3;
      if (Math.abs(t.difficulty - current.difficulty) <= 1) score += 1;
      return { technique: t, score, sharedTerrain };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return scored;
}

export function generateStaticParams() {
  return techniques.map((technique) => ({ slug: technique.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const technique = getTechniqueBySlug(slug);

  if (!technique) {
    return {};
  }

  const disciplineInfo = DISCIPLINES[technique.discipline];
  const disciplineNoun = technique.discipline === "ski" ? "skiing" : "snowboarding";
  const keywords = Array.from(
    new Set([
      technique.title,
      `${disciplineInfo.label.toLowerCase()} technique`,
      `${technique.title.toLowerCase()} ${disciplineNoun}`,
      ...technique.terrain.map((terrain) => `${terrain.toLowerCase()} ${disciplineNoun}`),
    ]),
  );

  return buildPageMetadata({
    title: `${technique.title} | ${disciplineInfo.label} Technique | TurnLab`,
    description: `Learn ${technique.title} for ${disciplineNoun}. ${technique.description}`,
    path: `/techniques/${technique.slug}`,
    keywords,
    socialTitle: `${technique.title} | ${disciplineInfo.label} Technique | TurnLab`,
    socialDescription: `${technique.promise} Learn ${technique.title} for ${disciplineNoun} with curated video breakdowns, drills, and feel cues from TurnLab.`,
  });
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

  const disciplineInfo = DISCIPLINES[technique.discipline];
  const disciplineNoun = technique.discipline === "ski" ? "skiing" : "snowboarding";
  const disciplineHref = `/techniques?discipline=${technique.discipline}`;
  const detailHref = (targetSlug: string) => `/techniques/${targetSlug}?discipline=${technique.discipline}`;

  const disciplineTechniques = techniques.filter(
    (entry) => entry.discipline === technique.discipline,
  );
  const currentIndex = disciplineTechniques.findIndex((entry) => entry.slug === slug);
  const prev = currentIndex > 0 ? disciplineTechniques[currentIndex - 1] : null;
  const next = currentIndex < disciplineTechniques.length - 1 ? disciplineTechniques[currentIndex + 1] : null;

  const related = getRelatedTechniques(technique, prev?.slug ?? null, next?.slug ?? null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${technique.title} (${disciplineInfo.label} technique)`,
    description: `Learn ${technique.title} for ${disciplineNoun}. ${technique.description}`,
    about: {
      "@type": "Thing",
      name: `${disciplineInfo.label} technique`,
    },
    step: technique.timestamps.map((timestamp, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: timestamp.label,
      text: timestamp.detail,
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
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <Breadcrumbs
        crumbs={[
          { label: `${disciplineInfo.label} Techniques`, href: disciplineHref },
          { label: technique.title },
        ]}
      />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-[#F5F2EF] border border-[#e2d6cb] text-[#7a5a41] font-semibold uppercase tracking-wide">
              {disciplineInfo.label}
            </span>
            <DifficultyBadge difficulty={technique.difficulty} rating={technique.rating} />
            {technique.terrain.map((terrain) => (
              <span
                key={terrain}
                className="text-xs px-3 py-1 rounded-full bg-gray-50 border border-gray-300 text-gray-600"
              >
                {terrain}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            {technique.title}
          </h1>
          <p className="text-lg text-[#e8722a] font-medium leading-relaxed max-w-2xl mb-4">
            {technique.promise}
          </p>
          <p className="text-base text-gray-500 leading-relaxed max-w-2xl mb-5">{technique.description}</p>
          <ProgressButtons techniqueId={technique.id} />
        </div>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Watch &amp; Learn</h2>
          {technique.youtubeVideos.length > 1 && (
            <p className="mb-3 max-w-2xl text-sm font-medium leading-6 text-[#5f5146]">
              Not clicking? Try a different teaching style below.
            </p>
          )}
          <VideoEmbed videos={technique.youtubeVideos} />
        </section>

        {technique.timestamps.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Key Moments</h2>
            <div className="relative pl-4">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-white/10" aria-hidden="true" />
              <div className="space-y-0">
                {technique.timestamps.map((timestamp, index) => (
                  <div key={timestamp.time} className="relative flex gap-4 pb-6 last:pb-0">
                    <div
                      className="absolute -left-[5px] mt-1 w-2.5 h-2.5 rounded-full bg-[#e8722a] border-2 border-[#0d1b2a] flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div className="pl-5">
                      <div className="flex items-center gap-3 mb-0.5">
                        <span className="text-[#e8722a] font-mono text-sm font-bold">
                          {timestamp.time}
                        </span>
                        <span className="text-gray-900 font-semibold text-sm">{timestamp.label}</span>
                        <span className="text-xs text-gray-400 font-normal">Step {index + 1}</span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{timestamp.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {technique.feels.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5">What It Should Feel Like</h2>
            <ul className="space-y-3">
              {technique.feels.map((feel, index) => (
                <li
                  key={index}
                  className="flex gap-3 rounded-xl border border-[#d7eadf] bg-[#f7fbf8] p-4"
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-[#9fd0af] bg-[#dcf3e4] text-xs text-[#166534]">
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed text-[#3f4c45]">{feel}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {technique.mistakes.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Common Mistakes &amp; Fixes</h2>
            <div className="space-y-4">
              {technique.mistakes.map((item, index) => (
                <div key={index} className="overflow-hidden rounded-xl border border-[#eadfda]">
                  <div className="flex items-start gap-3 border-b border-[#f1cdc2] bg-[#fff1ee] px-5 py-3.5">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-[#f0b7a6] bg-[#ffe0d7] text-xs text-[#b42318]">
                      ✕
                    </span>
                    <p className="text-sm leading-relaxed text-[#7a271a]">{item.mistake}</p>
                  </div>
                  <div className="flex items-start gap-3 bg-[#effaf3] px-5 py-3.5">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-[#9fd0af] bg-[#dcf3e4] text-xs text-[#166534]">
                      ✓
                    </span>
                    <p className="text-sm leading-relaxed text-[#166534]">{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {technique.drills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Practice Drills</h2>
            <div className="space-y-3">
              {technique.drills.map((drill, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl bg-[#e8722a]/5 border border-[#e8722a]/15 hover:border-[#e8722a]/25 transition-colors"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#e8722a]/15 border border-[#e8722a]/25 text-[#e8722a] text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed pt-0.5">{drill}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {(technique.prerequisites.length > 0 || technique.nextSteps.length > 0) && (
          <div className="grid sm:grid-cols-2 gap-6">
            {technique.prerequisites.length > 0 && (
              <section className="rounded-xl bg-white border border-gray-200 p-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Prerequisites
                </h3>
                <ul className="space-y-2">
                  {technique.prerequisites.map((prerequisiteSlug) => {
                    const prerequisite = getTechniqueBySlug(prerequisiteSlug);

                    return prerequisite ? (
                      <li key={prerequisiteSlug}>
                        <Link
                          href={detailHref(prerequisiteSlug)}
                          className="text-[#e8722a] hover:text-[#f08040] text-sm font-medium transition-colors"
                        >
                          &larr; {prerequisite.title}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </section>
            )}
            {technique.nextSteps.length > 0 && (
              <section className="rounded-xl bg-white border border-gray-200 p-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Level Up Next
                </h3>
                <ul className="space-y-2">
                  {technique.nextSteps.map((nextSlug) => {
                    const nextTechnique = getTechniqueBySlug(nextSlug);

                    return nextTechnique ? (
                      <li key={nextSlug}>
                        <Link
                          href={detailHref(nextSlug)}
                          className="text-[#e8722a] hover:text-[#f08040] text-sm font-medium transition-colors"
                        >
                          {nextTechnique.title} &rarr;
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </section>
            )}
          </div>
        )}

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-5">Your Progression</h2>
          <div className="grid grid-cols-3 gap-3">
            {prev ? (
              <Link
                href={detailHref(prev.slug)}
                className="group rounded-xl bg-white border border-gray-200 hover:border-gray-300 p-4 transition-all"
              >
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">&larr; Previous</p>
                <p className="text-gray-900 text-sm font-semibold group-hover:text-[#e8722a] transition-colors line-clamp-2">
                  {prev.title}
                </p>
                <p className="text-gray-400 text-xs mt-1">Level {prev.difficulty}</p>
              </Link>
            ) : (
              <div className="rounded-xl border border-gray-200 p-4 opacity-30">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Previous</p>
                <p className="text-gray-400 text-sm">Start of {disciplineNoun}</p>
              </div>
            )}

            <div className="rounded-xl bg-[#e8722a]/10 border border-[#e8722a]/25 p-4">
              <p className="text-xs text-[#e8722a] uppercase tracking-wide mb-2">Current</p>
              <p className="text-gray-900 text-sm font-semibold line-clamp-2">{technique.title}</p>
              <p className="text-[#e8722a]/60 text-xs mt-1">Level {technique.difficulty}</p>
            </div>

            {next ? (
              <Link
                href={detailHref(next.slug)}
                className="group rounded-xl bg-white border border-gray-200 hover:border-gray-300 p-4 transition-all"
              >
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Next Up &rarr;</p>
                <p className="text-gray-900 text-sm font-semibold group-hover:text-[#e8722a] transition-colors line-clamp-2">
                  {next.title}
                </p>
                <p className="text-gray-400 text-xs mt-1">Level {next.difficulty}</p>
              </Link>
            ) : (
              <div className="rounded-xl border border-gray-200 p-4 opacity-30">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Next Up</p>
                <p className="text-gray-400 text-sm">End of {disciplineNoun}</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {related.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Related Techniques</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map(({ technique: rt, sharedTerrain }) => (
                <Link
                  key={rt.slug}
                  href={detailHref(rt.slug)}
                  className="group rounded-xl bg-white border border-gray-200 hover:border-[#e8722a]/40 hover:shadow-md transition-all p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 font-medium">
                      {rt.rating}
                    </span>
                    {sharedTerrain.length > 0 && (
                      <span className="text-[10px] text-[#e8722a] font-medium uppercase tracking-wide">
                        {sharedTerrain.join(" · ")}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-900 text-sm font-semibold group-hover:text-[#e8722a] transition-colors line-clamp-2">
                    {rt.title}
                  </p>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">{rt.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AdUnit slot="technique-detail" format="horizontal" />
      </div>

      <Footer />
    </div>
  );
}
