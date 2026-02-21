'use client'

import { useState, useEffect } from 'react'
import { products, addProduct, updateProduct, deleteProduct, Product, formatPrice } from '@/data/products'
import ProductImage from '@/components/ProductImage'
import Button from '@/components/Button'
import Modal from '@/components/Modal'

const ADMIN_PASSWORD = 'admin123' // Hardcoded password for demo

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [productList, setProductList] = useState<Product[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    setProductList(products)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
      setPassword('')
    } else {
      setError('Incorrect password')
    }
  }

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(''), 3000)
  }

  const handleAddProduct = (formData: FormData) => {
    const newProduct: Omit<Product, 'id'> = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category') as string,
      image: formData.get('image') as string,
      size: formData.get('size') as string,
      material: formData.get('material') as string,
    }
    addProduct(newProduct)
    setProductList([...products])
    setIsAddModalOpen(false)
    showNotification('Product added successfully!')
  }

  const handleEditProduct = (formData: FormData) => {
    if (!editingProduct) return
    const updates: Partial<Product> = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category') as string,
      image: formData.get('image') as string,
      size: formData.get('size') as string,
      material: formData.get('material') as string,
    }
    updateProduct(editingProduct.id, updates)
    setProductList([...products])
    setIsEditModalOpen(false)
    setEditingProduct(null)
    showNotification('Product updated successfully!')
  }

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id)
      setProductList([...products])
      showNotification('Product deleted successfully!')
    }
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    setIsEditModalOpen(true)
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-gray-100">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-velora-primary focus:outline-none focus:ring-2 focus:ring-velora-primary dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      {/* Notification */}
      {notification && (
        <div className="fixed right-4 top-20 z-50 rounded-2xl bg-green-500 px-6 py-3 text-white shadow-lg">
          {notification}
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Button onClick={() => setIsAddModalOpen(true)}>Add New Product</Button>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              Logout
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto rounded-2xl bg-white shadow-md dark:bg-gray-800">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {productList.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-600">
                      <ProductImage
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-100">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-100">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Product"
        size="lg"
      >
        <ProductForm onSubmit={handleAddProduct} />
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingProduct(null)
        }}
        title="Edit Product"
        size="lg"
      >
        {editingProduct && <ProductForm product={editingProduct} onSubmit={handleEditProduct} />}
      </Modal>
    </div>
  )
}

// Product Form Component
function ProductForm({
  product,
  onSubmit,
}: {
  product?: Product
  onSubmit: (formData: FormData) => void
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={product?.name}
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pastel-purple focus:outline-none focus:ring-2 focus:ring-pastel-purple dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={product?.description}
          required
          rows={3}
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pastel-purple focus:outline-none focus:ring-2 focus:ring-pastel-purple dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Price (ر.ع)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            min="0"
            defaultValue={product?.price}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pastel-purple focus:outline-none focus:ring-2 focus:ring-pastel-purple dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={product?.category}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pastel-purple focus:outline-none focus:ring-2 focus:ring-pastel-purple dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="Sticker Sheets">Sticker Sheets</option>
            <option value="Single Stickers">Single Stickers</option>
            <option value="Arabic Quotes">Arabic Quotes</option>
            <option value="Cute Collection">Cute Collection</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="size"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Size
          </label>
          <input
            type="text"
            id="size"
            name="size"
            defaultValue={product?.size}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pastel-purple focus:outline-none focus:ring-2 focus:ring-pastel-purple dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="material"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Material
          </label>
          <select
            id="material"
            name="material"
            defaultValue={product?.material}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pastel-purple focus:outline-none focus:ring-2 focus:ring-pastel-purple dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="Matte">Matte</option>
            <option value="Glossy">Glossy</option>
            <option value="Waterproof">Waterproof</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Image URL (or path to /public/images/)
        </label>
        <input
          type="text"
          id="image"
          name="image"
          defaultValue={product?.image}
          placeholder="/images/product.jpg"
          required
          className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pastel-purple focus:outline-none focus:ring-2 focus:ring-pastel-purple dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Place images in /public/images/ folder and use path like /images/filename.jpg
        </p>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="submit">{product ? 'Update Product' : 'Add Product'}</Button>
      </div>
    </form>
  )
}
