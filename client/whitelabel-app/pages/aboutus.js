import React from "react";
import ContentCard from "../components/contentCard/ContentCard";
import Gallery from "../components/gallery/Gallery";
import useSetSelected from "../customHooks/useSetSelectedImage";
import { getAllImages, getContent } from "../pages/api/apiCalls";
import ContentError from "../utils/contentError";

// how do we pass set~Selected
const AboutUs = ({ content, images }) => {
  const setSelected = useSetSelected("Image");
  const contentError =
    !content || !images
      ? { message: "Missing content / Failed to load" }
      : null;

  return (
    <section
      className="aboutus relative flex flex-col"
      data-testid="aboutus-section "
    >
      <div className="bg-white w-full">
        {contentError && (!content || !images) && (
          <ContentError error={contentError} />
        )}
        {content && !contentError && (
          <ContentCard content={content[0]} customStyles={{ content: "" }} />
        )}
      </div>
      <Gallery
        images={images}
        onClickEvent={setSelected?.setSelectedImage}
        page="aboutus"
      />
      <div className="bg-white w-full">
        {content && !contentError && (
          <ContentCard customStyles={{ content: "" }} content={content[1]} />
        )}
      </div>
    </section>
  );
};

export async function getStaticProps() {
  const [content, images] = await Promise.all([
    getContent("aboutus"),
    getAllImages(),
  ]);

  return {
    props: { content, images }, // will be passed to the page component as props
  };
}

export default AboutUs;
