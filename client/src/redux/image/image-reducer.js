import { ImageActionTypes } from "./image-types";

const initialState = {
  allImages: null,
  error: null,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ImageActionTypes.SET_IMAGE: {
      let newState = { ...state };
      newState.allImages = action.payload;
      return newState;
    }
    case ImageActionTypes.SET_IMAGE_ERROR: {
      let newState = { ...state };
      newState.error = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default imageReducer;
