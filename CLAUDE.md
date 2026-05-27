# BASE Fitness App — Claude Agent Guide

This repo is a **single-file interactive prototype** of BASE, a fitness app that spends 2 weeks learning your body before building your training plan.

## What this is

`index.html` is the entire app — a self-contained React prototype that runs directly in the browser (no build step, no Node, no npm). Open it and it works.

All React components, CSS, and data live inline in the `<script type="text/babel">` block. Babel transpiles JSX in the browser at load time.

## Brand & design rules

| Token | Value | Notes |
|-------|-------|-------|
| Brand teal | `#1D9E75` (var `BC`) | Primary color — buttons, highlights, rings |
| Teal soft | `#E8F7F2` (var `BCS`) | Tinted backgrounds for selected/active states |
| Teal hover | `#178A64` (var `BCH`) | Hover/darker teal |
| Font | Inter (Google Fonts) | 400/500/600/700/800 weights used |
| Phone frame | 393×852px | Simulates an iPhone 15 Pro |
| Easing | `cubic-bezier(0.32, 0.72, 0, 1)` | Apple-style spring, used throughout |

Design rules:
- **No gradients** as backgrounds. The only gradients are decorative circles (opacity 0.05–0.07)
- **Flat, clean** — surfaces are white or `#F5F5F2`, separated by spacing not color
- **Teal brand color only** for active states, progress, and primary CTAs
- Dark card (`#1A1A1A`) used for the workout card on Home and the quote card on Recap
- Border: `1px solid rgba(0,0,0,.06)` on cards; `1.5px solid` for interactive element borders

## App structure

7 screens, all in `index.html`:

```
OnboardingScreen      → 5 sub-steps: Intro, Experience, Goal, Generating, PlanReveal
WorkoutScreen         → prescribed exercises + set tracking + body check-in sheet
HomeScreen            → readiness ring, stats row, workout card, Base Camp progress
StatsScreen           → bio age hero, stats grid, milestone track, personal records
RecapScreen           → weekly hero, consistency stats, quote, share button
ActivityScreen        → detected run summary, body map check-in
WeightsScreen         → AI weight recommendations per exercise, Accept/Adjust
```

Navigation flow:
- `onboarding` → `workout` → `home` (main loop)
- `home` → `weights` (tap workout card)
- `home` → `activity` (notification banner, appears after 3s)
- `home` → `stats` or `recap` (quick-link buttons)
- Any screen → back via `back()` or tab bar via `navTab()`

## Shared components (reuse these, don't reinvent)

| Component | Purpose |
|-----------|---------|
| `StatusBar` | Top status bar with live clock + battery/signal icons |
| `TopBar` | Navigation bar with optional back button, title, right slot |
| `TabBar` | Bottom tab bar — home, workout, stats, profile |
| `BtnP` | Primary button (teal fill) |
| `BtnS` | Secondary button (teal outline) |
| `BtnG` | Ghost button (no border, gray text) |
| `Ring` | Circular progress ring (SVG) |
| `StatCard` | Stats tile with label, value, unit, sub-label |
| `Sheet` | Bottom sheet modal with scrim |
| `Chip` | Pill button for tag/filter selection |
| `BodyMap` | Anatomical SVG body map with muscle/joint modes |
| `Stepper` | +/− weight input control |
| `SelectCard` | Tappable card with radio indicator (used in onboarding) |

## Body map

The `BodyMap` component takes:
- `activated` — array of muscle/joint IDs to highlight in light teal
- `sore` — array of muscle/joint IDs to highlight in brand teal (darker)
- `onToggle` — callback when user taps a region
- `view` — `'front'` | `'back'`
- `mode` — `'muscles'` | `'joints'`

Muscle IDs (front): `chest`, `shoulders`, `arms`, `core`, `quads`, `calves`  
Muscle IDs (back): `back`, `triceps`, `lower_back`, `glutes`, `hamstrings`, `calves`  
Joint IDs: `shoulder`, `elbow`, `wrist`, `hip`, `knee`, `ankle`

## Workout data

`DAY1_WORKOUTS` has 4 plans keyed by experience level: `beginner`, `novice`, `intermediate`, `advanced`.

Each exercise has: `id`, `name`, `sets`, `reps`, `wt` (starting weight), `unit` (`'lbs'` or `'BW'`), `muscles` (array of muscle IDs that light up on the body map), `tip` (form cue shown in card).

## Tweaks panel

The gear icon (top-right) opens a dev panel to:
- Jump directly to any screen
- Switch user name (Alex / Jordan / Sam)
- Change experience level (swaps the workout live)
- Slide Base Camp day 1–14

This is for prototyping only — not part of the real app UI.

## How to make changes

**Adding a new screen:**
1. Write a new `function XxxScreen({onBack, nav, ...props})` component
2. Add it to the `screens` object in `App()`
3. Add a navigation entry to `screenLabels` (shows in the pill)
4. Wire up navigation from wherever it should be triggered

**Changing workout data:**
Edit `DAY1_WORKOUTS` — add exercises, change sets/reps/weights, update muscle arrays.

**Changing brand color:**
Only change `BC`, `BCS`, `BCH` at the top of the script — they're used everywhere via these constants.

**Adding a new stat to Home:**
Add a `<StatCard>` to the stats row. Keep it to 3 cards max — the row wraps badly beyond that.

## CSS animation classes

| Class | Effect |
|-------|--------|
| `.su` | Slide up + fade in (360ms) — for content entering a screen |
| `.fi` | Fade in (280ms) — for content swaps |

Keyframes: `fadeIn`, `slideUp`, `riseUp` (for sheets), `dropIn` (for notification banner).

## What NOT to do

- Don't split into multiple files unless setting up a proper build tool — the inline single-file approach is intentional for simplicity
- Don't add npm packages or a build step without updating this guide
- Don't hardcode colors — use `BC`, `BCS`, `BCH` variables or CSS custom properties
- Don't add a `dark mode` — the design is light-only
- Don't use emoji in the app UI (user-generated content is fine)
