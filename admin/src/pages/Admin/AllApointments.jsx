import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from '../../assets/assets_admin/assets'


function AllAppointments() {
  const { aToken, appointments, getAllAppointments,cancelAppointment } =
    useContext(AdminContext);

  const { calculateAge, slotDateFormat, currency } =
    useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-auto">

        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_2fr] py-3 px-6 border-b font-medium bg-gray-50">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Table Rows */}
        {appointments.map((item, index) => (
          <div
            key={item._id}
            className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_2fr] items-center py-3 px-6 border-b text-gray-700 hover:bg-gray-50"
          >
            {/* Index */}
            <p className="max-sm:hidden">{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>

            {/* Age */}
            <p className="max-sm:hidden">
              {calculateAge(item.userData.dob)}
            </p>

            {/* Date & Time */}
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Doctor */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full bg-gray-200"
                src={item.docData.image}
                alt=""
              />
              <p>{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p>
              {currency}
              {item.amount}
            </p>
            {item.isCompleted?<p className="text-green-300">completed</p>:item.cancelled?
            <p className="text-red-400 text-xs font-medium">cancelled</p>:
             <img onClick={()=>cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon}/>
            }
           

            {/* Actions */}
           
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllAppointments;
