import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { AppContext } from "../context/AppContext"
import {useNavigate} from 'react-router'

function MyAppointments() {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  
  const navigate=useNavigate()
  const months = [
    "", "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ]

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "N/A"
    const [day, month, year] = slotDate.split("_")
    return `${day} ${months[Number(month)]} ${year}`
  }

  const [appointments, setAppointments] = useState([])
  const [loadingId, setLoadingId] = useState(null)

  // Fetch appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/appointments",
        { headers: { token } }
      )

      if (data.success) {
        setAppointments([...data.appointments].reverse())
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error("Failed to load appointments")
    }
  }

  // Payment
  const initPay=(order)=>{
    const options={
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Appointment payment',
      description:'Appointment Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        console.log(response)
        try {
          const {data}= await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{token}})
          if(data.success){
            getUserAppointments()
            navigate('/my-appointment')
          }
        } catch (error) {
          toast.error(error.message)
          
        }

      }

    }

    const rzp=new window.Razorpay(options)
    rzp.open()

  }
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const {data}=await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
      // Add your Razorpay payment logic here
      if(data.success){
        initPay(data.order)
      }
    } catch (err) {
      toast.error("Payment failed")
    }
  }

  useEffect(() => {
    if (token) getUserAppointments()
  }, [token])

  // Cancel appointment (optimistic UI)
  const cancelAppointment = async (appointmentId) => {
    try {
      setLoadingId(appointmentId)

      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)

        // 🔥 Instant UI update
        setAppointments(prev =>
          prev.map(a =>
            a._id === appointmentId
              ? { ...a, cancelled: true }
              : a
          )
        )
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error("Cancel failed")
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>

      {appointments.map(item => (
        <div
          key={item._id}
          className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300"
        >
          <img
            src={item.docData?.image}
            className="w-32 bg-indigo-50"
            alt=""
          />

          <div className="flex-1 text-sm text-zinc-600">
            <p className="font-semibold">{item.docData?.name}</p>
            <p>{item.docData?.speciality}</p>
            <p className="mt-1 text-xs">
              <b>Date & Time:</b>{" "}
              {slotDateFormat(item.slotDate)} | {item.slotTime}
            </p>
          </div>

          <div className="flex flex-col gap-2 justify-end">
            {!item.cancelled &&!item.payment&&!item.isCompleted&&(
              <button
                onClick={() => appointmentRazorpay(item._id)}
                className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50 hover:bg-primary hover:text-white transition-all duration-300"
              >
                Pay Online
              </button>
            )}
            {!item.cancelled && item.payment &&!item.isCompleted&&(
  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
    Paid
  </span>
)}
{item.isCompleted?<p className='text-green-300'>completed</p>: 
            !item.cancelled? (
              <button
                disabled={loadingId === item._id}
                onClick={() => cancelAppointment(item._id)}
                className="sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white disabled:opacity-50"
              >
                {loadingId === item._id ? "Cancelling..." : "Cancel appointment"}
              </button>
            ) : (
              <button className="sm:min-w-48 py-2 border border-red-500 text-red-500">
                Appointment cancelled
              </button>
            )}
           
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyAppointments