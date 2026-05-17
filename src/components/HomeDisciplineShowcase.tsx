"use client";

import Link from "next/link";
import { DISCIPLINES, type Discipline } from "@/data/disciplines";
import type { DifficultyRating } from "@/data/techniques";
import { useDisciplinePreference } from "@/hooks/useDisciplinePreference";

const RATING_META: Record<
  DifficultyRating,
  {
    label: string;
    badgeClass: string;
  }
> = {
  green: {
    label: "Green",
    badgeClass: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  },
  blue: {
    label: "Blue",
    badgeClass: "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200",
  },
  black: {
    label: "Black",
    badgeClass: "bg-slate-100 text-slate-800 ring-1 ring-inset ring-slate-300",
  },
  "double-black": {
    label: "Double Black",
    badgeClass: "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200",
  },
};

interface LearningPathCard {
  level: string;
  href: string;
  count: number;
  badge: string;
  description: string;
  focus: string[];
  image: string;
  entryLabel: string;
}

interface FeaturedTechniqueCard {
  id: string;
  slug: string;
  title: string;
  promise: string;
  rating: DifficultyRating;
  terrain: string[];
  updatedAt?: string;
  primaryVideo: {
    videoId: string;
    channel: string;
  };
}

interface DisciplineShowcaseContent {
  learningPaths: LearningPathCard[];
  featuredTechniques: FeaturedTechniqueCard[];
}

interface Props {
  contentByDiscipline: Record<Discipline, DisciplineShowcaseContent>;
}

function formatUpdatedAt(updatedAt?: string) {
  if (!updatedAt) {
    return "Freshly curated";
  }

  const date = new Date(`${updatedAt}-01T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return "Freshly curated";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function HomeDisciplineShowcase({ contentByDiscipline }: Props) {
  const { discipline } = useDisciplinePreference();
  const disciplineLabel = DISCIPLINES[discipline].label.toLowerCase();
  const showcase = contentByDiscipline[discipline];

  return (
    <>
      <section className="py-12 md:py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a56f43]">
              Choose your path
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#201d1a]">
              One learning-path section. One obvious place to begin.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[#6c6259] sm:text-base">
            These {disciplineLabel}-specific tracks give you a clean first click, a clear next
            skill, and enough structure to keep moving without guesswork.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {showcase.learningPaths.map((path) => (
            <Link
              key={`${discipline}-${path.level}`}
              href={`${path.href}?discipline=${discipline}`}
              className="group overflow-hidden rounded-[28px] border border-[#eadfd6] bg-white shadow-[0_14px_32px_rgba(92,68,43,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(92,68,43,0.12)]"
            >
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={path.image}
                  alt={`${path.level} ${disciplineLabel} path`}
                  loading="lazy"
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f1b18] via-[#1f1b18]/10 to-transparent" />
                <div className="absolute left-5 top-5 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#7d5431] shadow-sm">
                  {path.badge}
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-white/70">
                      {path.count} techniques
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">{path.level}</h3>
                  </div>
                  <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    Start here
                  </span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm leading-7 text-[#6b635b] sm:text-base">{path.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-[#403a34]">
                  {path.focus.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 text-[#b4835a]">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-medium text-[#7b6b5d]">
                  <span className="rounded-full bg-[#f5ece3] px-3 py-1">
                    Starts with {path.entryLabel}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a56f43]">
              Featured {disciplineLabel} techniques
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#201d1a]">
              Featured {disciplineLabel} techniques worth learning next.
            </h2>
          </div>
          <Link
            href={DISCIPLINES[discipline].libraryHref}
            className="inline-flex text-sm font-semibold text-[#8b5f39] transition-colors hover:text-[#6f4828]"
          >
            View all {disciplineLabel} techniques →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {showcase.featuredTechniques.map((technique) => {
            const rating = RATING_META[technique.rating];

            return (
              <Link
                key={technique.id}
                href={`/techniques/${technique.slug}?discipline=${discipline}`}
                className="group overflow-hidden rounded-[28px] border border-[#eadfd6] bg-white shadow-[0_14px_32px_rgba(92,68,43,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(92,68,43,0.12)]"
              >
                <div className="grid gap-0 sm:grid-cols-[220px_1fr]">
                  <div className="relative h-56 overflow-hidden sm:h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${technique.primaryVideo.videoId}/hqdefault.jpg`}
                      alt={technique.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${rating.badgeClass}`}
                      >
                        {rating.label}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#9f8d7f]">
                        Updated {formatUpdatedAt(technique.updatedAt)}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-[#201d1a]">
                      {technique.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#6b635b] sm:text-base">
                      {technique.promise}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-medium text-[#7b6b5d]">
                      <span className="rounded-full bg-[#f5ece3] px-3 py-1">
                        {technique.terrain.join(" · ")}
                      </span>
                      <span className="rounded-full bg-[#f7f2ed] px-3 py-1">
                        via {technique.primaryVideo.channel}
                      </span>
                    </div>

                    <div className="mt-5 inline-flex items-center text-sm font-semibold text-[#8b5f39] transition-colors group-hover:text-[#6f4828]">
                      Open technique →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
