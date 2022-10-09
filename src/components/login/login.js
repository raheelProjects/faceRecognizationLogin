
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

function Login() {
    const [email, setEmail]=useState('')
    const [pass, setPass]=useState('')


    function savee(){
        setEmail(email)
        setPass(pass)
        console.log(email)
        console.log(pass)
        if(email.length && pass.length >= 3){
            alert("Login")
        }else{
            alert("Incorrect")
        }
    }
   
    return(
        <div className="signup">
        <div className='div2'>
        <h2>Login</h2>
        <div className='div3'>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Email'/>    
        </div>

        <div className='div3'>
            <input  value={pass} onChange={(e)=>setPass(e.target.value)}  placeholder='Password'/>
        </div>

        <div className='div4'>
            <button onClick={savee}>Login</button>
        </div>
        <div className='div4'>
            <button>Login with face</button>
        </div>

        </div>

    </div>

      
    )
  }
  
  export default Login;
  