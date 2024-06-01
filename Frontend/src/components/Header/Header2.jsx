import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Header2 = (props) => {
  const { fetchData } = props;

  return (
    <DropdownButton
      title="Languages"
      id="basic-nav-dropdown"
      className="custom-dropdown"
    >
      <Dropdown.Item onClick={() => fetchData(100)}>HTML</Dropdown.Item>
      <Dropdown.Item onClick={() => fetchData(200)}>CSS</Dropdown.Item>
      <Dropdown.Item onClick={() => fetchData(300)}>Python</Dropdown.Item>
      <Dropdown.Item onClick={() => fetchData(400)}>JavaScript</Dropdown.Item>
    </DropdownButton>
  );
};

export default Header2;
