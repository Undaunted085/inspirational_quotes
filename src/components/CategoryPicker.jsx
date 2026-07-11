// Mood selector. Selecting a pill drives the quote, image, and music.

import { categories } from '../config/categories.js'

export default function CategoryPicker({ selectedId, onSelect }) {
  return (
    <div
      role="tablist"
      aria-label="Quote category"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {categories.map((category) => {
        const active = category.id === selectedId
        return (
          <button
            key={category.id}
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(category.id)}
            className={
              'rounded-full px-4 py-2 text-sm font-medium backdrop-blur transition ' +
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ' +
              (active
                ? 'text-white shadow-lg'
                : 'bg-white/10 text-white/80 hover:bg-white/20')
            }
            style={active ? { backgroundColor: category.accent } : undefined}
          >
            <span aria-hidden="true" className="mr-1">
              {category.emoji}
            </span>
            {category.label}
          </button>
        )
      })}
    </div>
  )
}
