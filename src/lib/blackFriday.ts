// Black Friday season dates and deal matching, for the Black Friday page and
// the /deals banner. Dates are America/Denver calendar dates ("YYYY-MM-DD"),
// the site's time zone, so they compare as plain strings.

export type BlackFridayPhase = "off" | "early" | "live" | "over";

export interface BlackFridayDates {
  year: number;
  thanksgiving: string;
  blackFriday: string;
  cyberMonday: string;
  dealWindowStart: string; // Monday of Thanksgiving week, when store sales usually start
}

export interface BlackFridaySeason extends BlackFridayDates {
  phase: BlackFridayPhase;
  salesStarted: boolean; // on or after the Monday of Thanksgiving week (early and live only)
  next: BlackFridayDates; // the coming Black Friday (next year's once this one is over)
}

const SEASON_TIME_ZONE = "America/Denver";
const SEASON_OPENS_MONTH_DAY = "11-01";
const BLACK_FRIDAY_TITLE = /\b(black[\s-]?friday|cyber[\s-]?(monday|week)|bfcm|doorbusters?)\b/i;
const FUTURE_SKEW_MS = 3_600_000; // a post dated in the future is bad data, not a deal

function isoDate(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month - 1, day)).toISOString().slice(0, 10);
}

function addDays(iso: string, days: number) {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

// US Thanksgiving: the fourth Thursday of November.
export function thanksgivingIso(year: number) {
  const firstWeekday = new Date(Date.UTC(year, 10, 1)).getUTCDay(); // 0 = Sunday
  const firstThursday = 1 + ((4 - firstWeekday + 7) % 7);
  return isoDate(year, 11, firstThursday + 21);
}

export function blackFridayDates(year: number): BlackFridayDates {
  const thanksgiving = thanksgivingIso(year);
  return {
    year,
    thanksgiving,
    blackFriday: addDays(thanksgiving, 1),
    cyberMonday: addDays(thanksgiving, 4),
    dealWindowStart: addDays(thanksgiving, -3),
  };
}

// en-CA formats as YYYY-MM-DD.
export function denverDateIso(ms: number) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SEASON_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(ms);
}

// off: Jan 1 to Oct 31. early: Nov 1 to the day before Thanksgiving.
// live: Thanksgiving through Cyber Monday. over: the rest of December.
export function blackFridaySeason(todayIso: string): BlackFridaySeason {
  const year = Number(todayIso.slice(0, 4));
  const dates = blackFridayDates(year);
  let phase: BlackFridayPhase;
  if (todayIso < `${year}-${SEASON_OPENS_MONTH_DAY}`) phase = "off";
  else if (todayIso < dates.thanksgiving) phase = "early";
  else if (todayIso <= dates.cyberMonday) phase = "live";
  else phase = "over";
  const salesStarted = (phase === "early" || phase === "live") && todayIso >= dates.dealWindowStart;
  return { ...dates, phase, salesStarted, next: phase === "over" ? blackFridayDates(year + 1) : dates };
}

// A Black Friday deal names the sale in its title (from November 1), or was
// posted between the Monday of Thanksgiving week and Cyber Monday.
export function isBlackFridayDeal(
  deal: { title: string; posted: string },
  season: BlackFridaySeason,
  nowMs: number = Date.now(),
) {
  if (season.phase === "off") return false;
  const postedMs = Date.parse(deal.posted);
  if (!Number.isFinite(postedMs) || postedMs > nowMs + FUTURE_SKEW_MS) return false;
  const posted = denverDateIso(postedMs);
  if (posted > season.cyberMonday) return false;
  if (posted >= season.dealWindowStart) return true;
  return posted >= `${season.year}-${SEASON_OPENS_MONTH_DAY}` && BLACK_FRIDAY_TITLE.test(deal.title);
}

// Read the clock here rather than in components (server-rendered, hourly).
export function currentBlackFridaySeason(nowMs: number = Date.now()) {
  return blackFridaySeason(denverDateIso(nowMs));
}

export function formatDealAge(posted: string, nowMs: number = Date.now()) {
  const hours = Math.floor((nowMs - Date.parse(posted)) / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "yesterday" : `${days}d ago`;
}

// "2026-11-27" -> "Friday, November 27" (UTC noon, so no zone shifts the day).
export function formatSeasonDate(iso: string, withWeekday = true) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    ...(withWeekday ? { weekday: "long" } : {}),
    month: "long",
    day: "numeric",
  });
}
