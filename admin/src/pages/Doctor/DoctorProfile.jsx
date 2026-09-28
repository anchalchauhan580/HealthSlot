import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function DoctorProfile() {
  const {
    dToken,
    profileData,
    setProfileData,
    getProfileData,
    backendUrl
  } = useContext(DoctorContext)

  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  if (!profileData) return null

  // ✅ UPDATE PROFILE
  const updateProfile = async () => {
    try {
      const updateData = {
        fees: profileData.fees,
        address: profileData.address,
        available: profileData.available
      }

      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        updateData,
        { headers: { dtoken: dToken } }
      )

      if (data.success) {
        toast.success('Profile updated successfully')
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="w-full max-w-5xl m-5 bg-white rounded-lg border p-6">

      {/* Top Section */}
      <div className="flex gap-6">

        {/* Image */}
        <div className="w-48 h-48 rounded-lg overflow-hidden bg-indigo-100">
          <img
            src={profileData.image}
            alt="doctor"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1">

          <h2 className="text-2xl font-semibold text-gray-800">
            Dr. {profileData.name}
          </h2>

          <p className="text-gray-500 mt-1">
            {profileData.degree} – {profileData.speciality}
          </p>

          <span className="inline-block mt-3 px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-full">
            {profileData.experience} Years Experience
          </span>

          {/* About */}
          <div className="mt-4">
            <p className="font-medium text-gray-700">About:</p>
            <p className="text-gray-600 text-sm mt-1">
              {profileData.about}
            </p>
          </div>

          {/* Fees */}
          <p className="mt-4 text-gray-700">
            <span className="font-medium">Appointment fee:</span>{' '}
            {currency}
            {isEdit ? (
              <input
                type="number"
                className="ml-2 border px-2 py-1 rounded w-24"
                value={profileData.fees}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    fees: e.target.value
                  }))
                }
              />
            ) : (
              profileData.fees
            )}
          </p>

          {/* Address */}
          <div className="mt-4">
            <p className="font-medium text-gray-700">Address:</p>

            {isEdit ? (
              <>
                <input
                  type="text"
                  className="block mt-1 border px-2 py-1 rounded w-full"
                  value={profileData.address.line}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line: e.target.value
                      }
                    }))
                  }
                />

                <input
                  type="text"
                  className="block mt-2 border px-2 py-1 rounded w-full"
                  value={profileData.address.line2}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value
                      }
                    }))
                  }
                />
              </>
            ) : (
              <p className="text-gray-600 text-sm">
                {profileData.address.line}
                <br />
                {profileData.address.line2}
              </p>
            )}
          </div>

          {/* Availability */}
          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available
                }))
              }
              className="accent-indigo-600"
            />
            <span className="text-gray-700">Available</span>
          </div>

          {/* Buttons */}
          <div className="mt-5">
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-6 py-2 border rounded hover:bg-gray-50"
              >
                Edit
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
