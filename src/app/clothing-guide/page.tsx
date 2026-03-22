import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "What to Wear Skiing",
  description:
    "Complete guide to ski clothing for every weather condition. Layering system, gear recommendations for cold, warm, powder, wind, and spring skiing days.",
};

const layeringSystem = [
  {
    layer: "Base Layer",
    icon: "1️⃣",
    purpose: "Moisture management — wicks sweat away from skin",
    materials: "Merino wool or synthetic (polyester/nylon blend)",
    avoid: "Cotton — it absorbs sweat, stays wet, and makes you cold fast",
    tips: [
      "Merino wool is naturally odor-resistant (great for multi-day trips)",
      "Synthetic dries faster but can get smelly",
      "Fit should be snug but not restrictive",
      "Full-length legs + long-sleeve top for cold days",
    ],
  },
  {
    layer: "Mid Layer",
    icon: "2️⃣",
    purpose: "Insulation — traps warm air close to your body",
    materials: "Fleece, down, or synthetic insulation (PrimaLoft, Thinsulate)",
    avoid: "Bulky cotton hoodies — too heavy, no breathability",
    tips: [
      "Fleece: best all-rounder, breathable, works when damp",
      "Down: warmest for the weight, but useless when wet",
      "Synthetic insulation: good compromise (warm + water-resistant)",
      "On warm days, skip this layer entirely",
    ],
  },
  {
    layer: "Outer Layer (Shell)",
    icon: "3️⃣",
    purpose: "Protection — blocks wind, rain, and snow",
    materials: "Gore-Tex or similar waterproof-breathable membrane",
    avoid: "Non-breathable rain jackets — you'll be soaked in sweat inside 20 minutes",
    tips: [
      "Waterproof rating: minimum 10,000mm for skiing",
      "Breathability rating: minimum 10,000g for active skiing",
      "Pit zips are essential for temperature regulation",
      "Ski-specific jackets have powder skirts, helmet-compatible hoods, and pass pockets",
    ],
  },
];

