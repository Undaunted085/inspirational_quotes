// Single source of truth for the app's moods.
// The category picker, quote fetch, image fetch, and music player all read
// from this list. Add or tweak a mood in one place and it flows everywhere.
//
// Fields:
//   id          - stable key used in state, localStorage, and fallback tagging
//   label       - display name in the picker
//   emoji       - small decorative glyph for the pill
//   apiCategory - API Ninjas quotes `category` value
//   imageQuery  - Unsplash search query for the background image
//   accent      - primary accent color (active pill, button)
//   gradient    - CSS gradient used as the background fallback when no image

export const categories = [
  {
    id: 'motivational',
    label: 'Motivational',
    emoji: '🔥',
    apiCategory: 'inspirational',
    imageQuery: 'mountain sunrise',
    accent: '#f97316',
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #f97316 55%, #fbbf24 100%)',
  },
  {
    id: 'spiritual',
    label: 'Spiritual',
    emoji: '🕊️',
    apiCategory: 'faith',
    imageQuery: 'zen temple calm mist',
    accent: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #2e1065 0%, #6d28d9 55%, #a78bfa 100%)',
  },
  {
    id: 'wisdom',
    label: 'Wisdom',
    emoji: '🦉',
    apiCategory: 'knowledge',
    imageQuery: 'ancient library books',
    accent: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 55%, #38bdf8 100%)',
  },
  {
    id: 'happiness',
    label: 'Happiness',
    emoji: '☀️',
    apiCategory: 'happiness',
    imageQuery: 'sunlight nature joy field',
    accent: '#facc15',
    gradient: 'linear-gradient(135deg, #a16207 0%, #eab308 55%, #fde047 100%)',
  },
  {
    id: 'love',
    label: 'Love',
    emoji: '💛',
    apiCategory: 'love',
    imageQuery: 'soft warm bokeh romantic',
    accent: '#ec4899',
    gradient: 'linear-gradient(135deg, #831843 0%, #db2777 55%, #f9a8d4 100%)',
  },
  {
    id: 'success',
    label: 'Success',
    emoji: '🏆',
    apiCategory: 'success',
    imageQuery: 'city skyline sunrise',
    accent: '#10b981',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #059669 55%, #6ee7b7 100%)',
  },
]

export const DEFAULT_CATEGORY_ID = 'motivational'

export function getCategory(id) {
  return categories.find((c) => c.id === id) ?? categories[0]
}
