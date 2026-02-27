export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  // allow a single image or an array for sticker sheets with multiple previews
  image: string | string[]
  size: string
  material: string
}

// Mock products data - Using stickers 1, 5, 6, 7
export const products: Product[] = [
  {
    id: '1',
    name: 'ستكر شيت',
    description: 'مجموعة من الستيكرات في ورقة واحدة',
    price: 0.5,
    category: 'أوراق ستيكرات',
    // display designated sticker previews together
    image: [
      '/images/stik.png',
      '/images/sticker-5.png',
      '/images/sticker-6.png',
      '/images/sticker-7.png',
    ],
    size: 'A6',
    material: 'مطفي',
  },
  {
    id: '5',
    name: 'بزنس كارد',
    description: '',
    price: 0,
    category: '',
    image: '',
    size: '',
    material: '',
  },
  {
    id: '6',
    name: 'كروت متنوعه',
    description: '',
    price: 0,
    category: '',
    image: '',
    size: '',
    material: '',
  },
  {
    id: '7',
    name: 'مطويات',
    description: '',
    price: 0,
    category: '',
    image: '',
    size: '',
    material: '',
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
  if (category === 'الكل') return products
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
