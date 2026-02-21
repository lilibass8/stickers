'use client'

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const categories = ['All', 'Sticker Sheets', 'Single Stickers', 'Arabic Quotes', 'Cute Collection']

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`rounded-2xl px-6 py-2 font-medium transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-velora-primary to-velora-secondary text-white shadow-md hover:from-velora-secondary hover:to-velora-accent dark:from-velora-primary/90 dark:to-velora-secondary/90'
              : 'bg-white text-gray-600 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
