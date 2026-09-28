import jwt from 'jsonwebtoken'

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers

    if (!dtoken) {
      return res.json({ success: false, message: 'Doctor not authenticated' })
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET)

    // VERY IMPORTANT
    req.docID = decoded.id

    next()
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export default authDoctor
