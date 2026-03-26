import Link from "next/link";
import { techniques } from "@/data/techniques";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  const beginnerCount = techniques.filter((t) => t.rating === "green").length;
  const intermediateCount = techniques.filter((t) => t.rating === "blue").length;
  const advancedCount = techniques.filter((t) => t.rating === "black" || t.rating === "double-black").length;

  const latestTechniques = techniques.slice(-4);

  return (
    <div className="flex flex-col min-h-full font-[family-name:var(--font-inter)]">
      <Navbar />

      <main id="main-content" className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-20">

            {/* ─── Left Column (Main) ─── */}
            <div>
              {/* Hero */}
              <section className="py-16 md:py-20">
                <h1 className="text-5xl md:text-6xl font-extrabold text-[#222] leading-[1.1] mb-5">
                  Master Your{" "}
                  <span className="text-[#B4835A]">Turn.</span>
                </h1>
                <p className="text-base text-[#646464] leading-relaxed mb-8 max-w-md">
                  Elevate your skiing with our comprehensive technique library.
                </p>
                {/* Chevron decoration */}
                <div className="mb-8">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="text-[#B4835A]">
                    <path d="M2 2L20 20L38 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <Link
                  href="/techniques"
                  className="inline-flex bg-[#EBEBEB] hover:bg-[#E0E0E0] text-[#222] font-medium px-6 py-2.5 rounded-full text-sm transition-colors"
                >
                  Get Started
                </Link>
              </section>

              {/* Learning Paths — Main (with icons) */}
              <section className="pb-16">
                <h2 className="text-2xl font-bold text-[#222] mb-8">Learning Paths</h2>
                <div className="grid sm:grid-cols-3 gap-5">
                  {[
                    {
                      level: "Beginner",
                      desc: "Elevate your skiing with our comprehensive technique.",
                      count: beginnerCount,
                      href: "/techniques?rating=green",
                      icon: (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 8v8M8 12h8"/>
                        </svg>
                      ),
                    },
                    {
                      level: "Intermediate",
                      desc: "Elevate your skiing with our comprehensive technique.",
                      count: intermediateCount,
                      href: "/techniques?rating=blue",
                      icon: (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 19V5M5 12l7-7 7 7"/>
                        </svg>
                      ),
                    },
                    {
                      level: "Expert",
                      desc: "Elevate your skiing with our comprehensive technique.",
                      count: advancedCount,
                      href: "/techniques?rating=black",
                      icon: (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      ),
                    },
                  ].map((path) => (
                    <Link
                      key={path.level}
                      href={path.href}
                      className="group block bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#F5F2EF] text-[#B4835A] flex items-center justify-center mx-auto mb-4">
                        {path.icon}
                      </div>
                      <h3 className="text-base font-bold text-[#222] mb-2">{path.level}</h3>
                      <p className="text-sm text-[#888] leading-relaxed mb-3">{path.desc}</p>
                      <span className="text-[#B4835A] text-sm font-medium">
                        Learn More →
                      </span>
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
                      className="group relative flex items-center py-3.5 hover:bg-gray-50 -mx-3 px-3 rounded-lg transition-colors"
                    >
                      <span className="text-[#222] text-sm group-hover:text-[#B4835A] transition-colors">
                        {t.title}?
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* ─── Right Column (Sidebar) ─── */}
            <aside className="hidden lg:block">
              <div className="sticky top-20 space-y-10 py-16">

                {/* Learning Paths — Sidebar (vertical cards) */}
                <div>
                  <h3 className="text-xs font-bold text-[#222] uppercase tracking-widest mb-4">Learning Paths</h3>
                  <div className="space-y-3">
                    {[
                      { level: "Beginner", href: "/techniques?rating=green", icon: "↑" },
                      { level: "Intermediate", href: "/techniques?rating=blue", icon: "↑" },
                      { level: "Expert", href: "/techniques?rating=black", icon: "👥" },
                    ].map((p) => (
                      <Link
                        key={p.level}
                        href={p.href}
                        className="group block bg-white rounded-xl p-4 border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <span className="w-7 h-7 rounded-full bg-[#F5F2EF] text-[#B4835A] text-xs flex items-center justify-center font-bold">{p.icon}</span>
                          <span className="text-sm font-bold text-[#222]">{p.level}</span>
                        </div>
                        <p className="text-xs text-[#888] leading-relaxed mb-2 pl-10">
                          Elevate your skiing with our comprehensive technique.
                        </p>
                        <span className="text-[#B4835A] text-xs font-medium pl-10">Learn More →</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Skiing Techniques */}
                <div>
                  <h3 className="text-xs font-bold text-[#222] uppercase tracking-widest mb-4">Skiing Techniques</h3>
                  <div className="space-y-2">
                    {techniques.slice(0, 5).map((t) => (
                      <Link
                        key={t.id}
                        href={`/techniques/${t.slug}`}
                        className="block text-sm text-[#646464] hover:text-[#222] transition-colors"
                      >
                        {t.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Gear of the Season */}
                <div>
                  <h3 className="text-xs font-bold text-[#222] uppercase tracking-widest mb-4">Gear of the Season</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Smith I/O Mag", type: "Goggles", price: "$295", search: "Smith+IO+Mag+goggles" },
                      { name: "Tecnica Mach1 LV", type: "Ski Boots", price: "$720", search: "Tecnica+Mach1+LV+ski+boots" },
                      { name: "Hestra Army Leather", type: "Gloves", price: "$189", search: "Hestra+Army+Leather+ski+gloves" },
                    ].map((gear) => (
                      <a
                        key={gear.name}
                        href={`https://www.amazon.com/s?k=${gear.search}&tag=turnlab-20`}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="group flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow"
                      >
                        <div>
                          <p className="text-[10px] text-[#aaa] uppercase tracking-wide">{gear.type}</p>
                          <p className="text-sm font-bold text-[#222]">{gear.name}</p>
                          <p className="text-sm font-bold text-[#222]">{gear.price}</p>
                        </div>
                        <span className="text-[10px] text-[#aaa] underline group-hover:text-[#646464] transition-colors shrink-0">
                          Check Price
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Mobile-only explore grid */}
        <section className="lg:hidden py-12 bg-[#F9F9F9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold text-[#222] mb-4">Explore</h2>
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
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100"
                >
                  <span className="text-lg">{item.icon}</span>
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
