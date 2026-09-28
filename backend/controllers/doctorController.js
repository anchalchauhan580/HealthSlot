
import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js' 



const changeAvailability=async(req,res)=>{
   try {
    const {docId}=req.body

    const docData=await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
    res.json({success:true,message:'Availablity changed'})
    
   } catch (error) {
       console.log(error)
        res.json({success:false,message:error.message})
   }
}
const doctorList=async(req,res)=>{
    try {
      const doctors=await doctorModel.find().select(['-password','-email'])

      res.json({success:true,doctors})
        
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
        
    }
}
// Api for doctor login

const loginDoctor=async(req,res)=>{
    try {
        const{email,password}=req.body
        const doctor=await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false,message:'invalid credentials'})
        }

        const isMatch=await bcrypt.compare(password,doctor.password)
        if(isMatch){
            const token=jwt.sign({id:doctor._id},process.env.JWT_SECRET)
           res.json({success:true,token})
        }
        else{
          res.json({success:false,message:'invalid credentials'})
        }

        
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API TO GET DOCTOR APPOINTMENT FOR doctor panel 


const appoinmentsDoctor = async (req, res) => {
  try {
    const docID = req.docID.toString()

    const appointments = await appointmentModel.find({
      docId: docID
    })

    console.log('Doctor ID:', docID)
    console.log('Appointments:', appointments)

    res.json({ success: true, appointments })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}



// Api to mark appointment completed for the doctor panel 
const appointmentComplete = async (req, res) => {
  try {
    const docID = req.docID
    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (
      appointmentData &&
      appointmentData.docId.toString() === docID
    ) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true
      })

      return res.json({
        success: true,
        message: 'Appointment completed'
      })
    }

    res.json({ success: false, message: 'Unauthorized action' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export default appointmentComplete


//Api to cancel appointment for  doctor panel 
const appointmentCancel = async (req, res) => {
  try {
    const docID = req.docID
    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (
      appointmentData &&
      appointmentData.docId.toString() === docID
    ) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true
      })

      return res.json({
        success: true,
        message: 'Appointment cancelled'
      })
    }

    res.json({ success: false, message: 'Unauthorized action' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
// api top get the dashboard data for the panel 
const doctorDashboard=async(req,res)=>{
  try {
    const docID = req.docID.toString()   // ✅ FIX 1

    // ✅ FIX 2: correct field name
    const appointments = await appointmentModel.find({
      docId: docID
    })

    let earnings=0;

    appointments.map((item)=>{
      if(item.isCompleted||item.payment){
        earnings+=item.amount
      }
    })

    let patients=[]
    appointments.map((item)=>{
      if(!patients.includes(item.userId)){
        patients.push(item.userId)
      }

    })

    const dashData={
      earnings,
      appointments:appointments.length,
      patients:patients.length,
      latestAppointments:appointments.reverse().slice(0,5)
    }
    console.log(dashData)
    res.json({success:true,dashData})
    
    
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
    
  }




  const doctorProfile=async(req,res)=>{
    try {
      const docID = req.docID.toString()
      
      const profileData=await doctorModel.findById(docID).select('-password')
      res.json({success:true,profileData})
      
      
    } catch (error) {
      console.log(error)
    res.json({ success: false, message: error.message })
      
    }
  }
// Api to update doctor profile data from Doctor panel 

const updateDoctorProfile=async(req,res)=>{

  try {
     const docID = req.docID.toString()
     const {fees,address,available}=req.body

     await doctorModel.findByIdAndUpdate(docID,{fees,address,available})

     res.json({success:true,message:'profile updated'})

    
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
    
  }

 
      

}







export {changeAvailability,doctorList,loginDoctor,appoinmentsDoctor,appointmentComplete,appointmentCancel,doctorDashboard
       ,doctorProfile,updateDoctorProfile,
}