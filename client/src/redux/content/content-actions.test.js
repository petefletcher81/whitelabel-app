import * as actions from "../content/content-actions";
import * as types from "../content/content-types";

describe("Content actions", () => {
  it("should create an action to add content", () => {
    const content = { content: "heading 1" };
    const expectedAction = {
      type: types.ContentActionTypes.SET_CONTENT,
      payload: content,
    };
    expect(actions.setContent(content)).toEqual(expectedAction);
  });

  it("should create an action to set error content", () => {
    const content = { message: "error 1" };
    const expectedAction = {
      type: types.ContentActionTypes.SET_CONTENT_ERROR,
      payload: content,
    };
    expect(actions.setContentError(content)).toEqual(expectedAction);
  });
});
