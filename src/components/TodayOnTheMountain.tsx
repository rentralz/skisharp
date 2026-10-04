import SnowChart from "@/components/SnowChart";
import {
  bandDayCount,
  formatInches,
  formatSnowDay,
  formatSnowUpdated,
  forecastSpanLabel,
  isSnowyForecast,
  quietForecastSummary,
  rankBySnow,
  snowDays,
  snowFreshness,
  snowHeadline,
  snowResorts,
  snowUpdated,
} from "@/lib/snow";

const TILE_COUNT = 6;
const MOBILE_TILE_COUNT = 3;
const MIN_SCALE_IN = 3; // keeps a trace from filling the whole chart

// Refreshed daily from the National Weather Service forecast, so the headline,
// date and order change with the weather. Server-rendered: no client JS.
export default function TodayOnTheMountain() {
  const freshness = snowFreshness();
  // Yesterday's forecast must not claim to be "today"; old forecasts aren't shown.
  if (snowResorts.length === 0 || snowDays.length === 0 || freshness === "hidden") {
    return null;
  }

  const snowy = isSnowyForecast(snowResorts);
  const ranked = rankBySnow(snowResorts);
  const tiles = ranked.slice(0, TILE_COUNT);
  const scaleMax = Math.max(MIN_SCALE_IN, ...tiles.flatMap((resort) => resort.daily.map((value) => value ?? 0)));
  const dateLabel = formatSnowDay(snowDays[0], { weekday: "long", month: "long", day: "numeric" });
  const bandDays = bandDayCount(snowResorts);

  return (
    <section aria-labelledby="today-on-the-mountain" className="py-8 md:py-12">
      <div className="rounded-[32px] border border-[#e6dccf] bg-white p-6 shadow-[0_18px_44px_rgba(92,68,43,0.07)] sm:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b5f39]">
              {freshness === "fresh" ? `Today on the mountain · ${dateLabel}` : `Snow forecast · as of ${dateLabel}`}
            </p>
            <h2 id="today-on-the-mountain" className="mt-3 text-3xl font-black tracking-tight text-[#201d1a]">
              {snowHeadline(snowResorts)}
            </h2>
            {!snowy && (
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#6b635b] sm:text-base">
                {quietForecastSummary(snowResorts)}
              </p>
            )}
          </div>
          <p className="text-xs text-[#6b635b]">
            NWS snow forecast · updated <time dateTime={snowUpdated}>{formatSnowUpdated(snowUpdated)} MT</time>
          </p>
        </div>

        {snowy ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tiles.map((resort, index) => (
              // Phones get the top 3; six full-width tiles would bury the page.
              <li
                key={resort.name}
                className={`rounded-2xl border border-[#eadfd6] bg-[#fcfaf8] p-4 ${index >= MOBILE_TILE_COUNT ? "hidden sm:block" : ""}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-bold text-[#201d1a]">{resort.name}</h3>
                  <span className="text-xs text-[#6b635b]">{resort.region}</span>
                </div>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <dl>
                    <dt className="text-xs text-[#6b635b]">{forecastSpanLabel(resort)}</dt>
                    <dd className="text-3xl font-black text-[#201d1a]">{formatInches(resort.next3)}</dd>
                  </dl>
                  <SnowChart
                    values={resort.daily}
                    days={snowDays}
                    scaleMax={scaleMax}
                    label={`${resort.name}, ${resort.region}`}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b635b]">
              {bandDays === 1 ? "Today" : `Next ${bandDays} days`}
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {ranked.map((resort) => (
                <li
                  key={resort.name}
                  className="rounded-full border border-[#eadfd6] bg-[#fcfaf8] px-3 py-1.5 text-sm text-[#201d1a]"
                >
                  <span className="font-semibold">{resort.name}</span>{" "}
                  <span className="text-[#6b635b]">{formatInches(resort.next3)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-5 text-xs leading-6 text-[#6b635b]">
          Snowfall forecasts from the National Weather Service for a mid-mountain point at each resort, not
          official resort reports. Check the resort&apos;s own snow report before you go.
        </p>
      </div>
    </section>
  );
}
