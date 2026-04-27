"use client";

import { DISCIPLINES, type Discipline } from "@/data/disciplines";
import { useDisciplinePreference } from "@/hooks/useDisciplinePreference";

interface Props {
  value?: Discipline;
  onChange?: (discipline: Discipline) => void;
  className?: string;
  compact?: boolean;
}

export default function DisciplineToggle({ value, onChange, className = "", compact = false }: Props) {
  const { discipline, setDiscipline } = useDisciplinePreference();
  const activeDiscipline = value ?? discipline;

  const handleChange = (nextDiscipline: Discipline) => {
    if (value === undefined) {
      setDiscipline(nextDiscipline);
    }
    onChange?.(nextDiscipline);
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border border-[#d9c6b5] bg-white/90 p-1 shadow-sm ${className}`.trim()}
      aria-label="Preferred discipline"
      role="group"
    >
      {(Object.keys(DISCIPLINES) as Discipline[]).map((disciplineKey) => {
        const active = disciplineKey === activeDiscipline;
        const label = DISCIPLINES[disciplineKey].label;

        return (
          <button
            key={disciplineKey}
            type="button"
            onClick={() => handleChange(disciplineKey)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
              compact ? "text-xs" : "text-sm"
            } ${
              active
                ? "bg-[#1f1b18] text-white"
                : "text-[#6b625b] hover:bg-[#f5efe9] hover:text-[#1f1b18]"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
