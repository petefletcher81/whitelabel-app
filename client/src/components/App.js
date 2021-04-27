import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./homepage/HomePage";
import AboutUs from "./aboutus/AboutUs";
import Modal from "./modal/Modal";
import "./App.scss";
import ContactUs from "./contactus/ContactUs";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/aboutus"
            component={() => <AboutUs setSelectedImage={setSelectedImage} />}
          />
          <Route exact path="/contactus" component={ContactUs} />
        </Switch>
        {selectedImage && (
          <Modal imgUrl={selectedImage} setSelectedImage={setSelectedImage} />
        )}
      </Layout>
    </div>
  );
};

export default App;
