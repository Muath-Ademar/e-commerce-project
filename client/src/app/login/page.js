"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const router = useRouter()

    const handleSubmit = (e) =>{
        e.preventDefault()

        axios.post("http://localhost:8000/api/login", {
            email,
            password
        }, {withCredentials: true})

        .then(res =>{
            setEmail("")
            setPassword("")
            router.push('/home')
        })
        .catch((err) => {
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
        });
    }
  return (
    <form className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4" onSubmit={handleSubmit}>
    <h2 className="text-2xl font-semibold text-gray-700 text-center">Login</h2>

    <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black border-[#ededed] " />
    </div>

    <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-black border-[#ededed]" />
    </div>

    <button type="submit" className="w-full bg-[#fe520a] text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200">
        Login
    </button>
</form>
  )
}

export default page
