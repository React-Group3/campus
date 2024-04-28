import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

function SportsLeisure() {

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: "teal"}}>
        Sports & Leisure
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Top Sellers</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Equipment</Dropdown.Item>
        <Dropdown.Item href="#/action-3">New Arrivals</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SportsLeisure;