# Ski + Snowboard Redesign Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Expand TurnLab from a ski-only learning library into a two-discipline product that gives skiers and snowboarders equally clear entry points, discipline-aware learning paths, and a consistent shared brand.

**Architecture:** Keep TurnLab as one Next.js app with one shared brand and one shared technique data model, but introduce `discipline` as a first-class concept across data, navigation, homepage messaging, quiz logic, and technique discovery. Preserve existing ski URLs and flows where practical, while adding snowboard-specific content and UX states through a lightweight discipline preference layer (`ski` or `snowboard`) instead of splitting into two separate sites.

**Tech Stack:** Next.js 16 app router, React 19, Tailwind v4 utility classes, TypeScript, local static content in `src/data/techniques.ts`, existing query-param driven filtering in `src/app/techniques/page.tsx` and `src/hooks/useTechniqueFilters.ts`.

---

## Current-state findings

The current site is structurally and visually ski-only. This is visible in both the live site and the repo:

- `src/components/Navbar.tsx`
  - primary nav label is `Skiing Techniques`
- `src/app/page.tsx`
  - hero copy says `Curated ski instruction, not YouTube chaos`
  - headline and supporting copy repeatedly say `ski` / `skiing`
  - all path cards and featured content assume skiing
- `src/app/quiz/page.tsx`
  - first question asks `How many days have you skied in your life?`
  - options assume snowplow, hockey stop, parallel turns, etc.
- `src/app/layout.tsx` and `src/app/techniques/layout.tsx`
  - metadata, OG copy, and keywords are ski-specific
- `src/components/Footer.tsx`
  - footer promise says `The internet's best ski instruction`
- `src/data/techniques.ts`
  - the core `Technique` type has no discipline field, so everything is implicitly treated as skiing

This means snowboard support must be designed as a product-level redesign, not a content patch.

---

## Product decisions

### 1. TurnLab remains one brand

Keep `TurnLab` as the umbrella brand. Do **not** split into separate ski and snowboard microsites for v1.

**Reasoning:**
- the brand name already supports both disciplines
- one shared app is simpler to maintain
- most infrastructure is reusable: nav, cards, quiz shell, technique detail layout, metadata, and filtering

### 2. Ski and snowboard become first-class disciplines

Add exactly two top-level disciplines:

- `ski`
- `snowboard`

These are not secondary tags. They must be recognized by:
- the homepage
- navigation
- quiz
- technique library
- technique cards
- detail pages
- metadata and CTA copy where relevant

### 3. Preserve current ski traffic and URLs

Do not break current ski-first entry points.

**Rules:**
- existing ski pages like `/techniques`, `/quiz`, and `/techniques/[slug]` must remain valid
- when no discipline is chosen, default to `ski` for backward compatibility
- discipline-aware states should use query params and persisted preference instead of a hard route split in v1

### 4. Do not fake snowboard support

Do not market the site as fully bi-discipline until a real snowboard starter curriculum exists.

**Minimum viable snowboard launch:**
- homepage entry state for snowboard
- snowboard quiz branch
- snowboard library filtering
- at least 10–15 high-quality snowboard techniques
- snowboard-specific learning path copy

---

## UX principles

1. **Discipline choice should be obvious early**
   - snowboarders must know within 2–3 seconds that the site is for them too
2. **Do not bury snowboard under ski navigation**
   - no hidden checkbox deep in the technique filter bar as the primary access pattern
3. **One shared visual system, two tailored content states**
   - keep one brand language and layout system, but let copy, images, and cards respond to discipline
4. **Default safe; personalize fast**
   - default to ski when no state exists, then persist the user’s chosen discipline for future pages
5. **Use neutral umbrella language globally, specific language locally**
   - global copy: `techniques`, `learning paths`, `on-snow coaching`, `ski or snowboard`
   - local copy inside ski pages: `parallel skiing`, `pole plants`, etc.
   - local copy inside snowboard pages: `heel-side`, `toe-side`, `linking turns`, etc.

---

## Information architecture

### Global entry points

**Homepage (`/`)**
- becomes a shared snowsports homepage
- includes a visible discipline switch near the hero CTA cluster:
  - `Ski`
  - `Snowboard`
- updates hero copy, path cards, and featured techniques based on selected discipline

