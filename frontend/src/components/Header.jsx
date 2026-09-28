import React from 'react'
import { assets } from '../assets/assets'

function Header() {
  return (
    <div className="bg-[#5F6FFF] rounded-xl px-6 sm:px-12 lg:px-20 py-10 sm:py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">

      {/* Left Side */}
      <div className="text-white max-w-xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </h1>

        {/* profiles + text */}
        <div className="flex items-center gap-4 mt-6">
          <img
            src={assets.group_profiles}
            alt="group profiles"
            className="w-24"
          />
          <p className="text-sm text-white/90">
            Simply browse through our extensive list of trusted doctors, <br />
            schedule your appointment hassle-free.
          </p>
        </div>

        {/* button */}
        <a
          href="#speciality"
          className="inline-flex items-center gap-2 mt-8 bg-white text-gray-700 px-6 py-3 rounded-full font-medium hover:scale-105 transition"
        >
          Book appointment
          <img src={assets.arrow_icon} alt="arrow" />
        </a>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-[420px]">
        <img
          src={assets.header_img}
          alt="doctors"
          className="w-full"
        />
      </div>

    </div>
  )
}

export default Header
