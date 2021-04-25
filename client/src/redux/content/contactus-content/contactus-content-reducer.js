import { ContactusActionTypes } from "./contactus-content-types";

const initialState = {
  content: null,
  baneers: null,
  error: null,
  imageError: null,
};

const ContactusContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ContactusActionTypes.SET_CONTACTUS_CONTENT: {
      let newState = { ...state };
      newState.content = action.payload;
      return newState;
    }
    case ContactusActionTypes.SET_CONTACTUS_CONTENT_ERROR: {
      let newState = { ...state };
      newState.error = action.payload;
      return newState;
    }
    case ContactusActionTypes.SET_CONTACTUS_IMAGE: {
      let newState = { ...state };
      newState.banners = action.payload;
      return newState;
    }
    case ContactusActionTypes.SET_CONTACTUS_IMAGE_ERROR: {
      let newState = { ...state };
      newState.imageError = action.payload;
      return newState;
    }

    default:
      return state;
  }
};

export default ContactusContentReducer;