**Techniques page (`/techniques`)**
- remains the main library route
- accepts `discipline` as a search param:
  - `/techniques?discipline=ski`
  - `/techniques?discipline=snowboard`
- if no `discipline` is present, use persisted preference or default to `ski`

**Quiz page (`/quiz`)**
- becomes a shared quiz entry point
- first question chooses discipline, then branches into ski or snowboard questions

### Navigation model

Replace the current ski-framed navigation with discipline-aware top-level choices.

**Recommended desktop nav:**
- `Ski`
- `Snowboard`
- `Quiz`
- `About`
- `Deals`

**Route targets for v1:**
- `Ski` → `/techniques?discipline=ski`
- `Snowboard` → `/techniques?discipline=snowboard`
- `Quiz` → `/quiz`

This avoids adding unnecessary route trees while still making snowboard globally visible.

### Footer model

Footer should mirror the new architecture:
- Start here
- Explore
- By discipline
- By level

Add discipline-specific quick links:
- `/techniques?discipline=ski`
- `/techniques?discipline=snowboard`
- quiz / about / beginner paths per discipline

---

## Data model and state model

### Task 1: Add discipline to the core technique schema

**Objective:** Make the content model capable of distinguishing ski and snowboard techniques without forking the entire data layer.

**Files:**
- Modify: `src/data/techniques.ts`
- Create: `src/data/disciplines.ts`
- Modify: `src/hooks/useProgress.ts`
- Modify: `src/app/progress/page.tsx`

**Implementation notes:**
- Extend the main type system with a discipline union.
- Tag every existing technique as `discipline: "ski"`.
- Store display metadata in a dedicated discipline config file so hero copy, CTA labels, and badges are not hardcoded in multiple pages.
- Keep every existing ski `slug` unchanged for backward compatibility.
- Require every technique `slug` to remain globally unique because detail routing stays at `/techniques/[slug]`.
- Use a stable namespaced internal identity for non-URL state, for example:
  - `ski:linked-turns`
  - `snowboard:linked-turns`
- Move saved progress, bookmarks, and any future client-side state off plain slug keys and onto the stable namespaced ID so snowboard techniques can reuse generic titles without corrupting saved state.

**Code shape:**

```ts
export type Discipline = "ski" | "snowboard";

export interface Technique {
  id: string; // stable namespaced identity, e.g. "ski:parallel-turns"
  title: string;
  slug: string;
  discipline: Discipline;
  difficulty: number;
  rating: DifficultyRating;
  terrain: string[];
  description: string;
  promise: string;
  timestamps: Timestamp[];
  feels: string[];
  mistakes: Mistake[];
  drills: string[];
  prerequisites: string[];
  nextSteps: string[];
  youtubeVideos: VideoEntry[];
  updatedAt?: string;
}
```

`src/data/disciplines.ts` should centralize labels and marketing copy, for example:

```ts
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
```

**Verification:**
- `npm run build`
- Confirm existing ski technique pages still build and render
- Confirm data lookups continue to work after the type expansion
- Confirm `/progress` still loads saved ski entries correctly after the identity change

### Task 2: Add a shared discipline preference layer

**Objective:** Allow the UI to remember whether the user skis or snowboards without forcing a route split.

**Files:**
- Create: `src/hooks/useDisciplinePreference.ts`
- Create: `src/components/DisciplineToggle.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Footer.tsx`

**Implementation notes:**
- The hook should read/write a lightweight localStorage key such as `turnlab_discipline`.
- The toggle component should be reusable in:
  - navbar
  - homepage hero
  - quiz intro/result modules where useful
- The preferred discipline must not override an explicit query param on a page.
- The toggle should be visually simple: pill switch or segmented control.
- Active-nav behavior must account for both pathname and active `discipline` query param so `Ski` and `Snowboard` can highlight correctly even if both point at `/techniques`.

**Behavior rules:**
1. Explicit query param wins.
2. Otherwise use persisted preference.
3. Otherwise fall back to `ski`.
4. Any link generated from a known-discipline context must carry `discipline` explicitly in its href.
5. Persisted preference is only a fallback when the current context is genuinely discipline-agnostic.

**Verification:**
- `npm run build`
- Manually switch discipline in the nav, navigate to `/techniques`, and confirm the preference sticks

