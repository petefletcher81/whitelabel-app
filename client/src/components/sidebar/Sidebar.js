import React from "react";
import NavItems from "../navitems/NavItems";
import "./SideBar.scss";

const SideBar = () => {
  return (
    <div className="sidebar w-full absolute">
      <div className="toggle-menu w-full flex">
        <ul>
          <NavItems />
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
