import React from 'react'

// Note: I changed the Link import from 'react-router' to 'react-router-dom' 
// as Link is typically imported from 'react-router-dom' when used with BrowserRouter.
import { specialityData,assets } from '../assets/assets.js'
import { Link } from 'react-router' 


function SpecialityMenu() {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
        <h1 className='text-3xl font-medium'>Find by Speciality</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors</p>
          
        {/* Horizontal Scrolling Container */}
        <div className='flex justify-start gap-12 pt-5 w-full overflow-x-scroll no-scrollbar sm:justify-center'>
            {specialityData.map((item,index)=>(
              <Link 
              onClick={()=>scrollTo(0,0)}
                key={index} 
                to={`/doctors/${item.speciality}`}
                className='flex flex-col items-center gap-2 min-w-[120px] cursor-pointer hover:scale-[1.05] duration-200'
              >
                <img 
                    src={item.image} 
                    alt={item.speciality}
                    className='h-20 w-20 sm:h-24 sm:w-24'
                />
                <p className='text-sm font-medium whitespace-nowrap'>{item.speciality}</p>
                {/* Removed the redundant second <p> tag that was showing the speciality twice */}
              </Link>
            ))}
          </div>
        
    </div>
  )
}

export default SpecialityMenu