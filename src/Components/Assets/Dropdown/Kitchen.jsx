import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

function Kitchen() {
  
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: "teal"}}>
        Kitchen
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Pots/Pans</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Appliances</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Cutlery</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Kitchen;