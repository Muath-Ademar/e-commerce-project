import React from 'react'

const Footer = () => {
  return (
<footer className=' bottom-0 left-0 w-full bg-[#1E1C1A] text-white py-10 px-6 z-50'>

  <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10'>
    {/* Brand Info */}
    <div>
      <h2 className='text-xl font-bold mb-3'>YourBrand</h2>
      <p className='text-sm text-gray-400'>
        Premium fashion made with care. Follow us for style inspiration and latest drops.
      </p>
    </div>

    {/* Navigation */}
    <div>
      <h2 className='text-xl font-bold mb-3'>Links</h2>
      <ul className='space-y-2 text-sm text-gray-300'>
        <li><a href='#' className='hover:text-white'>Home</a></li>
        <li><a href='#' className='hover:text-white'>Shop</a></li>
        <li><a href='#' className='hover:text-white'>Contact</a></li>
        <li><a href='#' className='hover:text-white'>About</a></li>
      </ul>
    </div>

    {/* Social Media */}
    <div>
      <h2 className='text-xl font-bold mb-3'>Follow Us</h2>
      <div className='flex space-x-4'>
        <a href='#' className='hover:text-[#fe520a]'>Instagram</a>
        <a href='#' className='hover:text-[#fe520a]'>Facebook</a>
        <a href='#' className='hover:text-[#fe520a]'>Twitter</a>
      </div>
    </div>
  </div>

  <div className='text-center text-gray-500 text-sm mt-10'>
    © {new Date().getFullYear()} YourBrand. All rights reserved.
  </div>
</footer>
  )
}

export default Footer
