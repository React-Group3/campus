import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './signup.css';

export const Signup = () => {
  const [name, setName] = useState('');
  const [lname, setLastName] = useState('');
  const [uname, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [payment, setPayment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    else {
    const postData = {
      name: name,
      lname: lname,
      uname: uname,
      email: email,
      payment: payment,
      password: password,
      address: address
    };
    console.log('Form Data:', postData);
    PostData2(postData);
  };
  }
  return (
    <>
      <Container className="h-150 d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Card>
            <Card.Body>
              <Link to="/homepage" style={{ textDecoration: 'none', color: 'black' }}>
                <h2 className="text-center mb-4">
                  Campus<span style={{ color: 'red' }}>Price</span>
                </h2>
                <h2 className="text-center mb-4">
                  Sign Up
                </h2>
              </Link>

              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group id="lname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" required value={lname} onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>
                <Form.Group id="uname">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" required value={uname} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group id="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" required value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>
                <Form.Group id="payment">
                  <Form.Label>Payment</Form.Label>
                  <Form.Control type="text" required value={payment} onChange={(e) => setPayment(e.target.value)} />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>
                {error && <div className="alert alert-danger">{error}</div>}
                <Button className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;



//search.php
//addUser.php

export function PostData2(data) {
  console.log("data: " + JSON.stringify(data));
  
  fetch('../backend/signup.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "mode": "cors",
      'accept': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(function(response) {
    if (!response.ok) {
      console.log('bad Status code from server');
      throw new Error('Bad status code from server');
    }
    else {
      console.log(response.body);
    }
    console.log(response.text);
    return response.json();
  })
  .then(function(data) {
    const dataArray = Array.isArray(data) ? data : [data];
    console.log(dataArray);
    const firstItem = dataArray[0];
    console.log(firstItem);
    var loginResult = firstItem.login;
    console.log(loginResult);
    console.log(typeof loginResult);
    if (loginResult === "SUCCESS") {
      console.log("Signup success");
      sessionStorage.setItem('isLoggedIn', true);
      //var csrsf = 
      window.location = "/homepage";
    }
    else {
      alert("Signup failed");
      console.log("Signup failed");
      window.location = "/";
    }
    console.log(Object.keys(firstItem));
    return (
      <div>{firstItem}</div>
    );
  });
}