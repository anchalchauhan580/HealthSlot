import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from '../../context/AppContext';
import { X, Check } from 'lucide-react'


function DoctorDashboard() {
  const {dashData,setDashData,getDashData,dToken,completeAppointment,cancelAppointment}=useContext(DoctorContext)
  const {currency,slotDateFormat}=useContext(AppContext)
  useEffect(()=>{
    if(dToken){
      getDashData()
    }

  },[dToken,])
  return (
    <div className='m-5'>
      {/* ===== Top Cards ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      
              {/* Doctors */}
              <div className="flex items-center gap-4 bg-white p-4 rounded border">
                <img src={assets.earning_icon} alt="" className="w-12" />
                <div>
                  <p className="text-xl font-semibold text-gray-700">
                    {currency}{dashData.earnings}
                  </p>
                  <p className="text-gray-400">Earnings</p>
                </div>
              </div>
      
              {/* Appointments */}
              <div className="flex items-center gap-4 bg-white p-4 rounded border">
                <img src={assets.appointments_icon} alt="" className="w-12" />
                <div>
                  <p className="text-xl font-semibold text-gray-700">
                    {dashData.appointments}
                  </p>
                  <p className="text-gray-400">Appointments</p>
                </div>
              </div>
      
              {/* Patients */}
              <div className="flex items-center gap-4 bg-white p-4 rounded border">
                <img src={assets.patients_icon} alt="" className="w-12" />
                <div>
                  <p className="text-xl font-semibold text-gray-700">
                    {dashData.patients}
                  </p>
                  <p className="text-gray-400">Patients</p>
                </div>
              </div>

            </div>
            <div className="bg-white rounded border">
            
                    <div className="flex items-center gap-3 px-4 py-3 border-b">
                      <img src={assets.list_icon} alt="" className="w-5" />
                      <p className="font-semibold">Latest Bookings</p>
                    </div>
            
                    <div>
                      {dashData.latestAppointments?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.docData.image}
                              alt=""
                              className="w-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-gray-800">
                                {item.docData.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {slotDateFormat(item.slotDate)}
                              </p>
                            </div>
                          </div>
            
                          <div className="flex items-center justify-end gap-2">
                  {item.cancelled ? (
                    <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className='text-green-500 text-xs font-medium'>Completed</p>
                  ) : (
                    <>
                      <button 
                        onClick={() => cancelAppointment(item._id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-100 text-red-500 hover:bg-red-200 text-xs font-medium"
                      >
                        <X size={14} />
                        Cancel
                      </button>
                      <button 
                        onClick={() => completeAppointment(item._id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-100 text-green-500 hover:bg-green-200 text-xs font-medium"
                      >
                        <Check size={14} />
                        Complete
                      </button>
                    </>
                  )}
                </div>
                        </div>
                      ))}
                    </div>
            
                  </div>
      
            
    </div>
  )
}

export default DoctorDashboard