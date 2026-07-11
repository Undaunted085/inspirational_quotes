# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies (first run).
- `npm run dev` — Vite dev server at http://localhost:5173.
- `npm run build` — static production build into `dist/`.
- `npm run preview` — serve the built `dist/` locally.

No test suite or linter is configured. Copy `.env.example` to `.env.local` and add API keys before running (the app still works without them via fallbacks).

## Architecture

A React 18 + Vite + Tailwind single-page app that shows an inspirational quote for a chosen **mood**, with a matching Unsplash background and a generated per-mood ambient soundscape. Client-side only; no backend.

**`src/config/categories.js` is the single source of truth.** It exports the list of moods, each mapping `{ id, label, emoji, apiCategory, imageQuery, accent, gradient }`. The category picker and image fetch read from it — add or change a mood here and it flows through the whole app. (`apiCategory` is currently unused — see the quotes note below. Synth presets for the audio live separately in `services/ambientAudio.js`, keyed by the same ids.)

Data flow (state lives in `src/App.jsx`):

1. `App` holds `categoryId` (default from `DEFAULT_CATEGORY_ID`) and a `startSignal` counter.
2. `CategoryPicker` sets `categoryId`.
3. `useQuote(categoryId)` (in `src/hooks/`) fetches a quote **and** image in parallel and reloads on category change or when `refresh()` is called. "New Quote" calls `refresh()` and bumps `startSignal`.
4. `MusicPlayer` drives `services/ambientAudio.js` (a Web Audio synth, no files); `setMood(categoryId)` swaps the soundscape per category. Playback only starts from a user gesture (play button, or the `startSignal` bump on first "New Quote") per browser autoplay policy. Volume/mute persist to `localStorage`.

**Graceful degradation is intentional and load-bearing** — the app must work with no keys and no network:

- `src/services/quotes.js` fetches an **unfiltered random quote** from API Ninjas (`X-Api-Key`). The `category` param is premium-only, so **live quotes are not mood-matched** — the mood picker drives image + music only. (Re-add `?category=<getCategory(id).apiCategory>` if the plan is upgraded to premium.) On any failure (no key, network, rate limit, empty) it falls back to `src/data/fallbackQuotes.js` — the original 100 quotes tagged by mood. `getFallbackQuote` falls back to the whole pool when a mood has no local matches, so a quote always returns.
- `src/services/images.js` returns `null` on any failure, and `BackgroundImage` renders the category's CSS `gradient` instead.
- `src/services/ambientAudio.js` generates the music with the Web Audio API — no files, no network, no licensing. The `AudioContext` is created lazily inside `start()` (called only from a user gesture).

When changing fetch/fallback logic, preserve the "always returns something usable" contract — invalid key / offline must still render quotes and a gradient.

## Env / keys

`.env.local` (gitignored): `VITE_QUOTES_API_KEY` (API Ninjas) and `VITE_UNSPLASH_ACCESS_KEY` (Unsplash "Access Key"). Being a static client-side app, these are visible in the browser bundle — acceptable for a personal project; a serverless proxy would be needed to keep them secret.
