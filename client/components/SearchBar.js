'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SearchBar = () => {
    const router = useRouter()
    const [query, setQuery] = useState('')

    const handleSearch = (e)=>{
        e.preventDefault()
        if(query.trim()){
            router.push(`/products?key=${encodeURIComponent(query)}`)
        }
    }
  return (
    <form onSubmit={handleSearch} className="relative w-64">
      <input
        type="text"
        name="search"
        value={query}
        onChange={e=> setQuery(e.target.value)}
        placeholder="Search for sportswear..."
        className="w-full pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D99655] transition-all"
      />
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
