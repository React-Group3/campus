import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';

function Apparel() {
  // State to manage whether the dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown state
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: "teal"}}>
        Apparel
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Men</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Women</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Apparel;

//Apparel Sports & Leisure Food Kitchen Electronics 