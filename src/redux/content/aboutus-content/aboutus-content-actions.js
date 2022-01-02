import { AboutusActionTypes } from "./aboutus-content-types";

export const setAboutusContent = (content) => {
  return {
    type: AboutusActionTypes.SET_ABOUTUS_CONTENT,
    payload: content,
  };
};

export const setAboutusContentError = (error) => {
  return {
    type: AboutusActionTypes.SET_ABOUTUS_CONTENT_ERROR,
    payload: error,
  };
};

export const setAboutusImages = (images) => {
  return {
    type: AboutusActionTypes.SET_ABOUTUS_IMAGE,
    payload: images,
  };
};

export const setAboutusImageError = (error) => {
  return {
    type: AboutusActionTypes.SET_ABOUTUS_IMAGE_ERROR,
    payload: error,
  };
};
