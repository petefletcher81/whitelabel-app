import { ImageActionTypes } from "./image-types";

const initialState = {
  allImages: null,
  error: null,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ImageActionTypes.SET_IMAGE:
      return {
        ...state,
        allContent: action.payload,
        error: null,
      };

    case ImageActionTypes.SET_IMAGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default imageReducer;
