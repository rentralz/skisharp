#!/usr/bin/env node
/**
 * TurnLab Snow Report Scanner
 * Fetches modeled daily snowfall (7 past days, today, 3 forecast days) for a
 * set of well-known resorts from Open-Meteo (free, no API key) and writes
 * src/data/snow.json for the homepage "Today on the mountain" band.
 *
 * These are weather-model estimates at mid-mountain elevation, not the
 * resorts' official snow reports; the site labels them that way.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { warnSourceDown } from "./lib/feeds.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SNOW_PATH = path.join(__dirname, "..", "src", "data", "snow.json");
const USER_AGENT = "TurnLab-SnowScanner/1.0 (+https://turnlab.co)";

const PAST_DAYS = 7;
const FORECAST_DAYS = 4; // today + 3 days ahead
const TIME_ZONE = "America/Denver";

// Mid-mountain elevations: valley grid cells badly understate mountain snow.
const RESORTS = [
  { name: "Alta", region: "Utah", lat: 40.5884, lon: -111.6386, elevationM: 2900 },
  { name: "Park City", region: "Utah", lat: 40.6514, lon: -111.508, elevationM: 2560 },
  { name: "Vail", region: "Colorado", lat: 39.6061, lon: -106.355, elevationM: 3000 },
  { name: "Breckenridge", region: "Colorado", lat: 39.4805, lon: -106.0666, elevationM: 3400 },
  { name: "Jackson Hole", region: "Wyoming", lat: 43.5875, lon: -110.8279, elevationM: 2550 },
  { name: "Big Sky", region: "Montana", lat: 45.2857, lon: -111.4018, elevationM: 2700 },
  { name: "Palisades Tahoe", region: "California", lat: 39.197, lon: -120.2357, elevationM: 2300 },
  { name: "Mammoth Mountain", region: "California", lat: 37.6308, lon: -119.0326, elevationM: 2900 },
  { name: "Whistler Blackcomb", region: "British Columbia", lat: 50.115, lon: -122.9486, elevationM: 1500 },
  { name: "Killington", region: "Vermont", lat: 43.6045, lon: -72.8201, elevationM: 830 },
];

function round1(value) {
  return Math.round(value * 10) / 10;
}

function sum(values) {
  return round1(values.reduce((total, value) => total + (value ?? 0), 0));
}

async function fetchSnowfall() {
  const params = new URLSearchParams({
    latitude: RESORTS.map((r) => r.lat).join(","),
    longitude: RESORTS.map((r) => r.lon).join(","),
    elevation: RESORTS.map((r) => r.elevationM).join(","),
    daily: "snowfall_sum",
    past_days: String(PAST_DAYS),
    forecast_days: String(FORECAST_DAYS),
    timezone: TIME_ZONE,
    precipitation_unit: "inch",
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
    headers: { "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const body = await res.json();
  const locations = Array.isArray(body) ? body : [body];
  if (locations.length !== RESORTS.length) {
    throw new Error(`expected ${RESORTS.length} locations, got ${locations.length}`);
  }
  return locations;
}

async function main() {
  console.log("❄️  TurnLab Snow Scanner starting...\n");

  let locations;
  try {
    locations = await fetchSnowfall();
  } catch (error) {
    // Keep the last good file rather than blanking the band.
    warnSourceDown("Snow report", `Open-Meteo request failed (${error.message}); snow.json left unchanged`);
    return;
  }

  const days = locations[0]?.daily?.time ?? [];
  const expectedDays = PAST_DAYS + FORECAST_DAYS;
  const resorts = [];

  const problems = [];
  locations.forEach((location, index) => {
    const resort = RESORTS[index];
    const daily = location?.daily?.snowfall_sum;
    const sameDays = JSON.stringify(location?.daily?.time) === JSON.stringify(days);
    if (!Array.isArray(daily) || daily.length !== expectedDays || !sameDays) {
      problems.push(resort.name);
      return;
    }

    const values = daily.map((value) => (typeof value === "number" ? round1(value) : null));
    resorts.push({
      name: resort.name,
      region: resort.region,
      elevationM: resort.elevationM,
      daily: values,
      past7: sum(values.slice(0, PAST_DAYS)),
      next3: sum(values.slice(PAST_DAYS + 1)),
    });
    console.log(`📊 ${resort.name}: past 7 days ${resorts.at(-1).past7}" · next 3 days ${resorts.at(-1).next3}"`);
  });

  // All or nothing: a partial batch would silently drop resorts from the site.
  if (problems.length > 0 || days.length !== expectedDays) {
    const detail = problems.length > 0 ? `bad data for ${problems.join(", ")}` : "unexpected day count";
    warnSourceDown("Snow report", `${detail}; snow.json left unchanged`);
    return;
  }

  const output = {
    updated: new Date().toISOString(),
    source: "Open-Meteo weather model, estimated at mid-mountain elevation",
    timeZone: TIME_ZONE,
    days,
    todayIndex: PAST_DAYS,
    resorts,
  };
  fs.writeFileSync(SNOW_PATH, `${JSON.stringify(output, null, 2)}\n`);
  console.log(`\n✅ Wrote ${resorts.length} resorts to ${SNOW_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
