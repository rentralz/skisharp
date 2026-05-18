import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeDisciplineShowcase from "@/components/HomeDisciplineShowcase";
import HomeHeroDisciplineSwitch from "@/components/HomeHeroDisciplineSwitch";
import HomeDisciplineLibraryCta from "@/components/HomeDisciplineLibraryCta";
import { DISCIPLINES, type Discipline } from "@/data/disciplines";
import { buildAbsoluteUrl } from "@/lib/seo";
import {
  getTechniqueBySlug,
  techniques,
  type DifficultyRating,
  type Technique,
  type VideoEntry,
} from "@/data/techniques";

const HOME_TITLE = "TurnLab — Master Every Turn";
const HOME_DESCRIPTION =
  "Curated ski and snowboard technique guides with structured learning paths, video breakdowns, drills, and feel cues that help you improve faster on snow.";

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  keywords: [
    "ski techniques",
    "snowboard techniques",
    "ski instruction videos",
    "snowboard instruction videos",
    "ski drills",
    "how to ski better",
    "how to snowboard better",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: HOME_TITLE,
    description:
      "The internet's best ski and snowboard instruction videos — curated, organized, and structured into learning paths that actually work.",
    url: buildAbsoluteUrl("/"),
    siteName: "TurnLab",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: HOME_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description:
      "Curated ski and snowboard technique guides with step-by-step video breakdowns, drills, and progression paths.",
    images: ["/og-image.png"],
  },
};

type HomePathKey = "beginner" | "intermediate" | "expert";

const PATH_RATING_GROUPS: Record<HomePathKey, DifficultyRating[]> = {
  beginner: ["green"],
  intermediate: ["blue"],
  expert: ["black", "double-black"],
};

const PATH_COPY: Record<
  Discipline,
  Record<
    HomePathKey,
    {
      level: string;
      badge: string;
      description: string;
      focus: string[];
      starterSlug: string;
    }
  >
> = {
  ski: {
    beginner: {
      level: "Beginner",
      badge: "Build calm first-run confidence",
      description:
        "Start with stance, stopping, and steering basics that make green runs feel slower, safer, and more predictable.",
      focus: ["Wedge turns + speed control", "Confident movement on green terrain"],
      starterSlug: "wedge-turns",
    },
    intermediate: {
      level: "Intermediate",
      badge: "Refine parallel skiing",
      description:
        "Dial in cleaner turn shape, edge grip, and rhythm so blue runs start feeling deliberate instead of reactive.",
      focus: ["Parallel turns + carving", "Composure on groomed blue runs"],
      starterSlug: "parallel-turns",
    },
    expert: {
      level: "Expert",
      badge: "Get tactical all over the mountain",
      description:
        "Work on quicker decisions, stronger line choice, and precision in steeps, bumps, powder, and technical terrain.",
      focus: ["Short turns, steeps, powder", "All-mountain tactics and precision"],
      starterSlug: "short-turns",
    },
  },
  snowboard: {
    beginner: {
      level: "Beginner",
      badge: "Lock in the fundamentals first",
      description:
        "Build the body position, edge awareness, and one-foot control that make early snowboard days feel far less chaotic.",
      focus: ["Athletic stance + edge awareness", "First turns and lift-line control"],
      starterSlug: "snowboard-athletic-stance",
    },
    intermediate: {
      level: "Intermediate",
      badge: "Turn cleaner and trust the edge",
      description:
        "Improve garlands, carving basics, and switch comfort so your riding gets smoother, stronger, and more intentional.",
      focus: ["Turn initiation + carving", "Blue-run confidence and versatility"],
      starterSlug: "snowboard-garlands",
    },
    expert: {
      level: "Expert",
      badge: "Handle soft snow and changing terrain",
      description:
        "Move beyond groomer autopilot with better rhythm, float, and decision-making when snow conditions get more demanding.",
      focus: ["Variable snow + powder basics", "More adaptable all-mountain riding"],
      starterSlug: "snowboard-powder-basics",
    },
  },
};

const FEATURED_TECHNIQUE_SLUGS: Record<Discipline, string[]> = {
  ski: ["hockey-stop", "parallel-turns", "pole-planting", "short-turns"],
  snowboard: [
    "snowboard-athletic-stance",
    "snowboard-linked-turns",
    "snowboard-basic-carving",
    "snowboard-powder-basics",
  ],
};

