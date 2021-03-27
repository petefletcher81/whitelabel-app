import React from "react";
import "./Navbar.scss";

const Navbar = () => {
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
            <div className="menu-icon" role="button">
              <i className="fas fa-2x fa-bars" />{" "}
            </div>
          ) : (
            <div className="flex justify-between">
              <ul>
                <a>Home</a>
              </ul>
              <ul>
                <a>About Us</a>
              </ul>
              <ul>
                <a>Contact Us</a>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
