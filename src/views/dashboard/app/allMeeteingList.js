import React, { useState, useEffect } from "react";
import "./customcss/admintabstyle.css";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaTrash, FaEdit } from "react-icons/fa";

const AllMeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showdelete, setShowdelete] = useState(false);
  const handleClosedelete = () => setShowdelete(false);
  const handleShowdelete = () => setShowdelete(true);
  const [showedit, setShowedit] = useState(false);
  const handleCloseedit = () => setShowedit(false);
  const handleShowedit = () => setShowedit(true);

  useEffect(() => {
    // Fetch meetings from the backend when the component mounts
    const fetchMeetings = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL +"/meetings/get-meetings"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data && data.results) {
          const sortedMeetings = data.results.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setMeetings(sortedMeetings);
        }
      } catch (err) {
        console.error("Error fetching meetings:", err);
        setError(
          "An error occurred while fetching meetings. Please try again later."
        );
      }
    };

    fetchMeetings();
  }, []);

  const toggleExpandRow = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  return (
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
                      className=" d-flex align-items-center text-center profile-forum-items p-0 m-0 w-0"
                    >
                      <Col lg={12} className=" p-3">
                        <h3>Meeting Details</h3>
                      </Col>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {meetings.length > 0 ? (
            <Col sm={12}>
              <Card>
                <Card.Body className="p-0">
                  <Table responsive className="forum-table mb-0 rounded">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th>
                          <b>Date</b>
                        </th>
                        <th>
                          <b>Start Time</b>
                        </th>
                        <th>
                          <b>End Time</b>
                        </th>
                        <th>
                          <b>Type</b>
                        </th>
                        <th>
                          <b>Subject</b>
                        </th>
                        <th>
                          <b>Action</b>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {meetings.map((meeting, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td className="col-lg-2">
                              {" "}
                              <b>
                                {" "}
                                {new Date(
                                  meeting.meeting_date
                                ).toLocaleDateString()}
                              </b>
                            </td>
                            <td className="col-lg-2">
                              <b>{meeting.meeting_start_time}</b>
                            </td>
                            <td className="col-lg-2">
                              <b>{meeting.meeting_end_time}</b>
                            </td>
                            <td className="col-lg-2">
                              <b>{meeting.meeting_type}</b>
                            </td>
                            <td className="col-lg-3">
                              <b>{meeting.meeting_subject}</b>
                            </td>
                            <td className="col-lg-1">
                              {expandedRow === index ? (
                                <FiChevronUp
                                  size={30}
                                  onClick={() => toggleExpandRow(index)}
                                />
                              ) : (
                                <FiChevronDown
                                  size={30}
                                  onClick={() => toggleExpandRow(index)}
                                />
                              )}
                            </td>
                          </tr>

                          {expandedRow === index && (
                            <tr className="expanded-row">
                              <td colSpan="7">
                                <div className="row">
                                  <div className="col-lg-6">
                                    {meeting.meeting_type === "Virtual" ? (
                                      <div>
                                        <p>
                                          <b>
                                            Meeting Link:{" "}
                                            {meeting.meeting_link || "N/A"}
                                          </b>
                                        </p>
                                        {/* Render other additional fields here */}
                                      </div>
                                    ) : (
                                      <div>
                                        <p>
                                          <b>
                                            Meeting Place:{" "}
                                            {meeting.meeting_desc || "N/A"}
                                          </b>
                                        </p>
                                        {/* Render other additional fields here */}
                                      </div>
                                    )}
                                  </div>
                                  <div className="col-lg-6">
                                    <p>
                                      <b>More data</b>
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
          ) : (
            <p>No meetings scheduled.</p>
          )}
        </Row>
      </Container>

      {/* Error Alert */}
      {error && (
        <Alert
          variant="danger"
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

export default AllMeetingList;
