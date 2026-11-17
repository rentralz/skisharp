// Tests for src/lib/sizing.ts. Expected values are the published charts the
// rules were built from (evo, REI, K2/Völkl, Jones), not our own output.
// Run: npm test (Node 22.18+ imports the TypeScript module directly).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  boardChartRow,
  feetInchesToCm,
  formatFeetInches,
  recommendBoardLength,
  recommendBoardWidth,
  recommendSkiLength,
} from "../src/lib/sizing.ts";

const within = (rec, cm) => rec.min <= cm && cm <= rec.max;
const overlaps = (rec, lo, hi) => rec.min <= hi && lo <= rec.max;
const ski = (args) => {
  const rec = recommendSkiLength(args);
  assert.equal(rec.kind, "range", `expected an adult range for ${JSON.stringify(args)}`);
  return rec;
};
const board = (args) => {
  const rec = recommendBoardLength(args);
  assert.equal(rec.kind, "range", `expected an adult range for ${JSON.stringify(args)}`);
  return rec;
};
const kgForBmi = (heightCm, index) => index * (heightCm / 100) ** 2;

// evo ski chart (cm). "190+" cells for experts at 188 and 193 are open-ended and skipped.
const EVO_SKI = [
  [132, 120, 130, 138], [137, 125, 135, 143], [142, 130, 140, 148], [147, 135, 145, 153],
  [152, 140, 150, 158], [158, 145, 155, 163], [163, 150, 160, 168], [168, 155, 165, 173],
  [173, 160, 170, 178], [178, 165, 175, 183], [183, 170, 180, 188], [188, 175, 185, null], [193, 180, 190, null],
];
// REI ski chart (cm).
const REI_SKI = [
  [137, 125, 135, 140], [142, 130, 140, 145], [147, 135, 145, 150], [152, 140, 150, 155],
  [157, 145, 155, 165], [163, 150, 160, 170], [168, 155, 165, 175], [173, 160, 170, 180],
  [178, 165, 175, 185], [183, 170, 180, 190], [188, 175, 185, 195], [193, 180, 190, 200],
];
const ABILITIES = ["beginner", "intermediate", "expert"];

test("ski targets sit within 2 cm of every evo chart length", () => {
  for (const [heightCm, ...lengths] of EVO_SKI) {
    ABILITIES.forEach((ability, i) => {
      if (lengths[i] === null) return;
      const rec = ski({ heightCm, ability, style: "all-mountain" });
      assert.ok(Math.abs(rec.target - lengths[i]) <= 2, `evo ${heightCm} ${ability}: ${lengths[i]} vs target ${rec.target}`);
    });
  }
});

test("REI ski chart: beginner and intermediate within 2 cm, experts inside the range", () => {
  for (const [heightCm, beginner, intermediate, expert] of REI_SKI) {
    for (const [ability, cm] of [["beginner", beginner], ["intermediate", intermediate]]) {
      const rec = ski({ heightCm, ability, style: "all-mountain" });
      assert.ok(Math.abs(rec.target - cm) <= 2, `REI ${heightCm} ${ability}: ${cm} vs target ${rec.target}`);
    }
    const rec = ski({ heightCm, ability: "expert", style: "all-mountain" });
    assert.ok(within(rec, expert), `REI ${heightCm} expert: ${expert} vs ${rec.min}-${rec.max}`);
  }
});

test("K2/Völkl ski ranges overlap ours", () => {
  // height, beginner, intermediate, advanced playful (cm ranges)
  const K2 = [
    [142, [125, 135], [133, 140], [138, 144]], [152, [138, 148], [148, 155], [152, 158]],
    [163, [148, 158], [158, 165], [163, 169]], [173, [158, 168], [168, 174], [172, 178]],
    [183, [168, 178], [178, 184], [182, 188]], [193, [174, 184], [184, 190], [188, 194]],
  ];
  for (const [heightCm, ...ranges] of K2) {
    ["beginner", "intermediate", "advanced"].forEach((ability, i) => {
      const rec = ski({ heightCm, ability, style: "all-mountain" });
      assert.ok(overlaps(rec, ...ranges[i]), `K2 ${heightCm} ${ability}: ${ranges[i]} vs ${rec.min}-${rec.max}`);
    });
  }
});

