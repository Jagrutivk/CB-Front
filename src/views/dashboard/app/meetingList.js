import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Alert, Card, Dropdown } from "react-bootstrap";
import { FaTrash, FaEdit, FaEye, FaComment, FaEllipsisH } from "react-icons/fa";
import AddComment from "./addComment";

const userId = sessionStorage.getItem("userID");

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(null);
  const [eyeClickedRow, setEyeClickedRow] = useState(null);
  const [commentRow, setCommentRow] = useState(null);
  const [showActionsDropdown, setShowActionsDropdown] = useState(null);

  useEffect(() => {
    // Fetch meetings from the backend when the component mounts
    const fetchMeetings = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + `/meetings/get-meeting/${userId}`
        );
        if (!response.ok) {
          throw Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data && data.results) {
          setMeetings(data.results);
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

  const toggleEyeDetails = (index) => {
    setEyeClickedRow((prev) => (prev === index ? null : index));
  };

  const toggleCommentSection = (index) => {
    setCommentRow((prev) => (prev === index ? null : index));
  };

  const handleShowedit = () => {
    console.log("Handle Edit Action");
  };

  const handleShowdelete = () => {
    console.log("Handle Delete Action");
  };

  const toggleActionsDropdown = (index) => {
    setShowActionsDropdown((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            {meetings.length > 0 ? (
              <Col lg={12}>
                <Card>
                  <Card.Body className="p-0">
                    <div>
                    <Table className="forum-table mb-0 rounded">
                        <thead className="bg-primary text-white">
                          <tr>
                            <th>
                              <b>Date</b>
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
                                <td className="col-lg-3">
                                  <b>
                                    {new Date(
                                      meeting.meeting_date
                                    ).toLocaleDateString()}
                                  </b>
                                </td>
                                <td className="col-lg-3">
                                  <b>{meeting.meeting_type}</b>
                                </td>
                                <td className="col-lg-3">
                                  <b>{meeting.meeting_subject}</b>
                                </td>
                                <td className="col-lg-3">
                                  <div className="d-lg-none">
                                    <Dropdown
                                      show={showActionsDropdown === index}
                                      onSelect={() => setShowActionsDropdown(null)}
                                    >
                                      <Dropdown.Toggle
                                        variant="link"
                                        id={`dropdown-basic-${index}`}
                                        style={{
                                          fontSize: '1.5rem',
                                          color: 'skyblue',
                                        }}
                                      >
                                        <FaEllipsisH
                                          className="ellipsis-icon"
                                          onClick={() => toggleActionsDropdown(index)}
                                        />
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => toggleEyeDetails(index)}>
                                          <FaEye className="viewicon" /> View
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => toggleCommentSection(index)}>
                                          <FaComment className="commenticon" /> Comment
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={handleShowedit}>
                                          <FaEdit className="editicon" /> Edit
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={handleShowdelete}>
                                          <FaTrash className="deleteicon" /> Delete
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                  <div className="d-none d-lg-block">
                                    <FaEye
                                      className="viewicon"
                                      size={15}
                                      color="#007BFF"
                                      onClick={() => toggleEyeDetails(index)}
                                    />
                                    &nbsp;&nbsp;
                                    <FaComment
                                      className="commenticon"
                                      size={15}
                                      color="#007BFF"
                                      onClick={() => toggleCommentSection(index)}
                                    />
                                    &nbsp;&nbsp;
                                    <FaEdit
                                      className="editicon"
                                      size={15}
                                      color="#007BFF"
                                      onClick={handleShowedit}
                                    />
                                    &nbsp;&nbsp;
                                    <FaTrash
                                      className="deleteicon"
                                      size={15}
                                      color="red"
                                      onClick={handleShowdelete}
                                    />
                                  </div>
                                </td>
                              </tr>
                              {eyeClickedRow === index && (
                                <tr className="expanded-row">
                                  <td colSpan="4" style={{ position: 'relative' }}>
                                    <div
                                      className="close-icon"
                                      onClick={() => setEyeClickedRow(null)}
                                      style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '20px',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      &#10006;
                                    </div>
                                    <div className="row">
                                      <div className="col-lg-6">
                                        <p>
                                          <b>
                                            Members:{" "}
                                            {meeting.member_first_name}
                                          </b>
                                        </p>
                                        <p>
                                          <b>
                                            {meeting.meeting_type === "Virtual" ? (
                                              <div>
                                                <p>
                                                  Meeting Link:{" "}
                                                  {meeting.meeting_link || "N/A"}
                                                </p>
                                              </div>
                                            ) : (
                                              <div>
                                                <p>
                                                  Meeting Place:{" "}
                                                  {meeting.meeting_place || "N/A"}
                                                </p>
                                              </div>
                                            )}
                                          </b>
                                        </p>
                                      </div>
                                      <div className="col-lg-6">
                                        <p>
                                          <b>
                                            Start Time: {meeting.meeting_start_time}
                                          </b>
                                        </p>
                                        <p>
                                          <b>
                                            End Time: {meeting.meeting_end_time}
                                          </b>
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                              {commentRow === index && (
                                <tr className="expanded-row">
                                  <td colSpan="4" style={{ position: 'relative' }}>
                                    <div
                                      className="close-icon"
                                      onClick={() => setCommentRow(null)}
                                      style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '20px',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      &#10006;
                                    </div>
                                    <AddComment />
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ) : (
              <p>No meetings scheduled.</p>
            )}
          </Row>
        </Container>
      </div>

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
    </>
  );
};

export default MeetingList;
