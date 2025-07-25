'use client'
import React, { useEffect, useMemo, useState } from 'react'
import List from '../../../components/List';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const page = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [productsInCart, setProductsInCart] = useState([])
    const [category, setCategory] = useState('')
    const [colors, setColors] = useState('')
    const [sizes, setSizes] = useState('')
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(400)
    const searchParams = useSearchParams()
    const searchQuery = useMemo(() => searchParams.get('key') || '', [searchParams]);

    const categories = ['Shoes', 'T-Shirts', 'Shorts', 'Hoodies', 'Tracksuits', 'Jackets', 'Sports Bras', 'Leggings', 'Socks', 'Accessories']

    useEffect(() => {
        const storedItems = localStorage.getItem('ITEM')
        if (storedItems) {
            setProductsInCart(JSON.parse(storedItems))
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()

        axios.get('http://localhost:8000/api/products/filter', { params: { category, colors, sizes, minPrice, maxPrice } })
            .then(res => {
                console.log(res.data)
                setFilteredProducts(res.data)
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    console.log(err.response.data);
                    const errorsObject = err.response.data.errors;
                    const errorMessages = {};

                    for (let key of Object.keys(errorsObject)) {
                        errorMessages[key] = errorsObject[key].message;
                    }

                    setErrors(errorMessages); // or whatever you're doing with them
                } else {
                    console.error("Unexpected error:", err);
                }
            })
    }

    useEffect(() => {
        const endpoint = searchQuery ? `products/search?key=${searchQuery}` : 'products'
        axios.get(`http://localhost:8000/api/${endpoint}`)
            .then(res => {
                console.log(res.data)
                if (Array.isArray(res.data)) {

                    const sorted = res.data.sort((a, b) => a.productName.localeCompare(b.productName))
                    setProducts(sorted)
                    setFilteredProducts([]);
                }
            });
    }, [searchQuery])
    return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-16">
        {/* Header with subtle texture */}
        <div className="relative py-16 px-4 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/627a1044a798e6627445c8d1/627a1045a798e6e3a245c9d6_noise.png')] opacity-5"></div>
            <div className="relative max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                    Curated Collection
                </h1>
                <p className="text-lg text-gray-600 font-light">
                    Filter through our premium selection
                </p>
            </div>
        </div>

        {/* Floating filter card */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {/* Category */}
                    <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</label>
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="w-full px-4 py-3 text-sm border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all"
                        >
                            <option value="">All</option>
                            {categories.map((category, i) => (
                                <option key={i} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Color */}
                    <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Color</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 text-sm border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all"
                            placeholder="Any"
                            value={colors}
                            onChange={e => setColors(e.target.value)}
                        />
                    </div>

                    {/* Sizes */}
                    <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Size</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 text-sm border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all"
                            placeholder="Any"
                            value={sizes}
                            onChange={e => setSizes(e.target.value)}
                        />
                    </div>

                    {/* Min Price */}
                    <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Min Price</label>
                        <div className="relative">
                            <input
                                type="number"
                                className="w-full pl-10 pr-4 py-3 text-sm border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all"
                                placeholder="$0"
                                value={minPrice}
                                onChange={e => setMinPrice(e.target.value)}
                            />
                            <span className="absolute left-3 top-3 text-gray-400">$</span>
                        </div>
                    </div>

                    {/* Max Price */}
                    <div className="space-y-1">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Max Price</label>
                        <div className="relative">
                            <input
                                type="number"
                                className="w-full pl-10 pr-4 py-3 text-sm border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-orange-200 focus:bg-white transition-all"
                                placeholder="$∞"
                                value={maxPrice}
                                onChange={e => setMaxPrice(e.target.value)}
                            />
                            <span className="absolute left-3 top-3 text-gray-400">$</span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="w-full px-6 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
                        >
                            Filter
                        </button>
                    </div>
                </div>
            </form>
        </div>

        {/* Products List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <List products={filteredProducts.length > 0 ? filteredProducts : products} />
        </div>
    </div>
)
}

export default page
