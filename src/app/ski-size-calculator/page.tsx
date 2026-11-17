import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import SizeCalculator from "@/components/SizeCalculator";
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from "@/lib/seo";
import { ABILITY_LABELS, SKI_CHART_HEIGHTS_CM, formatFeetInches, skiChartRow, type Ability } from "@/lib/sizing";

const TITLE = "Ski Size Calculator";
const DESCRIPTION =
  "What length skis do you need? Enter your height, level and where you ski for a recommended ski length range, built from the evo, REI and K2 size charts.";
const PATH = "/ski-size-calculator";

export const metadata: Metadata = buildPageMetadata({
  title: `${TITLE}: What Length Skis Do I Need?`,
  description: DESCRIPTION,
  path: PATH,
  keywords: ["ski size calculator", "what size skis do I need", "ski length chart", "ski size chart", "beginner ski length"],
});

const FAQS = [
  {
    question: "What size skis should a beginner get?",
    answer:
      "Shorter skis are easier to turn, so most charts put beginners about 12 cm under their height. Don't go much shorter than that: you still need some stability.",
  },
  {
    question: "Should I size skis by height or weight?",
    answer:
      "Height sets the starting point. Weight fine-tunes it: if you're light for your height, go a cm or two shorter; if you're heavy for your height, a cm or two longer.",
  },
  {
    question: "Do powder or park skis change the size?",
    answer:
      "Yes. Wide, rockered powder skis ski shorter than their length, so powder and freeride skiers can go a few cm longer. Carving and park skiers usually go a few cm shorter for quicker turns.",
  },
  {
    question: "What if I'm between two sizes?",
    answer:
      "Take the shorter one if you're still building confidence or ski slow and controlled, and the longer one if you ski fast or in deep snow.",
  },
  {
    question: "How long should a child's skis be?",
    answer:
      "Use the ski maker's kids' chart: adult charts start around 4'4\" (132 cm). When in doubt go shorter, and don't buy a size up to grow into.",
  },
];

const ABILITIES: Ability[] = ["beginner", "intermediate", "advanced", "expert"];

const schema = [
  buildWebPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
  buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Equipment Guide", path: "/equipment-guide" },
    { name: TITLE, path: PATH },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
];

export default function SkiSizeCalculatorPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <Breadcrumbs crumbs={[{ label: "Equipment Guide", href: "/equipment-guide" }, { label: TITLE }]} />

      <main id="main-content" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#b35816]">Gear sizing</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#201d1a] sm:text-5xl">Ski size calculator</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#6b635b]">
          Find the ski length that fits your height, your level and the way you ski. You get a range, the reasoning
          behind it, and what to watch for when you shop.
        </p>
        <p className="mt-2 text-sm text-[#6b635b]">
          Riding a board instead?{" "}
          <Link href="/snowboard-size-calculator" className="font-semibold text-[#8b5f39] underline underline-offset-4">
            Try the snowboard size calculator
          </Link>
          .
        </p>

        <div className="mt-10">
          <SizeCalculator mode="ski" />
        </div>

        <section aria-labelledby="ski-size-chart" className="mt-16">
          <h2 id="ski-size-chart" className="text-2xl font-bold text-[#201d1a]">
            Ski size chart
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b635b]">
            All-mountain skis for a typical build. Carving skiers go about 2 cm shorter, park skiers about 3 cm
            shorter, powder skiers about 3 cm longer.
          </p>
          <div
            className="mt-4 overflow-x-auto rounded-2xl border border-[#eadfd6]"
            role="region"
            aria-label="Ski size chart table, scrolls sideways"
            tabIndex={0}
          >
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">Recommended ski length in cm by height and level</caption>
              <thead className="bg-[#fcfaf8] text-[#201d1a]">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Your height
                  </th>
                  {ABILITIES.map((ability) => (
                    <th key={ability} scope="col" className="px-4 py-3 font-semibold">
                      {ABILITY_LABELS[ability]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eadfd6] dark:divide-white/10 text-[#6b635b]">
                {SKI_CHART_HEIGHTS_CM.map((heightCm) => (
                  <tr key={heightCm}>
                    <th scope="row" className="px-4 py-2.5 font-semibold text-[#201d1a]">
                      {formatFeetInches(heightCm)} <span className="font-normal text-[#6b635b]">({heightCm} cm)</span>
                    </th>
                    {skiChartRow(heightCm).map((rec, index) => (
                      <td key={ABILITIES[index]} className="px-4 py-2.5">
                        {rec.min}–{rec.max} cm
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <section aria-labelledby="how-we-size">
            <h2 id="how-we-size" className="text-2xl font-bold text-[#201d1a]">
              How we size skis
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#6b635b]">
              <li>
                <strong className="text-[#201d1a]">Height sets the starting point.</strong> The evo and REI charts
                agree within about 2 cm: beginners around 12 cm shorter than their height, intermediates about 3 cm
                shorter, experts about 5 cm longer.
              </li>
              <li>
                <strong className="text-[#201d1a]">Where you ski moves it a few cm.</strong> Following K2 and
                Völkl, carving and park skiers go shorter and powder skiers go longer.
              </li>
              <li>
                <strong className="text-[#201d1a]">Weight fine-tunes it by up to 3 cm.</strong> The charts say
                &quot;lighter or heavier than average&quot; without defining average, so we treat a BMI of 21–27 as a
                typical build and adjust gradually outside it.
              </li>
              <li>
                <strong className="text-[#201d1a]">You get a range, not one number,</strong> because the charts
                themselves differ by a few cm and every model skis a little differently.
              </li>
            </ul>
            <p className="mt-4 text-xs leading-6 text-[#6b635b]">
              Built from the published size guides of evo, REI, K2/Völkl, Peter Glenn, Christy Sports, Rossignol and
              Nordica (checked November 2026). For more on choosing skis, boots and bindings, see the{" "}
              <Link href="/equipment-guide" className="font-semibold text-[#8b5f39] underline underline-offset-4">
                equipment guide
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="ski-size-faq">
            <h2 id="ski-size-faq" className="text-2xl font-bold text-[#201d1a]">
              Ski sizing questions
            </h2>
            <div className="mt-4 divide-y divide-[#eadfd6] dark:divide-white/10 rounded-2xl border border-[#eadfd6]">
              {FAQS.map((faq) => (
                <details key={faq.question} className="px-4 py-3">
                  <summary className="cursor-pointer font-semibold text-[#201d1a]">{faq.question}</summary>
                  <p className="mt-2 text-sm leading-7 text-[#6b635b]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
