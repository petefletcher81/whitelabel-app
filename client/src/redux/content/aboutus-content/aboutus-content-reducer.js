import { AboutusActionTypes } from "./aboutus-content-types";

const initialState = {
  content: null,
  images: null,
  error: null,
};

const AboutusContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case AboutusActionTypes.SET_ABOUTUS_CONTENT: {
      let newState = { ...state };
      newState.content = action.payload;
      return newState;
    }
    case AboutusActionTypes.SET_ABOUTUS_CONTENT_ERROR: {
      let newState = { ...state };
      newState.error = action.payload;
      return newState;
    }
    case AboutusActionTypes.SET_ABOUTUS_IMAGE: {
      let newState = { ...state };
      newState.images = action.payload;
      return newState;
    }
    case AboutusActionTypes.SET_ABOUTUS_IMAGE_ERROR: {
      let newState = { ...state };
      newState.error = action.payload;
      return newState;
    }

    default:
      return state;
  }
};

export default AboutusContentReducer;
