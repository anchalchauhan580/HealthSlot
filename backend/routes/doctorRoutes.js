import express from 'express'
import authDoctor from '../middlewares/authDoctor.js'
import {
  doctorList,
  loginDoctor,
  appoinmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile
} from '../controllers/doctorController.js'

const doctorRouter = express.Router()

doctorRouter.post('/list', doctorList)
doctorRouter.post('/login', loginDoctor)

doctorRouter.get('/appointments', authDoctor, appoinmentsDoctor)
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)
doctorRouter.get('/dashboard', authDoctor,doctorDashboard)
doctorRouter.get('/profile', authDoctor,doctorProfile)
doctorRouter.post('/update-profile', authDoctor,updateDoctorProfile)

export default doctorRouter
