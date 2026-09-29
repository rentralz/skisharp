import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from "@/lib/seo";
import { formatNewsDate, groupNewsByDay, newsItems, newsLastScanned, newsSources } from "@/lib/news";

const NEWS_TITLE = "Ski News";
const NEWS_DESCRIPTION =
  "Today's ski and snowboard headlines: resort openings, snowfall, new lifts and industry news from POWDER, SKI Magazine, SnowBrains, Unofficial Networks and Storm Skiing Journal.";

export const metadata: Metadata = buildPageMetadata({
  title: NEWS_TITLE,
  description: NEWS_DESCRIPTION,
  path: "/news",
  keywords: ["ski news", "ski resort news", "snowboard news", "ski industry news", "ski season news"],
});

const newsSchema = [
  buildWebPageSchema({ name: NEWS_TITLE, description: NEWS_DESCRIPTION, path: "/news" }),
  buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: NEWS_TITLE, path: "/news" },
  ]),
];

export default function NewsPage() {
  const days = groupNewsByDay(newsItems);

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-inter)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }} />
      <Navbar />
      <Breadcrumbs crumbs={[{ label: NEWS_TITLE }]} />

      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-[#b35816] text-sm font-medium uppercase tracking-[0.2em] mb-4">Daily ski headlines</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Ski News</h1>
        <p className="text-gray-600 text-lg leading-8">
          Resort openings, snowfall, new lifts and industry stories from ski publishers, gathered
          every day. Each headline links to the original story on the publisher&apos;s site.
        </p>
        <p className="mt-3 text-sm text-gray-500">
          Updated{" "}
          <time dateTime={newsLastScanned}>
            {formatNewsDate(newsLastScanned, { month: "short", day: "numeric", year: "numeric" })}
          </time>{" "}
          · Sources: {newsSources.join(", ")}
        </p>

        <div className="mt-10 space-y-10">
          {days.map((day) => (
            <section key={day.label} aria-label={day.label}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 mb-2">{day.label}</h2>
              <ul className="divide-y divide-gray-200 border-y border-gray-200">
                {day.items.map((item) => (
                  <li key={item.url} className="py-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener"
                      className="text-lg font-semibold leading-snug text-gray-900 underline-offset-4 hover:text-[#b35816] hover:underline"
                    >
                      {item.title}
                    </a>
                    <p className="mt-1 text-sm text-gray-500">{item.source}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
