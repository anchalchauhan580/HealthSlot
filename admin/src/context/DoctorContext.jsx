import {createContext,useState} from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const DoctorContext=createContext()

const DoctorContextProvider=(props)=>{
    const backendUrl="https://healthslot-backend-3r09.onrender.com"||import.meta.env.VITE_BACKEND_URL

    const [dToken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const[appointments,SetAppointments]=useState([])
    const[dashData,setDashData]=useState(false)
    const[profileData,setProfileData]=useState(false);
    
    const getAppointments=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/doctor/appointments',{headers:{dToken}})
          if(data.success){
            SetAppointments(data.appointments)
            console.log(data.appointments.reverse())
          }else{
            toast.error(data.message)

          }
        } catch (error) {
            toast.error(error.message)


            
        }
    }
   const completeAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/doctor/complete-appointment',
      { appointmentId },
      { headers: { dtoken: dToken } }
    )

    if (data.success) {
      toast.success(data.message)
      getAppointments()
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

     const cancelAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/doctor/cancel-appointment',
      { appointmentId },
      { headers: { dtoken: dToken } }
    )

    if (data.success) {
      toast.success(data.message)
      getAppointments()
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}
const getDashData=async()=>{
  try {
    const {data}=await axios.get(backendUrl+'/api/doctor/dashboard',{headers:{dtoken:dToken}})
    if(data.success){
      setDashData(data.dashData)
      console.log(data.dashData)

    }else{
      toast.error(data.message)
    }
    
  } catch (error) {
     toast.error(error.message)
  }

}

const getProfileData=async()=>{
  try {

    const{data}=await axios.get(backendUrl+'/api/doctor/profile',{headers:{dtoken:dToken}})
    if(data.success){
      setProfileData(data.profileData);
      console.log(data.profileData)

    }
  } catch (error) {
     toast.error(error.message)
    
  }
}



    const value={
       dToken,setDToken,
       backendUrl,appointments,SetAppointments,
       getAppointments,
       completeAppointment,cancelAppointment,
       dashData,setDashData,
       getDashData,profileData,setProfileData,
       getProfileData,
    }
    return (
    <DoctorContext.Provider value={value}>
        {props.children}

        </DoctorContext.Provider>


    )


}
export default DoctorContextProvider
