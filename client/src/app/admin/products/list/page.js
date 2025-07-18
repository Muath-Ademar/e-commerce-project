'use client'
import React, { useState } from 'react'
import AdminNavbar from '../../../../../components/AdminNavbar'

const dummyProducts = [
  {
    id: 1,
    name: 'T-Shirt',
    price: '$20',
    sizes: ['S', 'M', 'L'],
    colors: ['Red', 'Blue'],
  },
  {
    id: 2,
    name: 'Jeans',
    price: '$40',
    sizes: ['32', '34'],
    colors: ['Black'],
  },
  {
    id: 3,
    name: 'Sneakers',
    price: '$60',
    sizes: ['8', '9', '10'],
    colors: ['White', 'Gray'],
  },
]

const Page = () => {
  const [products, setProducts] = useState(dummyProducts)

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id))
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <AdminNavbar />
      <h2 className="text-2xl font-semibold mb-4 mt-6">All Products</h2>

      <div className="overflow-x-auto rounded-md shadow-md border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-100 text-gray-800 text-sm">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Sizes</th>
              <th className="px-4 py-3 font-semibold">Colors</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.map((product) => (
              <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.price}</td>
                <td className="px-4 py-3">{product.sizes.join(', ')}</td>
                <td className="px-4 py-3">{product.colors.join(', ')}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
