import { createContext, useEffect, useState } from "react"
import { doctors } from "../assets/assets"
import axios from 'axios'
import {toast} from 'react-toastify'


// create context 
export const AppContext=createContext()

const AppContextProvider=(props)=>{
    const currencySymbol='$'
    const backendUrl=import.meta.env.VITE_BACKEND_URL||"https://healthslot-backend-3r09.onrender.com"
     const [doctors,setDoctor]=useState([])
     const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
     const [userData,setUserData]=useState(false)
      const getDoctorsData=async()=>{
        try {
            const {data}=await axios.post(backendUrl+'/api/doctor/list')
            if(data.success){
                setDoctor(data.doctors)

            }else{
                toast.error(error.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }
    useEffect(()=>{
        getDoctorsData()

    },[])
    
    
  

    const loadUserProfileData=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
            if(data.success){
                setUserData(data.userData)

            }else{
                toast.error(error.message)
            }

            
        } catch (error) {
             console.log(error)
            toast.error(error.message)
            
            
        }
    }

      useEffect(()=>{
        if(token){
            loadUserProfileData()

        }else{
            setUserData(false)
        }

    },[token])




    const value={
        doctors,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
        getDoctorsData
       
    }
   
    return (
        <AppContext.Provider value={value}>
            {props.children}

        </AppContext.Provider>
    )

}


export default AppContextProvider
