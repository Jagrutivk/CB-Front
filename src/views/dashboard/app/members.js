import React, { useState, useEffect } from "react";
import FriendProfile from "./user-profile-edit";
import axios from "axios";
import "./customcss/admintabstyle.css";
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
import { Link, useNavigate } from "react-router-dom";
import user5 from "../../../assets/images/user/01.jpg";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaTrash, FaEdit, FaEye, faPowerOff } from "react-icons/fa";

//image
import img1 from "../../../assets/images/user/11.png";

const Members = () => {
  const navigate = useNavigate();
  // Assuming 'members' is the state for storing the list of members
  const [members, setMembers] = useState([]);
  const [deactivatedMembers, setDeactivatedMembers] = useState([]);
  const [deletedMembers, setDeletedMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("first");
  const [showviewProfileForm, setShowviewProfileForm] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showdelete, setShowdelete] = useState(false);
  const handleClosedelete = () => setShowdelete(false);
  const handleShowdelete = () => setShowdelete(true);
  const token = localStorage.getItem("token");
  const [selectedRequest, setselectedRequest] = useState(null);
  const [successMessages, setSuccessMessages] = useState([]);
  const [error, setError] = useState(null); // State to manage errors

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token"); // assuming your token key is 'token'
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/members/members",
        {
          headers: {
            Authorization: `Bearer ${token}`, // including the token in the headers
          },
        }
      );
      setMembers(response.data.requests); // Assuming 'requests' is the array in your response

      // Filter members based on 'is_active' and 'is_delete' properties
      const deactivatedMembersList = response.data.requests.filter(
        (member) => !member.is_active === true
      );
      const deletedMembersList = response.data.requests.filter(
        (member) => !member.is_delete === true
      );
      // membershipRequests => membershipRequests.membership_status === 'Rejected'
      setDeactivatedMembers(deactivatedMembersList);
      setDeletedMembers(deletedMembersList);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  // for view profile
  const openviewProfileForm = (memberidd) => {
    console.log("selected member id", memberidd);
    // if (member && member.member_id) {
    navigate("/dashboard/app/fprofile", { state: memberidd });
    //}
  };

  // for Edit form show

  const openeditProfileForm = (request) => {
    console.log(">>>", request);
    setselectedRequest(request);
    setShowviewProfileForm(true);
  };
  const closeviewProfileForm = () => {
    setShowviewProfileForm(false);
  };
  //for show the message
  const handleSuccess = (message) => {
    setSuccessMessages([...successMessages, message]);
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    // Fetch members when the component mounts
    fetchMembers();
  }, []);

  //for toggle the expand row
  const toggleExpandRow = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };
  const handleSelect = (key) => {
    setActiveTab(key);
  };
  //for delete fuctionality
  const handleDelete = (member_req_id) => {
    fetch(
      process.env.REACT_APP_API_URL + `/membershipRequest/membership-requests/${member_req_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
          //
        }
        setShowdelete(false);
        handleSuccess("Record is deleted "); // Handle success or display a success message
      })
      .catch((error) => setError("An error occurred while deleteing the data"));
  };
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            {/* ----multitab code---  */}
            <Col lg="12">
              <Card>
                <Card.Body className="p-2">
                  <Tab.Container activeKey={activeTab} onSelect={handleSelect}>
                    <div className="user-tabing p-3">
                      <div className="flex-wrap align-items-center justify-content-between">
                        <div className=" align-items-center text-center profile-forum-items p-0 m-0 w-75">
                          <Nav variant="pills">
                            <Col sm={4} className=" p-3">
                              <Nav.Item>
                                <Nav.Link eventKey="first" role="button">
                                  Members
                                </Nav.Link>
                              </Nav.Item>
                            </Col>

                            <Col sm={4} className=" p-3">
                              <Nav.Item>
                                <Nav.Link eventKey="second" role="button">
                                  Deactive Members
                                </Nav.Link>
                              </Nav.Item>
                            </Col>

                            <Col sm={4} className=" p-3">
                              <Nav.Item>
                                <Nav.Link eventKey="third" role="button">
                                  Deleted Members
                                </Nav.Link>
                              </Nav.Item>
                            </Col>
                          </Nav>
                        </div>

                        <Tab.Content>
                          <Tab.Pane eventKey="first">
                            {/* -----1 all members  code---  */}
                            <Col lg={12}>
                              <Card>
                                <Card.Body className="p-0">
                                  <Table
                                    responsive
                                    className="forum-table mb-0 rounded"
                                  >
                                    <thead className="bg-primary text-white">
                                      <tr>
                                        <th>
                                          <b> Profile Pic</b>
                                        </th>
                                        <th>
                                          <b> Name</b>
                                        </th>
                                        <th>
                                          <b>Email</b>
                                        </th>
                                        <th>
                                          <b> Status</b>
                                        </th>
                                        <th>
                                          <b> Action</b>
                                        </th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {members.map((member, index) => (
                                        <React.Fragment key={index}>
                                          <tr>
                                            <td className="col-lg-2">
                                              <img
                                                src={user5}
                                                alt="story-img"
                                                className="rounded-circle avatar-40"
                                              />
                                            </td>
                                            <td className="col-lg-3">
                                              <b>
                                                {" "}
                                                {member.first_name}{" "}
                                                {member.last_name}
                                              </b>
                                            </td>
                                            <td className="col-lg-2">
                                              <b> {member.email_id}</b>
                                            </td>

                                            <td className="col-lg-2">
                                              <b>{member.member_category}</b>
                                            </td>
                                            <td className="col-lg-2">
                                              <FaEye
                                                size={15}
                                                onClick={() =>
                                                  openviewProfileForm(
                                                    member.member_id
                                                  )
                                                }
                                              />
                                              &nbsp;&nbsp;
                                              <FaEdit
                                                className="editicon"
                                                onClick={() =>
                                                  openeditProfileForm(member)
                                                }
                                              />
                                              &nbsp;&nbsp;
                                              {/* <faPowerOff
                                                size={15}
                                                onClick={openviewProfileForm}
                                              /> */}
                                              <FaTrash
                                                className="deleteicon"
                                                onClick={() =>
                                                  handleDelete(member.member_id)
                                                }
                                              />
                                              {/* Delete Model */}
                                              <Modal
                                                centered
                                                show={showdelete}
                                                onHide={handleClosedelete}
                                              >
                                                <Modal.Header closeButton>
                                                  <Modal.Title>
                                                    Delete Row
                                                  </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                  Are you sure you want to
                                                  delete this row?
                                                </Modal.Body>
                                                <Modal.Footer>
                                                  <Button
                                                    variant="secondary"
                                                    onClick={handleClosedelete}
                                                  >
                                                    Close
                                                  </Button>
                                                  <Button
                                                    variant="primary"
                                                    onClick={handleClosedelete}
                                                  >
                                                    Save Changes
                                                  </Button>
                                                </Modal.Footer>
                                              </Modal>
                                              &nbsp;&nbsp;
                                              {expandedRow === index ? (
                                                <FiChevronUp
                                                  size={30}
                                                  onClick={() =>
                                                    toggleExpandRow(index)
                                                  }
                                                />
                                              ) : (
                                                <FiChevronDown
                                                  size={30}
                                                  onClick={() =>
                                                    toggleExpandRow(index)
                                                  }
                                                />
                                              )}
                                            </td>
                                          </tr>

                                          {expandedRow === index && (
                                            <tr className="expanded-row">
                                              <td colSpan="6">
                                                <div className="row">
                                                  <div className="col-lg-6">
                                                    <p>
                                                      <b>
                                                        Contact No:{" "}
                                                        {member.contact_no}
                                                      </b>{" "}
                                                    </p>
                                                    <p>
                                                      <b>
                                                        {" "}
                                                        City: {member.city}
                                                      </b>
                                                    </p>
                                                  </div>
                                                  <div className="col-lg-6">
                                                    <p>
                                                      <b>
                                                        State: {member.State}
                                                      </b>
                                                    </p>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          )}
                                        </React.Fragment>
                                      ))}
                                    </tbody>
                                  </Table>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Tab.Pane>

                          <Tab.Pane eventKey="second">
                            {/* ---2 deactived member code--  */}
                            <Col lg={12}>
                              <Card>
                                <Card.Body className="p-0">
                                  <Table
                                    responsive
                                    className="forum-table mb-0 rounded"
                                    eventKey="second"
                                  >
                                    <thead
                                      className="bg-primary text-white"
                                      eventKey="second"
                                    >
                                      <tr>
                                        <th>
                                          <b> Profile Pic</b>
                                        </th>
                                        <th>
                                          <b> Name</b>
                                        </th>
                                        <th>
                                          <b>Email</b>
                                        </th>
                                        <th>
                                          <b> Status</b>
                                        </th>
                                        <th>
                                          <b> Actions</b>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {deactivatedMembers.map(
                                        (member, index) => (
                                          <React.Fragment key={index}>
                                            <tr>
                                              <td className="col-lg-2">
                                                <img
                                                  src={user5}
                                                  alt="story-img"
                                                  className="rounded-circle avatar-40"
                                                />
                                              </td>
                                              <td className="col-lg-3">
                                                <b>
                                                  {" "}
                                                  {
                                                    deactivatedMembers.first_name
                                                  }{" "}
                                                  {member.last_name}
                                                </b>
                                              </td>
                                              <td className="col-lg-2">
                                                <b>
                                                  {" "}
                                                  {deactivatedMembers.email_id}
                                                </b>
                                              </td>

                                              <td className="col-lg-2">
                                                <b>
                                                  {
                                                    deactivatedMembers.member_category
                                                  }
                                                </b>
                                              </td>
                                              <td className="col-lg-2">
                                                <FaEye
                                                  size={15}
                                                  onClick={() =>
                                                    openviewProfileForm(
                                                      member.member_id
                                                    )
                                                  }
                                                />
                                                &nbsp;&nbsp;
                                                <FaTrash
                                                  className="deleteicon"
                                                  onClick={handleShowdelete}
                                                />
                                                {/* Delete Model */}
                                                <Modal
                                                  centered
                                                  show={showdelete}
                                                  onHide={handleClosedelete}
                                                >
                                                  <Modal.Header closeButton>
                                                    <Modal.Title>
                                                      Delete Row
                                                    </Modal.Title>
                                                  </Modal.Header>
                                                  <Modal.Body>
                                                    Are you sure you want to
                                                    delete this row?
                                                  </Modal.Body>
                                                  <Modal.Footer>
                                                    <Button
                                                      variant="secondary"
                                                      onClick={
                                                        handleClosedelete
                                                      }
                                                    >
                                                      Close
                                                    </Button>
                                                    <Button
                                                      variant="primary"
                                                      onClick={
                                                        handleClosedelete
                                                      }
                                                    >
                                                      Save Changes
                                                    </Button>
                                                  </Modal.Footer>
                                                </Modal>
                                                &nbsp;&nbsp;
                                                {expandedRow === index ? (
                                                  <FiChevronUp
                                                    size={30}
                                                    onClick={() =>
                                                      toggleExpandRow(index)
                                                    }
                                                  />
                                                ) : (
                                                  <FiChevronDown
                                                    size={30}
                                                    onClick={() =>
                                                      toggleExpandRow(index)
                                                    }
                                                  />
                                                )}
                                              </td>
                                            </tr>

                                            {expandedRow === index && (
                                              <tr className="expanded-row">
                                                <td colSpan="5">
                                                  <div className="row">
                                                    <div className="row">
                                                      <div className="col-lg-6">
                                                        <p>
                                                          <b>
                                                            Contact No:{" "}
                                                            {
                                                              deactivatedMembers.contact_no
                                                            }
                                                          </b>{" "}
                                                        </p>
                                                        <p>
                                                          <b>
                                                            {" "}
                                                            City:{" "}
                                                            {
                                                              deactivatedMembers.city
                                                            }
                                                          </b>
                                                        </p>
                                                      </div>
                                                      <div className="col-lg-6">
                                                        <p>
                                                          <b>
                                                            state:{" "}
                                                            {
                                                              deactivatedMembers.state
                                                            }
                                                          </b>
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </td>
                                              </tr>
                                            )}
                                          </React.Fragment>
                                        )
                                      )}
                                    </tbody>
                                  </Table>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Tab.Pane>

                          <Tab.Pane eventKey="third">
                            {/* --------3 deleted members code---  */}
                            <Col lg={12}>
                              <Card>
                                <Card.Body className="p-0">
                                  <Table
                                    responsive
                                    className="forum-table mb-0 rounded"
                                  >
                                    <thead className="bg-primary text-white">
                                      <tr>
                                        <th>
                                          <b> Profile Pic</b>
                                        </th>
                                        <th>
                                          <b> Name</b>
                                        </th>
                                        <th>
                                          <b>Email</b>
                                        </th>
                                        <th>
                                          <b> Status</b>
                                        </th>
                                        <th>
                                          <b> Actions</b>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {deletedMembers.map((member, index) => (
                                        <React.Fragment key={index}>
                                          <tr>
                                            <td className="col-lg-2">
                                              <img
                                                src={user5}
                                                alt="story-img"
                                                className="rounded-circle avatar-40"
                                              />
                                            </td>
                                            <td className="col-lg-3">
                                              <b>
                                                {" "}
                                                {deletedMembers.first_name}{" "}
                                                {deletedMembers.last_name}
                                              </b>
                                            </td>
                                            <td className="col-lg-2">
                                              <b>{deletedMembers.email_id}</b>
                                            </td>

                                            <td className="col-lg-2">
                                              <b>
                                                {deletedMembers.member_category}
                                              </b>
                                            </td>
                                            <td className="col-lg-2">
                                              <FaEye
                                                size={15}
                                                onClick={() =>
                                                  openviewProfileForm(
                                                    member.member_id
                                                  )
                                                }
                                              />
                                              &nbsp;&nbsp;
                                              {/* <faPowerOff /> */}
                                              {expandedRow === index ? (
                                                <FiChevronUp
                                                  size={30}
                                                  onClick={() =>
                                                    toggleExpandRow(index)
                                                  }
                                                />
                                              ) : (
                                                <FiChevronDown
                                                  size={30}
                                                  onClick={() =>
                                                    toggleExpandRow(index)
                                                  }
                                                />
                                              )}
                                            </td>
                                          </tr>

                                          {expandedRow === index && (
                                            <tr className="expanded-row">
                                              <td colSpan="5">
                                                <div className="row">
                                                  <div className="row">
                                                    <div className="col-lg-6">
                                                      <p>
                                                        <b>
                                                          Contact No:{" "}
                                                          {
                                                            deletedMembers.contact_no
                                                          }
                                                        </b>{" "}
                                                      </p>
                                                      <p>
                                                        <b>
                                                          {" "}
                                                          City:{" "}
                                                          {deletedMembers.city}
                                                        </b>
                                                      </p>
                                                    </div>
                                                    <div className="col-lg-6">
                                                      <p>
                                                        <b>
                                                          {" "}
                                                          State:{" "}
                                                          {deletedMembers.state}
                                                        </b>
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          )}
                                        </React.Fragment>
                                      ))}
                                    </tbody>
                                  </Table>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Tab.Pane>
                        </Tab.Content>
                      </div>
                    </div>
                  </Tab.Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal
        size="lg"
        scrollable={true}
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
            <Row>
              <Col lg="12">
                <Card>
                  <Card.Body className="p-0">
                    <div>
                      <Nav
                        as="ul"
                        variant="pills"
                        className="iq-edit-profile row"
                      >
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
                      <Card.Header className="d-flex justify-content-between"></Card.Header>
                      <Card.Body>
                        {selectedRequest && (
                          <Form>
                            <Form.Group className="form-group align-items-center">
                              <Col md="12">
                                <div className="profile-img-edit">
                                  <img
                                    className="profile-pic"
                                    src={img1}
                                    alt="profile-pic"
                                  />
                                  <div className="p-image">
                                    <i className="ri-pencil-line upload-button text-white"></i>
                                    <input
                                      className="file-upload"
                                      type="file"
                                      accept="image/*"
                                    />
                                  </div>
                                </div>
                              </Col>
                            </Form.Group>
                            <Row className="align-items-center">
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label
                                  htmlFor="fname"
                                  className="form-label"
                                >
                                  First Name:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  value={selectedRequest.first_name}
                                  id="fname"
                                  placeholder="Enter your first name"
                                  // onChange={(e) => handleMemberDataChange('first_name', e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label
                                  htmlFor="lname"
                                  className="form-label"
                                >
                                  Last Name:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  value={selectedRequest.last_name}
                                  id="lname"
                                  placeholder="Enter your last name"
                                  // onChange={(e) => handleMemberDataChange('last_name', e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label d-block">
                                  Gender:
                                </Form.Label>
                                <Form.Check className="form-check form-check-inline">
                                  <Form.Check.Input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio10"
                                    value="Male"
                                    checked={selectedRequest.gender === "Male"}
                                    // onChange={(e) => handleMemberDataChange('gender', e.target.value)}
                                  />
                                  <Form.Check.Label
                                    className="form-check-label"
                                    htmlFor="inlineRadio10"
                                  >
                                    Male
                                  </Form.Check.Label>
                                </Form.Check>
                                <Form.Check className="form-check form-check-inline">
                                  <Form.Check.Input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio11"
                                    value="Female"
                                    checked={
                                      selectedRequest.gender === "Female"
                                    }
                                    // onChange={(e) => handleMemberDataChange('gender', e.target.value)}
                                  />
                                  <Form.Check.Label
                                    className="form-check-label"
                                    htmlFor="inlineRadio11"
                                  >
                                    Female
                                  </Form.Check.Label>
                                </Form.Check>
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label
                                  htmlFor="dob"
                                  className="form-label"
                                >
                                  Date Of Birth:
                                </Form.Label>
                                <Form.Control
                                  type="date"
                                  className="form-control"
                                  id="dob"
                                  value={selectedRequest.dob}
                                  placeholder="Enter Date of Birth..."
                                  //  onChange={(e) => handleMemberDataChange('dob', e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label
                                  htmlFor="dob"
                                  className="form-label"
                                >
                                  Email Id:
                                </Form.Label>
                                <Form.Control
                                  type="email"
                                  className="form-control"
                                  id="age"
                                  value={selectedRequest.email_id}
                                  placeholder="Enter email"
                                  // onChange={(e) => handleMemberDataChange('email_id', e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  Contact No.:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  id="age"
                                  value={selectedRequest.contact_no}
                                  placeholder="Enter Contact No"
                                  // onChange={(e) => handleMemberDataChange('contact_no', e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  Country:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  id="age"
                                  value={selectedRequest.country}
                                  placeholder="Enter Country"
                                  // onChange={(e) => handleMemberDataChange('country', e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  State:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  id="age"
                                  value={selectedRequest.state}
                                  placeholder="Enter State"
                                  // onChange={(e) => handleMemberDataChange('state', e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  City:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  id="age"
                                  value={selectedRequest.city}
                                  placeholder="Enter City"
                                  // onChange={(e) => handleMemberDataChange('city', e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  Zip Code:
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  className="form-control"
                                  id="age"
                                  value={selectedRequest.zip_code}
                                  placeholder="Enter Zip Code"
                                  //  onChange={(e) => handleMemberDataChange('zip_code', e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-12">
                                <Form.Label className="form-label">
                                  Address:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  id="age"
                                  value={selectedRequest.street_address}
                                  placeholder="Enter Address"
                                  //  onChange={(e) => handleMemberDataChange('street_address', e.target.value)}
                                />
                              </Form.Group>
                            </Row>
                            {/* <Button type="submit" onClick={updateMemberData(memberData)} className="btn btn-primary me-2">Submit</Button>
                            <Button type="reset" className="btn bg-soft-danger">Cancel</Button> */}
                          </Form>
                        )}
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second" className="fade show">
                    <Card>
                      <Card.Header className="d-flex justify-content-between"></Card.Header>
                      <Card.Body>
                        {selectedRequest && (
                          <Form>
                            <Form.Group className="form-group align-items-center">
                              <Col md="12">
                                <div className="profile-img-edit">
                                  <img
                                    className="profile-pic"
                                    src={img1}
                                    alt="profile-pic"
                                  />
                                  <div className="p-image">
                                    <i className="ri-pencil-line upload-button text-white"></i>
                                    <input
                                      className="file-upload"
                                      type="file"
                                      accept="image/*"
                                    />
                                  </div>
                                </div>
                              </Col>
                            </Form.Group>
                            <Row className="align-items-center">
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label
                                  htmlFor="fname"
                                  className="form-label"
                                >
                                  Company Name:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  value={selectedRequest.company_name}
                                  id="fname"
                                  placeholder="Enter Company Name"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label
                                  htmlFor="lname"
                                  className="form-label"
                                >
                                  Company Title:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  value={selectedRequest.company_title}
                                  id="lname"
                                  placeholder="Enter Company Title"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label
                                  htmlFor="dob"
                                  className="form-label"
                                >
                                  Company LinkedIn URL:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  value={selectedRequest.company_linkedIn_url}
                                  id="dob"
                                  placeholder="Enter LinkedIn URL"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label
                                  htmlFor="dob"
                                  className="form-label"
                                >
                                  Company Email:
                                </Form.Label>
                                <Form.Control
                                  type="email"
                                  className="form-control"
                                  value={selectedRequest.company_email}
                                  id="age"
                                  placeholder="Enter Email"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  Company Website:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  value={selectedRequest.company_website}
                                  id="age"
                                  placeholder="Enter Website"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  Company Size:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  value={selectedRequest.company_size}
                                  id="age"
                                  placeholder="Enter Company Size"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  Company Contact No.:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  value={selectedRequest.company_contact_no}
                                  id="age"
                                  placeholder="Enter Contact No"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  Company Country:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  value={selectedRequest.country}
                                  id="age"
                                  placeholder="Enter Country"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  Company State:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  value={selectedRequest.state}
                                  id="age"
                                  placeholder="Enter State"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  Company City:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  value={selectedRequest.city}
                                  id="age"
                                  placeholder="Enter City"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  Company Zip Code:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  value={selectedRequest.zip_code}
                                  id="age"
                                  placeholder="Enter Zip Code"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-12">
                                <Form.Label className="form-label">
                                  Company Address:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  value={selectedRequest.street_address}
                                  id="age"
                                  placeholder="Enter Address"
                                />
                              </Form.Group>
                            </Row>

                            {/* <Button type="submit" onClick={updateMemberData(memberData)} className="btn btn-primary me-2">Submit</Button>
                            <Button type="reset" className="btn bg-soft-danger">Cancel</Button> */}
                          </Form>
                        )}
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third" className="fade show">
                    <Card>
                      <Card.Header className="d-flex justify-content-between"></Card.Header>
                      <Card.Body>
                        {selectedRequest && (
                          <Form>
                            <Row className="align-items-center">
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  Membership Plan:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  id="age"
                                  value={selectedRequest.membership_plan}
                                  placeholder="Enter Country"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  Member Ctegory:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  id="age"
                                  value={selectedRequest.member_category}
                                  placeholder="Enter State"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  Member Type:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  id="age"
                                  value={selectedRequest.member_type}
                                  placeholder="Enter City"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  Chapter Name:
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  className="form-control"
                                  id="age"
                                  value={selectedRequest.chapter_name}
                                  placeholder="Chapter Name"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label
                                  htmlFor="cno"
                                  className="form-label"
                                >
                                  Membership Start Date:
                                </Form.Label>
                                <Form.Control
                                  type="date"
                                  className="form-control"
                                  value={selectedRequest.membership_start_date}
                                  id="cno"
                                  placeholder="Enter membership Start date"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label
                                  htmlFor="email"
                                  className="form-label"
                                >
                                  Membership End Date:
                                </Form.Label>
                                <Form.Control
                                  type="date"
                                  className="form-control"
                                  value={selectedRequest.membership_end_date}
                                  id="email"
                                  placeholder="Enter membership End date"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label
                                  htmlFor="url"
                                  className="form-label"
                                >
                                  Membership Renewal Date:
                                </Form.Label>
                                <Form.Control
                                  type="date"
                                  className="form-control"
                                  value={
                                    selectedRequest.membership_renewal_date
                                  }
                                  id="url"
                                  placeholder="Enter membership Renewal date"
                                />
                              </Form.Group>
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label d-block">
                                  Active Status:
                                </Form.Label>
                                <Form.Check className="form-check form-check-inline">
                                  <Form.Check.Input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio10"
                                    value="Active"
                                    checked={selectedRequest.is_active === 1} // Check if is_active is 1 for Active status
                                    // onChange={(e) => selectedRequest({ ...memberData, is_active: 1 })}
                                  />
                                  <Form.Check.Label
                                    className="form-check-label"
                                    htmlFor="inlineRadio10"
                                  >
                                    {" "}
                                    Active
                                  </Form.Check.Label>
                                </Form.Check>
                                <Form.Check className="form-check form-check-inline">
                                  <Form.Check.Input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio11"
                                    value="Deactive"
                                    checked={selectedRequest.is_active === 0} // Check if is_active is 0 for Deactive status
                                    // onChange={(e) => selectedRequest({ ...memberData, is_active: 0 })}
                                  />
                                  <Form.Check.Label
                                    className="form-check-label"
                                    htmlFor="inlineRadio11"
                                  >
                                    Deactive
                                  </Form.Check.Label>
                                </Form.Check>
                              </Form.Group>
                            </Row>
                            {/* <Button type="submit" onClick={updateMemberData(memberData)} className="btn btn-primary me-2">Submit</Button>
                            <Button type="reset" className="btn bg-danger">Cancel</Button> */}
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
            style={{ backgroundColor: "#007BFF", border: "none" }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
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
  );
};

export default Members;
