
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import Webcam from 'react-webcam';

import {useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


function Login() {
  

  const navigate = useNavigate();

    const webcamRef = React.useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

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

    function cam(){
      navigate("/page1")
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc)
        
    }

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
        <Button type="primary" onClick={showModal}>
        Login with Face
      </Button>

  <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
  <div className='div3'>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Email'/>    
        </div>
        <p>Detect your face</p>

        <Webcam 
        audio={false}
        height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}/>
        {/* <Link to="/page1">  */}
        <button onClick={(e)=>{e.preventDefault();cam()}}>Login</button>
        {/* </Link> */}
      </Modal>
        </div>

    </div>

      
    )
  }
  
  export default Login;
  