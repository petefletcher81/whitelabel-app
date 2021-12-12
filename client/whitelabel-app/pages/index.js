import React from "react";
import ContentCard from "../utils/ContentCard";
import ContentError from "../utils/contentError";
import { getContent, getImages } from "./api/apiCalls";

const HomePage = ({ content, images }) => {
  const contentError =
    !content || !images
      ? { message: "Missing content / Failed to load" }
      : null;

  let isMobile;
  if (typeof window !== "undefined") {
    isMobile = window.innerWidth < 990;
  }

  const mobileStyles = isMobile && "px-1";

  return (
    <section className="homepage relative" data-testid="homepage-section ">
      {contentError && !content && <ContentError error={contentError} />}
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
              isMobile
              customStyles={{
                image: "object-cover h-500",
                container: isMobile ? "pb-4" : "my-3",
                content: mobileStyles ? mobileStyles : "pl-1",
              }}
            />
          );
        })}
    </section>
  );
};

export async function getStaticProps() {
  const [content, images] = await Promise.all([
    getContent("home"),
    getImages("home"),
  ]);

  return {
    props: { content, images }, // will be passed to the page component as props
  };
}

export default HomePage;
