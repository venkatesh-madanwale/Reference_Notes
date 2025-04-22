import React from 'react'
import "./login.css"
const Login = () => {
return (
        <div className='con'>
          <div className='form'>
            <input type='text' placeholder='enter email' name="_id" value="" onChange=""/>
            <input type='password' placeholder='enter password' name="pwd" value="" onChange=""/>
            <button onClick="/">Login</button>
          </div>
        </div>
     
  )
}

export default Login