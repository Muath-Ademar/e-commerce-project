'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../../components/AdminNavbar'
import { useRouter } from 'next/navigation'

const page = () => {
    const [productName, setProductName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [sizes, setSizes] = useState("")
    const [colors, setColors] = useState("")
    const [price, setPrice] = useState(0)
    const [images, setImages] = useState(null)
    const [stock, setStock] = useState(0)
    const [role, setRole] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const getUserRole = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/user', { withCredentials: true })
                const userRole = res.data.user.role
                setRole(userRole)
                if (userRole !== 'admin') {
                    router.push('/home')
                }
            } catch (error) {
                console.log('error', error)
                router.push('/home')
            }
        }
        getUserRole()
    }, [router])


    const categories = ['Shoes', 'T-Shirts', 'Shorts', 'Hoodies', 'Tracksuits', 'Jackets', 'Sports Bras', 'Leggings', 'Socks', 'Accessories']


    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('productName', productName)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('price', price)
        formData.append('stock', stock)
        formData.append('sizes', JSON.stringify(sizes.split(',').map(size => size.trim()).filter(Boolean)))
        formData.append('colors', JSON.stringify(colors.split(',').map(color => color.trim()).filter(Boolean)))
        for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
    }

        axios.post('http://localhost:8000/api/products', formData, { withCredentials: true, headers: {'Content-Type': 'multipart/form-data'} })
            .then(res => {
                console.log(res.data)
                setProductName("")
                setDescription("")
                setCategory("")
                setSizes("")
                setColors("")
                setPrice(0)
                setCategory("")
                setStock(0)
                alert("Product is created")
            })
            .catch(err => console.log(err))
    }

    if (role !== 'admin') {
        return null
    }
    return (
        <div>
            <AdminNavbar />
            <form onSubmit={handleSubmit} className="bg-white p-6  border-gray-100 mt-13" >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Row 1 */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter product name"
                            value={productName}
                            name='productName'
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>


                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    {/* Row 2 */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select category</option>
                            {categories.map((category, i) => (
                                <option key={i} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>

                    {/* Row 3 */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Images (<small className="text-gray-500">Hold Ctrl (or ⌘ on Mac) to select multiple images</small>)</label>
                        <input
                            type="file"
                            multiple ="multiple"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            accept='image/*'
                            onChange={(e) => setImages(Array.from(e.target.files))}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Sizes</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={sizes}
                            onChange={(e) => setSizes(e.target.value)}
                            placeholder="Enter sizes separated by commas (e.g.: S, M, L)"
                        />
                    </div>

                    {/* Row 4 */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Colors</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={colors}
                            onChange={(e) => setColors(e.target.value)}
                            placeholder="Enter colors separated by commas (e.g.: red, black, blue)"
                        />
                    </div>

                </div>

                {/* Full width textarea */}
                <div className="mb-6 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        placeholder="Product description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>

                {/* Form actions */}
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    )
}

export default page
