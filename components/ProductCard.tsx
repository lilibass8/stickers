'use client'

import Link from 'next/link'
import { Product, formatPrice } from '@/data/products'
import Button from './Button'
import ProductImage from './ProductImage'
import ProductCardCarousel from './ProductCardCarousel'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {

  return (
    <Link href={`/shop/${product.id}`}>
      <div className="group h-full rounded-2xl bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-800">
        {/* Product Image(s) */}
        {Array.isArray(product.image) ? (
          <ProductCardCarousel images={product.image} name={product.name} />
        ) : (
          <div className="relative mb-4 w-full h-56 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
            <ProductImage
              src={product.image}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        )}

        {/* Product Info */}
        <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
          {product.name}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {product.description}
        </p>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-800 dark:text-gray-100 font-times" lang="en">
            {formatPrice(product.price)}
          </span>
          <span className="rounded-full bg-velora-primary/20 px-3 py-1 text-xs font-medium text-velora-primary dark:bg-velora-secondary/30 dark:text-velora-secondary">
            {product.category}
          </span>
        </div>

        {/* Add to Cart Button - removed for display-only mode */}
        {/* kept price above; button intentionally omitted so users only browse images */}      </div>
    </Link>
  )
}
