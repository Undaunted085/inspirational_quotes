// Ambient music control. Playback is a generated per-mood soundscape (see
// services/ambientAudio.js) — no audio files. It only starts from a user
// gesture (play button, or the `startSignal` bump App sends on the first
// "New Quote" click) per browser autoplay policy. Volume and mute persist to
// localStorage.

import { useEffect, useRef, useState } from 'react'
import { ambient } from '../services/ambientAudio.js'

const VOLUME_KEY = 'iq_volume'
const MUTED_KEY = 'iq_muted'

function readNumber(key, fallback) {
  const v = parseFloat(localStorage.getItem(key))
  return Number.isFinite(v) ? v : fallback
}

export default function MusicPlayer({ categoryId, accent, startSignal }) {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(() => readNumber(VOLUME_KEY, 0.5))
  const [muted, setMuted] = useState(
    () => localStorage.getItem(MUTED_KEY) === 'true',
  )
  const startedRef = useRef(false)
  const playingRef = useRef(false)
  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  // Apply volume/mute to the engine and persist.
  useEffect(() => {
    ambient.setVolume(volume)
    ambient.setMuted(muted)
    localStorage.setItem(VOLUME_KEY, String(volume))
    localStorage.setItem(MUTED_KEY, String(muted))
  }, [volume, muted])

  // Swap the soundscape when the mood changes (only if already playing).
  useEffect(() => {
    if (playingRef.current) ambient.setMood(categoryId)
  }, [categoryId])

  // App asks us to start on the first "New Quote" interaction.
  useEffect(() => {
    if (startSignal === 0 || startedRef.current) return
    play()
  }, [startSignal]) // eslint-disable-line react-hooks/exhaustive-deps

  async function play() {
    try {
      await ambient.start(categoryId)
      startedRef.current = true
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  function toggle() {
    if (playing) {
      ambient.pause()
      setPlaying(false)
    } else {
      play()
    }
  }

  return (
    <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play ambient music'}
        className="grid h-9 w-9 place-items-center rounded-full text-white transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        style={{ backgroundColor: accent }}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>

      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Unmute' : 'Mute'}
        className="text-white/80 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        {muted || volume === 0 ? <MutedIcon /> : <VolumeIcon />}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={muted ? 0 : volume}
        onChange={(e) => {
          setVolume(parseFloat(e.target.value))
          if (muted) setMuted(false)
        }}
        aria-label="Volume"
        className="h-1 w-24 cursor-pointer accent-white"
      />
    </div>
  )
}

/* Inline SVG icons (no external assets, keeps the CSP simple). */
function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  )
}
function VolumeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" />
    </svg>
  )
}
function MutedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 10v4h4l5 5V5L7 10H3zm18.3-1.3-1.4-1.4L17 10.2l-2.9-2.9-1.4 1.4L15.6 12l-2.9 2.9 1.4 1.4L17 13.4l2.9 2.9 1.4-1.4L18.4 12z" />
    </svg>
  )
}
