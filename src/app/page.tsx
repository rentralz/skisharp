import Link from "next/link";
import { techniques } from "@/data/techniques";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  const beginnerCount = techniques.filter((t) => t.rating === "green").length;
  const intermediateCount = techniques.filter((t) => t.rating === "blue").length;
  const advancedCount = techniques.filter((t) => t.rating === "black" || t.rating === "double-black").length;

  // Latest techniques for the "Latest from the Mountain" section
  const latestTechniques = techniques.slice(-6);

  // Featured gear items for sidebar
  const gearItems = [
    { name: "Smith I/O Mag", type: "Goggles", price: "$295", search: "Smith+IO+Mag+goggles" },
    { name: "Atomic Hawx Ultra", type: "Ski Boots", price: "$450", search: "Atomic+Hawx+Ultra+ski+boots" },
    { name: "Nordica Enforcer", type: "All-Mountain Ski", price: "$600", search: "Nordica+Enforcer+100+ski" },
  ];

  return (
    <div className="flex flex-col min-h-full font-[family-name:var(--font-inter)]">
      <Navbar />

      <main id="main-content" className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-16">

            {/* ─── Main Content Column ─── */}
            <div>
              {/* Hero */}
              <section className="py-16 md:py-24">
                <h1 className="text-5xl md:text-6xl font-extrabold text-[#222] leading-[1.1] mb-5">
                  Master Your{" "}
                  <span className="text-[#B4835A]">Turn.</span>
                </h1>
                <p className="text-lg text-[#646464] leading-relaxed mb-8 max-w-lg">
                  Expert-curated skiing guides with video breakdowns, feel cues,
                  and drills. From first-timers to double-black enthusiasts.
                </p>
                <Link
                  href="/techniques"
                  className="inline-flex bg-[#E8E4E0] hover:bg-[#DDD8D3] text-[#222] font-semibold px-7 py-3 rounded-lg text-sm transition-colors"
                >
                  Get Started
                </Link>
              </section>

              {/* Learning Paths — Main */}
              <section className="pb-16">
                <h2 className="text-2xl font-bold text-[#222] mb-6">Learning Paths</h2>
                <div className="space-y-4">
                  {[
                    {
                      level: "Beginner",
                      desc: "Elevate your skiing from first steps to confident green runs with foundational techniques.",
                      count: beginnerCount,
                      href: "/techniques?rating=green",
                    },
                    {
                      level: "Intermediate",
                      desc: "Refine your parallel turns, edge control, and tackle blue runs with precision.",
                      count: intermediateCount,
                      href: "/techniques?rating=blue",
                    },
                    {
                      level: "Advanced",
                      desc: "Master moguls, powder, steeps, and the techniques that unlock the full mountain.",
                      count: advancedCount,
                      href: "/techniques?rating=black",
                    },
                  ].map((path) => (
                    <Link
                      key={path.level}
                      href={path.href}
                      className="group block bg-white rounded-xl p-5 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-[#222] mb-1">{path.level}</h3>
                          <p className="text-sm text-[#646464] leading-relaxed max-w-md">{path.desc}</p>
                        </div>
                        <span className="text-[#B4835A] text-sm font-medium shrink-0 ml-4 mt-1 group-hover:translate-x-0.5 transition-transform">
                          {path.count} techniques →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Latest from the Mountain */}
              <section className="pb-16">
                <h2 className="text-2xl font-bold text-[#222] mb-6">Latest from the Mountain</h2>
                <div className="space-y-0 divide-y divide-gray-100">
                  {latestTechniques.map((t) => (
                    <Link
                      key={t.id}
                      href={`/techniques/${t.slug}`}
                      className="group flex items-center justify-between py-3.5 hover:bg-gray-50 -mx-3 px-3 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${
                          t.rating === "green" ? "bg-emerald-500" :
                          t.rating === "blue" ? "bg-blue-500" :
                          t.rating === "black" ? "bg-gray-800" : "bg-purple-600"
                        }`} />
                        <span className="text-[#222] text-sm group-hover:text-[#B4835A] transition-colors">
                          {t.title}
                        </span>
                      </div>
                      <span className="text-xs text-[#aaa] shrink-0 ml-4">
                        Level {t.difficulty}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/techniques"
                  className="inline-flex text-[#B4835A] text-sm font-medium mt-4 hover:text-[#9A7049] transition-colors"
                >
                  View all {techniques.length} techniques →
                </Link>
              </section>
            </div>

            {/* ─── Sidebar ─── */}
            <aside className="hidden lg:block">
              <div className="sticky top-20 space-y-8 py-16">
                {/* Sidebar Learning Paths (compact) */}
                <div className="bg-[#F5F5F5] rounded-xl p-5">
                  <h3 className="text-sm font-bold text-[#222] uppercase tracking-wide mb-4">Quick Access</h3>
                  <div className="space-y-2.5">
                    {[
                      { label: "Skiing Techniques", href: "/techniques", icon: "⛷️" },
                      { label: "Slope Ratings", href: "/slope-ratings", icon: "🏔️" },
                      { label: "Equipment Guide", href: "/equipment-guide", icon: "🎿" },
                      { label: "Snow Conditions", href: "/snow-conditions", icon: "❄️" },
                      { label: "Clothing Guide", href: "/clothing-guide", icon: "🧥" },
                      { label: "Budget Gear", href: "/budget-gear", icon: "💰" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2.5 text-sm text-[#646464] hover:text-[#222] transition-colors"
                      >
                        <span className="text-base">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Gear of the Season */}
                <div>
                  <h3 className="text-sm font-bold text-[#222] uppercase tracking-wide mb-4">Gear of the Season</h3>
                  <div className="space-y-4">
                    {gearItems.map((gear) => (
                      <a
                        key={gear.name}
                        href={`https://www.amazon.com/s?k=${gear.search}&tag=turnlab-20`}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="group block bg-white rounded-xl p-4 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow"
                      >
                        <p className="text-xs text-[#aaa] mb-1">{gear.type}</p>
                        <p className="text-[#222] font-bold text-sm mb-1">{gear.name}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[#222] font-bold">{gear.price}</span>
                          <span className="text-xs text-[#aaa] underline group-hover:text-[#646464] transition-colors">
                            Check Price
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Deals CTA */}
                <Link
                  href="/deals"
                  className="block bg-[#F5F5F5] rounded-xl p-5 hover:bg-[#EFEFEF] transition-colors"
                >
                  <h3 className="text-sm font-bold text-[#222] mb-1">🏷️ Ski Deals</h3>
                  <p className="text-xs text-[#646464]">Live deals scanned daily from Reddit, Amazon, and more.</p>
                  <span className="text-[#B4835A] text-xs font-medium mt-2 inline-block">Browse deals →</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* Mobile-only: Quick Links (replaces sidebar content) */}
        <section className="lg:hidden py-12 bg-[#F9F9F9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-[#222] mb-6">Explore</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: "/techniques", icon: "⛷️", title: "Techniques" },
                { href: "/slope-ratings", icon: "🏔️", title: "Slope Ratings" },
                { href: "/equipment-guide", icon: "🎿", title: "Equipment" },
                { href: "/budget-gear", icon: "💰", title: "Budget Gear" },
                { href: "/deals", icon: "🏷️", title: "Deals" },
                { href: "/resorts", icon: "🌍", title: "Resorts" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium text-[#222]">{item.title}</span>
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
