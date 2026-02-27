'use client'

import { useState } from 'react'
import { products, getProductsByCategory } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('الكل')
  const filteredProducts = getProductsByCategory(selectedCategory)

  return (
    <div className="fade-in">
      <div className="relative overflow-hidden bg-gradient-to-br from-velora-primary via-velora-secondary to-velora-accent py-16 px-4 dark:from-velora-primary/40 dark:via-velora-secondary/40 dark:to-velora-accent/40">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-velora-teal/20 blur-3xl animate-pulse"></div>
          <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-velora-orange/20 blur-3xl animate-pulse delay-500"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
        </div>
        <div className="relative mx-auto max-w-7xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-2xl md:text-5xl lg:text-6xl">
            تسوق جميع الستيكرات
          </h1>
          <p className="text-lg font-medium text-white/95 drop-shadow-lg md:text-xl">
            اكتشف مجموعتنا الكاملة من الستيكرات الجميلة
          </p>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-velora-primary/3 via-transparent to-velora-accent/3"></div>
        <div className="relative">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {filteredProducts.length > 0 ? (
            selectedCategory === 'الكل' ? (
              // show each category section separately when viewing all
              Array.from(new Set(products.map((p) => p.category))).map((cat) => {
                const items = products.filter((p) => p.category === cat)
                return (
                  <section key={cat} className="mb-12">
                    <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                      {cat}
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {items.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </section>
                )
              })
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                لا توجد منتجات في هذا التصنيف.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
