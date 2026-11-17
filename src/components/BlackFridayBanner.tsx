import Link from "next/link";
import dealsData from "@/data/deals.json";
import { currentBlackFridaySeason, formatSeasonDate, isBlackFridayDeal } from "@/lib/blackFriday";

// Shown on /deals from November 1 through Cyber Monday; points to the Black
// Friday page. Evaluated when /deals regenerates (hourly).
export default function BlackFridayBanner() {
  const season = currentBlackFridaySeason();
  if (season.phase !== "early" && season.phase !== "live") return null;

  const deals = dealsData.deals as Array<{ title: string; posted: string; isAmazonSearch?: boolean }>;
  const count = deals.filter((deal) => !deal.isAmazonSearch && isBlackFridayDeal(deal, season)).length;
  const headline =
    season.phase === "live"
      ? `Black Friday deals are live through Cyber Monday, ${formatSeasonDate(season.cyberMonday, false)}`
      : `Black Friday is ${formatSeasonDate(season.blackFriday)}`;
  const detail =
    count > 0
      ? `${count} Black Friday ski and snowboard ${count === 1 ? "deal" : "deals"} so far, plus store sales to watch.`
      : "Store sales to watch now, and Black Friday deals as they're posted.";

  return (
    <section aria-label="Black Friday" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <Link
        href="/black-friday-ski-deals"
        className="group flex flex-col gap-2 rounded-[24px] bg-[#1f1b18] px-5 py-4 text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f3cfaa] sm:flex-row sm:items-center sm:justify-between"
      >
        <span>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f3cfaa]">
            Black Friday {season.year}
          </span>
          <span className="mt-1 block text-lg font-bold">{headline}</span>
          <span className="mt-0.5 block text-sm text-white/75">{detail}</span>
        </span>
        <span className="shrink-0 text-sm font-semibold text-[#f3cfaa] group-hover:underline">
          See Black Friday deals →
        </span>
      </Link>
    </section>
  );
}
