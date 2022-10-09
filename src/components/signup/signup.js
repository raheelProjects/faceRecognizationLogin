import './signup.css'
import * as faceapi from "face-api.js"
import Webcam from 'react-webcam';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

function Signup() {

  return(
    <div className="signup">
        <div className='div2'>
        <h2>Signup</h2>
        <div className='div3'>
            {/* <p>Email</p> */}
            <input placeholder='Email'/>    
        </div>

        <div className='div3'>
            {/* <p>Password</p> */}
            <input placeholder='Password'/>
        </div>

        <div className='div3'>
             {/* <p>Username</p> */}
            <input placeholder='Username'/>
        </div>

        <div className='div4'>
            <button>Detect face</button>
        </div>

        </div>

    </div>
    
  )
}

export default Signup;
