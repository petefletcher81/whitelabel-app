import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { getContent, getImages } from "../utils/apiCalls";
import { setContent, setContentError } from "../redux/content/content-actions";
import { setImages, setImageError } from "../redux/image/image-actions";
import { useDispatch } from "react-redux";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import HomePage from "./HomePage/HomePage";
import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  // npm i redux redux-logger react-redux react-router-dom
  // Add switch and route - app.js
  // Add browser router to index.js
  // reverse engineer redux action to "get content"

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
        // TODO - set in redux
      } catch (error) {
        const data = error.response?.data;
        dispatch(setImageError(data));
      }
    };
    getImageContent();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
