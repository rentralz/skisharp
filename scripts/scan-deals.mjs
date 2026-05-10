#!/usr/bin/env node
/**
 * TurnLab Ski Deals Scanner
 * Scans multiple sources for ski deals and writes to src/data/deals.json
 * Run: node scripts/scan-deals.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEALS_PATH = path.join(__dirname, "..", "src", "data", "deals.json");
const AFFILIATE_TAG = "turnlab-20";
const USER_AGENT = "TurnLab-DealScanner/1.1";

const REDDIT_SUBREDDITS = ["skiingdeals", "skigear", "skiing"];
const REDDIT_QUERY = 'deal OR discount OR clearance OR coupon OR markdown OR sale OR "% off" OR "off season"';
const SLICKDEALS_QUERIES = [
  "ski",
  "ski jacket",
  "ski goggles",
  "ski boots",
  "ski helmet",
  "ski gloves",
  "ski socks",
  "base layer",
];

// Categories for classification
const CATEGORY_RULES = [
  ["jackets", /\b(jacket|jkt|shell|parka|coat|outerwear)\b/i],
  ["pants", /\b(pant|pants|bib|bibs|overall|overalls|trouser)\b/i],
  ["baselayers", /\b(base layer|baselayer|thermal|quarter-zip|half-zip)\b/i],
  ["gloves", /\b(glove|gloves|mitten|mittens|mitt)\b/i],
  ["goggles", /\b(goggle|goggles|lens|lenses)\b/i],
  ["helmets", /\b(helmet|helmets)\b/i],
  ["socks", /\b(sock|socks)\b/i],
  ["accessories", /\b(gaiter|balaclava|beanie|neck warmer|hand warmer|waterproofing|mask)\b/i],
  ["boots", /\b(ski boot|ski boots|boot|boots)\b/i],
  ["bindings", /\b(binding|bindings)\b/i],
  ["poles", /\b(pole|poles)\b/i],
  ["packs", /\b(backpack|pack|bag)\b/i],
  ["passes", /\b(pass|epic|ikon|lift ticket|season pass)\b/i],
  ["skis", /\b(ski|skis)\b/i],
];

const SKI_CONTEXT_PATTERN = /\b(ski|skis|snow|goggle|goggles|helmet|helmets|balaclava|merino|base layer|baselayer|thermal|spyder|smartwool|arctix|waterproofing|lift ticket|pass|ikon|epic|snow gear|winter)\b/i;
const DEAL_PATTERN = /(\bdeal\b|\bdiscount\b|\bclearance\b|\bmarkdown\b|\bcoupon\b|\bpromo\b|\bsale\b|%\s*off|\bfrom\s*[$€£]|[$€£]\s?\d|\boff season\b|\bsave\b)/i;
const QUESTION_PATTERN = /(\?|\b(help|advice|review|sizing|length|best time|where to sell|looking for|anyone|what|when|how|should i|good for beginner|trying to figure out)\b)/i;
const NEGATIVE_PATTERN = /(harley|road king|motorcycle|windshield|shield\/screen|sales tax|air freshener|smart watch|graphic short sleeve|crusher tee|t-?rex|cleansing oil|dark ski scent|women's graphic tee|men's graphic tee|fleece jacket|\bgolf\b|stand bag|disc golf)/i;

function classifyDeal(title) {
  for (const [category, pattern] of CATEGORY_RULES) {
    if (pattern.test(title)) return category;
  }
  return "other";
}

function decodeHtml(text) {
  return text
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, " ").trim();
}

function canonicalizeTitle(title) {
  return normalizeWhitespace(
    decodeHtml(title)
      .replace(/^[$€£][^|]+\|\s*/i, "")
      .replace(/^\(size[^)]+\)\s*/i, "")
      .replace(/\s+\+\s+free shipping.*$/i, "")
      .replace(/\s+at\s+[A-Za-z0-9!.' -]+$/i, "")
      .replace(/\s*\([^)]*\)/g, "")
      .replace(/[^a-z0-9]+/gi, " ")
  ).toLowerCase();
}

