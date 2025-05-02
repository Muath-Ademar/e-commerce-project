'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import Register from './Register';
import SearchBar from './SearchBar';

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <div className='bg-white shadow-sm px-8 py-4 flex justify-between items-center text-black'>
            <div className='text-xl font-bold tracking-wide'><Link href={'/home'}>Home</Link></div>
            <div className='flex-1 flex items-center justify-center space-x-8'>
                <Link href="#" className='text-sm hover:text-[#D99655] transition'>About</Link>
                <Link href="/products" className='text-sm hover:text-[#D99655] transition'>Products</Link>
                <Link href="#" className='text-sm hover:text-[#D99655] transition'>Contact Us</Link>
                <button 
                        onClick={() => setShowModal(true)} 
                        className='text-sm hover:text-[#D99655] transition'
                        >
                        Register
                    </button>
                <div className='relative ml-4'>
                    <SearchBar/>
                </div>
            </div>
            <div className='ml-4'>
                <ShoppingCartIcon className='h-6 w-6 text-gray-700 hover:text-[#D99655] cursor-pointer transition' />
            </div>
        </div>
        {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl relative w-full max-w-xl">
                        <button 
                            onClick={() => setShowModal(false)} 
                            className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl font-bold"
                        >
                            &times;
                        </button>
                        <Register onClose={() => setShowModal(false)} />
                    </div>
                </div>
            )}
            </>
    );
};

export default Navbar;
