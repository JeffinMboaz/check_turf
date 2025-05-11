import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import TNavbar from "../components/TNavbar";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <>
    <TNavbar/>
    <Container className="my-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <Row className="g-4">
        {/* Turf Management */}
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Turf Management</Card.Title>
              <Card.Text>View, Add, Update or Delete Turfs and Events.</Card.Text>
              <Button variant="primary" onClick={() => navigate("/manageturf")}>Manage Turfs</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Bookings */}
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Bookings</Card.Title>
              <Card.Text>View and manage all turf bookings.</Card.Text>
              <Button variant="success" onClick={() => navigate("/managebookings")}>View Bookings</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Reviews */}
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Reviews</Card.Title>
              <Card.Text>View and delete inappropriate reviews.</Card.Text>
              <Button variant="warning" onClick={() => navigate("/managereviews")}>Manage Reviews</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* User Management */}
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text>Manage all registered users.</Card.Text>
              <Button variant="info" onClick={() => navigate("/manageusers")}>Manage Users</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Manager Management */}
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Managers</Card.Title>
              <Card.Text>Manage turf managers and their accounts.</Card.Text>
              <Button variant="info" onClick={() => navigate("/managemangers")}>Manage Managers</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
    
  );
}

export default AdminDashboard;
