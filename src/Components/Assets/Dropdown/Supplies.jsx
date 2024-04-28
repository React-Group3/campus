import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

function Supplies() {

  return (
    <Dropdown >
    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: "teal"}}>
      Supplies
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">Top Sellers</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Subject</Dropdown.Item>
      <Dropdown.Item href="#/action-3">New Arrivals</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  );
}

export default Supplies;