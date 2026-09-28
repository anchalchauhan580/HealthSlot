import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoutes.js'
import doctorRouter from './routes/doctorRoutes.js'
import userRouter from './routes/userRoutes.js'
//app config
dotenv.config()

const app=express()
const PORT=process.env.PORT||4000



// middleares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))


connectDB()
connectCloudinary()

// api endpoint
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send('Api working')
})

app.listen(PORT,()=>console.log(`server started ${PORT}`))

