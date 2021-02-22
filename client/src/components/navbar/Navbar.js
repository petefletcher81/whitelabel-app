import React from "react";
import "../style/App.scss";

const Navbar = () => {
  return (
    <div className="container flex">
      <nav aria-labelledby="page-navigation" role="navigation" className="flex">
        <ul>
          <a>Home</a>
        </ul>
        <ul>
          <a>About Us</a>
        </ul>
        <ul>
          <a>Contact Us</a>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
