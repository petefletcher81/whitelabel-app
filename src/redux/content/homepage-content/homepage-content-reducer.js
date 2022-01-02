import { HomepageActionTypes } from "./homepage-content-types";

const initialState = {
  content: null,
  images: null,
  error: null,
};

const HomepageContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case HomepageActionTypes.SET_HOMEPAGE_CONTENT: {
      let newState = { ...state };
      newState.content = action.payload;
      return newState;
    }
    case HomepageActionTypes.SET_HOMEPAGE_CONTENT_ERROR: {
      let newState = { ...state };
      newState.error = action.payload;
      return newState;
    }
    case HomepageActionTypes.SET_HOMEPAGE_IMAGE: {
      let newState = { ...state };
      newState.images = action.payload;
      return newState;
    }
    case HomepageActionTypes.SET_HOMEPAGE_IMAGE_ERROR: {
      let newState = { ...state };
      newState.error = action.payload;
      return newState;
    }

    default:
      return state;
  }
};

export default HomepageContentReducer;
