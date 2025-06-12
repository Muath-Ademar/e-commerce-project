'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Delete from '../../../../components/Delete'

const page = () => {
  const [users, setUsers] = useState([])



  
  
  useEffect(()=>{     
      axios.get('http://localhost:8000/api/users', {withCredentials: true})
      .then(res =>{
        console.log(res.data)
        const regularUsers = res.data.filter(user=> user.role != 'admin')
        setUsers(regularUsers)
      })
      .catch(err=> console.log(err))
    }, [])

  
  const deleteUser = (id) =>{
      axios.delete(`http://localhost:8000/api/user/delete/${id}`, {withCredentials: true})
      .then(res=>{
        console.log(res.data)
        setUsers(users.filter(user=> user._id !== id))
      })
      .catch(err => console.log(err))
      
      
    }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">User Management</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-11 bg-gray-100 p-4 font-semibold text-gray-700 border-b">
            <div className="col-span-2">First Name</div>
            <div className="col-span-2">Last Name</div>
            <div className="col-span-3">Email</div>
            <div className="col-span-2">Joined</div>
            <div className="col-span-2">Actions</div>
          </div>
          
          {users.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Loading users...</div>
          ) : (
            users.map((user) => (
              <div key={user._id} className="grid grid-cols-11 p-4 items-center border-b hover:bg-gray-50 transition-colors">
                <div className="col-span-2 font-medium text-gray-800">{user.firstName}</div>
                <div className="col-span-2 text-gray-700">{user.lastName}</div>
                <div className="col-span-3 text-gray-600 truncate" title={user.email}>{user.email}</div>
                <div className="col-span-2 text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
                <div className="col-span-2">
                    <Delete successCallBack={()=>deleteUser(user._id)}/>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          Showing {users.length} user{users.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}

export default page
