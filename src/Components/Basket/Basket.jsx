import React, { useState, useEffect } from 'react';
import './Basket.css';
import { Container, Table, Button, Breadcrumb } from 'react-bootstrap';
import NavbarHeader from '../Navbar/Navbar';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);

  // Function to fetch basket items from the backend
  useEffect(() => {
    const fetchBasketItems = async () => {
      const response = await fetch('basket.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'mode': 'cors',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBasketItems(data);
      } else {
        console.error('Failed to fetch basket items');
      }
    };

    fetchBasketItems();
  }, []);

  const removeItem = (itemId) => {
    setBasketItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const totalPrice = basketItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <Container>
      <NavbarHeader />
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Basket</Breadcrumb.Item>
      </Breadcrumb>
      <h1>Basket</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Item Photo</th>
            <th>Item ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          
          {basketItems.map((item, index) => (
            <tr key={item.id}>
              <td>{item.photo}</td>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <Button variant="danger" onClick={() => removeItem(item.id)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end">
        <strong>Total Price: ${totalPrice}</strong>
      </div>
      <div className="text-end mt-3">
       <a href='/checkout'><Button variant="primary">Proceed to Checkout</Button></a>
       <a href='/homepage'><Button variant="secondary" className="ms-2">Continue Shopping</Button></a>
      </div>
    </Container>
  );
};

export default Basket;
