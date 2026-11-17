"use client";

import { useId, useMemo, useState } from "react";
import {
  ABILITY_LABELS,
  BOARD_STYLE_LABELS,
  SKI_STYLE_LABELS,
  feetInchesToCm,
  lbToKg,
  recommendBoardLength,
  recommendBoardWidth,
  recommendSkiLength,
  type Ability,
  type BoardStyle,
  type BootSizing,
  type SizeRecommendation,
  type SizeResult,
  type SkiStyle,
  type WidthRecommendation,
} from "@/lib/sizing";

type Mode = "ski" | "snowboard";
type Units = "imperial" | "metric";

const HEIGHT_CM = { min: 90, max: 230 };
const WEIGHT_KG = { min: 15, max: 200 };
const BOOT_SIZE = { min: 3, max: 17 };

const ABILITY_HINTS: Record<Mode, Record<Ability, string>> = {
  ski: {
    beginner: "New to skiing, or still on green runs and wedge turns.",
    intermediate: "Comfortable on blues, linking turns with skis mostly parallel.",
    advanced: "Confident on blacks, in bumps and in variable snow.",
    expert: "Skis anything, fast and aggressive.",
  },
  snowboard: {
    beginner: "First days, or still learning to link turns on greens.",
    intermediate: "Linking turns on blues and controlling your speed.",
    advanced: "Confident on blacks, off the groomers or in the park.",
    expert: "Rides anything, fast and with confidence.",
  },
};

const SKI_STYLE_HINTS: Record<SkiStyle, string> = {
  groomers: "Mostly groomed runs and carving.",
  "all-mountain": "A bit of everything. The usual first ski.",
  powder: "Deep snow, trees and off-piste.",
  park: "Jumps, rails and skiing switch.",
};

const BOARD_STYLE_HINTS: Record<BoardStyle, string> = {
  park: "Jumps, rails and butters.",
  "all-mountain": "Groomers, side hits and some powder. The usual first board.",
  freeride: "Powder, trees and steeps.",
};

