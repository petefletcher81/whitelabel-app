import React from "react";
import "./Modal.scss";

const ImageModal = ({ imgUrl, setSelectedImage }) => {
  return (
    <div
      className="backdrop w-full h-full"
      data-testid="backdrop"
      onClick={(e) => {
        setSelectedImage(null);
      }}
    >
      <img
        src={imgUrl}
        alt="selected gallery image"
        className="shadow-1 border-primary"
      />
    </div>
  );
};

export default ImageModal;
