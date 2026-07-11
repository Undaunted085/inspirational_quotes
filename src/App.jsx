import { useState } from 'react'
import { DEFAULT_CATEGORY_ID, getCategory } from './config/categories.js'
import { useQuote } from './hooks/useQuote.js'
import BackgroundImage from './components/BackgroundImage.jsx'
import CategoryPicker from './components/CategoryPicker.jsx'
import QuoteCard from './components/QuoteCard.jsx'
import NewQuoteButton from './components/NewQuoteButton.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'

export default function App() {
  const [categoryId, setCategoryId] = useState(DEFAULT_CATEGORY_ID)
  const [startSignal, setStartSignal] = useState(0)
  const { quote, image, loading, refresh } = useQuote(categoryId)

  const category = getCategory(categoryId)

  function handleNewQuote() {
    refresh()
    // First interaction: nudge the music player to begin (autoplay policy).
    setStartSignal((s) => s + 1)
  }

  return (
    <>
      <BackgroundImage
        image={image}
        gradient={category.gradient}
        accent={category.accent}
      />

      <div className="flex min-h-full flex-col items-center px-4 py-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow sm:text-4xl">
            Inspirational Quotes
          </h1>
          <p className="mt-2 text-white/70">
            Pick a mood. Get inspired.
          </p>
        </header>

        <div className="mt-6">
          <CategoryPicker selectedId={categoryId} onSelect={setCategoryId} />
        </div>

        <main className="flex w-full flex-1 flex-col items-center justify-center gap-8 py-10">
          <QuoteCard quote={quote} loading={loading} />
          <NewQuoteButton
            accent={category.accent}
            loading={loading}
            onClick={handleNewQuote}
          />
        </main>

        <footer className="flex w-full flex-col items-center gap-3 pb-2">
          <MusicPlayer
            categoryId={categoryId}
            accent={category.accent}
            startSignal={startSignal}
          />
          {image?.credit && (
            <p className="text-xs text-white/60">
              Photo by{' '}
              <a
                href={image.credit.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                {image.credit.name}
              </a>{' '}
              on Unsplash
            </p>
          )}
        </footer>
      </div>
    </>
  )
}
