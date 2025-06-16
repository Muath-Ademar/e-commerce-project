'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../../components/AdminNavbar'
import { useRouter } from 'next/navigation'

const page = () => {
  const [messages, setMessages] = useState([])
  const [role, setRole] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/user', { withCredentials: true })
        const userRole = res.data.user.role
        setRole(userRole)
        if (userRole !== 'admin') {
          router.push('/home')
        }
      } catch (error) {
        console.log('error', error)
        router.push('/home')
      }
    }
    getUserRole()
  }, [router])

  useEffect(() => {


    axios.get('http://localhost:8000/api/messages', { withCredentials: true })
      .then(res => {
        console.log(res.data)
        setMessages(res.data)
      })
      .catch(err => console.log(err))

  }, [])

  if (role !== 'admin') {
    return null
  }
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <AdminNavbar />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">User Messages</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Subject</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Message</th>
              <th className='py-3 px-4 text-left text-sm font-semibold text-gray-700'>Created at</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{msg.userName}</td>
                  <td className="py-3 px-4 text-sm text-blue-600">{msg.email}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{msg.subject}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{msg.message}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">No messages found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page