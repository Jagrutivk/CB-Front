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
import MeetingList from "./meetingList";

const userId = sessionStorage.getItem("userID");
const userName = sessionStorage.getItem("userName");

const Meeting = () => {
  const [memberid, setMemberid] = useState([]);
  const [memberNames, setMemberNames] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    meeting_type: "Virtual",
    meeting_date: "",
    meeting_start_time: "",
    meeting_end_time: "",
    meeting_link: "",
    meeting_subject: "",
    members: "",
    meeting_place: "",
    created_by: `${userName}`,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);
  const [showMeetingForm, setShowMeetingForm] = useState(true);
  const [headerText, setHeaderText] = useState("List of Meetings");

  useEffect(() => {
    const fetchData = async () => {
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

        if (response.data && response.data.requests) {
          const memberNamess = response.data.requests.map(
            (member) => member.first_name
          );
          const memberIDs = response.data.requests.map(
            (member) => member.member_id
          );

          setMemberNames(memberNamess);
          setMemberid(memberIDs);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchData();
  }, []);

  const handlemembers = (event) => {
    const selectedName = event.target.value;
    const selectedIndex = memberNames.indexOf(selectedName);

    if (selectedIndex !== -1) {
      const selectedId = memberid[selectedIndex];

      setNewMeeting((newMeeting) => ({
        ...newMeeting,
        members: selectedId,
      }));
    } else {
      console.log("Name not found in memberNames array");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewMeeting((newMeeting) => ({
      ...newMeeting,
      [name]: value,
    }));
  };

  const showSuccess = () => {
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const clearError = () => {
    setError(null);
  };

  const isFormValid = () => {
    return (
      newMeeting.meeting_type !== "" &&
      newMeeting.meeting_date !== "" &&
      newMeeting.meeting_start_time !== "" &&
      newMeeting.meeting_end_time !== "" &&
      (newMeeting.meeting_type === "Virtual"
        ? newMeeting.meeting_link !== ""
        : true) &&
      (newMeeting.meeting_type === "In-Person"
        ? newMeeting.meeting_place !== ""
        : true) &&
      newMeeting.meeting_subject !== "" &&
      newMeeting.members !== "" &&
      newMeeting.created_by !== ""
    );
  };

  const submitMeeting = () => {
    if (!isFormValid()) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    const meetingSchedule = {
      ...newMeeting,
      created_by: userId,
    };

    fetch("process.env.REACT_APP_API_URL/meetings/create-meeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meetingSchedule),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setNewMeeting({
          meeting_type: "Virtual",
          meeting_date: "",
          meeting_start_time: "",
          meeting_end_time: "",
          meeting_link: "",
          meeting_subject: "",
          members: "",
          meeting_place: "",
          created_by: `${userId}`,
        });

        setShowMeetingForm(true);
        showSuccess();
      })
      .catch((err) => {
        console.error("Error scheduling meeting:", err);
        setError(
          "An error occurred while scheduling the meeting. Please try again later."
        );
      });
  };

  const toggleMeetingForm = () => {
    setShowMeetingForm(!showMeetingForm);
    if (showMeetingForm) {
      setHeaderText("Schedule a Meeting");
    } else {
      setHeaderText("List of all meetings scheduled");
    }
  };

  return (
    <div id="content-page" className="content-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={10}>
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title"><b>{headerText}</b></h4>
                </div>
                <div className="d-flex flex-column flex-lg-row justify-content-end">
                  {showMeetingForm ? (
                    <Button
                      variant="primary"
                      onClick={toggleMeetingForm}
                      className="my-2"
                    >
                      Schedule a Meeting
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      onClick={toggleMeetingForm}
                      className="my-2"
                    >
                      Close
                    </Button>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                {showMeetingForm ? (
                  <MeetingList />
                ) : (
                  <Form className="d-flex flex-column px-3">
                    <div className="p-3 overflow-auto" style={{ maxHeight: "300px" }}>
                    <div className="row">
                      <Form.Group className="col-lg-6">
                        <Form.Label>
                          Meeting Type<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          as="select"
                          name="meeting_type"
                          value={newMeeting.meeting_type}
                          onChange={handleInputChange}
                        >
                          <option value="Virtual">Virtual</option>
                          <option value="In-Person">In-Person</option>
                        </Form.Control>
                      </Form.Group>
                      {newMeeting.meeting_type === "Virtual" && (
                        <Form.Group className="col-lg-6">
                          <Form.Label>
                            Meeting Link<span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="url"
                            name="meeting_link"
                            value={newMeeting.meeting_link}
                            onChange={handleInputChange}
                            pattern="^(http|https)://\S+$"
                          />
                        </Form.Group>
                      )}
                      {newMeeting.meeting_type === "In-Person" && (
                        <Form.Group className="col-lg-6">
                          <Form.Label>
                            Meeting Place<span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="meeting_place"
                            value={newMeeting.meeting_place}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      )}
                    </div>
                    <div className="row">
                    <Form.Group className="col-lg-6">
                      <Form.Label>
                        Meeting Date<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="meeting_date"
                        value={newMeeting.meeting_date}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="col-lg-6">
                      <Form.Label>
                        Members<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="members"
                       // value={newMeeting.members}
                        onChange={handlemembers}
                      >
                        <option value="">Select a member</option>
                        {memberNames.map((name, index) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    </div>
                    <div className="row">
                      <Form.Group className="col-lg-6">
                        <Form.Label>
                          Meeting Start Time<span className="text-danger">*</span>
                        </Form.Label>
                        
                              <Form.Control
                                type="time"
                                name="meeting_start_time"
                                value={newMeeting.meeting_start_time}
                                onChange={handleInputChange}
                              />
                        
                      </Form.Group>
                      <Form.Group className="col-lg-6">
                        <Form.Label>
                          Meeting End Time<span className="text-danger">*</span>
                        </Form.Label>
                              <Form.Control
                                type="time"
                                name="meeting_end_time"
                                value={newMeeting.meeting_end_time}
                                onChange={handleInputChange}
                              />
                      </Form.Group>
                    </div>
                    <Form.Group>
                      <Form.Label>
                        Meeting Subject<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="meeting_subject"
                        value={newMeeting.meeting_subject}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    
                    {/* <Form.Group>
                      <Form.Label>
                        Created By<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="created_by"
                        value={newMeeting.created_by}
                        onChange={handleInputChange}
                      />
                    </Form.Group> */}
                    </div>
                    <div className="d-flex justify-content-end">
                    <Button
                      variant="danger"
                      onClick={toggleMeetingForm}
                      className="my-2 me-2"
                    >
                      <b>Close</b>
                    </Button>
                    <Button
                      variant="primary"
                      onClick={submitMeeting}
                      className="my-2"
                    >
                      <b>Schedule</b>
                    </Button>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Success Alert */}
      <Alert
        show={showSuccessModal}
        variant="success"
        onClose={closeSuccessModal}
        dismissible
        className="position-fixed top-50 start-50 translate-middle"
        style={{ backgroundColor: "green", color: "white" }}
      >
        <Alert.Heading>Success!</Alert.Heading>
        <p>Your meeting has been scheduled successfully.</p>
      </Alert>

      {/* Error Alert */}
      {error && (
        <Alert
          variant="danger"
          onClose={clearError}
          dismissible
          className="position-fixed top-50 start-50 translate-middle"
          style={{ backgroundColor: "red", color: "white" }}
        >
          <Alert.Heading>Error!</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
    </div>
  );
};

export default Meeting;







