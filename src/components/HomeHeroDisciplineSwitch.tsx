"use client";

import DisciplineToggle from "@/components/DisciplineToggle";
import { DISCIPLINES } from "@/data/disciplines";
import { useDisciplinePreference } from "@/hooks/useDisciplinePreference";

export default function HomeHeroDisciplineSwitch() {
  const { discipline } = useDisciplinePreference();
  const activeDisciplineLabel = DISCIPLINES[discipline].label.toLowerCase();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <DisciplineToggle />
      <p className="text-sm leading-6 text-[#6c6259]">
        Showing <span className="font-semibold text-[#201d1a]">{activeDisciplineLabel}</span>
        {" "}
        learning paths and featured techniques below.
      </p>
    </div>
  );
}
