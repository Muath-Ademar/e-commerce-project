import Link from 'next/link'
import React from 'react'
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
    return (
        <div className='bg-white shadow-sm flex justify-between items-center py-4 px-10 sm:mx-80    text-center text-black'>
            <h1 className='text-lg font-semibold'>Home</h1>
            <div className='flex space-x-6 text-sm'>

                <Link href='#' className='hover:underline'>About</Link>
                <Link href='#' className='hover:underline' >Products</Link>
                <Link href='#' className='hover:underline' >Contact Us</Link>
                <Link href='#'  className='hover:underline'>Register</Link>
            </div>
            <ShoppingCartIcon className='h-8 w-8 hover:scale-140 transition-transform duration-150 cursor-pointer'/>
            
        </div>
    )
}

export default Navbar
