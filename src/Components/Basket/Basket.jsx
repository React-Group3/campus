import React from 'react';
import './Basket.css';
import { Container, Table, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import NavbarHeader from '../Navbar/Navbar';
import { useProductContext } from '../../contexts/ProductContext'; // Import the context hook

const Basket = () => {
  const { cartItems, removeItem } = useProductContext(); // Get cart items and removeItem function from context

  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.Price), 0).toFixed(2);

  return (
    <Container>
      {/* <NavbarHeader /> */}
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
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td><img src={`data:image/jpeg;base64,${item.ImageNo1}`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150';
                }} alt="Product" /></td>
              <td>{index + 1}</td>
              <td>{item.Name}</td>
              <td>{item.Price}</td>
              <td>
                <Button variant="danger" onClick={() => removeItem(item.ProductID)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end">
        <strong>Total Price: £{totalPrice}</strong>
      </div>
      <div className="text-end mt-3">
        <Link to="/checkout">
          <Button variant="primary">Proceed to Checkout</Button>
        </Link>
        <Link to="/"><Button variant="secondary" className="ms-2">Continue Shopping</Button></Link>
      </div>
    </Container>
  );
};

export default Basket;
