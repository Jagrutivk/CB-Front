import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Tab,
  Form,
  Button,
  Nav,
  Modal,
  Alert,
  Table,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

import img1 from "../../../assets/images/user/11.png";

const MembersList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchResults } = location.state || [];
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setMembers(searchResults); // Update members with search results
    } else {
      fetchMembers();
    }
  }, [searchResults]);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/members/members",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMembers(response.data.requests);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const [showviewProfileForm, setShowviewProfileForm] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showdelete, setShowdelete] = useState(false);
  const handleClosedelete = () => setShowdelete(false);
  const handleShowdelete = () => setShowdelete(true);
  const [showedit, setShowedit] = useState(false);
  const handleCloseedit = () => setShowedit(false);
  const handleShowedit = () => setShowedit(true);

  const openviewProfileForm = (memberidd) => {
    console.log("selected member id", memberidd);
    // if (member && member.member_id) {
    navigate("/dashboard/app/fprofile", { state: memberidd });
    //}
  };

  const closeviewProfileForm = () => {
    setShowviewProfileForm(false);
  };

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Body className="p-0">
                  <div className="user-tabing p-3">
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                      <div
                        variant="pills"
                        className=" d-flex align-items-center text-center profile-forum-items p-0 m-0 w-30"
                      >
                        <Col lg={12} className=" p-3">
                          <h3>All Members</h3>
                        </Col>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {members.length > 0 ? (
              <Col sm={12}>

                <Card>
                  <Card.Body className="p-0">
                    <div className="table-responsive">
                      <Table style={{ overflowX: 'auto' }} className="forum-table mb-0 rounded">
                        <thead className="bg-primary text-center text-white">
                          <tr>
                            <th>
                              <b>Name</b>
                            </th>
                            <th>
                              <b>Category</b>
                            </th>
                            <th>
                              <b>Company</b>
                            </th>
                            <th>
                              <b>Action</b>
                            </th>
                          </tr>
                        </thead>

                        <tbody className="text-center">
                          {members.map((member, index) => (
                            <React.Fragment key={index}>
                              <tr>
                                <td className="col-lg-3" style={{ display: 'flex', alignItems: 'center' }}>
                                  <div>
                                  <img
                                    src={img1}
                                    alt="story-img"
                                    className="rounded-circle avatar-40"
                                  />
                                  </div> 
                                  <div style={{ marginLeft: '8px' }}>
                                  <b>
                                    {member.first_name} {member.last_name}
                                  </b>
                                  </div>
                                </td>
                                <td className="col-lg-3">
                                  <b>{member.member_category}</b>
                                </td>
                                <td className="col-lg-3">
                                  <b>{member.company_name}</b>
                                </td>
                                <td className="col-lg-3">
                                  <FaEye
                                    size={20}
                                    color="#007BFF"
                                    onClick={() => openviewProfileForm(member.member_id)}
                                  />
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>

              </Col>
            ) : (
              <Col lg={12}>
                <p>No Members Available</p>
              </Col>
            )}
          </Row>
        </Container>
      </div>

      <Modal
        show={showviewProfileForm}
        onHide={closeviewProfileForm}
        style={{ marginTop: "60px" }}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#007BFF", color: "white" }}
        >
          <Modal.Title>Member Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container defaultActiveKey="first">
            <Nav
              as="ul"
              variant="pills"
              className="mb-3 nav-fill"
              id="pills-tab-1"
              role="tablist"
            >
              <Nav.Item as="li">
                <Nav.Link eventKey="first" role="tab">
                  Personal Details
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="second" role="tab">
                  Other Details
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="tab-content" id="pills-tabContent-1">
              <Tab.Pane eventKey="first" role="tabpanel">
                <Form>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={members.first_name}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="text"
                          value={members.dob}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={members.email_id}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control
                          type="text"
                          value={members.street_address}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          value={members.city}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          value={members.country}
                          disabled
                        />
                      </Form.Group>
                      {/* <Form.Group>
                                            <Form.Label>Member Category</Form.Label>
                                            <Form.Control type="text" value={members.membership_Category} disabled />
                                        </Form.Group> */}
                    </div>
                    <div className="col-md-6">
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={members.last_name}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                          type="text"
                          value={members.gender}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Contact No</Form.Label>
                        <Form.Control
                          type="text"
                          value={members.contact_no}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          value={members.state}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control
                          type="text"
                          value={members.zip_code}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Membership Plan</Form.Label>
                        <Form.Control
                          type="text"
                          value={members.membership_plan}
                          disabled
                        />
                      </Form.Group>
                    </div>
                  </div>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="second" role="tabpanel">
                <Form>
                  <Form.Group>
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={members.company_name}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Company Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={members.company_title}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Company Email</Form.Label>
                    <Form.Control
                      type="text"
                      value={members.company_email}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Company Website</Form.Label>
                    <Form.Control
                      type="text"
                      value={members.company_website}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Company LinkedIn URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={members.company_linkedIn_url}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Membership Plan</Form.Label>
                    <Form.Control
                      type="text"
                      value={members.membership_plan}
                      disabled
                    />
                  </Form.Group>
                  {/* <Form.Group>
                                            <Form.Label>Member Category</Form.Label>
                                            <Form.Control type="text" value={members.membership_Category} disabled />
                                        </Form.Group> */}
                  {/* Include other company details form fields */}
                  {/* ... */}
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeviewProfileForm}
            style={{ backgroundColor: "#6c757d", border: "none" }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            // onClick={validateAndSubmitReferral}
            style={{ backgroundColor: "#007BFF", border: "none" }}
          >
            Accepted
          </Button>
          <Button
            variant="primary"
            // onClick={validateAndSubmitReferral}
            style={{ backgroundColor: "#007BFF", border: "none" }}
          >
            Rejected
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MembersList;
