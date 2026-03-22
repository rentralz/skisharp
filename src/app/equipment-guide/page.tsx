import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import NextSteps from "@/components/NextSteps";

export const metadata: Metadata = {
  title: "Ski Equipment Guide",
  description:
    "Complete guide to ski equipment — skis, boots, bindings, poles, helmets, and goggles. How to choose the right gear for your level and style.",
};

const equipment = [
  {
    name: "Skis",
    icon: "🎿",
    overview: "Your skis are the biggest factor in how you experience the mountain. Width, length, shape, and stiffness all affect performance.",
    categories: [
      {
        type: "All-Mountain",
        waist: "85–100mm",
        bestFor: "One ski for everything — groomers, bumps, light powder, trees",
        level: "All levels",
        note: "The best first ski for most people. Handles 80% of conditions well.",
      },
      {
        type: "Carving / Frontside",
        waist: "68–85mm",
        bestFor: "Groomed runs, edge-to-edge precision, speed on hardpack",
        level: "Intermediate to Expert",
        note: "Narrow waist = quick edge-to-edge. Struggles in deep snow.",
      },
      {
        type: "Powder / Freeride",
        waist: "100–120mm+",
        bestFor: "Deep powder, off-piste, backcountry",
        level: "Advanced to Expert",
        note: "Wide waist floats in deep snow. Heavy and sluggish on groomers.",
      },
      {
        type: "Park / Freestyle",
        waist: "85–95mm",
        bestFor: "Terrain park, jumps, rails, switch skiing",
        level: "Intermediate to Expert",
        note: "Twin-tip design for landing and skiing backwards. Softer flex for playfulness.",
      },
      {
        type: "Touring / Backcountry",
        waist: "85–110mm",
        bestFor: "Uphill skinning + downhill skiing",
        level: "Advanced to Expert",
        note: "Lightweight construction with touring binding compatibility. Performance compromise vs resort skis.",
      },
    ],
    sizingTips: [
      "Length: chin to forehead height for most adults. Shorter = easier turns, longer = more stability at speed",
      "Beginners: go shorter (chin height) for easier turn initiation",
      "Advanced: go longer (nose to forehead) for stability and float",
      "Heavier skiers: go longer or stiffer. Lighter skiers: shorter or softer",
      "Demo before you buy — most resorts offer demo programs",
    ],
  },
  {
    name: "Boots",
    icon: "🥾",
    overview: "The single most important piece of equipment. Ill-fitting boots ruin everything — technique, comfort, and your desire to keep skiing.",
    categories: [
      {
        type: "Beginner (Flex 60–80)",
        bestFor: "New skiers, casual skiing, comfort priority",
        note: "Soft flex forgives mistakes and is easy to walk in. Won't transmit precise inputs.",
      },
      {
        type: "Intermediate (Flex 80–100)",
        bestFor: "Improving skiers, all-mountain skiing",
        note: "Good balance of comfort and performance. Most popular range.",
      },
      {
        type: "Advanced (Flex 100–120)",
        bestFor: "Aggressive skiing, carving, moguls",
        note: "Stiff enough for precise control. Requires good technique to use effectively.",
      },
      {
        type: "Expert/Race (Flex 120–140+)",
        bestFor: "Racing, expert-level performance",
        note: "Maximum power transmission. Unforgiving — poor technique gets amplified, not dampened.",
      },
    ],
    sizingTips: [
      "Get professionally fitted at a boot fitter — NOT online shopping",
      "Your toes should lightly touch the front when standing, pull back when you flex forward",
      "Heel should be locked with zero lift — heel slip = lost control",
      "Width matters as much as length — boots come in narrow (98mm), medium (100mm), and wide (102mm+) lasts",
      "Women's boots have lower cuffs and different calf shapes — use women's-specific if applicable",
      "Custom insoles (footbeds) are the single best upgrade for any boot",
      "Boots pack out 10-15% over time — buy snug, not comfortable on day one",
    ],
  },
  {
    name: "Bindings",
    icon: "🔧",
    overview: "Bindings connect you to the ski and release you when you fall. Correct DIN settings save knees.",
    categories: [
      {
        type: "Beginner (DIN 3–7)",
        bestFor: "Light skiers, beginners, cautious skiing",
        note: "Lower DIN = easier release = safer for beginners. Will pre-release at high speeds.",
      },
      {
        type: "Intermediate (DIN 5–10)",
        bestFor: "Most recreational skiers",
        note: "Covers the widest range of skiers. Good balance of retention and safety.",
      },
      {
        type: "Advanced (DIN 8–14+)",
        bestFor: "Aggressive skiers, heavy skiers, racers",
        note: "Higher retention prevents unwanted releases at speed. Must be properly set.",
      },
    ],
    sizingTips: [
      "DIN is set by a certified tech based on your weight, height, boot sole length, age, and ability",
      "NEVER set your own DIN higher 'because it keeps coming off' — the release is protecting your knee",
      "Get bindings tested and adjusted at the start of every season",
      "Touring bindings add uphill capability but sacrifice some downhill performance",
    ],
  },
  {
    name: "Poles",
    icon: "🏒",
    overview: "Often overlooked, but proper pole length and technique affect your balance and rhythm in every turn.",
    categories: [
      {
        type: "Standard Alpine",
        bestFor: "All resort skiing",
        note: "Fixed length. Aluminum or carbon. Baskets sized for packed snow.",
      },
      {
        type: "Adjustable",
        bestFor: "Touring, varied terrain, sharing between family members",
        note: "Telescoping. Heavier than fixed. Useful if you ski different terrain types.",
      },
      {
        type: "Powder Baskets",
        bestFor: "Deep snow days",
        note: "Larger baskets prevent poles from sinking. Swap onto existing poles.",
      },
    ],
    sizingTips: [
      "Sizing: flip pole upside down, grip under basket. Forearm should be parallel to ground (90° elbow)",
      "Too long = arms too high = shoulder fatigue. Too short = hunched forward = back pain",
      "Carbon poles are lighter but break easier. Aluminum bends but survives crashes",
      "Strap technique: hand up through strap from below, then grip — lets you push down on strap, not squeeze the grip",
    ],
  },
  {
    name: "Helmet",
    icon: "⛑️",
    overview: "Non-negotiable safety equipment. Modern helmets are light, warm, and ventilated — there's no reason not to wear one.",
    categories: [
      {
        type: "In-Mold",
        bestFor: "Lightweight, ventilated, everyday skiing",
        note: "Polycarbonate shell fused to EPS foam. Lighter. Less durable after impact.",
      },
      {
        type: "Hard Shell (ABS)",
        bestFor: "Durability, park skiing, aggressive skiing",
        note: "Separate ABS shell over EPS liner. Heavier but handles multiple minor impacts.",
      },
      {
        type: "MIPS (or equivalent)",
        bestFor: "Enhanced rotational impact protection",
        note: "Inner liner rotates slightly during angled impacts. Reduces brain injury risk. Worth the upgrade.",
      },
    ],
    sizingTips: [
      "Measure your head circumference and buy your size — helmets don't stretch",
      "Should fit snug with no pressure points. Shake your head — it shouldn't move",
      "Replace after any significant impact, even if it looks fine",
      "Replace every 3-5 years regardless — materials degrade",
      "Goggle compatibility: test your goggles with the helmet — no gap between goggle top and helmet",
    ],
  },
  {
    name: "Goggles",
    icon: "🥽",
    overview: "Protect your eyes from UV, wind, and snow while providing the contrast you need to read the terrain.",
    categories: [
      {
        type: "Low Light Lens (Yellow/Rose/Pink)",
        bestFor: "Overcast, snowy, flat light conditions",
        note: "Enhances contrast in flat light. Essential for visibility on grey days.",
      },
      {
        type: "Medium/Versatile Lens (Orange/Amber)",
        bestFor: "Variable conditions, the one-lens solution",
        note: "Works in most conditions. Best single lens if you can only have one.",
      },
      {
        type: "Bright Light Lens (Dark/Mirror/Black)",
        bestFor: "Sunny days, high-altitude glare",
        note: "Reduces brightness. Useless in flat light — you won't see terrain features.",
      },
      {
        type: "Photochromic / Quick-Change",
        bestFor: "All conditions in one lens",
        note: "Photochromic auto-adjusts to light. Quick-change systems let you swap lenses in seconds.",
      },
    ],
    sizingTips: [
      "Must be compatible with your helmet — no gap (gaper gap) between goggle frame and helmet",
      "Anti-fog coating is essential. Don't wipe inside of lens — dab gently if needed",
      "Spherical lenses offer better optics and peripheral vision than cylindrical",
      "OTG (Over The Glasses) models fit prescription eyeglasses underneath",
      "Carry a low-light lens in your jacket — conditions change fast",
    ],
  },
];

