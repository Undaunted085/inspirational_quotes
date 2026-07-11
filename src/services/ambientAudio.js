// Generative ambient audio — no audio files, no licensing. A small Web Audio
// synth produces a mood-specific soundscape: a sustained detuned chord (pad)
// with a slow filter sweep, plus gentle bell notes drifting over it.
//
// The AudioContext is created lazily inside start(), which is only called from
// a user gesture (play button / first "New Quote"), satisfying autoplay policy.
//
// Synth presets live here (not in config/categories.js) because they are
// audio-specific; they are keyed by the same category ids.

const midiToFreq = (m) => 440 * Math.pow(2, (m - 69) / 12)

// root: MIDI note of the tonic. chord: semitone offsets for the pad.
// scale: semitone offsets bell notes are drawn from (one octave above root).
// wave: oscillator type. filter: lowpass cutoff (Hz). lfoRate: filter sweep
// speed (Hz). noteMs: [min,max] gap between bells. padLevel: pad loudness.
const PRESETS = {
  motivational: { root: 57, chord: [0, 4, 7, 12], scale: [0, 2, 4, 7, 9], wave: 'triangle', filter: 1400, lfoRate: 0.10, noteMs: [2500, 4500], padLevel: 0.15 },
  spiritual:    { root: 45, chord: [0, 7, 12, 19], scale: [0, 3, 5, 7, 10], wave: 'sine',    filter: 650,  lfoRate: 0.05, noteMs: [4000, 7000], padLevel: 0.17 },
  wisdom:       { root: 50, chord: [0, 5, 7, 14],  scale: [0, 2, 5, 7, 9],  wave: 'sine',    filter: 950,  lfoRate: 0.07, noteMs: [3500, 6000], padLevel: 0.15 },
  happiness:    { root: 60, chord: [0, 4, 7, 9],   scale: [0, 2, 4, 7, 9],  wave: 'triangle', filter: 1900, lfoRate: 0.13, noteMs: [1800, 3500], padLevel: 0.13 },
  love:         { root: 53, chord: [0, 4, 7, 11],  scale: [0, 2, 4, 7, 9],  wave: 'sine',    filter: 1100, lfoRate: 0.06, noteMs: [3000, 5500], padLevel: 0.15 },
  success:      { root: 52, chord: [0, 4, 7, 12],  scale: [0, 4, 7, 9, 12], wave: 'triangle', filter: 1500, lfoRate: 0.10, noteMs: [2200, 4000], padLevel: 0.15 },
}

let ctx = null
let bus = null // shared input bus for all voices
let master = null // volume / mute
let current = null // teardown handle for the active pad
let preset = null
let noteTimer = null
let volume = 0.5
let muted = false

function ensureContext() {
  if (ctx) return
  const AC = window.AudioContext || window.webkitAudioContext
  ctx = new AC()
  bus = ctx.createGain()
  const comp = ctx.createDynamicsCompressor() // safety against clipping
  master = ctx.createGain()
  master.gain.value = muted ? 0 : volume
  bus.connect(comp)
  comp.connect(master)
  master.connect(ctx.destination)
}

function ramp(param, value, time = 0.2) {
  const t = ctx.currentTime
  param.cancelScheduledValues(t)
  param.setValueAtTime(param.value, t)
  param.linearRampToValueAtTime(value, t + time)
}

function buildPad(p) {
  const now = ctx.currentTime
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = p.filter

  const padGain = ctx.createGain()
  padGain.gain.value = 0
  padGain.gain.linearRampToValueAtTime(p.padLevel, now + 1.4) // gentle fade-in

  filter.connect(padGain)
  padGain.connect(bus)

  const nodes = []
  for (const semi of p.chord) {
    const freq = midiToFreq(p.root + semi)
    for (const detune of [-6, 6]) {
      const osc = ctx.createOscillator()
      osc.type = p.wave
      osc.frequency.value = freq
      osc.detune.value = detune
      osc.connect(filter)
      osc.start(now)
      nodes.push(osc)
    }
  }

  // Slow filter sweep for movement.
  const lfo = ctx.createOscillator()
  lfo.frequency.value = p.lfoRate
  const lfoGain = ctx.createGain()
  lfoGain.gain.value = p.filter * 0.4
  lfo.connect(lfoGain)
  lfoGain.connect(filter.frequency)
  lfo.start(now)
  nodes.push(lfo)

  return {
    stop() {
      const t = ctx.currentTime
      ramp(padGain.gain, 0, 0.6)
      for (const n of nodes) {
        try { n.stop(t + 0.7) } catch { /* already stopped */ }
      }
      setTimeout(() => {
        try { padGain.disconnect(); filter.disconnect() } catch { /* noop */ }
      }, 900)
    },
  }
}

function playBell(p) {
  const now = ctx.currentTime
  const semi = p.scale[Math.floor(Math.random() * p.scale.length)] + (Math.random() < 0.3 ? 12 : 0)
  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.value = midiToFreq(p.root + 12 + semi)
  const g = ctx.createGain()
  g.gain.value = 0
  g.gain.setValueAtTime(0, now)
  g.gain.linearRampToValueAtTime(0.12, now + 0.03) // soft attack
  g.gain.exponentialRampToValueAtTime(0.0008, now + 3.2) // long tail
  osc.connect(g)
  g.connect(bus)
  osc.start(now)
  osc.stop(now + 3.4)
}

function scheduleBells(p) {
  const [min, max] = p.noteMs
  noteTimer = setTimeout(() => {
    if (ctx) playBell(p)
    scheduleBells(p)
  }, min + Math.random() * (max - min))
}

function applyMood(moodId) {
  preset = PRESETS[moodId] ?? PRESETS.motivational
  if (current) current.stop()
  current = buildPad(preset)
  if (noteTimer) clearTimeout(noteTimer)
  scheduleBells(preset)
}

export const ambient = {
  /** Start playback for a mood. Must be called from a user gesture. */
  async start(moodId) {
    ensureContext()
    if (ctx.state === 'suspended') await ctx.resume()
    ramp(master.gain, muted ? 0 : volume, 0.3)
    applyMood(moodId)
  },
  /** Switch mood while already playing (crossfades pad + swaps bell scale). */
  setMood(moodId) {
    if (ctx) applyMood(moodId)
  },
  /** Fade out and suspend the context (keeps it for the next start). */
  pause() {
    if (!ctx) return
    if (noteTimer) { clearTimeout(noteTimer); noteTimer = null }
    if (current) { current.stop(); current = null }
    ramp(master.gain, 0, 0.5)
    setTimeout(() => {
      if (ctx && ctx.state === 'running') ctx.suspend()
    }, 700)
  },
  setVolume(v) {
    volume = v
    if (master && !muted) ramp(master.gain, v)
  },
  setMuted(m) {
    muted = m
    if (master) ramp(master.gain, m ? 0 : volume)
  },
}