function parseNumber(value: string) {
  if (value.trim() === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function inBounds(value: number | null, bounds: { min: number; max: number }) {
  return value !== null && value >= bounds.min && value <= bounds.max;
}

function formatCm(cm: number) {
  return cm > 0 ? `+${cm} cm` : `−${Math.abs(cm)} cm`;
}

const inputClass =
  "w-full rounded-xl border border-[#d9c6b5] bg-white px-3 py-2.5 text-base text-[#201d1a] focus:outline-none focus:ring-2 focus:ring-[#b35816]";

function OptionCards<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: { id: T; label: string; hint: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-[#201d1a]">{legend}</legend>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = option.id === value;
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer gap-3 rounded-2xl border border-[#eadfd6] p-3 transition-colors focus-within:ring-2 focus-within:ring-[#b35816] ${
                selected ? "bg-[#fff3e7] ring-2 ring-[#b35816]" : "bg-white hover:bg-[#fcfaf8]"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={selected}
                onChange={() => onChange(option.id)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                  selected ? "border-[#b35816] bg-[#b35816] text-white" : "border-[#d9c6b5] text-transparent"
                }`}
              >
                ✓
              </span>
              <span>
                <span className="block text-sm font-semibold text-[#201d1a]">{option.label}</span>
                <span className="mt-0.5 block text-xs leading-5 text-[#6b635b]">{option.hint}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function SegmentedToggle<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full border border-[#d9c6b5] bg-white p-1">
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b35816] ${
              active ? "bg-[#1f1b18] text-white" : "text-[#6b625b] hover:bg-[#f5efe9] hover:text-[#1f1b18]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function KidsResult({ mode, notes }: { mode: Mode; notes: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b5f39]">Sizing a child?</p>
      <p className="mt-3 text-lg font-semibold text-[#201d1a]">
        Kids&apos; {mode === "ski" ? "skis" : "boards"} follow a simpler rule than adult charts.
      </p>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-[#6b635b]">
        {notes.map((note) => (
          <li key={note} className="flex gap-2">
            <span aria-hidden="true" className="text-[#b35816]">
              →
            </span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Result({
  mode,
  recommendation,
  width,
}: {
  mode: Mode;
  recommendation: SizeRecommendation;
  width: WidthRecommendation | null;
}) {
  const noun = mode === "ski" ? "ski" : "board";
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b5f39]">Your {noun} length</p>
      <p className="mt-2 text-5xl font-black tracking-tight text-[#201d1a]">
        {recommendation.min}–{recommendation.max}
        <span className="ml-1 text-2xl font-bold">cm</span>
      </p>
      <p className="mt-1 text-sm text-[#6b635b]">
        Aim for about <strong className="text-[#201d1a]">{recommendation.target} cm</strong>; anywhere in the range
        works.
      </p>

      <h3 className="mt-6 text-sm font-semibold text-[#201d1a]">How we got there</h3>
      <ul className="mt-2 divide-y divide-[#eadfd6] dark:divide-white/10 rounded-2xl border border-[#eadfd6] bg-[#fcfaf8] text-sm">
        <li className="flex justify-between gap-3 px-4 py-2.5">
          <span className="text-[#6b635b]">{recommendation.base.label}</span>
          <span className="font-semibold text-[#201d1a]">{recommendation.base.cm} cm</span>
        </li>
        {recommendation.adjustments.map((step) => (
          <li key={step.label} className="flex justify-between gap-3 px-4 py-2.5">
            <span className="text-[#6b635b]">{step.label}</span>
            <span className="font-semibold text-[#201d1a]">{formatCm(step.cm)}</span>
          </li>
        ))}
        <li className="flex justify-between gap-3 px-4 py-2.5">
          <span className="font-semibold text-[#201d1a]">Target</span>
          <span className="font-bold text-[#201d1a]">{recommendation.target} cm</span>
        </li>
      </ul>

      {width && (
        <div className="mt-6 rounded-2xl border border-[#eadfd6] bg-white p-4">
          <h3 className="text-sm font-semibold text-[#201d1a]">Board width: {width.label}</h3>
          <p className="mt-1 text-sm leading-6 text-[#6b635b]">
            Look for a waist width of <strong className="text-[#201d1a]">{width.waist}</strong> (men&apos;s US{" "}
            {width.mensSize}). Your boots should hang 1–2 cm over each edge, no more, or toes and heels drag in turns.
          </p>
        </div>
      )}

      <ul className="mt-6 space-y-2 text-sm leading-6 text-[#6b635b]">
        {recommendation.notes.map((note) => (
          <li key={note} className="flex gap-2">
            <span aria-hidden="true" className="text-[#b35816]">
              →
            </span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SizeCalculator({ mode }: { mode: Mode }) {
  const id = useId();
  const [units, setUnits] = useState<Units>("imperial");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [heightCmInput, setHeightCmInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [ability, setAbility] = useState<Ability>("intermediate");
  const [skiStyle, setSkiStyle] = useState<SkiStyle>("all-mountain");
  const [boardStyle, setBoardStyle] = useState<BoardStyle>("all-mountain");
  const [bootInput, setBootInput] = useState("");
  const [bootSizing, setBootSizing] = useState<BootSizing>("mens");

  const heightCm = useMemo(() => {
    if (units === "metric") return parseNumber(heightCmInput);
    const ft = parseNumber(feet);
    if (ft === null) return null;
    return feetInchesToCm(ft, parseNumber(inches) ?? 0);
  }, [units, heightCmInput, feet, inches]);

  const weightKg = useMemo(() => {
    const value = parseNumber(weightInput);
    if (value === null) return null;
    return units === "metric" ? value : lbToKg(value);
  }, [units, weightInput]);

  const bootSize = parseNumber(bootInput);
  const heightOk = inBounds(heightCm, HEIGHT_CM);
  const weightOk = inBounds(weightKg, WEIGHT_KG);
  const bootOk = inBounds(bootSize, BOOT_SIZE);

  const recommendation = useMemo<SizeResult | null>(() => {
    if (!heightOk || heightCm === null) return null;
    if (mode === "ski") {
      return recommendSkiLength({ heightCm, weightKg: weightOk && weightKg !== null ? weightKg : undefined, ability, style: skiStyle });
    }
    if (!weightOk || weightKg === null) return null;
    return recommendBoardLength({ heightCm, weightKg, ability, style: boardStyle });
  }, [mode, heightOk, heightCm, weightOk, weightKg, ability, skiStyle, boardStyle]);

  const width = mode === "snowboard" && bootOk && bootSize !== null ? recommendBoardWidth(bootSize, bootSizing) : null;

  function switchUnits(next: Units) {
    if (next === units) return;
    // Carry the numbers across so switching units never wipes what was typed.
    if (heightCm !== null) {
      if (next === "metric") {
        setHeightCmInput(String(heightCm));
      } else {
        const totalInches = Math.round(heightCm / 2.54);
        setFeet(String(Math.floor(totalInches / 12)));
        setInches(String(totalInches % 12));
      }
    }
    if (weightKg !== null) {
      setWeightInput(String(Math.round(next === "metric" ? weightKg : weightKg / 0.45359237)));
    }
    setUnits(next);
  }

  const weightLabel = units === "metric" ? "kg" : "lb";
  const heightInvalid = heightCm !== null && !heightOk;
  const weightInvalid = weightKg !== null && !weightOk;
  const needs =
    mode === "ski"
      ? "Enter your height to see your ski length."
      : "Enter your height and weight to see your board length.";

  const abilityOptions = (Object.keys(ABILITY_LABELS) as Ability[]).map((key) => ({
    id: key,
    label: ABILITY_LABELS[key],
    hint: ABILITY_HINTS[mode][key],
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start">
      <form
        onSubmit={(event) => event.preventDefault()}
        className="space-y-6 rounded-[28px] border border-[#e6dccf] bg-white p-5 shadow-[0_18px_44px_rgba(92,68,43,0.07)] sm:p-7"
        aria-label={mode === "ski" ? "Ski size calculator" : "Snowboard size calculator"}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-[#201d1a]">Units</p>
          <SegmentedToggle
            label="Units"
            value={units}
            onChange={switchUnits}
            options={[
              { id: "imperial", label: "ft / lb" },
              { id: "metric", label: "cm / kg" },
            ]}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            {units === "imperial" ? (
              <fieldset>
                <legend className="text-sm font-semibold text-[#201d1a]">Height</legend>
                <div className="mt-2 flex gap-2">
                  <label className="flex-1">
                    <span className="sr-only">Feet</span>
                    <select value={feet} onChange={(event) => setFeet(event.target.value)} className={inputClass}>
                      <option value="">ft</option>
                      {[3, 4, 5, 6, 7].map((value) => (
                        <option key={value} value={value}>
                          {value} ft
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex-1">
                    <span className="sr-only">Inches</span>
                    <select value={inches} onChange={(event) => setInches(event.target.value)} className={inputClass}>
                      <option value="">in</option>
                      {Array.from({ length: 12 }, (_, value) => (
                        <option key={value} value={value}>
                          {value} in
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </fieldset>
            ) : (
              <label className="block">
                <span className="text-sm font-semibold text-[#201d1a]">Height (cm)</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={HEIGHT_CM.min}
                  max={HEIGHT_CM.max}
                  value={heightCmInput}
                  onChange={(event) => setHeightCmInput(event.target.value)}
                  aria-invalid={heightInvalid}
                  aria-describedby={heightInvalid ? `${id}-height-error` : undefined}
                  className={`mt-2 ${inputClass}`}
                />
              </label>
            )}
            {heightInvalid && (
              <p id={`${id}-height-error`} className="mt-1 text-xs text-[#b42318]">
                Enter a height between 3&apos;0&quot; and 7&apos;6&quot; (90–230 cm).
              </p>
            )}
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-[#201d1a]">
              Weight ({weightLabel}){mode === "ski" && <span className="font-normal text-[#6b635b]"> · optional</span>}
            </span>
            <input
              type="number"
              inputMode="numeric"
              value={weightInput}
              onChange={(event) => setWeightInput(event.target.value)}
              aria-invalid={weightInvalid}
              aria-describedby={`${id}-weight-help`}
              className={`mt-2 ${inputClass}`}
            />
            <span id={`${id}-weight-help`} className={`mt-1 block text-xs ${weightInvalid ? "text-[#b42318]" : "text-[#6b635b]"}`}>
              {weightInvalid
                ? `Enter a weight between ${units === "metric" ? "15 and 200 kg" : "33 and 440 lb"}.`
                : mode === "ski"
                  ? "Fine-tunes the length by about 2 cm."
                  : "Weight matters most for board length."}
            </span>
          </label>
        </div>

        <OptionCards
          legend="Your level"
          name={`${id}-ability`}
          options={abilityOptions}
          value={ability}
          onChange={setAbility}
        />

        {mode === "ski" ? (
          <OptionCards
            legend="Where you ski most"
            name={`${id}-ski-style`}
            options={(Object.keys(SKI_STYLE_LABELS) as SkiStyle[]).map((key) => ({
              id: key,
              label: SKI_STYLE_LABELS[key],
              hint: SKI_STYLE_HINTS[key],
            }))}
            value={skiStyle}
            onChange={setSkiStyle}
          />
        ) : (
          <>
            <OptionCards
              legend="How you ride"
              name={`${id}-board-style`}
              options={(Object.keys(BOARD_STYLE_LABELS) as BoardStyle[]).map((key) => ({
                id: key,
                label: BOARD_STYLE_LABELS[key],
                hint: BOARD_STYLE_HINTS[key],
              }))}
              value={boardStyle}
              onChange={setBoardStyle}
            />
            <div className="grid gap-4 sm:grid-cols-2 sm:items-end">
              <label className="block">
                <span className="text-sm font-semibold text-[#201d1a]">
                  Boot size (US)<span className="font-normal text-[#6b635b]"> · for board width</span>
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.5"
                  min={BOOT_SIZE.min}
                  max={BOOT_SIZE.max}
                  value={bootInput}
                  onChange={(event) => setBootInput(event.target.value)}
                  className={`mt-2 ${inputClass}`}
                />
              </label>
              <SegmentedToggle
                label="Boot sizing"
                value={bootSizing}
                onChange={setBootSizing}
                options={[
                  { id: "mens", label: "Men's" },
                  { id: "womens", label: "Women's" },
                ]}
              />
            </div>
          </>
        )}
      </form>

      <section
        aria-live="polite"
        aria-label="Your recommendation"
        className="rounded-[28px] border border-[#e6dccf] bg-[#fcfaf8] p-5 sm:p-7 lg:sticky lg:top-24"
      >
        <h2 className="sr-only">Your recommendation</h2>
        {recommendation?.kind === "kids" ? (
          <KidsResult mode={mode} notes={recommendation.notes} />
        ) : recommendation ? (
          <Result mode={mode} recommendation={recommendation} width={width} />
        ) : (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b5f39]">Your recommendation</p>
            <p className="mt-3 text-lg font-semibold text-[#201d1a]">{needs}</p>
            <p className="mt-2 text-sm leading-6 text-[#6b635b]">
              You&apos;ll get a length range, the reasoning behind it
              {mode === "snowboard" ? ", and a board width if you add your boot size" : ""}.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
