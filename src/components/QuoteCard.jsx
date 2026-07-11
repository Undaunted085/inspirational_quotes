// Frosted-glass card holding the quote. Re-keys on text change so the
// fade/slide animation replays for each new quote. Shows a shimmer while loading.

export default function QuoteCard({ quote, loading }) {
  return (
    <article className="w-full max-w-2xl rounded-3xl border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
      {loading || !quote ? (
        <LoadingShimmer />
      ) : (
        <div key={quote.text} className="animate-fade-slide-in">
          <span
            aria-hidden="true"
            className="block text-6xl leading-none text-white/40"
          >
            &ldquo;
          </span>
          <p className="mt-2 text-2xl font-medium leading-relaxed text-white sm:text-3xl">
            {quote.text}
          </p>
          {quote.author && (
            <footer className="mt-6 text-base font-medium text-white/70">
              — {quote.author}
            </footer>
          )}
        </div>
      )}
    </article>
  )
}

function LoadingShimmer() {
  return (
    <div className="space-y-4" aria-hidden="true">
      {['85%', '95%', '60%'].map((w) => (
        <div
          key={w}
          className="relative mx-auto h-6 overflow-hidden rounded-full bg-white/15"
          style={{ width: w }}
        >
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      ))}
      <span className="sr-only">Loading quote…</span>
    </div>
  )
}
