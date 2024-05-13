import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, ListGroup, Card, Alert } from 'react-bootstrap';
import { useProductContext } from '../../contexts/ProductContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PEHhaAN06kC7AVBwSkXfnIKrRq948IHgkfzJjF4k0BVply7GSFS4t9vxxtbsAUdtYvwwJlqAoNmhqqKU7VprsmC006iMJpZGX');

const Checkout = () => {
  const { cartItems } = useProductContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const calculateTotal = () => {
    const totalPrice = cartItems.reduce((acc, item) => {
      return acc + parseFloat(item.Price);
    }, 0);
    setTotal(totalPrice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        name: name,
        email: email,
        address: address,
        postCode: postCode,
        cartItems: cartItems.map(item => ({
          productId: item.ProductID,
          productName: item.Name,
          price: parseFloat(item.Price),
        }))
      };

      const response = await fetch('http://localhost:8000/create-checkout-session.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const { sessionId, error } = await response.json();

      if (error) {
        console.error('Error:', error);
        setError('Failed to redirect to checkout. Please try again.');
      } else {
        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({
          sessionId: sessionId
        });

        if (result.error) {
          console.error('Error:', result.error);
          setError('Failed to redirect to checkout. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to redirect to checkout. Please try again.');
    }
  };

  return (
    <Container className='my-5'>
      <Row>
        <Col md={6}>
          <h2>Billing Information</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formBasicPostCode">
              <Form.Label>Post Code</Form.Label>
              <Form.Control type="text" placeholder="Enter your post code" value={postCode} onChange={(e) => setPostCode(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Place Order
            </Button>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
        </Col>
        <Col md={6}>
          <h2>Order Summary</h2>
          <ListGroup variant="flush">
            {cartItems.map(item => (
              <ListGroup.Item key={item.ProductID}>{item.Name} - ${item.Price}</ListGroup.Item>
            ))}
          </ListGroup>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Total</Card.Title>
              <Card.Text>${total.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
