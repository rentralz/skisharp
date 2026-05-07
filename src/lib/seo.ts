import type { Metadata } from "next";

export const SITE_NAME = "TurnLab";
export const SITE_URL = "https://turnlab.co";
export const DEFAULT_OG_IMAGE = "/og-image.png";

export type BreadcrumbSchemaItem = {
  name: string;
  path: string;
};

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  socialTitle?: string;
  socialDescription?: string;
  type?: "website" | "article";
};

function normalizePath(path: string) {
  if (!path) {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function buildAbsoluteUrl(path: string) {
  return new URL(normalizePath(path), SITE_URL).toString();
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  socialTitle,
  socialDescription,
  type = "website",
}: BuildPageMetadataInput): Metadata {
  const canonicalPath = normalizePath(path);
  const resolvedSocialTitle = socialTitle ?? `${title} | ${SITE_NAME}`;
  const resolvedSocialDescription = socialDescription ?? description;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: resolvedSocialTitle,
      description: resolvedSocialDescription,
      url: buildAbsoluteUrl(canonicalPath),
      siteName: SITE_NAME,
      type,
      locale: "en_US",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: resolvedSocialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedSocialTitle,
      description: resolvedSocialDescription,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path),
    })),
  };
}

export function buildWebPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: buildAbsoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function parseSeoDate(value?: string | null) {
  if (!value) {
    return undefined;
  }

  const normalized = /^\d{4}-\d{2}$/.test(value) ? `${value}-01T00:00:00.000Z` : value;
  const parsed = new Date(normalized);

  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return parsed;
}

export function maxSeoDate(...values: Array<Date | undefined>) {
  return values
    .filter((value): value is Date => Boolean(value))
    .sort((a, b) => b.getTime() - a.getTime())[0];
}
