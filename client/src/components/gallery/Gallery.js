import React from "react";
import "./Gallery.scss";

const Gallery = ({ images, onClickEvent, page, isSelected }) => {
  const gridStyles = page && `grid${page}`;

  return (
    <div className={`gallery grid ${gridStyles}`}>
      {images &&
        images.map((image, index) => {
          const referrerPage = page;
          const imageProperty = image.image ? image.image : image.gallery;
          const imageUrl = imageProperty ? imageProperty : image.banner;

          return (
            <div
              className={`gallery__image-container w-full h-full relative hidden`}
              data-testid={`gallery-image-${index}`}
              key={`${image.id}-${index}`}
              onClick={() =>
                onClickEvent({ imageUrl, referrerPage, image, page })
              }
            >
              <img
                src={imageUrl}
                className={`w-full h-full ${
                  isSelected?.imageUrl === imageUrl && "opacity-low"
                } `}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Gallery;
