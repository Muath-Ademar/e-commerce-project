"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import List from '../../../components/List';
import axios from 'axios';

const page = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [category, setCategory] = useState('')
    const [colors, setColors] = useState('')
    const [sizes, setSizes] = useState('')
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(400)

    const categories = ['Shoes', 'T-Shirts', 'Shorts', 'Hoodies', 'Tracksuits', 'Jackets', 'Sports Bras', 'Leggings', 'Socks', 'Accessories']


    const handleSubmit = (e) => {
        e.preventDefault()

        axios.get('http://localhost:8000/api/products/filter',  {params: { category, colors, sizes, minPrice, maxPrice }})
            .then(res =>{
                console.log(res.data)
                setFilteredProducts(res.data)
            })
            .catch((err)=>{
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
        axios.get('http://localhost:8000/api/products')
            .then(res => {
                console.log(res.data)
                const sorted = res.data.sort((a, b) => a.productName.localeCompare(b.productName))
                setProducts(sorted)
            });
    }, [])
    return (
        <div className="bg-[#fffaf5] min-h-screen">
            <div className="text-center py-12">
                <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
                <p className="mt-2 text-gray-600">Browse through our latest arrivals and top picks</p>
            </div>
            <form onSubmit={handleSubmit}>
                Category <select value={category} onChange={e=> setCategory(e.target.value)} className='text-black'>
                    <option >select</option>
                    {categories.map((category, i)=> (
                        <option key={i}>{category}</option>
                    ))}
                </select>
                <div>
                    <label className='text-black mr-3'>color</label>
                    <input type='text' className='text-black' placeholder='write the color here....' value={colors} onChange={e => setColors(e.target.value)}/>
                </div>
                <div>
                    <label className='text-black mr-3'>sizes</label>
                    <input type='text' className='text-black' placeholder='write the size here....' value={sizes} onChange={e=> setSizes(e.target.value)}/> 
                </div>
                <div>
                    <label className='text-black mr-3'>Minimum price</label>
                    <input type='number' className='text-black'  value={minPrice} onChange={e=> setMinPrice(e.target.value)}/> 
                </div>
                <div>
                    <label className='text-black mr-3'>Maximum price</label>
                    <input type='number' className='text-black'  value={maxPrice} onChange={e=> setMaxPrice(e.target.value)}/> 
                </div>
                <button type="submit" className="w-full bg-[#fe520a] text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200">submit</button>
            </form>
                
            <List products={filteredProducts.length > 0 ? filteredProducts : products} />
        </div>
    )
}

export default page