---

## Homepage redesign specification

### Task 3: Redesign the homepage as a shared ski + snowboard landing page

**Objective:** Make the homepage immediately inclusive of snowboarders without losing the current clarity for skiers.

**Files:**
- Modify: `src/app/page.tsx`
- Reuse/Create: `src/components/DisciplineToggle.tsx`

**Implementation notes:**
- Keep the current strong structure:
  1. hero
  2. proof cards
  3. value props
  4. learning paths
  5. featured techniques
  6. final CTA band
- Replace ski-exclusive hero framing with broader copy.
- Add a visible discipline switch in or directly under the hero copy block.
- Update all ski-only wording in the hero, path section, and CTA band.
- Path cards and featured techniques should respond to the selected discipline.
- If snowboard content is not yet large enough for a featured section, show only curated snowboard-ready cards rather than mirroring ski content with placeholders.
- Keep the homepage shell server-rendered where possible; use small client components only for discipline preference and discipline-responsive modules.
- Decide proof-card semantics explicitly. Recommended: keep top-line proof stats global across the whole catalog, and label them in neutral language rather than making them appear ski-only.

**Recommended hero copy direction:**
- eyebrow: `Curated on-snow instruction, not YouTube chaos`
- headline: `Find the right next skill for your level — on skis or a snowboard.`
- body: `TurnLab organizes scattered video instruction into guided learning paths with drills, feel cues, and progression built in.`

**Recommended hero controls:**
- primary CTA: `Take the 1-minute quiz`
- secondary CTA: discipline-aware browse CTA
- discipline toggle: `Ski | Snowboard`

**Learning path behavior:**
- show three cards for the active discipline:
  - Beginner
  - Intermediate
  - Advanced / Expert
- each card should use discipline-specific descriptions and focus bullets

**Featured content behavior:**
- for ski: keep existing technique cards, filtered by `discipline === "ski"`
- for snowboard: show only snowboard techniques
- each card should display a small discipline badge in addition to difficulty metadata

**Verification:**
- `npm run build`
- Load `/` locally and confirm snowboarders are explicitly represented above the fold
- Confirm home sections still read cleanly when discipline flips between ski and snowboard

---

## Quiz redesign specification

### Task 4: Branch the quiz by discipline

**Objective:** Stop routing snowboarders through ski-specific assessment logic.

**Files:**
- Modify: `src/app/quiz/page.tsx`
- Create: `src/data/quiz.ts`

**Implementation notes:**
- Move quiz question data out of the page component into `src/data/quiz.ts`.
- Add a first-step discipline selector before the scored questions.
- Maintain one quiz shell UI, but provide separate question banks and result mappings.
- Keep the current lightweight single-page UX and auto-advance behavior.

**Suggested structure:**

```ts
export interface QuizTrack {
  discipline: Discipline;
  questions: Question[];
  getResult: (score: number) => SkillResult;
}
```

**Ski branch:**
- preserve the current ski progression model, but normalize copy and slug references

**Snowboard branch starter topics:**
- days ridden
- hardest terrain comfortable on
- heel-side control
- toe-side control
- linking turns
- speed control
- biggest goal: basics, linking turns, carving, powder/trees, park/switch

**Result requirements:**
- results must return snowboard technique slugs for snowboard users
- result copy must say `ride` / `snowboard` instead of `ski`

**Verification:**
- `npm run build`
- Test a ski path from start to finish
- Test a snowboard path from start to finish
- Confirm result cards link to the correct discipline-specific techniques

---

## Technique library redesign specification

### Task 5: Make technique discovery discipline-aware

**Objective:** Let users browse the library by discipline without mixing ski and snowboard content into one confusing grid.

**Files:**
- Modify: `src/app/techniques/page.tsx`
- Modify: `src/hooks/useTechniqueFilters.ts`
- Modify: `src/components/TechniqueFilterBar.tsx`
- Modify: `src/components/TechniqueGrid.tsx`
- Modify: `src/components/TechniqueCard.tsx`

**Implementation notes:**
- Extend `FilterState` to include `discipline`.
- Parse `discipline` from `useSearchParams()` alongside `rating`.
- Add a top-level filter group ahead of difficulty and terrain:
  - All disciplines (optional, internal use only)
  - Ski
  - Snowboard
