import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert, Table, Dropdown, Modal, Button } from "react-bootstrap";
import { FaTrash, FaEye, FaComment, FaEllipsisH } from "react-icons/fa";
import AddComment from "./addComment";

const userId = sessionStorage.getItem("userID");

const ForMe = () => {
  const [referrals, setReferrals] = useState([]);
  const [error, setError] = useState(null);
  const [eyeClickedRow, setEyeClickedRow] = useState(null);
  const [commentRow, setCommentRow] = useState(null);

  const [showdelete, setShowdelete] = useState(false);
  const handleClosedelete = () => setShowdelete(false);
  const handleShowdelete = () => setShowdelete(true);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/referrals/get-referralForMe/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setReferrals(data.results);
        console.log("referral data", data.results);
      })
      .catch((error) => {
        console.error("Error fetching referrals:", error);
        setError(
          "An error occurred while fetching referrals. Please try again later."
        );
      });
  }, []);

  const toggleEyeDetails = (index) => {
    if (eyeClickedRow === index) {
      setEyeClickedRow(null);
    } else {
      setEyeClickedRow(index);
    }
  };

  const toggleCommentSection = (index) => {
    if (commentRow === index) {
      setCommentRow(null);
    } else {
      setCommentRow(index);
    }
  };

  return (
    <>
      <Container style={{ height: '100vh' }}>
        <Row>
          <Col lg={12} xs={12}>
            <Card className="mt-3">
              <Card.Header className="p-0">
                <h4 className="p-3"><b>List of Referrals Received</b></h4>
              </Card.Header>

          {referrals.length > 0 ? (
            <Col lg={12} xs={12}>
              <Card.Body>
                  <Table responsive="sm" className="forum-table mb-0 rounded">
                    <thead className="bg-primary text-center text-white">
                      <tr>
                        <th>
                          <b>Referred By</b>
                        </th>
                        <th>
                          <b>Company Name</b>
                        </th>
                        <th>
                          <b>Status</b>
                        </th>
                        <th>
                          <b>Action</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {referrals.map((referral, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td className="col-lg-3">
                              <b>{referral.referrer_name}</b>
                            </td>
                            <td className="col-lg-3">
                              <b>{referral.company_name}</b>
                            </td>
                            <td className="col-lg-3">
                              <b>{referral.ref_status}</b>
                            </td>
                            <td className="col-lg-3">
                              <div className="d-lg-none">
                                <Dropdown>
                                  <Dropdown.Toggle
                                    variant="link"
                                    id="dropdown-basic"
                                    style={{
                                      fontSize: '1.5rem',
                                      color: 'skyblue',
                                    }}
                                  >
                                    <FaEllipsisH className="ellipsis-icon" />
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => toggleEyeDetails(index)}>
                                      <FaEye className="viewicon" /> View
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => toggleCommentSection(index)}>
                                      <FaComment className="commenticon" /> Comment
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
                                <FaTrash
                                  className="deleteicon"
                                  size={15}
                                  color="red"
                                  onClick={handleShowdelete}
                                />
                                <Modal show={showdelete} onHide={handleClosedelete}>
                                  {/* Include your delete confirmation modal content */}
                                  <Modal.Header closeButton>
                                    <Modal.Title>Delete Confirmation</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    Are you sure you want to delete this referral?
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClosedelete}>
                                      Cancel
                                    </Button>
                                    <Button variant="danger" onClick={handleShowdelete}>
                                      Delete
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            </td>
                          </tr>
                          {eyeClickedRow === index && (
                            <tr className="expanded-row">
                              <td colSpan="4" style={{ position: 'relative' }}>
                                {/* Close Icon */}
                                <div
                                  className="close-icon"
                                  onClick={() => setEyeClickedRow(null)}
                                  style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  &#10006;
                                </div>

                                {/* Expanded Row Content */}
                                <div className="row">
                                <div className="col-lg-6">
                                    <p>
                                      <b>Referrer Name: {referral.referrer_name}</b>
                                    </p>
                                    <p>
                                      <b>Company Name: {referral.company_name}</b>
                                    </p>
                                    <p>
                                      <b>Referral Status: {referral.ref_status}</b>
                                    </p>
                                  </div>
                                  <div className="col-lg-6">
                                    <p>
                                      <b>Email: {referral.email_id}</b>
                                    </p>
                                    <p>
                                      <b>Contact No: {referral.contact_no}</b>
                                    </p>
                                    <p>
                                      <b>Referral Description: {referral.referral_desc}</b>
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                          {commentRow === index && (
                            <tr className="expanded-row">
                              <td colSpan="4" style={{ position: 'relative' }}>
                                {/* Close Icon */}
                                <div
                                  className="close-icon"
                                  onClick={() => setCommentRow(null)}
                                  style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    cursor: 'pointer',
                                  }}
                                >
                                  &#10006;
                                </div>
                                <AddComment /> {/* Display the AddComment component */}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </Table>
                  </Card.Body>
          </Col>
          ) : (
            <p>No referrals available.</p>
          )}
          
  </Card>
          </Col>
        </Row>
      </Container>

      {error && (
        <Alert
          variant="danger"
          onClose={() => setError(null)}
          dismissible
          style={{
            position: "fixed",
            top: "50px",
            right: "50px",
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

export default ForMe;





