import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { updateImageContent } from "../../pages/api/apiCalls";
import Gallery from "../gallery/Gallery";

const ImageModal = ({ data, setSelectedImage, showModal }) => {
  const [selectedGridImage, setSelectedGridImage] = useState(null);
  const { imageUrl, page, relatedContent, images, image, gallery, banner } =
    data;

  const modalRef = React.useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (modalRef?.current?.contains(event.target)) {
        return;
      }
      showModal(false);
    };

    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

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

  const pageStyles = {
    aboutus: "w-50",
  };

  const modalContent = () => {
    if (!images) {
      return (
        <div
          className={`backdrop backdrop__${page} w-full h-full flex`}
          data-testid="backdrop"
          onClick={(e) => {
            !images ? setSelectedImage(null) : null;
          }}
        >
          <img
            src={gallery || image}
            ref={modalRef}
            alt="selected gallery image"
            className={`shadow-1 border-primary ${pageStyles[page]}`}
          />
        </div>
      );
    } else {
      return (
        <div
          className={`backdrop backdrop--${page} w-full h-full flex`}
          data-testid="backdrop"
          onClick={(e) => {
            !images ? setSelectedImage(null) : null;
          }}
        >
          <div
            className="bg-white flex flex-col justify-start h-vh75 scroll-y rounded-1 shadow-1 text-center w-80"
            ref={modalRef}
          >
            <h1 className="modal__heading-one text-primary border-primary shadow-soft p-1 w-full bg-white">
              Change Image
            </h1>
            <Gallery
              images={relatedContent ? filteredImages : images}
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
        </div>
      );
    }
  };

  return ReactDom.createPortal(
    modalContent(),
    document.getElementById("modal-root")
  );
};

export default ImageModal;
