import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import DealsAnalytics from "@/components/DealsAnalytics";
import DealsAlertSignup from "@/components/DealsAlertSignup";
import TrackedLink from "@/components/TrackedLink";
import dealsData from "@/data/deals.json";

const SITE_URL = "https://turnlab.co";
const DEALS_URL = `${SITE_URL}/deals`;
const DEALS_TITLE = "Best Ski Deals & Sales";
const DEALS_DESCRIPTION =
  "Browse ski deals, clearly labeled affiliate shortcuts, and community-sourced finds from TurnLab. Compare jackets, boots, goggles, skis, and more with freshness notes and direct source links.";
const DEALS_SOCIAL_DESCRIPTION =
  "Community finds, retailer sale shortcuts, and ski gear deal paths in one place — built to help you spot worthwhile discounts faster.";

export const metadata: Metadata = {
  title: DEALS_TITLE,
  description: DEALS_DESCRIPTION,
  keywords: [
    "ski deals",
    "ski gear deals",
    "ski sales",
    "ski jacket deals",
    "ski boot sales",
    "ski goggles deals",
    "ski gear discounts",
    "best ski deals",
    "TurnLab deals",
  ],
  alternates: {
    canonical: "/deals",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${DEALS_TITLE} | TurnLab`,
    description: DEALS_SOCIAL_DESCRIPTION,
    url: DEALS_URL,
    siteName: "TurnLab",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${DEALS_TITLE} | TurnLab`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${DEALS_TITLE} | TurnLab`,
    description: DEALS_SOCIAL_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const CATEGORY_LABELS: Record<
  string,
  { label: string; emoji: string; description: string; cta: string }
> = {
  jackets: {
    label: "Jackets",
    emoji: "🧥",
    description: "Outerwear deals for shell upgrades, insulation, and storm days.",
    cta: "See jacket deals",
  },
  pants: {
    label: "Pants",
    emoji: "👖",
    description: "Bib and pant searches for skiers replacing worn-out resort layers.",
    cta: "See pant deals",
  },
  baselayers: {
    label: "Base layers",
    emoji: "👕",
    description: "Low-bulk warmth plays for cold days, layering rebuilds, and gift buys.",
    cta: "See base-layer deals",
  },
  gloves: {
    label: "Gloves",
    emoji: "🧤",
    description: "Fast-moving handwear deals that are easy to compare and easy to miss.",
    cta: "See glove deals",
  },
  goggles: {
    label: "Goggles",
    emoji: "🥽",
    description: "One of the easiest high-value categories for finding meaningful markdowns.",
    cta: "See goggle deals",
  },
  helmets: {
    label: "Helmets",
    emoji: "⛑️",
    description: "Protection-first deals when you need a safer or better-fitting setup.",
    cta: "See helmet deals",
  },
  socks: {
    label: "Socks",
    emoji: "🧦",
    description: "Merino basics and easy add-on buys for comfort-focused shoppers.",
    cta: "See sock deals",
  },
  accessories: {
    label: "Accessories",
    emoji: "🏔️",
    description: "Small gear, useful add-ons, and quick shipping wins.",
    cta: "See accessory deals",
  },
  skis: {
    label: "Skis",
    emoji: "🎿",
    description: "The highest upside category when end-of-season discounts hit properly.",
    cta: "See ski deals",
  },
  boots: {
    label: "Boots",
    emoji: "🥾",
    description: "Higher-ticket buying paths for skiers replacing or upgrading their setup.",
    cta: "See boot deals",
  },
  bindings: {
    label: "Bindings",
    emoji: "🔧",
    description: "Niche but important shopping paths for full-kit refreshes.",
    cta: "See binding deals",
  },
  poles: {
    label: "Poles",
    emoji: "🏒",
    description: "Quick accessory checks for easy replacements and backup pairs.",
    cta: "See pole deals",
  },
  packs: {
    label: "Bags & packs",
    emoji: "🎒",
    description: "Storage and carry options for day trips, boot bags, and travel.",
    cta: "See bag deals",
  },
  passes: {
    label: "Lift passes",
    emoji: "🎫",
    description: "Useful when pre-season pricing or pass-related discounts show up.",
    cta: "See pass deals",
  },
  other: {
    label: "Other",
    emoji: "🏷️",
    description: "A catch-all for deal paths that do not cleanly fit a gear bucket.",
    cta: "See more deals",
  },
};

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

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  return `${days}d ago`;
}

function formatScanLabel(dateStr: string): string {
  const scannedAt = new Date(dateStr);
  const diffHours = Math.floor((Date.now() - scannedAt.getTime()) / (1000 * 60 * 60));

  if (diffHours < 24) {
    return `Updated ${timeAgo(dateStr)}`;
  }

  return `Last full scan ${scannedAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })}`;
}

function isLikelyRelevantDeal(deal: Deal): boolean {
  const haystack = `${deal.title} ${deal.url} ${deal.source}`.toLowerCase();
  const positivePattern =
    /ski|snow|winter|goggle|helmet|jacket|pant|merino|base layer|baselayer|boot|binding|pole|ikon|epic|lift|powder|outerwear/;
  const negativePattern = /harley|road king|motorcycle|windshield|shield|screen/;

  if (negativePattern.test(haystack)) {
    return false;
  }

  if (deal.category !== "other") {
    return true;
  }

  return positivePattern.test(haystack);
}

function cleanAmazonTitle(title: string): string {
  return title.replace("🔍 ", "").trim();
}

function buildDealListItem(deal: Deal, position: number) {
  return {
    "@type": "ListItem",
    position,
    url: deal.url,
    name: deal.isAmazonSearch ? cleanAmazonTitle(deal.title) : deal.title,
  };
}

export default function DealsPage() {
  const deals = dealsData.deals as Deal[];
  const lastScanned = dealsData.lastScanned;

  const communityDeals = deals.filter((deal) => !deal.isAmazonSearch && isLikelyRelevantDeal(deal));
  const amazonSearches = deals.filter((deal) => deal.isAmazonSearch);
  const featuredCommunityDeals = communityDeals.slice(0, 3);
  const primaryCtaHref = featuredCommunityDeals.length > 0 ? "#community-picks" : "#category-shortcuts";
  const primaryCtaLabel = featuredCommunityDeals.length > 0 ? "See community picks" : "Shop deal categories";
  const secondaryCtaHref = featuredCommunityDeals.length > 0 ? "#category-shortcuts" : "#trust-notes";
  const secondaryCtaLabel = featuredCommunityDeals.length > 0 ? "Shop deal categories" : "See how TurnLab picks deals";
  const trustItems = [
    formatScanLabel(lastScanned),
    "Direct source links",
    "Affiliate links labeled",
  ];
  const dealAlertsEnabled = Boolean(process.env.DEALS_ALERTS_WEBHOOK_URL) || !process.env.VERCEL;
  const featuredDealsListId = `${DEALS_URL}#featured-community-deals`;
  const categoryShortcutsListId = `${DEALS_URL}#category-shortcuts-list`;
  const breadcrumbListId = `${DEALS_URL}#breadcrumbs`;
  const primaryListId = featuredCommunityDeals.length > 0 ? featuredDealsListId : categoryShortcutsListId;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${DEALS_URL}#collection-page`,
      name: DEALS_TITLE,
      description: DEALS_DESCRIPTION,
      url: DEALS_URL,
      inLanguage: "en-US",
      dateModified: lastScanned,
      isPartOf: {
        "@type": "WebSite",
        name: "TurnLab",
        url: SITE_URL,
      },
      about: [
        { "@type": "Thing", name: "Ski deals" },
        { "@type": "Thing", name: "Ski gear sales" },
        { "@type": "Thing", name: "Ski jackets, boots, goggles, and skis" },
      ],
      breadcrumb: {
        "@id": breadcrumbListId,
      },
      mainEntity: {
        "@id": primaryListId,
      },
      hasPart: [
        ...(featuredCommunityDeals.length > 0 ? [{ "@id": featuredDealsListId }] : []),
        { "@id": categoryShortcutsListId },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": breadcrumbListId,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Deals",
          item: DEALS_URL,
        },
      ],
    },
    ...(featuredCommunityDeals.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": featuredDealsListId,
            name: "Featured ski deals from community and retailer sources",
            description:
              "The most useful current ski deals surfaced first on the TurnLab deals page.",
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            numberOfItems: featuredCommunityDeals.length,
            itemListElement: featuredCommunityDeals.map((deal, index) =>
              buildDealListItem(deal, index + 1),
            ),
          },
        ]
      : []),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": categoryShortcutsListId,
      name: "Ski deal category shortcuts",
      description:
        "Labeled ski gear category shortcuts for shoppers who already know what they want to compare.",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: amazonSearches.length,
      itemListElement: amazonSearches.map((deal, index) => buildDealListItem(deal, index + 1)),
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf8] font-[family-name:var(--font-inter)] text-[#201d1a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Breadcrumbs crumbs={[{ label: "Deals" }]} />

      <div id="main-content" className="pb-16">
        <DealsAnalytics
          lastScanned={lastScanned}
          featuredCommunityCount={featuredCommunityDeals.length}
          affiliateShortcutCount={amazonSearches.length}
        />
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[32px] border border-[#eadfd6] bg-[linear-gradient(135deg,#fffaf5_0%,#fffefc_55%,#f4ece5_100%)] p-6 shadow-[0_20px_70px_rgba(119,85,53,0.08)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <div className="inline-flex items-center rounded-full border border-[#e4d4c6] bg-white/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#a56f43] shadow-sm">
                  Ski deals &amp; sales
                </div>
                <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-[#201d1a] sm:text-5xl lg:text-6xl">
                  Find the ski deals worth clicking faster.
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-[#5f5a55] sm:text-lg">
                  TurnLab brings together community picks and category shortcuts so you can
                  check useful ski deals faster without bouncing between generic search results.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <TrackedLink
                    href={primaryCtaHref}
                    eventName="deals_hero_cta_click"
                    eventParams={{
                      cta_label: primaryCtaLabel,
                      cta_target: primaryCtaHref,
                      cta_variant: "primary",
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-[#201d1a] px-6 py-3 text-sm font-semibold text-white transition-transform transition-colors hover:-translate-y-0.5 hover:bg-[#342f2a]"
                  >
                    {primaryCtaLabel}
                  </TrackedLink>
                  <TrackedLink
                    href={secondaryCtaHref}
                    eventName="deals_hero_cta_click"
                    eventParams={{
                      cta_label: secondaryCtaLabel,
                      cta_target: secondaryCtaHref,
                      cta_variant: "secondary",
                    }}
                    className="inline-flex items-center justify-center rounded-full border border-[#d9c6b5] bg-white px-6 py-3 text-sm font-semibold text-[#7d5431] transition-colors hover:border-[#c9ae96] hover:bg-[#fff6ee]"
                  >
                    {secondaryCtaLabel}
                  </TrackedLink>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {trustItems.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-[#ebdfd7] bg-white/85 px-4 py-2 text-sm font-medium text-[#5d544c]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <aside className="relative overflow-hidden rounded-[28px] border border-[#2f2822] bg-[#1f1b18] p-6 text-white shadow-[0_16px_50px_rgba(43,30,18,0.18)]">
                <div className="absolute -right-12 -top-10 h-36 w-36 rounded-full bg-[#d8b08b]/20 blur-3xl" />
                <p className="relative text-xs font-semibold uppercase tracking-[0.24em] text-[#d8b08b]">
                  What you can expect here
                </p>
                <h2 className="relative mt-3 text-2xl font-black tracking-tight text-white">
                  Faster browsing, clearer labels, direct links.
                </h2>
                <p className="relative mt-4 text-sm leading-7 text-white/75 sm:text-base">
                  Community picks point to their original source, category shortcuts are labeled
                  clearly, and freshness stays visible so you know when to double-check a deal.
                </p>
                <ul className="relative mt-6 space-y-3 text-sm leading-7 text-white/80 sm:text-base">
                  <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    Updated timing is shown up front.
                  </li>
                  <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    Community picks link to the original post or retailer source.
                  </li>
                  <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    Category shortcuts are labeled so affiliate links never feel hidden.
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        {featuredCommunityDeals.length > 0 ? (
          <section
            id="community-picks"
            className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a56f43]">
                  Community picks
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#201d1a]">
                  Start with the links that already earned attention.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[#6c6259] sm:text-base">
                When a community pick is strong enough to be useful, it shows up here first.
              </p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {featuredCommunityDeals.map((deal, index) => {
                const category = CATEGORY_LABELS[deal.category] || CATEGORY_LABELS.other;
                return (
                  <TrackedLink
                    key={`${deal.url}-${index}`}
                    href={deal.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    eventName="deals_featured_click"
                    eventParams={{
                      slot: index + 1,
                      badge: index === 0 ? "top_pick" : index === 1 ? "worth_a_look" : "community_pick",
                      source: deal.source,
                      category: deal.category,
                      deal_title: deal.title,
                    }}
                    className="group rounded-[28px] border border-[#eadfd6] bg-white p-6 shadow-[0_14px_36px_rgba(92,68,43,0.05)] transition-transform transition-colors hover:-translate-y-1 hover:border-[#d8b08b]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center rounded-full bg-[#f5ece3] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8b5f39]">
                        {index === 0 ? "Top pick" : index === 1 ? "Worth a look" : "Community pick"}
                      </span>
                      <span className="text-xs font-medium text-[#6d655d]">{timeAgo(deal.posted)}</span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold leading-8 text-[#201d1a] transition-colors group-hover:text-[#8b5f39]">
                      {deal.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#6b635b]">
                      {category.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2 text-sm text-[#6b625b]">
                      <span className="rounded-full border border-[#eadfd6] bg-[#fcfaf8] px-3 py-1">
                        {deal.sourceIcon} {deal.source}
                      </span>
                      <span className="rounded-full border border-[#eadfd6] bg-[#fcfaf8] px-3 py-1">
                        {category.emoji} {category.label}
                      </span>
                      {typeof deal.score === "number" ? (
                        <span className="rounded-full border border-[#eadfd6] bg-[#fcfaf8] px-3 py-1">
                          ▲ {deal.score}
                        </span>
                      ) : null}
                      {typeof deal.comments === "number" && deal.comments > 0 ? (
                        <span className="rounded-full border border-[#eadfd6] bg-[#fcfaf8] px-3 py-1">
                          💬 {deal.comments}
                        </span>
                      ) : null}
                    </div>

                    <span className="mt-6 inline-flex text-sm font-semibold text-[#8b5f39]">
                      Open original deal →
                    </span>
                  </TrackedLink>
                );
              })}
            </div>
          </section>
        ) : null}

        <section
          id="category-shortcuts"
          className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a56f43]">
                Shop by category
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#201d1a]">
                Use the fast lane when you already know what gear you want.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#6c6259] sm:text-base">
              {featuredCommunityDeals.length > 0
                ? "Browse a category directly when you already know what gear you need."
                : "Browse a category directly when you already know what gear you need. Community picks return when there is something genuinely useful to feature."}
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {amazonSearches.map((deal, index) => {
              const category = CATEGORY_LABELS[deal.category] || CATEGORY_LABELS.other;
              return (
                <TrackedLink
                  key={`${deal.url}-${index}`}
                  href={deal.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  eventName="deals_category_shortcut_click"
                  eventParams={{
                    slot: index + 1,
                    category: deal.category,
                    shortcut_title: cleanAmazonTitle(deal.title),
                    source: deal.source,
                    affiliate_link: true,
                  }}
                  className="group flex h-full flex-col rounded-[26px] border border-[#eadfd6] bg-white p-6 shadow-[0_12px_30px_rgba(92,68,43,0.05)] transition-transform transition-colors hover:-translate-y-1 hover:border-[#d8b08b]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5ece3] text-2xl">
                      {category.emoji}
                    </span>
                    <span className="rounded-full border border-[#f5d7b8] bg-[#fff3e7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#a65d1a]">
                      Affiliate shortcut
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold leading-8 text-[#201d1a] transition-colors group-hover:text-[#8b5f39]">
                    {cleanAmazonTitle(deal.title)}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-[#6b635b]">
                    {category.description}
                  </p>
                  <span className="mt-6 inline-flex text-sm font-semibold text-[#8b5f39]">
                    {category.cta} →
                  </span>
                </TrackedLink>
              );
            })}
          </div>

          <p className="mt-5 text-xs leading-6 text-[#8a7a6d]">
            Disclosure: TurnLab is a participant in the Amazon Associates Program. Some
            category shortcuts above are affiliate links, which means TurnLab may earn a small
            commission at no extra cost to you.
          </p>
        </section>

        <section id="deal-alerts" className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="rounded-[30px] border border-[#eadfd6] bg-[linear-gradient(140deg,#fffaf5_0%,#fffefc_60%,#f3ece5_100%)] p-6 shadow-[0_14px_40px_rgba(92,68,43,0.06)] sm:p-7 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a56f43]">
                Deal alerts
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-[#201d1a] sm:text-4xl">
                Get the best ski deals before the best sizes disappear.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6b635b] sm:text-base">
                If you want the strongest deals without checking every thread yourself, TurnLab
                can turn the best current picks into a short email instead of another open tab.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Best picks only, not an every-day blast.",
                  "Good for sizing-sensitive gear like jackets, boots, and goggles.",
                  "Clear labels when a shortcut is affiliate-linked.",
                  "Built for shoppers who want speed without hiding the source.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#eadfd6] bg-white/85 px-4 py-3 text-sm leading-7 text-[#5f564e]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-6 text-[#8a7a6d]">
                Suggested cadence: one short roundup a week during normal periods, plus quicker
                alerts when a genuinely strong seasonal deal shows up.
              </p>
            </div>

            <DealsAlertSignup enabled={dealAlertsEnabled} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_0.9fr]">
            <div className="rounded-[28px] border border-[#eadfd6] bg-white p-6 shadow-[0_12px_30px_rgba(92,68,43,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a56f43]">
                Timing matters
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-[#201d1a]">
                Best times to buy ski gear
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[#6b635b] sm:text-base">
                <li>
                  <strong className="text-[#201d1a]">March–May:</strong> End-of-season clearance
                  tends to bring the biggest discounts.
                </li>
                <li>
                  <strong className="text-[#201d1a]">Labor Day:</strong> Early-season sales begin
                  and inventory starts to loosen up.
                </li>
                <li>
                  <strong className="text-[#201d1a]">Black Friday:</strong> Good for accessories,
                  apparel, and occasional pass deals.
                </li>
              </ul>
            </div>

            <div id="trust-notes" className="rounded-[28px] border border-[#eadfd6] bg-white p-6 shadow-[0_12px_30px_rgba(92,68,43,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a56f43]">
                Trust notes
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-[#201d1a]">
                Why these links are easier to trust
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[#6b635b] sm:text-base">
                <li>Original source links stay visible so you can judge a deal for yourself.</li>
                <li>Community picks only appear when they are strong enough to be useful.</li>
                <li>Category shortcuts are labeled as affiliate links instead of being disguised.</li>
              </ul>
            </div>

            <div className="rounded-[28px] bg-[#1f1b18] p-6 text-white shadow-[0_16px_50px_rgba(43,30,18,0.18)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d8b08b]">
                Need help choosing gear first?
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-white">
                Use a guide before you shop the deals.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
                If you are still figuring out what to buy, use the gear guides before you click
                out to a sale page.
              </p>
              <div className="mt-6 grid gap-3">
                {[
                  { href: "/equipment-guide", label: "Read the equipment guide" },
                  { href: "/clothing-guide", label: "Use the clothing guide" },
                  { href: "/budget-gear", label: "See budget-friendly gear paths" },
                ].map((item) => (
                  <TrackedLink
                    key={item.href}
                    href={item.href}
                    linkKind="next"
                    eventName="deals_guide_click"
                    eventParams={{
                      guide_label: item.label,
                      guide_destination: item.href,
                    }}
                    className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <span>{item.label}</span>
                    <span>→</span>
                  </TrackedLink>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
