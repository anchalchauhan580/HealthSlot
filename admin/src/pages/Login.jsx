import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";



function Login() {
  const [state, setState] = useState("Admin");
  const {aToken,setAToken,backendUrl}=useContext(AdminContext)
  const [email,setEmail]=useState()
  const [password,setpassword]=useState()
  const {dToken,setDToken}=useContext(DoctorContext)


  const onSubmitHandler=async(event)=>{
    event.preventDefault()
    
    try {
        if(state==='Admin'){

            const {data}=await axios.post(backendUrl + '/api/admin/login',{email,password})
             if(data.success){
                
                setAToken((data.token))
                localStorage.setItem('aToken', data.token)
             }else{
                toast.error(data.message)
             }



        }
        else{
          const{data}=await axios.post(backendUrl+'/api/doctor/login',{email,password})
          if(data.success){
            localStorage.setItem('dToken',data.token)
            setDToken(data.token)
            console.log(data.token)

          }else{
            toast.error(data.message)
          }

        }
        

    } catch (error) {
        
    }

  }




  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <form onSubmit={onSubmitHandler} className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          <span className="text-blue-600">{state}</span> Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            type="email"
            required
            placeholder="admin@example.com"
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            
            onChange={(e)=>setpassword(e.target.value)}
            value={password}
            type="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 active:scale-[0.98] transition"
        >
          Login
        </button>

        {/* Toggle Login Type */}
        <p className="text-center text-sm text-gray-600 mt-5">
          {state === "Admin" ? (
            <>
              Doctor Login?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{" "}
              <span
                onClick={() => setState("Admin")}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Click here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
}

export default Login;

