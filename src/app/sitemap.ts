import type { MetadataRoute } from "next";
import dealsData from "@/data/deals.json";
import { techniques } from "@/data/techniques";
import { maxSeoDate, parseSeoDate } from "@/lib/seo";

const BASE_URL = "https://turnlab.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestTechniqueUpdate = maxSeoDate(...techniques.map((technique) => parseSeoDate(technique.updatedAt)));
  const latestDealsUpdate = parseSeoDate(dealsData.lastScanned);
  const latestSiteUpdate = maxSeoDate(latestTechniqueUpdate, latestDealsUpdate) ?? new Date();

  const techniqueUrls: MetadataRoute.Sitemap = techniques.map((t) => ({
    url: `${BASE_URL}/techniques/${t.slug}`,
    lastModified: parseSeoDate(t.updatedAt) ?? latestTechniqueUpdate ?? latestSiteUpdate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: latestSiteUpdate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/techniques`,
      lastModified: latestTechniqueUpdate ?? latestSiteUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/slope-ratings`,
      lastModified: latestTechniqueUpdate ?? latestSiteUpdate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/snow-conditions`,
      lastModified: latestTechniqueUpdate ?? latestSiteUpdate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/clothing-guide`,
      lastModified: latestSiteUpdate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/quiz`,
      lastModified: latestTechniqueUpdate ?? latestSiteUpdate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/conditions-match`,
      lastModified: latestTechniqueUpdate ?? latestSiteUpdate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/progress`,
      lastModified: latestTechniqueUpdate ?? latestSiteUpdate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: latestSiteUpdate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/deals`,
      lastModified: latestDealsUpdate ?? latestSiteUpdate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/budget-gear`,
      lastModified: latestSiteUpdate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/equipment-guide`,
      lastModified: latestSiteUpdate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/resorts`,
      lastModified: latestSiteUpdate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...techniqueUrls,
  ];
}
