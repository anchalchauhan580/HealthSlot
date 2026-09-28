import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router'
import { AppContext } from '../context/AppContext'

function Doctors() {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const [filterDoc, setFilterDoc] = useState([])
  const [showfilter,setShowfilter]=useState(false)
  const { doctors } = useContext(AppContext)
  
  
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        {/* Left sidebar - Specialty filters */}
        <button 
  onClick={() => setShowfilter(prev => !prev)} 
  className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showfilter ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
>
  Filter
</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showfilter?'flex':'hidden sm:flex'}`}>
          <p 
            onClick={()=>speciality==='General physician'?navigate('/doctors'):navigate('/doctors/General physician')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${!speciality ? 'bg-indigo-100 text-black' : ''}`}
          >
            General physician
          </p>
          <p 
             onClick={()=>speciality==='Gynecologist'?navigate('/doctors'):navigate('/doctors/Gynecologist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-indigo-100 text-black' : ''}`}
          >
            Gynecologist
          </p>
          <p 
             onClick={()=>speciality==='Dermatologist'?navigate('/doctors'):navigate('/doctors/Dermatologist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-indigo-100 text-black' : ''}`}
          >
            Dermatologist
          </p>
          <p 
           onClick={()=>speciality==='Pediatricians'?navigate('/doctors'):navigate('/doctors/Pediatricians')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-indigo-100 text-black' : ''}`}
          >
            Pediatricians
          </p>
          <p 
             onClick={()=>speciality==='Neurologist'?navigate('/doctors'):navigate('/doctors/Neurologist')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-indigo-100 text-black' : ''}`}
          >
            Neurologist
          </p>
          <p 
            onClick={()=>speciality===' General physician'?navigate('/doctors'):navigate('/doctors/General physician')}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-indigo-100 text-black' : ''}`}
          >
            Gastroenterologist
          </p>
        </div>

        {/* Right side - Doctors grid (4 columns) */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div 
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index} 
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            >
              <img className='bg-blue-50 w-full' src={item.image} alt='' />
              <div className='p-4'>
               <div className="flex items-center gap-2 text-sm">
  <div
    className={`w-2 h-2 rounded-full ${
      item.available ? 'bg-green-500' : 'bg-red-500'
    }`}
  ></div>

  {!item.available ? (
    <p className="text-red-400">Not Available</p>
  ) : (
    <p className="text-green-400">Available</p>
  )}
</div>

                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors