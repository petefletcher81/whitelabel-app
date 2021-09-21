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
import Gallery from "../gallery/Gallery";
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
      <Gallery images={images} onClickEvent={setSelectedImage} page="aboutus" />
      {content && !contentError && <ContentCard content={content[1]} />}
    </section>
  );
};

export default AboutUs;
