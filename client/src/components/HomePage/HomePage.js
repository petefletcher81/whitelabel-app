import React, { useState, useEffect } from "react";
import ContentError from "../../utils/contentError";
import { useSelector, useDispatch } from "react-redux";
import { getContent, getImages } from "../../utils/apiCalls";
import {
  setHomepageContent,
  setHomepageContentError,
  setHomepageImages,
  setHomepageImageError,
} from "../../redux/content/homepage-content/homepage-content-actions";
import "./HomePage.scss";

const HomePage = () => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.homepageContent.content);
  const images = useSelector((state) => state.homepageContent.images);
  const contentError = useSelector((state) => state.homepageContent.error);

  useEffect(() => {
    const getAllContent = async () => {
      try {
        const response = await getContent("home");
        dispatch(setHomepageContent(response));
      } catch (error) {
        const data = error.response?.data;
        dispatch(setHomepageContentError(data));
      }
    };
    getAllContent();
  }, []);

  useEffect(() => {
    const getImageContent = async () => {
      try {
        const response = await getImages("home");
        dispatch(setHomepageImages(response));
      } catch (error) {
        const data = error.response?.data;
        dispatch(setHomepageImageError(data));
      }
    };
    getImageContent();
  }, []);

  console.log("images", images);
  return (
    <section className="homepage relative" data-testid="homepage-section ">
      {contentError && !content && <ContentError error={contentError} />}
      {content &&
        images &&
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
    </section>
  );
};

export default HomePage;