test("advanced sits between intermediate and expert, and matches K2's advanced-playful column on average", () => {
  // K2 advanced playful midpoints by height; evo and REI publish no advanced column.
  const K2_PLAYFUL_MID = [[142, 141], [152, 155], [163, 166], [173, 175], [183, 185], [193, 191]];
  let totalGap = 0;
  for (const [heightCm, mid] of K2_PLAYFUL_MID) {
    const advanced = ski({ heightCm, ability: "advanced", style: "all-mountain" }).target;
    const intermediate = ski({ heightCm, ability: "intermediate", style: "all-mountain" }).target;
    const expert = ski({ heightCm, ability: "expert", style: "all-mountain" }).target;
    assert.ok(intermediate < advanced && advanced < expert, `${heightCm}: ${intermediate} < ${advanced} < ${expert}`);
    totalGap += advanced - mid;
  }
  const meanGap = totalGap / K2_PLAYFUL_MID.length;
  assert.ok(Math.abs(meanGap) <= 1.5, `mean gap to K2 advanced playful: ${meanGap.toFixed(2)} cm`);
});

test("ski style moves the length the way K2/Völkl describe (2–5 cm)", () => {
  const base = ski({ heightCm: 175, ability: "intermediate", style: "all-mountain" }).target;
  for (const [style, lo, hi] of [["park", -5, -2], ["groomers", -5, -2], ["powder", 2, 5]]) {
    const delta = ski({ heightCm: 175, ability: "intermediate", style }).target - base;
    assert.ok(delta >= lo && delta <= hi, `${style}: ${delta}`);
  }
});

test("a typical build (BMI 21-27) gets no weight adjustment; lighter and heavier move 1-3 cm", () => {
  const base = ski({ heightCm: 175, ability: "intermediate", style: "all-mountain" }).target;
  for (const index of [21.5, 24, 26.5]) {
    const rec = ski({ heightCm: 175, weightKg: kgForBmi(175, index), ability: "intermediate", style: "all-mountain" });
    assert.equal(rec.target, base, `BMI ${index}`);
  }
  const light = ski({ heightCm: 175, weightKg: kgForBmi(175, 17), ability: "intermediate", style: "all-mountain" });
  const heavy = ski({ heightCm: 175, weightKg: kgForBmi(175, 31), ability: "intermediate", style: "all-mountain" });
  assert.ok(base - light.target >= 1 && base - light.target <= 3, `light ${light.target}`);
  assert.ok(heavy.target - base >= 1 && heavy.target - base <= 3, `heavy ${heavy.target}`);
});

test("a taller skier never gets a shorter ski, whatever the weight", () => {
  for (const weightKg of [50, 70, 95]) {
    for (const ability of ["beginner", "intermediate", "advanced", "expert"]) {
      for (const style of ["groomers", "all-mountain", "powder", "park"]) {
        let previous = 0;
        for (let heightCm = 140; heightCm <= 205; heightCm++) {
          const { target } = ski({ heightCm, weightKg, ability, style });
          assert.ok(target >= previous, `${weightKg} kg ${ability} ${style}: ${heightCm} cm -> ${target} < ${previous}`);
          previous = target;
        }
      }
    }
  }
});

test("beginners never go below height - 16 cm, even light and on groomers", () => {
  const rec = ski({ heightCm: 180, weightKg: 48, ability: "beginner", style: "groomers" });
  assert.ok(rec.target >= 164, `target ${rec.target}`);
  assert.ok(rec.adjustments.some((step) => step.label.startsWith("Kept long enough")));
});

test("evo snowboard grid samples: within 2 cm of the target", () => {
  // 5'8" 150 lb -> 155, 5'10" 180 lb -> 159, 6'0" 200 lb -> 162
  for (const [heightCm, lb, cm] of [[173, 150, 155], [178, 180, 159], [183, 200, 162]]) {
    const rec = board({ heightCm, weightKg: lb * 0.45359237, ability: "intermediate", style: "all-mountain" });
    assert.ok(Math.abs(rec.target - cm) <= 2, `${heightCm} cm ${lb} lb: evo ${cm}, ours ${rec.target}`);
  }
});

