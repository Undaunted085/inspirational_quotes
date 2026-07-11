// Quote fetching: pull a live, real-author quote from API Ninjas, and fall
// back to the local mood-tagged dataset on any failure (no key, network error,
// rate limit, or empty result).
//
// Note: API Ninjas' `category` parameter is premium-only, so we request an
// unfiltered random quote. The mood picker drives the background image and
// music; live quotes are not mood-matched. (The local fallback IS mood-tagged.)
// If the plan is upgraded to premium, add `?category=<getCategory(id).apiCategory>`
// back here to get mood-matched live quotes.

import { getFallbackQuote } from '../data/fallbackQuotes.js'

const API_URL = 'https://api.api-ninjas.com/v1/quotes'
const API_KEY = import.meta.env.VITE_QUOTES_API_KEY

/**
 * Fetch a quote. The categoryId is used only for the local fallback.
 * @param {string} categoryId - a category id from config/categories.js
 * @returns {Promise<{ text: string, author: string|null, source: 'api'|'fallback' }>}
 */
export async function fetchQuote(categoryId) {
  if (API_KEY) {
    try {
      const res = await fetch(API_URL, { headers: { 'X-Api-Key': API_KEY } })
      if (res.ok) {
        const data = await res.json()
        const item = Array.isArray(data) ? data[0] : null
        if (item?.quote) {
          return { text: item.quote, author: item.author || null, source: 'api' }
        }
      }
    } catch {
      // fall through to local fallback
    }
  }

  return { ...getFallbackQuote(categoryId), source: 'fallback' }
}