const valueProps = [
  {
    title: "Curated, not cluttered",
    description:
      "We pull the clearest ski and snowboard instruction from YouTube and remove the noise, fluff, and dead ends.",
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

function getPrimaryVideo(technique: Technique): VideoEntry {
  const primaryVideo = technique.youtubeVideos.find((video) => video.isPrimary) ?? technique.youtubeVideos[0];

  if (!primaryVideo) {
    throw new Error(`Technique is missing a video: ${technique.slug}`);
  }

  return primaryVideo;
}

function requireTechnique(slug: string): Technique {
  const technique = getTechniqueBySlug(slug);

  if (!technique) {
    throw new Error(`Missing homepage technique configuration for slug: ${slug}`);
  }

  return technique;
}

function buildHomeShowcaseContent() {
  const disciplineKeys = Object.keys(DISCIPLINES) as Discipline[];

  return disciplineKeys.reduce(
    (acc, discipline) => {
      const learningPaths = (Object.keys(PATH_RATING_GROUPS) as HomePathKey[]).map((pathKey) => {
        const copy = PATH_COPY[discipline][pathKey];
        const starterTechnique = requireTechnique(copy.starterSlug);
        const primaryVideo = getPrimaryVideo(starterTechnique);
        const count = techniques.filter(
          (technique) =>
            technique.discipline === discipline && PATH_RATING_GROUPS[pathKey].includes(technique.rating),
        ).length;

        return {
          level: copy.level,
          href: `/techniques/${starterTechnique.slug}`,
          count,
          badge: copy.badge,
          description: copy.description,
          focus: copy.focus,
          image: `https://img.youtube.com/vi/${primaryVideo.videoId}/hqdefault.jpg`,
          entryLabel: starterTechnique.title,
        };
      });

      const featuredTechniques = FEATURED_TECHNIQUE_SLUGS[discipline].map((slug) => {
        const technique = requireTechnique(slug);
        const primaryVideo = getPrimaryVideo(technique);

        return {
          id: technique.id,
          slug: technique.slug,
          title: technique.title,
          promise: technique.promise,
          rating: technique.rating,
          terrain: technique.terrain,
          updatedAt: technique.updatedAt,
          primaryVideo: {
            videoId: primaryVideo.videoId,
            channel: primaryVideo.channel,
          },
        };
      });

      acc[discipline] = {
        learningPaths,
        featuredTechniques,
      };

      return acc;
    },
    {} as Record<
      Discipline,
      {
        learningPaths: {
          level: string;
          href: string;
          count: number;
          badge: string;
          description: string;
          focus: string[];
          image: string;
          entryLabel: string;
        }[];
        featuredTechniques: {
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
        }[];
      }
    >,
  );
}

export default function HomePage() {
  const totalVideos = techniques.reduce(
    (sum, technique) => sum + technique.youtubeVideos.length,
    0,
  );
  const uniqueChannels = new Set(
    techniques.flatMap((technique) =>
      technique.youtubeVideos.map((video) => video.channel),
    ),
  ).size;

  const proofCards = [
    {
      value: `${techniques.length}`,
      label: "Technique breakdowns",
      detail: "Curated lessons organized into progressions instead of a random feed.",
    },
    {
      value: `${totalVideos}`,
      label: "Video explainers",
      detail: "Primary and alternate teaching styles when one instructor doesn’t click.",
    },
    {
      value: `${uniqueChannels}`,
      label: "Trusted source channels",
      detail: "A deeper bench of instructors without losing structure or curation.",
    },
  ];

  const homeShowcaseContent = buildHomeShowcaseContent();
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": buildAbsoluteUrl("/#organization"),
        name: "TurnLab",
        url: buildAbsoluteUrl("/"),
        logo: buildAbsoluteUrl("/icon.svg"),
      },
      {
        "@type": "WebSite",
        "@id": buildAbsoluteUrl("/#website"),
        url: buildAbsoluteUrl("/"),
        name: "TurnLab",
        description: HOME_DESCRIPTION,
        publisher: {
          "@id": buildAbsoluteUrl("/#organization"),
        },
      },
    ],
  };

  return (
    <div className="flex min-h-full flex-col bg-[#fcfaf8] font-[family-name:var(--font-inter)] text-[#1f1f1f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Navbar />

      <main id="main-content" className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="py-10 md:py-14">
            <div className="overflow-hidden rounded-[32px] border border-[#eadfd6] bg-[linear-gradient(135deg,#fffaf5_0%,#fffdfb_55%,#f5eee8_100%)] p-6 shadow-[0_20px_70px_rgba(119,85,53,0.08)] sm:p-8 lg:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center rounded-full border border-[#e4d4c6] bg-white/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#a56f43] shadow-sm">
                    Curated ski + snowboard instruction, not YouTube chaos
                  </div>
                  <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-[#201d1a] sm:text-5xl lg:text-6xl">
                    Find the right technique for your level — and know what to practice next.
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f5a55] sm:text-lg">
                    TurnLab turns scattered ski and snowboard videos into guided learning
                    paths with timestamps, feel cues, drills, and progression built in.
                    Start with a one-minute level check or jump straight into the library.
                  </p>

                  <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b5f39]">
                      Choose your discipline
                    </p>
                    <div className="mt-3">
                      <HomeHeroDisciplineSwitch />
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href="/quiz"
                      className="inline-flex items-center justify-center rounded-full bg-[#201d1a] px-6 py-3 text-sm font-semibold text-white transition-transform transition-colors hover:-translate-y-0.5 hover:bg-[#342f2a]"
                    >
                      Find your level in 1 minute
                    </Link>
                    <HomeDisciplineLibraryCta
                      className="inline-flex items-center justify-center rounded-full border border-[#d9c6b5] bg-white px-6 py-3 text-sm font-semibold text-[#7d5431] transition-colors hover:border-[#c9ae96] hover:bg-[#fff6ee]"
                    />
                  </div>

                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#6c6259]">
                    <span>✓ Free forever</span>
                    <span>✓ Ski + snowboard progressions</span>
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
                        From first turns to confident all-mountain days.
                      </h2>
                      <p className="mt-3 max-w-md text-sm leading-6 text-white/80 sm:text-base">
                        Every path is built to answer the same question: what should I
                        practice today to actually get better?
                      </p>
                      <Link
                        href="/quiz"
                        className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-white/20"
                      >
                        Take the 1-minute level check
                        <span aria-hidden="true">→</span>
                      </Link>
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
                  Less searching. More deliberate progression.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[#6c6259] sm:text-base">
                Stop bouncing between random videos and start progressing with a system that
                feels calm, credible, and practical whether you ski or snowboard.
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

          <HomeDisciplineShowcase contentByDiscipline={homeShowcaseContent} />

          <section className="pb-16 pt-6 md:pb-20">
            <div className="rounded-[32px] bg-[#1f1b18] px-6 py-8 text-white shadow-[0_24px_70px_rgba(31,27,24,0.22)] sm:px-8 sm:py-10 lg:px-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8b08b]">
                    Make your next mountain day easier
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
                  <HomeDisciplineLibraryCta
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                  />
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
