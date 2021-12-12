import React, { useState } from "react";
import ImageModal from "../modal/ImageModal";

const Gallery = ({ images, onClickEvent, page, isSelected }) => {
  const gridStyles = page && `grid${page}`;
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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
                  setShowModal(true);
                  onClickEvent({ imageUrl, referrerPage, image, page });
                  setSelectedImage({ page, ...image });
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
      {showModal && (
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
