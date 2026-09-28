import React from 'react'
import { useContext } from 'react'
// Import the 'doctors' data array

import { Link, useNavigate } from 'react-router' // Link component for navigation
import { AppContext } from '../context/AppContext'

function TopDoctors() {
    const {doctors}=useContext(AppContext)
    const navigate=useNavigate()
  return (
    // Outer container with spacing and centered items
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors</p>

      {/* Grid Container for Doctor Cards */}
      <div className='w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 pt-5 gap-y-6 px-3 sm:px-0'>
        
        {/* Iterate over the first 10 doctors from the array */}
        {doctors.slice(0, 10).map((item, index) => (
          // Use the corrected path /appointment/ to link to the detail page
          <Link 
            key={index} 
            to={`/appointment/${item._id}`} // <--- CORRECTED TO '/appointment/'
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl duration-200'
          >
            {/* Image Container */}
            <div className='bg-blue-50'>
              <img 
                src={item.image} 
                alt={item.name} 
                className='w-full h-48 object-cover' 
              />
            </div>
            
            {/* Text Content Area */}
            <div className='p-4'>
              {/* Availability/Status */}
              <div className='flex items-center gap-2 text-sm text-green-500'>
                <div
  className={`w-2 h-2 rounded-full ${
    item.available ? 'bg-green-500' : 'bg-red-500'
  }`}
></div>

                {!item.available?<p className='text-red-400'>Not Available</p>:<p className='text-green-400'>Available</p>}
              </div>

              {/* Doctor Name and Speciality */}
              <p className='text-gray-900 text-lg font-medium mt-2'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* More Button */}
      <button 
      onClick={()=>{navigate('/doctors');scrollTo(0,0)}}
      
      className='bg-blue-500 text-white px-6 py-2 rounded-full mt-4 hover:bg-blue-600 duration-200'>
        More
      </button>
    </div>
  )
}

export default TopDoctors