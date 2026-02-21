'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'
import { useCart } from '@/hooks/useCart'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { cartItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  
  // Default theme for SSR
  const currentTheme = mounted ? theme : 'light'

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 transition-transform hover:scale-105">
            <div className="relative h-12 w-12 overflow-hidden rounded-full shadow-lg ring-2 ring-white/50 dark:ring-gray-800/50 md:h-14 md:w-14">
              <Image
                src="/images/logo.png"
                alt="Velora Logo"
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-velora-primary to-velora-secondary bg-clip-text text-transparent dark:from-velora-secondary dark:to-velora-accent">
              Velora
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden items-center space-x-6 md:flex">
            <Link
              href="/"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Shop
            </Link>
            <Link
              href="/admin"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              aria-label="Toggle dark mode"
            >
              {currentTheme === 'light' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>

            {/* Cart Link */}
            <Link
              href="/cart"
              className="relative rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-velora-accent text-xs font-bold text-white dark:bg-velora-secondary">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 py-4 dark:border-gray-800 md:hidden">
            <div className="flex flex-col space-y-3 px-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Shop
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
