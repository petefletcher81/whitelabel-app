import nock from "nock";
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "../../test-utils/custom-utils";
import { contentBuilder, nockGetHelper } from "../../test-utils/test-helpers";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  let container = null;
  beforeEach(() => {
    nock.disableNetConnect();
    container = document.createElement("div");
    const testid = document.createAttribute("data-testid");
    testid.value = "test-body";
    container.setAttributeNode(testid);
    document.body.appendChild(container);
  });

  afterEach(() => {
    nock.cleanAll();
    cleanup();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("should render component ", async () => {
    const { enquiryContent, allContent, imageContent } = contentBuilder();

    const enquiry = nockGetHelper("enquiries", enquiryContent);
    const content = nockGetHelper("content", allContent);
    const images = nockGetHelper("images", imageContent);

    render(<Dashboard />, { container });
    screen.getByText("Dashboard");
    await screen.findByText("test1@test.com");

    content.done();
    images.done();
    enquiry.done();
  });

  it("should render content for pages / enquiries and images ", async () => {
    const { enquiryContent, imageContent, allContent } = contentBuilder();
    const enquiry = nockGetHelper("enquiries", enquiryContent);
    const content = nockGetHelper("content", allContent);
    const images = nockGetHelper("images", imageContent);

    render(<Dashboard />, { container });

    await screen.findByText("test");
    screen.getAllByText("Heading 1");
    screen.getByText("https://test-for-home");

    enquiry.done();
    images.done();
    content.done();
  });

  it("should allow user to edit content of selected area by pressing edit", async () => {
    const mockSetToggleContentModal = jest.fn();
    const { enquiryContent, imageContent, allContent } = contentBuilder();
    const enquiry = nockGetHelper("enquiries", enquiryContent);
    const content = nockGetHelper("content", allContent);
    const images = nockGetHelper("images", imageContent);

    render(<Dashboard setToggleContentModal={mockSetToggleContentModal} />, {
      container,
    });

    await screen.findByText("test");

    const contentWindow = screen.getByTestId("manage-content");
    const [contentButton] = within(contentWindow).getAllByText("Edit");
    fireEvent.click(contentButton);

    expect(mockSetToggleContentModal).toHaveBeenCalled();

    const contentWindow2 = screen.getByTestId("manage-enquiries");
    const [contentButton2] = within(contentWindow2).getAllByText("Edit");
    fireEvent.click(contentButton2);

    expect(mockSetToggleContentModal).toHaveBeenCalled();

    const contentWindow3 = screen.getByTestId("manage-images");
    const [contentButton3] = within(contentWindow3).getAllByText("Edit");
    fireEvent.click(contentButton3);

    expect(mockSetToggleContentModal).toHaveBeenCalled();

    enquiry.done();
    images.done();
    content.done();
  });
});
