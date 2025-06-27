"use client"
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}`)
      .then(res => {
        setProduct(res.data)
        console.log(res.data)
      })
      .catch(err => console.error(err))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Selected Color:', selectedColor)
    console.log('Selected Size:', selectedSize)
  }

  if (!product) return (
    <div className="text-center mt-20 text-xl text-gray-500">
      Loading product details...
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Image Gallery */}
        <div className="md:flex md:w-2/3 gap-6">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 md:overflow-y-auto md:max-h-[500px]">
            {product.images.map((img, index) => (
              <Image
                key={index}
                src={`http://localhost:8000/${img}`}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                  selectedImage === index ? 'border-orange-500' : 'border-gray-300'
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 mt-6 md:mt-0 relative overflow-hidden rounded-lg shadow-md">
            <Image
              src={`http://localhost:8000/${product.images[selectedImage]}`}
              alt={`Product Image ${selectedImage + 1}`}
              width={800}
              height={600}
              className="w-full h-[500px] object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="md:w-1/3 space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">{product.productName}</h1>

          <div className="text-2xl font-bold text-blue-700">
            ${product.price}
            {product.originalPrice && (
              <span className="ml-3 text-gray-400 line-through text-lg">${product.originalPrice}</span>
            )}
          </div>

          <div className="text-sm text-gray-500">
            30-day satisfaction guarantee or your money back.
          </div>

          <div className="mt-6">
            <h4 className="uppercase text-xs text-gray-400 font-medium mb-2">Description</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Color Select */}
            {product.colors && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  <option value="" disabled>Select a color</option>
                  {product.colors.map((color, i) => (
                    <option key={i} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Size Select */}
            {product.sizes && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  <option value="" disabled>Select a size</option>
                  {product.sizes.map((size, i) => (
                    <option key={i} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
            >
              Add to Cart
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page
