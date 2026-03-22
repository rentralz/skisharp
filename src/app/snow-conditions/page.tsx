import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { techniques } from "@/data/techniques";
import Footer from "@/components/Footer";
import NextSteps from "@/components/NextSteps";

export const metadata: Metadata = {
  title: "Snow Conditions Guide",
  description:
    "How to adapt your skiing technique for different snow conditions — groomed, powder, ice, crud, slush, windpack, and variable snow. Adjust your stance, edge, and turn shape for every surface.",
};

const snowTypes = [
  {
    name: "Groomed Corduroy",
    icon: "🟢",
    color: "from-emerald-950 to-emerald-900",
    borderColor: "border-emerald-700/30",
    description:
      "Freshly groomed runs with visible corduroy lines from the snowcat. The most predictable, forgiving surface — ideal for practicing technique.",
    feel: "Smooth and consistent underfoot. Edges grip predictably. Skis run fast on fresh corduroy.",
    stanceAdjust: "Centered, balanced stance. Standard fore-aft position.",
    edgeAdjust: "Moderate edge angles work well. Skis carve cleanly — great for building confidence in edge engagement.",
    turnAdjust: "Any turn shape works. This is where you refine technique before taking it to harder conditions.",
    danger: "Speed builds fast on fresh groom — beginners often go faster than intended. The smooth surface gives a false sense of security.",
    techniques: ["parallel-turns", "carved-turns", "hip-angulation", "short-radius-turns"],
    tipOfDay: "Morning corduroy is the best surface to practice carving. Get out early before it gets skied off.",
  },
  {
    name: "Powder",
    icon: "❄️",
    color: "from-indigo-950 to-blue-950",
    borderColor: "border-indigo-700/30",
    description:
      "Fresh, uncompacted snow — from light dustings to waist-deep dumps. The most sought-after condition, but requires real technique adjustment.",
    feel: "Soft, floating sensation. Skis sink and plane rather than slide on a surface. Resistance increases with depth.",
    stanceAdjust: "Weight slightly back (not sitting back!) to keep tips up. Equal weight on both skis — not outside-ski dominant like on groomers.",
    edgeAdjust: "Less edge angle needed. The snow itself provides resistance. Over-edging in powder buries you.",
    turnAdjust: "Wider, rounder turns. Use gentle up-and-down bouncing motion to unweight skis for turn initiation. Let the skis float, don't force them.",
    danger: "Deep powder near trees = tree well risk (suffocation hazard). Always ski with a buddy in deep snow. Exhaustion comes fast — powder skiing is physically demanding.",
    techniques: ["powder-floating", "speed-control"],
    tipOfDay: "In deep powder, make a slight hopping motion to unweight both skis simultaneously. Think 'bounce' not 'twist'.",
  },
  {
    name: "Ice & Hardpack",
    icon: "🧊",
    color: "from-cyan-950 to-blue-950",
    borderColor: "border-cyan-700/30",
    description:
      "Hard, frozen surface with minimal snow cover. Common in eastern North America, early morning after freeze, and heavily trafficked runs. The most feared condition for intermediates.",
    feel: "Skis chatter and skid. Edges struggle to grip. The surface feels like glass under your bases.",
    stanceAdjust: "Forward pressure is critical — stay over the front of your boots. Any backseat tendency and you lose all edge grip.",
    edgeAdjust: "Higher edge angles with progressive engagement — roll onto edges smoothly, don't slam them. Sharp edges are mandatory (get a tune).",
    turnAdjust: "Shorter turns, less speed. Accept some skidding — trying to carve pure arcs on ice leads to catching edges and crashes.",
    danger: "Falls on ice HURT. Speed builds fast with no friction to slow you down. If you can't control speed on ice, go to an easier run.",
    techniques: ["ice-technique", "short-radius-turns", "hip-angulation"],
    tipOfDay: "Sharp edges are 80% of the battle on ice. A fresh edge tune transforms your grip. If your edges are dull, no technique will save you.",
  },
  {
    name: "Crud & Chopped Snow",
    icon: "🫠",
    color: "from-stone-950 to-amber-950",
    borderColor: "border-stone-700/30",
    description:
      "Previously fresh snow that's been skied through and chopped up into uneven chunks and ruts. Some of the most physically demanding skiing.",
    feel: "Unpredictable. One ski might be in a chunk, the other in a rut. Alternating soft and firm under your feet.",
    stanceAdjust: "Wider stance for stability. Active legs absorbing changes in terrain. Upper body stays quiet and level while legs work underneath.",
    edgeAdjust: "Less edge commitment — the terrain does the turning for you. Focus on survival, not carving perfection.",
    turnAdjust: "Round, medium-radius turns. Avoid long traverses (you'll hit something unexpected). Keep speed moderate and be ready for surprises.",
    danger: "Knee injuries are common in crud — the uneven surface can twist your leg unexpectedly. Don't fight it — absorb and adapt.",
    techniques: ["upper-lower-separation", "mogul-absorption", "speed-control"],
    tipOfDay: "The key to crud is quiet upper body + active lower body. Your legs are shock absorbers, your torso is a gyroscope.",
  },
  {
    name: "Spring Slush",
    icon: "💧",
    color: "from-teal-950 to-emerald-950",
    borderColor: "border-teal-700/30",
    description:
      "Wet, heavy, sun-softened snow typical in spring. Varies dramatically — morning freeze crust to afternoon puddles, sometimes within the same run.",
    feel: "Heavy and grabby. Skis decelerate suddenly in deep slush. Turns require more effort than in dry snow.",
    stanceAdjust: "More forward lean to combat the grabbing. Stay centered over your feet. The heavy snow wants to throw you into the backseat.",
    edgeAdjust: "Moderate edges. Slush is forgiving for grip but punishing for speed control — the wet snow decelerates you fast.",
    turnAdjust: "Decisive turns with commitment. Hesitation in slush = getting stuck. Start turns with energy and let the snow slow you.",
    danger: "Morning = icy/frozen crust (like ice technique). Afternoon = wet and heavy. The transition between conditions catches people off guard.",
    techniques: ["carved-turns", "speed-control", "parallel-turns"],
    tipOfDay: "Ski the north-facing runs in the morning (still firm/fast), south-facing in midday (softened to corn), and call it by 2pm before it gets too slushy.",
  },
  {
    name: "Windpack & Wind Crust",
    icon: "💨",
    color: "from-gray-950 to-slate-950",
    borderColor: "border-gray-600/30",
    description:
      "Wind-affected snow that's been compressed and hardened on the surface. Can be smooth and firm, or breakable crust that collapses unpredictably.",
    feel: "Deceptive — feels firm until it breaks through. Breakable crust is widely considered the hardest snow condition to ski.",
    stanceAdjust: "Centered with slightly more weight distribution forward. Be ready for sudden changes in resistance.",
    edgeAdjust: "On firm windpack, treat like hardpack — higher edge angles. On breakable crust, reduce edge angle and keep skis flatter.",
    turnAdjust: "On breakable crust: wider turns, moderate speed, both skis equally weighted. Trying to carve through breakable crust is a recipe for a blown knee.",
    danger: "Breakable crust is genuinely dangerous. If you punch through with one ski and not the other, it can twist your knee violently. Reduce speed and consider retreating to groomed terrain.",
    techniques: ["ice-technique", "powder-floating", "speed-control"],
    tipOfDay: "If the crust keeps breaking, you need to either go fast enough to stay on top (advanced) or slow enough that breaking through isn't violent. The middle speed is the danger zone.",
  },
  {
    name: "Moguls & Bumps",
    icon: "⛰️",
    color: "from-violet-950 to-purple-950",
    borderColor: "border-violet-700/30",
    description:
      "Mounds of snow formed by repeated turning in the same spots. Not technically a 'snow condition' but a terrain feature that changes how you ski entirely.",
    feel: "Constant up-down-up-down rhythm. Knees and hips doing continuous absorption. The mountain is skiing you as much as you're skiing it.",
    stanceAdjust: "Compact, athletic stance. Hands forward and visible. Upper body faces downhill while legs absorb the bumps underneath.",
    edgeAdjust: "Minimal edging — use the shape of the mogul to redirect. Turn on the top of each bump where the ski is lightest.",
    turnAdjust: "Short, quick turns. Turn on the tops of bumps (not in the troughs). Absorb by pulling knees up, extend into the troughs.",
    danger: "Moguls are exhausting. Tired legs = loss of control. Take breaks. Start on smaller, well-spaced bumps before tackling steep mogul fields.",
    techniques: ["mogul-absorption", "short-radius-turns", "pole-planting"],
    tipOfDay: "Pick your line 3-4 bumps ahead, not just the next one. Mogul skiing is like chess — plan ahead or get trapped.",
  },
];

