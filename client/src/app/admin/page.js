'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../components/AdminNavbar'
import DashboardIcon from '@mui/icons-material/Dashboard';

const page = () => {
    const [role, setRole] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const openSideBar = ()=>{
        setIsOpen(true)
    }
        const getUserRole = async() =>{
        try {
            const res = await axios.get('http://localhost:8000/api/user-role',{ withCredentials: true})
            console.log(res.data.role)
            setRole(res.data.role)
        } catch (error) {
            console.log('error', error)
        }
    }
    useEffect(()=>{
        getUserRole()
    },[])
    if(role !== 'admin'){

        return(
            <h1>UnAuthorized</h1>
        )
    }
    
  return (
    
    <div className='flex'>
    <AdminNavbar/>
    </div>
  )
}

export default page
