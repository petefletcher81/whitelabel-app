import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Modal from "./modal/Modal";

import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import HomePage from "./homepage/HomePage";
import SideBar from "./sidebar/Sidebar";
import AboutUs from "./aboutus/AboutUs";
import "./App.scss";

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleToggle = () => {
    const newValue = !toggle;
    setToggle(newValue);
  };

  return (
    <div className="App">
      <Navbar handleToggle={handleToggle} />
      <SideBar toggle={toggle} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/aboutus"
          component={() => <AboutUs setSelectedImage={setSelectedImage} />}
        />
      </Switch>
      {selectedImage && (
        <Modal imgUrl={selectedImage} setSelectedImage={setSelectedImage} />
      )}
      <Footer />
    </div>
  );
};

export default App;
