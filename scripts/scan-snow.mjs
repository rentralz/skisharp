#!/usr/bin/env node
/**
 * TurnLab Snow Forecast Scanner
 * Fetches the National Weather Service gridded snowfall forecast (today and
 * the next 2 days) for well-known US resorts and writes src/data/snow.json for
 * the homepage "Today on the mountain" band.
 *
 * api.weather.gov is US-government data: public domain, free for commercial
 * use, no key. It only asks for a User-Agent naming the app and a contact.
 * Values are forecasts for one 2.5 km NWS grid cell per resort, picked near
 * mid-mountain; they are not the resorts' official snow reports.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { warnSourceDown } from "./lib/feeds.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SNOW_PATH = path.join(__dirname, "..", "src", "data", "snow.json");
const USER_AGENT = "TurnLab-SnowScanner/2.0 (+https://turnlab.co; hello@turnlab.co)";

// Today and the next 2 days: some offices (e.g. Burlington, for Killington)
// only forecast snowfall about 60 hours out.
const FORECAST_DAYS = 3;
const TIME_ZONE = "America/Denver"; // the site's display zone; the day list is anchored here
const MAX_GRID_AGE_HOURS = 36; // NWS occasionally serves a gridpoint that stopped updating
// A later day must be forecast all day (23 allows the spring-forward day),
// or it is "not forecast yet" rather than a silently short total.
const FULL_DAY_HOURS = 23;
const MM_PER_INCH = 25.4;
const HOUR_MS = 3_600_000;
const ATTEMPTS = 3;

// Points chosen so the NWS grid cell sits near mid-mountain (cell elevation in
// the comment); valley cells badly understate mountain snow.
const RESORTS = [
  { name: "Alta", region: "Utah", lat: 40.5884, lon: -111.6386 }, // 2987 m
  { name: "Park City", region: "Utah", lat: 40.637, lon: -111.528 }, // 2743 m
  { name: "Vail", region: "Colorado", lat: 39.6227, lon: -106.3714 }, // 3005 m
  { name: "Breckenridge", region: "Colorado", lat: 39.48, lon: -106.085 }, // 3291 m
  { name: "Jackson Hole", region: "Wyoming", lat: 43.5916, lon: -110.849 }, // 2384 m
  { name: "Big Sky", region: "Montana", lat: 45.28, lon: -111.435 }, // 2819 m
  { name: "Palisades Tahoe", region: "California", lat: 39.19, lon: -120.247 }, // 2251 m
  { name: "Mammoth Mountain", region: "California", lat: 37.6308, lon: -119.0326 }, // 3009 m
  { name: "Killington", region: "Vermont", lat: 43.611, lon: -72.805 }, // 792 m
];

function round1(value) {
  return Math.round(value * 10) / 10;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// api.weather.gov has frequent transient 5xx errors: retry those, not 4xx.
async function getJson(url) {
  let lastError;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": USER_AGENT, Accept: "application/geo+json" },
        signal: AbortSignal.timeout(20000),
      });
      if (res.ok) return await res.json();
      lastError = new Error(`${res.status} ${res.statusText}`);
      if (res.status < 500 && res.status !== 429) break;
    } catch (error) {
      lastError = error;
    }
    if (attempt < ATTEMPTS) await sleep(2000 * attempt);
  }
  throw lastError;
}

// en-CA formats as YYYY-MM-DD.
function dateFormatter(timeZone) {
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" });
}

function localHour(timeZone, ms) {
  return Number(new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", hourCycle: "h23" }).format(ms));
}

function addDays(isoDate, count) {
  const date = new Date(`${isoDate}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + count);
  return date.toISOString().slice(0, 10);
}

// "2026-10-04T06:00:00+00:00/PT6H" -> { startMs, hours }
function parseValidTime(validTime) {
  const [start, duration] = String(validTime).split("/");
  const match = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?)?$/.exec(duration ?? "");
  const startMs = Date.parse(start);
  if (!match || Number.isNaN(startMs)) return null;
  const hours = Number(match[1] ?? 0) * 24 + Number(match[2] ?? 0);
  return { startMs, hours };
}

// Forecast intervals run 1-6+ hours and cross midnight, so spread each one
// evenly over its hours and total by the resort's local calendar day. An
// interval we can't read or that overlaps another is bad data, not a gap.
function totalsByLocalDay(values, timeZone) {
  const toDate = dateFormatter(timeZone);
  const totals = new Map();
  const seenHours = new Set();
  for (const { validTime, value } of values) {
    if (value === null) continue; // no forecast for this interval
    const interval = parseValidTime(validTime);
    if (!interval || typeof value !== "number" || !Number.isFinite(value) || value < 0) {
      throw new Error(`unreadable forecast interval ${validTime} = ${value}`);
    }
    // A zero-length interval holds no forecast; the loop below simply skips it.
    for (let hour = 0; hour < interval.hours; hour++) {
      const ms = interval.startMs + hour * HOUR_MS;
      const hourKey = Math.floor(ms / HOUR_MS); // catches overlaps that start off the hour too
      if (seenHours.has(hourKey)) throw new Error(`overlapping forecast intervals at ${new Date(ms).toISOString()}`);
      seenHours.add(hourKey);
      const date = toDate.format(ms);
      const day = totals.get(date) ?? { mm: 0, hours: 0 };
      totals.set(date, { mm: day.mm + value / interval.hours, hours: day.hours + 1 });
    }
  }
  return totals;
}

async function fetchResort(resort, days, nowMs) {
  const point = await getJson(`https://api.weather.gov/points/${resort.lat},${resort.lon}`);
  const { forecastGridData, timeZone } = point?.properties ?? {};
  if (!forecastGridData || !timeZone) throw new Error("no forecast grid for this point");

  const grid = (await getJson(forecastGridData))?.properties;
  const snowfall = grid?.snowfallAmount;
  if (snowfall?.uom !== "wmoUnit:mm" || !Array.isArray(snowfall.values)) {
    throw new Error(`unexpected snowfall data (${snowfall?.uom ?? "missing"})`);
  }
  const ageHours = (nowMs - Date.parse(grid.updateTime)) / HOUR_MS;
  if (!(ageHours <= MAX_GRID_AGE_HOURS)) {
    throw new Error(`forecast grid last updated ${grid.updateTime}`);
  }

  const elevationM = grid.elevation?.value;
  if (!Number.isFinite(elevationM)) throw new Error("forecast grid has no elevation");

  // `days` are Denver dates, but near midnight a resort's own date differs
  // (Killington is 2 hours ahead, the Pacific resorts 1 behind), so judge each
  // day against the resort's calendar. Its today must cover the rest of the
  // day (1 hour of slack); a later day must be covered all day, or it is null
  // because it runs past the office's forecast horizon. A day already over at
  // the resort is null. "Today" totals whatever NWS still publishes for the
  // date, which may include earlier hours.
  const resortToday = dateFormatter(timeZone).format(nowMs);
  const hoursLeftToday = 24 - localHour(timeZone, nowMs) - 1;
  const totals = totalsByLocalDay(snowfall.values, timeZone);
  const dailyInches = days.map((date) => {
    if (date < resortToday) return null;
    const day = totals.get(date);
    const needed = date === resortToday ? hoursLeftToday : FULL_DAY_HOURS;
    return day && day.hours >= needed ? day.mm / MM_PER_INCH : null;
  });
  const daily = dailyInches.map((value) => (value === null ? null : round1(value)));
  const firstOpenDay = days.findIndex((date) => date >= resortToday);
  if (firstOpenDay === -1 || daily[firstOpenDay] === null) throw new Error("no forecast for today");

  return {
    name: resort.name,
    region: resort.region,
    elevationM: Math.round(elevationM),
    daily,
    // Total the unrounded days so rounding can't push it across a threshold.
    next3: round1(dailyInches.reduce((total, value) => total + (value ?? 0), 0)),
  };
}

async function main() {
  console.log("❄️  TurnLab Snow Scanner starting (National Weather Service)...\n");

  const nowMs = Date.now();
  const today = dateFormatter(TIME_ZONE).format(nowMs);
  const days = Array.from({ length: FORECAST_DAYS }, (_, index) => addDays(today, index));

  const resorts = [];
  const problems = [];
  for (const resort of RESORTS) {
    try {
      const result = await fetchResort(resort, days, nowMs);
      resorts.push(result);
      const daily = result.daily.map((value) => value ?? "–").join(" / ");
      console.log(`📊 ${resort.name}: ${daily} in. · next 3 days ${result.next3}" (grid ${result.elevationM} m)`);
    } catch (error) {
      problems.push(`${resort.name} (${error.message})`);
    }
  }

  // All or nothing: a partial batch would silently drop resorts from the site.
  if (problems.length > 0) {
    warnSourceDown("Snow forecast", `bad data for ${problems.join("; ")}; snow.json left unchanged`);
    return;
  }

  const output = {
    updated: new Date(nowMs).toISOString(),
    source: "National Weather Service gridded forecast (api.weather.gov)",
    timeZone: TIME_ZONE,
    days,
    resorts,
  };
  // Write then rename, so a crash can't leave a truncated file to break the build.
  const tempPath = `${SNOW_PATH}.tmp`;
  fs.writeFileSync(tempPath, `${JSON.stringify(output, null, 2)}\n`);
  fs.renameSync(tempPath, SNOW_PATH);
  console.log(`\n✅ Wrote ${resorts.length} resorts to ${SNOW_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