export default function EquipmentGuidePage() {
  return (
    <div className="min-h-screen bg-[#0d1b2a] font-[family-name:var(--font-inter)]">
      <Navbar />
      <Breadcrumbs crumbs={[{label:'Equipment Guide'}]} />

      <div id="main-content" className="bg-gradient-to-b from-[#0a1520] to-[#0d1b2a] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#e8722a] text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Gear guide
          </p>
          <h1 className="text-4xl font-extrabold text-white mb-4">Equipment Guide</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            The right equipment amplifies good technique. The wrong equipment fights
            you every turn. Here&apos;s how to choose gear that matches your level and goals.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick nav */}
        <div className="flex flex-wrap gap-2 mb-12">
          {equipment.map((e) => (
            <a
              key={e.name}
              href={`#${e.name.toLowerCase().replace(/\s/g, "-")}`}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:border-[#e8722a]/30 transition-colors"
            >
              {e.icon} {e.name}
            </a>
          ))}
        </div>

        <div className="space-y-12">
          {equipment.map((e) => (
            <section
              key={e.name}
              id={e.name.toLowerCase().replace(/\s/g, "-")}
              className="scroll-mt-20"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{e.icon}</span>
                <h2 className="text-2xl font-bold text-white">{e.name}</h2>
              </div>
              <p className="text-gray-300 mb-6">{e.overview}</p>

              {/* Categories */}
              <div className="grid gap-3 mb-6">
                {e.categories.map((c) => (
                  <div
                    key={c.type}
                    className="p-4 rounded-xl bg-white/3 border border-white/5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <h3 className="text-white font-bold">{c.type}</h3>
                      {"waist" in c && (
                        <span className="text-[#e8722a] text-sm font-medium">
                          {(c as { waist: string }).waist} waist
                        </span>
                      )}
                    </div>
                    {"bestFor" in c && (
                      <p className="text-sm text-gray-400 mb-1">
                        <span className="text-gray-500">Best for:</span> {(c as { bestFor: string }).bestFor}
                      </p>
                    )}
                    {"level" in c && (
                      <p className="text-sm text-gray-400 mb-1">
                        <span className="text-gray-500">Level:</span> {(c as { level: string }).level}
                      </p>
                    )}
                    <p className="text-sm text-gray-400">{c.note}</p>
                  </div>
                ))}
              </div>

              {/* Sizing tips */}
              <div className="p-5 rounded-xl bg-[#e8722a]/5 border border-[#e8722a]/15">
                <h4 className="text-sm font-semibold text-[#e8722a] uppercase tracking-wide mb-3">
                  Sizing & buying tips
                </h4>
                <ul className="space-y-2">
                  {e.sizingTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-[#e8722a] mt-0.5">→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>

        {/* Budget guide */}
        <section className="mt-16 p-6 rounded-2xl bg-white/3 border border-white/5">
          <h2 className="text-xl font-bold text-white mb-4">💰 Budget Guide</h2>
          <p className="text-gray-400 text-sm mb-4">What to expect to spend for a full setup (new):</p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/20">
              <h3 className="text-emerald-400 font-bold mb-1">Budget</h3>
              <p className="text-2xl font-bold text-white mb-1">$500–800</p>
              <p className="text-xs text-gray-400">Previous season skis, basic boots, used gear. Good for beginners testing commitment.</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/20">
              <h3 className="text-blue-400 font-bold mb-1">Mid-Range</h3>
              <p className="text-2xl font-bold text-white mb-1">$1,000–1,800</p>
              <p className="text-xs text-gray-400">Current-year all-mountain setup with good boots. The sweet spot for most skiers.</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/20">
              <h3 className="text-purple-400 font-bold mb-1">Premium</h3>
              <p className="text-2xl font-bold text-white mb-1">$2,000–3,500+</p>
              <p className="text-xs text-gray-400">Top-tier skis, custom-fitted boots, carbon poles, MIPS helmet. For dedicated skiers.</p>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">💡 Pro tip: Spend 40% of your budget on boots. A $200 ski with a $400 boot will outperform a $400 ski with a $200 boot every time.</p>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/techniques"
            className="inline-block bg-[#e8722a] hover:bg-[#d4621a] text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Now Learn the Techniques →
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <NextSteps links={[
          { href: '/techniques', label: 'Browse Techniques →', description: '30+ expert-curated skiing technique guides with video breakdowns' },
          { href: '/clothing-guide', label: 'Clothing Guide →', description: 'What to wear for every weather condition on the mountain' },
          { href: '/slope-ratings', label: 'Slope Ratings →', description: 'Understand difficulty ratings and which runs match your skill level' },
        ]} />
      </div>
      <Footer />
    </div>
  );
}
