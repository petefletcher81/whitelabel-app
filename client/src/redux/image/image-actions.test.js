import * as actions from "../image/image-actions";
import * as types from "../image/image-types";

describe("Content actions", () => {
  it("should create an action to add images", () => {
    const images = { images: "heading 1" };
    const expectedAction = {
      type: types.ImageActionTypes.SET_IMAGE,
      payload: images,
    };
    expect(actions.setImages(images)).toEqual(expectedAction);
  });

  it("should create an action to set error images", () => {
    const images = { message: "error 1" };
    const expectedAction = {
      type: types.ImageActionTypes.SET_IMAGE_ERROR,
      payload: images,
    };
    expect(actions.setImageError(images)).toEqual(expectedAction);
  });
});
