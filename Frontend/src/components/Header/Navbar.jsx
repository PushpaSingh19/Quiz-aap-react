import React, { useState } from "react";
import "../Header/NavbarStyles.css";
import { MenuItems } from "./MenuItems";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import Btn from "..//Button/Btn";

function Navbar(props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="NavbarItems">
      <img
        src="https://img.freepik.com/free-vector/stylish-colorful-question-mark-symbol-background-with-chat-boz-design-vector_1017-48024.jpg?t=st=1717137809~exp=1717141409~hmac=822d78045fd8398c2bdfc72dff0f55c2c7094de8597e11eec9fa128851bb374c&w=740"
        alt="Quiz Logo"
        className="navbar-logo"
      />
      <div className="menu-icons" onClick={handleClick}>
        {clicked ? <RxCross1 /> : <GiHamburgerMenu />}
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <a className={item.cName} href={item.url}>
              {item.title}
            </a>
          </li>
        ))}
        <Link to={props.url}>
          <Btn title={props.title} className="nav-button" />
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
