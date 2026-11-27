# TurnLab improvement backlog

The daily improvement job (Hermes `daily-skisharp-website-improvement`, 09:00)
works through this list top-down: **one item per run**. When it ships an item it
checks it off in the same commit, like `- [x] speed-control: 2026-10-02 (abc1234)`.
Reorder, add or delete items any time; the job always takes the first unchecked
item it can complete safely.

## A. Full written guides (highest value)

Each item is a technique slug that has no long-form guide yet. The job writes
`src/data/guides/<slug>.ts`, registers it in `src/data/guides/index.ts`, and must
get an independent fact-check before shipping (see the job prompt). Reordered
2026-11-17 for the season start: four first-day essentials (getting off the
chairlift, emergency stop, kick turn, linked turns), then by level (green, blue,
black) and difficulty, with snowboard guides interleaved.

- [x] speed-control: 2026-10-01
- [x] snowboard-athletic-stance: 2026-10-02
- [x] snowplow-stop: 2026-10-03
- [x] sideslipping: 2026-10-04
- [x] snowboard-side-slipping: 2026-10-05
- [x] switch-skiing: 2026-10-06
- [x] spring-corn-snow: 2026-10-08
- [x] getting-up: 2026-10-09
- [x] snowboard-speed-control: 2026-10-10
- [x] chairlift-basics: 2026-10-11
- [x] snowboard-chairlift-basics: 2026-10-12
- [x] athletic-stance: 2026-11-17
- [x] chairlift-unloading: 2026-11-18
- [x] emergency-stop: 2026-11-20
- [x] kick-turn: 2026-11-23
- [x] linked-turns: 2026-11-24
- [x] snowboard-one-foot-riding: 2026-11-25
- [ ] side-stepping
- [ ] snowboard-flat-base-awareness
- [ ] pizza-to-french-fries
- [ ] traverse-technique
- [ ] skating-on-skis
- [ ] j-turn
- [ ] balance-drills
- [ ] snowplow-to-parallel
- [ ] cat-track-skiing
- [ ] wedge-christie
- [ ] stem-christie
- [ ] fall-line-awareness
- [ ] edge-control-basics
- [ ] snowboard-garlands
- [ ] long-radius-turns
- [ ] fore-aft-balance
- [ ] weight-transfer
- [ ] flat-light-skiing
- [ ] night-skiing
- [ ] outside-ski-pressure
- [ ] short-turns
- [ ] snowboard-basic-carving
- [ ] pole-plant-timing
- [ ] snowboard-switch-basics
- [ ] terrain-park-basics
- [ ] hip-angulation
- [ ] upper-lower-separation
- [ ] skidded-to-carved
- [ ] turn-shape
- [ ] inside-ski-steering
- [ ] one-ski-drill
- [ ] short-radius-turns
- [ ] snowboard-variable-snow-basics
- [ ] edge-pressure
- [ ] bump-absorption
- [ ] hop-turns
- [ ] step-turns
- [ ] retraction-turns
- [ ] steep-skiing
- [ ] powder-entry
- [ ] dynamic-carving

## B. Small site fixes

Used when an A item can't be completed safely in a run (for example the
independent fact-check is unavailable), or once A is done.

- [x] Stale counts: five NextSteps blurbs say "30+" technique guides; there are 78 (equipment-guide, slope-ratings, snow-conditions, clothing-guide, resorts). Derive the number from `techniques.length` instead of hardcoding it: 2026-10-01
- [x] /snow-conditions skips heading levels (H2 then H4, seven times). Make the condition sub-labels h3, keeping their current look: 2026-10-01
- [x] /conditions-match: axe reports a heading-order violation (H1 followed by H3 before a condition is chosen). Fix the level without changing the visuals.: 2026-11-19
- [x] Quiz accessibility: after answering with the keyboard, focus drops to <body>. Move focus to the next question heading, and give the progress bar role="progressbar" with aria-valuenow/min/max (src/app/quiz/page.tsx).: 2026-11-21
- [x] Small brown eyebrow text `text-[#a56f43]` reads 4.07:1 on the cream background (25 uses, homepage and /deals). Switch small-text uses to `text-[#8b5f39]` (already mapped in dark mode); leave large headings alone.: 2026-11-22
- [x] Footer contrast: eyebrow `text-[#9a8471]` (3.11:1) and copyright `text-[#8b7b6d]` (3.57:1) on `#f5efe9`. Darken both to at least 4.5:1 and keep the html.dark overrides working.: 2026-11-26
- [x] The homepage hero image (images.unsplash.com, 1100x1320) gets preloaded on every page because the router prefetches "/". Stop that (for example prefetch={false} on links to "/") and confirm with a network capture that /deals no longer downloads it.: 2026-11-27

## C. Needs Search Console data

Skip until `scripts/gsc-report.py` produces a report again (it needs the
service-account key at ~/.config/turnlab/gsc/service_account.json).

- [ ] From the newest report in ~/.hermes/cron/output/gsc-report-*.md, rewrite the title and meta description of the page with the most impressions and a CTR under 1%.

## D. Not for the daily job

Bigger or riskier work that needs a planned session with a human.

- Slim the client-side technique data: client hooks import all of src/data/techniques.ts, so every technique page ships every technique's text as JavaScript.
- Content-Security-Policy, starting as Report-Only.
- Reddit as a deals/news source (needs Reddit API approval).
