import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets"
import { NavLink, useNavigate } from 'react-router'
import { AppContext } from '../context/AppContext'

function Navbar() {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    navigate('/login')
  }

  // ✅ Single logo source (used everywhere)
  const LOGO_URL =
    "https://static.vecteezy.com/system/resources/previews/020/871/782/original/health-doctor-logo-medical-care-business-vector.jpg"

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">

      {/* LOGO */}
      <img
        src={LOGO_URL}
        alt="App Logo"
        className="w-32 cursor-pointer"
        onClick={() => navigate('/')}
      />

      {/* DESKTOP MENU */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
        </NavLink>
      </ul>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer relative">
            <img
              className="w-8 rounded-full"
              src={userData.image}
              alt="User"
              onClick={() => setShowProfile(prev => !prev)}
            />
            <img className="w-2.5 hidden md:block" src={assets.dropdown_icon} />

            {showProfile && (
              <div className="absolute top-12 right-0 text-base font-medium text-gray-600 z-20">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => { navigate('/my-profile'); setShowProfile(false) }}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => { navigate('/my-appointment'); setShowProfile(false) }}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointment
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-800 text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}

        {/* MOBILE MENU ICON */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="menu"
        />
      </div>

      {/* MOBILE MENU */}
      <div
        className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <img
            className="w-32"
            src={LOGO_URL}
            alt="App Logo"
            onClick={() => {
              navigate('/')
              setShowMenu(false)
            }}
          />
          <img
            className="w-7"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <NavLink onClick={() => setShowMenu(false)} to="/">
            <p className="px-4 py-2 rounded inline-block">Home</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/doctors">
            <p className="px-4 py-2 rounded inline-block">All Doctors</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/about">
            <p className="px-4 py-2 rounded inline-block">About</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact">
            <p className="px-4 py-2 rounded inline-block">Contact</p>
          </NavLink>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
