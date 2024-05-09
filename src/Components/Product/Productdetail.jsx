import React, { useState, useEffect } from 'react';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { Container, Row, Col, Card, Button, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../contexts/ProductContext';

const ProductDetail = () => {
    const { selectedProduct, addToCart, cartItems } = useProductContext();
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        setCartItemCount(cartItems.length);
    }, [cartItems]);

    const handleOrder = () => {
        addToCart(selectedProduct);
    };

    return (
        <>
            <Navbar bg="light" expand="lg" className="mb-3">
                <Container>
                    <Navbar.Brand href="/">Campus<span style={{ color: 'red' }}>Price</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link href="/login">Sign in</Nav.Link>
                            <Nav.Link href="/signup">Register</Nav.Link>
                            <Nav.Link href="/sellers">Sell</Nav.Link>
                            <Nav.Link href="#">Watchlist</Nav.Link>
                            <Nav.Link href="/profilepage">Profile <FaUser /></Nav.Link>
                            <Nav.Link as={Link} to="/Basket">
                                Cart <FaShoppingCart /> {cartItemCount > 0 && <span className="badge bg-secondary">{cartItemCount}</span>}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-3">
                {selectedProduct && (
                    <Card>
                        <Row className="g-0">
                            <Col md={6}>
                                <Card.Img
                                    src={`data:image/jpeg;base64,${selectedProduct.ImageNo1}`}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/150';
                                    }}
                                    alt={selectedProduct.Name} />
                            </Col>
                            <Col md={6}>
                                <Card.Body>
                                    <Card.Title>{selectedProduct.Name}</Card.Title>
                                    <Card.Text>Price: {selectedProduct.Price}</Card.Text>
                                    <Card.Text>Description: {selectedProduct.Description}</Card.Text>
                                    <Card.Text>Category: {selectedProduct.Category}</Card.Text>
                                    <Button variant="primary" onClick={handleOrder}>Order Now</Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                )}
            </Container>
        </>
    );
};

export default ProductDetail;
