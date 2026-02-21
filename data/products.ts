export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  size: string
  material: string
}

// Mock products data - Using stickers 1, 5, 6, 7
export const products: Product[] = [
  {
    id: '1',
    name: 'Velora Sticker Collection 1',
    description:
      'Beautiful and vibrant sticker design perfect for personalizing your laptop, phone, water bottle, or journal.',
    price: 0.5,
    category: 'Sticker Sheets',
    image: '/images/sticker-1.png',
    size: '6x4 inches',
    material: 'Matte',
  },
  {
    id: '5',
    name: 'Velora Sticker Collection 5',
    description:
      'Elegant and modern sticker design that adds style and personality to any surface.',
    price: 0.5,
    category: 'Sticker Sheets',
    image: '/images/sticker-5.png',
    size: '5x3.5 inches',
    material: 'Matte',
  },
  {
    id: '6',
    name: 'Velora Sticker Collection 6',
    description: 'Unique and eye-catching sticker that brings character to your belongings.',
    price: 0.5,
    category: 'Single Stickers',
    image: '/images/sticker-6.png',
    size: '3x3 inches',
    material: 'Glossy',
  },
  {
    id: '7',
    name: 'Velora Sticker Collection 7',
    description:
      'Premium quality sticker with stunning design, perfect for expressing your unique style.',
    price: 0.5,
    category: 'Single Stickers',
    image: '/images/sticker-7.png',
    size: '3x3 inches',
    material: 'Waterproof',
  },
]

// Helper function to format price in Omani Rial
export function formatPrice(price: number): string {
  return `${price.toFixed(2)} ر.ع`
}

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  if (category === 'All') return products
  return products.filter((p) => p.category === category)
}

// Helper function to add a new product
export function addProduct(product: Omit<Product, 'id'>): Product {
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
  }
  products.push(newProduct)
  return newProduct
}

// Helper function to update a product
export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return null
  products[index] = { ...products[index], ...updates }
  return products[index]
}

// Helper function to delete a product
export function deleteProduct(id: string): boolean {
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return false
  products.splice(index, 1)
  return true
}
