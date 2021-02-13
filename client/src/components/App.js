import React, { useEffect, useState } from "react";
import { getContent, getImages } from "../utils/apiCalls";
import "./style/App.scss";

const App = () => {
  const [content, setContent] = useState(null);
  const [images, setImages] = useState(null);

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const response = await getContent("home");
        setContent(response);
      } catch (error) {
        console.log(error);
      }
    };
    getHomeContent();
  }, []);

  useEffect(() => {
    const getHomeImages = async () => {
      try {
        const response = await getImages("home");
        // TODO - not getting images back correctly - need to check for image key
        const homeImages = response.filter(
          (homeImage) => homeImage.section === "home" && homeImage["image"]
        );
        setImages(homeImages);
      } catch (error) {
        console.log(error);
      }
    };
    getHomeImages();
  }, []);

  return (
    <>
      <div className="App">
        <nav aria-labelledby="page-navigation" role="navigation">
          <ul>Home</ul>
          <ul>About Us</ul>
          <ul>Contact Us</ul>
        </nav>
        {content &&
          content.map((section, index) => {
            return (
              <div className="content" key={section.id[index]}>
                <div
                  className="content__section-heading"
                  data-testid="section-heading"
                >
                  {section["heading"]}
                </div>
                <div
                  className="content__section-content"
                  data-testid="section-content"
                >
                  {section["content"]}
                </div>
                {images && (
                  <div>
                    <img src={images[index].image} />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default App;
