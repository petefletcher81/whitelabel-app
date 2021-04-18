import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = ({ handleToggle }) => {
  const mobile = window.innerWidth < 990;

  return (
    <section className="navbar flex" role="menu">
      <div className="container flex mx-1 justify-between w-full">
        <div className="logo heading-sm">Whitelabel Website</div>
        <nav
          aria-labelledby="page-navigation"
          role="navigation"
          className="flex"
        >
          {mobile ? (
            <div className="menu-icon" role="button" onClick={handleToggle}>
              <i className="fas fa-2x fa-bars" />{" "}
            </div>
          ) : (
            <div>
              <ul className="flex justify-between">
                <li role="menuitem" aria-label="home navigation">
                  <Link to="/">Home</Link>
                </li>
                <li role="menuitem" aria-label="about us navigation">
                  <Link to="aboutus">About Us</Link>
                </li>
                <li role="menuitem" aria-label="contact us navigation">
                  <Link to="/contactus">Contact Us</Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
