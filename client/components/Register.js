"use client"
import axios from 'axios'
import React, { useState } from 'react'

const Register = ({onClose, onLoginSuccess}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:8000/api/register", {
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
            onLoginSuccess()
            
            const localCart = JSON.parse(localStorage.getItem('ITEM'));
            if(localCart  && Array.isArray(localCart) && localCart.length > 0){
                const items = localCart.map(item=>({
                    productId: item._id,
                    quantity: item.quantity
                }))
                
                try {
                    const cartRes = await axios.post(
                        'http://localhost:8000/api/cart/add',{
                            items
                        },
                        {withCredentials: true}
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
        }
    }
    return (
        <form className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Register</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" name='firstName' value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black border-[#ededed]" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black border-[#ededed]" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black border-[#ededed] " />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black border-[#ededed]" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" name="confirmPassword" value={confirmPassword || ''} onChange={e => setConfirmPassword(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black border-[#ededed]" />
            </div>

            <button type="submit" className="w-full bg-[#fe520a] text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200">
                Register
            </button>
        </form>
    )
}

export default Register
