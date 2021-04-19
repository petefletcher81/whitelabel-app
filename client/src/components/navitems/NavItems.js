import React from "react";
import { Link } from "react-router-dom";
import "./NavItems.scss";

const NavItems = () => {
  return (
    <div className="navitem flex">
      <li role="menuitem" aria-label="home navigation">
        <Link to="/">Home</Link>
      </li>
      <li role="menuitem" aria-label="about us navigation">
        <Link to="aboutus">About Us</Link>
      </li>
      <li role="menuitem" aria-label="contact us navigation">
        <Link to="/contactus">Contact Us</Link>
      </li>
    </div>
  );
};

export default NavItems;
