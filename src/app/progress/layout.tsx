import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const PROGRESS_TITLE = "Track Your Ski & Snowboard Progress";
const PROGRESS_DESCRIPTION =
  "Track practiced and saved ski or snowboard techniques, monitor your learning streak, and keep your progression organized on one page.";

export const metadata: Metadata = buildPageMetadata({
  title: PROGRESS_TITLE,
  description: PROGRESS_DESCRIPTION,
  path: "/progress",
  keywords: ["track ski progress", "snowboard practice tracker", "ski technique progress", "ski learning tracker"],
});

const progressSchema = [
  buildWebPageSchema({
    name: PROGRESS_TITLE,
    description: PROGRESS_DESCRIPTION,
    path: "/progress",
  }),
  buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Progress", path: "/progress" },
  ]),
];

export default function ProgressLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(progressSchema) }} />
      {children}
    </>
  );
}
