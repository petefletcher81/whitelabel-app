import { ContentActionTypes } from "./content-types";

const initialState = {
  allContent: null,
  error: null,
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ContentActionTypes.SET_CONTENT:
      return {
        ...state,
        allContent: action.payload,
        error: null,
      };

    case ContentActionTypes.SET_CONTENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default contentReducer;
