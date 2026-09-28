import {React} from 'react'
import {assets} from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { DoctorContext } from '../context/DoctorContext'

function Navbar() {
    const {aToken,setAToken}=useContext(AdminContext)
    const {dToken,setDToken}=useContext(DoctorContext)
    const navigate=useNavigate()
    const logout=()=>{

         navigate('/')
         if(aToken){
        aToken&&setAToken('')
        aToken && localStorage.removeItem('aToken')
         }
         else{
          dToken&&setDToken('')
          dToken&&localStorage.removeItem('dToken')
         }

        

    }
   
  return (
    <div className='flex justify-between item-center px-4 sm:px py-3 border-b bg-white'>
        <div>
            <img src={assets.admin_logo}/>
            <p>{aToken?'Admin':'Doctor'}</p>
        </div>
        <button onClick={logout}>Logout</button>

    </div>
  )
}

export default Navbar