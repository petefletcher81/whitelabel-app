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
}) => {
  const positionIndex = index + 1;

  let findImage;

  if (images) {
    findImage = images.find((image) => {
      return image.position === positionIndex.toString();
    });
  }

  return (
    <div className={`content-card bg-white my-2`} data-testid={testid}>
      {images && findImage && isBefore && (
        <div className={`content-image-wrapper-${index} flex `}>
          <img className={`${customStyles.image}`} src={findImage.image} />
        </div>
      )}
      <div className={`content-card__content`}>
        <div className={`flex`}>
          <div className={`content-text-wrapper-${index}`}>
            <div className={`content__section-heading my-1 heading`}>
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
          className={`content-image-wrapper-${index}  
            flex`}
        >
          <img className={`${customStyles.image}`} src={findImage.image} />
        </div>
      )}
    </div>
  );
};

export default ContentCard;
