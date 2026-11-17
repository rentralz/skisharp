// Ski and snowboard length recommendations.
//
// The numbers come from published size charts, read 2026-11-17: evo and REI
// (ski length by height and ability), K2/Völkl (style and weight adjustments),
// Jones, evo, REI and K2 (snowboard length, led by weight), and REI/K2, evo and
// Jones (board waist width by boot size). The charts disagree by a few cm, so
// we sit in the middle of them and always show a range, never one number.
// Below the adult charts (kids) we give the kids' rule instead of a number.
// Pure functions only: the calculator, the static charts and the tests share them.

export type Ability = "beginner" | "intermediate" | "advanced" | "expert";
export type SkiStyle = "groomers" | "all-mountain" | "powder" | "park";
export type BoardStyle = "park" | "all-mountain" | "freeride";
export type BootSizing = "mens" | "womens";

export interface Adjustment {
  label: string;
  cm: number;
}

export interface SizeRecommendation {
  kind: "range";
  target: number;
  min: number;
  max: number;
  base: Adjustment; // where the calculation starts (your height, or the length for your weight)
  adjustments: Adjustment[]; // non-zero steps from base to target, in order
  notes: string[];
}

// Kids are below every adult chart; sizing them from adult offsets would
// hand a child a ski taller than they are.
export interface KidsGuidance {
  kind: "kids";
  notes: string[];
}

export type SizeResult = SizeRecommendation | KidsGuidance;

export interface WidthRecommendation {
  label: string;
  waist: string;
  mensSize: number;
}

export const ABILITY_LABELS: Record<Ability, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

export const SKI_STYLE_LABELS: Record<SkiStyle, string> = {
  groomers: "Groomers and carving",
  "all-mountain": "All-mountain",
  powder: "Powder and freeride",
  park: "Park and freestyle",
};

export const BOARD_STYLE_LABELS: Record<BoardStyle, string> = {
  park: "Park and freestyle",
  "all-mountain": "All-mountain",
  freeride: "Freeride and powder",
};

// evo and REI agree within 2 cm: beginner ≈ height − 12, intermediate ≈ − 3,
// expert ≈ + 5. Advanced sits between (K2's "advanced playful" ≈ + 2).
const SKI_ABILITY_CM: Record<Ability, number> = { beginner: -12, intermediate: -3, advanced: 1, expert: 5 };
// K2/Völkl: park or groomers 2–5 cm shorter, powder and freeride 2–5 longer.
// Groomers take the short end so strong carvers stay near the expert charts.
const SKI_STYLE_CM: Record<SkiStyle, number> = { groomers: -2, "all-mountain": 0, powder: 3, park: -3 };
// K2/Völkl: 1–3 cm for a lighter or heavier build than average. No source
// defines "average", so a BMI of 21–27 counts as typical (our assumption) and
// the adjustment grows smoothly outside it, capped at 3 cm. Smooth, so a
// taller skier never gets a shorter ski.
const TYPICAL_BMI = { low: 21, high: 27 };
const SKI_CM_PER_BMI = 0.5;
const SKI_WEIGHT_MAX_CM = 3;
// REI: beginners shouldn't go too short; K2's shortest beginner ski ≈ height − 15.
const SKI_BEGINNER_FLOOR_CM = -16;
const SKI_SPREAD_CM = 4;
// Published ski charts run from about 4'4" to 6'4".
const SKI_CHART_MIN_CM = 132;
const SKI_CHART_MAX_CM = 193;

// Snowboards: weight leads (Jones calls it "the single most important
// metric"). Centres of the Jones, evo, REI and K2 charts at each weight; the
// charts spread by up to ~10 cm, with Jones shortest and K2 longest.
const BOARD_WEIGHT_ANCHORS: ReadonlyArray<readonly [kg: number, cm: number]> = [
  [34, 138],
  [50, 144],
  [68, 154.5],
  [82, 159.5],
  [91, 163],
  [104, 166],
  [120, 169],
];
// Height check: chin to nose (REI, K2), about 88% of height (Peter Glenn ~90%).
// It carries a quarter of the weight, so short-heavy and tall-light riders
// land between a weight-only chart (Jones) and a height grid (K2).
const BOARD_HEIGHT_RATIO = 0.88;
const BOARD_HEIGHT_SHARE = 0.25;
// When height and weight point to different lengths the charts themselves
// split (Jones by weight vs K2 by height), so the range widens to show it.
const BOARD_SPREAD_CM = 3;
const BOARD_SPREAD_MAX_CM = 6;
const BOARD_GAP_FREE_CM = 4; // small disagreements are normal and keep the ±3 range
const BOARD_SPREAD_PER_CM_GAP = 0.35;
const BOARD_DISAGREE_CM = 8;
// Jones: beginners 1–2 cm shorter. No source lengthens boards for skill alone.
const BOARD_ABILITY_CM: Record<Ability, number> = { beginner: -2, intermediate: 0, advanced: 0, expert: 0 };
// Park 2–5 cm shorter, freeride and powder 2–4 longer (K2, Jones, Peter Glenn).
const BOARD_STYLE_CM: Record<BoardStyle, number> = { park: -3, "all-mountain": 0, freeride: 3 };
// Adult board charts start around 75 lb (Jones) and 4'4".
const BOARD_CHART_MIN_KG = 34;
const BOARD_CHART_MAX_KG = 115;

