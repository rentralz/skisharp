import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { techniques } from "@/data/techniques";
import Footer from "@/components/Footer";
import NextSteps from "@/components/NextSteps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Slope Ratings Explained",
  description:
    "Understand ski slope difficulty ratings — from green circle beginner runs to double black diamond expert terrain. Learn what each trail marker means and which techniques you need.",
  path: "/slope-ratings",
  keywords: ["slope ratings explained", "green blue black ski trails", "ski trail difficulty", "double black diamond meaning"],
});

const ratings = [
  {
    symbol: "🟢",
    name: "Green Circle",
    label: "Beginner",
    color: "#22c55e",
    bgColor: "from-emerald-950 to-emerald-900",
    borderColor: "border-emerald-700/30",
    textColor: "text-emerald-300",
    grade: "6–25% grade",
    description:
      "The gentlest groomed slopes on the mountain. Wide, smooth, and well-maintained with consistent pitch. Perfect for learning fundamental skills like stopping, speed control, and basic turns.",
    expect: [
      "Wide, groomed runs with gentle consistent pitch",
      "Slow speeds — easy to stay in control",
      "Usually near the base area with beginner lifts",
      "Other beginners around you (expect unpredictable stops)",
    ],
    techniques: ["wedge-turns", "hockey-stop", "speed-control"],
    youNeed: "Snowplow turns and hockey stops. You should be able to stop reliably before attempting blue runs.",
    levelRange: "1–3",
  },
  {
    symbol: "🔵",
    name: "Blue Square",
    label: "Intermediate",
    color: "#3b82f6",
    bgColor: "from-blue-950 to-blue-900",
    borderColor: "border-blue-700/30",
    textColor: "text-blue-300",
    grade: "25–40% grade",
    description:
      "Steeper and narrower than greens, with more variable terrain. This is where most skiers spend their time improving. Expect groomed runs with some moguls, variable snow, and increasing speed.",
    expect: [
      "Steeper pitch requiring active speed management",
      "Narrower trails with occasional terrain variations",
      "Mix of groomed and natural snow conditions",
      "Faster traffic — need to be confident with turns and stops",
    ],
    techniques: ["parallel-turns", "hip-angulation", "carved-turns", "pole-planting", "upper-lower-separation"],
    youNeed: "Confident parallel turns and the ability to control speed through turn shape, not just braking. Comfortable linking turns at moderate speed.",
    levelRange: "4–6",
  },
  {
    symbol: "🔴",
    name: "Red Run",
    label: "Upper Intermediate (European)",
    color: "#ef4444",
    bgColor: "from-red-950 to-red-900",
    borderColor: "border-red-700/30",
    textColor: "text-red-300",
    grade: "30–45% grade",
    description:
      "Used in the European rating system, red runs sit between blue and black diamond. They're steeper than blues with more challenging terrain variations, but less extreme than full black diamonds. Many North American upper-blue or easy-black runs would be rated red in Europe.",
    expect: [
      "Noticeably steeper than blue runs with sustained pitch",
      "Narrower sections requiring confident parallel turns",
      "Variable snow conditions — groomed but sometimes icy or choppy",
      "Higher speeds requiring proactive speed management",
    ],
    techniques: ["short-radius-turns", "carved-turns", "pole-planting", "ice-technique", "speed-control"],
    youNeed: "Solid parallel turns at speed, comfortable with steeper pitch, and ability to handle variable conditions. Ready to work on carving and short-radius turns.",
    levelRange: "5–7",
  },
  {
    symbol: "⚫",
    name: "Black Diamond",
    label: "Advanced",
    color: "#1a1a2e",
    bgColor: "from-gray-950 to-gray-900",
    borderColor: "border-gray-600/30",
    textColor: "text-gray-600",
    grade: "40–60% grade",
    description:
      "Steep terrain that demands strong technique and confidence. Black diamond runs include mogul fields, narrow chutes, trees, and variable snow conditions. Falls here have consequences — you need reliable skills.",
    expect: [
      "Steep, sustained pitch that requires commitment",
      "Moguls, trees, ice patches, and variable snow",
      "Narrow sections where turn options are limited",
      "Expert-level traffic moving at high speed",
    ],
    techniques: ["mogul-absorption", "steep-terrain", "tree-skiing", "ice-technique", "short-radius-turns"],
    youNeed: "Strong short-radius turns, mogul technique, and the ability to ski confidently in variable conditions. Comfortable committing to the fall line on steep terrain.",
    levelRange: "7–8",
  },
  {
    symbol: "⬛⬛",
    name: "Double Black Diamond",
    label: "Expert Only",
    color: "#7c3aed",
    bgColor: "from-purple-950 to-gray-950",
    borderColor: "border-purple-700/30",
    textColor: "text-purple-300",
    grade: "60%+ grade",
    description:
      "The most challenging terrain on the mountain. Extremely steep, often with cliffs, mandatory air, tight chutes, deep powder, or combinations of all. Reserved for expert skiers with years of experience.",
    expect: [
      "Extreme steepness — often feels vertical from the top",
      "Cliffs, rocks, mandatory drops, and exposure",
      "Deep powder, wind-affected snow, or bulletproof ice",
      "Remote terrain — help may not be immediately available",
    ],
    techniques: ["powder-floating", "steep-terrain", "tree-skiing"],
    youNeed: "Complete mastery of all terrain types. Ability to assess risk, manage fear, and execute precise turns in high-consequence situations. Strong backcountry awareness.",
    levelRange: "9–10",
  },
];

