import React, { useState } from 'react'
import { assets } from '../../assets/assets_admin/assets.js'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

function AddDoctor() {
  const [docimg,setDocImg]=useState(false)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [experience,setExperience]=useState('1')
  const [fees,setFees]=useState('')
  const [about,setAbout]=useState('')
  const [speciality,setSpeciality]=useState('General Pgysician')
  const [degree,setDegree]=useState('')
  const [address1,setAddress1]=useState('')
  const [address2,setAddress2]=useState('')


  const {aToken,backendUrl}=useContext(AdminContext)


  const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try {
      if(!docimg){
        return toast.error('Image not selected')
      }

      const formData=new FormData()
      formData.append('image',docimg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify({line:address1,line2:address2}))

      // console.log form data
      formData.forEach((value,key)=>{
        console.log(`${key}:${value}`)
      })

      const {data}=await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{aToken}})
      
      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setAbout('')
        setDegree('')
        setFees('')
      }else{
        toast.error(data.message)
      }

      
    } catch (error) {
      toast.error(data.message)
      console.log(error)
    }


  }


return (
    <form onSubmit={onSubmitHandler}className="w-full bg-white p-8">
      
      <div className="max-w-4xl">
        
        <h2 className="text-2xl font-medium text-gray-800 mb-8">
          Add Doctor
        </h2>

        {/* Image Upload */}
        <div className="mb-8">
          <label htmlFor="doc-img" className="inline-flex flex-col items-center cursor-pointer">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-2 overflow-hidden">
              {
                docimg ? <img src={URL.createObjectURL(docimg)} alt="" className="w-full h-full object-cover" />
                : <img src={assets.upload_area} alt="" className="w-10 opacity-50" />
              }
            </div>
            <p className="text-sm text-gray-500">Upload doctor<br/>picture</p>
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">

          {/* Left Column */}
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Doctor Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Doctor Email"
                className="w-full px-4 py-2.5 bg-blue-50 border-0 rounded text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Doctor Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Experience</label>
              <select 
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Fees</label>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="number"
                placeholder="fees"
                className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded text-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">Speciality</label>
              <select 
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Education</label>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="Education"
                className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded text-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Address</label>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                type="text"
                placeholder="address 1"
                className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded text-gray-400 focus:ring-2 focus:ring-blue-400 outline-none mb-3"
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                type="text"
                placeholder="address 2"
                className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded text-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

          </div>

        </div>

        {/* About Doctor - Full Width */}
        <div className="mt-6">
          <label className="block text-sm text-gray-600 mb-2">About Doctor</label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            rows="6"
            placeholder="write about doctor"
            className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded text-gray-400 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-8 py-2.5 rounded hover:bg-blue-700 transition text-sm"
        >
          Add doctor
        </button>

      </div>
    </form>
  )
}

export default AddDoctor
