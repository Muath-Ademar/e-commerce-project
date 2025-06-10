'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../components/AdminNavbar'
import DashboardIcon from '@mui/icons-material/Dashboard';

const page = () => {
    const [role, setRole] = useState(null)

        const getUserRole = async() =>{
        try {
            const res = await axios.get('http://localhost:8000/api/user',{ withCredentials: true})
            console.log(res.data.user.role)
            setRole(res.data.user.role)
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