const regionalDifferences = [
  {
    region: "North America",
    system: "Green Circle → Blue Square → Black Diamond → Double Black Diamond",
    notes: "Standard NSAA system. Ratings are relative to each resort — a black diamond at a small resort may feel like a blue square at a large one.",
  },
  {
    region: "Europe",
    system: "Green → Blue → Red → Black",
    notes: "Red runs fill the gap between blue and black — a crucial intermediate-advanced level that North America lacks. European blacks are often steeper than North American double blacks. Ratings tend to be more standardized across resorts thanks to national guidelines.",
  },
  {
    region: "Japan",
    system: "Green → Red → Black",
    notes: "Similar to European system but with different conventions. Japanese resorts often have exceptional powder, making even moderate slopes challenging.",
  },
];

export default function SlopeRatingsPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <Navbar />
      <Breadcrumbs crumbs={[{label:'Slope Ratings'}]} />

      {/* Hero */}
      <div id="main-content" className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#e8722a] text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Essential knowledge
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Slope Ratings Explained
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Every ski trail is marked with a difficulty rating. Understanding
            these ratings — and honestly assessing which ones match your skill
            level — is the most important safety decision you make on the mountain.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick reference */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-16">
          {ratings.map((r) => (
            <div
              key={r.name}
              className="text-center p-4 rounded-xl bg-white border border-gray-200"
            >
              <div className="text-3xl mb-2">{r.symbol}</div>
              <div className="text-gray-900 font-bold text-sm">{r.name}</div>
              <div className="text-gray-500 text-xs mt-1">{r.grade}</div>
            </div>
          ))}
        </div>

        {/* Detailed sections */}
        <div className="space-y-12">
          {ratings.map((r) => {
            const relatedTechniques = techniques.filter((t) =>
              r.techniques.includes(t.slug)
            );

            return (
              <section
                key={r.name}
                className={`rounded-2xl bg-gradient-to-br ${r.bgColor} p-6 sm:p-8 border ${r.borderColor}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{r.symbol}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{r.name}</h2>
                    <p className={`text-sm font-semibold ${r.textColor}`}>
                      {r.label} · {r.grade} · Levels {r.levelRange}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {r.description}
                </p>

                {/* What to expect */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                    What to expect
                  </h3>
                  <ul className="space-y-2">
                    {r.expect.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-500"
                      >
                        <span className="text-gray-400 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What you need */}
                <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <h3 className="text-sm font-semibold text-[#e8722a] uppercase tracking-wide mb-2">
                    Skills you need
                  </h3>
                  <p className="text-sm text-gray-600">{r.youNeed}</p>
                </div>

                {/* Related techniques */}
                {relatedTechniques.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                      Techniques for this terrain
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {relatedTechniques.map((t) => (
                        <Link
                          key={t.slug}
                          href={`/techniques/${t.slug}?discipline=${t.discipline}`}
                          className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-300 text-sm text-gray-600 hover:text-gray-900 hover:border-[#e8722a]/30 hover:bg-[#e8722a]/5 transition-colors"
                        >
                          {t.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* Regional differences */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Regional Differences
          </h2>
          <p className="text-gray-500 mb-6">
            Slope ratings aren&apos;t universal. Here&apos;s how they differ around the
            world.
          </p>

          <div className="space-y-4">
            {regionalDifferences.map((rd) => (
              <div
                key={rd.region}
                className="p-5 rounded-xl bg-white border border-gray-200"
              >
                <h3 className="text-gray-900 font-bold mb-1">{rd.region}</h3>
                <p className="text-[#e8722a] text-sm font-medium mb-2">
                  {rd.system}
                </p>
                <p className="text-gray-500 text-sm">{rd.notes}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Important warning */}
        <section className="mt-12 p-6 rounded-2xl bg-[#e8722a]/5 border border-[#e8722a]/15">
          <h3 className="text-gray-900 font-bold mb-2 flex items-center gap-2">
            <span>⚠️</span> Ratings are relative, not absolute
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            A blue square at one resort can feel very different from a blue
            square at another. Larger resorts with steeper terrain tend to have
            harder runs at every level. Weather conditions (ice, powder, fog)
            can make any run significantly harder. When visiting a new resort,
            start one level below your comfort zone and work up.
          </p>
        </section>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">
            Ready to build your skills for the next level?
          </p>
          <Link
            href="/techniques"
            className="inline-block bg-[#e8722a] hover:bg-[#d4621a] text-gray-900 font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Browse All Techniques →
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <NextSteps links={[
          { href: '/techniques?rating=green', label: 'Green Run Techniques →', description: 'Build the fundamentals — wedge turns, hockey stop, speed control' },
          { href: '/techniques?rating=black', label: 'Black Diamond Techniques →', description: 'Moguls, steep terrain, and expert-level skills' },
          { href: '/techniques', label: 'All Techniques →', description: 'Browse all 30+ technique guides by level and terrain' },
        ]} />
      </div>
      <Footer />
    </div>
  );
}
