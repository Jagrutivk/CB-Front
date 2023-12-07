import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import Footer from '../../../components/partials/dashboard/FooterStyle/footer';


// img
import image1 from '../../../assets/images/page-img/img-success.png';
import logo from '../../../assets/images/logo.png';

const FormWizardVertical = () => {
    const [show, AccountShow] = useState('A');
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({

    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = () => {
        // Add validation logic here to check if the form data is correct
        if (formData.member_req_Id && formData.firstName && formData.lastName && formData.dateOfBirth) {
            // If data is correct, set isSuccess to true, indicating a successful signup
            setIsSuccess(true);
        } else {
            // If data is incorrect, set an error message
            setErrorMessage('Please provide correct information');
        }
    };


    return (
        <>
            <div id='content-page' className='content-page'>
                <Container>
                    <Row>
                        <Col sm="12">
                            <Card className="card position-relative inner-page-bg bg-primary" style={{ height: "40px" }}>
                                <div className="inner-page-title">
                                    <h3 className="text-white">Signup page</h3>
                                    <img src={logo} alt="Website Logo" />
                                </div>
                            </Card>
                        </Col>
                        <Col sm="12" lg="12">
                            <Card>
                                <Card.Header className="d-flex justify-content-between">
                                    <div className="header-title">
                                        <div className="footer"></div>

                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md="3">
                                            <ul id="top-tabbar-vertical" className="p-0">
                                                <li className={` ${show === '' ? 'active done' : ''} ${show === 'Account' ? 'active done' : ''} ${show === 'Personal' ? 'active done' : ''}  active step1`} id="personal">
                                                    <Link to="#">
                                                        <i className="material-symbols-outlined bg-soft-primary text-primary">lock_open</i><span>Personal</span>
                                                    </Link>
                                                </li>
                                                <li id="contact" className={` ${show === 'Account' ? 'active done' : ''} ${show === 'Personal' ? 'active done' : ''} ${show === 'Image' ? 'active done' : ''} step2`}>
                                                    <Link to="#">
                                                        <i className="material-symbols-outlined bg-soft-danger text-danger">person</i><span>Contact</span>
                                                    </Link>
                                                </li>
                                                <li id="Company " className={` ${show === 'Personal' ? 'active done' : ''} ${show === 'Image' ? 'active done' : ''} step3`}>
                                                    <Link to="#">
                                                        <i className="material-symbols-outlined bg-soft-success text-success">photo_camera</i><span>Company </span>
                                                    </Link>
                                                </li>
                                                <li id="payment" className={` ${show === 'Image' ? 'active done' : ''} step4`}>
                                                    <Link to="#">
                                                        <i className="material-symbols-outlined bg-soft-warning text-warning">done</i><span>Address</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </Col>
                                        <Col md="9">
                                            <Form id="form-wizard3" className="text-start">
                                                <fieldset className={`${show === 'A' ? 'd-block' : 'd-none'}`}>
                                                    <div className="form-card text-left">
                                                        <Row>
                                                            <div className="col-12">
                                                                <h3 className="mb-4">Member  Information</h3>
                                                            </div>
                                                        </Row>
                                                        <Row>
                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>Member ID</Form.Label>
                                                                    <Form.Control type="text" className="mb-0" id="member_req_Id" placeholder="Enter Member_Req_ID" />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>First Name</Form.Label>
                                                                    <Form.Control type="email" className="mb-0" id="exampleInputEmail1" placeholder="Your First  Name" />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label> last Name</Form.Label>
                                                                    <Form.Control type="email" className="mb-0" id="exampleInputEmail1" placeholder="Your Last Name" />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>Date of Birth</Form.Label>
                                                                    <Form.Control type="date" id="dateOfBirthInput" placeholder="Select your date of birth" />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>Gender</Form.Label>
                                                                    <Form.Control as="select" id="genderSelect" placeholder="Select gender">
                                                                        <option value="male">Male</option>
                                                                        <option value="female">Female</option>
                                                                        <option value="other">Other</option>
                                                                    </Form.Control>
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label htmlFor="membershipPlan">Membership Plan</Form.Label>
                                                                    <Form.Control as="select" id="membershipPlan">
                                                                        <option value="Gold Plan">Gold Plan</option>
                                                                        <option value="Silver Plan">Silver Plan</option>
                                                                        <option value="Platinum Plan">Platinum Plan</option>
                                                                    </Form.Control>
                                                                </Form.Group>
                                                            </Col>


                                                        </Row>
                                                    </div>
                                                    <Button id="submit" name="next" className="btn-primary next action-button float-end" value="Next" onClick={() => AccountShow('Account')}>Next</Button>
                                                </fieldset>
                                                <fieldset className={`${show === 'Account' ? 'd-block' : 'd-none'}`}>
                                                    <div className="form-card text-left">
                                                        <Row>
                                                            <div className="col-12">
                                                                <h3 className="mb-4">Contact Information</h3>
                                                            </div>
                                                        </Row>
                                                        <Row>
                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>Street Address</Form.Label>
                                                                    <Form.Control type="text" id="streetAddressInput" placeholder="Enter your street address" />
                                                                </Form.Group></Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>City</Form.Label>
                                                                    <Form.Control type="text" id="cityInput" placeholder="Enter your city" />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>State</Form.Label>
                                                                    <Form.Control type="text" className="mb-0" id="stateInput" placeholder="Enter state" />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>Country</Form.Label>
                                                                    <Form.Control type="text" className="mb-0" id="countryInput" placeholder="Enter country" />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>Zip Code</Form.Label>
                                                                    <Form.Control type="number" className="mb-0" id="zipCodeInput" placeholder="Enter zip code" />
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>Contact Number</Form.Label>
                                                                    <Form.Control type="tel" id="contactNumberInput" placeholder="Enter your contact number" />
                                                                </Form.Group>
                                                            </Col>
                                                            
                                                           



                                                        </Row>
                                                    </div>

                                                </fieldset>
                                                <fieldset className={`${show === 'Personal' ? 'd-block' : 'd-none'}`}>
                                                    <div className="form-card text-left">
                                                        <Row>
                                                            <div className="col-12">
                                                                <h3 className="mb-4">Company  Information</h3>
                                                            </div>
                                                        </Row>
                                                        <Row>
                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label htmlFor="company_Name">company_Name</Form.Label>
                                                                    <Form.Control type="text" id="companyName" placeholder="Enter company_Name" />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>company_title</Form.Label>
                                                                    <Form.Control type="text" className="mb-0" id="company_titleInput" placeholder="Enter company_title" />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>Company Email</Form.Label>
                                                                    <Form.Control type="email" className="mb-0" id="companyEmailInput" placeholder="Enter company email" />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>Company Contact Number</Form.Label>
                                                                    <Form.Control type="tel" className="mb-0" id="companyContactNumberInput" placeholder="Enter company contact number" />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>LinkedIn Profile URL</Form.Label>
                                                                    <Form.Control type="text" className="mb-0" id="linkedinUrlInput" placeholder="Enter LinkedIn Profile URL" />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>Company Address</Form.Label>
                                                                    <Form.Control type="text" className="mb-0" id="companyAddressInput" placeholder="Enter company address" as="textarea" rows={3} />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label htmlFor="memberCategory">Member Category</Form.Label>
                                                                    <Form.Control as="select" id="memberCategory">
                                                                        <option value="Information Technology (IT)">Information Technology (IT)</option>
                                                                        <option value="Agriculture">Agriculture</option>
                                                                        <option value="Pharmacy">Pharmacy</option>
                                                                        <option value="Healthcare">Healthcare</option>
                                                                        <option value="Finance">Finance</option>
                                                                        <option value="Education">Education</option>
                                                                        <option value="Manufacturing">Manufacturing</option>
                                                                        <option value="Retail">Retail</option>
                                                                        <option value="Food and Beverage">Food and Beverage</option>
                                                                        <option value="Automotive">Automotive</option>
                                                                        <option value="Energy">Energy</option>
                                                                        <option value="Entertainment">Entertainment</option>
                                                                        <option value="Transportation">Transportation</option>
                                                                        <option value="Construction">Construction</option>
                                                                        <option value="Real Estate">Real Estate</option>
                                                                        <option value="Tourism and Hospitality">Tourism and Hospitality</option>
                                                                        <option value="Environmental Sustainability">Environmental Sustainability</option>
                                                                        <option value="Government and Public Services">Government and Public Services</option>
                                                                        <option value="Aerospace and Aviation">Aerospace and Aviation</option>
                                                                        <option value="Media and Communications">Media and Communications</option>
                                                                    </Form.Control>
                                                                </Form.Group>
                                                            </Col>

                                                        </Row>
                                                    </div>


                                                    
                                                    <Button variant="primary" name="next" className="next action-button float-end" value="Submit" onClick={() => AccountShow('Image')}>Next</Button>
                                                    <Button variant="dark" name="previous" className="previous action-button-previous float-end me-3" value="Previous" onClick={() => AccountShow('Account')}>Previous</Button>
                                                </fieldset>
                                                <fieldset className={`${show === 'Image' ? 'd-block' : 'd-none'}`}>
                                                    <div className="form-card text-left">
                                                        <Row>
                                                            <div className="col-12">
                                                                <h3 className="mb-4 text-left"></h3>
                                                            </div>
                                                        </Row>
                                                        <Row>
                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>Company City</Form.Label>
                                                                    <Form.Control type="text" className="mb-0" id="companyCityInput" placeholder="Enter company city" />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>Company State</Form.Label>
                                                                    <Form.Control type="text" className="mb-0" id="companyStateInput" placeholder="Enter company state" />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label>Company Website</Form.Label>
                                                                    <Form.Control type="text" className="mb-0" id="companyWebsiteInput" placeholder="Enter company website" />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md="6">
                                                                <Form.Group className="form-group">
                                                                    <Form.Label htmlFor="companyZipCode">Company Zip Code</Form.Label>
                                                                    <Form.Control type="text" id="companyZipCode" placeholder="Enter zip code" />
                                                                </Form.Group>
                                                            </Col>

                                                        </Row>
                                                    </div>
                                                    <Button variant="primary" className="action-button float-end" href="#" onClick={() => AccountShow('Image2')}>Submit</Button>
                                                    <Link to="/auth/sign-in">Sign-in </Link>
                                                    <Button variant="dark" name="previous" className="previous action-button-previous float-end me-3" value="Previous" onClick={() => AccountShow('Personal')}>Previous</Button>
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
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default FormWizardVertical