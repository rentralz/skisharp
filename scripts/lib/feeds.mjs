// Shared helpers for the daily feed scanners (deals and ski news).

export async function fetchText(url, userAgent) {
  const res = await fetch(url, {
    headers: { "User-Agent": userAgent },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return res.text();
}

// String.fromCodePoint throws on out-of-range values; a malformed entity in one
// feed title must not abort a whole scan, so invalid ones are left as-is.
function decodeCodePoint(entity, codePoint) {
  const valid = codePoint <= 0x10ffff && (codePoint < 0xd800 || codePoint > 0xdfff);
  return valid ? String.fromCodePoint(codePoint) : entity;
}

export function decodeHtml(text) {
  return text
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#x([0-9a-f]+);/gi, (entity, hex) => decodeCodePoint(entity, parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (entity, dec) => decodeCodePoint(entity, Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function normalizeWhitespace(text) {
  return text.replace(/\s+/g, " ").trim();
}

function readTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`));
  return match ? normalizeWhitespace(decodeHtml(match[1])) : "";
}

// RSS 2.0 items. Items missing a title, link or pubDate are skipped.
export function parseRssItems(xml) {
  const items = [];

  for (const [, block] of xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/g)) {
    const title = readTag(block, "title");
    const link = readTag(block, "link");
    const pubDate = readTag(block, "pubDate");
    if (!title || !link || !pubDate) continue;

    const categories = [...block.matchAll(/<category\b[^>]*>([\s\S]*?)<\/category>/g)].map((m) =>
      normalizeWhitespace(decodeHtml(m[1])),
    );
    items.push({ title, link, pubDate, categories });
  }

  return items;
}

// Make a dead source visible: a GitHub Actions warning annotation shows on the
// run page (the workflow otherwise stays green while a source returns nothing).
export function warnSourceDown(source, reason) {
  const message = `${source} returned nothing: ${reason}.`;
  if (process.env.GITHUB_ACTIONS === "true") {
    console.log(`::warning title=${source} source down::${message}`);
  } else {
    console.warn(`⚠️  ${message}`);
  }
}
