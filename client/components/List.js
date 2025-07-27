'use client'
import { StarIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const List = ({ products }) => {
    const router = useRouter()
    const [quantities, setQuantites] = useState({})
    const [selectedColor, setSelectedColor] = useState({})
    const [selectedSize, setSelectedSize] = useState({})
    const [cart, setCart] = useState([]) // Add cart state


    const handleQuantityChange = (productId, value) => {
        setQuantites(prev => ({
            ...prev,
            [productId]: Number(value)
        }))
    }
    const handleColorChange = (productId, value) => {
        setSelectedColor(prev => ({
            ...prev,
            [productId]: String(value)
        }))
    }
    const handleSizeChange = (productId, value) => {
        setSelectedSize(prev => ({
            ...prev,
            [productId]: String(value)
        }))
    }

    const addtoCart = async (product) => {
        const quantity = quantities[product._id] || 1;

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth`, { withCredentials: true });
            const user = res.data.user;
            console.log(user.id)

            if (user) {
                const payload = {

                    items: [
                        {
                            productId: product._id,
                            quantity,
                            size: selectedSize[product._id],
                            color: selectedColor[product._id]
                        }
                    ]
                };

                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/cart/add`, payload, { withCredentials: true });
                setCart(response.data);
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
                updatedCart = [...productsInCart, { ...product, quantity, color: selectedColor, size: selectedSize }];
            }

            localStorage.setItem('ITEM', JSON.stringify(updatedCart));
            setCart(updatedCart);
        }

        window.dispatchEvent(new Event('cart-updated'));
    };





    return (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-16">
            {products.map((product, i) => (
                <div
                    key={i}
                    className="relative group bg-white rounded-xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl border border-gray-100"
                >
                    {/* Product Image */}
                    <div className="relative overflow-hidden">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_BASE}/${product.images[0]}`}
                            alt={product.productName}
                            width={400}
                            height={400}
                            className="object-cover w-full h-64 "
                        />
                        {product.stock <= 0 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white font-bold bg-red-500 px-3 py-1 rounded-full text-sm">Out of Stock</span>
                            </div>
                        )}
                    </div>

                    {/* Hover Overlay (unchanged as requested) */}
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-black px-6 py-4 space-y-2">
                        <div className="w-full">
                            <label className="text-sm mb-1 block">Size:</label>
                            <select
                                onChange={(e) => handleSizeChange(product._id, e.target.value)}
                                className="w-full bg-white text-black text-sm rounded px-2 py-1 focus:outline-none"
                            >
                                <option>Select size</option>
                                {product.sizes.map((size, i) => (
                                    <option key={i} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full">
                            <label className="text-sm mb-1 block">Color:</label>
                            <select
                                onChange={(e) => handleColorChange(product._id, e.target.value)}
                                className="w-full bg-white text-black text-sm rounded px-2 py-1 focus:outline-none"
                            >
                                <option>Select color</option>
                                {product.colors.map((color, i) => (
                                    <option key={i} value={color}>{color}</option>
                                ))}
                            </select>
                        </div>

                        <p className="text-sm">In Stock: {product.stock}</p>

                        <input
                            type="number"
                            min="1"
                            value={quantities[product._id] || 1}
                            onChange={e => handleQuantityChange(product._id, e.target.value)}
                            className="w-20 text-center px-2 py-1 text-black bg-white rounded"
                        />

                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => router.push(`/products/${product._id}`)}
                                className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1.5 rounded transition-colors"
                            >
                                View Details
                            </button>
                            <button
                                type="submit"
                                onClick={() => addtoCart(product)}
                                className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1.5 rounded transition-colors"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-2">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.productName}</h3>
                            {product.stock > 0 && product.stock < 10 && (
                                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Low Stock</span>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>

                        <div className="flex items-center justify-between mt-2">
                            <p className="text-orange-600 font-bold text-lg">${product.price.toFixed(2)}</p>
                            {product.originalPrice && (
                                <p className="text-gray-400 text-sm line-through">${product.originalPrice.toFixed(2)}</p>
                            )}
                        </div>

                        {product.rating && (
                            <div className="flex items-center mt-1">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-500 ml-1">({product.reviewCount || 0})</span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

}

export default List
