export const DISCIPLINES = {
  ski: {
    label: "Ski",
    pluralLabel: "Skiing",
    libraryHref: "/techniques?discipline=ski",
    ctaLabel: "Browse ski techniques",
  },
  snowboard: {
    label: "Snowboard",
    pluralLabel: "Snowboarding",
    libraryHref: "/techniques?discipline=snowboard",
    ctaLabel: "Browse snowboard techniques",
  },
} as const;

export type Discipline = keyof typeof DISCIPLINES;

export const DEFAULT_DISCIPLINE: Discipline = "ski";

export function isDiscipline(value: string | null | undefined): value is Discipline {
  return value === "ski" || value === "snowboard";
}
