// CategoryBar.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import All from '../Assets/Dropdown/All';
import Books from '../Assets/Dropdown/Books';
import Apparel from '../Assets/Dropdown/Apparel';
import SportsLeisure from '../Assets/Dropdown/Sports&Leisure';
import Kitchen from '../Assets/Dropdown/Kitchen';
import Electronics from '../Assets/Dropdown/Electronics';

const CategoryBar = () => (
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
);

export default CategoryBar;
