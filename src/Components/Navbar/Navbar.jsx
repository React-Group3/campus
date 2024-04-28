import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
// Category components
import All from '../Assets/Dropdown/All';
import Books from '../Assets/Dropdown/Books';
import Supplies from '../Assets/Dropdown/Supplies';
import Apparel from '../Assets/Dropdown/Apparel';
import SportsLeisure from '../Assets/Dropdown/Sports&Leisure';
import Kitchen from '../Assets/Dropdown/Kitchen';
import Electronics from '../Assets/Dropdown/Electronics';
import 'bootstrap/dist/css/bootstrap.min.css';
import { type } from '@testing-library/user-event/dist/type';

export const NavbarHeader = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    const postData = {
      search: searchInput,
    };
    console.log('Form Data:', postData);
    setSearchResults(PostData2(postData)); 
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-3" style={{ padding: '20px' }}>
        <Container fluid>
          <Navbar.Brand href="#">Campus<span style={{ color: 'red' }}>Price</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/login">Sign in</Nav.Link>
              <Nav.Link href="/signup">Register</Nav.Link>
              <Nav.Link href="/sellers">Sell</Nav.Link>
              <Nav.Link href="#">Watchlist</Nav.Link>
              <Nav.Link href="/profilepage">Profile <FaUser /></Nav.Link>
              <Nav.Link href="/Basket">Cart <FaShoppingCart /></Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search for anything..."
                className="me-2"
                aria-label="Search"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                style={{ width: '500px' }} // Increase the width here
              />
              <Button variant="outline-success" type="submit"><FaSearch /></Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {location.pathname !== '/profilepage' && ( // Hide the category bar on the profile page
        <Container style={{ backgroundColor: 'teal' }} id="itembar">
        <Row>
          <Col xs={6} md={2}><a href="#"><All /></a></Col>
          <Col xs={6} md={2}><a href="#"><Books /></a></Col>
          <Col xs={6} md={2}><a href="#"><Apparel/></a></Col>
          <Col xs={6} md={2}><a href="#"><SportsLeisure/></a></Col>
          <Col xs={6} md={2}><a href="#"><Kitchen/></a></Col>
          <Col xs={6} md={2}><a href="#"><Electronics /></a></Col>
        </Row>
      </Container>
      
      )}
      <Container>
          <div>
            <h1>{searchResults.Name}</h1>
            <h2>{searchResults.Price}</h2>
            <h3>{searchResults.Description}</h3>
            <h4>{searchResults.Category}</h4>
            <h5>{searchResults.ProductID}</h5>
          </div>
      </Container>
    </>
  );
};

export default NavbarHeader;

export function PostData2(data) {
    console.log("data: " + JSON.stringify(data));
    
    fetch('../backend/search.php', {
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
      console.log(data);
      const dataArray = Array.isArray(data) ? data : [data];
      console.log(dataArray);

      for (var i = 0; i < dataArray.length; i++) {
        var item = dataArray[i];
        console.log(item);
        console.log(item.Name);
        console.log(item.Price);
        console.log(item.Description);
        console.log(item.Category);
        console.log(item.ProductID);
      }
      return dataArray;
    //data:image/jpeg:base64

    });

}