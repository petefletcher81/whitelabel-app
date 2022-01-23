import { HomepageActionTypes } from "./homepage-content-types";

export const setHomepageContent = (content) => {
  return {
    type: HomepageActionTypes.SET_HOMEPAGE_CONTENT,
    payload: content,
  };
};

export const setHomepageContentError = (error) => {
  return {
    type: HomepageActionTypes.SET_HOMEPAGE_CONTENT_ERROR,
    payload: error,
  };
};

export const setHomepageImages = (images) => {
  return {
    type: HomepageActionTypes.SET_HOMEPAGE_IMAGE,
    payload: images,
  };
};

export const setHomepageImageError = (error) => {
  return {
    type: HomepageActionTypes.SET_HOMEPAGE_IMAGE_ERROR,
    payload: error,
  };
};
