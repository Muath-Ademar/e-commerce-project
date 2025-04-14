'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import Register from './Register';

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
        <div className='bg-white shadow-sm px-8 py-4 flex justify-between items-center text-black'>
            <div className='text-xl font-bold tracking-wide'>Home</div>
            <div className='flex-1 flex items-center justify-center space-x-8'>
                <Link href="#" className='text-sm hover:text-[#D99655] transition'>About</Link>
                <Link href="#" className='text-sm hover:text-[#D99655] transition'>Products</Link>
                <Link href="#" className='text-sm hover:text-[#D99655] transition'>Contact Us</Link>
                <button 
                        onClick={() => setShowModal(true)} 
                        className='text-sm hover:text-[#D99655] transition'
                        >
                        Register
                    </button>
                <div className='relative ml-4'>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-300 rounded-full pl-4 pr-10 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D99655] transition-all w-48"
                        />
                    <svg
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z" />
                    </svg>
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
