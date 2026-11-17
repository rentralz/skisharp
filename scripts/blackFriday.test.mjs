// Tests for src/lib/blackFriday.ts. Expected Thanksgiving dates are the
// published US calendar, not the function's own output.
import { test } from "node:test";
import assert from "node:assert/strict";
import { blackFridaySeason, formatSeasonDate, isBlackFridayDeal, thanksgivingIso } from "../src/lib/blackFriday.ts";

test("Thanksgiving is the fourth Thursday of November", () => {
  const known = { 2024: "2024-11-28", 2025: "2025-11-27", 2026: "2026-11-26", 2027: "2027-11-25", 2028: "2028-11-23", 2029: "2029-11-22", 2030: "2030-11-28" };
  for (const [year, date] of Object.entries(known)) assert.equal(thanksgivingIso(Number(year)), date, year);
});

test("2026 season dates", () => {
  const season = blackFridaySeason("2026-11-17");
  assert.equal(season.blackFriday, "2026-11-27");
  assert.equal(season.cyberMonday, "2026-11-30");
  assert.equal(season.dealWindowStart, "2026-11-23");
  assert.equal(formatSeasonDate(season.blackFriday), "Friday, November 27");
  assert.equal(formatSeasonDate(season.cyberMonday, false), "November 30");
});

test("phases switch on the right days", () => {
  const cases = [
    ["2026-10-31", "off"], ["2026-11-01", "early"], ["2026-11-25", "early"], ["2026-11-26", "live"],
    ["2026-11-30", "live"], ["2026-12-01", "over"], ["2026-12-31", "over"], ["2027-01-01", "off"],
  ];
  for (const [today, phase] of cases) assert.equal(blackFridaySeason(today).phase, phase, today);
  assert.equal(blackFridaySeason("2026-12-05").next.blackFriday, "2027-11-26");
  assert.equal(blackFridaySeason("2027-06-01").next.blackFriday, "2027-11-26");
  // Sales count as started from the Monday of Thanksgiving week, only while the season is on
  assert.deepEqual(
    ["2026-11-22", "2026-11-23", "2026-11-28", "2026-12-02"].map((d) => blackFridaySeason(d).salesStarted),
    [false, true, true, false],
  );
});

test("which deals count as Black Friday deals", () => {
  // Each check runs at an explicit "now", so the result never depends on the day the tests run.
  const at = (iso) => Date.parse(iso);
  const early = blackFridaySeason("2026-11-17");
  const earlyNow = at("2026-11-17T18:00:00Z");
  const live = blackFridaySeason("2026-11-30");
  const liveNow = at("2026-11-30T23:00:00Z");
  const deal = (title, posted) => ({ title, posted });
  // Named in the title from November 1
  assert.ok(isBlackFridayDeal(deal("Early Black Friday: Burton jackets 30% off", "2026-11-10T15:00:00Z"), early, earlyNow));
  assert.ok(isBlackFridayDeal(deal("Cyber Monday ski goggles $40", "2026-11-12T15:00:00Z"), early, earlyNow));
  assert.ok(!isBlackFridayDeal(deal("Black Friday ski deal", "2026-10-20T15:00:00Z"), early, earlyNow)); // before Nov 1
  assert.ok(isBlackFridayDeal(deal("Black-Friday ski helmets 25% off", "2026-11-10T15:00:00Z"), early, earlyNow));
  assert.ok(isBlackFridayDeal(deal("BlackFriday snowboard bindings $99", "2026-11-10T15:00:00Z"), early, earlyNow));
  // Any deal posted from the Monday of Thanksgiving week (Denver time) through Cyber Monday
  assert.ok(!isBlackFridayDeal(deal("Ski jacket $80", "2026-11-22T20:00:00Z"), live, liveNow));
  assert.ok(!isBlackFridayDeal(deal("Ski jacket $80", "2026-11-23T05:00:00Z"), live, liveNow)); // Nov 22, 10pm MST
  assert.ok(isBlackFridayDeal(deal("Ski jacket $80", "2026-11-23T08:00:00Z"), live, liveNow)); // Nov 23, 1am MST
  assert.ok(isBlackFridayDeal(deal("Ski jacket $80", "2026-11-30T20:00:00Z"), live, liveNow));
  assert.ok(
    !isBlackFridayDeal(deal("Black Friday leftovers: ski jacket", "2026-12-01T20:00:00Z"), blackFridaySeason("2026-12-02"), at("2026-12-02T18:00:00Z")),
  );
  // A post dated in the future is bad data, not a deal
  assert.ok(!isBlackFridayDeal(deal("Ski jacket $80", "2026-11-25T15:00:00Z"), early, earlyNow));
  // Nothing counts outside the season, and bad dates never match
  assert.ok(!isBlackFridayDeal(deal("Black Friday ski deal", "2027-03-01T15:00:00Z"), blackFridaySeason("2027-03-02"), at("2027-03-02T18:00:00Z")));
  assert.ok(!isBlackFridayDeal(deal("Black Friday ski deal", "not a date"), live, liveNow));
});
