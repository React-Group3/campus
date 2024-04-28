import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const Footer = () => {
  return (
    <div id="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Product Links</h5>
            <ListGroup variant="flush">
              <ListGroup.Item>Categories</ListGroup.Item>
              <ListGroup.Item>New Arrivals</ListGroup.Item>
              <ListGroup.Item>Features</ListGroup.Item>
              <ListGroup.Item>Collections</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <h5>Company</h5>
            <ListGroup variant="flush">
              <ListGroup.Item>About</ListGroup.Item>
              <ListGroup.Item>Blog</ListGroup.Item>
              <ListGroup.Item>Services</ListGroup.Item>
              <ListGroup.Item>Privacy Policy</ListGroup.Item>
              <ListGroup.Item>Terms of Service</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <h5>Join Our Newsletter</h5>
            <p>Drop your Email below to get update, promotion, coupons & more.</p>
          
          </Col>
        </Row>
      </Container>
      <div className="text-center mt-4">
        CopyRight © 2024 Campus Price All Right Reserved
      </div>
    </div>
  );
}

export default Footer;