// Jones minimum waist: 259 mm at men's US 10, 4 mm per size above
// (11: 263, 12: 267, 13: 271, 14.5: 278).
const WIDE_FROM_MENS_SIZE = 10;
const WIDE_WAIST_AT_10_MM = 259;
const WIDE_MM_PER_SIZE = 4;

export const CM_PER_INCH = 2.54;
export const KG_PER_LB = 0.45359237;

function requirePositive(name: string, value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${name} must be a positive number, got ${value}`);
  }
}

export function feetInchesToCm(feet: number, inches: number) {
  return Math.round((feet * 12 + inches) * CM_PER_INCH);
}

export function cmToFeetInches(cm: number) {
  const totalInches = Math.round(cm / CM_PER_INCH);
  return { feet: Math.floor(totalInches / 12), inches: totalInches % 12 };
}

export function formatFeetInches(cm: number) {
  const { feet, inches } = cmToFeetInches(cm);
  return `${feet}'${inches}"`;
}

export function lbToKg(lb: number) {
  return lb * KG_PER_LB;
}

export function bmi(heightCm: number, weightKg: number) {
  return weightKg / (heightCm / 100) ** 2;
}

function withSpread(base: Adjustment, adjustments: Adjustment[], spread: number, notes: string[]): SizeRecommendation {
  const steps = adjustments.filter((step) => step.cm !== 0);
  const target = base.cm + steps.reduce((total, step) => total + step.cm, 0);
  return { kind: "range", target, min: target - spread, max: target + spread, base, adjustments: steps, notes };
}

function skiWeightOffset(heightCm: number, weightKg: number) {
  const index = bmi(heightCm, weightKg);
  const outside =
    index < TYPICAL_BMI.low ? index - TYPICAL_BMI.low : index > TYPICAL_BMI.high ? index - TYPICAL_BMI.high : 0;
  return Math.max(-SKI_WEIGHT_MAX_CM, Math.min(SKI_WEIGHT_MAX_CM, outside * SKI_CM_PER_BMI));
}

export function recommendSkiLength({
  heightCm,
  weightKg,
  ability,
  style,
}: {
  heightCm: number;
  weightKg?: number;
  ability: Ability;
  style: SkiStyle;
}): SizeResult {
  requirePositive("heightCm", heightCm);
  if (weightKg !== undefined) requirePositive("weightKg", weightKg);

  if (heightCm < SKI_CHART_MIN_CM) {
    return {
      kind: "kids",
      notes: [
        "This calculator follows adult and teen charts, which start around 4'4\" (132 cm).",
        "Kids' skis are sized on each brand's own kids' chart, so check the chart for the model you're looking at.",
        "When in doubt go shorter, and don't buy a size up to grow into. A ski that's too long is harder to turn and stop.",
      ],
    };
  }

  const height = Math.round(heightCm);
  const abilityCm = SKI_ABILITY_CM[ability];
  const styleCm = SKI_STYLE_CM[style];
  const exact = height + abilityCm + styleCm + (weightKg !== undefined ? skiWeightOffset(height, weightKg) : 0);
  const unfloored = Math.round(exact);
  const floor = height + SKI_BEGINNER_FLOOR_CM;
  const target = ability === "beginner" ? Math.max(unfloored, floor) : unfloored;
  const weightCm = unfloored - (height + abilityCm + styleCm);

  const adjustments: Adjustment[] = [
    { label: `${ABILITY_LABELS[ability]} level`, cm: abilityCm },
    { label: SKI_STYLE_LABELS[style], cm: styleCm },
    { label: weightCm < 0 ? "Lighter build for your height" : "Heavier build for your height", cm: weightCm },
    { label: "Kept long enough for stability", cm: target - unfloored },
  ];

  const notes: string[] = [];
  if (height > SKI_CHART_MAX_CM) {
    notes.push(
      "Published charts stop around 6'4\" (193 cm), so treat this as a starting point and check the ski's own size chart.",
    );
  }
  if (ability === "beginner") {
    notes.push("Don't go much shorter than this: beginners still need some stability.");
  }
  if (style === "groomers" && (ability === "advanced" || ability === "expert")) {
    notes.push("Strong carvers who like speed often go to the long end of the range, or a size longer.");
  }
  if (style === "powder") {
    notes.push("Wide, rockered powder skis ski shorter than their length, so the longer end of the range suits them.");
  }
  notes.push(
    "Brands size a little differently, so check the model's own chart, and have your bindings set (DIN) by a certified ski technician.",
  );

  return withSpread({ label: "Your height", cm: height }, adjustments, SKI_SPREAD_CM, notes);
}

function lengthForWeight(weightKg: number) {
  const anchors = BOARD_WEIGHT_ANCHORS;
  if (weightKg <= anchors[0][0]) return anchors[0][1];
  for (let i = 1; i < anchors.length; i++) {
    const [kg, cm] = anchors[i];
    if (weightKg <= kg) {
      const [prevKg, prevCm] = anchors[i - 1];
      return prevCm + ((weightKg - prevKg) / (kg - prevKg)) * (cm - prevCm);
    }
  }
  return anchors[anchors.length - 1][1];
}

