import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Alert,
} from "react-bootstrap";
import ReferralList from "./referralList";

const userId = sessionStorage.getItem("userID");
const userName = sessionStorage.getItem("userName");
console.log("username-->", userName);

const ByMe = () => {
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [memberNames, setMemberNames] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [error, setError] = useState(null);
  const [memberid, setMemberid] = useState([]);

  const [newReferral, setNewReferral] = useState({
    referrer_name: "",
    company_name: "",
    email_id: "",
    contact_no: "",
    referral_desc: "",
    referred_by: `${userId}`,
    referred_to: "",
    ref_status: "Open",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          process.env.REACT_APP_API_URL +"/members/members",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.requests) {
          const memberNamess = response.data.requests.map(
            (member) => member.first_name
          );
          const memberIDs = response.data.requests.map(
            (member) => member.member_id
          );

          setMemberNames(memberNamess);
          setMemberid(memberIDs);
          console.log("------->>>>>", memberid);
          // setNewReferral((prevReferral) => ({
          //   ...prevReferral,
          //   referred_to: memberNames,
          // }));
          //  setMemberId(memberIDs)
          //console.log('list of member names------>>>>', response.data.requests);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchData();
  }, []);

  const handleReferredToChange = (event) => {
    const selectedName = event.target.value;
   // const selectedName = event.target.value;
    console.log("selectedName:", selectedName);
    const selectedIndex = memberNames.indexOf(selectedName);

    if (selectedIndex !== -1) {
      const selectedId = memberid[selectedIndex];

      console.log("selectedID ----->>>>>", selectedId,newReferral);

      setNewReferral((newReferral) => ({
        ...newReferral,
        referred_to: selectedId, // Set the ID in the newReferral state
      }));
      console.log("newReferral ----->>>>>", newReferral);

    } else {
      console.log("Name not found in memberNames array");
    }
  };

  const openReferralForm = () => {
    setShowReferralForm(true);
  };

  const showSuccess = () => {
    setShowSuccessAlert(true);
  };

  const closeSuccess = () => {
    setShowSuccessAlert(false);
  };

  const clearError = () => {
    setError(null);
  };

  const toggleReferralForm = () => {
    setShowReferralForm(!showReferralForm);
  };

  const closeReferralForm = () => {
    setShowReferralForm(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewReferral({
      ...newReferral,
      [name]: value,
    });
  };

  const validateAndSubmitReferral = () => {
    // Validate the form fields
    if (
      newReferral.referred_to === "" ||
      newReferral.referrer_name === "" ||
      newReferral.email_id === "" ||
      newReferral.contact_no === "" ||
      newReferral.company_name === "" 
      // newReferral.referred_by === ""     
    ) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    // Send the referral data to the backend
    const referralToSend = {
      ...newReferral,
      referred_by: `${userId}`,
    };

    fetch(process.env.REACT_APP_API_URL +"/referrals/create-referral", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(referralToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setNewReferral({
          referrer_name: "",
          company_name: "",
          email_id: "",
          contact_no: "",
          referral_desc: "",
          referred_by: `${userName}`,
          referred_to: "",
          ref_status: "Open",
        });

        setShowReferralForm(false);
        showSuccess();
      })
      .catch((error) => {
        console.error("Error sending referral:", error);
        setError("An error occurred while sending the referral. Please try again later.");
      });
  };

  return (
    <div id="content-page" className="content-page">
      <Container>
        <Row>
          <Col lg={12}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title"><b>
                    {showReferralForm ? "Send a Referral" : "List of Referrals Sent"}
                    </b>
                  </h4>
                </div>
                <div className="d-flex flex-column flex-lg-row justify-content-end">
                  {showReferralForm ? (
                    <Button
                      variant="danger"
                      onClick={closeReferralForm}
                      className="my-2 mx-lg-2"
                    >
                      Close
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={openReferralForm}
                      className="my-2 mx-lg-2"
                    >
                      Send Referral
                    </Button>
                  )}
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                {showReferralForm ? (
                  <div>
                    <Form>
                      <div className="p-3 overflow-auto" style={{ maxHeight: "300px" }}>
                        <div className="row">
                          <Form.Group className="col-lg-6">
                            <Form.Label>
                              Referred To<span style={{ color: "red" }}> *</span>
                            </Form.Label>
                            <Form.Control
                              as="select"
                              name="referred_to"
                              onChange={handleReferredToChange}
                              required
                            >
                              {/* <option value="">Select a member</option> */}
                              {memberNames.map((memberName, index) => (
                                <option key={index} value={memberName}>
                                  {memberName}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                          <Form.Group className="col-lg-6">
                            <Form.Label>
                              Referrer Name<span style={{ color: "red" }}> *</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="referrer_name"
                              value={newReferral.referrer_name}
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </div>
                        <div className="row">
                        <Form.Group className="col-lg-6">
                          <Form.Label>
                            Email<span style={{ color: "red" }}> *</span>
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email_id"
                            value={newReferral.email_id}
                            onChange={handleInputChange}
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            required
                          />
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                          <Form.Label>
                            Contact No<span style={{ color: "red" }}> *</span>
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            name="contact_no"
                            value={newReferral.contact_no}
                            onChange={handleInputChange}
                            maxLength="10"
                            pattern="[0-9]{10}"
                            required
                          />
                        </Form.Group>
                        </div>
                        <div className="row">   
                            <Form.Group>
                              <Form.Label>
                                Company Name<span style={{ color: "red" }}> *</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="company_name"
                                value={newReferral.company_name}
                                onChange={handleInputChange}
                                required
                              />
                            </Form.Group>
                        </div>
                        <Form.Group>
                          <Form.Label>Referral Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            name="referral_desc"
                            value={newReferral.referral_desc}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </div>
          
                      <div className="d-flex justify-content-end p-3">
                        <Button
                          variant="danger"
                          onClick={closeReferralForm}
                          style={{ marginRight: "10px"}}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={validateAndSubmitReferral}
                        >
                          Submit
                        </Button>
                      </div>
                    </Form>
                  </div>
                ) : (
                  <ReferralList />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

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
        <p>Your referral has been sent successfully.</p>
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
    </div>
  );
};

export default ByMe;
