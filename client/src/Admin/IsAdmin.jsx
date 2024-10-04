import Cookies from 'js-cookie'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function IsAdmin() {
    const [privatekey,setprivatekey] = React.useState()
    const navigate = useNavigate();
  return (
    <div>
        <input type="text" name="" id="" onChange={(e)=>{setprivatekey(e.target.value)}}/>
        <button onClick={()=>{ Cookies.set('privatekey', privatekey, { expires: 1/24, secure: true }); navigate('/admin')}} >check</button>
    </div>
  )
}

export default IsAdmin