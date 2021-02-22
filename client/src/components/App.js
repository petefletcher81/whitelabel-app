import React, { useEffect, useState } from "react";
import { getContent, getImages } from "../utils/apiCalls";
import "./style/App.scss";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import ContentError from "../utils/contentError";

const App = () => {
  const [content, setContent] = useState(null);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const response = await getContent("home");
        setContent(response);
      } catch (error) {
        const data = error.response?.data;
        setError(data);
      }
    };
    getHomeContent();
  }, []);

  useEffect(() => {
    const getImageContent = async () => {
      try {
        const response = await getImages();
        const homeImages = response.filter((homeImage) => {
          return homeImage.section === "home" && homeImage["image"];
        });
        setImages(homeImages);
      } catch (error) {
        const data = error.response?.data;
        setError(data);
      }
    };
    getImageContent();
  }, []);

  return (
    <div className="App">
      <section className="navbar">
        <Navbar />
      </section>
      {error && !content && <ContentError error={error} />}
      {content &&
        !error &&
        content.map((section, index) => {
          return (
            <section className={`content-${index}`} key={section.id[index]}>
              <div className="container grid">
                <div className="content-wrapper">
                  <div className="content__section-heading">
                    {section["heading"]}
                  </div>
                  <div className="content__section-content">
                    {section["content"]}
                  </div>
                </div>
                {images && (
                  <div className="content-image-wrapper">
                    <div className="content__section-image-wrapper">
                      <img src={images[index].image} />
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      <Footer />
    </div>
  );
};

export default App;