const JONES = [
  [43, 50, 140, 145], [47, 54, 142, 147], [52, 58, 144, 149], [56, 63, 146, 151], [61, 68, 148, 153],
  [65, 72, 150, 155], [70, 77, 152, 157], [74, 81, 154, 159], [79, 86, 156, 161], [83, 91, 158, 163],
  [88, 95, 160, 165], [92, 99, 162, 167], [97, 104, 164, 169],
];

test("weight chart sits within 2.5 cm of every Jones midpoint", () => {
  for (const [lowKg, highKg, lo, hi] of JONES) {
    const row = boardChartRow((lowKg + highKg) / 2);
    assert.ok(Math.abs(row.target - (lo + hi) / 2) <= 2.5, `Jones ${lowKg}-${highKg} kg: ${lo}-${hi}, ours ${row.target}`);
  }
});

test("the calculator (with its height check) overlaps Jones for riders of typical build", () => {
  for (const [lowKg, highKg, lo, hi] of JONES) {
    const weightKg = (lowKg + highKg) / 2;
    const heightCm = 100 * Math.sqrt(weightKg / 22.5);
    const rec = board({ heightCm, weightKg, ability: "intermediate", style: "all-mountain" });
    assert.ok(overlaps(rec, lo, hi), `Jones ${lowKg}-${highKg} kg at ${heightCm.toFixed(0)} cm: ${lo}-${hi} vs ${rec.min}-${rec.max}`);
  }
});

test("the K2 height x weight grid overlaps ours, including short-heavy and tall-light riders", () => {
  // height -> [<59 kg], [59-82 kg], [>82 kg], tested at 55, 70 and 90 kg
  const K2 = [
    [152, [138, 144], [142, 148], [146, 152]], [163, [144, 150], [148, 154], [152, 158]],
    [173, [150, 156], [154, 160], [158, 164]], [183, [156, 162], [160, 166], [164, 170]],
  ];
  for (const [heightCm, ...ranges] of K2) {
    [55, 70, 90].forEach((weightKg, i) => {
      const rec = board({ heightCm, weightKg, ability: "intermediate", style: "all-mountain" });
      assert.ok(overlaps(rec, ...ranges[i]), `K2 ${heightCm} cm ${weightKg} kg: ${ranges[i]} vs ${rec.min}-${rec.max}`);
    });
  }
});

test("the REI weight chart overlaps ours through the middle weights", () => {
  // REI rows (lb -> cm); REI runs much shorter than the others below 135 lb.
  for (const [lowLb, highLb, lo, hi] of [[140, 155, 149, 157], [150, 165, 154, 162], [160, 175, 159, 167]]) {
    const weightKg = ((lowLb + highLb) / 2) * 0.45359237;
    const heightCm = 100 * Math.sqrt(weightKg / 23);
    const rec = board({ heightCm, weightKg, ability: "intermediate", style: "all-mountain" });
    assert.ok(overlaps(rec, lo, hi), `REI ${lowLb}-${highLb} lb: ${lo}-${hi} vs ${rec.min}-${rec.max}`);
  }
});

test("board range is ±3 cm when height and weight agree, and widens (max ±6) when they don't", () => {
  const agree = board({ heightCm: 173, weightKg: 68, ability: "intermediate", style: "all-mountain" });
  assert.equal(agree.max - agree.target, 3);
  const tallLight = board({ heightCm: 185, weightKg: 60, ability: "intermediate", style: "all-mountain" });
  assert.ok(tallLight.max - tallLight.target > 3 && tallLight.max - tallLight.target <= 6);
  assert.ok(tallLight.notes.some((note) => note.includes("different lengths")));
});

test("board style and ability shift the length as K2, Jones and Peter Glenn describe", () => {
  const args = { heightCm: 175, weightKg: 72 };
  const allMountain = board({ ...args, ability: "intermediate", style: "all-mountain" }).target;
  const park = board({ ...args, ability: "intermediate", style: "park" }).target;
  const freeride = board({ ...args, ability: "intermediate", style: "freeride" }).target;
  const beginner = board({ ...args, ability: "beginner", style: "all-mountain" }).target;
  assert.ok(allMountain - park >= 2 && allMountain - park <= 5);
  assert.ok(freeride - allMountain >= 2 && freeride - allMountain <= 4);
  assert.ok(allMountain - beginner >= 1 && allMountain - beginner <= 2);
});

