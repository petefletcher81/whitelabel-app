import { ContentActionTypes } from "./content-types";

const initialState = {
  allContent: null,
  error: null,
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ContentActionTypes.SET_CONTENT: {
      let newState = { ...state };
      newState.allContent = action.payload;
      return newState;
    }
    case ContentActionTypes.SET_CONTENT_ERROR: {
      let newState = { ...state };
      newState.error = action.payload;
      return newState;
    }

    default:
      return state;
  }
};

export default contentReducer;