- For the public UX, default to a specific discipline instead of rendering a mixed wall.
- Show discipline badges on cards.
- Update empty states so they explain whether the issue is:
  - no snowboard content yet for that filter set
  - no techniques at that difficulty / terrain combination
- Filter state must round-trip with the URL. Do not treat search params as one-time initial state only.
- Updating discipline, rating, or terrain must update the query string, and query-string changes on the same route must update the rendered filter state.

**Filter shape:**

```ts
export interface FilterState {
  discipline: Discipline | "all";
  rating: DifficultyRating | "all";
  terrain: string | "all";
}
```

**Important UX rule:**
- `Snowboard` should be accessible from the top of the page, not only by scrolling to difficulty filters.

**Verification:**
- `npm run build`
- Check `/techniques?discipline=ski`
- Check `/techniques?discipline=snowboard`
- Confirm cards, counts, and empty states change correctly

### Task 6: Make technique detail pages discipline-aware without changing the layout pattern

**Objective:** Reuse the existing detail-page structure while clarifying which discipline each technique belongs to.

**Files:**
- Modify: `src/app/techniques/[slug]/page.tsx`
- Modify: `src/components/DifficultyBadge.tsx` if needed
- Modify: `src/components/Breadcrumbs.tsx` only if breadcrumb labels need discipline context

**Implementation notes:**
- Keep the current layout pattern: promise, description, video, timestamps, feels, mistakes, drills, prerequisites, next steps.
- Add a visible discipline indicator near the title block.
- Ensure `prev` / `next` progression cards do not jump from ski to snowboard when both disciplines exist in the same array.
- Update metadata and JSON-LD descriptions so they do not imply every technique is skiing.

**Important data rule:**
- progression links (`prev`, `next`, prerequisites, next steps) must stay within the same discipline unless explicitly curated otherwise.
- Add an automated integrity rule that fails if prerequisites, next steps, quiz result references, or progression links cross disciplines unless explicitly whitelisted.
- Saved progress and bookmarks must use the stable namespaced technique ID rather than slug-only identity.

**Verification:**
- `npm run build`
- Check one ski detail page and one snowboard detail page
- Confirm breadcrumbs, badges, and progression links remain coherent

---

## Global copy, metadata, and secondary pages

### Task 7: Broaden global copy and metadata from ski-only to ski + snowboard