function deduplicateDeals(deals) {
  const seen = new Set();
  return deals.filter((deal) => {
    const urlKey = deal.isAmazonSearch ? deal.url : deal.url.replace(/\?.*$/, "");
    const titleKey = canonicalizeTitle(deal.title);
    const key = deal.isAmazonSearch ? `${urlKey}::amazon` : titleKey || `${urlKey}::${deal.title.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function hasExplicitPriceSignal(text) {
  return /([$€£]\s?\d|\d+%\s*off|\bfrom\s*[$€£]|\bunder\s*[$€£])/i.test(text);
}

function isRelevantDeal(title, url = "") {
  const haystack = `${title} ${url}`;
  if (NEGATIVE_PATTERN.test(haystack)) return false;
  if (!SKI_CONTEXT_PATTERN.test(haystack)) return false;
  return DEAL_PATTERN.test(haystack) || hasExplicitPriceSignal(haystack);
}

function isLikelyDiscussionPost(title, url = "") {
  const looksLikeRedditThread = /reddit\.com\/r\//i.test(url) || /redd\.it\//i.test(url);
  if (!looksLikeRedditThread) return false;
  if (!hasExplicitPriceSignal(title) && !/(discount|clearance|coupon|promo|%\s*off|markdown)/i.test(title)) return true;
  return QUESTION_PATTERN.test(title) && !hasExplicitPriceSignal(title);
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res.text();
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res.json();
}

function parseRssItems(xml) {
  const itemRegex = /<item>[\s\S]*?<title>([\s\S]*?)<\/title>[\s\S]*?<link>([\s\S]*?)<\/link>[\s\S]*?<pubDate>([\s\S]*?)<\/pubDate>[\s\S]*?<\/item>/g;
  const items = [];
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    items.push({
      title: normalizeWhitespace(decodeHtml(match[1])),
      link: normalizeWhitespace(decodeHtml(match[2])),
      pubDate: normalizeWhitespace(decodeHtml(match[3])),
    });
  }

  return items;
}

// ─── Reddit Scanner ──────────────────────────────────────
async function scanReddit() {
  const deals = [];

  for (const sub of REDDIT_SUBREDDITS) {
    try {
      const url = `https://www.reddit.com/r/${sub}/search.json?restrict_sr=1&sort=new&t=month&limit=30&q=${encodeURIComponent(REDDIT_QUERY)}`;
      const data = await fetchJson(url);

      for (const post of data?.data?.children || []) {
        const d = post.data;
        const outboundUrl = d.url_overridden_by_dest || d.url || `https://reddit.com${d.permalink}`;
        if (d.score < 2) continue;
        if (!isRelevantDeal(d.title, outboundUrl)) continue;
        if (isLikelyDiscussionPost(d.title, outboundUrl)) continue;

        deals.push({
          title: d.title,
          url: outboundUrl.startsWith("http") ? outboundUrl : `https://reddit.com${d.permalink}`,
          source: `r/${sub}`,
          sourceIcon: "🔴",
          score: d.score,
          comments: d.num_comments,
          posted: new Date(d.created_utc * 1000).toISOString(),
          category: classifyDeal(d.title),
          thumbnail: d.thumbnail?.startsWith("http") ? d.thumbnail : null,
        });
      }
    } catch (error) {
      console.error(`Reddit r/${sub} error:`, error.message);
    }
  }

  return deals;
}

// ─── SlickDeals RSS Scanner ──────────────────────────────
async function scanSlickDeals() {
  const deals = [];

  for (const query of SLICKDEALS_QUERIES) {
    try {
      const url = `https://slickdeals.net/newsearch.php?searcharea=deals&searchin=first&sort=newest&rss=1&q=${encodeURIComponent(query)}`;
      const xml = await fetchText(url);
      const items = parseRssItems(xml);

      for (const item of items) {
        if (!isRelevantDeal(item.title, item.link)) continue;

        deals.push({
          title: item.title,
          url: item.link,
          source: "SlickDeals",
          sourceIcon: "💰",
          category: classifyDeal(item.title),
          posted: new Date(item.pubDate).toISOString(),
        });
      }
    } catch (error) {
      console.error(`SlickDeals query "${query}" error:`, error.message);
    }
  }

  return deals;
}

// ─── Curated Amazon Searches ─────────────────────────────
function getAmazonDeals() {
  const searches = [
    { query: "ski+jacket+deal", title: "Ski Jackets on Sale", category: "jackets" },
    { query: "ski+pants+clearance", title: "Ski Pants Clearance", category: "pants" },
    { query: "ski+goggles+deal", title: "Ski Goggles Deals", category: "goggles" },
    { query: "ski+helmet+deal", title: "Ski Helmet Deals", category: "helmets" },
    { query: "ski+gloves+deal", title: "Ski Gloves on Sale", category: "gloves" },
    { query: "merino+wool+ski+socks+deal", title: "Merino Ski Socks Deals", category: "socks" },
    { query: "ski+base+layer+deal", title: "Base Layer Deals", category: "baselayers" },
    { query: "ski+boot+sale", title: "Ski Boot Sales", category: "boots" },
    { query: "all+mountain+skis+sale", title: "All-Mountain Skis on Sale", category: "skis" },
  ];

  return searches.map((search) => ({
    title: `🔍 ${search.title}`,
    url: `https://www.amazon.com/s?k=${search.query}&tag=${AFFILIATE_TAG}`,
    source: "Amazon",
    sourceIcon: "📦",
    category: search.category,
    posted: new Date().toISOString(),
    isAmazonSearch: true,
  }));
}

function sortDeals(a, b) {
  if (a.isAmazonSearch && !b.isAmazonSearch) return 1;
  if (!a.isAmazonSearch && b.isAmazonSearch) return -1;

  if (typeof a.score === "number" && typeof b.score === "number" && a.score !== b.score) {
    return b.score - a.score;
  }

  return new Date(b.posted).getTime() - new Date(a.posted).getTime();
}

// ─── Main ────────────────────────────────────────────────
async function main() {
  console.log("🔍 TurnLab Deal Scanner starting...\n");

  const [redditDeals, slickDeals] = await Promise.all([
    scanReddit(),
    scanSlickDeals(),
  ]);
  const amazonDeals = getAmazonDeals();

  console.log(`📊 Reddit: ${redditDeals.length} deals`);
  console.log(`📊 SlickDeals: ${slickDeals.length} deals`);
  console.log(`📊 Amazon Searches: ${amazonDeals.length} curated`);

  const allDeals = deduplicateDeals([
    ...redditDeals,
    ...slickDeals,
    ...amazonDeals,
  ]).sort(sortDeals);

  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const freshDeals = allDeals.filter((deal) => deal.isAmazonSearch || new Date(deal.posted) > monthAgo);

  const output = {
    lastScanned: new Date().toISOString(),
    totalDeals: freshDeals.length,
    sourceStats: {
      reddit: redditDeals.length,
      slickdeals: slickDeals.length,
      amazon: amazonDeals.length,
    },
    deals: freshDeals,
  };

  fs.writeFileSync(DEALS_PATH, JSON.stringify(output, null, 2));
  console.log(`\n✅ Wrote ${freshDeals.length} deals to ${DEALS_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
