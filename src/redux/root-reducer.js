import HomepageContentReducer from "./content/homepage-content/homepage-content-reducer";
import AboutusContentReducer from "./content/aboutus-content/aboutus-content-reducer";
import ContactusContentReducer from "./content/contactus-content/contactus-content-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  homepageContent: HomepageContentReducer,
  aboutusContent: AboutusContentReducer,
  contactusContent: ContactusContentReducer,
});

export default rootReducer;
