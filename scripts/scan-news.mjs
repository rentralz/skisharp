#!/usr/bin/env node
/**
 * TurnLab Ski News Scanner
 * Pulls headlines from ski publishers' public RSS feeds and writes
 * src/data/news.json. The site shows headline, source and date, and links out
 * to the publisher; it never republishes article text.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchText, parseRssItems, warnSourceDown } from "./lib/feeds.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NEWS_PATH = path.join(__dirname, "..", "src", "data", "news.json");
const USER_AGENT = "TurnLab-NewsScanner/1.0 (+https://turnlab.co/news)";

// mixedTopics: the feed also covers hiking, wildfires, rescues etc., so its
// items go through the ski relevance filter. Ski-only publications don't:
// their headlines often skip the word "ski" ("Indy Pass adds partners").
const SOURCES = [
  { name: "POWDER", url: "https://www.powder.com/feed", mixedTopics: false },
  { name: "SKI Magazine", url: "https://www.skimag.com/feed/", mixedTopics: false },
  { name: "SnowBrains", url: "https://snowbrains.com/feed/", mixedTopics: true },
  { name: "Unofficial Networks", url: "https://unofficialnetworks.com/feed/", mixedTopics: true },
  { name: "Storm Skiing Journal", url: "https://www.stormskiing.com/feed", mixedTopics: false },
];

const MAX_AGE_DAYS = 21;
const MAX_PER_SOURCE = 15; // Unofficial Networks alone posts ~50 a day
const MAX_ITEMS = 60;

// For mixed-topic feeds: a clear ski/ride term keeps an item; a weaker snow
// term keeps it only if nothing points elsewhere.
const STRONG_SKI = /\b(ski|skis|skiing|skier|skiers|snowboard\w*|chairlifts?|gondolas?|epic pass|ikon pass|indy pass|lift tickets?|slopes?)\b/i;
const WEAK_SKI = /\b(snow\w*|powder|avalanche\w*|resorts?|lifts?|backcountry|winter)\b/i;
const OFF_TOPIC = /\b(hik(e|er|ers|ing)|surf\w*|climb(er|ers|ing)?|mountaineer\w*|fishing|golf|mountain bik\w*|property|real estate)\b/i;

function isSkiStory(item) {
  const text = `${item.title} ${item.categories.join(" ")}`;
  if (STRONG_SKI.test(text)) return true;
  return WEAK_SKI.test(text) && !OFF_TOPIC.test(text);
}

async function scanSource(source, cutoff) {
  const xml = await fetchText(source.url, USER_AGENT);
  return parseRssItems(xml)
    .filter((item) => /^https?:\/\//.test(item.link) && (!source.mixedTopics || isSkiStory(item)))
    .map((item) => ({ ...item, date: new Date(item.pubDate) }))
    // A malformed pubDate drops that one item instead of failing the source.
    .filter((item) => !Number.isNaN(item.date.getTime()) && item.date >= cutoff)
    .map((item) => ({
      title: item.title,
      url: item.link,
      source: source.name,
      published: item.date.toISOString(),
    }))
    .sort((a, b) => b.published.localeCompare(a.published))
    .slice(0, MAX_PER_SOURCE);
}

async function main() {
  console.log("📰 TurnLab News Scanner starting...\n");
  const cutoff = new Date(Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000);
  const sourceStats = {};
  const collected = [];

  const results = await Promise.allSettled(SOURCES.map((source) => scanSource(source, cutoff)));
  results.forEach((result, index) => {
    const { name } = SOURCES[index];
    if (result.status === "fulfilled") {
      sourceStats[name] = result.value.length;
      collected.push(...result.value);
      console.log(`📊 ${name}: ${result.value.length} stories`);
    } else {
      sourceStats[name] = 0;
      warnSourceDown(name, `feed request failed (${result.reason?.message ?? result.reason})`);
    }
  });

  const seen = new Set();
  const items = collected
    .filter((item) => (seen.has(item.url) ? false : seen.add(item.url)))
    .sort((a, b) => b.published.localeCompare(a.published))
    .slice(0, MAX_ITEMS);

  if (items.length === 0) {
    // Keep the last good file rather than blanking the page.
    warnSourceDown("Ski news", "no stories from any feed; news.json left unchanged");
    return;
  }

  const output = { lastScanned: new Date().toISOString(), sourceStats, items };
  fs.writeFileSync(NEWS_PATH, `${JSON.stringify(output, null, 2)}\n`);
  console.log(`\n✅ Wrote ${items.length} stories to ${NEWS_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
