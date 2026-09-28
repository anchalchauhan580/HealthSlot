import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { X, Check } from 'lucide-react'

function DoctorAppointment() {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { calculateAge } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="w-full max-w-6xl m-2 sm:m-5">
      <p className="mb-4 text-lg font-medium px-2 sm:px-0">All Appointments</p>

      <div className="bg-white border rounded-lg text-sm overflow-hidden">

        {/* Header - Hidden on mobile */}
        <div className="hidden lg:grid grid-cols-[0.5fr_2.5fr_1.2fr_1fr_2fr_1fr_1fr] px-6 py-4 border-b font-medium text-gray-500">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Desktop Rows */}
        <div className="hidden lg:block">
          {appointments?.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={item._id}
                className="grid grid-cols-[0.5fr_2.5fr_1.2fr_1fr_2fr_1fr_1fr] px-6 py-4 border-b items-center hover:bg-gray-50"
              >
                {/* Index */}
                <p>{index + 1}</p>

                {/* Patient */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.userData.image}
                    alt="patient"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="font-medium text-gray-700">
                    {item.userData.name}
                  </p>
                </div>

                {/* Payment */}
                <span className="px-3 py-1 text-xs rounded-full bg-gray-100 w-fit">
                  CASH
                </span>

                {/* Age */}
                <p>{calculateAge(item.userData.dob)}</p>

                {/* Date & Time */}
                <p>
                  {item.slotDate},{' '}
                  <span className="text-gray-500">{item.slotTime}</span>
                </p>

                {/* Fees */}
                <p>${item.amount}</p>

                {item.cancelled ? <p className='text-red-400'>Cancelled</p> : item.isCompleted ? <p className='text-green-300'>Completed</p> : <div className="flex gap-3">
                  <button className="p-1 rounded-full bg-red-100 text-red-500 hover:bg-red-200">
                    <X onClick={() => cancelAppointment(item._id)} size={14} />
                  </button>
                  <button className="p-1 rounded-full bg-green-100 text-green-500 hover:bg-green-200">
                    <Check onClick={() => { completeAppointment(item._id) }} size={14} />
                  </button>
                </div>}
              </div>
            ))
          ) : (
            <p className="text-center py-6 text-gray-500">
              No appointments found
            </p>
          )}
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="lg:hidden">
          {appointments?.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={item._id}
                className="p-4 border-b hover:bg-gray-50"
              >
                {/* Patient Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.userData.image}
                      alt="patient"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-700">
                        {item.userData.name}
                      </p>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 inline-block mt-1">
                        CASH
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <p className="text-gray-500 text-xs">Age</p>
                    <p className="font-medium">{calculateAge(item.userData.dob)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Fees</p>
                    <p className="font-medium">${item.amount}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500 text-xs">Date & Time</p>
                    <p className="font-medium">
                      {item.slotDate}, <span className="text-gray-600">{item.slotTime}</span>
                    </p>
                  </div>
                </div>

                {/* Actions */}
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
            ))
          ) : (
            <p className="text-center py-6 text-gray-500">
              No appointments found
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointment