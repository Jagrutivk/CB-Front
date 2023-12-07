import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Tab, Form, Button, Nav, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

//image
import img1 from '../../../assets/images/user/11.png'

const UserProfileEdit = () => {
    const [memberData, setMemberData] = useState(null);
    const token = localStorage.getItem('token');
    const member_id = localStorage.getItem('member_id');
    const [successMessages, setSuccessMessages] = useState([]);
    const [error, setError] = useState(null); // State to manage errors

    const handleSuccess = (message) => {
        setSuccessMessages([...successMessages, message]);
    };

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL +`/members/members/${member_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMemberData(response.data.result);
            } catch (error) {
                console.error('Error fetching member data:', error);
            }
        };
        fetchMemberData();
    }, [member_id, token]);

    const handleMemberDataChange = (key, value) => {
        setMemberData({ ...memberData, [key]: value });
    };

    const updateMemberData = (updatedData) => {
        fetch(process.env.REACT_APP_API_URL +`/members/members/${member_id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // handleSuccess('Member data updated successfully');
                console.log('Member data updated:', data);
            })
            .catch((error) => {
                // setError('There was a problem with the update request');
                console.error('There was a problem with the update request:', error);
            });
    };
    // const handleSubmit = () => {
    //     updateMemberData(memberData);
    // };

    return (
        <>
            <Container>
                <Tab.Container defaultActiveKey="first">
                    <Row>
                        <Col lg="12">
                            <Card>
                                <Card.Body className="p-0">
                                    <div>
                                        <Nav as="ul" variant="pills" className="iq-edit-profile row">
                                            <Nav.Item as="li" className="col-md-3 p-0">
                                                <Nav.Link eventKey="first" role="button">
                                                    Personal Information
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item as="li" className="col-md-3 p-0">
                                                <Nav.Link eventKey="second" role="button">
                                                    Corporate Information
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item as="li" className="col-md-3 p-0">
                                                <Nav.Link eventKey="third" role="button">
                                                    Change Password
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item as="li" className="col-md-3 p-0">
                                                <Nav.Link eventKey="fourth" role="button">
                                                    Membership
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={12}>
                            {/* <div className="iq-edit-list-data"> */}
                            <Tab.Content>
                                <Tab.Pane eventKey="first" className="fade show">
                                    <Card>
                                        <Card.Header className="d-flex justify-content-between">
                                            <div className="header-title">
                                                <h4 className="card-title">Personal Information</h4>
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            {memberData && (
                                                <Form>
                                                    <Form.Group className="form-group align-items-center">
                                                        <Col md="12">
                                                            <div className="profile-img-edit">
                                                                <img className="profile-pic" src={img1} alt="profile-pic" />
                                                                <div className="p-image">
                                                                    <i className="ri-pencil-line upload-button text-white"></i>
                                                                    <input className="file-upload" type="file" accept="image/*" />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Form.Group>
                                                    <Row className="align-items-center">
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label htmlFor="fname" className="form-label">First Name:</Form.Label>
                                                            <Form.Control type="text" className="form-control" value={memberData.first_name} id="fname" placeholder="Enter your first name" onChange={(e) => handleMemberDataChange('first_name', e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label htmlFor="lname" className="form-label">Last Name:</Form.Label>
                                                            <Form.Control type="text" className="form-control" value={memberData.last_name} id="lname" placeholder="Enter your last name" onChange={(e) => handleMemberDataChange('last_name', e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label d-block">Gender:</Form.Label>
                                                            <Form.Check className="form-check form-check-inline">
                                                                <Form.Check.Input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="inlineRadioOptions"
                                                                    id="inlineRadio10"
                                                                    value="Male"
                                                                    checked={memberData.gender === 'Male'}
                                                                    onChange={(e) => handleMemberDataChange('gender', e.target.value)}
                                                                />
                                                                <Form.Check.Label className="form-check-label" htmlFor="inlineRadio10">Male</Form.Check.Label>
                                                            </Form.Check>
                                                            <Form.Check className="form-check form-check-inline">
                                                                <Form.Check.Input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="inlineRadioOptions"
                                                                    id="inlineRadio11"
                                                                    value="Female"
                                                                    checked={memberData.gender === 'Female'}
                                                                    onChange={(e) => handleMemberDataChange('gender', e.target.value)}
                                                                />
                                                                <Form.Check.Label className="form-check-label" htmlFor="inlineRadio11">Female</Form.Check.Label>
                                                            </Form.Check>
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label htmlFor="dob" className="form-label">Date Of Birth:</Form.Label>
                                                            <Form.Control
                                                                type="date"
                                                                className="form-control"
                                                                id="dob"
                                                                value={memberData?.dob ? memberData.dob.split('T')[0] : ''}
                                                                placeholder="Enter Date of Birth..."
                                                            />                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label htmlFor="dob" className="form-label">Email Id:</Form.Label>
                                                            <Form.Control type="email" className="form-control" id="age" value={memberData.email_id} placeholder="Enter email" onChange={(e) => handleMemberDataChange('email_id', e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">Contact No.:</Form.Label>
                                                            <Form.Control type="text" className="form-control" id="age" value={memberData.contact_no} placeholder="Enter Contact No" onChange={(e) => handleMemberDataChange('contact_no', e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">Country:</Form.Label>
                                                            <Form.Control type="text" className="form-control" id="age" value={memberData.country} placeholder="Enter Country" onChange={(e) => handleMemberDataChange('country', e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">State:</Form.Label>
                                                            <Form.Control type="text" className="form-control" id="age" value={memberData.state} placeholder="Enter State" onChange={(e) => handleMemberDataChange('state', e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">City:</Form.Label>
                                                            <Form.Control type="text" className="form-control" id="age" value={memberData.city} placeholder="Enter City" onChange={(e) => handleMemberDataChange('city', e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">Zip Code:</Form.Label>
                                                            <Form.Control type="number" className="form-control" id="age" value={memberData.zip_code} placeholder="Enter Zip Code" onChange={(e) => handleMemberDataChange('zip_code', e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-12">
                                                            <Form.Label className="form-label">Address:</Form.Label>
                                                            <Form.Control type="text" className="form-control" id="age" value={memberData.street_address} placeholder="Enter Address" onChange={(e) => handleMemberDataChange('street_address', e.target.value)} />
                                                        </Form.Group>

                                                    </Row>
                                                    <Button type="submit" onClick={updateMemberData(memberData)} className="btn btn-primary me-2">Submit</Button>
                                                    <Button type="reset" className="btn bg-soft-danger">Cancel</Button>
                                                </Form>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second" className="fade show">
                                    <Card>
                                        <Card.Header className="d-flex justify-content-between">
                                            <div className="header-title">
                                                <h4 className="card-title">Corporate Information</h4>
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            {memberData && (
                                                <Form>
                                                    <Form.Group className="form-group align-items-center">
                                                        <Col md="12">
                                                            <div className="profile-img-edit">
                                                                <img className="profile-pic" src={img1} alt="profile-pic" />
                                                                <div className="p-image">
                                                                    <i className="ri-pencil-line upload-button text-white"></i>
                                                                    <input className="file-upload" type="file" accept="image/*" />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Form.Group>
                                                    <Row className="align-items-center">
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label htmlFor="fname" className="form-label">Company Name:</Form.Label>
                                                            <Form.Control type="text" className="form-control" value={memberData.company_name} id="fname" placeholder="Enter Company Name" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label htmlFor="lname" className="form-label">Company Title:</Form.Label>
                                                            {/* <Form.Control type="text" className="form-control" value={memberData.company_title} id="lname" placeholder="Enter Company Title" /> */}
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label htmlFor="dob" className="form-label">Company LinkedIn URL:</Form.Label>
                                                            <Form.Control type="text" className="form-control" value={memberData.company_linkedIn_url} id="dob" placeholder="Enter LinkedIn URL" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label htmlFor="dob" className="form-label">Company Email:</Form.Label>
                                                            <Form.Control type="email" className="form-control" value={memberData.company_email} id="age" placeholder="Enter Email" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">Company Website:</Form.Label>
                                                            <Form.Control type="text" className="form-control" value={memberData.company_website} id="age" placeholder="Enter Website" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">Company Size:</Form.Label>
                                                            <Form.Control type="text" className="form-control" value={memberData.company_size} id="age" placeholder="Enter Company Size" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">Company Contact No.:</Form.Label>
                                                            <Form.Control type="text" className="form-control" value={memberData.company_contact_no} id="age" placeholder="Enter Contact No" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">Company Country:</Form.Label>
                                                            <Form.Control type="text" className="form-control" value={memberData.country} id="age" placeholder="Enter Country" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">Company State:</Form.Label>
                                                            <Form.Control type="text" className="form-control" value={memberData.state} id="age" placeholder="Enter State" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">Company City:</Form.Label>
                                                            <Form.Control type="text" className="form-control" value={memberData.city} id="age" placeholder="Enter City" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">Company Zip Code:</Form.Label>
                                                            <Form.Control type="text" className="form-control" value={memberData.zip_code} id="age" placeholder="Enter Zip Code" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-12">
                                                            <Form.Label className="form-label">Company Address:</Form.Label>
                                                            <Form.Control type="text" className="form-control" value={memberData.street_address} id="age" placeholder="Enter Address" />
                                                        </Form.Group>
                                                    </Row>

                                                    <Button type="submit" onClick={updateMemberData(memberData)} className="btn btn-primary me-2">Submit</Button>
                                                    <Button type="reset" className="btn bg-soft-danger">Cancel</Button>
                                                </Form>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third" className="fade show">
                                    <Card>
                                        <Card.Header className="d-flex justify-content-between">
                                            <div className="iq-header-title">
                                                <h4 className="card-title">Change Password</h4>
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            {memberData && (
                                                <Form>

                                                    <Form.Group className="form-group ">
                                                        <Form.Label htmlFor="uname" className="form-label">User Name:</Form.Label>
                                                        <Form.Control type="text" className="form-control" id="uname" value={memberData.user_name} placeholder="Bni@01" />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="cpass" className="form-label">Current Password:</Form.Label>
                                                        <Link to="/auth/recoverpw" className="float-end">Forgot Password</Link>
                                                        <Form.Control type="Password" className="form-control" id="cpass" defaultValue="" />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="npass" className="form-label">New Password:</Form.Label>
                                                        <Form.Control type="Password" className="form-control" id="npass" defaultValue="" />
                                                    </Form.Group>
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="vpass" className="form-label">Verify Password:</Form.Label>
                                                        <Form.Control type="Password" className="form-control" id="vpass" defaultValue="" />
                                                    </Form.Group>

                                                    <Button type="submit" className="btn btn-primary me-2">Submit</Button>
                                                    <Button type="reset" className="btn bg-soft-danger">Cancel</Button>
                                                </Form>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth" className="fade show">
                                    <Card>
                                        <Card.Header className="d-flex justify-content-between">
                                            <div className="header-title">
                                                <h4 className="card-title">Membership</h4>
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            {memberData && (
                                                <Form>
                                                    <Row className="align-items-center">
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">Membership Plan:</Form.Label>
                                                            <Form.Control type="text" className="form-control" id="age" value={memberData.membership_plan} placeholder="Enter Country" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">Member Ctegory:</Form.Label>
                                                            <Form.Control type="text" className="form-control" id="age" value={memberData.member_category} placeholder="Enter State" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">Member Type:</Form.Label>
                                                            <Form.Control type="text" className="form-control" id="age" value={memberData.member_type} placeholder="Enter City" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label">Chapter Name:</Form.Label>
                                                            <Form.Control type="text" className="form-control" id="age" value={memberData.chapter_to_join} placeholder="Chapter Name" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label htmlFor="cno" className="form-label">Membership Start Date:</Form.Label>
                                                            <Form.Control type="date" className="form-control" value={memberData.membership_start_date} id="cno" placeholder="Enter membership Start date" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label htmlFor="email" className="form-label">Membership End Date:</Form.Label>
                                                            <Form.Control type="date" className="form-control" value={memberData.membership_end_date} id="email" placeholder="Enter membership End date" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label htmlFor="url" className="form-label">Membership Renewal Date:</Form.Label>
                                                            <Form.Control type="date" className="form-control" value={memberData.membership_renewal_date} id="url" placeholder="Enter membership Renewal date" />
                                                        </Form.Group>
                                                        <Form.Group className="form-group col-sm-6">
                                                            <Form.Label className="form-label d-block">Active Status:</Form.Label>
                                                            <Form.Check className="form-check form-check-inline">
                                                                <Form.Check.Input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="inlineRadioOptions"
                                                                    id="inlineRadio10"
                                                                    value="Active"
                                                                    checked={memberData.is_active === 1} // Check if is_active is 1 for Active status
                                                                    onChange={(e) => setMemberData({ ...memberData, is_active: 1 })}
                                                                />
                                                                <Form.Check.Label className="form-check-label" htmlFor="inlineRadio10"> Active</Form.Check.Label>
                                                            </Form.Check>
                                                            <Form.Check className="form-check form-check-inline">
                                                                <Form.Check.Input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="inlineRadioOptions"
                                                                    id="inlineRadio11"
                                                                    value="Deactive"
                                                                    checked={memberData.is_active === 0} // Check if is_active is 0 for Deactive status
                                                                    onChange={(e) => setMemberData({ ...memberData, is_active: 0 })}
                                                                />
                                                                <Form.Check.Label className="form-check-label" htmlFor="inlineRadio11">Deactive</Form.Check.Label>
                                                            </Form.Check>
                                                        </Form.Group>
                                                    </Row>
                                                    <Button type="submit" onClick={updateMemberData(memberData)} className="btn btn-primary me-2">Submit</Button>
                                                    <Button type="reset" className="btn bg-danger">Cancel</Button>
                                                </Form>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                            </Tab.Content>
                            {/* </div> */}
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>



            {/* Success Alert */}
            <Alert
                show={successMessages.length > 0}
                variant="success"
                onClose={() => setSuccessMessages([])}
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
                {successMessages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
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

export default UserProfileEdit;