
import React, { useState } from 'react';
import { Row, Col, Container, Form, Button, Image , Alert, Card } from 'react-bootstrap'
//import {  Row, Col, Button, Card, Form, Modal, Table, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
// import 'swiper/components/navigation/navigation.scss';

//img
import logo from '../../../assets/images/logo-full.png'
import login1 from '../../../assets/images/login/1.png'
import login2 from '../../../assets/images/login/2.png'
import login3 from '../../../assets/images/login/3.png'

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const SignIn = () => {
  const navigate = useNavigate();
  const [email_id, setEmail_id] = useState('');
  const [password, setPassword] = useState('');
  //for show alert messege
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);

  const showSuccess = () => {
    console.log('entering here')
    setShowSuccessModal(showSuccessModal);
   console.log('setShowSuccessModal', showSuccessModal);
  //   setShowSuccessModal(true, () => {
  //     console.log('setShowSuccessModal', showSuccessModal);
  // });
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const clearError = () => {
    setError(null);
  };



  const handleLogin = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL +'/auth/login', {
        email_id, // Assuming email_id and password are defined elsewhere
        password,
      });
      const data = response.data;
      sessionStorage.setItem('userID',data.response.member_id)
      sessionStorage.setItem('userName',data.response.user_name)
      console.log('response data---->>',data )
      // Check the response from the API
      if (!data.error) {
         // If login is successful, store the token in cookies or local storage
         const token = data.response.token;
         document.cookie = `token=${token}; path=/;`;
         localStorage.setItem('token', token); // Store the token in local storage
         // Authentication successful, you can redirect to a dashboard or profile page
        // Authentication successful, you can redirect to a dashboard or profile page
        const role = data.response.role_name;
        const username= data.response.user_name;
        const member_id= data.response.member_id;
        console.log(role)
        localStorage.setItem('role', role);
        localStorage.setItem('member_id', member_id);
        localStorage.setItem('username', username);
  
        // Redirect to the appropriate dashboard based on the role
        if (role === 'ADMIN') {
          navigate('/adminDashboard'); // Update the path as needed
        } else if (role === 'MEMBER') {
          navigate('/userDashboard'); // Update the path as needed
        } else {
          // Handle other roles as needed
          const errorMessage = document.getElementById('error-message');
          errorMessage.innerText = 'Email or password is incorrect';
          errorMessage.style.display = 'block';
        }
      } else {
        // Handle other response status codes or errors
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = 'Login failed: Check credentials';
        errorMessage.style.display = 'block';
      }
    } catch (error) {
      // Handle login error here (e.g., show an error message)
      const errorMessage = document.getElementById('error-message');
      errorMessage.innerText = 'Login failed: Check credentials';
      errorMessage.style.display = 'block';
    }
  };
  

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
        <Container className="p-0" style={{margin:'auto'}}>
          <Row className="no-gutters">
            <Col md="6" className="text-center pt-5 " >
              <div className="sign-in-detail text-white">
                <Link className="sign-in-logo mb-5" to="#">
                  <Image src={logo} className="img-fluid" alt="logo" />
                </Link>
                <div className="sign-slider overflow-hidden ">
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      "delay": 2000,
                      "disableOnInteraction": false
                    }}
                    className="list-inline m-0 p-0 ">
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
            {/* <Col md="6" className="bg-white pt-5  pt-5 pb-5 lg-5 pb-5"> */}

            <Col md="6" style={{marginTop:'60px', marginBottom: '40px', maxHeight:'700px'}}> {/* Reduced padding from pt-5 and pb-5 to pt-3 and pb-3 */}

              <Card className="sign-in-from" style={{marginTop:'40px'}}>
                <Card.Header>
                  <h3 className="text-center">Sign In Here!</h3>
                  {/* <p>Enter your email address and password to access admin panel.</p> */}
                </Card.Header>
                <Card.Body>
                  <Form className="mt-2">
                    <Form.Group className="form-group">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" className="mb-0" id="exampleInputEmail1" placeholder="Enter email"   value={email_id}
              onChange={(e) => setEmail_id(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Password</Form.Label>

                      <Form.Control type="password" className="mb-0" id="exampleInputPassword1" placeholder="Enter Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>


                    <div className="d-inline-block w-100">
                      <Link to="/auth/recoverpw" className="d-inline-block mt-2 pt-1">Forgot Password?</Link><br></br>
                      <Form.Check className="d-inline-block mt-2 pt-1">
                        <Form.Check.Input type="checkbox" className="me-2" id="customCheck11" />

                        <Form.Check.Input type="checkbox" className="me-2 " id="customCheck11" />

                        <Form.Check.Label>Remember Me</Form.Check.Label>{' '}

                      </Form.Check>
                      {/* <a href="/"> */}
                        <Button variant="primary" type="button" className="float-end"  onClick={handleLogin}>Sign in</Button>
                      {/* </a> */}
                    </div>
                    <div className="sign-info">

                      <span className="dark-color d-inline-block line-height-2">Don't have an account? <Link to="/auth/sign-up">Sign up</Link></span>
                      <ul className="iq-social-media">




                      </ul>
                    </div>

                    <div id="error-message" style={{color: "red", display: "none"}}></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Success Alert */}
        {/* <AlertComponent show={showSuccessAlert} variant="success" onClose={closeSuccess} message="Your login successfully." /> */}

        {/* Error Alert */}
        {/* {error && <AlertComponent variant="danger" onClose={clearError} message={error} />} */}
      </section>
    </>
  )
}

export default SignIn

