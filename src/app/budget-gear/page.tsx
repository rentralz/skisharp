import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import NextSteps from "@/components/NextSteps";

export const metadata: Metadata = {
  title: "Budget Ski Gear Under $250",
  description:
    "Complete budget ski clothing setup for under $250 on Amazon. Everything a first-time skier needs — jacket, pants, base layers, gloves, goggles, and more.",
};

const AFFILIATE_TAG = "turnlab-20";

interface GearItem {
  name: string;
  price: string;
  why: string;
  tip: string;
  searchQuery: string;
  emoji: string;
}

const gearItems: GearItem[] = [
  {
    name: "Ski Jacket (Waterproof Shell)",
    price: "$50–80",
    why: "Your outer defense against wind, snow, and wet. Look for 10,000mm+ waterproofing, sealed seams, and a powder skirt. Don't need insulation if you layer underneath.",
    tip: "Columbia, Wantdo, and MOERDENG all make solid budget jackets. Skip anything labeled \"water resistant\" — you need waterPROOF.",
    searchQuery: "mens+waterproof+ski+jacket",
    emoji: "🧥",
  },
  {
    name: "Ski Pants (Waterproof)",
    price: "$30–50",
    why: "Arctix is the undisputed budget king here — 20,000+ Amazon reviews and they genuinely work. Insulated, waterproof, boot gaiters included.",
    tip: "Arctix Essential or Arctix Snow are the go-to. Get the ones with boot gaiters — they keep snow out of your boots.",
    searchQuery: "Arctix+ski+pants",
    emoji: "👖",
  },
  {
    name: "Base Layer Set (Top + Bottom)",
    price: "$25–35",
    why: "The layer against your skin. Must wick sweat — if you get wet from sweat, you get cold. Synthetic or merino wool only. NEVER cotton.",
    tip: "TSLA and Thermajohn make great budget base layers. Mid-weight for most conditions. Get a set (top + bottom) to save money.",
    searchQuery: "thermal+base+layer+set+skiing",
    emoji: "👕",
  },
  {
    name: "Mid Layer (Fleece)",
    price: "$20–35",
    why: "Your insulation layer. Traps warm air between base layer and jacket. A quarter-zip fleece is the most versatile option — easy to vent if you're warm.",
    tip: "Amazon Essentials fleece or Columbia Steens Mountain are both under $30 and work great. Avoid bulky hoodies — they restrict movement.",
    searchQuery: "quarter+zip+fleece+mens",
    emoji: "🧶",
  },
  {
    name: "Ski Socks (Merino Wool)",
    price: "$15–20",
    why: "Your feet make or break the day. One pair of proper ski socks — thin merino wool, over the calf. NOT your thick hiking socks. NOT two pairs layered.",
    tip: "Darn Tough or Smartwool are best but pricey. Budget pick: Meriwool or Danish Endurance merino ski socks. One pair per day.",
    searchQuery: "merino+wool+ski+socks",
    emoji: "🧦",
  },
  {
    name: "Ski Gloves (Waterproof)",
    price: "$20–30",
    why: "Cold hands end ski days early. Need waterproof exterior + warm lining. Mittens are warmer than gloves if you don't need dexterity.",
    tip: "MCTi and Velazzio make solid budget ski gloves. Make sure they cover your wrist and go under or over your jacket cuff — no gaps.",
    searchQuery: "waterproof+ski+gloves+insulated",
    emoji: "🧤",
  },
  {
    name: "Ski Goggles",
    price: "$20–35",
    why: "Protect eyes from UV, wind, and snow. Even cheap goggles beat sunglasses for skiing — they seal against your face and don't fall off.",
    tip: "OutdoorMaster OTG or Odoland goggles are the budget favorites. Get a dual-lens model (resists fogging) with an amber/orange lens for versatile conditions.",
    searchQuery: "ski+goggles+anti+fog",
    emoji: "🥽",
  },
  {
    name: "Neck Gaiter / Balaclava",
    price: "$8–15",
    why: "Covers the gap between your jacket collar and goggles. Blocks wind on your face and neck. Essential on cold days, nice-to-have on mild ones.",
    tip: "Any fleece-lined gaiter works. WTACTFUL and Self Pro are popular budget picks. Get one that can pull up over your nose.",
    searchQuery: "fleece+neck+gaiter+skiing",
    emoji: "🏔️",
  },
  {
    name: "Helmet (Non-Negotiable)",
    price: "$35–55",
    why: "Not optional. Modern ski helmets are light, warm, and ventilated. Replaces a beanie entirely. Protects your head from collisions, ice, trees, and other skiers.",
    tip: "OutdoorMaster Kelvin or TurboSke are solid budget ASTM-certified helmets. Must fit snug with no pressure points. Replace after any impact.",
    searchQuery: "ski+helmet+ASTM+certified",
    emoji: "⛑️",
  },
];