**Objective:** Make the shared shell and SEO metadata match the new product scope.

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/techniques/layout.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/app/sitemap.ts` only if new discipline-aware URLs are emitted

**Implementation notes:**
- Replace phrases like:
  - `ski instruction`
  - `skiing techniques`
  - `what should I ski today?`
  - `better ski days`
- with broader language where the page is shared:
  - `ski and snowboard instruction`
  - `techniques`
  - `what should I ride today?`
  - `better days on snow`
- Keep ski-specific language only where the page is intentionally ski-specific.
- Update OG descriptions and keywords so snowboard support is visible in metadata.

**About page direction:**
- rewrite the intro to describe TurnLab as a curated ski and snowboard learning library
- add one short section that explains how discipline-specific paths work

**Verification:**
- `npm run build`
- Spot-check `/`, `/about`, `/techniques`, and a technique detail page for copy consistency

### Task 8: Audit secondary pages for discipline scope and labeling

**Objective:** Prevent the rest of the site from quietly contradicting the new homepage promise.

**Files:**
- Modify as needed:
  - `src/app/conditions-match/page.tsx`
  - `src/app/slope-ratings/page.tsx`
  - `src/app/snow-conditions/page.tsx`
  - `src/app/equipment-guide/page.tsx`
  - `src/app/clothing-guide/page.tsx`
  - `src/app/resorts/page.tsx`
  - `src/app/deals/page.tsx`

**Implementation notes:**
- Classify each page as one of:
  1. shared-neutral
  2. discipline-aware
  3. intentionally ski-only for now
- If a page remains ski-only in v1, add honest labeling rather than silently pretending it supports snowboarders.
- `conditions-match` is the highest-priority secondary page because its current framing strongly implies skiing.

**Verification:**
- Manual content pass across all secondary pages
- Ensure homepage/footer links do not send snowboarders into obviously ski-only copy without warning

---

## Snowboard content launch specification

### Task 9: Add the initial snowboard curriculum

**Objective:** Launch snowboard support with enough depth to feel real.

**Files:**
- Modify: `src/data/techniques.ts`
- Optional supporting file if the data file becomes too large:
  - Create: `src/data/snowboard-techniques.ts`
  - Create: `src/data/ski-techniques.ts`

**Implementation notes:**
- If `src/data/techniques.ts` becomes too unwieldy, split ski and snowboard technique arrays into separate files and merge them in a shared export.
- Add a minimum of 10–15 snowboard techniques.

**Recommended starter set:**
- athletic stance
- skating / one-foot riding
- chairlift basics for snowboarders
- falling leaf
- heel-side turns
- toe-side turns
- linked turns
- speed control
- side slipping
- garlands
- basic carving
- switch basics
- flat-base awareness
- variable snow basics
- powder basics

**Content quality bar:**
Each snowboard technique must include the same fields already expected by the detail template:
- promise
- description
- timestamps
- feels
- mistakes
- drills
- prerequisites
- next steps
- video sources

**Verification:**
- `npm run build`
- Confirm snowboard techniques render in the library, quiz results, and featured homepage state

---

## Rollout order

1. Add `discipline` to the type system and current ski data.
2. Add the first snowboard curriculum in data so public snowboard entry points do not point at empty or fake states.
3. Add the shared discipline preference/toggle infrastructure.
4. Rework nav, footer, metadata, and homepage shell copy.
5. Make the homepage discipline-aware.
6. Branch the quiz.
7. Make the technique library and detail pages discipline-aware.
8. Audit secondary pages and tighten copy gaps.

This order minimizes regressions while quickly making snowboard support visible.

**Release gating rule:** Do not ship snowboard nav, homepage, quiz, or library entry points to production before snowboard curriculum data exists and validation passes. If implementation lands incrementally, keep snowboard UI behind a feature flag until Tasks 2–8 are complete enough for a truthful public experience.

---

## Validation plan

### Current baseline (verified on 2026-04-27)

**Build:**
- `npm run build` passes on the current branch

**Lint baseline:**
- known warnings:
  - `scripts/scan-deals.mjs:210` unused `existing`
  - `src/app/layout.tsx:4` unused `Breadcrumbs`
  - `src/components/PostHogProvider.tsx:5` unused `useRef`
- known errors:
  - `src/components/StreakBadge.tsx:16` `react-hooks/set-state-in-effect`
  - `src/hooks/useProgress.ts:49` `react-hooks/set-state-in-effect`

### Required validation for this redesign

After each major phase:
1. Run `npm run build`.
2. Run `npm run lint` and ensure no new issues were introduced beyond the baseline above.
3. Run a scripted integrity check covering:
   - duplicate slugs
   - duplicate IDs
   - missing prerequisite / next-step references
   - quiz result links pointing to non-existent techniques
   - cross-discipline references that are not explicitly whitelisted
   - progress/bookmark keys still resolving to real techniques
4. Run a local dev server on a non-conflicting port.
5. Manually verify:
   - `/`
   - `/quiz`
   - `/about`
   - `/techniques?discipline=ski`
   - `/techniques?discipline=snowboard`
   - one ski detail page
   - one snowboard detail page
   - `/progress`
6. Do a visual browser pass to confirm:
   - snowboard support is visible above the fold
   - discipline switching updates the right modules
   - cards/badges/copy stay coherent
   - no ski-only dead ends are presented as snowboard-ready

---

## Out of scope for this pass

- Separate `/ski` and `/snowboard` route trees
- Accounts, saved progress per discipline, or backend personalization
- Park/trick taxonomy beyond the initial snowboard starter library
- Rewriting every evergreen content page into deep dual-discipline form on day one

---

## Definition of done

This redesign is complete when:
- snowboarders can identify TurnLab as relevant within seconds of landing on `/`
- the nav and footer expose snowboard as a first-class entry point
- the quiz branches correctly by discipline
- the technique library filters correctly by discipline
- detail pages clearly indicate discipline and preserve progression integrity
- metadata and copy no longer misrepresent TurnLab as ski-only
- a real starter snowboard curriculum exists and is surfaced in the UX
