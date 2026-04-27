import Link from "next/link";
import { techniques, type DifficultyRating } from "@/data/techniques";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export default function HomePage() {
  const beginnerCount = techniques.filter((t) => t.rating === "green").length;
  const intermediateCount = techniques.filter((t) => t.rating === "blue").length;
  const advancedCount = techniques.filter(
    (t) => t.rating === "black" || t.rating === "double-black",
  ).length;

  const totalVideos = techniques.reduce(
    (sum, technique) => sum + technique.youtubeVideos.length,
    0,
  );
  const uniqueChannels = new Set(
    techniques.flatMap((technique) =>
      technique.youtubeVideos.map((video) => video.channel),
    ),
  ).size;

  const learningPaths = [
    {
      level: "Beginner",
      href: "/techniques?rating=green",
      count: beginnerCount,
      badge: "Best for first chair confidence",
      description:
        "Build balance, stopping, steering, and the habits that make every green run feel calmer.",
      focus: ["Wedge turns + speed control", "Confidence on green terrain"],
      image: "https://img.youtube.com/vi/T1BsQPFdt7w/hqdefault.jpg",
    },
    {
      level: "Intermediate",
      href: "/techniques?rating=blue",
      count: intermediateCount,
      badge: "Best for cleaner parallel skiing",
      description:
        "Refine edge control, linked turns, and blue-run composure without guessing what comes next.",
      focus: ["Parallel turns + carving", "Blue-run confidence"],
      image: "https://img.youtube.com/vi/LrmCNarCzIY/hqdefault.jpg",
    },
    {
      level: "Expert",
      href: "/techniques?rating=black",
      count: advancedCount,
      badge: "Best for all-mountain precision",
      description:
        "Get tactical with moguls, powder, steeps, and the techniques that make hard terrain feel deliberate.",
      focus: ["Moguls, powder, steeps", "Tactics for difficult terrain"],
      image: "https://img.youtube.com/vi/WTX21DO7Qsc/hqdefault.jpg",
    },
  ];

  const proofCards = [
    {
      value: `${techniques.length}`,
      label: "Technique breakdowns",
      detail: "Curated lessons organized into a progression, not a random feed.",
    },
    {
      value: `${totalVideos}`,
      label: "Video explainers",
      detail: "Primary and alternate teaching styles when one instructor doesn’t click.",
    },
    {
      value: `${uniqueChannels}`,
      label: "Trusted source channels",
      detail: "A broader bench of instructors without losing structure or curation.",
    },
  ];

  const valueProps = [
    {
      title: "Curated, not cluttered",
      description:
        "We pull the clearest skiing instruction from YouTube and remove the noise, fluff, and dead ends.",
    },
    {
      title: "Built around progression",
      description:
        "Every technique points to prerequisites and next steps, so you always know what to work on next.",
    },
    {
      title: "Practical on-snow coaching",
      description:
        "Expect feel cues, common mistakes, and drills you can take straight onto the mountain.",
    },
  ];

  const featuredTechniques = [...techniques]
    .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))
    .slice(0, 4);

  return (
    <div className="flex min-h-full flex-col font-[family-name:var(--font-inter)] bg-[#fcfaf8] text-[#1f1f1f]">
      <Navbar />

      <main id="main-content" className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="py-10 md:py-14">
            <div className="overflow-hidden rounded-[32px] border border-[#eadfd6] bg-[linear-gradient(135deg,#fffaf5_0%,#fffdfb_55%,#f5eee8_100%)] p-6 shadow-[0_20px_70px_rgba(119,85,53,0.08)] sm:p-8 lg:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center rounded-full border border-[#e4d4c6] bg-white/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#a56f43] shadow-sm">
                    Curated ski instruction, not YouTube chaos
                  </div>
                  <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-[#201d1a] sm:text-5xl lg:text-6xl">
                    Learn the right turn for your level — and know what to ski next.
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f5a55] sm:text-lg">
                    TurnLab turns scattered ski videos into guided learning paths with
                    timestamps, feel cues, drills, and progression built in. Start with a
                    one-minute level check or jump straight into the library.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href="/quiz"
                      className="inline-flex items-center justify-center rounded-full bg-[#201d1a] px-6 py-3 text-sm font-semibold text-white transition-transform transition-colors hover:-translate-y-0.5 hover:bg-[#342f2a]"
                    >
                      Take the 1-minute quiz
                    </Link>
                    <Link
                      href="/techniques"
                      className="inline-flex items-center justify-center rounded-full border border-[#d9c6b5] bg-white px-6 py-3 text-sm font-semibold text-[#7d5431] transition-colors hover:border-[#c9ae96] hover:bg-[#fff6ee]"
                    >
                      Browse all techniques
                    </Link>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#6c6259]">
                    <span>✓ Free forever</span>
                    <span>✓ Beginner to expert progressions</span>
                    <span>✓ Multiple teaching styles per skill</span>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -right-10 -top-8 h-32 w-32 rounded-full bg-[#e7d2bf] blur-3xl" />
                  <div className="relative overflow-hidden rounded-[28px] border border-[#e7d8cc] bg-[#1e1b18] shadow-[0_16px_50px_rgba(43,30,18,0.18)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1100&h=1320&fit=crop&q=80"
                      alt="Skier carving down a snowy mountain"
                      className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b18] via-[#1e1b18]/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                        Start here
                      </p>
                      <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                        Go from cautious greens to confident all-mountain skiing.
                      </h2>
                      <p className="mt-3 max-w-md text-sm leading-6 text-white/80 sm:text-base">
                        Every path is built to answer the same question: what should I
                        practice today to actually get better?
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 border-t border-[#eadfd6] pt-8 md:grid-cols-3">
                {proofCards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-2xl border border-[#eadfd6] bg-white/80 p-5 shadow-[0_8px_24px_rgba(119,85,53,0.05)]"
                  >
                    <p className="text-3xl font-black tracking-tight text-[#201d1a]">
                      {card.value}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#7d5431]">
                      {card.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#6d655d]">
                      {card.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 md:py-12">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a56f43]">
                  Why TurnLab works
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#201d1a]">
                  Less searching. More deliberate skiing.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[#6c6259] sm:text-base">
                The goal is simple: stop wasting energy bouncing between random videos and
                start progressing with a system that feels calm, credible, and practical.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {valueProps.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-[#ece3db] bg-white p-6 shadow-[0_12px_30px_rgba(92,68,43,0.05)]"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f5ece3] text-sm font-bold text-[#a56f43]">
                    0{index + 1}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-[#201d1a]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6b635b] sm:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

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
                Whether you’re still figuring out your wedge or chasing better black-run
                tactics, these tracks point you to the right library first.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {learningPaths.map((path) => (
                <Link
                  key={path.level}
                  href={path.href}
                  className="group overflow-hidden rounded-[28px] border border-[#eadfd6] bg-white shadow-[0_14px_32px_rgba(92,68,43,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(92,68,43,0.12)]"
                >
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={path.image}
                      alt={`${path.level} skiing path`}
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
                        Explore
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm leading-7 text-[#6b635b] sm:text-base">
                      {path.description}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm text-[#403a34]">
                      {path.focus.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1 text-[#b4835a]">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="py-12 md:py-16">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a56f43]">
                  Freshly curated
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#201d1a]">
                  Featured techniques that feel worth clicking.
                </h2>
              </div>
              <Link
                href="/techniques"
                className="inline-flex text-sm font-semibold text-[#8b5f39] transition-colors hover:text-[#6f4828]"
              >
                View the full library →
              </Link>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {featuredTechniques.map((technique) => {
                const primaryVideo =
                  technique.youtubeVideos.find((video) => video.isPrimary) ??
                  technique.youtubeVideos[0];
                const rating = RATING_META[technique.rating];

                return (
                  <Link
                    key={technique.id}
                    href={`/techniques/${technique.slug}`}
                    className="group overflow-hidden rounded-[28px] border border-[#eadfd6] bg-white shadow-[0_14px_32px_rgba(92,68,43,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(92,68,43,0.12)]"
                  >
                    <div className="grid gap-0 sm:grid-cols-[220px_1fr]">
                      <div className="relative h-56 overflow-hidden sm:h-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://img.youtube.com/vi/${primaryVideo.videoId}/hqdefault.jpg`}
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
                            via {primaryVideo.channel}
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

          <section className="pb-16 pt-6 md:pb-20">
            <div className="rounded-[32px] bg-[#1f1b18] px-6 py-8 text-white shadow-[0_24px_70px_rgba(31,27,24,0.22)] sm:px-8 sm:py-10 lg:px-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8b08b]">
                    Make your next ski day easier
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                    Want the fastest route into the library?
                  </h2>
                  <p className="mt-4 text-base leading-8 text-white/75">
                    Take the quiz if you want a starting point, or head straight into the
                    technique library if you already know what you want to improve.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/quiz"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#201d1a] transition-colors hover:bg-[#f4ece5]"
                  >
                    Find my level
                  </Link>
                  <Link
                    href="/techniques"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    Explore techniques
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
