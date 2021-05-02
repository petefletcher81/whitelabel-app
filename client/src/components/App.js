import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import AboutUs from "./aboutus/AboutUs";
import "./App.scss";
import ContactUs from "./contactus/ContactUs";
import HomePage from "./homepage/HomePage";
import Layout from "./layout/Layout";
import Modal from "./modal/Modal";
import SignIn from "./signin/SignIn";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/admin" component={SignIn} />
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
