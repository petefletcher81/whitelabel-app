import React, { useState } from "react";
import "./Navbar.scss";

const Navbar = ({ handleToggle }) => {
  const mobile = window.innerWidth < 990;

  return (
    <section className="navbar flex">
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
                <li>
                  <a>Home</a>
                </li>
                <li>
                  <a>About Us</a>
                </li>
                <li>
                  <a>Contact Us</a>
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
