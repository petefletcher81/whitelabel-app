import { applyMiddleware, createStore } from "redux";
// import logger from "redux-logger";
import rootReducer from "./root-reducer";

const middlewares = [];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default { store };
