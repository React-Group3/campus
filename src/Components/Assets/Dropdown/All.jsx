import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

function All() {

  return (
    <Dropdown >
    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: "teal"}}>
      All
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">Apparel</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Books</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Electronics</Dropdown.Item>
        <Dropdown.Item href="#/action-4">Kitchen</Dropdown.Item>
        <Dropdown.Item href="#/action-5">Sports & Leisure</Dropdown.Item>
        <Dropdown.Item href="#/action-6">Supplies</Dropdown.Item>
        <Dropdown.Item href="#/action-7">Toys</Dropdown.Item>
        <Dropdown.Item href="#/action-8">Vehicles</Dropdown.Item>
        <Dropdown.Item href="#/action-9">Other</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  );
}

export default All;