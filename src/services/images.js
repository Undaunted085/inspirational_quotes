// Background image fetching from Unsplash. Returns null on any failure so the
// caller can fall back to the category's CSS gradient.

const API_URL = 'https://api.unsplash.com/photos/random'
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

/**
 * Fetch a relevant background image for a search query.
 * @param {string} query - Unsplash search query (from category.imageQuery)
 * @returns {Promise<{ url: string, credit: { name: string, link: string } } | null>}
 */
export async function fetchImage(query) {
  if (!ACCESS_KEY) return null

  try {
    const url =
      `${API_URL}?query=${encodeURIComponent(query)}` +
      `&orientation=landscape&content_filter=high`
    const res = await fetch(url, {
      headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
    })
    if (!res.ok) return null

    const data = await res.json()
    const raw = data?.urls?.regular
    if (!raw) return null

    return {
      url: raw,
      credit: {
        name: data.user?.name ?? 'Unsplash',
        link: data.user?.links?.html ?? 'https://unsplash.com',
      },
    }
  } catch {
    return null
  }
}
