import React, { useEffect, useState } from "react";
import "./App.scss";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import HomePage from "./HomePage/HomePage";

const App = () => {
  return (
    <div className="App">
      <section className="navbar flex">
        <Navbar />
      </section>
      <div className="d">
        <HomePage />
      </div>
      <Footer />
    </div>
  );
};

export default App;
