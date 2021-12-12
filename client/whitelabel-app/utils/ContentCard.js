import React from "react";

const ContentCard = ({
  content,
  images,
  index,
  testid,
  customStyles = {
    container: "",
    image: "",
    content: "",
    wrapper: "",
  },
  isBefore = false,
  isAfter = true,
  isMobile,
}) => {
  const positionIndex = index + 1;

  let findImage;

  if (images) {
    findImage = images.find((image) => {
      return image.position === positionIndex.toString();
    });
  }

  const mobileStyles = "pb-1 px-2 w-full";

  return (
    <div
      className={`flex bg-white my-2 ${isMobile ? "flex-col" : "h-500"} ${
        customStyles.container
      }`}
      data-testid={testid}
    >
      {images && findImage && isBefore && (
        <div
          className={`content-image-wrapper-${index}  ${
            isMobile && mobileStyles
          } ${isMobile ? customStyles.wrapper : ""} flex w-500`}
        >
          <img className={`${customStyles.image}`} src={findImage.image} />
        </div>
      )}
      <div className={`content-${index} ${isMobile ? "w-full flex" : ""}`}>
        <div className={`flex w-500`}>
          <div
            className={`content-text-wrapper-${index} ${customStyles.content}`}
          >
            <div
              className={`content__section-heading my-1 heading  ${
                isMobile ? "text-center" : ""
              }`}
            >
              {content["heading"]}
            </div>
            <div className="content__section-content mx-1 mb-2">
              {content["content"]}
            </div>
          </div>
        </div>
      </div>
      {images && findImage && isAfter && !isBefore && (
        <div
          className={`content-image-wrapper-${index} w-500 ${
            isMobile && mobileStyles
          }  flex`}
        >
          <img className={`${customStyles.image}`} src={findImage.image} />
        </div>
      )}
    </div>
  );
};

export default ContentCard;
