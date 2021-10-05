import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setHomepageContent,
  setHomepageContentError,
  setHomepageImageError,
  setHomepageImages,
} from "../../redux/content/homepage-content/homepage-content-actions";
import { getContent, getImages } from "../../utils/apiCalls";
import ContentCard from "../../utils/ContentCard";
import ContentError from "../../utils/contentError";
import "./HomePage.scss";

const HomePage = () => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.homepageContent.content);
  const images = useSelector((state) => state.homepageContent.images);
  const contentError = useSelector((state) => state.homepageContent.error);

  useEffect(() => {
    let componentMounted = true;
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
    return () => {
      componentMounted = false;
    };
  }, []);

  useEffect(() => {
    let componentMounted = true;
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
    return () => {
      componentMounted = false;
    };
  }, []);

  return (
    <section className="homepage relative" data-testid="homepage-section ">
      {contentError && !content && <ContentError error={contentError} />}
      {content &&
        images &&
        !contentError &&
        content.map((section, index) => {
          const positionIndex = index + 1;
          const findContent = content.find(
            (content) => content.position === positionIndex.toString()
          );

          return (
            <ContentCard
              content={findContent}
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
