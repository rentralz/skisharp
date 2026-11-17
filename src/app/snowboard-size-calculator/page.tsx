import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import SizeCalculator from "@/components/SizeCalculator";
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from "@/lib/seo";
import { BOARD_CHART_WEIGHTS_KG, KG_PER_LB, boardChartRow, recommendBoardWidth } from "@/lib/sizing";

const TITLE = "Snowboard Size Calculator";
const DESCRIPTION =
  "What size snowboard do you need? Enter your weight, height, level and riding style for a recommended board length, plus board width from your boot size. Built from the Jones, evo, REI and K2 size charts.";
const PATH = "/snowboard-size-calculator";

export const metadata: Metadata = buildPageMetadata({
  title: `${TITLE}: What Size Snowboard Do I Need?`,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "snowboard size calculator",
    "what size snowboard do I need",
    "snowboard size chart",
    "snowboard length by weight",
    "wide snowboard boot size",
  ],
});

const FAQS = [
  {
    question: "Should I size a snowboard by height or weight?",
    answer:
      "Weight, mostly: it decides how much the board flexes under you. Height is a sanity check. A board usually stands somewhere between your chin and your nose.",
  },
  {
    question: "What size snowboard should a beginner get?",
    answer:
      "A cm or two shorter than your all-mountain size, which makes the board easier to turn and stop. Don't go much shorter: some length keeps it stable while you learn to link turns.",
  },
  {
    question: "Do I need a wide snowboard?",
    answer:
      "Look at mid-wide boards from about men's US 10 (women's 11.5) and wide boards from about men's 11, so your toes and heels don't drag in turns. Aim for 1–2 cm of boot overhang on each edge.",
  },
  {
    question: "How are park and powder boards sized?",
    answer:
      "Park riders often go 2–5 cm shorter for easier spins and presses; freeride and powder riders go 2–4 cm longer for float. Short, wide volume-shifted boards are the exception: use the maker's own chart for those.",
  },
  {
    question: "How long should a child's snowboard be?",
    answer:
      "Use the board maker's kids' chart, which goes mainly by weight: adult charts start around 75 lb (34 kg). When in doubt go shorter, and don't buy a size up to grow into.",
  },
];

const WIDTH_ROWS: Array<{ mens: string; womens: string; size: number }> = [
  { mens: "Under 8", womens: "Under 9.5", size: 7 },
  { mens: "8–9.5", womens: "9.5–11", size: 9 },
  { mens: "10–10.5", womens: "11.5–12", size: 10 },
  { mens: "11", womens: "12.5", size: 11 },
  { mens: "12", womens: "13.5", size: 12 },
  { mens: "13", womens: "14.5", size: 13 },
  { mens: "14.5 and up", womens: "16 and up", size: 14.5 },
];

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

