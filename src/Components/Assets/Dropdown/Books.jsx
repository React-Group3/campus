import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';

function Books() {
 
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dropdown>
     <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: "teal"}}>
        Books
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Top Sellers</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Subject</Dropdown.Item>
        <Dropdown.Item href="#/action-3">New Arrivals</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Books;