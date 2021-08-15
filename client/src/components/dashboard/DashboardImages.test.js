import React from "react";
import { unmountComponentAtNode } from "react-dom";
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "../../test-utils/custom-utils";
import { contentBuilder } from "../../test-utils/test-helpers";
import DashboardImages from "./DashboardImages";

describe("Dashboard", () => {
  // TODO - test api call
  let container = null;
  beforeEach(() => {
    container = document.createElement("div");
    const testid = document.createAttribute("data-testid");
    testid.value = "test-body";
    container.setAttributeNode(testid);
    document.body.appendChild(container);
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("should render alert if user clicks svae withou uploading image", () => {
    const mockAlert = jest.fn();
    let originalGlobalAlert = global.aler;
    global.alert = mockAlert;

    const { imageContent } = contentBuilder();

    render(<DashboardImages images={imageContent} />, { container });

    screen.getByText("2021-01-31T06:46:28.342Z");
    const saveImage = screen.getByText("Save");
    fireEvent.click(saveImage);

    expect(mockAlert).toHaveBeenCalledWith("Please upload an image");
    global.alert = originalGlobalAlert;
  });

  it("should allow user to upload images from the dashboard", () => {
    const mockAlert = jest.fn();
    let originalGlobalAlert = global.aler;
    global.alert = mockAlert;

    let file;
    file = new File(["(□_□)"], "test.png", { type: "image/png" });

    const { imageContent } = contentBuilder();

    render(<DashboardImages images={imageContent} />, { container });

    screen.getByText("2021-01-31T06:46:28.342Z");

    const imageButton = screen.getByTestId("handle-image-change");
    fireEvent.change(imageButton, { target: { files: [file] } });

    let image = document.getElementById("image-input");
    // check the file is selected
    expect(image.files[0].name).toBe("test.png");

    const saveImage = screen.getByText("Save");
    fireEvent.click(saveImage);
    global.alert = originalGlobalAlert;
  });

  it("should render correct content on mobile", () => {
    const { imageContent } = contentBuilder();
    render(<DashboardImages images={imageContent} mobile={true} />, {
      container,
    });

    screen.getByText("Add Image");
    screen.getByText("Edit Image");
  });

  it("should render correct content on mobile", () => {
    const { imageContent } = contentBuilder();
    render(<DashboardImages images={imageContent} mobile={false} />, {
      container,
    });

    screen.getByText("Want to add an image?");
    screen.getByText("Want to edit an image?");
    screen.getByText("Name");
    screen.getByText("Created At");
  });
});
