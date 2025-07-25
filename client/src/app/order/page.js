'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [form, setForm] = useState({
    fullName: '',
    addressLine: '',
    city: ''
  });
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)


  useEffect(()=>{
    const stored = localStorage.getItem('ORDER_DATA')
    if(stored){
      const parsed = JSON.parse(stored);
      setProducts(parsed.products || [])
      setTotal(parsed.total || 0)
    }
  }, [])

    const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(!form.fullName || !form.addressLine || !form.city) {
      alert('Please fill all the shipping fields')
      return;
    }

    try {
      const payload = {
        products: products.map(item => ({
          productId: item.productId,
          productQuantity: item.productQuantity,
          priceAtPurchase: item.priceAtPurchase,
          color: item.color,
          size: item.size
        })),
        shippingAddress: form
      }
      const res = await axios.post('http://localhost:8000/api/orders', payload, {withCredentials: true})
      alert('Order placed Successfully')
      setForm({
          fullName: '',
          addressLine: '',
          city: ''
        })
        console.log(res.data)
        setProducts([])
        setTotal(0)
      localStorage.removeItem('ORDER_DATA')
      const deleteAll = await axios.delete('http://localhost:8000/api/cart/delete', {withCredentials: true})

    } catch (error) {
      console.error('Order failed:', error.response?.data || error.message);
      alert('Something went wrong. Please try again.');
    }
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 mb-17">
      <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address Line</label>
          <input
            type="text"
            name="addressLine"
            value={form.addressLine}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        <h3 className="text-lg font-semibold mt-6">Order Summary</h3>
        <ul className="divide-y divide-gray-200">
          {products.map((item, i) => (
            <li key={i} className="py-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">{item.productName}</p>
                <p className="text-xs text-gray-500">Quantity: {item.productQuantity}</p>
                <p className="text-xs text-gray-500">Price: {item.priceAtPurchase}</p>
                <p className="text-xs text-gray-500">Color: {item.color}</p>
                <p className="text-xs text-gray-500">Size: {item.size}</p>

              </div>
            </li>
            
          ))}
          <h1 className='text-black'>Total: {total.toFixed(2)}</h1>
        </ul>

        <button
          type="submit"
          className="w-full mt-4 bg-[#D99655] hover:bg-[#c9833d] text-white py-2 px-4 rounded-lg font-semibold"
        >
          Place Order
        </button>
      </form>
    </div>
  )
}

export default page
