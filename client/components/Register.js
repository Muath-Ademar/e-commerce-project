'use client'
import axios from 'axios'
import React, { useState } from 'react'

const Register = ({ onClose, onRegisterSuccess, showLogin, setShowLogin }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/api/register`, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            }, { withCredentials: true })

            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setConfirmPassword("")
            onClose()
            setErrors({})
            onRegisterSuccess()

            const localCart = JSON.parse(localStorage.getItem('ITEM'));
            if (localCart && Array.isArray(localCart) && localCart.length > 0) {
                const items = localCart.map(item => ({
                    productId: item._id,
                    quantity: item.quantity
                }))

                try {
                    const cartRes = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_BASE}/api/cart/add`, {
                        items
                    },
                        { withCredentials: true }
                    );
                    console.log("🛒 Cart synced to backend:", cartRes.data);
                    localStorage.removeItem('ITEM')
                    window.dispatchEvent(new Event('cart-updated'))
                } catch (cartErr) {
                    console.error("Cart sync error:", cartErr.response?.data || cartErr);
                }
            }
        } catch (err) {
            if (err.response && err.response.data) {
                if(err.response.data.errors){

                    console.log(err.response.data);
                    const errorsObject = err.response.data.errors;
                    const errorMessages = {};
                    
                    for (let key of Object.keys(errorsObject)) {
                        errorMessages[key] = errorsObject[key].message;
                    }
                    
                    setErrors(errorMessages); 
                } else if (err.response.data.msg){
                    //since in your backend you send the error for the existing email in "msg" then this way you can make it show on the form 
                    setErrors({email: err.response.data.msg})
                }
            } else {
                console.error("Unexpected error:", err);
            }
        }
    }
    return (
        <div>

            <form className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold text-gray-700 text-center">Register</h2>

                {errors.general && (
                    <p className="text-red-600 text-center">{errors.general}</p>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" name='firstName' value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black border-[#ededed]" />
                    {errors.firstName && <p className="text-sm text-red-500 mt-1 ml-0.5">{errors.firstName}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black border-[#ededed]" />
                    {errors.lastName && <p className="text-sm text-red-500 mt-1 ml-0.5">{errors.lastName}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black border-[#ededed] " />
                    {errors.email && <p className="text-sm text-red-500 mt-1 ml-0.5">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black border-[#ededed]" />
                    {errors.password && <p className="text-sm text-red-500 mt-1 ml-0.5">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" name="confirmPassword" value={confirmPassword || ''} onChange={e => setConfirmPassword(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black border-[#ededed]" />
                    {errors.confirmPassword && <p className="text-sm text-red-500 mt-1 ml-0.5">{errors.confirmPassword}</p>}
                </div>

                <button type="submit" className="w-full bg-[#fe520a] text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200">
                    Register
                </button>
                <p className='text-center'>Already have an account? <button type='button' onClick={()=> setShowLogin(true)} className='text-[#3a91f1]' >Login</button></p>
                
            </form>
        </div>
    )
}

export default Register
