'use client'
import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../../../components/AdminNavbar'
import axios from 'axios'
import Image from 'next/image'

const Page = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`)
      .then(res => {
        setProducts(res.data)
      })
      .catch(err => console.log(err))
  })

  const handleDelete = (id) => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_BASE}/api/products/${id}`, {withCredentials: true})
    .then(res =>{
      console.log(res.data)
      setProducts(prev => prev.filter(product => product.id !== id))
    })
    .catch(err=> console.log(err))
  }

return (
    <div className="p-6 min-h-screen ml-20">
      <AdminNavbar />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-6">All Products</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price ($)</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sizes</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Colors</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
            {products.length > 0 ? (
              products.map((product, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                    <Image src={`${process.env.NEXT_PUBLIC_API_BASE}/${product.images[0]}`} alt={product.productName} width={40} height={40} className="rounded" />
                    <span className="text-sm font-medium text-gray-800">{product.productName}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">${product.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.sizes.join(', ')}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.colors.join(', ')}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-sm text-red-600 hover:text-red-800 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-6 py-6 text-gray-500">No products available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
