import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const QUIZ_TITLE = "Ski & Snowboard Skill Quiz";
const QUIZ_DESCRIPTION =
  "Take a quick ski or snowboard skill quiz to estimate your level and get technique recommendations tailored to what you should practice next.";

export const metadata: Metadata = buildPageMetadata({
  title: QUIZ_TITLE,
  description: QUIZ_DESCRIPTION,
  path: "/quiz",
  keywords: ["ski skill quiz", "snowboard skill quiz", "what ski level am i", "ski technique recommendations"],
});

const quizSchema = [
  buildWebPageSchema({
    name: QUIZ_TITLE,
    description: QUIZ_DESCRIPTION,
    path: "/quiz",
  }),
  buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Quiz", path: "/quiz" },
  ]),
];

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }} />
      {children}
    </>
  );
}
