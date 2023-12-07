import React, { useState, useEffect } from "react";
import "./customcss/admintabstyle.css";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaTrash, FaEdit } from "react-icons/fa";

const MemberCategory = () => {
  const [memberCategories, setMemberCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showdelete, setShowdelete] = useState(false);
  const handleClosedelete = () => setShowdelete(false);
  const handleShowdelete = () => setShowdelete(true);
  const [showedit, setShowedit] = useState(false);
  const handleCloseedit = () => setShowedit(false);
  const handleShowedit = () => setShowedit(true);

  useEffect(() => {
    fetchMemberCategories();
  }, []);

  const fetchMemberCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/memberCategory/memberCategory",
        config
      );
      const data = response.data;

      const categories = data.map((item) => item.member_category);
      setMemberCategories(categories);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

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
                      <Col lg={6} className=" p-3">
                        <h3>Member Categories</h3>
                      </Col>
                    </div>
                    <Button type="submit" className="btn btn-primary">
                      Add Category
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
                        <b>Category</b>
                      </th>
                      <th>
                        <b>Action</b>
                      </th>
                    </tr>
                  </thead>

                  {/* -----table body code */}
                  <tbody>
                    {memberCategories.map((category, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td className="col-lg-10">
                            <b>{category}</b>
                          </td>

                          <td className="col-lg-2">
                            <FaEdit
                              className="editicon"
                              onClick={handleShowedit}
                            />
                            {/* -----edit model  */}
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
                            &nbsp;&nbsp;&nbsp;
                            <FaTrash
                              className="deleteicon"
                              onClick={handleShowdelete}
                            />
                            {/* ----delete model  */}
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
                                      {memberCategories.referral_desc || "N/A"}
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
  );
};
export default MemberCategory;