export default function SnowConditionsPage() {
  return (
    <div className="min-h-screen bg-[#0d1b2a] font-[family-name:var(--font-inter)]">
      <Navbar />
      <Breadcrumbs crumbs={[{label:'Snow Conditions'}]} />

      <div id="main-content" className="bg-gradient-to-b from-[#0a1520] to-[#0d1b2a] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-[#e8722a] text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Conditions guide
          </p>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Skiing Different Snow Conditions
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            The same mountain can feel completely different depending on the snow.
            Great skiers adapt their technique to what&apos;s under their feet — not
            the other way around.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {snowTypes.map((s) => {
            const relatedTechniques = techniques.filter((t) =>
              s.techniques.includes(t.slug)
            );

            return (
              <section
                key={s.name}
                className={`rounded-2xl bg-gradient-to-br ${s.color} p-6 sm:p-8 border ${s.borderColor}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{s.icon}</span>
                  <h2 className="text-2xl font-bold text-white">{s.name}</h2>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{s.description}</p>

                {/* Adjustments grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white/5">
                    <h4 className="text-xs font-semibold text-[#e8722a] uppercase tracking-wide mb-2">What it feels like</h4>
                    <p className="text-sm text-gray-300">{s.feel}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">Stance adjustment</h4>
                    <p className="text-sm text-gray-300">{s.stanceAdjust}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <h4 className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-2">Edge adjustment</h4>
                    <p className="text-sm text-gray-300">{s.edgeAdjust}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wide mb-2">Turn shape</h4>
                    <p className="text-sm text-gray-300">{s.turnAdjust}</p>
                  </div>
                </div>

                {/* Danger */}
                <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/20 mb-5">
                  <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-2">⚠️ Watch out</h4>
                  <p className="text-sm text-gray-300">{s.danger}</p>
                </div>

                {/* Tip */}
                <div className="p-4 rounded-xl bg-[#e8722a]/5 border border-[#e8722a]/15 mb-5">
                  <h4 className="text-xs font-semibold text-[#e8722a] uppercase tracking-wide mb-2">💡 Tip of the day</h4>
                  <p className="text-sm text-gray-300">{s.tipOfDay}</p>
                </div>

                {/* Linked techniques */}
                {relatedTechniques.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">
                      Related techniques
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {relatedTechniques.map((t) => (
                        <Link
                          key={t.slug}
                          href={`/techniques/${t.slug}`}
                          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:border-[#e8722a]/30 hover:bg-[#e8722a]/5 transition-colors"
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

        {/* Adaptability note */}
        <section className="mt-12 p-6 rounded-2xl bg-[#e8722a]/5 border border-[#e8722a]/15">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2">
            <span>🎯</span> The Adaptability Principle
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Conditions change constantly — sometimes within a single run. The
            best skiers aren&apos;t the ones with perfect technique for one
            condition. They&apos;re the ones who can adjust mid-turn when the
            snow changes under their feet. Build your fundamentals on groomers,
            then practice adapting on every type of snow you encounter.
          </p>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/techniques"
            className="inline-block bg-[#e8722a] hover:bg-[#d4621a] text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Browse All Techniques →
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <NextSteps links={[
          { href: '/techniques', label: 'Browse Techniques →', description: '30+ expert-curated skiing technique guides with video breakdowns' },
          { href: '/slope-ratings', label: 'Slope Ratings →', description: 'Understand difficulty ratings and which runs match your skill level' },
          { href: '/equipment-guide', label: 'Equipment Guide →', description: 'Choose the right skis, boots, and gear for every condition' },
        ]} />
      </div>
      <Footer />
    </div>
  );
}
