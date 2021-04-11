import HomepageContentReducer from "./content/homepage-content/homepage-content-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  homepageContent: HomepageContentReducer,
});

export default rootReducer;
