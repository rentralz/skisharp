import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import dealsData from "@/data/deals.json";

export const metadata: Metadata = {
  title: "Ski Deals & Sales",
  description:
    "Live ski deals from Amazon, Reddit, REI, Evo, and more. Updated daily — find discounts on jackets, pants, goggles, helmets, skis, and lift passes.",
};

const CATEGORY_LABELS: Record<string, { label: string; emoji: string }> = {
  jackets: { label: "Jackets", emoji: "🧥" },
  pants: { label: "Pants", emoji: "👖" },
  baselayers: { label: "Base Layers", emoji: "👕" },
  gloves: { label: "Gloves", emoji: "🧤" },
  goggles: { label: "Goggles", emoji: "🥽" },
  helmets: { label: "Helmets", emoji: "⛑️" },
  socks: { label: "Socks", emoji: "🧦" },
  accessories: { label: "Accessories", emoji: "🏔️" },
  skis: { label: "Skis", emoji: "🎿" },
  boots: { label: "Boots", emoji: "🥾" },
  bindings: { label: "Bindings", emoji: "🔧" },
  poles: { label: "Poles", emoji: "🏒" },
  packs: { label: "Bags & Packs", emoji: "🎒" },
  passes: { label: "Lift Passes", emoji: "🎫" },
  other: { label: "Other", emoji: "🏷️" },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  return `${days}d ago`;
}

interface Deal {
  title: string;
  url: string;
  source: string;
  sourceIcon: string;
  score?: number;
  comments?: number;
  posted: string;
  category: string;
  isAmazonSearch?: boolean;
  thumbnail?: string | null;
}

export default function DealsPage() {
  const deals = dealsData.deals as Deal[];
  const lastScanned = dealsData.lastScanned;

  // Group by category
  const communityDeals = deals.filter((d) => !d.isAmazonSearch);
  const amazonSearches = deals.filter((d) => d.isAmazonSearch);

  // Get unique categories from community deals
  const categories = [...new Set(communityDeals.map((d) => d.category))];

  return (
    <div className="min-h-screen bg-[#0d1b2a] font-[family-name:var(--font-inter)]">
      <Navbar />
      <Breadcrumbs crumbs={[{ label: "Deals" }]} />

      <div id="main-content" className="bg-gradient-to-b from-[#0a1520] to-[#0d1b2a] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[#e8722a] text-sm font-medium uppercase tracking-[0.2em]">
              Save money
            </p>
            <span className="px-2 py-0.5 rounded-full bg-emerald-900/50 text-emerald-300 text-xs font-medium border border-emerald-700/30">
              Updated {timeAgo(lastScanned)}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Ski Deals & Sales
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Live deals from Reddit, SlickDeals, REI, Evo, and Amazon — scanned
            daily so you don&apos;t miss a drop. Sorted by community votes and
            freshness.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Community Deals */}
        {communityDeals.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              🔥 Community-Found Deals
              <span className="text-xs font-normal text-gray-500">
                from Reddit, SlickDeals, & gear sites
              </span>
            </h2>

            {categories.map((cat) => {
              const catDeals = communityDeals.filter((d) => d.category === cat);
              if (catDeals.length === 0) return null;
              const catInfo = CATEGORY_LABELS[cat] || CATEGORY_LABELS.other;

              return (
                <div key={cat} className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <span>{catInfo.emoji}</span> {catInfo.label}
                  </h3>
                  <div className="space-y-2">
                    {catDeals.map((deal, i) => (
                      <a
                        key={i}
                        href={deal.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="block p-4 rounded-xl bg-white/3 border border-white/5 hover:border-[#e8722a]/30 transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium group-hover:text-[#e8722a] transition-colors">
                              {deal.title}
                            </p>
                            <div className="flex items-center gap-3 mt-1.5">
                              <span className="text-xs text-gray-500">
                                {deal.sourceIcon} {deal.source}
                              </span>
                              <span className="text-xs text-gray-600">
                                {timeAgo(deal.posted)}
                              </span>
                              {deal.score && (
                                <span className="text-xs text-[#e8722a]">
                                  ▲ {deal.score}
                                </span>
                              )}
                              {deal.comments ? (
                                <span className="text-xs text-gray-600">
                                  💬 {deal.comments}
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <span className="text-gray-600 group-hover:text-[#e8722a] transition-colors shrink-0">
                            →
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Amazon Quick Searches */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            📦 Amazon Deals by Category
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Curated searches filtered for ski gear deals. Affiliate links — we earn
            a small commission at no extra cost to you.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {amazonSearches.map((deal, i) => {
              const cat = CATEGORY_LABELS[deal.category] || CATEGORY_LABELS.other;
              return (
                <a
                  key={i}
                  href={deal.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center gap-3 p-4 rounded-xl bg-[#FF9900]/5 border border-[#FF9900]/15 hover:border-[#FF9900]/40 hover:bg-[#FF9900]/10 transition-colors group"
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <div>
                    <p className="text-white text-sm font-medium group-hover:text-[#FF9900] transition-colors">
                      {deal.title.replace("🔍 ", "")}
                    </p>
                    <p className="text-xs text-gray-500">Shop on Amazon →</p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Deal-hunting tips */}
        <section className="p-6 rounded-2xl bg-white/3 border border-white/5 mb-12">
          <h2 className="text-lg font-bold text-white mb-4">💡 Deal-Hunting Tips</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="text-[#e8722a] font-semibold mb-1">Best Times to Buy</h3>
              <ul className="space-y-1 text-gray-400">
                <li>→ <strong className="text-gray-300">March–May:</strong> End-of-season clearance (biggest discounts)</li>
                <li>→ <strong className="text-gray-300">Labor Day:</strong> Early season sales begin</li>
                <li>→ <strong className="text-gray-300">Black Friday:</strong> Good gear deals, great pass deals</li>
                <li>→ <strong className="text-gray-300">January:</strong> Mid-season clearance on slower sellers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#e8722a] font-semibold mb-1">Smart Shopping</h3>
              <ul className="space-y-1 text-gray-400">
                <li>→ Buy last year&apos;s model — same quality, 30-50% off</li>
                <li>→ Season passes are cheapest in spring (buy for next year)</li>
                <li>→ Demo skis from resorts are great deals on high-end gear</li>
                <li>→ REI garage sales + used gear shops for premium brands cheap</li>
              </ul>
            </div>
          </div>
        </section>

        {/* No deals state */}
        {communityDeals.length === 0 && (
          <div className="text-center py-12 mb-8">
            <p className="text-3xl mb-3">🏔️</p>
            <p className="text-gray-400 text-lg mb-2">
              No community deals found right now
            </p>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Ski deals peak during end-of-season (March–May) and pre-season
              (September–November). Check back soon or browse the Amazon deals above.
            </p>
          </div>
        )}

        {/* Affiliate disclosure */}
        <p className="text-xs text-gray-600 leading-relaxed">
          <strong>Disclosure:</strong> TurnLab is a participant in the Amazon
          Associates Program. Some links on this page are affiliate links — we
          earn a small commission at no extra cost to you. Community deals link
          to their original sources.
        </p>
      </div>

      <Footer />
    </div>
  );
}
