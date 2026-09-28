import React from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets_admin/assets'
import { NavLink } from 'react-router'
import { useContext } from 'react'
import { DoctorContext } from '../context/DoctorContext'

function Sidebar() {
  const { aToken } = useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)


  return (
    <div className="min-h-screen w-64 bg-white border-r-2 border-blue-100 px-4 py-6">
      {aToken && (
        <ul className="flex flex-col gap-2 text-gray-600">

          <NavLink
            to={'/admin-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'hover:bg-gray-100'}`
            }
          >
            <img src={assets.home_icon} className="w-5 h-5" />
            <p className="font-medium">Dashboard</p>
          </NavLink>

          <NavLink
            to={'/all-appointments'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'hover:bg-gray-100'}`
            }
          >
            <img src={assets.appointment_icon} className="w-5 h-5" />
            <p className="font-medium">Appointments</p>
          </NavLink>

          <NavLink
            to={'/all-doctor'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'hover:bg-gray-100'}`
            }
          >
            <img src={assets.add_icon} className="w-5 h-5" />
            <p className="font-medium">Add Doctor</p>
          </NavLink>

          <NavLink
            to={'/all-doctor-list'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'hover:bg-gray-100'}`
            }
          >
            <img src={assets.people_icon} className="w-5 h-5" />
            <p className="font-medium">Doctors List</p>
          </NavLink>

        </ul>
      )}
      {dToken && (
        <ul className="flex flex-col gap-2 text-gray-600">

          <NavLink
            to={'/doctor-dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'hover:bg-gray-100'}`
            }
          >
            <img src={assets.home_icon} className="w-5 h-5" />
            <p className="font-medium">Dashboard</p>
          </NavLink>

          <NavLink
            to={'/doctor-appointments'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'hover:bg-gray-100'}`
            }
          >
            <img src={assets.appointment_icon} className="w-5 h-5" />
            <p className="font-medium">Appointments</p>
          </NavLink>

         
          <NavLink
            to={'/doctor-profile'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'hover:bg-gray-100'}`
            }
          >
            <img src={assets.people_icon} className="w-5 h-5" />
            <p className="font-medium">profile</p>
          </NavLink>

        </ul>
      )}
    </div>
  )
}

export default Sidebar
