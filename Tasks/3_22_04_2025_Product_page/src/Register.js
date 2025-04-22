import React from 'react'
import "./register.css"
const Register = () => {
return (
        <div className='con'>
          <div className='form'>
            <input type='text' placeholder='enter name' name="_id" value="" onChange=""/>
            <input type='text' placeholder='enter phone. no.' name="_id" value="" onChange=""/>
            <input type='text' placeholder='enter email' name="_id" value="" onChange=""/>
            <input type='password' placeholder='enter password' name="pwd" value="" onChange=""/>
            <button onClick="/">Register</button>
          </div>
        </div>
     
  )
}

export default Register