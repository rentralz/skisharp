"use client";

import DisciplineToggle from "@/components/DisciplineToggle";

export default function HomeHeroDisciplineSwitch() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <DisciplineToggle />
      <p className="text-sm leading-6 text-[#6c6259]">
        Choose <span className="font-semibold text-[#201d1a]">Ski</span> or{" "}
        <span className="font-semibold text-[#201d1a]">Snowboard</span> to tailor the learning
        paths and techniques below.
      </p>
    </div>
  );
}
