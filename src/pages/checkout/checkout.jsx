import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, ListGroup, Card } from 'react-bootstrap';

const Checkout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [postCode, setPostCode] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cartItems, setCartItems] = useState([]); 

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('cart.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'fetchCartItems' }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCartItems(data.cartItems);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      address1: address1,
      address2: address2,
      cardNumber: cardNumber,
      postCode: postCode,
      expiryDate: expiryDate,
      cvc: cvc,
    };
    console.log(data);
    fetch('checkout.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        window.location.href = '/order-confirmation';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Calculate total price
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <Container className='w-75 my-5'>
        <Row>
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              <h2>Billing Information</h2>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" name="name" onChange={(e) => setName(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" name="email" onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formBasicAddress">
                <Form.Label>Address 1</Form.Label>
                <Form.Control type="text" placeholder="Enter your address" name="address1" onChange={(e) => setAddress1(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formBasicAddress">
                <Form.Label>Address 2</Form.Label>
                <Form.Control type="text" placeholder="Enter your address" name="address2" onChange={(e) => setAddress2(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formBasicAddress">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" placeholder="Enter your post code" name="postCode" onChange={(e) => setPostCode(e.target.value)} required />
              </Form.Group>
            
              <h2>Payment Method</h2>
              <Form.Group controlId="formBasicCardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" placeholder="Enter your card number" name="cardNumber" onChange={(e) => setCardNumber(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formBasicExpiryDate">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control type="text" placeholder="Enter expiry date" name="expiryDate" onChange={(e) => setExpiryDate(e.target.value)} required />
              </Form.Group>
              <Form.Group controlId="formBasicCVC">
                <Form.Label>CVC</Form.Label>
                <Form.Control type="text" placeholder="Enter CVC" name="cvc"onChange={(e) => setCvc(e.target.value)}  required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Place Order
              </Button>
            </Form>
          </Col>
          <Col md={4}>
            <h2>Order Summary</h2>
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.id}>{item.name} - ${item.price}</ListGroup.Item>
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
    </>
  );
};

export default Checkout;
