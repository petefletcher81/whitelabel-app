import React, { useState } from "react";
import ContentError from "../../utils/contentError";
import { useSelector } from "react-redux";
import "./HomePage.scss";

const HomePage = () => {
  const content = useSelector((state) => state.content.allContent);
  const images = useSelector((state) => state.images.allImages);
  const contentError = useSelector((state) => state.content.error);
  return (
    <>
      {contentError && !content && <ContentError error={contentError} />}
      {content &&
        !contentError &&
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
