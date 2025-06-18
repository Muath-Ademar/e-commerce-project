"use client"
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const List = ({ products }) => {
    const router = useRouter()
    const [quantities, setQuantites] = useState({})
    const [cart, setCart] = useState([]) // Add cart state

    const handleQuantityChange = (productId, value) => {
        setQuantites(prev => ({
            ...prev,
            [productId]: Number(value)
        }))
    }

    const addtoCart = async (product) => {
    const quantity = quantities[product._id] || 1;

    try {
        const res = await axios.get('http://localhost:8000/api/auth', { withCredentials: true });
        const user = res.data.user;
        console.log(user.id)

        if (user) {
            const payload = {
                
                items: [
                    {
                        productId: product._id,
                        quantity
                    }
                ]
            };

            const response = await axios.post('http://localhost:8000/api/cart/add', payload, { withCredentials: true });
            setCart(response.data);
            console.log('Cart response:', response.data);
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
            updatedCart = [...productsInCart, { ...product, quantity }];
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
                    className="relative group bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition duration-300"
                >
                    <Image
                        src={`http://localhost:8000/${product.images[0]}`}
                        alt={product.productName}
                        width={400}
                        height={400}
                        className="object-cover w-full h-64"
                    />

                    {/* Hover Details Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-white p-4">
                        <p className="text-sm mb-1">Sizes: {product.sizes.join(', ')}</p>
                        <p className="text-sm mb-1">Colors: {product.colors.join(', ')}</p>
                        <p className="text-sm mb-3">In Stock: {product.stock}</p>
                        <button onClick={() => router.push(`/products/${product._id}`)} className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded">
                            View Details
                        </button>
                        <button type="submit" onClick={() => addtoCart(product)} className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded">Add to cart</button>
                        <input
                            type="number"
                            min="1"
                            value={quantities[product._id] || 1}
                            onChange={e => handleQuantityChange(product._id, e.target.value)}
                            className="w-16 text-white text-center p-1 rounded mb-2"
                        />
                    </div>

                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">{product.productName}</h3>
                        <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
                        <p className="text-orange-600 font-bold">${product.price.toFixed(2)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default List
