# Inspirational Quotes

A modern quote app built with **React + Vite + Tailwind**. Pick a mood and get an
inspirational quote with a matching background image and ambient music.

- **Moods** — Motivational, Spiritual, Wisdom, Happiness, Love, Success.
- **Dynamic quotes** — fetched live by category, with 100 built-in quotes as an
  offline fallback.
- **Relevant imagery** — a fitting Unsplash photo per mood (gradient fallback).
- **Ambient music** — a generated per-mood soundscape (Web Audio, no files) with play/pause and volume.
- Animated, responsive, and `prefers-reduced-motion` aware.

## Getting started

```bash
npm install
cp .env.example .env.local   # then add your API keys (optional)
npm run dev
```

Open http://localhost:5173.

### API keys (optional)

The app works with no keys (local quotes + gradient backgrounds). For live
quotes and photos, add to `.env.local`:

- `VITE_QUOTES_API_KEY` — free key from https://api-ninjas.com/
- `VITE_UNSPLASH_ACCESS_KEY` — "Access Key" from https://unsplash.com/developers

> Note: as a static client-side app, these keys are visible in the built bundle.
> That's fine for personal use; use a serverless proxy if you need them secret.

### Music

The ambient music is **generated in the browser** with the Web Audio API
(`src/services/ambientAudio.js`) — a mood-specific pad plus drifting bell
notes. There are no audio files to download or host; each mood has its own
tuned soundscape. Playback starts on first interaction (browser autoplay
policy).

## Build

```bash
npm run build     # → dist/
npm run preview   # serve the production build
```

## How it works

`src/config/categories.js` is the single source of truth: each mood maps to a
quote category, an image query, a music track, and colors. See `CLAUDE.md` for
the full architecture.
