import React, { useState, useEffect } from "react";
import "./customcss/admintabstyle.css";
import { Container, Row, Col, Table, Alert, Card, Dropdown } from "react-bootstrap";
import {
  FaTrash,
  FaEdit,
  FaEye,
  FaComment,
  FaEllipsisH,
} from "react-icons/fa";
import AddComment from "./addComment";

const userId = localStorage.getItem("member_id");

const ReferralList = () => {
  const [referrals, setReferrals] = useState([]);
  const [error, setError] = useState(null);
  const [eyeClickedRow, setEyeClickedRow] = useState(null);
  const [commentRow, setCommentRow] = useState(null);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + `/referrals/get-referralByMe/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data && data.results) {
          setReferrals(data.results);
        }
      } catch (err) {
        console.error("Error fetching referrals:", err);
        setError(
          "An error occurred while fetching referrals. Please try again later."
        );
      }
    };

    fetchReferrals();
  }, []);

  const toggleEyeDetails = (index) => {
    setEyeClickedRow((prev) => (prev === index ? null : index));
  };

  const toggleCommentSection = (index) => {
    setCommentRow((prev) => (prev === index ? null : index));
  };

  const handleShowedit = () => {
    // Implement your logic for handling the edit action here
    // For example, you can set state or open a modal
    console.log("Handle Edit Action");
  };
  
  const handleShowdelete = () => {
    // Implement your logic for handling the delete action here
    // For example, you can set state or open a modal
    console.log("Handle Delete Action");
  };

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            {referrals.length > 0 ? (
              <Col lg={12}>
                <Card>
                  <Card.Body className="p-0">
                    <Table className="forum-table mb-0 rounded">
                      <thead className="bg-primary text-center text-white">
                        <tr>
                          <th>
                            <b>Company Name</b>
                          </th>
                          <th>
                            <b>Referred To</b>
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
                                <b>{referral.company_name}</b>
                              </td>
                              <td className="col-lg-3">
                                <b>{referral.referred_to_first_name}</b>
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
                                <td colSpan="5" style={{ position: 'relative' }}>
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
                                        <b>
                                          Referrer Name:{" "}
                                          {referral.referrer_name}
                                        </b>
                                      </p>
                                      <p>
                                        <b>Email: {referral.email_id}</b>
                                      </p>
                                    </div>
                                    <div className="col-lg-6">
                                      <p>
                                        <b>Contact No: {referral.contact_no}</b>
                                      </p>
                                      <p>
                                        <b>
                                          Referral Description:{" "}
                                          {referral.referral_desc}
                                        </b>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}

                            {commentRow === index && (
                              <tr className="expanded-row">
                                <td colSpan="5" style={{ position: 'relative' }}>
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

                                  {/* AddComment Component */}
                                  <AddComment />
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
              <p>No referrals available.</p>
            )}
          </Row>
        </Container>
      </div>

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

export default ReferralList;