const conditions = [
  {
    name: "Cold Day",
    temp: "Below -15°C / 5°F",
    icon: "🥶",
    color: "from-blue-950 to-cyan-950",
    borderColor: "border-cyan-700/30",
    clothing: [
      "Heavyweight merino base layer (top + bottom)",
      "Thick fleece or down mid layer",
      "Insulated ski jacket (not just a shell)",
      "Insulated ski pants",
      "Balaclava or neck gaiter covering face",
      "Helmet liner under helmet",
      "Heavyweight ski socks (merino, ONE pair — not two)",
      "Insulated ski gloves or mittens (mittens are warmer)",
      "Hand/toe warmers in gloves and boots",
      "Goggles with low-light lens (yellow/rose)",
    ],
    protips: [
      "Mittens are significantly warmer than gloves — use them on the coldest days",
      "Cover ALL exposed skin — frostbite happens in minutes at -20°C",
      "Take warming breaks every 60-90 minutes",
      "Two pairs of socks actually make your feet COLDER (restricts blood flow)",
    ],
  },
  {
    name: "Average Day",
    temp: "-5°C to -15°C / 5°F to 23°F",
    icon: "⛷️",
    color: "from-slate-950 to-blue-950",
    borderColor: "border-blue-700/30",
    clothing: [
      "Midweight merino base layer",
      "Lightweight fleece mid layer",
      "Ski jacket (shell or lightly insulated)",
      "Ski pants (shell or lightly insulated)",
      "Neck gaiter",
      "Midweight ski socks",
      "Ski gloves",
      "Goggles with versatile lens (orange/amber)",
    ],
    protips: [
      "This is the sweet spot — you can ski hard without overheating",
      "Bring a packable mid layer in case it gets colder in the afternoon",
      "Ventilation (pit zips, leg vents) helps when you're working hard",
    ],
  },
  {
    name: "Warm / Spring Day",
    temp: "Above -5°C / 23°F",
    icon: "☀️",
    color: "from-amber-950 to-orange-950",
    borderColor: "border-orange-700/30",
    clothing: [
      "Lightweight synthetic base layer (or skip bottoms entirely)",
      "Skip the mid layer",
      "Shell jacket only (no insulation) — or even just a softshell",
      "Shell ski pants or lighter spring pants",
      "Thin neck buff (for sun protection)",
      "Lightweight ski socks",
      "Lightweight gloves or spring gloves",
      "Goggles with dark lens (black/mirror) or sunglasses",
      "Sunscreen SPF 50+ on face, neck, ears",
    ],
    protips: [
      "Snow reflects UV — you WILL sunburn even on cloudy days",
      "Morning = firm/icy, afternoon = soft/slushy. Dress for both",
      "A shell jacket stuffed in your pack beats overheating all morning",
      "Lip balm with SPF — sunburned lips are miserable",
    ],
  },
  {
    name: "Powder Day",
    temp: "Any temperature",
    icon: "❄️",
    color: "from-indigo-950 to-blue-950",
    borderColor: "border-indigo-700/30",
    clothing: [
      "Standard layers for the temperature",
      "Powder skirt on jacket (MUST be sealed)",
      "Snow gaiters or pants with boot cuffs that seal over boots",
      "Goggles (NOT sunglasses — snow will get everywhere)",
      "Gloves with long gauntlets that go over jacket sleeves",
      "Neck gaiter pulled up high",
      "Helmet with goggle strap (goggles get knocked off in deep snow)",
    ],
    protips: [
      "The #1 rule: seal every gap. Snow finds its way into everything",
      "Jacket powder skirt + pants clip-together system is ideal",
      "You WILL fall in deep powder — waterproofing is non-negotiable",
      "Bring a second pair of dry gloves in your pack",
    ],
  },
  {
    name: "Windy Day",
    temp: "Any temperature (feels much colder)",
    icon: "💨",
    color: "from-gray-950 to-slate-950",
    borderColor: "border-gray-600/30",
    clothing: [
      "Add one extra layer vs temperature alone",
      "Windproof outer shell (sealed zips, storm flap)",
      "Balaclava or full face coverage",
      "Goggles — essential (wind + cold = instant eye pain)",
      "Gloves with windproof outer layer",
      "Tuck everything in — no exposed gaps at wrists, neck, or waist",
    ],
    protips: [
      "Wind chill makes -10°C feel like -25°C — dress for the wind chill, not the thermometer",
      "Exposed chairlifts are the coldest part — overdress for the ride up",
      "If visibility drops, stick to marked runs and ski below treeline",
      "Wind-loaded snow on lee slopes = avalanche risk in backcountry",
    ],
  },
  {
    name: "Wet Snow / Rain",
    temp: "Around 0°C / 32°F",
    icon: "🌧️",
    color: "from-teal-950 to-gray-950",
    borderColor: "border-teal-700/30",
    clothing: [
      "Waterproof shell jacket (check seam taping)",
      "Waterproof shell pants",
      "Synthetic base + mid layers (NOT down — down dies when wet)",
      "Waterproof gloves (leather gets soaked)",
      "Goggles with anti-fog coating",
      "Consider a waterproof pack cover",
    ],
    protips: [
      "This is the worst condition for gear — everything gets tested",
      "Bring spare dry gloves — wet hands are miserable",
      "Wax your skis for wet snow (warm wax / universal)",
      "Après-ski = hang everything to dry ASAP or tomorrow is awful",
    ],
  },
];

