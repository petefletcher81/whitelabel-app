import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { render as rtlRender } from "@testing-library/react";
import rootReducer from "../redux/root-reducer";

const reducer = rootReducer;
// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
function render(
  ui,
  {
    //give option of initialstate
    initialState,
    // give option of create own store data
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}

export * from "@testing-library/react";

export { render };
