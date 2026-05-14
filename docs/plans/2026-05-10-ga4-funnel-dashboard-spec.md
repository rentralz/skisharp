# TurnLab GA4 Funnel Dashboard Spec

> **For Hermes:** Build the first reporting pass in GA4 + Search Console without adding more tracking code unless a decision in this spec cannot be answered from the current event set.

**Goal:** Give TurnLab a practical analytics layer that answers three product questions: how SEO visitors land, how they move through learning funnels, and whether `/deals` is earning trust and clicks.

**Architecture:** Use the existing GA4 property (`G-E743BB5M81`) as the primary behavior source, pair it with Google Search Console for acquisition/query visibility, and organize reporting into a small set of decision-focused dashboards instead of one giant event dump. The current codebase already emits enough funnel events for a strong phase-one dashboard; the main missing step is report configuration plus a small set of GA4 custom dimensions/metrics.

**Tech Stack:** Next.js 16 app router, GA4 via `gtag`, current client event helpers in `src/lib/analytics.ts`, Search Console for index/query/CTR data.

---

## 1) Current measurement baseline

### Verified live prerequisites
- `https://turnlab.co/robots.txt` returns `200` and references `https://turnlab.co/sitemap.xml`.
- `https://turnlab.co/sitemap.xml` returns `200` and includes the major site routes, including `/deals`, `/quiz`, `/conditions-match`, `/progress`, and technique detail pages.
- Search Console HTML verification is already live on production.

### Known Search Console blocker
- Actual sitemap submission and index coverage review still require an authenticated Google Search Console session for the `turnlab.co` property.
- Browser check from this session hit the Google sign-in screen before the Search Console property page.

### Current event coverage already in the codebase

**Global / pageview**
- `page_view` with `page_title`, `page_location`, `page_path`
- query-string changes are tracked, so filtered pages can be analyzed by URL state

**Techniques discovery**
- `techniques_library_view`
- `techniques_filter_change`
- `techniques_filter_clear`
- `technique_card_click`

**Quiz funnel**
- `quiz_start`
- `quiz_answer_select`
- `quiz_complete`
- `quiz_restart`
- `quiz_change_discipline`
- `quiz_result_technique_click`

**Conditions-match funnel**
- `conditions_match_select`
- `conditions_match_result_click`
- `conditions_match_fallback_click`

**Progress / retention**
- `technique_progress_toggle`
- `technique_bookmark_toggle`
- `progress_saved_technique_click`
- `progress_saved_remove_click`
- `progress_practiced_technique_click`
- `progress_practiced_undo_click`
- `progress_empty_state_cta_click`

**Deals / monetization**
- `deals_page_impression`
- `deals_scroll_depth`
- `deals_section_view`
- `deals_hero_cta_click`
- `deals_hero_quick_path_click`
- `deals_top_pick_spotlight_click`
- `deals_featured_click`
- `deals_retailer_shortcut_click`
- `deals_category_shortcut_click`
- `deals_guide_click`
- `deals_alert_signup_attempt`
- `deals_alert_signup_result`

---

## 2) Business questions the dashboard must answer

### SEO / acquisition
1. Which landing pages bring the most organic sessions?
2. Which organic landing pages have weak engagement or weak downstream intent?
3. Which pages have high impressions but low CTR in Search Console and need title/meta/hero changes?
4. Does `/deals` attract useful search traffic or mostly bounce-level curiosity traffic?

### Learning product / UX
1. Do visitors discover the techniques library and actually click into techniques?
2. Which filters reduce result friction versus creating dead ends?
3. Does the quiz produce technique-detail clicks, or do users finish without taking the next step?
4. Does the conditions matcher act as a shortcut or just a novelty tool?
5. Are bookmarks / practiced actions acting like a real retention signal?

### Deals / revenue UX
1. Do `/deals` visitors reach the hero, trust blocks, and section-level content before clicking out?
2. Which click paths outperform: hero CTA, quick paths, featured deals, retailer shortcuts, or category shortcuts?
3. Does the page earn email signup attempts and successful submissions?
4. Are “curated first, monetized second” changes improving click quality rather than just raw outbound volume?

---

## 3) GA4 setup required before the dashboard is useful

### A. Mark these events as key events (conversions)
Use GA4 Admin → Data display / Events / Key events and mark these as conversions:
- `quiz_complete`
- `quiz_result_technique_click`
- `conditions_match_result_click`
- `technique_bookmark_toggle` (only analyze `next_state=save_bookmark` as the positive action)
- `technique_progress_toggle` (only analyze `next_state=mark_practiced` as the positive action)
- `deals_alert_signup_result` (only analyze `signup_status=success` as the positive action)
- `deals_hero_cta_click`
- `deals_hero_quick_path_click`
- `deals_top_pick_spotlight_click`
- `deals_featured_click`
- `deals_retailer_shortcut_click`
- `deals_category_shortcut_click`

