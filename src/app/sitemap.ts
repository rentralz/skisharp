import type { MetadataRoute } from "next";
import { techniques } from "@/data/techniques";

const BASE_URL = "https://skisharp.vercel.app";
const LAST_UPDATED = "2026-03-22";

export default function sitemap(): MetadataRoute.Sitemap {
  const techniqueUrls: MetadataRoute.Sitemap = techniques.map((t) => ({
    url: `${BASE_URL}/techniques/${t.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/techniques`,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/slope-ratings`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/snow-conditions`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/clothing-guide`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...techniqueUrls,
  ];
}
