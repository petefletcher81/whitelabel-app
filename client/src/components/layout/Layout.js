import React, { useState, useEffect } from "react";
import SideBar from "../sidebar/SideBar";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
const Layout = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = (value) => {
    const newValue = value;
    setToggle(newValue);
  };

  return (
    <>
      <Navbar toggle={toggle} handleToggle={handleToggle} />
      {toggle && <SideBar />}
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
