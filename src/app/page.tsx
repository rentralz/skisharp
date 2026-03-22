import Link from "next/link";
import { techniques } from "@/data/techniques";
import TechniqueCard from "@/components/TechniqueCard";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const featured = techniques.slice(0, 4);

  return (
    <div className="flex flex-col min-h-full font-[family-name:var(--font-inter)]">
      <Navbar />

      <main className="flex-1">
        {/* Hero section */}
        <section className="relative bg-gradient-to-br from-[#0d1b2a] via-[#132435] to-[#1a3a5c] overflow-hidden">
          {/* Decorative background lines */}
          <div
            className="absolute inset-0 opacity-5"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #e8722a 0, #e8722a 1px, transparent 0, transparent 50%)",
              backgroundSize: "30px 30px",
            }}
          />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40 lg:py-44">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#e8722a]/10 border border-[#e8722a]/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8722a]" />
                <span className="text-[#e8722a] text-sm font-medium">Curated technique library</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                Master Every
                <br />
                <span className="text-[#e8722a]">Turn.</span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
                Expert-curated skiing technique guides with step-by-step video breakdowns, feel cues,
                and common mistake fixes. From first-timers to double-black enthusiasts.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/techniques"
                  className="bg-[#e8722a] hover:bg-[#d4621a] text-white font-bold px-8 py-3.5 rounded-xl text-base transition-colors shadow-lg shadow-[#e8722a]/20"
                >
                  Explore Techniques
                </Link>
                <Link
                  href="/techniques?rating=green"
                  className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-colors"
                >
                  Start as Beginner
                </Link>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="border-t border-white/5 bg-[#0d1b2a]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { value: String(techniques.length), label: "Techniques" },
                  { value: "40+", label: "Curated videos" },
                  { value: "3", label: "Learning paths" },
                  { value: "Free", label: "To start" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center sm:text-left">
                    <dt className="text-2xl font-bold text-[#e8722a]">{value}</dt>
                    <dd className="text-sm text-gray-400 mt-0.5">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-[#0a1520]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-3">How It Works</h2>
              <p className="text-gray-400 max-w-lg mx-auto">
                We do the hunting so you can focus on the mountain.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "We Find",
                  body: "We hunt YouTube for the best skiing instruction videos available — covering everything from first-day pizza turns to double-black mastery — and pick only the clearest, most technically accurate ones.",
                  icon: (
                    <svg className="w-6 h-6 text-[#e8722a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                  ),
                },
                {
                  step: "02",
                  title: "We Organize",
                  body: "Every technique gets timestamped key moments, feel cues that describe what correct form actually feels like, mistake-and-fix cards, and practice drills — so you know exactly what to focus on.",
                  icon: (
                    <svg className="w-6 h-6 text-[#e8722a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2m-6 9l2 2 4-4" />
                    </svg>
                  ),
                },
                {
                  step: "03",
                  title: "You Learn",
                  body: "Follow a progression path from first-timer to expert, or jump straight to the technique you're working on. No account, no subscription — just open and ski better.",
                  icon: (
                    <svg className="w-6 h-6 text-[#e8722a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                },
              ].map(({ step, title, body, icon }) => (
                <div
                  key={step}
                  className="relative rounded-2xl bg-white/3 border border-white/5 p-6 hover:border-[#e8722a]/20 transition-colors"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#e8722a]/10 border border-[#e8722a]/20 flex items-center justify-center">
                      {icon}
                    </div>
                    <span className="text-4xl font-extrabold text-white/5 leading-none mt-1">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Paths */}
        <section className="py-20 bg-[#0d1b2a]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">Learning Paths</h2>
              <p className="text-gray-400">Start where you are. Progress from there.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {/* Green — First Timer */}
              <Link
                href="/techniques?rating=green"
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 p-6 border border-emerald-700/30 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-4 h-4 rounded-full bg-[#22c55e] flex-shrink-0" />
                  <span className="text-emerald-300 font-semibold text-sm uppercase tracking-wide">
                    Green Run
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">First Timer</h3>
                <p className="text-emerald-200/70 text-sm leading-relaxed">
                  Hockey stops, wedge turns, and your first parallel turns. Build the fundamentals
                  that everything else is built on.
                </p>
                <div className="mt-4 text-emerald-400 text-sm font-medium group-hover:text-emerald-300">
                  Levels 1&ndash;3 &rarr;
                </div>
              </Link>

              {/* Blue — Intermediate */}
              <Link
                href="/techniques?rating=blue"
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 p-6 border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-4 h-4 rounded-full bg-[#3b82f6] flex-shrink-0" />
                  <span className="text-blue-300 font-semibold text-sm uppercase tracking-wide">
                    Blue Run
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Intermediate</h3>
                <p className="text-blue-200/70 text-sm leading-relaxed">
                  Parallel turns, hip angulation, and edge control. The techniques that separate
                  intermediate skiers from confident ones.
                </p>
                <div className="mt-4 text-blue-400 text-sm font-medium group-hover:text-blue-300">
                  Levels 4&ndash;6 &rarr;
                </div>
              </Link>

              {/* Black — Advanced */}
              <Link
                href="/techniques?rating=black"
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-6 border border-gray-700/30 hover:border-gray-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-4 h-4 rounded-full bg-[#1a1a2e] border border-gray-500 flex-shrink-0" />
                  <span className="text-gray-300 font-semibold text-sm uppercase tracking-wide">
                    Black Diamond
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Advanced</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Mogul absorption, powder floating, steep terrain. The techniques that unlock the
                  mountain&apos;s best terrain.
                </p>
                <div className="mt-4 text-gray-400 text-sm font-medium group-hover:text-gray-300">
                  Levels 7&ndash;10 &rarr;
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Techniques */}
        <section className="py-20 bg-[#0a1520]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">Featured Techniques</h2>
                <p className="text-gray-400">The highest-impact skills to work on right now.</p>
              </div>
              <Link
                href="/techniques"
                className="hidden sm:inline-flex text-[#e8722a] hover:text-[#f08040] text-sm font-semibold transition-colors"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((technique) => (
                <TechniqueCard key={technique.id} technique={technique} />
              ))}
            </div>

            <div className="mt-10 text-center sm:hidden">
              <Link
                href="/techniques"
                className="inline-block bg-[#e8722a]/10 border border-[#e8722a]/30 text-[#e8722a] font-semibold px-6 py-3 rounded-xl transition-colors hover:bg-[#e8722a]/20"
              >
                View all techniques &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#080f18] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="text-xl font-bold text-white mb-2">
                Ski<span className="text-[#e8722a]">Sharp</span>
              </div>
              <p className="text-gray-500 text-sm max-w-xs">
                A curated skiing technique knowledge hub. Videos sourced from expert instructors
                across YouTube. All credit to the original creators.
              </p>
            </div>

            <nav className="flex flex-col sm:items-end gap-2 text-sm text-gray-500">
              <Link href="/techniques" className="hover:text-gray-300 transition-colors">
                All Techniques
              </Link>
              <Link href="/techniques?rating=green" className="hover:text-gray-300 transition-colors">
                Beginner
              </Link>
              <Link href="/techniques?rating=blue" className="hover:text-gray-300 transition-colors">
                Intermediate
              </Link>
              <Link href="/techniques?rating=black" className="hover:text-gray-300 transition-colors">
                Advanced
              </Link>
            </nav>
          </div>

          <div className="mt-10 pt-6 border-t border-white/5 text-center text-xs text-gray-600">
            Built for skiers who want to improve. Videos and instruction credit to their original
            creators.
          </div>
        </div>
      </footer>
    </div>
  );
}
