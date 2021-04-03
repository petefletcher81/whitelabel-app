import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { getContent, getImages } from "../utils/apiCalls";
import { setContent, setContentError } from "../redux/content/content-actions";
import { setImages, setImageError } from "../redux/image/image-actions";
import { useDispatch } from "react-redux";

import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import HomePage from "./homepage/HomePage";
import SideBar from "./sidebar/Sidebar";
import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  // npm i redux redux-logger react-redux react-router-dom
  // Add switch and route - app.js
  // Add browser router to index.js
  // reverse engineer redux action to "get content"

  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    const newValue = !toggle;
    setToggle(newValue);
  };

  useEffect(() => {
    const getAllContent = async () => {
      try {
        const response = await getContent("home");
        dispatch(setContent(response));
      } catch (error) {
        const data = error.response?.data;
        dispatch(setContentError(data));
      }
    };
    getAllContent();
  }, []);

  useEffect(() => {
    const getImageContent = async () => {
      try {
        const response = await getImages();
        dispatch(setImages(response));
      } catch (error) {
        const data = error.response?.data;
        dispatch(setImageError(data));
      }
    };
    getImageContent();
  }, []);

  return (
    <div className="App">
      <Navbar handleToggle={handleToggle} />
      <SideBar toggle={toggle} />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
