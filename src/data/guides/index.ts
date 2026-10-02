import { getTechniqueBySlug } from "@/data/techniques";
import type { TechniqueGuide } from "./types";
import carvedTurns from "./carved-turns";
import counterRotation from "./counter-rotation";
import fallingLeaf from "./falling-leaf";
import garlandExercise from "./garland-exercise";
import herringbone from "./herringbone";
import hockeyStop from "./hockey-stop";
import iceTechnique from "./ice-technique";
import mogulAbsorption from "./mogul-absorption";
import parallelTurns from "./parallel-turns";
import polePlanting from "./pole-planting";
import powderFloating from "./powder-floating";
import skiingInRain from "./skiing-in-rain";
import snowboardAthleticStance from "./snowboard-athletic-stance";
import snowboardFallingLeaf from "./snowboard-falling-leaf";
import snowboardHeelsideTurns from "./snowboard-heelside-turns";
import snowboardLinkedTurns from "./snowboard-linked-turns";
import snowboardPowderBasics from "./snowboard-powder-basics";
import snowboardToesideTurns from "./snowboard-toeside-turns";
import speedControl from "./speed-control";
import steepTerrain from "./steep-terrain";
import treeSkiing from "./tree-skiing";
import wedgeTurns from "./wedge-turns";

const GUIDES: TechniqueGuide[] = [
  carvedTurns,
  counterRotation,
  fallingLeaf,
  garlandExercise,
  herringbone,
  hockeyStop,
  iceTechnique,
  mogulAbsorption,
  parallelTurns,
  polePlanting,
  powderFloating,
  skiingInRain,
  snowboardAthleticStance,
  snowboardFallingLeaf,
  snowboardHeelsideTurns,
  snowboardLinkedTurns,
  snowboardPowderBasics,
  snowboardToesideTurns,
  speedControl,
  steepTerrain,
  treeSkiing,
  wedgeTurns,
];

const guidesBySlug = new Map<string, TechniqueGuide>();

// Fail the build, not the page, if a guide points at a technique that
// doesn't exist or two guides claim the same slug.
for (const guide of GUIDES) {
  if (!getTechniqueBySlug(guide.slug)) {
    throw new Error(`Technique guide references missing technique slug: ${guide.slug}`);
  }
  if (guidesBySlug.has(guide.slug)) {
    throw new Error(`Duplicate technique guide for slug: ${guide.slug}`);
  }
  guidesBySlug.set(guide.slug, guide);
}

export function getTechniqueGuide(slug: string): TechniqueGuide | undefined {
  return guidesBySlug.get(slug);
}
