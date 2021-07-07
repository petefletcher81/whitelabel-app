import React from "react";
import NavItems from "../navitems/NavItems";
import "./Sidebar.scss";

const SideBar = () => {
  return (
    <div className="sidebar w-full absolute">
      <div className="toggle-menu w-full flex border-white shadow-1">
        <ul>
          <NavItems />
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
