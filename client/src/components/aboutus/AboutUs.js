import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAboutusContent,
  setAboutusContentError,
  setAboutusImageError,
  setAboutusImages,
} from "../../redux/content/aboutus-content/aboutus-content-actions";
import { getAllImages, getContent } from "../../utils/apiCalls";
import ContentCard from "../../utils/ContentCard";
import ContentError from "../../utils/contentError";
import "./AboutUs.scss";

const AboutUs = ({ setSelectedImage }) => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.aboutusContent.content);
  const images = useSelector((state) => state.aboutusContent.images);
  const contentError = useSelector((state) => state.aboutusContent.error);

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

  return (
    <section
      className="aboutus relative flex flex-col"
      data-testid="aboutus-section "
    >
      {contentError && !content && <ContentError error={contentError} />}
      {content && !contentError && <ContentCard content={content[0]} />}
      <div className="gallery grid">
        {images &&
          images.map((image, index) => {
            if (image.image) {
              return (
                <div
                  className="gallery__image-container w-full h-full relative hidden"
                  data-testid={`gallery-image-${index}`}
                  key={`${image.id}-${index}`}
                  onClick={() => setSelectedImage(image.image)}
                >
                  <img src={image.image} className="w-full h-full" />
                </div>
              );
            }
          })}
      </div>
      {content && !contentError && <ContentCard content={content[1]} />}
    </section>
  );
};

export default AboutUs;
