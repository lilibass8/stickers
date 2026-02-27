'use client'

import { useState } from 'react'
import ProductImage from './ProductImage'

interface ProductCardCarouselProps {
  images: string[]
  name: string
}

export default function ProductCardCarousel({ images, name }: ProductCardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prev = () => {
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  }
  const next = () => {
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1))
  }

  return (
    <div className="relative mb-4 w-full h-56 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
      <ProductImage
        src={images[currentIndex]}
        alt={`${name} ${currentIndex + 1}`}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); prev() }}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-1 shadow hover:bg-white dark:bg-gray-800/70 dark:hover:bg-gray-700"
      >
        ‹
      </button>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); next() }}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-1 shadow hover:bg-white dark:bg-gray-800/70 dark:hover:bg-gray-700"
      >
        ›
      </button>
    </div>
  )
}