const essentialGear = [
  { item: "Helmet", note: "Non-negotiable. Modern helmets are light and warm. MIPS technology adds rotational impact protection." },
  { item: "Goggles", note: "Match lens to conditions: yellow/rose for flat light, amber/orange for versatile, dark/mirror for bright sun. Anti-fog coating matters." },
  { item: "Ski Socks", note: "ONE pair of ski-specific merino socks. Over-the-calf length. Never double up — it creates pressure points and reduces circulation." },
  { item: "Gloves/Mittens", note: "Waterproof with good insulation. Leather palms grip poles better. Mittens for cold days, gloves for dexterity." },
  { item: "Neck Gaiter/Buff", note: "Versatile — pull up for cold, pull down for warm. Merino or synthetic. Skip the cotton bandana." },
  { item: "Sunscreen", note: "SPF 50+ every day, even cloudy ones. Snow reflects 80% of UV. Reapply at lunch. Don't forget ears and under-chin." },
];

export default function ClothingGuidePage() {
  return (
    <div className="min-h-screen bg-[#0d1b2a] font-[family-name:var(--font-inter)]">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#0a1520] to-[#0d1b2a] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#e8722a] text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Gear guide
          </p>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            What to Wear Skiing
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            The right clothing makes the difference between an amazing day and a
            miserable one. Layer smart, dress for the conditions, and seal every gap.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Layering System */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">The Layering System</h2>
          <p className="text-gray-400 mb-8">
            Three layers that work together. Add or remove mid layers to adapt
            to any temperature without buying different outfits.
          </p>

          <div className="space-y-4">
            {layeringSystem.map((l) => (
              <div
                key={l.layer}
                className="rounded-xl bg-white/3 border border-white/5 p-5 sm:p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{l.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{l.layer}</h3>
                    <p className="text-sm text-[#e8722a]">{l.purpose}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Use</p>
                    <p className="text-sm text-gray-300">{l.materials}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-1">Avoid</p>
                    <p className="text-sm text-gray-300">{l.avoid}</p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {l.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-gray-600 mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Conditions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">
            Dress for the Conditions
          </h2>
          <p className="text-gray-400 mb-8">
            What to wear for each type of weather you&apos;ll encounter on the mountain.
          </p>

          <div className="space-y-6">
            {conditions.map((c) => (
              <div
                key={c.name}
                className={`rounded-2xl bg-gradient-to-br ${c.color} p-6 sm:p-8 border ${c.borderColor}`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-3xl">{c.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{c.name}</h3>
                    <p className="text-sm text-gray-400">{c.temp}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mt-5">
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">What to wear</h4>
                    <ul className="space-y-2">
                      {c.clothing.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-[#e8722a] mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#e8722a] uppercase tracking-wide mb-3">Pro tips</h4>
                    <ul className="space-y-2">
                      {c.protips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="text-gray-600 mt-0.5">💡</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Essential Gear */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Essential Gear</h2>
          <p className="text-gray-400 mb-6">
            Beyond the layers — the gear every skier needs regardless of conditions.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {essentialGear.map((g) => (
              <div key={g.item} className="p-4 rounded-xl bg-white/3 border border-white/5">
                <h3 className="text-white font-bold mb-1">{g.item}</h3>
                <p className="text-sm text-gray-400">{g.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Golden rule */}
        <section className="p-6 rounded-2xl bg-[#e8722a]/5 border border-[#e8722a]/15 mb-12">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2">
            <span>🏔️</span> The Golden Rule
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            If you&apos;re comfortable standing still outside, you&apos;re overdressed
            for skiing. You should feel slightly cool before you start moving.
            Within 5 minutes of skiing, your body heat will bring you to the
            perfect temperature. Overdressing leads to sweat, which leads to
            being cold when you stop.
          </p>
        </section>

        <div className="text-center">
          <Link
            href="/techniques"
            className="inline-block bg-[#e8722a] hover:bg-[#d4621a] text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Now Learn the Techniques →
          </Link>
        </div>
      </div>

      <footer className="bg-[#080f18] border-t border-white/5 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="text-xl font-bold text-white mb-2">
            Ski<span className="text-[#e8722a]">Sharp</span>
          </div>
          <p className="text-gray-500 text-sm">
            The internet&apos;s best ski instruction — curated, organized, and free.
          </p>
        </div>
      </footer>
    </div>
  );
}
