import { useCallback, useEffect, useState } from 'react'
import { fetchQuote } from '../services/quotes.js'
import { fetchImage } from '../services/images.js'
import { getCategory } from '../config/categories.js'

/**
 * Manages the current quote + background image for a mood.
 * Reloads whenever the category changes; `refresh()` pulls a fresh pair.
 *
 * @param {string} categoryId
 * @returns {{ quote: object|null, image: object|null, loading: boolean, refresh: () => void }}
 */
export function useQuote(categoryId) {
  const [quote, setQuote] = useState(null)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(true)
  // Bumped to trigger a reload without changing the category.
  const [nonce, setNonce] = useState(0)

  const refresh = useCallback(() => setNonce((n) => n + 1), [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    const category = getCategory(categoryId)

    Promise.all([fetchQuote(categoryId), fetchImage(category.imageQuery)]).then(
      ([q, img]) => {
        if (cancelled) return
        setQuote(q)
        setImage(img)
        setLoading(false)
      },
    )

    return () => {
      cancelled = true
    }
  }, [categoryId, nonce])

  return { quote, image, loading, refresh }
}
