import React, { useState } from "react";
import ImageModal from "../modal/ImageModal";

const Gallery = ({ images, onClickEvent, page, isSelected }) => {
  const gridStyles = page && `grid${page}`;
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = React.useRef();

  return (
    <>
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
                onClick={() => {
                  isSelected && setShowModal(true);
                  onClickEvent({ imageUrl, referrerPage, image, page });
                  setSelectedImage({ page, ...image });
                  setShowModal(true);
                }}
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
      {showModal && (isSelected === null || isSelected === undefined) && (
        <div className="" ref={modalRef}>
          <ImageModal
            data={selectedImage}
            setSelectedImage={onClickEvent}
            showModal={setShowModal}
          />
        </div>
      )}
    </>
  );
};

export default Gallery;
