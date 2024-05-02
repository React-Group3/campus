import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { Card} from 'react-bootstrap';

// Category components
import All from '../Assets/Dropdown/All';
import Books from '../Assets/Dropdown/Books';
import Supplies from '../Assets/Dropdown/Supplies';
import Apparel from '../Assets/Dropdown/Apparel';
import SportsLeisure from '../Assets/Dropdown/Sports&Leisure';
import Kitchen from '../Assets/Dropdown/Kitchen';
import Electronics from '../Assets/Dropdown/Electronics';
import 'bootstrap/dist/css/bootstrap.min.css';

export const NavbarHeader = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const location = useLocation();

  const handleSearch = async (e) => {
    e.preventDefault();
    const postData = {
      search: searchInput,
    };
    try {
      const results = await PostData2(postData);
      setSearchResults(results);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
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
              {/* Nav Links */}
            <Form className="d-flex" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search for anything..."
                className="me-2"
                aria-label="Search"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                style={{ width: '500px' }}
              />
              <Button variant="outline-success" type="submit"><FaSearch /></Button>
            </Form>
            
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
      {location.pathname !== '/profilepage' && <CategoryBar />}
      <Container>
        {searchResults.map(result => (
          <Card key={result.ProductID} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={'data:image/jpeg;base64,${result.Image1}'}/>
            <Card.Body>
            <Card.Title>{result.Name}</Card.Title>
            <p>{result.Price}</p>
            <Card.Text>
              {result.Description}
              {result.Category}
            </Card.Text>
            <Button variant="primary">Add to Cart</Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
};
export default NavbarHeader;

const CategoryBar = () => (
  <Container style={{ backgroundColor: 'teal' }} id="itembar">
    <Row>
    </Row>
  </Container>
);

async function PostData2(data) {
  try {
    const response = await fetch('../backend/search.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const json = await response.json();
    return Array.isArray(json) ? json : [json];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // rethrow the error for further handling
  }
}