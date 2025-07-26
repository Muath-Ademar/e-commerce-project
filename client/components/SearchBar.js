'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SearchBar = ({initialQuery=''}) => {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [isOpen, setIsOpen] = useState(false)
  const [searchedProducts, setSearchedProducts] = useState([])
  const handleResultClick = (id) =>{
    setIsOpen(false)
    setSearchedProducts([])
    router.push(`/products/${id}`)
  }

  useEffect(() => {
    if (!query.trim()) {
      setIsOpen(false)
      setSearchedProducts([])
      return
    }
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/products/search?key=${encodeURIComponent(query)}`)
      .then(res => {
        setSearchedProducts(res.data)
        setIsOpen(true)
      })
      .catch(() => {
        setSearchedProducts([])
        setIsOpen(false)
      })
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/products?key=${encodeURIComponent(query)}`)
      setIsOpen(true)
    }
    else{
      setIsOpen(false)
    }
  }
  return (
    <form onSubmit={handleSearch} className="relative w-64">
      <input
        type="text"
        name="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for sportswear..."
        className="w-full pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D99655] transition-all"
      />
      {isOpen &&
      <ul className="absolute left-0 mt-2 w-full z-10 bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
        {searchedProducts.map((product, i)=>(
          
              <li key={i} onClick={()=> handleResultClick(product._id)} className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer">{product.productName}</li>
          
        ))}
      </ul>
      }
      <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <svg
          className="w-4 h-4 text-gray-500 hover:text-[#D99655] transition"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z" />
        </svg>
      </button>
    </form>
  )
}

export default SearchBar
