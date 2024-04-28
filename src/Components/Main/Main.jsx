import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';

export const Main = () => {
  
  const [topSellers, setTopSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    // Fetch top sellers from the backend
    fetch('backend/topsellers')
      .then(response => response.json())
      .then(data => setTopSellers(data))
      .catch(error => console.error('Error fetching top sellers:', error));

    // Fetch new arrivals from the backend
    fetch('backend/newarrivals')
      .then(response => response.json())
      .then(data => setNewArrivals(data))
      .catch(error => console.error('Error fetching new arrivals:', error));
  }, []);

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Top Sellers</h2>
          <Row>
            {topSellers.map(item => (
              <Col key={item.id} sm={6} md={4} lg={3}>
                <Card className="mb-3">
                  <Card.Img variant="top" src={item.image} alt='top-seller' />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Price: ${item.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-end">
            <a href="/topsellers">View All <FaArrowRight /></a>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2>New Arrivals</h2>
          <Row>
            {newArrivals.map(item => (
              <Col key={item.id} sm={6} md={4} lg={3}>
                <Card className="mb-3">
                  <Card.Img variant="top" src={item.image} alt='new-arrivals' />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Price: ${item.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-end">
            <a href="/newarrivals">View All <FaArrowRight /></a>
          </div>
        </Col>
      </Row>
      <script>
        console.log('Hello from the script tag');
        if (!sessionStorage.getItem('isLoggedIn')) {
            //window.location = '/login'
            }
    </script>
    </Container>
   
  );
};

