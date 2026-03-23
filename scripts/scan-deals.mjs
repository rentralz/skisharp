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

// Categories for classification
const CATEGORIES = {
  jackets: ["jacket", "shell", "parka", "coat"],
  pants: ["pant", "bib", "trouser"],
  baselayers: ["base layer", "baselayer", "thermal", "merino underwear"],
  gloves: ["glove", "mitten", "mitt"],
  goggles: ["goggle", "lens"],
  helmets: ["helmet"],
  socks: ["sock", "merino sock"],
  accessories: ["gaiter", "balaclava", "beanie", "neck warmer", "hand warmer"],
  skis: ["ski ", "skis"],
  boots: ["ski boot", "boot"],
  bindings: ["binding"],
  poles: ["pole"],
  packs: ["backpack", "pack", "bag"],
  passes: ["pass", "epic", "ikon", "lift ticket", "season pass"],
};

function classifyDeal(title) {
  const lower = title.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some((kw) => lower.includes(kw))) return cat;
  }
  return "other";
}

function deduplicateDeals(deals) {
  const seen = new Set();
  return deals.filter((d) => {
    const key = d.title.toLowerCase().slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ─── Reddit Scanner ──────────────────────────────────────
async function scanReddit() {
  const subreddits = [
    "skiingdeals",
    "skiing",
    "skigear",
  ];
  const deals = [];

  for (const sub of subreddits) {
    try {
      const url = `https://www.reddit.com/r/${sub}/search.json?q=deal+OR+sale+OR+discount+OR+clearance+OR+percent+off&sort=new&t=week&limit=25`;
      const res = await fetch(url, {
        headers: { "User-Agent": "TurnLab-DealScanner/1.0" },
      });
      if (!res.ok) continue;
      const data = await res.json();

      for (const post of data?.data?.children || []) {
        const d = post.data;
        if (d.score < 2) continue; // Skip low-quality

        deals.push({
          title: d.title,
          url: d.url?.startsWith("http") ? d.url : `https://reddit.com${d.permalink}`,
          source: `r/${sub}`,
          sourceIcon: "🔴",
          score: d.score,
          comments: d.num_comments,
          posted: new Date(d.created_utc * 1000).toISOString(),
          category: classifyDeal(d.title),
          thumbnail: d.thumbnail?.startsWith("http") ? d.thumbnail : null,
        });
      }
    } catch (e) {
      console.error(`Reddit r/${sub} error:`, e.message);
    }
  }

  return deals;
}

// ─── SlickDeals Scanner ──────────────────────────────────
async function scanSlickDeals() {
  const deals = [];
  const queries = ["ski", "skiing", "snowboard", "snow gear", "ski jacket", "ski goggles"];

  for (const query of queries) {
    try {
      const url = `https://slickdeals.net/newsearch.php?searcharea=deals&searchin=first&q=${encodeURIComponent(query)}&sort=newest`;
      const res = await fetch(url, {
        headers: { "User-Agent": "TurnLab-DealScanner/1.0" },
      });
      if (!res.ok) continue;
      const html = await res.text();

      // Extract deal titles and links from search results
      const dealRegex = /<a[^>]*class="[^"]*dealTitle[^"]*"[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g;
      let match;
      while ((match = dealRegex.exec(html)) !== null) {
        const dealUrl = match[1].startsWith("http") ? match[1] : `https://slickdeals.net${match[1]}`;
        deals.push({
          title: match[2].trim(),
          url: dealUrl,
          source: "SlickDeals",
          sourceIcon: "💰",
          category: classifyDeal(match[2]),
          posted: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.error(`SlickDeals error:`, e.message);
    }
  }

  return deals;
}

// ─── RSS/Atom Feed Scanner ──────────────────────────────
async function scanRSSFeeds() {
  const feeds = [
    {
      url: "https://www.evo.com/shop/sale/skiing.rss",
      source: "Evo",
      sourceIcon: "🏔️",
    },
    {
      url: "https://www.rei.com/rss/deals",
      source: "REI",
      sourceIcon: "🏕️",
    },
  ];
  const deals = [];

  for (const feed of feeds) {
    try {
      const res = await fetch(feed.url, {
        headers: { "User-Agent": "TurnLab-DealScanner/1.0" },
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) continue;
      const text = await res.text();

      // Simple XML parsing for RSS items
      const itemRegex = /<item>[\s\S]*?<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>[\s\S]*?<link>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/link>[\s\S]*?<\/item>/g;
      let match;
      while ((match = itemRegex.exec(text)) !== null) {
        const title = match[1].trim();
        if (!title.toLowerCase().match(/ski|snow|winter|goggle|helmet|glove|jacket|pant|boot/)) continue;
        deals.push({
          title,
          url: match[2].trim(),
          source: feed.source,
          sourceIcon: feed.sourceIcon,
          category: classifyDeal(title),
          posted: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.error(`RSS ${feed.source} error:`, e.message);
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

  return searches.map((s) => ({
    title: `🔍 ${s.title}`,
    url: `https://www.amazon.com/s?k=${s.query}&tag=${AFFILIATE_TAG}`,
    source: "Amazon",
    sourceIcon: "📦",
    category: s.category,
    posted: new Date().toISOString(),
    isAmazonSearch: true,
  }));
}

// ─── Main ────────────────────────────────────────────────
async function main() {
  console.log("🔍 TurnLab Deal Scanner starting...\n");

  // Load existing deals for merge
  let existing = [];
  try {
    existing = JSON.parse(fs.readFileSync(DEALS_PATH, "utf8")).deals || [];
  } catch {}

  // Scan all sources in parallel
  const [redditDeals, slickDeals, rssDeals] = await Promise.all([
    scanReddit(),
    scanSlickDeals(),
    scanRSSFeeds(),
  ]);

  const amazonDeals = getAmazonDeals();

  console.log(`📊 Reddit: ${redditDeals.length} deals`);
  console.log(`📊 SlickDeals: ${slickDeals.length} deals`);
  console.log(`📊 RSS Feeds: ${rssDeals.length} deals`);
  console.log(`📊 Amazon Searches: ${amazonDeals.length} curated`);

  // Merge, deduplicate, sort by date
  const allDeals = deduplicateDeals([
    ...redditDeals,
    ...slickDeals,
    ...rssDeals,
    ...amazonDeals,
  ]);

  // Keep last 7 days of deals + always keep Amazon searches
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const freshDeals = allDeals.filter(
    (d) => d.isAmazonSearch || d.posted > weekAgo
  );

  // Sort: highest score first for Reddit, then by date
  freshDeals.sort((a, b) => {
    if (a.isAmazonSearch && !b.isAmazonSearch) return 1;
    if (!a.isAmazonSearch && b.isAmazonSearch) return -1;
    if (a.score && b.score) return b.score - a.score;
    return new Date(b.posted).getTime() - new Date(a.posted).getTime();
  });

  const output = {
    lastScanned: new Date().toISOString(),
    totalDeals: freshDeals.length,
    deals: freshDeals,
  };

  fs.writeFileSync(DEALS_PATH, JSON.stringify(output, null, 2));
  console.log(`\n✅ Wrote ${freshDeals.length} deals to ${DEALS_PATH}`);
}

main().catch(console.error);
