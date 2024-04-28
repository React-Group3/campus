import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
function Electronics() {

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: "teal"}}>
        Electronics
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Top Sellers</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Laptops/PCs</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Electronics;