'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import React, { useState } from 'react'

const Login = ({ onLoginSuccess, showLogin, setShowLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const router = useRouter()


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/login`, {
                email,
                password
            }, { withCredentials: true });

            setEmail("");
            setPassword("");
            setError("")
            onLoginSuccess();

            // get user role 
            const roleRes = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/user`, { withCredentials: true })
            const userRole = roleRes.data.user.role
            console.log(userRole)

            // Now sync cart only after login success
            const localCart = JSON.parse(localStorage.getItem('ITEM'));

            if (localCart && Array.isArray(localCart) && localCart.length > 0) {
                const items = localCart.map(item => ({
                    productId: item._id,
                    quantity: item.quantity
                }));

                try {
                    const cartRes = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_BASE}/api/cart/add`,
                        { items },
                        { withCredentials: true }
                    );
                    console.log("🛒 Cart synced to backend:", cartRes.data);
                    localStorage.removeItem('ITEM');
                    window.dispatchEvent(new Event('cart-updated'));
                } catch (cartErr) {
                    console.error("Cart sync error:", cartErr.response?.data || cartErr);
                }
            }
            router.push(userRole === 'admin' ? '/admin' : '/');


        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg)


            } else {
                console.error("Unexpected error:", err);
            }
        }
    }
    return (
        <form className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Login</h2>

            {error && (
                <p className="text-red-600 text-center">{error}</p>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black border-[#ededed]"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black border-[#ededed]"
                />
            </div>

            <button type="submit" className="w-full bg-[#fe520a] text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200">
                Login
            </button>

            <p className='text-center'>Don&apos;t have an account?{' '}
                <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className='text-[#3a91f1]'
                >
                    Register
                </button>
            </p>
        </form>
    )
}

export default Login
