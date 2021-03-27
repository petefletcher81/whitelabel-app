import { ContentActionTypes } from "./content-types";

export const setContent = (content) => {
  return {
    type: ContentActionTypes.SET_CONTENT,
    payload: content,
  };
};

export const setContentError = (error) => {
  return {
    type: ContentActionTypes.SET_CONTENT_ERROR,
    payload: error,
  };
};
