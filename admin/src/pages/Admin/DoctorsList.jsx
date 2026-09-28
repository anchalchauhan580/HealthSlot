import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'

function DoctorsList() {
    const {doctors, aToken, getAllDoctors,changeAvailability} = useContext(AdminContext)

    useEffect(() => {
        if(aToken) {
            getAllDoctors()
        }
    }, [aToken])

    return (
        <div className="m-5 max-h-[90vh] overflow-y-scroll">
            <h1 className="text-2xl font-semibold mb-6">All Doctors</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {doctors.map((item) => (
                    <div 
                        key={item._id} 
                        className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        {/* Image Container with Blue Hover Effect */}
                        <div className="relative bg-blue-50 overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-64 object-cover relative z-10 mix-blend-multiply group-hover:mix-blend-normal transition-all duration-300"
                            />
                        </div>

                        {/* Doctor Info */}
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800 text-base mb-1">
                                {item.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                                {item.speciality}
                            </p>
                            
                            {/* Availability Checkbox */}
                            <div className="flex items-center gap-2">
                                <input 

                                    type="checkbox" 
                                    checked={item.available}
                                    onChange={() =>changeAvailability(item._id)}
                                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                                />
                                <span className="text-sm text-gray-700">Available</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DoctorsList