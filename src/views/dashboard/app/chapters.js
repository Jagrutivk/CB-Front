import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
} from "react-bootstrap";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaTrash, FaEdit } from "react-icons/fa";

const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showdelete, setShowdelete] = useState(false);
  const handleClosedelete = () => setShowdelete(false);
  const handleShowdelete = () => setShowdelete(true);
  const [showedit, setShowedit] = useState(false);
  const handleCloseedit = () => setShowedit(false);
  const handleShowedit = () => setShowedit(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Fetch the token from localStorage

    fetch(process.env.REACT_APP_API_URL +"/chapters/chapters", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setChapters(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
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
                        <Col lg={3} className=" p-3">
                          <h3>Chapters</h3>
                        </Col>
                      </div>
                      <Button type="submit" className="btn btn-primary">
                        Add Chapter
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {chapters.length > 0 ? (
              <Col sm={12}>
                <Card>
                  <Card.Body className="p-0">
                    <Table responsive className="forum-table mb-0 rounded">
                      {/* ----table head code */}
                      <thead className="bg-primary text-white">
                        <tr>
                          <th>
                            <b>Chapter ID</b>
                          </th>
                          <th>
                            <b>Chapter Name</b>
                          </th>
                          <th>
                            <b>Action</b>
                          </th>
                        </tr>
                      </thead>

                      {/* -----table body code */}
                      <tbody>
                        {chapters.map((chapter, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td className="col-lg-5">
                                <b>{chapter.chapter_id}</b>
                              </td>
                              <td className="col-lg-5">
                                <b>{chapter.chapter_name}</b>
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
                                          Email ID: {chapter.email_id || "N/A"}
                                        </b>
                                      </p>
                                      <p>
                                        <b>
                                          Phone Number:{" "}
                                          {chapter.phone_no || "N/A"}
                                        </b>
                                      </p>
                                    </div>
                                    <div className="col-lg-6">
                                      <p>
                                        <b>
                                          Address:{" "}
                                          {chapter.street_address || "N/A"},{" "}
                                          {chapter.city || "N/A"},{" "}
                                          {chapter.state || "N/A"},{" "}
                                          {chapter.country || "N/A"},
                                          {chapter.zip_code || "N/A"}
                                        </b>
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
              <p>No Chapters List.</p>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Chapters;

// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Table,
//   Button,
//   Modal,
// } from "react-bootstrap";
// import "./customcss/admintabstyle.css";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import { FaTrash, FaEdit } from "react-icons/fa";

// const Chapters = () => {
//   const [chapters, setChapters] = useState([]);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [showdelete, setShowdelete] = useState(false);
//   const handleClosedelete = () => setShowdelete(false);
//   const handleShowdelete = () => setShowdelete(true);
//   const [showedit, setShowedit] = useState(false);
//   const handleCloseedit = () => setShowedit(false);
//   const handleShowedit = () => setShowedit(true);

//   useEffect(() => {
//     fetch("process.env.REACT_APP_API_URL/chapters/chapters")
//       .then((response) => response.json())
//       .then((data) => {
//         setChapters(data);
//       })
//       .catch((error) => console.error("Error fetching data: ", error));
//   }, []);

//   const toggleExpandRow = (index) => {
//     if (expandedRow === index) {
//       setExpandedRow(null);
//     } else {
//       setExpandedRow(index);
//     }
//   };

//   return (
//     <>
//       <div id="content-page" className="content-page">
//         <Container>
//           <Row>
//             <Col lg={12}>
//               <Card>
//                 <Card.Body className="p-0">
//                   <div className="user-tabing p-3">
//                     <div className="d-flex flex-wrap align-items-center justify-content-between">
//                       <div
//                         variant="pills"
//                         className=" d-flex align-items-center text-center profile-forum-items p-0 m-0 w-75"
//                       >
//                         <Col lg={3} className=" p-3">
//                           <h3>Chapters</h3>
//                         </Col>
//                       </div>
//                       <Button type="submit" className="btn btn-primary">
//                         Add Chapter
//                       </Button>
//                     </div>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>

//             {chapters.length > 0 ? (
//               <Col sm={12}>
//                 <Card>
//                   <Card.Body className="p-0">
//                     <Table responsive className="forum-table mb-0 rounded">
//                       {/* ----table head code */}
//                       <thead className="bg-primary text-white">
//                         <tr>
//                           <th>
//                             <b>Chapter ID</b>
//                           </th>
//                           <th>
//                             <b>Chapter Name</b>
//                           </th>
//                           <th>
//                             <b>Action</b>
//                           </th>
//                         </tr>
//                       </thead>

//                       {/* -----table body code */}
//                       <tbody>
//                         {chapters.map((chapter, index) => (
//                           <React.Fragment key={index}>
//                             <tr>
//                               <td className="col-lg-5">
//                                 <b>{chapter.chapter_id}</b>
//                               </td>
//                               <td className="col-lg-5">
//                                 <b>{chapter.chapter_name}</b>
//                               </td>

//                               <td className="col-lg-2">
//                                 <FaEdit size={15} onClick={handleShowedit} />
//                                 {/* Edit Model */}
//                                 <Modal
//                                   centered
//                                   show={showedit}
//                                   onHide={handleCloseedit}
//                                 >
//                                   <Modal.Header closeButton>
//                                     <Modal.Title>Edit Row</Modal.Title>
//                                   </Modal.Header>
//                                   <Modal.Body>
//                                     Are you sure you want to edit this row?
//                                   </Modal.Body>
//                                   <Modal.Footer>
//                                     <Button
//                                       variant="secondary"
//                                       onClick={handleCloseedit}
//                                     >
//                                       Close
//                                     </Button>
//                                     <Button
//                                       variant="primary"
//                                       onClick={handleCloseedit}
//                                     >
//                                       Save Changes
//                                     </Button>
//                                   </Modal.Footer>
//                                 </Modal>
//                                 &nbsp;&nbsp;
//                                 <FaTrash size={15} onClick={handleShowdelete} />
//                                 {/* Delete Model */}
//                                 <Modal
//                                   centered
//                                   show={showdelete}
//                                   onHide={handleClosedelete}
//                                 >
//                                   <Modal.Header closeButton>
//                                     <Modal.Title>Delete Row</Modal.Title>
//                                   </Modal.Header>
//                                   <Modal.Body>
//                                     Are you sure you want to delete this row?
//                                   </Modal.Body>
//                                   <Modal.Footer>
//                                     <Button
//                                       variant="secondary"
//                                       onClick={handleClosedelete}
//                                     >
//                                       Close
//                                     </Button>
//                                     <Button
//                                       variant="primary"
//                                       onClick={handleClosedelete}
//                                     >
//                                       Save Changes
//                                     </Button>
//                                   </Modal.Footer>
//                                 </Modal>
//                                 &nbsp;&nbsp;
//                                 <b>
//                                   <FiChevronDown
//                                     size={30}
//                                     onClick={() => toggleExpandRow(index)}
//                                   />
//                                   {/* <FiChevronUp /> */}
//                                 </b>
//                               </td>
//                             </tr>

//                             {expandedRow === index && (
//                               <tr className="expanded-row">
//                                 <td colSpan="5">
//                                   <div className="row">
//                                     <div className="col-lg-6">
//                                       <p>
//                                         <b>
//                                           Email ID: {chapter.email_id || "N/A"}
//                                         </b>
//                                       </p>
//                                       <p>
//                                         <b>
//                                           Phone Number:{" "}
//                                           {chapter.phone_no || "N/A"}
//                                         </b>
//                                       </p>
//                                     </div>
//                                     <div className="col-lg-6">
//                                       <p>
//                                         <b>
//                                           Address:{" "}
//                                           {chapter.street_address || "N/A"},{" "}
//                                           {chapter.city || "N/A"},{" "}
//                                           {chapter.state || "N/A"},{" "}
//                                           {chapter.country || "N/A"},
//                                           {chapter.zip_code || "N/A"}
//                                         </b>
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </td>
//                               </tr>
//                             )}
//                           </React.Fragment>
//                         ))}
//                       </tbody>
//                     </Table>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ) : (
//               <p>No Chapters List.</p>
//             )}
//           </Row>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default Chapters;
