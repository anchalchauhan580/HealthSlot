import jwt from 'jsonwebtoken'
// user verification 

const authUser=async(req,res,next)=>{
    try {
        const{token}=req.headers
        if(!token){
            return res.json({success:false,message:"Not able"})
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
         req.userId=token_decode.id
         console.log(token)
         console.log(req.userId)
          next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

export default authUser