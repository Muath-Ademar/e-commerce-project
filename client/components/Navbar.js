'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { ShoppingCartIcon, XCircleIcon } from '@heroicons/react/24/solid';
import Register from './Register';
import SearchBar from './SearchBar';

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [openCart, setOpenCart] = useState(false)

    const handleCartClick = () => {
        if(openCart === false){
            setOpenCart(true)
        }
        else{
            setOpenCart(false)
        }
    }

    const handleCartClose = ()=>{
        setOpenCart(false)
    }

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
                        <SearchBar />
                    </div>
                </div>
                <div className='ml-4'>
                    <ShoppingCartIcon onClick={handleCartClick} className='h-6 w-6 text-gray-700 hover:text-[#D99655] cursor-pointer transition' />
                    {openCart &&
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                            <div className="p-4 border-b border-gray-100 font-semibold text-gray-800 flex justify-between items-center">
                                <h1>
                                    Cart Summary    
                                </h1>
                                <XCircleIcon width={25} height={25} onClick={handleCartClose} className='hover:cursor-pointer'/>
                            </div>

                            <ul className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                                {/* Single Item */}
                                <li className="flex items-center gap-4 p-4 hover:bg-gray-50">
                                    <img
                                        src="/placeholder.png"
                                        alt="Product"
                                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                                    />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-800">Running Shoes</div>
                                        <div className="text-xs text-gray-500">Size: 42 • Qty: 1</div>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-700">$89.99</div>
                                </li>

                                {/* Repeat li for other items */}
                            </ul>

                            <div className="p-4 border-t border-gray-100">
                                <div className="flex justify-between text-sm font-medium text-gray-700 mb-3">
                                    <span>Subtotal</span>
                                    <span>$179.98</span>
                                </div>
                                <button className="w-full py-2 px-4 bg-[#D99655] text-white text-sm font-semibold rounded-lg hover:bg-[#c9833d] transition">
                                    Checkout
                                </button>
                            </div>
                        </div>

                    }
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
