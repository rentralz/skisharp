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
              <section className="py-12 md:py-16 relative">
                {/* Hero image — right side */}
                <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden md:block overflow-hidden rounded-2xl" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&h=600&fit=crop&q=80"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                </div>
                <div className="relative z-10 max-w-md">
                  <p className="text-[#B4835A] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                    ⛷️ Curated technique library
                  </p>
                  <h1 className="text-5xl md:text-6xl font-extrabold text-[#222] leading-[1.1] mb-5">
                    Master Your{" "}
                    <span className="text-[#B4835A]">Turn.</span>
                  </h1>
                  <p className="text-base text-[#646464] leading-relaxed mb-8">
                    Elevate your skiing with our comprehensive technique library.
                    Expert-curated video guides, feel cues, and drills for every level.
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/quiz"
                      className="inline-flex bg-[#222] hover:bg-[#333] text-white font-medium px-6 py-2.5 rounded-full text-sm transition-colors"
                    >
                      Find Your Level →
                    </Link>
                    <Link
                      href="/conditions-match"
                      className="inline-flex text-[#B4835A] font-medium text-sm hover:text-[#9A7049] transition-colors"
                    >
                      What to ski today?
                    </Link>
                  </div>

                  {/* Quick stats inline */}
                  <div className="flex items-center gap-6 mt-10 pt-6 border-t border-gray-100">
                    <div>
                      <p className="text-xl font-bold text-[#222]">{techniques.length}</p>
                      <p className="text-xs text-[#aaa]">Techniques</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div>
                      <p className="text-xl font-bold text-[#222]">{techniques.length * 2}+</p>
                      <p className="text-xs text-[#aaa]">Videos</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div>
                      <p className="text-xl font-bold text-[#222]">Free</p>
                      <p className="text-xs text-[#aaa]">Always</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Learning Paths — Main (with icons) */}
              <section className="pb-16">
                <h2 className="text-2xl font-bold text-[#222] mb-8">Learning Paths</h2>
                <div className="grid sm:grid-cols-3 gap-5">
                  {[
                    {
                      level: "Beginner",
                      desc: "Elevate your skiing from first steps to confident green runs.",
                      href: "/techniques?rating=green",
                      img: "https://img.youtube.com/vi/T1BsQPFdt7w/hqdefault.jpg",
                      icon: (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 8v8M8 12h8"/>
                        </svg>
                      ),
                    },
                    {
                      level: "Intermediate",
                      desc: "Refine parallel turns, edge control, and tackle blues.",
                      href: "/techniques?rating=blue",
                      img: "https://img.youtube.com/vi/LrmCNarCzIY/hqdefault.jpg",
                      icon: (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 19V5M5 12l7-7 7 7"/>
                        </svg>
                      ),
                    },
                    {
                      level: "Expert",
                      desc: "Master moguls, powder, steeps, and the full mountain.",
                      href: "/techniques?rating=black",
                      img: "https://img.youtube.com/vi/WTX21DO7Qsc/hqdefault.jpg",
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
                      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-40 bg-gray-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={path.img}
                          alt={`${path.level} skiing`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      <div className="p-5 text-center">
                        <div className="w-10 h-10 rounded-full bg-[#F5F2EF] text-[#B4835A] flex items-center justify-center mx-auto mb-3 -mt-9 relative z-10 border-2 border-white shadow-sm">
                          {path.icon}
                        </div>
                        <h3 className="text-base font-bold text-[#222] mb-1.5">{path.level}</h3>
                        <p className="text-sm text-[#888] leading-relaxed mb-3">{path.desc}</p>
                        <span className="text-[#B4835A] text-sm font-medium">
                          Learn More →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Latest from the Mountain */}
              <section className="pb-16">
                <h2 className="text-2xl font-bold text-[#222] mb-6">Latest from the Mountain</h2>
                <div className="space-y-3">
                  {latestTechniques.map((t) => {
                    const vid = t.youtubeVideos.find((v: { isPrimary?: boolean }) => v.isPrimary) ?? t.youtubeVideos[0];
                    return (
                      <Link
                        key={t.id}
                        href={`/techniques/${t.slug}`}
                        className="group flex items-center gap-4 py-2 hover:bg-gray-50 -mx-3 px-3 rounded-xl transition-colors"
                      >
                        {vid && (
                          <div className="w-16 h-11 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={`https://img.youtube.com/vi/${vid.videoId}/mqdefault.jpg`}
                              alt=""
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <span className="text-[#222] text-sm font-medium group-hover:text-[#B4835A] transition-colors">
                            {t.title}
                          </span>
                          <p className="text-xs text-[#aaa] truncate">{t.description}</p>
                        </div>
                        <span className={`w-2 h-2 rounded-full shrink-0 ${
                          t.rating === "green" ? "bg-emerald-500" :
                          t.rating === "blue" ? "bg-blue-500" :
                          t.rating === "black" ? "bg-gray-800" : "bg-purple-600"
                        }`} />
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/techniques"
                  className="inline-flex text-[#B4835A] text-sm font-medium mt-4 hover:text-[#9A7049] transition-colors"
                >
                  View all {techniques.length} techniques →
                </Link>
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

                {/* Quick Tools */}
                <div className="flex gap-2 mb-6">
                  <Link href="/progress" className="flex-1 p-3 rounded-xl bg-[#F5F2EF] text-center hover:bg-[#EDE8E3] transition-colors">
                    <span className="text-lg block">📊</span>
                    <span className="text-xs font-medium text-[#222]">My Progress</span>
                  </Link>
                  <Link href="/quiz" className="flex-1 p-3 rounded-xl bg-[#F5F2EF] text-center hover:bg-[#EDE8E3] transition-colors">
                    <span className="text-lg block">🧪</span>
                    <span className="text-xs font-medium text-[#222]">Skill Quiz</span>
                  </Link>
                  <Link href="/conditions-match" className="flex-1 p-3 rounded-xl bg-[#F5F2EF] text-center hover:bg-[#EDE8E3] transition-colors">
                    <span className="text-lg block">🎲</span>
                    <span className="text-xs font-medium text-[#222]">Today</span>
                  </Link>
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
                      { name: "Smith I/O Mag", type: "Goggles", price: "$295", search: "Smith+IO+Mag+goggles", img: "https://img.youtube.com/vi/5WMdbLT6adE/mqdefault.jpg" },
                      { name: "Tecnica Mach1 LV", type: "Ski Boots", price: "$720", search: "Tecnica+Mach1+LV+ski+boots", img: "https://img.youtube.com/vi/6sdEFYz7i2g/mqdefault.jpg" },
                      { name: "Hestra Army Leather", type: "Gloves", price: "$189", search: "Hestra+Army+Leather+ski+gloves", img: "https://img.youtube.com/vi/ZLMBViPQryY/mqdefault.jpg" },
                    ].map((gear) => (
                      <a
                        key={gear.name}
                        href={`https://www.amazon.com/s?k=${gear.search}&tag=turnlab-20`}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="group flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow"
                      >
                        {/* Product image */}
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={gear.img} alt={gear.name} loading="lazy" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
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
