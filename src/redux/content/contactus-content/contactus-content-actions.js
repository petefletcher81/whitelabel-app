import { ContactusActionTypes } from "./contactus-content-types";

export const setContactusContent = (content) => {
  return {
    type: ContactusActionTypes.SET_CONTACTUS_CONTENT,
    payload: content,
  };
};

export const setContactusContentError = (error) => {
  return {
    type: ContactusActionTypes.SET_CONTACTUS_CONTENT_ERROR,
    payload: error,
  };
};

export const setContactusImages = (images) => {
  return {
    type: ContactusActionTypes.SET_CONTACTUS_IMAGE,
    payload: images,
  };
};

export const setContactusImageError = (error) => {
  return {
    type: ContactusActionTypes.SET_CONTACTUS_IMAGE_ERROR,
    payload: error,
  };
};