export default function SnowboardSizeCalculatorPage() {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <Breadcrumbs crumbs={[{ label: "Equipment Guide", href: "/equipment-guide" }, { label: TITLE }]} />

      <main id="main-content" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#b35816]">Gear sizing</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#201d1a] sm:text-5xl">Snowboard size calculator</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#6b635b]">
          Find the board length that fits your weight, your level and the way you ride, plus the width your boots
          need. You get a range and the reasoning behind it.
        </p>
        <p className="mt-2 text-sm text-[#6b635b]">
          On skis instead?{" "}
          <Link href="/ski-size-calculator" className="font-semibold text-[#8b5f39] underline underline-offset-4">
            Try the ski size calculator
          </Link>
          .
        </p>

        <div className="mt-10">
          <SizeCalculator mode="snowboard" />
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <section aria-labelledby="board-size-chart" className="min-w-0">
            <h2 id="board-size-chart" className="text-2xl font-bold text-[#201d1a]">
              Snowboard size chart
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#6b635b]">
              All-mountain boards for a rider of typical height for their weight. Park riders go about 3 cm shorter,
              powder riders about 3 cm longer, beginners about 2 cm shorter.
            </p>
            <div
              className="mt-4 overflow-x-auto rounded-2xl border border-[#eadfd6]"
              role="region"
              aria-label="Snowboard size chart table, scrolls sideways"
              tabIndex={0}
            >
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Recommended snowboard length in cm by rider weight</caption>
                <thead className="bg-[#fcfaf8] text-[#201d1a]">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Your weight
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Board length
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eadfd6] dark:divide-white/10 text-[#6b635b]">
                  {BOARD_CHART_WEIGHTS_KG.map((weightKg) => {
                    const row = boardChartRow(weightKg);
                    return (
                      <tr key={weightKg}>
                        <th scope="row" className="px-4 py-2.5 font-semibold text-[#201d1a]">
                          {Math.round(weightKg / KG_PER_LB)} lb{" "}
                          <span className="font-normal text-[#6b635b]">({weightKg} kg)</span>
                        </th>
                        <td className="px-4 py-2.5">
                          {row.min}–{row.max} cm
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="board-width-chart" className="min-w-0">
            <h2 id="board-width-chart" className="text-2xl font-bold text-[#201d1a]">
              Board width by boot size
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#6b635b]">
              Pick a waist wide enough that your boots hang 1–2 cm over each edge, no more. US sizes; women&apos;s
              sizes run 1.5 above men&apos;s.
            </p>
            <div
              className="mt-4 overflow-x-auto rounded-2xl border border-[#eadfd6]"
              role="region"
              aria-label="Board width table, scrolls sideways"
              tabIndex={0}
            >
              <table className="w-full min-w-[420px] text-left text-sm">
                <caption className="sr-only">Snowboard waist width by US boot size</caption>
                <thead className="bg-[#fcfaf8] text-[#201d1a]">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Men&apos;s boot
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Women&apos;s boot
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Board waist
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eadfd6] dark:divide-white/10 text-[#6b635b]">
                  {WIDTH_ROWS.map((row) => {
                    const width = recommendBoardWidth(row.size, "mens");
                    return (
                      <tr key={row.mens}>
                        <th scope="row" className="px-4 py-2.5 font-semibold text-[#201d1a]">
                          {row.mens}
                        </th>
                        <td className="px-4 py-2.5">{row.womens}</td>
                        <td className="px-4 py-2.5">
                          {width.label}, {width.waist}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <section aria-labelledby="how-we-size">
            <h2 id="how-we-size" className="text-2xl font-bold text-[#201d1a]">
              How we size snowboards
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#6b635b]">
              <li>
                <strong className="text-[#201d1a]">Weight sets the starting point.</strong> Jones calls it the single
                most important number, because it decides how the board flexes. We sit in the middle of the Jones,
                evo, REI and K2 charts, which differ by up to 10 cm.
              </li>
              <li>
                <strong className="text-[#201d1a]">Height is a check.</strong> A board usually stands between your chin
                and your nose. If your height and weight point to quite different lengths, the range widens to show it.
              </li>
              <li>
                <strong className="text-[#201d1a]">Style and level move it a few cm.</strong> Park riders go shorter,
                freeride and powder riders longer, and beginners a cm or two shorter.
              </li>
              <li>
                <strong className="text-[#201d1a]">Width comes from your boots.</strong> From men&apos;s US 10 we use
                Jones&apos;s minimum waist widths, the strictest of the charts, so toes and heels don&apos;t drag.
              </li>
            </ul>
            <p className="mt-4 text-xs leading-6 text-[#6b635b]">
              Built from the published size guides of Jones, evo, REI, K2, Never Summer, Burton, Salomon and Peter
              Glenn (checked November 2026). For more gear advice, see the{" "}
              <Link href="/equipment-guide" className="font-semibold text-[#8b5f39] underline underline-offset-4">
                equipment guide
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="board-size-faq">
            <h2 id="board-size-faq" className="text-2xl font-bold text-[#201d1a]">
              Snowboard sizing questions
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
