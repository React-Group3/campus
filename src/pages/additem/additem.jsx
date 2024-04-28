import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to handle form submission
    const postData = {
        itemName: itemName,
        itemDescription: itemDescription,
        itemPrice: itemPrice
        };
        console.log('Form Data:', postData);
        PostData2(postData);
    
  };

  return (
    <Container className="h-100 d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Add Item</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="itemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
              </Form.Group>
              <Form.Group id="itemDescription">
                <Form.Label>Item Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} required />
              </Form.Group>
              <Form.Group id="itemPrice">
                <Form.Label>Item Price</Form.Label>
                <Form.Control type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} required />
              </Form.Group>
              <Button className="w-100" type="submit">Add Item</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default AddItem;

export function PostData2(data) {
    console.log("data: " + JSON.stringify(data));
    
    fetch('../backend/additem.php', {
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