import Link from "next/link";
import { techniques } from "@/data/techniques";
import TechniqueCard from "@/components/TechniqueCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  const featured = techniques.filter((t) => t.difficulty <= 3).slice(0, 4);
  const intermediate = techniques.filter((t) => t.difficulty >= 4 && t.difficulty <= 6).slice(0, 4);
  const beginnerCount = techniques.filter((t) => t.rating === "green").length;
  const intermediateCount = techniques.filter((t) => t.rating === "blue").length;
  const advancedCount = techniques.filter((t) => t.rating === "black" || t.rating === "double-black").length;

  return (
    <div className="flex flex-col min-h-full font-[family-name:var(--font-inter)]">
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
            <div className="max-w-2xl">
              <p className="text-[#e8722a] text-sm font-semibold uppercase tracking-[0.15em] mb-4">
                Curated skiing technique library
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                Master Your{" "}
                <span className="text-[#e8722a]">Turn.</span>
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-lg">
                Expert-curated skiing guides with video breakdowns, feel cues,
                and drills. From first-timers to double-black enthusiasts.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/techniques"
                  className="bg-[#e8722a] hover:bg-[#d4621a] text-white font-bold px-8 py-3.5 rounded-xl text-base transition-colors shadow-sm"
                >
                  Get Started
                </Link>
                <Link
                  href="/slope-ratings"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3.5 rounded-xl text-base transition-colors"
                >
                  Learning Paths
                </Link>
              </div>
            </div>
          </div>
          {/* Subtle mountain silhouette decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
        </section>

        {/* Stats bar */}
        <section className="bg-gray-50 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <dt className="text-2xl font-bold text-[#e8722a]">{techniques.length}</dt>
                <dd className="text-sm text-gray-500 mt-0.5">Techniques</dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-[#e8722a]">{techniques.length * 2}+</dt>
                <dd className="text-sm text-gray-500 mt-0.5">Curated Videos</dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-[#e8722a]">4</dt>
                <dd className="text-sm text-gray-500 mt-0.5">Skill Levels</dd>
              </div>
              <div>
                <dt className="text-2xl font-bold text-[#e8722a]">Free</dt>
                <dd className="text-sm text-gray-500 mt-0.5">Always</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Learning Paths */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Learning Paths</h2>
              <p className="text-gray-500">Start where you are. Progress from there.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link
                href="/techniques?rating=green"
                className="group rounded-2xl p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 text-lg">🟢</span>
                  <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">Beginner</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">First Timer</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Wedge turns, stopping, chairlift basics. Build the fundamentals that
                  everything else is built on.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#e8722a] text-sm font-medium group-hover:translate-x-1 transition-transform">
                    {beginnerCount} techniques →
                  </span>
                </div>
              </Link>

              <Link
                href="/techniques?rating=blue"
                className="group rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-lg">🔵</span>
                  <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Intermediate</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Confident Cruiser</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Parallel turns, edge control, carving basics. The techniques that
                  take you from cautious to confident.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#e8722a] text-sm font-medium group-hover:translate-x-1 transition-transform">
                    {intermediateCount} techniques →
                  </span>
                </div>
              </Link>

              <Link
                href="/techniques?rating=black"
                className="group rounded-2xl p-6 border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 text-lg">⬛</span>
                  <span className="text-gray-600 font-semibold text-sm uppercase tracking-wide">Advanced</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mountain Expert</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Moguls, powder, steeps, trees. The techniques that unlock the
                  mountain&apos;s most rewarding terrain.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#e8722a] text-sm font-medium group-hover:translate-x-1 transition-transform">
                    {advancedCount} techniques →
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                We do the hunting so you can focus on the mountain.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "We Find",
                  desc: "We hunt YouTube for the best skiing instruction videos — and pick only the clearest, most technically accurate ones.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                  ),
                },
                {
                  step: "02",
                  title: "We Organize",
                  desc: "Every technique gets timestamped moments, feel cues, mistake-and-fix cards, and practice drills.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2m-6 9l2 2 4-4" />
                    </svg>
                  ),
                },
                {
                  step: "03",
                  title: "You Learn",
                  desc: "Follow a progression path or jump to the technique you need. No account, no subscription — just open and ski better.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl bg-white border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-50 text-[#e8722a] flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-4xl font-extrabold text-gray-100 leading-none mt-1">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Techniques — Beginner */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Start Here</h2>
                <p className="text-gray-500">Essential techniques for your first days on the mountain.</p>
              </div>
              <Link href="/techniques?rating=green" className="hidden sm:inline-flex text-[#e8722a] hover:text-[#d4621a] text-sm font-semibold transition-colors">
                View all beginner →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((technique) => (
                <TechniqueCard key={technique.id} technique={technique} />
              ))}
            </div>
          </div>
        </section>

        {/* Intermediate Techniques */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Level Up</h2>
                <p className="text-gray-500">Ready for more? These techniques take your skiing to the next level.</p>
              </div>
              <Link href="/techniques?rating=blue" className="hidden sm:inline-flex text-[#e8722a] hover:text-[#d4621a] text-sm font-semibold transition-colors">
                View all intermediate →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {intermediate.map((technique) => (
                <TechniqueCard key={technique.id} technique={technique} />
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore More</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { href: "/slope-ratings", icon: "🏔️", title: "Slope Ratings", desc: "Understand trail difficulty" },
                { href: "/equipment-guide", icon: "🎿", title: "Equipment Guide", desc: "Choose the right gear" },
                { href: "/budget-gear", icon: "💰", title: "Budget Gear", desc: "Full setup under $250" },
                { href: "/snow-conditions", icon: "❄️", title: "Snow Conditions", desc: "Adapt to any surface" },
                { href: "/clothing-guide", icon: "🧥", title: "Clothing Guide", desc: "Layer like a pro" },
                { href: "/deals", icon: "🏷️", title: "Ski Deals", desc: "Save on gear" },
                { href: "/resorts", icon: "🌍", title: "Resorts", desc: "Where to ski worldwide" },
                { href: "/techniques", icon: "📚", title: "All Techniques", desc: `Browse all ${techniques.length}` },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#e8722a]/30 hover:shadow-md transition-all"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm group-hover:text-[#e8722a] transition-colors">{item.title}</p>
                    <p className="text-gray-400 text-xs">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
