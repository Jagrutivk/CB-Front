import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./customcss/admintabstyle.css";

const RenewMembership = () => {
  const [user_name, setUserName] = useState("");
  const [membership_plan, setMembershipPlan] = useState("");
  const [planPrice, setPlanPrice] = useState("");

  const handleRenewal = () => {
    // Simulated renewal logic
    if (user_name && membership_plan) {
      alert(
        `Renewal successful for ${user_name} with the ${membership_plan} membership plan. Total Price: $${planPrice}`
      );
    } else {
      alert("Please fill in all the required fields.");
    }
  };

  const handleMembershipPlanChange = (selectedPlan) => {
    setMembershipPlan(selectedPlan);
    // Simulated price logic - you can replace this with actual pricing logic
    if (selectedPlan === "Silver") {
      setPlanPrice(10);
    } else if (selectedPlan === "Gold") {
      setPlanPrice(20);
    } else if (selectedPlan === "Platinum") {
      setPlanPrice(30);
    } else {
      setPlanPrice("");
    }
  };

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col lg="12">
              <h2 className="pt-4 pb-4 text-center">Renew Membership</h2>
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

                <Form.Group controlId="membership_plan">
                  <Form.Label>Membership Plan</Form.Label>
                  <Form.Control
                    as="select"
                    value={membership_plan}
                    onChange={(e) => handleMembershipPlanChange(e.target.value)}
                  >
                    <option value="">Select membership plan</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                  </Form.Control>
                </Form.Group>

                {planPrice && (
                  <div>
                    <p>Price: ${planPrice}</p>
                  </div>
                )}

                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <Button variant="primary" onClick={handleRenewal}>
                    Renew Membership
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

export default RenewMembership;
