# TurnLab improvement backlog

The daily improvement job (Hermes `daily-skisharp-website-improvement`, 09:00)
works through this list top-down: **one item per run**. When it ships an item it
checks it off in the same commit, like `- [x] speed-control: 2026-10-02 (abc1234)`.
Reorder, add or delete items any time; the job always takes the first unchecked
item it can complete safely.

## A. Full written guides (highest value)

Each item is a technique slug that has no long-form guide yet. The job writes
`src/data/guides/<slug>.ts`, registers it in `src/data/guides/index.ts`, and must
get an independent fact-check before shipping (see the job prompt). Ordered by
search demand and the beginner progression, with snowboard guides interleaved.

- [x] speed-control: 2026-10-01
- [x] snowboard-athletic-stance: 2026-10-02
- [x] snowplow-stop: 2026-10-03
- [x] sideslipping: 2026-10-04
- [x] snowboard-side-slipping: 2026-10-05
- [x] switch-skiing: 2026-10-06
- [x] spring-corn-snow: 2026-10-08
- [x] getting-up: 2026-10-09
- [ ] snowboard-speed-control
- [ ] chairlift-basics
- [ ] snowboard-chairlift-basics
- [ ] athletic-stance
- [ ] short-turns
- [ ] snowboard-basic-carving
- [ ] pole-plant-timing
- [ ] edge-control-basics
- [ ] snowboard-one-foot-riding
- [ ] kick-turn
- [ ] side-stepping
- [ ] traverse-technique
- [ ] snowboard-garlands
- [ ] short-radius-turns
- [ ] long-radius-turns
- [ ] snowboard-switch-basics
- [ ] skating-on-skis
- [ ] j-turn
- [ ] snowboard-variable-snow-basics
- [ ] fore-aft-balance
- [ ] weight-transfer
- [ ] snowboard-flat-base-awareness
- [ ] flat-light-skiing
- [ ] steep-skiing
- [ ] bump-absorption
- [ ] powder-entry
- [ ] terrain-park-basics
- [ ] night-skiing
- [ ] dynamic-carving
- [ ] hip-angulation
- [ ] upper-lower-separation
- [ ] skidded-to-carved
- [ ] snowplow-to-parallel
- [ ] pizza-to-french-fries
- [ ] linked-turns
- [ ] emergency-stop
- [ ] chairlift-unloading
- [ ] cat-track-skiing
- [ ] wedge-christie
- [ ] stem-christie
- [ ] balance-drills
- [ ] fall-line-awareness
- [ ] edge-pressure
- [ ] turn-shape
- [ ] inside-ski-steering
- [ ] outside-ski-pressure
- [ ] hop-turns
- [ ] step-turns
- [ ] one-ski-drill
- [ ] retraction-turns

## B. Small site fixes

Used when an A item can't be completed safely in a run (for example the
independent fact-check is unavailable), or once A is done.

- [x] Stale counts: five NextSteps blurbs say "30+" technique guides; there are 78 (equipment-guide, slope-ratings, snow-conditions, clothing-guide, resorts). Derive the number from `techniques.length` instead of hardcoding it: 2026-10-01
- [x] /snow-conditions skips heading levels (H2 then H4, seven times). Make the condition sub-labels h3, keeping their current look: 2026-10-01
- [ ] /conditions-match: axe reports a heading-order violation (H1 followed by H3 before a condition is chosen). Fix the level without changing the visuals.
- [ ] Quiz accessibility: after answering with the keyboard, focus drops to <body>. Move focus to the next question heading, and give the progress bar role="progressbar" with aria-valuenow/min/max (src/app/quiz/page.tsx).
- [ ] Small brown eyebrow text `text-[#a56f43]` reads 4.07:1 on the cream background (25 uses, homepage and /deals). Switch small-text uses to `text-[#8b5f39]` (already mapped in dark mode); leave large headings alone.
- [ ] Footer contrast: eyebrow `text-[#9a8471]` (3.11:1) and copyright `text-[#8b7b6d]` (3.57:1) on `#f5efe9`. Darken both to at least 4.5:1 and keep the html.dark overrides working.
- [ ] The homepage hero image (images.unsplash.com, 1100x1320) gets preloaded on every page because the router prefetches "/". Stop that (for example prefetch={false} on links to "/") and confirm with a network capture that /deals no longer downloads it.

## C. Needs Search Console data

Skip until `scripts/gsc-report.py` produces a report again (it needs the
service-account key at ~/.config/turnlab/gsc/service_account.json).

- [ ] From the newest report in ~/.hermes/cron/output/gsc-report-*.md, rewrite the title and meta description of the page with the most impressions and a CTR under 1%.

## D. Not for the daily job

Bigger or riskier work that needs a planned session with a human.

- Slim the client-side technique data: client hooks import all of src/data/techniques.ts, so every technique page ships every technique's text as JavaScript.
- Content-Security-Policy, starting as Report-Only.
- Reddit as a deals/news source (needs Reddit API approval).
