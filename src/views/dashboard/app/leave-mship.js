import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const LeaveMembership = () => {
  const [user_name, setUserName] = useState('');
  const [reason, setReason] = useState('');

  const handleLeave = () => {
    // Simulated leave membership logic
    if (user_name && reason) {
      alert(`Membership terminated for ${user_name} with reason: ${reason}`);
    } else {
      alert('Please fill in all the required fields.');
    }
  };

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col lg="12">
              <h2 className='pt-4 pb-4 text-center'>Leave Membership</h2>
              <Form>
                <Form.Group controlId="user_name">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={user_name}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>
                <br />

                <Form.Group controlId="reason">
                  <Form.Label>Reason for Leaving</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="4"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </Form.Group>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <Button variant="danger" onClick={handleLeave}>
                    Leave Membership
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default LeaveMembership;
