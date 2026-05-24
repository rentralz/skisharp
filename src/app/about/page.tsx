import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { techniques } from "@/data/techniques";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "TurnLab is a curated ski and snowboard technique knowledge hub — expert-selected videos, organized into learning paths, and free for everyone.",
  path: "/about",
  keywords: ["about TurnLab", "ski learning hub", "snowboard learning hub", "ski technique videos"],
});

export default function AboutPage() {
  const totalVideos = techniques.reduce(
    (sum, technique) => sum + technique.youtubeVideos.length,
    0,
  );
  const sourceChannels = new Set(
    techniques.flatMap((technique) =>
      technique.youtubeVideos.map((video) => video.channel),
    ),
  ).size;

  const principles = [
    {
      title: "Curation",
      description:
        "We watch across instructors and pull the clearest, most technically useful videos instead of sending you into a search rabbit hole.",
    },
    {
      title: "Structure",
      description:
        "Techniques are grouped by difficulty, paired with prerequisites, and mapped to natural next steps so progression actually makes sense.",
    },
    {
      title: "Analysis",
      description:
        "Each page adds timestamps, feel cues, drills, and common-fix notes so you can apply the lesson on snow instead of just watching it.",
    },
    {
      title: "Attribution",
      description:
        "Original creators keep the spotlight. TurnLab is a guide layer on top, with clear source links and full credit back to the instructor.",
    },
  ];

  const expectations = [
    {
      title: "Get pointed to the right level fast",
      description:
        "Take the quick quiz when you want a starting point, or browse by level if you already know where you fit.",
    },
    {
      title: "Practice with a plan",
      description:
        "Expect drills, feel cues, and progression suggestions that help you decide what to work on during your next day on snow.",
    },
    {
      title: "Stay free of paywalls",
      description:
        "No accounts, no subscriptions, and no locked library. TurnLab stays free, supported by light ads and affiliate links.",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Start with the right entry point",
      description:
        "Take the quiz for a fast recommendation, or jump straight into the library when you already know your level.",
      href: "/quiz",
      cta: "Take the quiz",
    },
    {
      step: "02",
      title: "Watch the clearest lesson first",
      description:
        "Open a technique page to get the primary video, a backup teaching style, and the context behind what matters most.",
      href: "/techniques/wedge-turns?discipline=ski",
      cta: "See a starter technique",
    },
    {
      step: "03",
      title: "Leave with a practice plan",
      description:
        "Use drills, feel cues, common fixes, and next steps so your next on-snow session has a clear focus.",
      href: "/progress",
      cta: "View progress tools",
    },
  ];

  const startHereLinks = [
    {
      title: "Take the 1-minute quiz",
      description: "Get a quick recommendation for the right learning path.",
      href: "/quiz",
      cta: "Find your level",
    },
    {
      title: "Browse all techniques",
      description: "See every video-backed technique, drill, and feel cue in one place.",
      href: "/techniques",
      cta: "Explore the library",
    },
    {
      title: "Start ski basics",
      description:
        "Jump straight into wedge turns, speed control, and the first ski progression most beginners need.",
      href: "/techniques/wedge-turns?discipline=ski",
      cta: "Open ski starter",
    },
    {
      title: "Start snowboard basics",
      description:
        "Open the athletic stance starter page to build edge awareness and calm first-turn confidence.",
      href: "/techniques/snowboard-athletic-stance?discipline=snowboard",
      cta: "Open snowboard starter",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf8] font-[family-name:var(--font-inter)] text-[#1f1f1f]">
      <Navbar />
      <Breadcrumbs crumbs={[{ label: "About" }]} />

      <main id="main-content" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section className="overflow-hidden rounded-[32px] border border-[#eadfd6] bg-[linear-gradient(135deg,#fffaf5_0%,#fffdfb_62%,#f4ede7_100%)] p-6 shadow-[0_18px_50px_rgba(119,85,53,0.06)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a56f43]">
                About TurnLab
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-[#201d1a] sm:text-5xl">
                A better way to learn skiing and snowboarding than bouncing through random videos.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#625b54] sm:text-lg">
                TurnLab is a curated ski and snowboard technique library. We take the best
                instruction we can find, organize it into real progressions, and add the
                context that makes it easier to use on the mountain.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6f665e] sm:text-base">
                The idea is simple: YouTube has incredible snow instruction, but it&apos;s
                scattered. TurnLab brings order to the chaos so you can spend less time
                searching and more time improving.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center rounded-full bg-[#201d1a] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#35302a]"
                >
                  Take the 1-minute quiz
                </Link>
                <Link
                  href="/techniques"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8c7b8] bg-white/90 px-5 py-3 text-sm font-semibold text-[#7d5431] transition-colors hover:border-[#c6af99] hover:bg-white"
                >
                  Browse all techniques
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                {
                  value: `${techniques.length}`,
                  label: "Technique pages",
                  detail: "Curated drills, feel cues, and next-step guidance.",
                },
                {
                  value: `${totalVideos}`,
                  label: "Video lessons",
                  detail: "Primary and alternate teaching styles when one doesn’t click.",
                },
                {
                  value: `${sourceChannels}`,
                  label: "Source channels",
                  detail: "A broader bench of instructors without losing structure.",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#e8ddd4] bg-white/90 p-5 shadow-[0_10px_24px_rgba(119,85,53,0.05)]"
                >
                  <p className="text-3xl font-black tracking-tight text-[#201d1a]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#7d5431]">{stat.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[#6f665e]">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-14">
          <div className="rounded-[28px] border border-[#eadfd6] bg-white p-6 shadow-[0_12px_28px_rgba(119,85,53,0.05)] sm:p-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a56f43]">
                  How TurnLab works
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#201d1a]">
                  From “where do I start?” to a focused practice day in three steps.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[#6f665e] sm:text-base">
                If you&apos;re new here, this is the fastest way to use the library without
                bouncing between random pages.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {howItWorks.map((item) => (
                <div
                  key={item.step}
                  className="rounded-3xl border border-[#ece3db] bg-[#fcf8f4] p-6 shadow-[0_10px_24px_rgba(119,85,53,0.04)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a56f43]">
                    Step {item.step}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-[#201d1a]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6f665e] sm:text-base">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-5 inline-flex items-center text-sm font-semibold text-[#7d5431] transition-colors hover:text-[#a56f43]"
                  >
                    {item.cta} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a56f43]">
                What TurnLab adds
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#201d1a]">
                We don’t make the lessons. We make them easier to trust and use.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#6f665e] sm:text-base">
              Every technique page is designed to help you answer three questions quickly:
              what should I watch, what should it feel like, and what should I practice next?
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {principles.map((item, index) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[#ece3db] bg-white p-6 shadow-[0_12px_28px_rgba(119,85,53,0.05)]"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f5ece3] text-sm font-bold text-[#a56f43]">
                  0{index + 1}
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#201d1a]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#6f665e] sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="rounded-[28px] border border-[#ece3db] bg-white p-6 shadow-[0_12px_28px_rgba(119,85,53,0.05)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a56f43]">
              What you can expect
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#201d1a]">
              Practical guidance for your next day on snow.
            </h2>
            <div className="mt-6 space-y-5">
              {expectations.map((item) => (
                <div key={item.title} className="rounded-2xl bg-[#faf5f0] p-5">
                  <h3 className="text-lg font-bold text-[#201d1a]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#6f665e] sm:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <section className="rounded-[28px] border border-[#e8ded4] bg-[#f8f5f2] p-6 shadow-[0_12px_28px_rgba(119,85,53,0.05)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B4835A]">
              Start here
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#222]">
              Pick the fastest way into the library
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#646464]">
              New to TurnLab? Start with the 1-minute quiz, browse the full technique
              library, or jump straight into beginner-friendly fundamentals.
            </p>

            <div className="mt-6 grid gap-4">
              {startHereLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl border border-white/80 bg-white p-5 shadow-sm transition-transform transition-shadow hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="text-base font-semibold text-[#222]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#646464]">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex text-sm font-medium text-[#B4835A] transition-colors group-hover:text-[#9A7049]">
                    {item.cta} →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}
