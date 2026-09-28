import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from "cloudinary" // v2 is an api version of cloudinary 
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

// api for adding doctors
const addDoctor=async(req,res)=>{
    try {
        const{name,email,password, speciality, degree,experience,about,available,fees, address}=req.body;
        const imageFile=req.file
        console.log(imageFile)
         console.log(email)
        // checking for all data to add doctor
        if(!name||!password||!email||!speciality||!degree||!experience||!about||!fees||!address){
            return res.json({success:false,message:
                "missing detail"
            })
        }

        // validating email format
        if(!validator.isEmail(email)){
              return res.json({success:false,message:
                "wrong email"
            })

        }


        // validating password format

        if(password.length<6){
            return res.json({success:false,message:"please enter a strong password"})
        }
        // salt
        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(password,salt)
        // image upload to cloudinary

        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageurl=imageUpload.secure_url;
        const doctordata={
            name,
            email,
            image:imageurl,
            password:hashedpassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),// as adress is given in string so to convert it to json 
            date:Date.now()
        }
        const newDoctor=new doctorModel(doctordata)
        await newDoctor.save()

        return res.json({success:true,message:"Doctor Added"})



    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }


}

// api for the admin login
const loginAdmin=async(req,res)=>{
   try {
    

    const{email,password}=req.body;

    if(email===process.env.ADMIN_EMAIL&&password===process.env.ADMIN_PASSWORD){
     const token=jwt.sign(email+password,process.env.JWT_SECRET)
     res.json({success:true,token})
    }else{
        res.json({success:false,message:"unvalid credentials"})
    }
    
   } catch (error) {
      console.log(error)
        res.json({success:false,message:error.message})
    
   }
}
//api for getting the doctors from the database 
const allDoctors=async(req,res)=>{
    try {
        const doctors=await doctorModel.find({}).select('-password')
            res.json({success:true,doctors})
        
        
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    
        
    }

}
//Api to  get all appoitments list 
const appointmentsadmin=async(req,res)=>{
try {
    const appointments=await appointmentModel.find({})
    res.json({success:true,appointments})
    
} catch (error) {
     console.log(error)
        res.json({success:false,message:error.message})
    
}
}
// cancel appoitnment from admin
const appointmentCancel = async (req, res) => {
  try {
      console.log('Received body:', req.body)  
    
    const { appointmentId } = req.body

    // 1️⃣ Find appointment
    const appointment = await appointmentModel.findById(appointmentId)
    

    // 2️⃣ Ownership check
    // if (appointment.userId.toString() !== userId.toString()) {
    //   return res.json({ success: false, message: "Unauthorized action" })
    // }

    // 3️⃣ Already cancelled check
    if (appointment.cancelled) {
      return res.json({ success: false, message: "Appointment already cancelled" })
    }

    // 4️⃣ Cancel appointment FIRST (this always works)
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    })

    // 5️⃣ Load doctor
    const doctor = await doctorModel.findById(appointment.docId)

    // If doctor or slots missing → stop safely
    if (
      !doctor ||
      !doctor.slots_booked ||
      typeof doctor.slots_booked !== "object"
    ) {
      return res.json({ success: true, message: "Appointment cancelled" })
    }

    // 6️⃣ Clone slots safely
    const slots_booked = { ...doctor.slots_booked }

    // 🔐 MOST IMPORTANT SAFETY CHECK
    if (!Array.isArray(slots_booked[appointment.slotDate])) {
      // slotDate already removed earlier → DO NOT TOUCH
      return res.json({ success: true, message: "Appointment cancelled" })
    }

    // 7️⃣ Remove slotTime
    slots_booked[appointment.slotDate] =
      slots_booked[appointment.slotDate].filter(
        t => t !== appointment.slotTime
      )

    // 8️⃣ Remove date key if empty
    if (slots_booked[appointment.slotDate].length === 0) {
      delete slots_booked[appointment.slotDate]
    }

    // 9️⃣ Save updated slots
    await doctorModel.findByIdAndUpdate(appointment.docId, {
      $set: { slots_booked }
    })

    return res.json({ success: true, message: "Appointment cancelled" })

  } catch (error) {
    console.error("Cancel appointment error:", error)
    return res.json({ success: false, message: "Internal server error" })
  }
}
//Api to get dashboard data for the panel 

const adminDashBoard=async(req,res)=>{
    try {
        const doctors=await doctorModel.find({})
        const user=await userModel.find({})
        const appointments=await appointmentModel.find({})

        
        const dashData={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:user.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }

        return res.json({success:true,dashData})
        
    } catch (error) {
         console.error("Cancel appointment error:", error)
    return res.json({ success: false, message: "Internal server error" })
        
    }
}

   



export {addDoctor,loginAdmin,allDoctors,appointmentsadmin,appointmentCancel,adminDashBoard}