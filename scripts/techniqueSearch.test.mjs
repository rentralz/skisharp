// Library search: run with `npm test` (node --test loads the .ts files directly).
import test from "node:test";
import assert from "node:assert/strict";
import {
  buildSearchIndex,
  hasSearchTerms,
  queryTerms,
  searchTechniques,
  stem,
} from "../src/lib/techniqueSearch.ts";
import { techniques } from "../src/data/techniques.ts";
import { TECHNIQUE_ALIASES } from "../src/data/techniqueAliases.ts";

const index = buildSearchIndex(techniques, TECHNIQUE_ALIASES);
const search = (query, list = techniques) => searchTechniques(list, query, index).map((t) => t.slug);

test("every alias key is a real technique slug", () => {
  const slugs = new Set(techniques.map((t) => t.slug));
  const unknown = Object.keys(TECHNIQUE_ALIASES).filter((slug) => !slugs.has(slug));
  assert.deepEqual(unknown, []);
});

test("the stemmer folds common word forms together", () => {
  for (const [forms, expected] of [
    [["stop", "stops", "stopping", "stopped"], "stop"],
    [["carve", "carved", "carving"], "carv"],
    [["ski", "skis", "skiing"], "ski"],
    [["mogul", "moguls"], "mogul"],
    [["fall", "falling"], "fall"],
    [["box", "boxes"], "box"],
  ]) {
    for (const form of forms) assert.equal(stem(form), expected, form);
  }
  assert.equal(stem("glass"), "glass");
  assert.equal(stem("speed"), "speed");
  assert.equal(stem("speeding"), "speed");
});

test("half-typed words keep matching while the visitor types", () => {
  // Each prefix of the word, from three letters on, must keep finding the
  // technique the whole word finds; an empty flash mid-word reads as "no results".
  for (const [word, slug] of [
    ["carving", "dynamic-carving"],
    ["turning", "parallel-turns"],
    ["stopping", "hockey-stop"],
    ["speeding", "speed-control"],
    ["moguls", "mogul-absorption"],
  ]) {
    for (let n = 3; n <= word.length; n++) {
      assert.ok(search(word.slice(0, n)).includes(slug), `${word.slice(0, n)} -> ${slug}`);
    }
  }
  assert.deepEqual(queryTerms("ski vs snowboard"), ["ski", "snowboard"]);
});

test("question words are ignored; a query of only those is not a search", () => {
  assert.deepEqual(queryTerms("How do I stop on a snowboard?"), ["stop", "snowboard"]);
  assert.equal(hasSearchTerms("how to"), false);
  assert.equal(hasSearchTerms("  "), false);
  assert.deepEqual(search("how to"), techniques.map((t) => t.slug));
});

test("everyday words find the right technique", () => {
  const pizza = search("pizza");
  assert.equal(pizza[0], "pizza-to-french-fries");
  for (const slug of ["wedge-turns", "snowplow-stop"]) assert.ok(pizza.includes(slug), slug);

  const boardStop = searchTechniques(techniques, "how do I stop on a snowboard", index);
  assert.equal(boardStop[0].slug, "snowboard-speed-control");

  assert.equal(search("getting off the chairlift")[0], "chairlift-unloading");
  assert.equal(search("heel side")[0], "snowboard-heelside-turns");
  assert.equal(search("heelside")[0], "snowboard-heelside-turns");
  assert.deepEqual(search("moguls").slice(0, 2).sort(), ["bump-absorption", "mogul-absorption"]);
  assert.ok(search("whiteout").includes("flat-light-skiing"));
});

test("a partly typed word matches while typing; short words must be whole", () => {
  assert.ok(search("mog").includes("mogul-absorption"));
  assert.ok(search("j turn").includes("j-turn"));
  assert.ok(!search("j turn").includes("parallel-turns"), "'j' must not match words starting with j");
});

test("every word has to match, and nothing matches nonsense", () => {
  assert.deepEqual(search("xyzzy"), []);
  const powderBoard = searchTechniques(techniques, "powder snowboard", index);
  assert.ok(powderBoard.length > 0);
  assert.equal(powderBoard[0].slug, "snowboard-powder-basics");
});

test("title matches rank above description-only matches", () => {
  // Four titles say "carve"; anything else only mentions it in its description.
  const titleMatches = ["carved-turns", "dynamic-carving", "skidded-to-carved", "snowboard-basic-carving"];
  const carving = search("carving");
  assert.ok(carving.length > titleMatches.length, "expected description-only matches too");
  assert.deepEqual(carving.slice(0, titleMatches.length).sort(), titleMatches);
});

test("search keeps to the list it is given (the active filters)", () => {
  const skiOnly = techniques.filter((t) => t.discipline === "ski");
  assert.ok(!search("heel side", skiOnly).includes("snowboard-heelside-turns"));
  assert.ok(search("stop", skiOnly).every((slug) => !slug.startsWith("snowboard-")));
});
