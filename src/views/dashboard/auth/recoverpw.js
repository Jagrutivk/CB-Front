import {React, useState} from 'react'
import { Row, Col, Button, Form, Container, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
// import 'swiper/components/navigation/navigation.scss';

// img
import logo from '../../../assets/images/logo-full.png'
import login1 from '../../../assets/images/login/1.png'
import login2 from '../../../assets/images/login/2.png'
import login3 from '../../../assets/images/login/3.png'

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const Recoverpw = () => {
  let history = useNavigate()

  const [email_id , setEmail_id] = useState('')
  const sendPasswordResetLink = () => {
    console.log("------>>>>", email_id);

    axios
      .post(process.env.REACT_APP_API_URL +'/auth/forget-password', { email_id })
      .then((response) => {
        console.log('Email sent successfully', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }






  return (
    <>
      <section className="sign-in-page">
        <div id="container-inside">
          <div id="circle-small"></div>
          <div id="circle-medium"></div>
          <div id="circle-large"></div>
          <div id="circle-xlarge"></div>
          <div id="circle-xxlarge"></div>
        </div>
        <Container className="p-0">
          <Row className="no-gutters">
            <Col md="6" className="text-center pt-5">
              <div className="sign-in-detail text-white">
                <Link className="sign-in-logo mb-5" to="#">
                  <Image src={logo} className="img-fluid" alt="logo" />
                </Link>
                <div className="sign-slider overflow-hidden">
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      "delay": 2000,
                      "disableOnInteraction": false
                    }}
                    className="list-inline m-0 p-0">
                    <SwiperSlide>
                      <Image src={login1} className="img-fluid mb-4" alt="logo" />
                      <h4 className="mb-1 text-white">Find new friends</h4>
                      <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image src={login2} className="img-fluid mb-4" alt="logo" />
                      <h4 className="mb-1 text-white">Connect with the world</h4>
                      <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image src={login3} className="img-fluid mb-4" alt="logo" />
                      <h4 className="mb-1 text-white">Create new events</h4>
                      <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </Col>
            <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
              <div className="sign-in-from">
                <h1 className="mb-5">Reset Password</h1>
                <p>Enter your email address and we'll send you an email with instructions to reset your password.</p>
                <Form className="mt-0">
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            className="mb-0"
            id="exampleInputEmail1"
            placeholder="Enter email"
            value={email_id}
            onChange={(e)=>setEmail_id(e.target.value)} // Handle email input change
          />
        </Form.Group>
        <div className="d-inline-block w-100">
          <Button
            variant="primary"
            type="button"
            className="float-right mt-3"
            onClick={sendPasswordResetLink} // Call the sendPasswordResetLink function
          >
            Submit
          </Button>
        </div>
      </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Recoverpw


// import React from 'react';
// import { Row, Col, Button, Form, Container, Image } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';

// // Swiper
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation, Autoplay } from 'swiper';

// // Import Swiper styles
// import 'swiper/swiper-bundle.min.css';

// // Images
// import logo from '../../../assets/images/logo-full.png';
// import login1 from '../../../assets/images/login/1.png';
// import login2 from '../../../assets/images/login/2.png';
// import login3 from '../../../assets/images/login/3.png';

// // Install Swiper modules
// SwiperCore.use([Navigation, Autoplay]);

// const Recoverpw = () => {
//   let history = useNavigate();

//   return (
//     <>
//       <section className="forgot-password-page">
//         <Container className="p-0">
//           <Row className="no-gutters">
//             <Col md="6" className="text-center pt-5">
//               <div className="forgot-password-detail">
//                 <Link className="forgot-password-logo mb-5" to="#">
//                   <Image src={logo} className="img-fluid" alt="logo" />
//                 </Link>
//                 <div className="forgot-password-slider overflow-hidden">
//                   <Swiper
//                     spaceBetween={30}
//                     centeredSlides={true}
//                     autoplay={{
//                       delay: 2000,
//                       disableOnInteraction: false,
//                     }}
//                     className="list-inline m-0 p-0"
//                   >
//                     <SwiperSlide>
//                       <Image src={login1} className="img-fluid mb-4" alt="logo" />
//                       <h4 className="mb-1 text-dark">Find new friends</h4>
//                       <p>Discover new people and expand your social network.</p>
//                     </SwiperSlide>
//                     <SwiperSlide>
//                       <Image src={login2} className="img-fluid mb-4" alt="logo" />
//                       <h4 className="mb-1 text-dark">Connect with the world</h4>
//                       <p>Stay connected with friends and family all over the world.</p>
//                     </SwiperSlide>
//                     <SwiperSlide>
//                       <Image src={login3} className="img-fluid mb-4" alt="logo" />
//                       <h4 className="mb-1 text-dark">Create new events</h4>
//                       <p>Organize and participate in exciting events and activities.</p>
//                     </SwiperSlide>
//                   </Swiper>
//                 </div>
//               </div>
//             </Col>
//             <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
//               <div className="forgot-password-form">
//                 <h1 className="mb-0">Reset Your Password</h1>
//                 <p>Enter your email address, and we'll send you an email with instructions to reset your password.</p>
//                 <Form className="mt-4">
//                   <Form.Group>
//                     <Form.Label>Email Address</Form.Label>
//                     <Form.Control type="email" className="mb-0" id="exampleInputEmail1" placeholder="Enter your email" />
//                   </Form.Group>
//                   <div className="d-inline-block w-100">
//                     <Button
//                       variant="primary"
//                       type="button"
//                       className="float-right mt-3"
//                       onClick={() => history('/auth/sign-in')}
//                     >
//                       Reset Password
//                     </Button>
//                   </div>
//                 </Form>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// };

// export default Recoverpw;
