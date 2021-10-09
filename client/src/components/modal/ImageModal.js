import React, { useState } from "react";
import { updateImageContent } from "../../utils/apiCalls";
import Gallery from "../gallery/Gallery";
import "./Modal.scss";

const ImageModal = ({ data, setSelectedImage }) => {
  const [selectedGridImage, setSelectedGridImage] = useState(null);
  const { imageUrl, page, relatedContent, images } = data;
  let imageToGoToGallery;
  let filteredImages;

  // need to not include image that is already there
  if (relatedContent) {
    imageToGoToGallery = images
      .filter((image) => image.section === relatedContent.page)
      .find(
        (imagePosition) => imagePosition.position === relatedContent.position
      );

    filteredImages = images.filter(
      (image) => image.section !== imageToGoToGallery.section
    );
  }

  const handleSave = async () => {
    if (!imageToGoToGallery.gallery) {
      imageToGoToGallery.gallery = imageToGoToGallery.image
        ? imageToGoToGallery.image
        : imageToGoToGallery.banner;

      delete imageToGoToGallery.image;
    }
    // TODO - call breaking as its not relplacing the gallery for the selected image
    if (selectedGridImage.image.gallery) {
      selectedGridImage.image.image = selectedGridImage.image.gallery;
      delete selectedGridImage.image.gallery;
    }

    // 1st update we remove the image from the area of the page selected
    // page - what page image is coming from
    // section - what page the image is going to
    // position - what position if any
    try {
      const galleryImage = await updateImageContent(
        imageToGoToGallery.section,
        imageToGoToGallery,
        "aboutus"
      );
      const newlyPositionedImage = await updateImageContent(
        selectedGridImage.image.section,
        selectedGridImage.image,
        imageToGoToGallery.section,
        imageToGoToGallery.position
      );
      alert(galleryImage.message, newlyPositionedImage.message);
      setSelectedGridImage(null);
      setSelectedImage(null);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className={`backdrop backdrop--${page} w-full h-full flex`}
      data-testid="backdrop"
      onClick={(e) => {
        !data.images ? setSelectedImage(null) : null;
      }}
    >
      {data?.images || data?.banner ? (
        <div className="bg-white flex flex-col justify-start h-vh75 scroll-y rounded-1 shadow-1 text-center w-80">
          <h1 className="modal__heading-one text-primary border-primary shadow-soft p-1 w-full bg-white">
            Change Image
          </h1>
          <Gallery
            images={relatedContent ? filteredImages : data.images}
            onClickEvent={setSelectedGridImage}
            page="--dashboard"
            isSelected={selectedGridImage}
          />
          <div
            className="modal__buttons-wrapper-dashboard bg-white 
          flex mt-1 w-full p-1 shadow-1 justify-around"
          >
            <button className="btn p-1 shadow-soft" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn-tertiary p-1 shadow-soft"
              onClick={(e) => {
                setSelectedGridImage(null);
                setSelectedImage(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt="selected gallery image"
          className="shadow-1 border-primary"
        />
      )}
    </div>
  );
};

export default ImageModal;
