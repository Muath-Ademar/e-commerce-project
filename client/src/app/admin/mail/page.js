'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../../components/AdminNavbar'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [messages, setMessages] = useState([])
  const [role, setRole] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/user`, { withCredentials: true })
        const userRole = res.data.user.role
        setRole(userRole)
        if (userRole !== 'admin') {
          router.push('/home')
        }
      } catch (error) {
        router.push('/home')
      }
    }
    getUserRole()
  }, [router])

  useEffect(() => {


    axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/messages`, { withCredentials: true })
      .then(res => {
        setMessages(res.data)
      })
      .catch(err => console.log(err))

  }, [])

  if (role !== 'admin') {
    return null
  }
  return (
    <div className="p-6 overflow-x-auto mt-9 ml-20">
      <AdminNavbar />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Messages</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{msg.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{msg.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{msg.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">{msg.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {msg.createdAt ? (
                      <>
                        <div>{new Date(msg.createdAt).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">No messages found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page