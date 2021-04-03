import React from "react";
import "./SideBar.scss";

const SideBar = ({ toggle }) => {
  return (
    <div className="sidebar w-full absolute">
      {toggle && (
        <div className="toggle-menu w-full flex">
          <ul>
            <li className="flex justify-center h-4">
              <a>Home</a>
            </li>

            <li className="flex justify-center h-4">
              <a>About Us</a>
            </li>

            <li className="flex justify-center h-4">
              <a>Contact Us</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideBar;
