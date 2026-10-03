import snowData from "@/data/snow.json";

export interface SnowResort {
  name: string;
  region: string;
  elevationM: number;
  daily: (number | null)[]; // inches per day: PAST days, then today, then forecast
  past7: number;
  next3: number;
}

export const snowUpdated: string = snowData.updated;
export const snowDays: string[] = snowData.days;
export const snowTodayIndex: number = snowData.todayIndex;
export const snowResorts = snowData.resorts as SnowResort[];

// Below an inch anywhere (past week plus forecast) the week reads as quiet:
// a grid of flat charts says nothing, so the band shows a compact summary.
const SNOWY_THRESHOLD_IN = 1;
const BIG_TOTAL_IN = 6;
const SNOW_TIME_ZONE = "America/Denver";
// The page is rebuilt at least daily, but the snow step can fail on its own.
const STALE_AFTER_HOURS = 36;
const HIDE_AFTER_HOURS = 96;

export function formatInches(value: number) {
  if (value <= 0) return "0″";
  if (value < 1) return `${value.toFixed(1)}″`;
  return `${Math.round(value)}″`;
}

// "2026-10-03" is a calendar date, not an instant: format it in UTC so no
// time-zone shift moves it to the previous day.
export function formatSnowDay(isoDate: string, options: Intl.DateTimeFormatOptions) {
  return new Date(`${isoDate}T12:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", ...options });
}

export function formatSnowUpdated(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: SNOW_TIME_ZONE,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function rankBySnow(resorts: SnowResort[]) {
  return [...resorts].sort((a, b) => b.past7 + b.next3 - (a.past7 + a.next3));
}

export function isSnowyWeek(resorts: SnowResort[]) {
  return resorts.some((resort) => resort.past7 + resort.next3 >= SNOWY_THRESHOLD_IN);
}

export function snowHeadline(resorts: SnowResort[]) {
  const stormLeader = [...resorts].sort((a, b) => b.next3 - a.next3)[0];
  const weekLeader = [...resorts].sort((a, b) => b.past7 - a.past7)[0];

  if (stormLeader && stormLeader.next3 >= BIG_TOTAL_IN) {
    return `Storm watch: ${stormLeader.name} could see ${formatInches(stormLeader.next3)} in the next 3 days`;
  }
  if (weekLeader && weekLeader.past7 >= BIG_TOTAL_IN) {
    return `${weekLeader.name} picked up ${formatInches(weekLeader.past7)} this week`;
  }
  if (isSnowyWeek(resorts)) {
    return `Snow is starting to stack up, led by ${rankBySnow(resorts)[0].name}`;
  }
  return "Waiting on winter";
}

export function quietWeekSummary(resorts: SnowResort[]) {
  const anyPast = resorts.some((resort) => resort.past7 > 0);
  const forecastMax = Math.max(0, ...resorts.map((resort) => resort.next3));
  const past = anyPast
    ? `Only a trace of snow at the ${resorts.length} resorts we track this week`
    : `No new snow at the ${resorts.length} resorts we track this week`;
  const ahead = forecastMax > 0 ? `up to ${formatInches(forecastMax)} in the 3-day forecast` : "none in the 3-day forecast";
  return `${past}, and ${ahead}.`;
}

// Evaluated when the page is built (static render).
export function snowAgeHours(nowMs: number = Date.now()) {
  return (nowMs - Date.parse(snowUpdated)) / 3_600_000;
}

export function snowFreshness(nowMs: number = Date.now()): "fresh" | "stale" | "hidden" {
  const age = snowAgeHours(nowMs);
  if (!Number.isFinite(age) || age > HIDE_AFTER_HOURS) return "hidden";
  return age > STALE_AFTER_HOURS ? "stale" : "fresh";
}
