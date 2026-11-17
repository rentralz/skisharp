import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import TrackedLink from "@/components/TrackedLink";
import dealsData from "@/data/deals.json";
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from "@/lib/seo";
import {
  currentBlackFridaySeason,
  formatDealAge,
  formatSeasonDate,
  isBlackFridayDeal,
  type BlackFridaySeason,
} from "@/lib/blackFriday";

// Hourly, so the page switches between early, live and over on the right day
// even when no new deals arrive.
export const revalidate = 3600;

const TITLE = "Black Friday Ski & Snowboard Deals";
const DESCRIPTION =
  "Black Friday and Cyber Monday ski and snowboard deals: community-found discounts during the sales, store sale pages to watch, and how to make sure gear fits before you buy.";
const PATH = "/black-friday-ski-deals";
const MAX_DEALS = 24;
const FALLBACK_DEALS = 6;
const AMAZON_TAG = "turnlab-20";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "black friday ski deals",
    "black friday snowboard deals",
    "cyber monday ski deals",
    "ski gear black friday",
    "snowboard black friday sale",
  ],
});

interface Deal {
  title: string;
  url: string;
  source: string;
  category: string;
  posted: string;
  isAmazonSearch?: boolean;
}

// Each URL was opened in a real browser on 2026-11-17. REI and Backcountry
// block automated checks, so they stay on /deals instead.
const STORES = [
  {
    name: "evo",
    label: "Ski sale",
    href: "https://www.evo.com/collections/ski-sale",
    note: "Skis, boots, bindings and outerwear on sale.",
    affiliate: false,
  },
  {
    name: "evo",
    label: "Snowboard sale",
    href: "https://www.evo.com/collections/snowboard-sale",
    note: "Boards, boots and bindings on sale.",
    affiliate: false,
  },
  {
    name: "Burton",
    label: "Sale and outlet",
    href: "https://www.burton.com/en-us/collections/outlet",
    note: "Burton boards, bindings and outerwear.",
    affiliate: false,
  },
  {
    name: "Christy Sports",
    label: "Sales and promos",
    href: "https://www.christysports.com/sale/",
    note: "Ski and snowboard gear sales and promotions.",
    affiliate: false,
  },
  {
    name: "Amazon",
    label: "Black Friday ski and snowboard search",
    href: `https://www.amazon.com/s?k=black+friday+ski+snowboard+deals&tag=${AMAZON_TAG}`,
    note: "Quickest for goggles, gloves, base layers and other extras.",
    affiliate: true,
  },
] as const;

function heroMessage(season: BlackFridaySeason) {
  const blackFriday = formatSeasonDate(season.blackFriday);
  const cyberMonday = formatSeasonDate(season.cyberMonday, false);
  switch (season.phase) {
    case "early":
      return season.salesStarted
        ? `Black Friday is ${blackFriday} and Cyber Monday is ${cyberMonday}. Store sales are under way, and we add new ski and snowboard deals here as they're posted.`
        : `Black Friday is ${blackFriday} and Cyber Monday is ${cyberMonday}. Store sales usually ramp up the Monday before, ${formatSeasonDate(season.dealWindowStart, false)}. We add new ski and snowboard deals here as they're posted.`;
    case "live":
      return `Black Friday deals are live through Cyber Monday, ${cyberMonday}. New deals are added several times a day and prices move fast, so check the store before you buy.`;
    case "over":
      return `Black Friday ${season.year} is over, though some prices may still be live. Next Black Friday is ${formatSeasonDate(season.next.blackFriday)}, ${season.next.year}.`;
    default:
      return `Black Friday ${season.year} is ${blackFriday}. We start collecting ski and snowboard deals here on November 1.`;
  }
}

