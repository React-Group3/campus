import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container, Row, Col, Card, Button, Form, NavItem } from 'react-bootstrap';
import NavbarHeader from '../../Components/Navbar/Navbar';
import Nav from 'react-bootstrap/Nav';

const Profile = () => {
  // State to manage the edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [address, setAddress] = useState('123 Main St, City, Country');

  // Handle the edit button click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <Container>
      <NavbarHeader />
      <h1 className="mt-4 mb-4">Profile</h1>
      <Row>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="account" title="Account">
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>User Information</Card.Title>
                  {isEditing ? (
                    <Form>
                      <Form.Group controlId="formName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="formAddress">
                        <Form.Label>Address:</Form.Label>
                        <Form.Control
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </Form.Group>
                      <Button variant="primary" onClick={handleSaveClick}>
                        Save Changes
                      </Button>
                    </Form>
                  ) : (
                    <Card.Text>
                      <strong>Name:</strong> {name} <br />
                      <strong>Email:</strong> {email} <br />
                      <strong>Address:</strong> {address}
                    </Card.Text>
                  )}
                  <Button variant="primary" onClick={handleEditClick}>
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Tab>
          <Tab eventKey="orders" title="Orders">
            <Col md={8}>
              <Card>
                <Card.Body>
                  <Card.Title>Recent Orders</Card.Title>
                  <Card.Text>No recent orders.</Card.Text>
                  <Button variant="primary">View All Orders</Button>
                </Card.Body>
              </Card>
            </Col>
          </Tab>
          <Tab eventKey="payment" title="Payment" style={{color: 'teal'}}>
            <Col md={8}>
              <Card>
                <Card.Body>
                  <Card.Title>Payment Methods</Card.Title>
                  <Card.Text>No payment methods on file.</Card.Text>
                  <Button variant="primary">Add Payment Method</Button>
                </Card.Body>
              </Card>
            </Col>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};

export default Profile;
