import { useState } from "react";

const useSetSelected = (type) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setSelectedContent] = useState(null);

  if (!type) {
    return null;
  }

  const modalType = {
    Image: { selectedImage: selectedImage, setSelectedImage: setSelectedImage },
    Content: { content: content, setSelectedContent: setSelectedContent },
  };

  return modalType[type];
};

export default useSetSelected;
