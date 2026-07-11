export default function NewQuoteButton({ accent, loading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={
        'rounded-full px-7 py-3 font-semibold text-white shadow-lg transition ' +
        'hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ' +
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70'
      }
      style={{ backgroundColor: accent }}
    >
      {loading ? 'Loading…' : 'New Quote'}
    </button>
  )
}
