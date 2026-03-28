'use client'
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [cart, setCart] = useState([])
  const { id } = useParams()

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/products/${id}`)
      .then(res => {
        setProduct(res.data)
      })
      .catch(err => console.error(err))
  }, [id])

      const handleQuantityChange = ( value) => {
        setQuantity(Number(value))
    }
    const handleColorChange = (value) => {
      setSelectedColor(String(value))
    }
    const handleSizeChange = (value) => {
      setSelectedSize(String(value))
      }

  const handleSubmit = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const addToCart = async (product) => {

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth`, { withCredentials: true });
            const user = res.data.user;

            if (user) {
                const payload = {

                    items: [
                        {
                            productId: product._id,
                            quantity,
                            size: selectedSize,
                            color: selectedColor
                        }
                    ]
                };

                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/cart/add`, payload, { withCredentials: true });
                setCart(response.data)
            } else {
                throw new Error('User not authenticated');
            }
        } catch (error) {
            console.warn('Fallback to guest cart', error.message);

            const storedItems = localStorage.getItem('ITEM');
            const productsInCart = storedItems ? JSON.parse(storedItems) : [];
            const existingProduct = productsInCart.find(p => p._id === product._id);

            let updatedCart;

            if (existingProduct) {
                updatedCart = productsInCart.map(p =>
                    p._id === product._id ? { ...p, quantity: p.quantity + quantity } : p
                );
            } else {
                updatedCart = [...productsInCart, { ...product, quantity, color: String(selectedColor || ''), size: String(selectedSize || '') }];
            }

            localStorage.setItem('ITEM', JSON.stringify(updatedCart));
            setCart(updatedCart)
        }

        window.dispatchEvent(new Event('cart-updated'));
    };

  if (!product) return (
    <div className="text-center mt-20 text-xl text-gray-500">
      Loading product details...
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mb-17">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Image Gallery */}
        <div className="md:flex md:w-2/3 gap-6">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 md:overflow-y-auto md:max-h-[500px]">
            {product.images.map((img, index) => (
              <Image
                key={index}
                src={`${process.env.NEXT_PUBLIC_API_BASE}/${img}`}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${selectedImage === index ? 'border-orange-500' : 'border-gray-300'
                  }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 mt-6 md:mt-0 relative overflow-hidden rounded-lg shadow-md">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE}/${product.images[selectedImage]}`}
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

          <div className="text-2xl font-bold text-[#ff6400]">
            ${product.price}
            {product.originalPrice && (
              <span className="ml-3 text-gray-400 line-through text-lg">${product.originalPrice}</span>
            )}
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
                  onChange={(e) => handleColorChange( e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6400] focus:border-[#ff6400] text-sm"
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
                  onChange={(e) => handleSizeChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6400] focus:border-[#ff6400] text-sm"
                  required
                >
                  <option value="" disabled>Select a size</option>
                  {product.sizes.map((size, i) => (
                    <option key={i} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}
            {/* Quantity Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6400] focus:border-[#ff6400] text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff6400] hover:bg-orange-700 text-white py-3 rounded-md font-medium"
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
