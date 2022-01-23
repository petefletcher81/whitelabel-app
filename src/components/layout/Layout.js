import Script from "next/script";
import React, { useState } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import SideBar from "../sidebar/Sidebar";

const Layout = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = (value) => {
    const newValue = value;
    setToggle(newValue);
  };

  return (
    <>
      <Script
        src="https://kit.fontawesome.com/1b5d21fe5d.js"
        crossOrigin="anonymous"
      ></Script>
      <Navbar toggle={toggle} handleToggle={handleToggle} />
      {toggle && <SideBar />}
      <main className="main">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
