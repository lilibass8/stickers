'use client'

import Link from 'next/link'
import ProductImage from '@/components/ProductImage'
import { useCart } from '@/hooks/useCart'
import Button from '@/components/Button'

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="fade-in">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-gray-100">
              Your Cart is Empty
            </h1>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
              Start shopping to add items to your cart!
            </p>
            <Link href="/shop">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-800 dark:text-gray-100">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800 sm:flex-row"
                >
                  {/* Product Image */}
                  <Link href={`/shop/${item.product.id}`} className="flex-shrink-0">
                    <div className="relative h-32 w-32 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
                      <ProductImage
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href={`/shop/${item.product.id}`}
                        className="text-xl font-semibold text-gray-800 hover:text-velora-primary dark:text-gray-100 dark:hover:text-velora-secondary"
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {item.product.category}
                      </p>
                      <p className="mt-2 text-lg font-bold text-gray-800 dark:text-gray-100">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold text-gray-800 dark:text-gray-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="flex items-center justify-end sm:flex-col sm:justify-center">
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
                Order Summary
              </h2>
              <div className="mb-4 space-y-2 border-b border-gray-200 pb-4 dark:border-gray-700">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              <div className="mb-6 flex justify-between text-2xl font-bold text-gray-800 dark:text-gray-100">
                <span>Total</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <Button size="lg" className="mb-4 w-full">
                Checkout
              </Button>
              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
