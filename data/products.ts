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
    name: 'مجموعة ستيكرات فيلورا 1',
    description:
      'تصميم ستيكرات جميل وملوّن، مثالي لتخصيص لابتوبك، هاتفك، زجاجة الماء، أو يوميّاتك.',
    price: 0.5,
    category: 'أوراق ستيكرات',
    image: '/images/sticker-1.png',
    size: '6×4 بوصة',
    material: 'مطفي',
  },
  {
    id: '5',
    name: 'مجموعة ستيكرات فيلورا 5',
    description:
      'تصميم ستيكرات أنيق وعصري يضيف ستايل وشخصية لأي سطح.',
    price: 0.5,
    category: 'أوراق ستيكرات',
    image: '/images/sticker-5.png',
    size: '5×3.5 بوصة',
    material: 'مطفي',
  },
  {
    id: '6',
    name: 'مجموعة ستيكرات فيلورا 6',
    description: 'ستيكر فريد ولافت يضيف طابعاً مميزاً لأغراضك.',
    price: 0.5,
    category: 'ستيكرات مفردة',
    image: '/images/sticker-6.png',
    size: '3×3 بوصة',
    material: 'لامع',
  },
  {
    id: '7',
    name: 'مجموعة ستيكرات فيلورا 7',
    description:
      'ستيكر فاخر بجودة عالية وتصميم رائع، مثالي للتعبير عن أسلوبك الفريد.',
    price: 0.5,
    category: 'ستيكرات مفردة',
    image: '/images/sticker-7.png',
    size: '3×3 بوصة',
    material: 'مقاوم للماء',
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
