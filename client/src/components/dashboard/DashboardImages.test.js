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
  let container = null;
  beforeEach(() => {
    container = document.createElement("div");
    const testid = document.createAttribute("data-testid");
    testid.value = "test-body";
    container.setAttributeNode(testid);
    document.body.appendChild(container);
  });

  afterEach(() => {
    cleanup();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  fit("should allow user to upload images from the dashboard", () => {
    const { enquiryContent, imageContent, allContent, footerContent } =
      contentBuilder();
    render(<DashboardImages images={imageContent} />, { container });

    screen.getByText("2021-01-31T06:46:28.342Z");

    const imageButton = screen.getByText("Upload Image");
    fireEvent.click(imageButton);

    const saveImage = screen.getByText("Save");
    fireEvent.click(saveImage);

    // expect(contentWindow.getElementsByClassName("shaded").length).toBe(1);
  });
});
