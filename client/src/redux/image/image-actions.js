import { ImageActionTypes } from "./image-types";

export const setImages = (images) => {
  return {
    type: ImageActionTypes.SET_IMAGE,
    payload: images,
  };
};

export const setImageError = (error) => {
  return {
    type: ImageActionTypes.SET_IMAGE_ERROR,
    payload: error,
  };
};
