import React, { useEffect, useState } from "react";
import { getContent, getImages } from "../../utils/apiCalls";
import ContentError from "../../utils/contentError";
import "./HomePage.scss";

const HomePage = () => {
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
    <>
      {error && !content && <ContentError error={error} />}
      {content &&
        !error &&
        content.map((section, index) => {
          return (
            <div className="content" key={section.id[index]}>
              <div className={`content-${index}`}>
                <div className="container grid">
                  <div className="content-text-wrapper">
                    <div className="content__section-heading flex m-1 heading border-bottom-primary">
                      {section["heading"]}
                    </div>
                    <div className="content__section-content mx-1">
                      {section["content"]}
                    </div>
                  </div>
                  {images && (
                    <div className="content-image-wrapper">
                      <img src={images[index].image} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default HomePage;
