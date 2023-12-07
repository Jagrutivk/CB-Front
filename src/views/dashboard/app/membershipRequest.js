import React, { useState, useEffect } from "react";
import img1 from "../../../assets/images/user/11.png";
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
import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";

//image
import user5 from "../../../assets/images/user/01.jpg";

const MembershipRequest = () => {
  const [membershipRequests, setMembershipRequests] = useState([]);
  const [deactivatedMembers, setDeactivatedMembers] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);
  const [error, setError] = useState(null); // State to manage errors
  const [showViewProfileForm, setShowViewProfileForm] = useState(false); // State for controlling the visibility of the modal
  const closeViewProfileForm = () => setShowViewProfileForm(false);
  const [selectedRequest, setselectedRequest] = useState(null); // State for controlling the visibility of the modal
  const [expandedRow, setExpandedRow] = useState(null);
  const [showdelete, setShowdelete] = useState(false);
  const handleClosedelete = () => setShowdelete(false);
  const handleShowdelete = () => setShowdelete(true);
  const [showedit, setShowedit] = useState(false);
  const handleCloseedit = () => setShowedit(false);
  const handleShowedit = () => setShowedit(true);
  const [activeTab, setActiveTab] = useState("first");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [isRejectedTab, setIsRejectedTab] = useState(true);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");
  const member_id = localStorage.getItem("member_id");
  const openCommentForm = () => {
    setShowCommentForm(true);
    setShowViewProfileForm(false);
  };
  const closeCommentForm = () => {
    setShowCommentForm(false);
  };
  const openViewProfileForm = (request) => {
    console.log(">>>", request);
    setselectedRequest(request);
    setShowViewProfileForm(true);
    setIsRejectedTab(true);
  };
  const openRejectViewProfileForm = (request) => {
    console.log(">>>", request);
    setselectedRequest(request);
    setShowViewProfileForm(true);
    setIsRejectedTab(false);
  };
  // Function to handle comment submission

  const submitComment = (member_req_id, comment) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // Construct the payload object with the review_comment property
    const payload = {
      comment: comment,
    };

    axios
      .put(
        process.env.REACT_APP_API_URL +`/membershipRequest/membership-requests/${member_req_id}`,
        payload,
        config
      )
      .then((response) => {
        console.log("Comment submitted successfully:", response.data);
        setComment("");
        // Close the comment modal after successful submission
        handleSuccess("Comment submitted successfully And Request is rejected");
        closeCommentForm();

        // Remove the rejected record from membershipRequests and add it to deactivatedMembers
        const updatedMembershipRequests = membershipRequests.filter(
          (request) => request.member_req_id !== member_req_id
        );
        const rejectedRecord = membershipRequests.find(
          (request) => request.member_req_id === member_req_id
        );
        setMembershipRequests(updatedMembershipRequests);
        setDeactivatedMembers([...deactivatedMembers, rejectedRecord]);
      })
      .catch((error) => {
        console.error("An error occurred while submitting the comment:", error);
        setError(
          "An error occurred while submitting the comment. Please try again later."
        );
        // Handle the error as needed
      });
  };

  const handleAccept = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = {
      // Include the data you want to send to the server
      // Assuming selectedRequest contains the necessary data
      // Replace the properties according to your data structure
      users_id: member_id,
      member_req_id: selectedRequest.member_req_id,
      first_name: selectedRequest.first_name,
      last_name: selectedRequest.last_name,
      dob: selectedRequest.dob,
      gender: selectedRequest.gender,
      email_id: selectedRequest.email_id,
      contact_no: selectedRequest.contact_no,
      street_address: selectedRequest.street_address,
      city: selectedRequest.city,
      state: selectedRequest.state,
      country: selectedRequest.country,
      zip_code: selectedRequest.zip_code,
      member_type: selectedRequest.member_type,
      company_name: selectedRequest.company_name,
      company_title: selectedRequest.company_title,
      company_email: selectedRequest.company_email,
      company_contact_no: selectedRequest.company_contact_no,
      company_website: selectedRequest.company_website,
      company_linkedIn_url: selectedRequest.company_linkedIn_url,
      company_address: selectedRequest.company_address,
      company_city: selectedRequest.company_city,
      company_state: selectedRequest.company_state,
      company_country: selectedRequest.company_country,
      company_zip_code: selectedRequest.company_zip_code,
      member_category: selectedRequest.member_category,
      chapter_to_join: selectedRequest.chapter_to_join,
      membership_status: 'Accepted',
      role_id: 2,
      review_comment: selectedRequest.review_comment,
      is_delete: 0,
      membership_plan: selectedRequest.membership_plan,
    };

    axios
      .post(process.env.REACT_APP_API_URL +"/members/members", data, config)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        setShowViewProfileForm(false);
        handleSuccess("Data saved successfully And Request is accepted");

        // Add any necessary actions on successful save
      })
      .catch((error) => {
        console.error("An error occurred while saving the data:", error);
        setError("An error occurred while saving the data");
        // Handle the error as needed
      });
  };

  const handleSuccess = (message) => {
    setSuccessMessages([...successMessages, message]);
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace 'YOUR_TOKEN_HERE' with your actual token

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(
        process.env.REACT_APP_API_URL +"/membershipRequest/membership-requests",
        config
      )
      .then((response) => {
        // Filter out the pending and accepted membership status requests
        const pendingAndAcceptedRequests = response.data.requests.filter(
          (membershipRequests) =>
            membershipRequests.membership_status !== "Rejected"
        );

        // Filter out the rejected membership status requests
        const deactivatedMembersList = response.data.requests.filter(
          (membershipRequests) =>
            membershipRequests.membership_status === "Rejected"
        );

        // Update the states accordingly
        setMembershipRequests(pendingAndAcceptedRequests);
        setDeactivatedMembers(deactivatedMembersList);
      })
      .catch((error) => {
        console.error("Error fetching membership requests: ", error);
      });
  }, []);

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

  const handleDelete = (member_req_id) => {
    fetch(
      process.env.REACT_APP_API_URL +`/membershipRequest/membership-requests/${member_req_id}`,
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
                      <div className=" flex-wrap align-items-center justify-content-between">
                        <div className=" align-items-center text-center profile-forum-items p-0 m-0 w-75">
                          <Nav variant="pills">
                            <Col lg={6} className=" p-3">
                              <Nav.Item>
                                <Nav.Link eventKey="first" role="button">
                                  Membership Requests
                                </Nav.Link>
                              </Nav.Item>
                            </Col>

                            <Col lg={6} className=" p-3">
                              <Nav.Item>
                                <Nav.Link eventKey="second" role="button">
                                  Rejected Request
                                </Nav.Link>
                              </Nav.Item>
                            </Col>
                          </Nav>
                        </div>

                        <Tab.Content>
                          <Tab.Pane eventKey="first" className="fade show">
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
                                      {membershipRequests.map(
                                        (request, index) => (
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
                                                  {request.first_name}{" "}
                                                  {request.last_name}{" "}
                                                </b>
                                              </td>
                                              <td className="col-lg-2">
                                                <b> {request.email_id} </b>
                                              </td>
                                              <td className="col-lg-2">
                                                <b>
                                                  {" "}
                                                  {request.membership_status ===
                                                    "Accepted"
                                                    ? "Accepted"
                                                    : request.membership_status ===
                                                      "Rejected"
                                                      ? "Rejected"
                                                      : "Pending"}
                                                </b>
                                              </td>
                                              <td className="col-lg-2">
                                                <FaEye
                                                  size={15}
                                                  onClick={() =>
                                                    openViewProfileForm(request)
                                                  }
                                                />
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
                                                          {request.contact_no}
                                                        </b>{" "}
                                                      </p>
                                                      <p>
                                                        <b>
                                                          {" "}
                                                          City: {request.city}
                                                        </b>
                                                      </p>
                                                    </div>
                                                    <div className="col-lg-6">
                                                      <p>
                                                        <b>
                                                          Category:{" "}
                                                          {
                                                            request.member_category
                                                          }
                                                        </b>
                                                      </p>
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

                          <Tab.Pane eventKey="second" className="fade show">
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
                                      {deactivatedMembers.map(
                                        (request, index) => (
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
                                                {request.first_name}{" "}
                                                {request.last_name}
                                              </td>
                                              <td className="col-lg-2">
                                                {request.email_id}
                                              </td>
                                              <td className="col-lg-2">
                                                {" "}
                                                {request.membership_status ===
                                                  "Accepted"
                                                  ? "Accepted"
                                                  : request.membership_status ===
                                                    "Rejected"
                                                    ? "Rejected"
                                                    : "Pending"}
                                              </td>
                                              <td className="col-lg-2">
                                                <FaEye
                                                  size={15}
                                                  onClick={() =>
                                                    openRejectViewProfileForm(request)
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
                                                      onClick={() =>
                                                        handleDelete(
                                                          selectedRequest.member_req_id
                                                        )
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
                                                <td colSpan="6">
                                                  <div className="row">
                                                    <div className="col-lg-6">
                                                      <p>
                                                        <b>
                                                          Contact No:{" "}
                                                          {request.contact_no}
                                                        </b>{" "}
                                                      </p>
                                                      <p>
                                                        <b>
                                                          {" "}
                                                          City: {request.city}
                                                        </b>
                                                      </p>
                                                    </div>
                                                    <div className="col-lg-6">
                                                      <p>
                                                        <b>
                                                          Category:{" "}
                                                          {
                                                            request.member_category
                                                          }
                                                        </b>
                                                      </p>
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
      {/* Modal form for show the profie for reject list  */}

      {/* Modal form for show the profie */}
      <Modal
        size="lg"
        scrollable={true}
        show={showViewProfileForm}
        onHide={closeViewProfileForm}
        style={{ marginTop: "60px", height: "700px" }}
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
                              {/* <Form.Group className="form-group col-sm-6">
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
                                    checked={selectedRequest.gender === "Female"}
                                  />
                                  <Form.Check.Label
                                    className="form-check-label"
                                    htmlFor="inlineRadio11"
                                  >
                                    Female
                                  </Form.Check.Label>
                                </Form.Check>
                              </Form.Group> */}
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
                                  value={selectedRequest?.dob ? selectedRequest.dob.split('T')[0] : ''}
                                  placeholder="Enter Date of Birth..."
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
                              {/* <Form.Group className="form-group col-sm-6">
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
                              </Form.Group> */}
                              {/* <Form.Group className="form-group col-sm-6">
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
                              </Form.Group> */}
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
                                  placeholder="Enter membership plan"
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
                                  placeholder="Enter member category"
                                />
                              </Form.Group>
                              {/* <Form.Group className="form-group col-sm-6">
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
                              </Form.Group> */}
                              <Form.Group className="form-group col-sm-6">
                                <Form.Label className="form-label">
                                  Chapter Name:
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="form-control"
                                  value={selectedRequest.chapter_to_join}
                                  placeholder="Chapter Name"
                                />
                              </Form.Group>
                              {/* <Form.Group className="form-group col-sm-6">
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
                              </Form.Group> */}
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
            onClick={closeViewProfileForm}
            style={{ backgroundColor: "#6c757d", border: "none" }}
          >
            Close
          </Button>
          {isRejectedTab && (
            <Button
              variant="primary"
              onClick={openCommentForm}
              style={{ backgroundColor: "#007BFF", border: "none" }}
            >
              Reject
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleAccept}
            style={{ backgroundColor: "#007BFF", border: "none" }}
          >
            Accept
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ---------comment model code */}
      <Modal
        show={showCommentForm}
        onHide={closeCommentForm}
        style={{ marginTop: "60px" }}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#007BFF", color: "white" }}
        >
          <Modal.Title>Request Rejection Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="row">
              <div className="col-md-12">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeCommentForm}
            style={{ backgroundColor: "#6c757d", border: "none" }}
          >
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              submitComment(selectedRequest.member_req_id, comment)
            }
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

export default MembershipRequest;
