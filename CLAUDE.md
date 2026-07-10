# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Run the app: `node app.js`

There is no `package.json`, no build step, no linter, and no test suite in this repository — it is a single-file Node.js script with zero dependencies.

## Architecture

The entire application lives in `app.js`:

- Lines 1–402: a hardcoded array `quotes` of 100 objects (`{ id, text }`), each a short motivational quote. IDs run 1–100.
- Lines 404–408: `generateQuote(array)` picks one quote at random from the array and returns its `text`.
- Line 410: the script calls `generateQuote(quotes)` and logs the result via `console.log` — this runs immediately on execution, there is no CLI argument parsing or export surface.

Known bug: `generateQuote` uses `Math.floor(Math.random(0, 1)*100)` — `Math.random()` takes no arguments, so this produces an integer in `0–99`, while quote `id`s run `1–100`. This makes `id: 100` unreachable and causes a crash (`.text` on `undefined`) when the random value is `0`.
