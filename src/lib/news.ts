import newsData from "@/data/news.json";

export interface NewsItem {
  title: string;
  url: string;
  source: string;
  published: string; // ISO timestamp
}

export interface NewsDay {
  label: string;
  items: NewsItem[];
}

// Pages are built on Vercel in UTC; group and label dates in Mountain time so
// an evening story doesn't land on "tomorrow" for most readers.
const NEWS_TIME_ZONE = "America/Denver";

export const newsLastScanned: string = newsData.lastScanned;
export const newsItems: NewsItem[] = newsData.items;
export const newsSources: string[] = Object.keys(newsData.sourceStats);

export function formatNewsDate(iso: string, options: Intl.DateTimeFormatOptions) {
  return new Date(iso).toLocaleDateString("en-US", { timeZone: NEWS_TIME_ZONE, ...options });
}

export function groupNewsByDay(items: NewsItem[]): NewsDay[] {
  const days: NewsDay[] = [];

  for (const item of items) {
    const label = formatNewsDate(item.published, { weekday: "long", month: "long", day: "numeric" });
    const current = days[days.length - 1];
    if (current && current.label === label) {
      current.items.push(item);
    } else {
      days.push({ label, items: [item] });
    }
  }

  return days;
}
