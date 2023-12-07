import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Modal,
  Alert,
  Table,
} from "react-bootstrap";
// import ReferralList from './referralList';
import "./customcss/admintabstyle.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const ReferralsList = () => {
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    // Fetch meetings from the backend when the component mounts
    const fetchMeetings = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL +"/referrals/get-referrals"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
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
                      className=" d-flex align-items-center text-center profile-forum-items p-0 m-0 w-75"
                    >
                      <Col lg={3} className=" p-3">
                        <h3>Referrals</h3>
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
                          <b>referrer_name</b>
                        </th>
                        <th>
                          <b>referred_by</b>
                        </th>
                        <th>
                          <b>referred_to</b>
                        </th>
                        <th>
                          <b>ref_status</b>
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
                              <b>{meeting.referrer_name}</b>
                            </td>

                            <td className="col-lg-2">
                              <b>{meeting.referred_by_name}</b>
                            </td>
                            <td className="col-lg-2">
                              <b>{meeting.referred_to_name}</b>
                            </td>
                            <td className="col-lg-2">
                              <b>{meeting.ref_status}</b>
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
                              <td colSpan="5">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <p>
                                      <b>
                                        referral_desc:{" "}
                                        {meeting.referral_desc || "N/A"}
                                      </b>
                                    </p>
                                  </div>
                                  <div className="col-lg-6">
                                    {" "}
                                    <p>
                                      <b>More data </b>
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
            <p>No Refferrals List.</p>
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

export default ReferralsList;
