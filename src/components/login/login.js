
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import Webcam from 'react-webcam';
import * as faceapi from "face-api.js"

import {useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";


function Login() {
  

  const navigate = useNavigate();

    const webcamRef = React.useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const[imge,setimge] = useState([])

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


    const [email, setEmail]=useState('')
    const [pass, setPass]=useState('')

   async function cam(){
      
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

    function savee(){
        if(imge.length==0){
          return alert("Please click on detect face and capture image currently image is null")
        }
        else if(email === ""){
          return alert("no email entered")
        }
        var data = JSON.stringify({
          "email": email,
          "fd": imge
        });
        var config = {
          method: 'post',
          url: 'https://facerecapi.herokuapp.com/signin/face',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          alert(JSON.stringify(response.data));
          navigate("/page1")
        })
        .catch(function (error) {
          if(error.response.status==400){
            alert("not that user")
          }
          else if(error.response.status ==404){
            alert("no such user found")
          }
        });
    }
   
    return(
        <div className="signup">
        <div className='div2'>
        <h2>Login</h2>
        <div className='div3'>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Email'/>    
        </div>

        

        <div className='div4'>
            <button onClick={savee}>Login</button>
        </div>
        <Button type="primary" onClick={showModal}>
        Detect Face
      </Button>

  <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
 
        <p>Detect your face</p>

        <Webcam 
        audio={false}
        height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}/>
        {/* <Link to="/page1">  */}
        <button onClick={(e)=>{e.preventDefault();cam()}}>Capture</button>
        {/* </Link> */}
      </Modal>
        </div>

    </div>

      
    )
  }
  
  export default Login;
  