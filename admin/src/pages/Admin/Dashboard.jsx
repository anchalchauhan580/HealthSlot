import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

function Dashboard() {
  const {
    aToken,
    dashData,
    getDashData,
    cancelAppointment,
  } = useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) return null;

  return (
    <div className="m-5">

      {/* ===== Top Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

        {/* Doctors */}
        <div className="flex items-center gap-4 bg-white p-4 rounded border">
          <img src={assets.doctor_icon} alt="" className="w-12" />
          <div>
            <p className="text-xl font-semibold text-gray-700">
              {dashData.doctors}
            </p>
            <p className="text-gray-400">Doctors</p>
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

      {/* ===== Latest Bookings ===== */}
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

              {item.isCompleted?<p className="text-green-300">Completed</p>:item.cancelled ? (
  <button
    disabled
    className="px-3 py-1 text-xs font-medium text-red-500 bg-red-100 rounded cursor-not-allowed"
  >
    Cancelled
  </button>
) : (
  <button
    onClick={() => cancelAppointment(item._id)}
    className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
  >
    Cancel
  </button>
)}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
