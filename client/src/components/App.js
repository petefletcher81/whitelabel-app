import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import AboutUs from "./aboutus/AboutUs";
import "./App.scss";
import ContactUs from "./contactus/ContactUs";
import Dashboard from "./dashboard/Dashboard";
import HomePage from "./homepage/HomePage";
import Layout from "./layout/Layout";
import ContentModal from "./modal/ContentModal";
import ImageModal from "./modal/ImageModal";
import SignIn from "./signin/SignIn";

export const UserContext = React.createContext({});

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setToggleContentModal] = useState(null);
  let authenticated;
  let admin;

  const token = localStorage.token;

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      authenticated = false;
      //signout user
    } else {
      authenticated = true;
    }
  }

  if (authenticated === true) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.admin === true) {
      admin = true;
    } else {
      admin = false;
    }
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ admin }}>
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
            {/* {authenticated && admin && ( */}
            <Route
              exact
              path="/dashboard"
              component={() => (
                <Dashboard setToggleContentModal={setToggleContentModal} />
              )}
            />
            {/* )} */}
          </Switch>
          {selectedImage && (
            <ImageModal
              imgUrl={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          )}
          {content && (
            <ContentModal
              data={content}
              setToggleContentModal={setToggleContentModal}
            />
          )}
        </Layout>
      </UserContext.Provider>
    </div>
  );
};

export default App;