function DealList({ deals, section }: { deals: Deal[]; section: string }) {
  return (
    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
      {deals.map((deal) => (
        <li key={deal.url}>
          <TrackedLink
            href={deal.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            eventName="black_friday_deal_click"
            eventParams={{ section_name: section, source: deal.source, category: deal.category, deal_title: deal.title }}
            className="block h-full rounded-2xl border border-[#eadfd6] bg-white p-4 transition-colors hover:border-[#b35816] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b35816]"
          >
            <span className="block font-semibold leading-snug text-[#201d1a]">
              {deal.title}
              <span className="sr-only"> (opens in a new tab)</span>
            </span>
            <span className="mt-2 block text-xs text-[#6b635b]">
              {deal.source} · <time dateTime={deal.posted}>{formatDealAge(deal.posted)}</time>
            </span>
          </TrackedLink>
        </li>
      ))}
    </ul>
  );
}

export default function BlackFridaySkiDealsPage() {
  const season = currentBlackFridaySeason();
  const deals = (dealsData.deals as Deal[]).filter((deal) => !deal.isAmazonSearch);
  const blackFridayDeals = deals
    .filter((deal) => isBlackFridayDeal(deal, season))
    .sort((a, b) => Date.parse(b.posted) - Date.parse(a.posted))
    .slice(0, MAX_DEALS);
  const fallbackDeals = [...deals]
    .filter((deal) => deal.category !== "other")
    .sort((a, b) => Date.parse(b.posted) - Date.parse(a.posted))
    .slice(0, FALLBACK_DEALS);
  const showDeals = season.phase !== "off";
  const isOver = season.phase === "over";
  const nextPrefix = isOver ? "Next " : "";
  const nextYear = isOver ? `, ${season.next.year}` : "";

  const faqs = [
    {
      question: `When is Black Friday ${season.next.year}?`,
      answer: `Black Friday is ${formatSeasonDate(season.next.blackFriday)}, ${season.next.year}, the day after Thanksgiving. Cyber Monday is ${formatSeasonDate(season.next.cyberMonday)}.`,
    },
    {
      question: "When do Black Friday ski sales start?",
      answer:
        "Black Friday is the day after Thanksgiving and Cyber Monday is the Monday after. Store sales often begin earlier, so we list ski and snowboard deals here from November 1 through Cyber Monday.",
    },
    {
      question: "What should I check before buying ski gear on Black Friday?",
      answer:
        "Know your size first, especially ski and snowboard length, check the store's return policy, and compare the price with the store's regular sale section.",
    },
  ];

  const schema = [
    buildWebPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Deals", path: "/deals" },
      { name: "Black Friday", path: PATH },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf8] font-[family-name:var(--font-inter)] text-[#201d1a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <Breadcrumbs crumbs={[{ label: "Deals", href: "/deals" }, { label: "Black Friday" }]} />

      <main id="main-content" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[32px] bg-[#1f1b18] p-6 text-white shadow-[0_24px_60px_rgba(31,27,24,0.25)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f3cfaa]">
            Black Friday {season.phase === "over" ? season.year : season.next.year}
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Black Friday ski &amp; snowboard deals</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">{heroMessage(season)}</p>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm">
            <li className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5">
              {nextPrefix}Black Friday · {formatSeasonDate(season.next.blackFriday)}
              {nextYear}
            </li>
            <li className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5">
              {nextPrefix}Cyber Monday · {formatSeasonDate(season.next.cyberMonday)}
              {nextYear}
            </li>
            {showDeals && !isOver && (
              <li className="rounded-full border border-[#f3cfaa]/40 bg-[#f3cfaa]/10 px-4 py-1.5 text-[#f3cfaa]">
                {blackFridayDeals.length} Black Friday {blackFridayDeals.length === 1 ? "deal" : "deals"} so far
              </li>
            )}
          </ul>
        </section>

        {showDeals && (
          <section aria-labelledby="bf-deals" className="mt-12">
            <h2 id="bf-deals" className="text-2xl font-bold">
              {isOver ? `Black Friday ${season.year} deals` : "Black Friday deals so far"}
            </h2>
            {blackFridayDeals.length > 0 ? (
              <>
                <p className="mt-2 text-sm leading-6 text-[#6b635b]">
                  {isOver
                    ? "Posted during the sale, which ended on Cyber Monday. Some prices may still be live, so check the store."
                    : "Found by the deal community and filtered for ski and snowboard gear. Newest first; each opens the original deal post."}
                </p>
                <DealList deals={blackFridayDeals} section="black_friday_deals" />
              </>
            ) : isOver ? (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b635b]">
                The sale has ended and none of its deals are left in our list.{" "}
                <Link href="/deals" className="font-semibold text-[#8b5f39] underline underline-offset-4">
                  See today&apos;s ski deals
                </Link>
                .
              </p>
            ) : (
              <>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b635b]">
                  {season.salesStarted
                    ? "No Black Friday ski or snowboard deals have turned up yet. Check the store sales below; this list updates several times a day. Meanwhile, here are the newest ski deals."
                    : `No Black Friday ski or snowboard deals have been posted yet. They usually arrive Thanksgiving week, from ${formatSeasonDate(season.dealWindowStart, false)}. Until then, here are the newest ski deals.`}
                </p>
                {fallbackDeals.length > 0 && <DealList deals={fallbackDeals} section="black_friday_fallback" />}
              </>
            )}
          </section>
        )}

        <section aria-labelledby="bf-stores" className="mt-12">
          <h2 id="bf-stores" className="text-2xl font-bold">
            Store sales to watch
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b635b]">
            These are each store&apos;s sale pages. Black Friday prices show up there when the sales start.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {STORES.map((store) => (
              <li key={store.href}>
                <TrackedLink
                  href={store.href}
                  target="_blank"
                  rel={store.affiliate ? "noopener noreferrer sponsored" : "noopener noreferrer"}
                  eventName="black_friday_store_click"
                  eventParams={{ store: store.name, store_label: store.label, affiliate_link: store.affiliate }}
                  className="block h-full rounded-2xl border border-[#eadfd6] bg-white p-4 transition-colors hover:border-[#b35816] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b35816]"
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-[#201d1a]">{store.name}</span>
                    {store.affiliate && (
                      <span className="rounded-full bg-[#fff3e7] px-2 py-0.5 text-[11px] font-semibold text-[#8b5f39]">
                        Affiliate link
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-sm text-[#201d1a]">
                    {store.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#6b635b]">{store.note}</span>
                </TrackedLink>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-5 text-[#6b635b]">
            As an Amazon Associate, TurnLab earns from qualifying purchases made through the Amazon link. The other
            store links are not affiliate links.
          </p>
        </section>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <section aria-labelledby="bf-tips">
            <h2 id="bf-tips" className="text-2xl font-bold">
              Before you buy
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#6b635b]">
              <li>
                <strong className="text-[#201d1a]">Know your size first.</strong> The right length depends on your
                height, weight and level. Use the{" "}
                <Link href="/ski-size-calculator" className="font-semibold text-[#8b5f39] underline underline-offset-4">
                  ski size calculator
                </Link>{" "}
                or the{" "}
                <Link
                  href="/snowboard-size-calculator"
                  className="font-semibold text-[#8b5f39] underline underline-offset-4"
                >
                  snowboard size calculator
                </Link>{" "}
                before the sales start.
              </li>
              <li>
                <strong className="text-[#201d1a]">Boots: fit first, price second.</strong> A discounted boot that
                doesn&apos;t fit isn&apos;t a deal. Try boots on in a shop if you can.
              </li>
              <li>
                <strong className="text-[#201d1a]">Check the return policy.</strong> Return windows differ by store,
                so check before you buy gear you haven&apos;t tried.
              </li>
              <li>
                <strong className="text-[#201d1a]">Compare before you click buy.</strong> Look at the store&apos;s
                regular sale section to see whether the Black Friday price is really lower.
              </li>
            </ul>
            <p className="mt-4 text-sm text-[#6b635b]">
              Looking outside Black Friday?{" "}
              <Link href="/deals" className="font-semibold text-[#8b5f39] underline underline-offset-4">
                See all current ski deals
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="bf-faq">
            <h2 id="bf-faq" className="text-2xl font-bold">
              Black Friday questions
            </h2>
            <div className="mt-4 divide-y divide-[#eadfd6] rounded-2xl border border-[#eadfd6] bg-white dark:divide-white/10">
              {faqs.map((faq) => (
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
