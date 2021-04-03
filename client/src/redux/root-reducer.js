import contentReducer from "./content/content-reducer";
import { combineReducers } from "redux";
import imageReducer from "./image/image-reducer";

const rootReducer = combineReducers({
  content: contentReducer,
  images: imageReducer,
});

export default rootReducer;