export function recommendBoardLength({
  heightCm,
  weightKg,
  ability,
  style,
}: {
  heightCm: number;
  weightKg: number;
  ability: Ability;
  style: BoardStyle;
}): SizeResult {
  requirePositive("heightCm", heightCm);
  requirePositive("weightKg", weightKg);

  if (heightCm < SKI_CHART_MIN_CM || weightKg < BOARD_CHART_MIN_KG) {
    return {
      kind: "kids",
      notes: [
        "This calculator follows adult and teen charts, which start around 75 lb (34 kg) and 4'4\" (132 cm).",
        "Kids' boards are sized on each brand's own kids' chart, mostly by weight, so check the chart for the model you're looking at.",
        "When in doubt go shorter, and don't buy a size up to grow into. A board that's too long is hard to turn and stop.",
      ],
    };
  }

  const fromWeight = lengthForWeight(weightKg);
  const fromHeight = heightCm * BOARD_HEIGHT_RATIO;
  const blended = (1 - BOARD_HEIGHT_SHARE) * fromWeight + BOARD_HEIGHT_SHARE * fromHeight;
  const gap = Math.abs(fromHeight - fromWeight);
  const extra = Math.max(0, gap - BOARD_GAP_FREE_CM) * BOARD_SPREAD_PER_CM_GAP;
  const spread = Math.min(BOARD_SPREAD_MAX_CM, BOARD_SPREAD_CM + Math.round(extra));
  const weightBase = Math.round(fromWeight);
  const adjustments: Adjustment[] = [
    { label: "Height check", cm: Math.round(blended) - weightBase },
    { label: `${ABILITY_LABELS[ability]} level`, cm: BOARD_ABILITY_CM[ability] },
    { label: BOARD_STYLE_LABELS[style], cm: BOARD_STYLE_CM[style] },
  ];

  const notes: string[] = [];
  if (weightKg > BOARD_CHART_MAX_KG) {
    notes.push(
      "Most charts stop around 250 lb (115 kg), so treat this as the shortest board to consider. Look at wide or longer models, and check the board maker's own chart.",
    );
  }
  if (gap > BOARD_DISAGREE_CM) {
    notes.push(
      "Your height and weight point to different lengths, so the range is wider. Weight matters more for how a board flexes: the middle is the safe pick, and lean longer if you ride fast or in powder.",
    );
  }
  if (ability === "beginner") {
    notes.push("Don't go much shorter than this: a slightly longer board is more stable as you start linking turns.");
  }
  if (style === "freeride") {
    notes.push(
      "Short, wide \"volume-shifted\" powder boards are sized differently, often several cm shorter. Use the maker's chart for those.",
    );
  }
  notes.push("Weight ranges are guidelines, not rules. Between two sizes? The middle of your range is the safe pick.");

  return withSpread({ label: "Length for your weight", cm: weightBase }, adjustments, spread, notes);
}

// Waist width from boot size, so toes and heels don't drag: aim for 1–2 cm of
// boot overhang per edge (REI, K2, Salomon). Women's US = men's US + 1.5 in
// every table we read. Below men's 10: REI/K2 and evo ranges; from 10 up:
// Jones's minimum waist, the strictest of the three.
export function recommendBoardWidth(bootSize: number, sizing: BootSizing): WidthRecommendation {
  requirePositive("bootSize", bootSize);
  const mensSize = sizing === "womens" ? bootSize - 1.5 : bootSize;
  if (mensSize < 8) return { label: "Narrow to regular", waist: "about 235–245 mm", mensSize };
  if (mensSize < WIDE_FROM_MENS_SIZE) return { label: "Regular", waist: "about 245–255 mm", mensSize };
  const minimum = Math.round(WIDE_WAIST_AT_10_MM + (mensSize - WIDE_FROM_MENS_SIZE) * WIDE_MM_PER_SIZE);
  return { label: mensSize < 11 ? "Mid-wide" : "Wide", waist: `at least ${minimum} mm`, mensSize };
}

// Static chart rows for the calculator pages (all-mountain, typical build).
export const SKI_CHART_HEIGHTS_CM = [150, 155, 160, 165, 170, 175, 180, 185, 190] as const;
export const BOARD_CHART_WEIGHTS_KG = [45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110] as const;

export function skiChartRow(heightCm: number) {
  const abilities: Ability[] = ["beginner", "intermediate", "advanced", "expert"];
  return abilities.map((ability) => {
    const result = recommendSkiLength({ heightCm, ability, style: "all-mountain" });
    if (result.kind !== "range") throw new RangeError(`chart height ${heightCm} cm is below the adult charts`);
    return result;
  });
}

// Weight only, so it matches a rider of typical height for that weight.
export function boardChartRow(weightKg: number) {
  const target = Math.round(lengthForWeight(weightKg));
  return { target, min: target - BOARD_SPREAD_CM, max: target + BOARD_SPREAD_CM };
}
