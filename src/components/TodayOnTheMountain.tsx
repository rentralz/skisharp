import SnowChart from "@/components/SnowChart";
import {
  formatInches,
  formatSnowDay,
  formatSnowUpdated,
  isSnowyWeek,
  quietWeekSummary,
  rankBySnow,
  snowDays,
  snowHeadline,
  snowFreshness,
  snowResorts,
  snowTodayIndex,
  snowUpdated,
} from "@/lib/snow";

const TILE_COUNT = 6;
const MOBILE_TILE_COUNT = 3;
const MIN_SCALE_IN = 3; // keeps a trace from filling the whole chart

// Rebuilt daily with fresh Open-Meteo data, so the headline, date and order
// change with the weather. Server-rendered: no client JS, no runtime fetch.
export default function TodayOnTheMountain() {
  const freshness = snowFreshness();
  // Days-old data must not claim to be "today"; very old data isn't shown.
  if (snowResorts.length === 0 || snowDays.length === 0 || freshness === "hidden") {
    return null;
  }

  const snowy = isSnowyWeek(snowResorts);
  const ranked = rankBySnow(snowResorts);
  const tiles = ranked.slice(0, TILE_COUNT);
  const scaleMax = Math.max(MIN_SCALE_IN, ...tiles.flatMap((resort) => resort.daily.map((value) => value ?? 0)));
  const dateLabel = formatSnowDay(snowDays[snowTodayIndex], { weekday: "long", month: "long", day: "numeric" });
  const todayLeft = `${((snowTodayIndex + 0.5) / snowDays.length) * 100}%`;

  return (
    <section aria-labelledby="today-on-the-mountain" className="py-8 md:py-12">
      <div className="rounded-[32px] border border-[#e6dccf] bg-white p-6 shadow-[0_18px_44px_rgba(92,68,43,0.07)] sm:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b5f39]">
              {freshness === "fresh" ? `Today on the mountain · ${dateLabel}` : `Snow report · as of ${dateLabel}`}
            </p>
            <h2 id="today-on-the-mountain" className="mt-3 text-3xl font-black tracking-tight text-[#201d1a]">
              {snowHeadline(snowResorts)}
            </h2>
            {!snowy && (
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#6b635b] sm:text-base">
                {quietWeekSummary(snowResorts)}
              </p>
            )}
          </div>
          <p className="text-xs text-[#6b635b]">
            Snowfall estimates · updated <time dateTime={snowUpdated}>{formatSnowUpdated(snowUpdated)} MT</time>
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
                <dl className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <dt className="text-xs text-[#6b635b]">Past 7 days</dt>
                    <dd className="text-2xl font-black text-[#201d1a]">{formatInches(resort.past7)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#6b635b]">Next 3 days</dt>
                    <dd className="text-2xl font-semibold text-[#201d1a]">{formatInches(resort.next3)}</dd>
                  </div>
                </dl>
                <div className="mt-3">
                  <SnowChart
                    values={resort.daily}
                    days={snowDays}
                    todayIndex={snowTodayIndex}
                    scaleMax={scaleMax}
                    label={`${resort.name}, ${resort.region}`}
                  />
                  <div className="relative mt-1 h-4 text-[11px] text-[#6b635b]" aria-hidden="true">
                    <span className="absolute left-0">7 days ago</span>
                    <span className="absolute -translate-x-1/2" style={{ left: todayLeft }}>
                      today
                    </span>
                    <span className="absolute right-0">forecast</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b635b]">Past 7 days</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {ranked.map((resort) => (
                <li
                  key={resort.name}
                  className="rounded-full border border-[#eadfd6] bg-[#fcfaf8] px-3 py-1.5 text-sm text-[#201d1a]"
                >
                  <span className="font-semibold">{resort.name}</span>{" "}
                  <span className="text-[#6b635b]">{formatInches(resort.past7)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-5 text-xs leading-6 text-[#6b635b]">
          Weather-model estimates from Open-Meteo at mid-mountain elevation, not official resort reports.
          Check the resort&apos;s own snow report before you go.
        </p>
      </div>
    </section>
  );
}