### B. Register event-scoped custom dimensions
Create these first so report filters and breakdowns work in the GA4 UI:
- `discipline`
- `result_level`
- `result_rating`
- `question_id`
- `filter_type`
- `selected_value`
- `selected_condition`
- `section_name`
- `section_id`
- `cta_variant`
- `cta_label`
- `category`
- `category_label`
- `source`
- `signup_status`
- `next_state`
- `surface`
- `scan_recency_bucket`
- `is_external`
- `destination_host`
- `destination_path`

### C. Register custom metrics where useful
These help with deeper QA/debug analysis in Explorations:
- `results_count`
- `results_before_change`
- `total_questions`
- `question_index`
- `answer_points`
- `score`
- `recommended_techniques`
- `percent_scrolled`
- `featured_community_count`
- `retailer_shortcut_count`
- `affiliate_shortcut_count`
- `hours_since_last_scan`
- `deal_age_hours`
- `card_position`
- `terrain_count`
- `bookmarked_count`
- `practiced_count`
- `current_streak`

### D. Search Console integration rules
Use Search Console for:
- queries
- impressions
- CTR
- average position
- indexing coverage
- sitemap status

Use GA4 for:
- sessions
- engaged sessions
- downstream page flow
- outbound click behavior
- signup attempts / completions
- filter and funnel usage

Do **not** try to answer search-query questions from GA4 alone.

---

## 4) Recommended dashboard structure

## Dashboard 1 — Executive overview
**Purpose:** one screen for “is the site getting healthier?”

### KPIs
- Users
- Sessions
- Engaged sessions
- Engagement rate
- Organic sessions
- Quiz completions
- Technique detail clicks
- Bookmark saves
- Practiced marks
- Deals outbound clicks
- Deals signup successes

### Breakdowns
- By landing page group:
  - homepage
  - techniques library
  - technique detail pages
  - quiz
  - conditions match
  - deals
  - guides (`/clothing-guide`, `/equipment-guide`, `/budget-gear`)
- By device category
- By source / medium

### Primary decision use
- Spot whether growth is coming from useful pages or vanity traffic.

---

## Dashboard 2 — SEO + landing quality
**Purpose:** connect search acquisition to on-site behavior.

### Search Console widgets
- Top queries by impressions / clicks / CTR / average position
- Top landing pages by impressions / clicks / CTR
- Pages with high impressions + below-site-average CTR
- Newly indexed vs excluded pages

### GA4 companion widgets
- Organic landing pages by sessions
- Organic landing pages by engagement rate
- Organic landing pages by key-event rate
- Landing pages with high sessions but low technique/deals next-step rate

### Must-have segments
- Organic traffic only
- Mobile organic only
- `/deals` landing traffic only
- Technique-detail landing traffic only

### Decisions this should drive
- Rewrite title/meta for pages with impression volume but weak CTR.
- Improve above-the-fold copy on pages with traffic but weak downstream action.
- Prune / consolidate weak pages if they get impressions but no engagement.

---

## Dashboard 3 — Learning funnel dashboard
**Purpose:** understand whether users move from discovery to a specific technique.

### Funnel A: techniques library
**Entry signal:** `techniques_library_view`

**Core charts**
- `techniques_library_view` volume over time
- `techniques_filter_change` by `filter_type`
- `techniques_filter_clear` rate
- `technique_card_click` volume and click-through rate from library visits
- `technique_card_click` by:
  - `discipline`
  - `rating`
  - `card_position`
  - `listing_discipline_filter`
  - `listing_rating_filter`
  - `listing_terrain_filter`

**Key derived metrics**
- Technique library clickthrough rate = `technique_card_click / techniques_library_view`
- Filter usage rate = `techniques_filter_change / techniques_library_view`
- Dead-end filter rate = filter changes that correlate with low detail-click continuation

### Funnel B: quiz
**Entry signal:** pageview on `/quiz`

**Core charts**
- `/quiz` pageviews
- `quiz_start` by `discipline`
- `quiz_complete` by `discipline`, `result_level`, `result_rating`
- completion rate = `quiz_complete / quiz_start`
- `quiz_result_technique_click` by `result_level`
- restart/change-discipline rates via `quiz_restart` and `quiz_change_discipline`

**Key decisions**
- If starts are high but completions are low, reduce friction or question count.
- If completions are high but result-clicks are low, strengthen the result CTA and previews.

### Funnel C: conditions matcher
**Entry signal:** pageview on `/conditions-match`

**Core charts**
- `conditions_match_select` by `selected_condition`
- `conditions_match_result_click` by `selected_condition`
- `conditions_match_fallback_click`

**Key derived metrics**
- Matcher clickthrough rate = `conditions_match_result_click / conditions_match_select`
- Fallback dependency rate = `conditions_match_fallback_click / conditions_match_select`

### Funnel D: retention intent
**Core charts**
- `technique_bookmark_toggle` filtered to `next_state=save_bookmark`
- `technique_progress_toggle` filtered to `next_state=mark_practiced`
- `progress_saved_technique_click`
- `progress_practiced_technique_click`
- `progress_empty_state_cta_click` by `cta_target`

**What this answers**
- Whether technique pages are generating genuine return intent, not just single-session content consumption.

---

## Dashboard 4 — Deals marketing + monetization dashboard
**Purpose:** measure whether `/deals` builds trust, gets real engagement, and produces quality clicks.