function getAmazonUrl(searchQuery: string): string {
  return `https://www.amazon.com/s?k=${searchQuery}&tag=${AFFILIATE_TAG}`;
}

function getTotalRange(): string {
  const mins = gearItems.map((g) => {
    const parts = g.price.split("–");
    return parseInt(parts[0].replace(/[^0-9]/g, ""));
  });
  const maxes = gearItems.map((g) => {
    const parts = g.price.split("–");
    return parseInt((parts[1] || parts[0]).replace(/[^0-9]/g, ""));
  });
  return `$${mins.reduce((a, b) => a + b, 0)}–$${maxes.reduce((a, b) => a + b, 0)}`;
}

export default function BudgetGearPage() {
  const total = getTotalRange();

  return (
    <div className="min-h-screen bg-[#0d1b2a] font-[family-name:var(--font-inter)]">
      <Navbar />
      <Breadcrumbs crumbs={[{ label: "Budget Gear" }]} />

      <div id="main-content" className="bg-gradient-to-b from-[#0a1520] to-[#0d1b2a] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#e8722a] text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Starter kit
          </p>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Budget Ski Gear Under $250
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Everything you need for your first ski day — without spending a fortune.
            All picks are well-reviewed on Amazon and actually work on the mountain.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Total budget card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950 to-emerald-900 border border-emerald-700/30 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-emerald-300 font-bold text-sm uppercase tracking-wide mb-1">
                Total Budget
              </h2>
              <p className="text-3xl font-extrabold text-white">{total}</p>
              <p className="text-emerald-400/70 text-sm mt-1">
                Full outfit • 9 items • Ready to ski
              </p>
            </div>
            <div className="text-sm text-emerald-300/80 max-w-xs">
              <p>
                💡 <strong>Skip rentals on clothing</strong> — resorts charge $30–50/day
                for jacket + pants alone. This setup pays for itself in 3–4 trips.
              </p>
            </div>
          </div>
        </div>

        {/* The golden rule */}
        <div className="p-5 rounded-xl bg-[#e8722a]/5 border border-[#e8722a]/15 mb-10">
          <h3 className="text-white font-bold mb-2">🏔️ The #1 Rule for Ski Clothing</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            <strong className="text-white">Layer, don&apos;t bulk.</strong> Three
            thin layers beat one thick jacket every time. Base layer (wicks sweat) →
            mid layer (traps heat) → outer shell (blocks wind & snow). You can remove
            layers when warm and add when cold. A single puffy jacket gives you zero
            flexibility.
          </p>
        </div>

        {/* Gear items */}
        <div className="space-y-6">
          {gearItems.map((item, index) => (
            <div
              key={item.name}
              className="p-5 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <h3 className="text-white font-bold">
                      {index + 1}. {item.name}
                    </h3>
                    <span className="text-[#e8722a] text-sm font-semibold">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                {item.why}
              </p>

              <div className="p-3 rounded-lg bg-white/3 border border-white/5 mb-4">
                <p className="text-sm text-gray-400">
                  <span className="text-gray-500 font-medium">💡 Buying tip:</span>{" "}
                  {item.tip}
                </p>
              </div>

              <a
                href={getAmazonUrl(item.searchQuery)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF9900]/10 border border-[#FF9900]/30 text-[#FF9900] text-sm font-medium hover:bg-[#FF9900]/20 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M.045 18.02c.07-.116.36-.172.55-.132.19.04.41.172.55.308 1.27 1.193 2.87 1.862 4.58 1.862 3.32 0 6.18-2.487 6.73-5.915.01-.07.04-.12.08-.15.04-.03.09-.04.14-.02 3.62 1.2 6.58-.17 7.3-3.39.01-.05.04-.09.08-.11.04-.02.09-.02.13.01 1.87 1.19 2.77 3.34 2.32 5.53-.67 3.28-3.91 5.54-7.22 5.04-1.67-.25-3.15-1.13-4.18-2.39-.13-.16-.35-.2-.52-.1-2.81 1.67-6.33 1.76-9.24.25-.27-.14-.41-.45-.31-.73Z" />
                </svg>
                Shop on Amazon →
              </a>
            </div>
          ))}
        </div>

        {/* What NOT to buy */}
        <section className="mt-12 p-6 rounded-2xl bg-red-950/20 border border-red-800/20">
          <h2 className="text-xl font-bold text-white mb-4">❌ What NOT to Buy</h2>
          <div className="space-y-3">
            {[
              {
                dont: "Cotton anything (\"Cotton kills\")",
                why: "Cotton absorbs sweat, holds moisture, and makes you freezing cold. This includes jeans, cotton hoodies, and cotton socks.",
              },
              {
                dont: "Thick hiking socks or double socks",
                why: "Creates pressure points in ski boots, restricts blood flow, and actually makes feet colder. One thin merino pair is all you need.",
              },
              {
                dont: "Non-waterproof jacket or pants",
                why: "\"Water resistant\" ≠ waterproof. You'll be soaked after one fall in the snow. Look for 10,000mm+ waterproof rating.",
              },
              {
                dont: "Sunglasses instead of goggles",
                why: "Sunglasses fog up, fall off when you fall, let snow and wind in from the sides. Goggles seal to your face.",
              },
              {
                dont: "Your regular winter jacket",
                why: "Usually too bulky, not waterproof enough, restricts arm movement, and doesn't have a powder skirt. Fine for walking, bad for skiing.",
              },
            ].map((item) => (
              <div key={item.dont} className="flex items-start gap-3">
                <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                <div>
                  <p className="text-white text-sm font-medium">{item.dont}</p>
                  <p className="text-gray-500 text-xs">{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rental vs Buy */}
        <section className="mt-8 p-6 rounded-2xl bg-white/3 border border-white/5">
          <h2 className="text-xl font-bold text-white mb-4">🤔 Rent or Buy?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-[#e8722a] font-bold text-sm mb-2">ALWAYS BUY (clothing)</h3>
              <p className="text-gray-400 text-sm">
                Jacket, pants, base layers, socks, gloves, goggles, helmet. Rental
                clothing is overpriced, worn out, and never fits right. This budget
                setup costs less than 3 days of clothing rental.
              </p>
            </div>
            <div>
              <h3 className="text-blue-400 font-bold text-sm mb-2">RENT FIRST (equipment)</h3>
              <p className="text-gray-400 text-sm">
                Skis, boots, poles — rent for your first season. Demo different
                types. Only buy after you know your skill level, preferred terrain,
                and boot size from a professional fitting.
              </p>
            </div>
          </div>
        </section>

        {/* Affiliate disclosure */}
        <p className="mt-8 text-xs text-gray-600 leading-relaxed">
          <strong>Disclosure:</strong> TurnLab is a participant in the Amazon
          Associates Program. Links on this page are affiliate links — if you buy
          through them, we earn a small commission at no extra cost to you. We only
          recommend gear we&apos;d actually use on the mountain.
        </p>

        <div className="max-w-4xl mx-auto">
          <NextSteps
            heading="Ready to Hit the Mountain?"
            links={[
              {
                href: "/techniques?rating=green",
                label: "Beginner Techniques →",
                description: "Start with the fundamentals — wedge turns, stopping, and chairlift basics",
              },
              {
                href: "/clothing-guide",
                label: "Full Clothing Guide →",
                description: "Deeper dive into layering, weather conditions, and premium options",
              },
              {
                href: "/equipment-guide",
                label: "Equipment Guide →",
                description: "Learn about skis, boots, and bindings when you're ready to buy",
              },
            ]}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
