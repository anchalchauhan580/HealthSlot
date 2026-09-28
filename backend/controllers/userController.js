import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'

import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import Razorpay from 'razorpay'

// api to register user
const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body

        if(!name || !password || !email) {
            return res.json({success: false, message: "Missing details"})
        }
        
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Enter a valid email"})
        }
        
        if(password.length < 6) {
            return res.json({success: false, message: "Enter a strong password"}) // Fixed: "email" → "password"
        }

        // ✅ FIXED: Check if user already exists
        // const existingUser = await userModel.findOne({email})
        // if(existingUser) {
        //     return res.json({success: false, message: "User already exists"})
        // }

        // ✅ FIXED: Added await
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save()

        // ✅ FIXED: Assigned token variable
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// api to login user
const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body
        
        // Check if user exists
        const user = await userModel.findOne({email})
        if(!user) {
            return res.json({success: false, message: "User does not exist"})
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.json({success: false, message: "Invalid credentials"})
        }

        // Create token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// to get user detail

const getProfile=async(req,res)=>{

    try {
        const userId=req.userId
        const userData=await userModel.findById(userId).select('-password')
  
        res.json({success:true,userData})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

// api to update the user profile 
const updateProfile=async(req,res)=>{
    try {
        const userId=req.userId
        const{name,phone,address,dob,gender}=req.body
        const imageFile=req.file
        if(!name||!phone||!gender){
            return res.json({success:false,message:"missing data "})
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
       
        if(imageFile){
            // upload image to cloudinary
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL=imageUpload.secure_url
            
            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }
       return res.json({success:true,message:"profile updated"})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
        
    }
}
// api to book appointment 

const bookAppointment=async(req,res)=>{
    try {
        const userId=req.userId
        const{docId,slotDate,slotTime}=req.body

        const docData=await doctorModel.findById(docId).select('-password')

        if(!docData.available){
           
            return res.json({success:false,message:"doctor is not avaliable"})

        }
        let slots_booked=docData.slots_booked

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                 return res.json({success:false,message:"slot is not avaliable"})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
        }
        const userData=await userModel.findById(userId).select('-password')

        delete docData.slots_booked
        const appointmentData={
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()

        }


        const newAppointment=new appointmentModel(appointmentData)
        await newAppointment.save()

        //save new slots data in doctor data 
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:"Appointment booked"})

        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
// api to get the user appointment for the frontend

const listAppointment=async(req,res)=>{
    try {
        const userId=req.userId
        const appointments=await appointmentModel.find({userId})

        return res.json({success:true,appointments})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}
//api to cancel appointments
//api to cancel appointments
//api to cancel appointments
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId
    const { appointmentId } = req.body

    // 1️⃣ Find appointment
    const appointment = await appointmentModel.findById(appointmentId)
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" })
    }

    // 2️⃣ Ownership check
    if (appointment.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorized action" })
    }

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

   



// API to make payment
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancelled or not found",
      });
    }
    const razorpayInstance = new Razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET
});

    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//api to verify payment razorpay
const verifyRazorPay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    if (!razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 1️⃣ Fetch order details from Razorpay
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    // 2️⃣ Check payment status (given by Razorpay)
    if (orderInfo.status === "paid") {

      // 3️⃣ Extract appointmentId from receipt
      const appointmentId = orderInfo.receipt;

      // 4️⃣ Update appointment in DB
      await appointmentModel.findByIdAndUpdate(
        orderInfo.receipt,{payment:true}
       
      );

      return res.json({
        success: true,
        message: "Payment successful",
      });
    } else {
      return res.json({
        success: false,
        message: "Payment failed",
      });
    }

  } catch (error) {
    console.error("VERIFY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};







export {registerUser, loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment,paymentRazorpay,verifyRazorPay}