### Stage 1: page quality and attention
**Entry signal:** pageview on `/deals` plus `deals_page_impression`

**Core charts**
- `/deals` pageviews and users
- `deals_page_impression`
- `deals_scroll_depth` by `percent_scrolled`
- `deals_section_view` by `section_name`
- `deals_page_impression` breakdowns by:
  - `has_featured_community_deals`
  - `deal_alerts_enabled`
  - `scan_recency_bucket`
  - `hours_since_last_scan`

**What to watch**
- High pageviews + low section depth means weak hero clarity.
- Strong hero clicks with weak lower-section views can be okay if click quality is high.
- Weak `deal_alerts_enabled` + strong signup intent means email infrastructure deserves priority.

### Stage 2: CTA performance
**Hero CTAs**
- `deals_hero_cta_click` by `cta_variant`, `cta_label`, `destination_path`

**Fast lanes**
- `deals_hero_quick_path_click` by `category`, `category_label`

**Featured content**
- `deals_top_pick_spotlight_click`
- `deals_featured_click` by `section_name`, `category`, `source`

**Shortcut behavior**
- `deals_retailer_shortcut_click`
- `deals_category_shortcut_click`
- `deals_guide_click`

### Stage 3: email capture
- `deals_alert_signup_attempt`
- `deals_alert_signup_result` by `signup_status`
- error-rate breakdowns using:
  - `has_email_error`
  - `has_interest_error`

### Key derived metrics
- Deals outbound CTR = all deals outbound click events / `/deals` pageviews
- Hero CTA CTR = `deals_hero_cta_click / /deals pageviews`
- Quick-path CTR = `deals_hero_quick_path_click / /deals pageviews`
- Email attempt rate = `deals_alert_signup_attempt / /deals pageviews`
- Email success rate = `deals_alert_signup_result(signup_status=success) / deals_alert_signup_attempt`

### Decisions this should drive
- Which above-the-fold CTA deserves visual priority
- Which category shortcuts should stay in the hero
- Whether curated community picks outperform retailer-first behavior
- Whether `/deals` is earning trust before monetization

---

## 5) Recommended segments and comparisons

Apply these segments across the dashboards:
- Organic only
- Direct only
- Returning users
- Mobile only
- Desktop only
- `/deals` landing sessions
- `/quiz` landing sessions
- Technique-detail landing sessions
- Ski vs snowboard where `discipline` is available

Use these comparisons weekly:
- last 7 days vs previous 7 days
- last 28 days vs previous 28 days
- `/deals` before hero redesign vs after hero redesign
- organic landing traffic vs all traffic

---

## 6) Weekly analysis workflow

### Monday review
1. Check Search Console impressions, CTR, and indexing changes.
2. Check GA4 landing-page engagement for organic traffic.
3. Review quiz start → completion → result-click funnel.
4. Review `/deals` pageview → scroll/section → outbound click → signup funnel.
5. Note one SEO change and one UX/CTA change to test that week.

### Example actions tied to findings
- **High impressions, weak CTR:** rewrite title/meta, sharpen SERP promise.
- **High landing sessions, weak engagement:** improve hero clarity and first CTA.
- **High quiz starts, weak completions:** simplify question flow.
- **High deals visits, weak outbound clicks:** improve trust proof and category relevance.
- **High signup attempts, weak success:** fix form UX or backend delivery.

---

## 7) What not to build yet
- Do not add a giant custom BI stack before GA4 custom dimensions are configured.
- Do not add more event spam unless a real decision cannot be answered with the current coverage.
- Do not judge SEO only by sessions; use Search Console impressions/CTR alongside GA4 engagement.

---

## 8) Immediate next steps

### Task 1: Finish Search Console setup
**Objective:** move the sitemap task from “technically ready” to “submitted and monitored.”

**Steps**
1. Sign into Google Search Console for the `turnlab.co` property.
2. Submit `https://turnlab.co/sitemap.xml`.
3. Confirm acceptance status.
4. Review Pages / Indexing coverage for obvious exclusions.
5. Record the outcome in project notes.

### Task 2: Configure GA4 admin objects
**Objective:** make the current event payloads usable in reports.

**Steps**
1. Register the custom dimensions listed in section 3B.
2. Register the custom metrics listed in section 3C.
3. Mark the key events from section 3A.
4. Wait for fresh data to populate.

### Task 3: Build the first dashboard views
**Objective:** create a practical reporting surface without extra engineering.

**Recommended order**
1. GA4 executive overview
2. GA4 learning funnel exploration
3. GA4 deals funnel exploration
4. Search Console landing/query worksheet
5. Optional Looker Studio rollup once the raw GA4 views are stable

---

## 9) Success criteria
- The team can identify the top organic landing pages, their engagement quality, and their next-step conversion behavior.
- The team can see where quiz and technique discovery leak users.
- The team can compare `/deals` hero CTAs, quick paths, and section-level engagement using real event data.
- The team can pair Search Console CTR/impression changes with on-site engagement changes instead of treating SEO and UX as separate problems.
