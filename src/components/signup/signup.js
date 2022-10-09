import './signup.css'

import { Button, Modal } from 'antd';
import React, { useState } from 'react';

import Webcam from 'react-webcam';

function Signup() {
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


    function cam(){
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc)
    }

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
            <button>Signup</button>
        </div>

        <Button type="primary" onClick={showModal}>
        Detect face
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
        <button onClick={(e)=>{e.preventDefault();cam()}}>capture</button>
      </Modal>
        </div>

    </div>
    
  )
}

export default Signup;
