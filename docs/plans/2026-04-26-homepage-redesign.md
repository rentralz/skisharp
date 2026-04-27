# Homepage Redesign Implementation Plan

> **For Hermes:** Implement directly in the TurnLab repo with visual validation after build.

**Goal:** Redesign the homepage so it feels focused, premium, and useful on first visit, while removing duplication and the crowded sidebar feel found in the live audit.

**Architecture:** Keep the homepage as a server component in `src/app/page.tsx`, but simplify it into a single-column editorial layout with a stronger hero, one Learning Paths section, richer featured-technique cards, and a clear CTA band. Lightly polish the shared footer so the bottom of the page feels more intentional.

**Tech Stack:** Next.js 16 app router, React 19, Tailwind v4 utility classes, local technique data from `src/data/techniques.ts`.

---

### Task 1: Replace the split homepage layout with a focused single-column structure

**Objective:** Remove the busy right sidebar and duplicate content, then establish a clearer visual hierarchy.

**Files:**
- Modify: `src/app/page.tsx`

**Implementation notes:**
- Keep `Navbar` and `Footer`.
- Replace the current `lg:grid lg:grid-cols-[1fr_300px]` layout with a single-column content flow.
- Build these sections in order:
  1. Hero with stronger headline, one primary CTA, one secondary CTA, and a balanced image panel
  2. Compact proof/metrics cards
  3. “Why TurnLab works” value-prop cards
  4. One Learning Paths section only
  5. Featured technique cards with richer previews
  6. Final CTA band
- Remove homepage gear widgets, quick tools, duplicate learning paths, and the existing right sidebar.

**Verification:**
- `npm run build`
- Load `/` locally and confirm only one Learning Paths section exists above the fold.

### Task 2: Upgrade content density and scanability of featured content

**Objective:** Make the homepage lower sections feel more polished and editorial.

**Files:**
- Modify: `src/app/page.tsx`

**Implementation notes:**
- Derive accurate live stats from `techniques`:
  - total techniques
  - total videos
  - unique source channels
- Sort or select recent techniques using `updatedAt` so “Latest” actually reads like fresh content.
- Convert the current thin latest-techniques list into larger cards with:
  - thumbnail
  - difficulty badge
  - updated date
  - title
  - promise/description
  - source channel or terrain metadata
- Improve text contrast and spacing to avoid washed-out sections.

**Verification:**
- `npm run build`
- Visually inspect the lower half of the homepage for better spacing and legibility.

### Task 3: Lightly polish the shared footer

**Objective:** Make the footer feel less generic and more connected to the homepage experience.

**Files:**
- Modify: `src/components/Footer.tsx`

**Implementation notes:**
- Keep the existing link groups, but improve hierarchy and layout.
- Add a short brand CTA or “start here” action in the brand column.
- Increase visual contrast and spacing so the footer feels designed rather than default.

**Verification:**
- `npm run build`
- Confirm footer still works cleanly on `/`, `/about`, and `/quiz`.

### Task 4: Validate with local build and browser audit

**Objective:** Confirm the redesign works technically and visually.

**Files:**
- No source changes expected unless fixes are required.

**Verification steps:**
1. Run `npm run build`.
2. Run `npm run lint` and compare against the known baseline issues.
3. Start or reuse a local dev server.
4. Visually inspect `/` in the browser for:
   - reduced clutter
   - no duplicate Learning Paths
   - clearer CTA hierarchy
   - stronger footer presentation
5. Re-check `/about` or `/quiz` if the footer changed globally.
