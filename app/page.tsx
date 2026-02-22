'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import Button from '@/components/Button'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState(products)

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/background.png)',
              backgroundSize: '100% auto',
              backgroundPosition: 'center center'
            }}
          ></div>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-velora-primary/60 via-velora-secondary/50 to-velora-accent/60 dark:from-velora-primary/70 dark:via-velora-secondary/60 dark:to-velora-accent/70"></div>
        </div>

        {/* Animated Small Circles */}
        <div className="absolute inset-0">
          <div className="absolute left-[10%] top-[20%] h-4 w-4 rounded-full bg-white/50 animate-float shadow-lg"></div>
          <div className="absolute left-[20%] top-[60%] h-3 w-3 rounded-full bg-velora-teal/70 animate-float-delayed shadow-lg"></div>
          <div className="absolute left-[30%] top-[40%] h-5 w-5 rounded-full bg-velora-yellow/60 animate-float shadow-lg"></div>
          <div className="absolute left-[40%] top-[80%] h-3.5 w-3.5 rounded-full bg-white/45 animate-float-delayed shadow-lg"></div>
          <div className="absolute left-[50%] top-[15%] h-4 w-4 rounded-full bg-velora-orange/65 animate-float shadow-lg"></div>
          <div className="absolute left-[60%] top-[50%] h-3 w-3 rounded-full bg-white/50 animate-float-delayed shadow-lg"></div>
          <div className="absolute left-[70%] top-[30%] h-4.5 w-4.5 rounded-full bg-velora-teal/60 animate-float shadow-lg"></div>
          <div className="absolute left-[80%] top-[70%] h-3 w-3 rounded-full bg-velora-yellow/55 animate-float-delayed shadow-lg"></div>
          <div className="absolute left-[90%] top-[25%] h-4 w-4 rounded-full bg-white/45 animate-float shadow-lg"></div>
          <div className="absolute left-[15%] top-[75%] h-3.5 w-3.5 rounded-full bg-velora-orange/60 animate-float-delayed shadow-lg"></div>
          <div className="absolute left-[25%] top-[10%] h-4 w-4 rounded-full bg-white/50 animate-float shadow-lg"></div>
          <div className="absolute left-[35%] top-[55%] h-3 w-3 rounded-full bg-velora-teal/65 animate-float-delayed shadow-lg"></div>
          <div className="absolute left-[45%] top-[35%] h-4.5 w-4.5 rounded-full bg-velora-yellow/60 animate-float shadow-lg"></div>
          <div className="absolute left-[55%] top-[85%] h-3 w-3 rounded-full bg-white/45 animate-float-delayed shadow-lg"></div>
          <div className="absolute left-[65%] top-[20%] h-4 w-4 rounded-full bg-velora-orange/55 animate-float shadow-lg"></div>
          <div className="absolute left-[75%] top-[60%] h-3.5 w-3.5 rounded-full bg-white/50 animate-float-delayed shadow-lg"></div>
          <div className="absolute left-[85%] top-[40%] h-3 w-3 rounded-full bg-velora-teal/60 animate-float shadow-lg"></div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative py-16 px-4">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-velora-primary/5 via-transparent to-velora-accent/5"></div>
        <div className="relative mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-gray-100 md:text-4xl">
            المنتجات المميزة
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {featuredProducts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                لا توجد منتجات متاحة حالياً.
              </p>
            </div>
          )}
          <div className="mt-8 text-center">
            <Link href="/shop">
              <Button variant="outline">عرض جميع المنتجات</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
