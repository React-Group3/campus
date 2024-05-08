import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import All from '../Assets/Dropdown/All';
import Books from '../Assets/Dropdown/Books';
import Apparel from '../Assets/Dropdown/Apparel';
import SportsLeisure from '../Assets/Dropdown/Sports&Leisure';
import Kitchen from '../Assets/Dropdown/Kitchen';
import Electronics from '../Assets/Dropdown/Electronics';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'
import ReactPaginate from 'react-paginate';
import { useProductContext } from '../../contexts/ProductContext';

export const NavbarHeader = () => {
  const location = useLocation();
  const { products } = useProductContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 9;
  const { selectProduct, cartItems } = useProductContext();
  const [cartItemCount, setCartItemCount] = useState(0);


  useEffect(() => {
    if (products) {
      const filtered = products?.filter(product =>
        product?.Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    setCartItemCount(cartItems.length);
}, [cartItems]);

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayedProducts = filteredProducts.slice(
    pageNumber * productsPerPage,
    (pageNumber + 1) * productsPerPage
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-3" style={{ padding: '20px' }}>
        <Container fluid>
          <Navbar.Brand href="#">Campus<span style={{ color: 'red' }}>Price</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link href="/login">Sign in</Nav.Link>
              <Nav.Link href="/signup">Register</Nav.Link>
              <Nav.Link href="/sellers">Sell</Nav.Link>
              <Nav.Link href="#">Watchlist</Nav.Link>
              <Nav.Link href="/profilepage">Profile <FaUser /></Nav.Link>
              <Nav.Link as={Link} to="/Basket">
              Cart <FaShoppingCart /> {cartItemCount > 0 && <span className="badge bg-secondary">{cartItemCount}</span>}
            </Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search for anything..."
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
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
          <Col xs={6} md={2}><a href="#"><Apparel /></a></Col>
          <Col xs={6} md={2}><a href="#"><SportsLeisure /></a></Col>
          <Col xs={6} md={2}><a href="#"><Kitchen /></a></Col>
          <Col xs={6} md={2}><a href="#"><Electronics /></a></Col>
        </Row>
      </Container>
      {location.pathname !== '/profilepage' && <CategoryBar />}
      <Container>
        <Row xs={1} md={3} className='mt-5'>
          {displayedProducts.map(result => (
            <Col key={result.ProductID} className="mb-3">
              <Card>
                <Card.Img
                  variant="top"
                  src={`data:image/jpeg;base64,${result.ImageNo1}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
                <Card.Body>
                  <Card.Title><Link to={`/product/${result.ProductID}`} onClick={() => selectProduct(result)} >{result.Name}</Link></Card.Title>
                  <p>{result.Price}</p>
                  <Card.Text>
                    {result.Description.length > 100 ? `${result.Description.substring(0, 100)}...` : result.Description}
                    {result.Category}
                  </Card.Text>
                  <Link to={`/product/${result.ProductID}`} onClick={() => selectProduct(result)} className='btn btn-primary'>View more</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
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
    const response = await fetch('../../data/products.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const json = await response.json();
    return Array.isArray(json) ? json : [json];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
