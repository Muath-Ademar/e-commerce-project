"use client"
import Image from 'next/image'
import React from 'react'

const List = ({ products }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-16">
            {products.map((product, i) => (
                <div
                    key={i}
                    className="relative group bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition duration-300"
                >
                    <Image
                        src={product.images[0]}
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
                        <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded">
                            View Details
                        </button>
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
