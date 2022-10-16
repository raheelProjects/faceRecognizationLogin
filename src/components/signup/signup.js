import './signup.css'

import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import * as faceapi from "face-api.js"

import Webcam from 'react-webcam';

import axios from "axios";

function Signup() {
    const webcamRef = React.useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imge, setimge] = useState([])
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const videoConstraints = {
        width: 220,
        height: 200,
        facingMode: "user"
      };

  const showModal = () => {
      setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


   async function cam () {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc)
    
    let img = await faceapi.fetchImage(imageSrc);
    try{ 
let detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
if(detections){ 
  alert("image taken press ok now")
setimge(detections.descriptor)}
else{
  alert("please keep your face straight while capture")
}
}
catch(error){
  console.log("is udefined"+error)
}
    
    }

   const signupPosting = ()=>{
   
var data = JSON.stringify({
  "username": username,
  "email": email,
  "pass": password,
  "fd": imge
});

var config = {
  method: 'post',
  url: 'https://facerecapi.herokuapp.com/signup',
  headers: { 
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
  },
  data : data
};

axios(config)
.then(function (response) {
  alert(JSON.stringify(response.data));
})
.catch(function (error) {
  alert(error);
});
   }

  return(
    <div className="signup">
        <div className='div2'>
        <h2>Signup</h2>
        <div className='div3'>
            {/* <p>Email</p> */}
            <input placeholder='Email' value={email} onChange={(e)=>setemail(e.target.value)}/>    
        </div>

        <div className='div3'>
            {/* <p>Password</p> */}
            <input placeholder='Password' value={password} onChange={(e)=>setpassword(e.target.value)}/>
        </div>

        <div className='div3'>
             {/* <p>Username</p> */}
            <input placeholder='Username' value={username} onChange={(e)=>setusername(e.target.value)}/>
        </div>

        <div className='div4'>
            <button onClick={signupPosting}>Signup</button>
        </div>

        <Button type="primary" onClick={showModal}>
        Detect face
      </Button>

  <Modal  title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Detect your face</p>
        <Webcam 
        audio={false}
        height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}/>
        <button onClick={(e)=>{e.preventDefault();cam()}}>capture</button>
      </Modal>
        </div>

    </div>
    
  )
}

export default Signup;