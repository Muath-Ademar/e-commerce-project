'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [orders, setOrders] = useState([])



  const changeDeliveryStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/orders/${orderId}/admin/update`, { deliveryStatus: newStatus }, { withCredentials: true })
      console.log(res.data)
      setOrders(orders.map(order =>
        order._id === orderId ?{
          ...order,
          deliveryStatus : res.data.orderStatus.deliveryStatus,
          paymentStatus : res.data.orderStatus.paymentStatus
        }
        : order
      ))
    } catch (error) {
      console.log("Error updating users: ", error)

    }
  }



  useEffect(() => {
    axios.get('http://localhost:8000/api/orders', { withCredentials: true })
      .then((res => {
        console.log(res.data)
        setOrders(res.data)
      }))
      .catch((err => console.log(err)))
  }, [])



  return (
    <div className="p-6 overflow-x-auto mt-9">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Dashboard</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
            Export Orders
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Products</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Shipping</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">#{order._id.slice(-6).toUpperCase()}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-col space-y-2">
                    {order.products.map((product, i) => (
                      <div key={i} className="flex items-start">
                        <div className="ml-2">
                          <div className="text-sm font-medium text-gray-800 line-clamp-1">
                            {product.productId.productName}
                          </div>
                          <div className="flex text-xs text-gray-500 space-x-3">
                            <span>Qty: {product.productQuantity}</span>
                            <span>${product.priceAtPurchase.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="text-sm text-gray-800">
                    <div className="font-medium">{order.shippingAddress.fullName}</div>
                    <div className="text-xs text-gray-500 line-clamp-2">
                      {order.shippingAddress.addressLine}, {order.shippingAddress.city}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    ${order.total.toFixed(2)}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.deliveryStatus}
                    onChange={(e) => changeDeliveryStatus(order._id, e.target.value)}
                    className="block w-full px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="pending" className="bg-gray-100">Pending</option>
                    <option value="processing" className="bg-amber-100">Processing</option>
                    <option value="shipped" className="bg-blue-100">Shipped</option>
                    <option value="delivered" className="bg-green-100">Delivered</option>
                    <option value="cancelled" className="bg-red-100">Cancelled</option>
                  </select>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${order.paymentStatus === 'paid'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                    }`}>
                    {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {order.createdAt ? (
                      <>
                        <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page
