import React from "react";

const ContentCard = ({ content, images, index, testid }) => {
  const positionIndex = index + 1;
  let findImage;
  if (images) {
    findImage = images.find((image) => {
      return image.position === positionIndex.toString();
    });
  }

  return (
    <div className="content" data-testid={testid}>
      <div className={`content-${index}`}>
        <div className="container grid">
          <div className="content-text-wrapper">
            <div className="content__section-heading flex m-1 heading border-bottom-primary">
              {content["heading"]}
            </div>
            <div className="content__section-content mx-1 mb-2">
              {content["content"]}
            </div>
          </div>
          {images && (
            <div className="content-image-wrapper">
              <img src={findImage.image} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
