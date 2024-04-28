import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Card, Container } from 'react-bootstrap';
import './login.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getDeets = () => {
    const postData = {
      username: username,
      password: password
    };

  PostData2(postData);

    
  };

  return (
    <Container className="h-100 w-50 d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <Link to='/homepage' style={{textDecoration: 'none', color: 'black'}}><h2 className="text-center mb-4">Campus<span style={{ color: 'red' }}>Price</span></h2></Link>

            <Form>
              <Form.Group id="username">
                <Form.Label>Email</Form.Label>
                <Form.Control type="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>
              <Button className="w-100" type="button" onClick={getDeets}>Sign In</Button>
            </Form>

          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Do not have an account? <a href='/signup'>Sign Up</a>
        </div>
      </div>
    </Container>
  );
};

export default Login;

export function PostData2(data) {
  console.log("data: " + JSON.stringify(data));
  
  fetch('../backend/login.php', {
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
    if (loginResult === "ACCESS") {
      console.log("Login success");
      sessionStorage.setItem('isLoggedIn', true);
      //var csrsf = 
      //window.location = "/homepage";
    }
    else {
      alert("Login failed");
      console.log("Login failed");
      //window.location = "/";
    }
    console.log(Object.keys(firstItem));
    return (
      <div>{firstItem}</div>
    );
  });
}
