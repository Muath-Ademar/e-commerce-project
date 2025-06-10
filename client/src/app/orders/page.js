'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [orders, setOrders] = useState([])



  const deleteOrder = (orderId) => {
    axios.delete(`http://localhost:8000/api/orders/delete/${orderId}`, { withCredentials: true })
      .then(res => {
        console.log(res.data)
        setOrders(orders.filter(order => order._id != orderId))
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    axios.get('http://localhost:8000/api/orders/user', { withCredentials: true })
      .then(res => {
        setOrders(res.data.orders)

      })
      .catch(error => console.log(error))
  }, [])
  return (
    <div className="min-h-screen w-full bg-[#fffaf5]">

      <div className="p-6 max-w-4xl mx-auto bg-[#fffaf5]">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={order._id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">Order #{index + 1}</h2>
                      <p className="text-sm text-gray-500 mb-2">Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.deliveryStatus === 'delivered'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-blue-50 text-blue-700'
                        }`}>
                        {order.deliveryStatus.charAt(0).toUpperCase() + order.deliveryStatus.slice(1)}
                      </span>
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => deleteOrder(order._id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
                    <div className="space-y-4">
                      {order.products.map((product, i) => (
                        <div key={i} className="flex justify-between">
                          <div className="flex items-center">
                            <div className="bg-gray-100 rounded-md w-10 h-10 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{product.productId.productName}</p>
                              <p className="text-sm text-gray-500">Qty: {product.productQuantity}</p>
                            </div>
                          </div>
                          <p className="font-medium text-gray-900">
                            ${(product.productId.price * product.productQuantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="text-gray-700 font-mono">{order._id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default page
