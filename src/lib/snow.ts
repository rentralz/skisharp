import snowData from "@/data/snow.json";

export interface SnowResort {
  name: string;
  region: string;
  elevationM: number; // the NWS forecast grid cell, picked near mid-mountain
  daily: (number | null)[]; // forecast inches for each of snowDays; null = not forecast yet
  next3: number;
}

export const snowUpdated: string = snowData.updated;
export const snowDays: string[] = snowData.days; // today, then the next 2 days
export const snowResorts = snowData.resorts as SnowResort[];

// Under an inch everywhere reads as a quiet forecast: a grid of empty charts
// says nothing, so the band shows a compact summary instead.
const SNOWY_THRESHOLD_IN = 1;
const BIG_TOTAL_IN = 6;
const SNOW_TIME_ZONE = "America/Denver";
// The forecast is refreshed daily, but the snow step can fail on its own.
const STALE_AFTER_HOURS = 36;
const HIDE_AFTER_HOURS = 96;

// Amounts show tenths under an inch and whole inches above. Thresholds compare
// the shown value, so a 5.6″ forecast that reads "6″" is also treated as 6″.
function shownInches(value: number) {
  return value < 1 ? Math.round(value * 10) / 10 : Math.round(value);
}

export function formatInches(value: number) {
  const shown = shownInches(value);
  if (shown <= 0) return "0″";
  if (shown < 1) return `${shown.toFixed(1)}″`;
  return `${shown}″`;
}

// Days NWS has forecast for this resort: some offices stop short of day 3, and
// late in the evening an Eastern resort's first day is already over.
function forecastDates(resort: SnowResort) {
  return snowDays.filter((_, index) => resort.daily[index] != null);
}

export function forecastDayCount(resort: SnowResort) {
  return forecastDates(resort).length;
}

// The longest forecast across resorts, for copy that covers all of them.
export function bandDayCount(resorts: SnowResort[]) {
  return Math.max(1, ...resorts.map(forecastDayCount));
}

// "in the next 3 days" / "today" / "on Monday", for sentences.
export function forecastSpan(resort: SnowResort) {
  const dates = forecastDates(resort);
  if (dates.length > 1) return `in the next ${dates.length} days`;
  if (dates[0] === snowDays[0]) return "today";
  return dates[0] ? `on ${formatSnowDay(dates[0], { weekday: "long" })}` : "in the forecast";
}

// "Next 3 days" / "Today" / "Monday", for labels.
export function forecastSpanLabel(resort: SnowResort) {
  const dates = forecastDates(resort);
  if (dates.length > 1) return `Next ${dates.length} days`;
  if (dates[0] === snowDays[0]) return "Today";
  return dates[0] ? formatSnowDay(dates[0], { weekday: "long" }) : "Forecast";
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
  return [...resorts].sort((a, b) => b.next3 - a.next3);
}

export function isSnowyForecast(resorts: SnowResort[]) {
  return resorts.some((resort) => shownInches(resort.next3) >= SNOWY_THRESHOLD_IN);
}

export function snowHeadline(resorts: SnowResort[]) {
  const leader = rankBySnow(resorts)[0];
  if (!leader || shownInches(leader.next3) < SNOWY_THRESHOLD_IN) return "Waiting on winter";
  const outlook = `${leader.name} could see ${formatInches(leader.next3)} ${forecastSpan(leader)}`;
  // Not "storm watch": next to NWS data that reads like an official Winter Storm Watch.
  return shownInches(leader.next3) >= BIG_TOTAL_IN ? `Powder alert: ${outlook}` : `Snow in the forecast: ${outlook}`;
}

export function quietForecastSummary(resorts: SnowResort[]) {
  const leader = rankBySnow(resorts)[0];
  const tracked = `the ${resorts.length} US resorts we track`;
  const forecast = `${bandDayCount(resorts)}-day forecast`;
  if (leader && shownInches(leader.next3) > 0) {
    return `Only a trace in the ${forecast} at ${tracked}: ${formatInches(leader.next3)} at most, at ${leader.name}.`;
  }
  return `No snow in the ${forecast} at ${tracked}.`;
}

function snowZoneDate(nowMs: number) {
  // en-CA formats as YYYY-MM-DD, the same shape as snowDays.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SNOW_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(nowMs);
}

// Evaluated when the page renders (the home page regenerates hourly).
export function snowAgeHours(nowMs: number = Date.now()) {
  return (nowMs - Date.parse(snowUpdated)) / 3_600_000;
}

// "fresh" only when the forecast starts today, so yesterday's forecast is
// never labelled "today"; hidden once it is old or entirely in the past.
export function snowFreshness(nowMs: number = Date.now()): "fresh" | "stale" | "hidden" {
  const age = snowAgeHours(nowMs);
  const today = snowZoneDate(nowMs);
  const lastDay = snowDays[snowDays.length - 1];
  if (!Number.isFinite(age) || age > HIDE_AFTER_HOURS || !lastDay || lastDay < today) return "hidden";
  return age <= STALE_AFTER_HOURS && snowDays[0] === today ? "fresh" : "stale";
}
