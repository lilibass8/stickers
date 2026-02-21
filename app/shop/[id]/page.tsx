'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ProductImage from '@/components/ProductImage'
import { getProductById, products, Product, formatPrice } from '@/data/products'
import Button from '@/components/Button'
import ProductCard from '@/components/ProductCard'
import { useCart } from '@/hooks/useCart'

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  useEffect(() => {
    const productId = params.id as string
    const foundProduct = getProductById(productId)
    if (foundProduct) {
      setProduct(foundProduct)
      // Get related products (same category, excluding current product)
      const related = products
        .filter((p) => p.category === foundProduct.category && p.id !== productId)
        .slice(0, 4)
      setRelatedProducts(related)
    }
  }, [params.id])

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">Product not found</p>
          <Button onClick={() => router.push('/shop')}>Back to Shop</Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    // Navigate to cart immediately
    router.push('/cart')
  }

  return (
    <div className="fade-in">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-700">
            <ProductImage
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-gray-100">
              {product.name}
            </h1>
            <p className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">
              {formatPrice(product.price)}
            </p>
            <p className="mb-6 text-gray-600 dark:text-gray-400">{product.description}</p>

            {/* Product Details */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center">
                <span className="mr-2 font-semibold text-gray-700 dark:text-gray-300">Size:</span>
                <span className="text-gray-600 dark:text-gray-400">{product.size}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-semibold text-gray-700 dark:text-gray-300">
                  Material:
                </span>
                <span className="rounded-full bg-velora-teal/20 px-3 py-1 text-sm text-velora-teal dark:bg-velora-teal/30 dark:text-velora-teal">
                  {product.material}
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-semibold text-gray-700 dark:text-gray-300">
                  Category:
                </span>
                <span className="rounded-full bg-velora-primary/20 px-3 py-1 text-sm text-velora-primary dark:bg-velora-secondary/30 dark:text-velora-secondary">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6 flex items-center space-x-4">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Quantity:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  -
                </button>
                <span className="w-12 text-center text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button size="lg" onClick={handleAddToCart} className="w-full">
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-3xl font-bold text-gray-800 dark:text-gray-100">
              Related Products
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
