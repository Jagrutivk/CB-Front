import React, { useState, useRef, useEffect } from 'react'

import { Row, Col, Container, Form, Button, Image, Alert, Card } from 'react-bootstrap'

//import { Row, Col, Container, Form, Alert, Button, Image, Card } from 'react-bootstrap'

import { Link, useNavigate } from 'react-router-dom'
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import axios from 'axios';
// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
// import 'swiper/components/navigation/navigation.scss';
//img
import logo from '../../../assets/images/logo-full.png'
import login1 from '../../../assets/images/login/1.png'
import login2 from '../../../assets/images/login/2.png'
import login3 from '../../../assets/images/login/3.png'
import image1 from '../../../assets/images/page-img/img-success.png'

import { preventDefault } from '@fullcalendar/react';
// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const SignUp = () => {
    const [memberCategories, setMemberCategories] = useState([]);
    const [chapters, setChapters] = useState([])
    const [membershipPlans, setMembershipPlans] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [firstHeading, setFirstHeading] = useState('User Information');
    const [secondHeading, setSecondHeading] = useState('Company Information');
    const [thirdHeading, setThirdHeading] = useState('Company');
    const [fourthHeading, setFourthHeading] = useState('Final Step');
    const [currentStep, setCurrentStep] = useState(1);
    // const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [error, setError] = useState(null); // State to manage errors

    let history = useNavigate()
    const [show, AccountShow] = useState('A');

    const navigate = useNavigate();

    const showSuccess = () => {
        setShowSuccessAlert(true);
    };

    const closeSuccess = () => {
        setShowSuccessAlert(false);
    };

    const clearError = () => {
        setError(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const showSuccess = () => {
        //     setShowSuccessAlert(true);
        //   };

        //   const closeSuccess = () => {
        //     setShowSuccessAlert(false);
        //   };
        const showSuccess = () => {
            setShowSuccessAlert(true);
        };

        const closeSuccess = () => {
            setShowSuccessAlert(false);
        };

        // Validation: Check if required fields are empty
        const requiredFields = [
            'fname',
            'lname',
            'dob',
            'email',
            'ccno',
            // 'streetAddressInput',
            'city',
            'chapter',
            // 'state',
            //'countryInput',
            //'zipCodeInput',
            'companyName',
            //'company_titleInput',
            //'companyEmailInput',
            //'companyContactNumberInput',
            // 'companyWebsiteInput',
            // 'linkedinUrlInput',
            //'company AddressInput',
            //'companyCityInput',
            // 'companyStateInput',
            // 'countryInput',
            //'companyZipCode',
            'memberCategory',
            // Add other required fields here
        ];

        // Check if any of the required fields are empty
        const isAnyFieldEmpty = requiredFields.some((fieldName) => !document.getElementById(fieldName).value);

        //   if (isAnyFieldEmpty) {
        //     // Display an error message to the user (you can use state or an alert)
        //     alert('Please fill in all required fields');
        //     return; // Prevent form submission
        //   }


        const email = document.getElementById('email').value;
        const isEmailUnique = await checkEmailUniqueness(email);

        console.log('---->', isEmailUnique)
        if (!isEmailUnique) {
            // Display an error message to the user
            alert('Email already exists. Please use a different email.');
            return; // Prevent form submission
        }


        // Gather form data (you can create an object with the form fields here)
        const formData = {
            // Include all the form field data you want to send to the API
            first_name: document.getElementById('fname').value,
            last_name: document.getElementById('lname').value,
            dob: document.getElementById('dob').value,
            // gender: document.querySelector('input[name="customRadio"]:checked').value,
            email_id: document.getElementById('email').value,
            contact_no: document.getElementById('ccno').value,
            // street_address: document.getElementById('streetAddressInput').value,
            city: document.getElementById('city').value,
            chapter_to_join: document.getElementById('chapter').value,
            //state: document.getElementById('state').value,
            //country: document.getElementById('countryInput').value,
            // zip_code: document.getElementById('zipCodeInput').value,
            member_type: "", // You may need to specify the member type
            membership_plan: document.getElementById('membershipPlan').value,
            company_name: document.getElementById('companyName').value,
            // company_title: document.getElementById('company_titleInput').value,
            // company_email: document.getElementById('companyEmailInput').value,
            //company_contact_no: document.getElementById('companyContactNumberInput').value,
            //company_website: document.getElementById('companyWebsiteInput').value,
            // company_linkedIn_url: document.getElementById('linkedinUrlInput').value,
            // company_address: document.getElementById('company AddressInput').value,
            // company_city: document.getElementById('companyCityInput').value,
            // company_state: document.getElementById('companyStateInput').value,
            //company_country: document.getElementById('countryInput').value,
            //company_zip_code: document.getElementById('companyZipCode').value,
            member_category: document.getElementById('memberCategory').value,
            membership_status: 'pending'
        };

        try {
            // Send a POST request to your API endpoint
            const response = await axios.post(process.env.REACT_APP_API_URL + '/membershipRequest/membership-requests', formData);

            // Check the response from the API
            if (response) {
                showSuccess();

            }
            if (response.status === 201) {
                // Handle success, e.g., show a success message or redirect to another page

                setTimeout(() => {
                    showSuccess(); // Call showSuccess to display the success alert
                }, 2000);

                // alert('Signup successful');
                showSuccess();


                // alert('Signup successful');
                // showSuccess();

                navigate('/auth/sign-in')
                // history('/success'); // Redirect to a success page

            } else {
                // Handle any other response status codes or errors
                // alert('Signup failed');
            }
        } catch (error) {

            console.error('API request error', error);
            // alert('Signup failed');
            setError(
                "An error occurred while signing up. Please try again later."
            );
        }
    };


    // Function to check email uniqueness
    const checkEmailUniqueness = async (email) => {
        try {
            // Make a GET request to your API endpoint to check email uniqueness
            const response = await axios.get(process.env.REACT_APP_API_URL + `/membershipRequest/checkEmailUniqueness?email_id=${email}`);

            // Return true if the email is unique, false otherwise
            console.log(response.data.unique)
            return response.data.unique;
        } catch (error) {
            console.error('Email uniqueness check error', error);
            return false; // Assume email is not unique in case of an error
        }
    };

    // added scrollbar in form
    // const scrollableStyles = {
    //     maxHeight: '60%', // Adjust the height as needed
    //     overflow: 'auto',
    //     padding: '2vh', // Add padding as needed for styling

    // };


    // const scrollableContainerRef = useRef(null);

    // This useEffect will set the scrollTop to 0 when the component is initially mounted.
    // useEffect(() => {
    //     if (scrollableContainerRef.current) {
    //         scrollableContainerRef.current.scrollTop = 0;
    //     }
    // }, []);

    // to fetch member category list

    useEffect(() => {
        // Make the API request here
        axios.get(process.env.REACT_APP_API_URL + '/memberCategory/memberCategory')
            .then((response) => {
                // Assuming the API response contains an array of categories
                setMemberCategories(response.data);
                console.log('member------>', response.data);
            })
            .catch((error) => {
                console.error('API request failed:', error);
            });
    }, []);

    // to fetch list of chapters
    useEffect(() => {
        // Make the API request here
        axios.get(process.env.REACT_APP_API_URL + '/chapters/chapters')
            .then((response) => {
                // Assuming the API response contains an array of categories
                setChapters(response.data);
                console.log('chapters------>', response.data);
            })
            .catch((error) => {
                console.error('API request failed:', error);
            });
    }, []);

    // to fetch all members plan
    useEffect(() => {
        // Make the API request here
        axios.get(process.env.REACT_APP_API_URL + '/api/membership_plans/membership_plans')
            .then((response) => {
                // Assuming the API response contains an array of member Plans
                setMembershipPlans(response.data);
                console.log('memberPlans------>', response.data);
            })
            .catch((error) => {
                console.error('API request failed:', error);
            });
    }, []);

    const second = () => {
        setSecondHeading(' Information')
    }


    const handleNext = () => {
        if (currentStep === 1) {
            setFirstHeading('User Information');
        } else if (currentStep === 2) {
            setSecondHeading('Company Information');
        } else if (currentStep === 3) {
            setThirdHeading('Company');
        } else if (currentStep === 4) {
            setFourthHeading('Final Step');
        }

        // Update the current step
        setCurrentStep(currentStep + 1);
    };

    // Define a handlePrevious function
    const handlePrevious = () => {
        if (currentStep > 1) {
            // If the current step is greater than 1, decrement it to go back
            setCurrentStep(currentStep - 1);
        }
    };


    return (
        <>
            <div >
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
                            <Col md="6" className="text-center pt-5 " >
                                <div className="sign-in-detail text-white">
                                    <Link className="sign-in-logo mb-5" to="#"><Image src={logo} className="img-fluid" alt="logo" /></Link>
                                    <div className="sign-slider overflow-hidden">
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
                            <Col md="6" style={{ maxHeight:'80vh', marginTop:'10vh', marginBottom:'10vh'}}>
                                
                                    <Card>
                                        
                                            <Card.Header className="header-title"  style={{ maxHeight: '10vh', paddingBottom:'3%', paddingTop: '3%' }}>
                                                <h3 className="card-title text-center">
                                                    {/* {currentStep === 1 && firstHeading}
                                                    {currentStep === 2 && secondHeading}
                                                    {currentStep === 3 && thirdHeading}
                                                    {currentStep === 4 && fourthHeading} */}
                                                    Join CB
                                                </h3>
                                            </Card.Header>
                                        
                                        <Card.Body style={{maxHeight:'60vh', overflowY: 'auto', paddingRight:'2%'}}>
                                            <Row >
                                                <Col>
                                                    <Form id="form-wizard3" className="text-start">
                                                        <fieldset className={`${show === 'A' ? 'd-block' : 'd-none'}`}>
                                                            <div className="form-card text-left" >
                                                                {/* <Row  >
                                                                <div className="col-012"  >
                                                                    <h3 className="mb-4">User Information</h3>
                                                                </div>
                                                            </Row> */}
                                                                <Row>
                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>First Name: *</Form.Label>
                                                                            <Form.Control type="text" id="fname" name="fname" placeholder="First Name" required="required" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>Last Name:*</Form.Label>
                                                                            <Form.Control type="text" id="lname" name="lname" placeholder="Last Name" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    {/* <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>Date Of Birth: *</Form.Label>
                                                                            <Form.Control type="date" id="dob" name="dob" />
                                                                        </Form.Group>
                                                                    </Col> */}

                                                                    {/* <Col md="12">
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label >Gender: *</Form.Label>
                                                                        <Form.Check className="form-check">
                                                                            <Form.Check className="form-check form-check-inline">
                                                                                <Form.Check.Input type="radio" className="form-check-input" name="customRadio" id="customRadio1" />
                                                                                <Form.Check.Label> Male</Form.Check.Label>
                                                                            </Form.Check>
                                                                            <Form.Check className="form-check form-check-inline">
                                                                                <Form.Check.Input type="radio" className="form-check-input" name="customRadio" id="customRadio2" />
                                                                                <Form.Check.Label> Female</Form.Check.Label>
                                                                            </Form.Check>
                                                                        </Form.Check>
                                                                        <Form.Check className="form-check form-check-inline">
                                                                            <Form.Check.Input type="radio" className="form-check-input" name="customRadio" id="customRadio3" />
                                                                            <Form.Check.Label>Other </Form.Check.Label>

                                                                        </Form.Check>
                                                                    </Form.Group>
                                                                </Col> */}

                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>Email Id: *</Form.Label>
                                                                            <Form.Control type="email" id="email" name="email" placeholder="Email Id" />
                                                                        </Form.Group>
                                                                    </Col>

                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>Contact Number *</Form.Label>
                                                                            <Form.Control type="text" id="ccno" name="ccno" placeholder="Contact Number" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label htmlFor="company_Name">Company Name</Form.Label>
                                                                            <Form.Control type="text" id="companyName" placeholder="Enter Company Name" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label htmlFor="memberCategory">Member Category</Form.Label>
                                                                            <Form.Control as="select" id="memberCategory">
                                                                                {memberCategories.map((category) => (
                                                                                    <option key={category.id} value={category.id}>
                                                                                        {category.member_category}
                                                                                    </option>
                                                                                ))}
                                                                            </Form.Control>
                                                                        </Form.Group>

                                                                    </Col>
                                                                    

                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label htmlFor="membershipPlan">Membership Plan</Form.Label>
                                                                            <Form.Control as="select" id="membershipPlan">
                                                                                {membershipPlans.map((plan) => (
                                                                                    <option key={plan.id} value={plan.id}>
                                                                                        {plan.membership_plan}
                                                                                    </option>
                                                                                ))}
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>

                                                                    {/* <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>City: *</Form.Label>
                                                                            <Form.Control type="text" id="city" name="city" placeholder="City." />
                                                                        </Form.Group>
                                                                    </Col> */}
                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label htmlFor="chapter">Chapter:</Form.Label>
                                                                            <Form.Control as="select" id="chapter">
                                                                                {chapters.map((chapter) => (
                                                                                    <option key={chapter.id} value={chapter.id}>
                                                                                        {chapter.chapter_name}
                                                                                    </option>
                                                                                ))}
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>

                                                                </Row>
                                                            </div>
                                                            <div className="fixed-button-container" style={{ textAlign: 'right' }}>
                                                                {/* <Button id="submit" name="next" className="btn-primary next action-button" value="Next" 
                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label htmlFor="membershipPlan">Membership Plan</Form.Label>
                                                                            <Form.Control as="select" id="membershipPlan">
                                                                                <option value="Gold Plan">Gold Plan</option>
                                                                                <option value="Silver Plan">Silver Plan</option>
                                                                                <option value="Platinum Plan">Platinum Plan</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>City: *</Form.Label>
                                                                            <Form.Control type="text" id="city" name="city" placeholder="City." />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            <div className="fixed-button-container" style={{ textAlign: 'right' }}>
                                                                {/* <Button id="submit" name="next" className="btn-primary next action-button" value="Next" 
                                                                onClick={() => { handleNext(); AccountShow('Account');                     
                                                           }}>
                                                         Next
                                                          </Button> */}
                                                                {/* <Button variant="primary" className="action-button float-end" href="#" onClick={handleSubmit} style={{ marginTop: '10px' }}>Submit</Button> */}

                                                            </div>
                                                        </fieldset>
                                                        <fieldset className={`${show === 'Account' ? 'd-block' : 'd-none'}`}>
                                                            <div className="form-card text-left">
                                                                {/* <Row>
                                                                <div className="col-012">
                                                                    <h3 className="mb-4">Contact Information:</h3>
                                                                </div>
                                                            </Row> */}
                                                                <Row>
                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>Street Address* </Form.Label>
                                                                            <Form.Control type="text" id="streetAddressInput" placeholder="Enter your street address" />
                                                                        </Form.Group></Col>

                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>City: *</Form.Label>
                                                                            <Form.Control type="text" id="city" name="city" placeholder="City." />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>State: *</Form.Label>
                                                                            <Form.Control type="text" id="state" name="state" placeholder="State." />
                                                                        </Form.Group>
                                                                    </Col>

                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>Country*</Form.Label>
                                                                            <Form.Control type="text" className="mb-0" id="countryInput" placeholder="Enter country" />
                                                                        </Form.Group>
                                                                    </Col>

                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>Zip Code*</Form.Label>
                                                                            <Form.Control type="number" className="mb-0" id="zipCodeInput" placeholder="Enter zip code" />
                                                                        </Form.Group>
                                                                    </Col>

                                                                    {/* <Col md="12">
                                                                <Form.Group className="form-group">
                                                 <Form.Label htmlFor="memberCategory">Member Category</Form.Label>
                                                   <Form.Control as="select" id="memberCategory">
                                                      {memberCategories.map((category) => (
                                                   <option key={category.id} value={category.id}>
                                                       {category.member_category}
                                                          </option>
                                                          ))}
                                                       </Form.Control>
                                                                 </Form.Group>

                                                                </Col> */}
                                                                </Row>
                                                            </div>
                                                            {/* <div className="fixed-button-container" style={{ textAlign: 'right' }}>

                                                                <Button
                                                                    id="previousButton"
                                                                    name="previous"
                                                                    variant="dark"
                                                                    style={{ marginRight: '15px' }}
                                                                    value="Previous"
                                                                    onClick={() => { handlePrevious(); AccountShow('A'); }}
                                                                >
                                                                    Previous
                                                                </Button>

                                                                <Button
                                                                    id="nextButton"
                                                                    name="next"
                                                                    className="btn-primary next action-button"
                                                                    value="Next"
                                                                    onClick={() => {
                                                                        handleNext();
                                                                        AccountShow('Personal');
                                                                    }}
                                                                >
                                                                    Next
                                                                </Button>
                                                            </div> */}
                                                        </fieldset>
                                                        <fieldset className={`${show === 'Personal' ? 'd-block' : 'd-none'}`}>
                                                            <div className="form-card text-left">
                                                                {/* <Row>
                                                                <div className="col-12 ">
                                                                    <h3 className="mb-4">Company  Information</h3>
                                                                </div>
                                                            </Row> */}
                                                                <Col md="12">
                                                                    <Form.Group className="form-group mb-2">
                                                                        <Form.Label>Company Address</Form.Label>
                                                                        <Form.Control type="text" className="mb-0" id="company AddressInput" placeholder="Enter company address" />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md="12">
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Company City</Form.Label>
                                                                        <Form.Control type="text" className="mb-0" id="companyCityInput" placeholder="Enter company city" />
                                                                    </Form.Group>
                                                                </Col>

                                                                <Col md="12">
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label>Company State</Form.Label>
                                                                        <Form.Control type="text" className="mb-0" id="companyStateInput" placeholder="Enter company state" />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md="12">
                                                                    <Form.Group className="form-group">
                                                                        <Form.Label htmlFor="companyZipCode">Company Zip Code</Form.Label>
                                                                        <Form.Control type="text" id="companyZipCode" placeholder="Enter zip code" />
                                                                    </Form.Group>
                                                                </Col>
                                                                {/* <Col md="12">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label htmlFor="memberCategory">Member Category</Form.Label>
                                                                    <Form.Control type="text" id="memberCategory" placeholder="Enter member category" />
                                                                </Form.Group>
                                                            </Col> */}
                                                                {/* <Col md="12">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label htmlFor="membershipPlan">Membership Plan</Form.Label>
                                                                    <Form.Control as="select" id="membershipPlan">
                                                                        <option value="Gold Plan">Gold Plan</option>
                                                                        <option value="Silver Plan">Silver Plan</option>
                                                                        <option value="Platinum Plan">Platinum Plan</option>
                                                                    </Form.Control>
                                                                </Form.Group>
                                                            </Col> */}
                                                                <Row>
                                                                </Row>
                                                            </div>
                                                            {/* <div className="fixed-button-container" style={{ textAlign: 'right' }}>

                                                                <Button
                                                                    id="previousButton"
                                                                    name="previous"
                                                                    variant="dark"
                                                                    value="Previous"
                                                                    style={{ marginRight: '15px' }}
                                                                    onClick={() => { handlePrevious(); AccountShow('Account'); }}
                                                                >
                                                                    Previous
                                                                </Button>

                                                                <Button
                                                                    id="nextButton"
                                                                    name="next"
                                                                    className="btn-primary next action-button"
                                                                    value="Next"
                                                                    onClick={() => {
                                                                        handleNext();
                                                                        AccountShow('Image');
                                                                    }}
                                                                >
                                                                    Next
                                                                </Button>

                                                            </div> */}
                                                        </fieldset>
                                                        <fieldset className={`${show === 'Image' ? 'd-block' : 'd-none'}`}>
                                                            <div className="form-card text-left" style={{ marginBottom: '10px' }}>
                                                                {/* <Row>
                                                                <div className="col-012">
                                                                    <h3 className="mb-4 text-left">Company   </h3>
                                                                </div>
                                                            </Row> */}
                                                                <Row style={{ marginBottom: '0' }}>
                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label htmlFor="company_Name">company_Name</Form.Label>
                                                                            <Form.Control type="text" id="companyName" placeholder="Enter company_Name" />
                                                                        </Form.Group>
                                                                    </Col>

                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>company_title</Form.Label>
                                                                            <Form.Control type="text" className="mb-0" id="company_titleInput" placeholder="Enter company_title" />
                                                                        </Form.Group>
                                                                    </Col>

                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>Company Email</Form.Label>
                                                                            <Form.Control type="email" className="mb-0" id="companyEmailInput" placeholder="Enter company email" />
                                                                        </Form.Group>
                                                                    </Col>

                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>Company Contact Number</Form.Label>
                                                                            <Form.Control type="tel" className="mb-0" id="companyContactNumberInput" placeholder="Enter company contact number" />
                                                                        </Form.Group>
                                                                    </Col>

                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>LinkedIn Profile URL</Form.Label>
                                                                            <Form.Control type="text" className="mb-0" id="linkedinUrlInput" placeholder="Enter LinkedIn Profile URL" />
                                                                        </Form.Group>
                                                                    </Col>

                                                                    <Col md="12">
                                                                        <Form.Group className="form-group">
                                                                            <Form.Label>Company Website</Form.Label>
                                                                            <Form.Control type="text" className="mb-0" id="companyWebsiteInput" placeholder="Enter company website" />
                                                                        </Form.Group>
                                                                    </Col>

                                                                    {/* <div className="fixed-button-container" style={{ marginTop: '10px' }}>
                                                                        <Button variant="primary" className="action-button float-end" href="#" onClick={handleSubmit} style={{ marginTop: '10px' }}>Submit</Button>
                                                                        <Button variant="dark" name="previous" className="previous action-button-previous float-end me-3" value="Previous" onClick={() => { handlePrevious(); AccountShow('Personal') }} style={{ marginTop: '10px' }}>Previous</Button>
                                                                    </div> */}
                                                                </Row>
                                                            </div>
                                                        </fieldset>

                                                        <fieldset className={`${show === 'Image2' ? 'd-block' : 'd-none'}`}>
                                                            <div className="form-card">
                                                                <Row>
                                                                    <div className="col-7">

                                                                    </div>
                                                                    <div className="col-5">

                                                                    </div>
                                                                </Row>
                                                                <br /><br />
                                                                <h2 className="text-success text-center"><strong>SUCCESS !</strong></h2>
                                                                <br />
                                                                <Row className="justify-content-center">
                                                                    <div className="col-3">
                                                                        <Image src={image1} className="img-fluid" alt="fit-image" />
                                                                    </div>
                                                                </Row>
                                                                <br /><br />
                                                                <Row className="justify-content-center">
                                                                    <div className="col-7 text-center">
                                                                        <h5 className="purple-text text-center">You Have Successfully Signed Up</h5>

                                                                    </div>
                                                                </Row>
                                                            </div>
                                                        </fieldset>
                                                    </Form>

                                                </Col>
                                            </Row>
                                        </Card.Body>
                                        
                                        <Card.Footer className="fixed-button-container" style={{ maxHeight: '10vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', paddingTop:'5%'}}>
                                            <Button variant="primary" className="action-button float-end" href="#" onClick={handleSubmit}>Submit</Button>
                                        </Card.Footer>
                                       
                                    </Card>
                                
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Success Alert */}
                <Alert
                    show={showSuccessAlert}
                    variant="success"
                    // onClose={()=>{closeSuccess()}}
                    dismissible
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "green",
                        color: "white",
                    }}
                >
                    <Alert.Heading>Success!</Alert.Heading>
                    <p> successfully Signed Up</p>
                </Alert>


            </div>

            {/* Success Alert */}
            {/* <Alert
            {/* Success Alert */}
            <Alert
                show={showSuccessAlert}
                variant="success"
                onClose={closeSuccess}
                dismissible
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "green",
                    color: "white",
                }}
            >
                <Alert.Heading>Success!</Alert.Heading>
                <p>Sign up successful!</p>
            </Alert>

            {/* Error Alert */}
            {error && (
                <Alert
                    variant="danger"
                    onClose={clearError}
                    dismissible
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "red",
                        color: "white",
                    }}
                >
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            )}
        </>
    )
}

export default SignUp;