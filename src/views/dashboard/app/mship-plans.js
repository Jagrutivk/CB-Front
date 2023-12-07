import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Dropdown,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./customcss/admintabstyle.css";

const MembershipPlan = () => {
  const [plans, setPlans] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showdelete, setShowdelete] = useState(false);
  const handleClosedelete = () => setShowdelete(false);
  const handleShowdelete = () => setShowdelete(true);
  const [showedit, setShowedit] = useState(false);
  const handleCloseedit = () => setShowedit(false);
  const handleShowedit = () => setShowedit(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

    const fetchPlans = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_URL + "/api/membership_plans/membership_plans",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setPlans(data);
        } else {
          throw new Error("Network response was not ok.");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchPlans();
  }, []);

  const toggleExpandRow = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
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
                        className=" d-flex align-items-center text-center profile-forum-items p-0 m-0 w-75"
                      >
                        <Col lg={6} className=" p-3">
                          <h3>Membership Plan</h3>
                        </Col>
                      </div>
                      <Button type="submit" className="btn btn-primary">
                        Add Plan
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={12}>
              <Card>
                <Card.Body className="p-0">
                  <Table responsive className="forum-table mb-0 rounded">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th>
                          <b>Plan Name</b>
                        </th>
                        <th>
                          <b>Plan Details</b>
                        </th>
                        <th>
                          <b>Price</b>
                        </th>
                        <th>
                          <b>Action</b>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {plans.map((plan, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td className="col-lg-3">
                              <b>{plan.membership_plan}</b>
                            </td>
                            <td>
                              <b>{plan.plan_desc}</b>
                            </td>
                            <td>
                              <b>₹ {plan.fee} </b>
                            </td>

                            <td className="col-lg-2">
                              <FaEdit
                                className="editicon"
                                onClick={handleShowedit}
                              />
                              {/* Edit Model */}
                              <Modal
                                centered
                                show={showedit}
                                onHide={handleCloseedit}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>Edit Row</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  Are you sure you want to edit this row?
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={handleCloseedit}
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    variant="primary"
                                    onClick={handleCloseedit}
                                  >
                                    Save Changes
                                  </Button>
                                </Modal.Footer>
                              </Modal>
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
                                  <Modal.Title>Delete Row</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  Are you sure you want to delete this row?
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
                                        {plans.referral_desc || "N/A"}
                                      </b>
                                    </p>
                                  </div>
                                  <div className="col-lg-6">
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
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MembershipPlan;
