import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

    const OrderConfirm = () => {
        return (
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Order Confirmation</Card.Title>
                                <Card.Text>
                                    Thank you for your order! Your order has been confirmed and will be processed shortly.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    };

    export default OrderConfirm;