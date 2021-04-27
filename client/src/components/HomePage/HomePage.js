import React, { useEffect } from "react";
import ContentError from "../../utils/contentError";
import ContentCard from "../../utils/ContentCard";
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

  return (
    <section className="homepage relative" data-testid="homepage-section ">
      {contentError && !content && <ContentError error={contentError} />}
      {content &&
        images &&
        !contentError &&
        content.map((section, index) => {
          return (
            <ContentCard
              content={section}
              images={images}
              index={index}
              key={`${section.id}-${index}`}
              testid={"home-content"}
            />
          );
        })}
    </section>
  );
};

export default HomePage;