test("a heavier or taller rider never gets a shorter board", () => {
  for (const heightCm of [150, 170, 190]) {
    let previous = 0;
    for (let weightKg = 34; weightKg <= 140; weightKg += 0.5) {
      const { target } = board({ heightCm, weightKg, ability: "intermediate", style: "all-mountain" });
      assert.ok(target >= previous, `${heightCm} cm ${weightKg} kg`);
      previous = target;
    }
  }
});

test("width tiers follow the REI/K2 and evo tables, then Jones's minimum waist", () => {
  const width = (size, sizing = "mens") => recommendBoardWidth(size, sizing);
  assert.equal(width(7.5).label, "Narrow to regular");
  assert.equal(width(9.5).label, "Regular");
  assert.deepEqual([width(10).label, width(10).waist], ["Mid-wide", "at least 259 mm"]);
  assert.deepEqual([width(11).label, width(11).waist], ["Wide", "at least 263 mm"]);
  assert.equal(width(12).waist, "at least 267 mm");
  assert.equal(width(13).waist, "at least 271 mm");
  assert.ok(Number.parseInt(width(14.5).waist.replace(/\D+/g, ""), 10) >= 277);
  assert.equal(width(11, "womens").label, "Regular"); // women's 11 = men's 9.5
  assert.equal(width(11.5, "womens").label, "Mid-wide"); // women's 11.5 = men's 10
});

test("the shown steps always add up to the target, and the range brackets it", () => {
  for (const heightCm of [140, 150, 175, 200]) {
    for (const weightKg of [40, 60, 90, 130]) {
      for (const rec of [
        ski({ heightCm, weightKg, ability: "advanced", style: "powder" }),
        ski({ heightCm, weightKg, ability: "beginner", style: "groomers" }),
        board({ heightCm, weightKg, ability: "beginner", style: "park" }),
      ]) {
        const sum = rec.base.cm + rec.adjustments.reduce((total, step) => total + step.cm, 0);
        assert.equal(sum, rec.target);
        assert.ok(rec.min < rec.target && rec.target < rec.max);
        assert.ok(rec.adjustments.every((step) => step.cm !== 0));
      }
    }
  }
});

test("kids get the kids' rule, not an adult number", () => {
  for (const heightCm of [100, 120, 131]) {
    assert.equal(recommendSkiLength({ heightCm, ability: "expert", style: "powder" }).kind, "kids");
  }
  assert.equal(recommendBoardLength({ heightCm: 125, weightKg: 25, ability: "beginner", style: "park" }).kind, "kids");
  assert.equal(recommendBoardLength({ heightCm: 150, weightKg: 30, ability: "beginner", style: "park" }).kind, "kids");
  assert.equal(recommendSkiLength({ heightCm: 132, ability: "beginner", style: "all-mountain" }).kind, "range");
});

test("out-of-chart adults get a warning", () => {
  const has = (rec, words) => rec.notes.some((note) => note.includes(words));
  assert.ok(has(ski({ heightCm: 200, ability: "expert", style: "all-mountain" }), "6'4"));
  assert.ok(has(board({ heightCm: 190, weightKg: 125, ability: "expert", style: "freeride" }), "250 lb"));
  assert.ok(!has(ski({ heightCm: 175, ability: "intermediate", style: "all-mountain" }), "6'4"));
});

test("impossible inputs are rejected instead of producing a number", () => {
  for (const bad of [Number.NaN, 0, -5, Number.POSITIVE_INFINITY]) {
    assert.throws(() => recommendSkiLength({ heightCm: bad, ability: "expert", style: "powder" }), RangeError);
    assert.throws(() => recommendBoardLength({ heightCm: 175, weightKg: bad, ability: "expert", style: "park" }), RangeError);
    assert.throws(() => recommendBoardWidth(bad, "mens"), RangeError);
  }
  assert.throws(() => recommendSkiLength({ heightCm: 175, weightKg: Number.NaN, ability: "expert", style: "park" }), RangeError);
});

test("unit conversions", () => {
  assert.equal(feetInchesToCm(5, 10), 178);
  assert.equal(feetInchesToCm(6, 0), 183);
  assert.equal(formatFeetInches(178), "5'10\"");
  assert.equal(formatFeetInches(183), "6'0\"");
});
