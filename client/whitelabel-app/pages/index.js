import React from "react";
import ContentCard from "../components/contentCard/ContentCard";
import ContentError from "../utils/contentError";
import { getContent, getImages } from "./api/apiCalls";

const HomePage = ({ content, images }) => {
  const contentError =
    !content || !images
      ? { message: "Missing content / Failed to load" }
      : null;

  return (
    <section className="homepage relative" data-testid="homepage-section">
      {contentError && (!content || !images) && (
        <ContentError error={contentError} />
      )}
      {content &&
        images &&
        !contentError &&
        content.map((section, index) => {
          const positionIndex = index + 1;
          const findContent = content.find(
            (homeContent) => homeContent.position === positionIndex.toString()
          );

          return (
            <ContentCard
              content={findContent}
              images={images}
              index={index}
              key={`${section.id}-${index}`}
              testid={"home-content"}
              customStyles={{
                image: "object-cover h-500",
                container: "whitelabel",
              }}
            />
          );
        })}
    </section>
  );
};

export async function getStaticProps(context) {
  const [content, images] = await Promise.all([
    getContent("home"),
    getImages("home"),
  ]);

  console.log(images);

  return {
    props: { content, images }, // will be passed to the page component as props
  };
}

export default HomePage;
