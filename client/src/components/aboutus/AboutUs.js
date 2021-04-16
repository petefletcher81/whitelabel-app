import React, { useEffect } from "react";
import { getContent, getAllImages } from "../../utils/apiCalls";
import { useSelector, useDispatch } from "react-redux";
import {
  setAboutusContent,
  setAboutusContentError,
  setAboutusImageError,
  setAboutusImages,
} from "../../redux/content/aboutus-content/aboutus-content-actions";
import ContentError from "../../utils/contentError";
import "./AboutUs.scss";

const AboutUs = () => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.aboutusContent.content);
  const images = useSelector((state) => state.aboutusContent.images);
  const contentError = useSelector((state) => state.aboutusContent.error);

  let contentSection1;
  let contentSection2;

  useEffect(() => {
    const getAllContent = async () => {
      try {
        const response = await getContent("aboutus");
        dispatch(setAboutusContent(response));
      } catch (error) {
        const data = error.response?.data;
        dispatch(setAboutusContentError(data));
      }
    };
    getAllContent();
  }, []);

  useEffect(() => {
    const getImageContent = async () => {
      try {
        const response = await getAllImages();
        dispatch(setAboutusImages(response));
      } catch (error) {
        const data = error.response?.data;
        dispatch(setAboutusImageError(data));
      }
    };
    getImageContent();
  }, []);

  if (content) {
    contentSection1 = content[0];
    contentSection2 = content[1];
  }

  console.log(images);

  return (
    <section
      className="aboutus relative flex flex-col"
      data-testid="aboutus-section "
    >
      {contentError && !content && <ContentError error={contentError} />}
      {/* TODO - create cards from the content sections */}
      {contentSection1 && !contentError && (
        <div className="content">
          <div className={`content-0`}>
            <div className="container grid">
              <div className="content-text-wrapper">
                <div className="content__section-heading flex m-1 heading border-bottom-primary">
                  {contentSection1["heading"]}
                </div>
                <div className="content__section-content mx-1 mb-2">
                  {contentSection1["content"]}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="gallery grid">
        {images &&
          images.map((image, index) => {
            if (image.image) {
              return (
                <div
                  className="gallery__image-container w-full h-full relative hidden"
                  data-testid={`gallery-image-${index}`}
                  key={image.id}
                >
                  <img src={image.image} className="w-full h-full" />
                </div>
              );
            }
          })}
      </div>

      {contentSection2 && !contentError && (
        <div className="content">
          <div className={`content-2`}>
            <div className="container grid">
              <div className="content-text-wrapper">
                <div className="content__section-heading flex m-1 heading border-bottom-primary">
                  {contentSection2["heading"]}
                </div>
                <div className="content__section-content mx-1 mb-2">
                  {contentSection2["content"]}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutUs;
