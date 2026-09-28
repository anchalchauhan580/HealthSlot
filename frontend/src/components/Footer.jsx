import React from 'react'
import { assets } from '../assets/assets' // Assuming your logo is stored in assets

function Footer() {
  return (
    // Main Container: Centered, white background, controlled vertical padding, and a clean top border
    <div className='w-full bg-white pt-20 pb-10 mt-20 border-t border-gray-100'>
      
      {/* Footer Content Grid (Wrapper for max width and side margins) */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-10 lg:gap-20 mx-4 sm:mx-[10%]'>
        
        {/* --- Column 1: Logo and Description (Takes 2 grid columns on medium screens) --- */}
        <div className='flex flex-col gap-5 col-span-1 md:col-span-2 lg:col-span-2'>
          
          {/* Logo and Brand Name */}
          <div className='flex items-center gap-2'>
            <img src={assets.logo} alt="Prescripto Logo" className='w-8 h-8' />
            <p className='text-2xl font-extrabold text-gray-900'>Prescripto</p>
          </div>
          
          {/* Description Text with constrained width and soft color */}
          <p className='text-gray-500 text-sm leading-relaxed max-w-sm'>
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        
        {/* --- Column 2: Company Links --- */}
        <div className='flex flex-col gap-4 text-gray-700'>
          <h3 className='text-lg font-bold text-gray-900 mb-2'>COMPANY</h3>
          <p className='text-base text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-150'>Home</p>
          <p className='text-base text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-150'>About us</p>
          <p className='text-base text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-150'>Contact us</p>
          <p className='text-base text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-150'>Privacy policy</p>
        </div>
        
        {/* --- Column 3: Get In Touch --- */}
        <div className='flex flex-col gap-4 text-gray-700'>
          <h3 className='text-lg font-bold text-gray-900 mb-2'>GET IN TOUCH</h3>
          {/* Contact details with soft color */}
          <p className='text-base text-gray-500'>+1-212-456-7890</p>
          <p className='text-base text-gray-500'>greatstockdevil@gmail.com</p>
        </div>
      </div>
      
      {/* --- Copyright Line --- */}
      {/* Separator line and centered copyright text */}
      <div className='mt-12 pt-6 border-t border-gray-100 text-center text-gray-500 text-sm mx-4 sm:mx-[10%]'>
        Copyright 2024© Prescripto - All Right Reserved.
      </div>
    </div>
  )
}

export default Footer