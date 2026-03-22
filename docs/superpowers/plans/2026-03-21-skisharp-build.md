# SkiSharp Build Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build SkiSharp, a curated skiing technique knowledge hub with video embeds, technique cards, and detail pages.

**Architecture:** Next.js 16 App Router with React 19. Static data in `src/data/techniques.ts`. Server Components by default; `'use client'` only on VideoEmbed (IntersectionObserver + useState) and techniques listing page (filter state). Dynamic route `[slug]` awaits params as Promise per Next.js 16 API.

**Tech Stack:** Next.js 16.2.1, React 19, Tailwind CSS 4, TypeScript

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/data/techniques.ts` | Create | All technique data + TypeScript types |
| `src/components/DifficultyBadge.tsx` | Create | Colored dot + label (Server Component) |
| `src/components/TechniqueCard.tsx` | Create | Card with gradient thumbnail, badges (Server Component) |
| `src/components/VideoEmbed.tsx` | Create | Lazy YouTube embed with tab switching (Client Component) |
| `src/app/globals.css` | Modify | Add SkiSharp color tokens to @theme |
| `src/app/layout.tsx` | Modify | Inter font, SkiSharp metadata |
| `src/app/page.tsx` | Replace | Homepage: nav, hero, learning paths, techniques grid, footer |
| `src/app/techniques/page.tsx` | Create | All techniques with filter buttons (Client Component) |
| `src/app/techniques/[slug]/page.tsx` | Create | Detail page with VideoEmbed, timestamps, mistakes, next steps |

---

### Task 1: Data layer — `src/data/techniques.ts`
- [ ] Write TypeScript interfaces and 5 technique objects

### Task 2: `src/components/DifficultyBadge.tsx`
- [ ] Server Component with colored dot + label by difficulty range

### Task 3: `src/components/TechniqueCard.tsx`
- [ ] Server Component: gradient thumbnail, play overlay, DifficultyBadge, terrain tags, video count

### Task 4: `src/components/VideoEmbed.tsx`
- [ ] Client Component: IntersectionObserver lazy load, nocookie domain, poster image, tab switching, channel attribution

### Task 5: `src/app/globals.css`
- [ ] Add @theme block with SkiSharp color variables

### Task 6: `src/app/layout.tsx`
- [ ] Replace Geist with Inter, update metadata

### Task 7: `src/app/page.tsx`
- [ ] Full homepage: sticky nav, hero, learning paths, featured techniques, footer

### Task 8: `src/app/techniques/page.tsx`
- [ ] All techniques grid with difficulty/terrain filter buttons

### Task 9: `src/app/techniques/[slug]/page.tsx`
- [ ] Detail page: VideoEmbed, timestamps, feels, mistakes, next steps, generateStaticParams

### Task 10: Verify build
- [ ] Run `npm run build` and fix any errors
