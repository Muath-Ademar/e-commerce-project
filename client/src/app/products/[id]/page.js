"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [product, setProduct] = useState('')
    const {id} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then(res =>{
            console.log(res.data)
            setProduct(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])
  return (
    <div className='text-black'>
      <h1>{product.productName}</h1>
      <p>{product.description}</p>
      <p>{product.sizes}</p>
      <p>{product.colors}</p>
      <p>{product.price}</p>
    </div>
  )
}

export default page
