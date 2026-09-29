import Link from "next/link";
import { newsItems } from "@/lib/news";

const HEADLINE_COUNT = 4;

export default function LatestSkiNews() {
  const headlines = newsItems.slice(0, HEADLINE_COUNT);

  if (headlines.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="latest-ski-news-heading" className="py-8 md:py-12">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b5f39]">Around the mountains</p>
          <h2 id="latest-ski-news-heading" className="mt-3 text-3xl font-black tracking-tight text-[#201d1a]">
            Latest ski news
          </h2>
        </div>
        <Link
          href="/news"
          className="text-sm font-semibold text-[#8b5f39] underline-offset-4 hover:underline"
        >
          All ski news →
        </Link>
      </div>

      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {headlines.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener"
              className="block h-full rounded-3xl border border-[#ece3db] bg-white p-5 shadow-[0_12px_30px_rgba(92,68,43,0.05)] transition-colors hover:border-[#d8b08b]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b5f39]">{item.source}</p>
              <p className="mt-2 font-bold leading-snug text-[#201d1a]">{item.title}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
