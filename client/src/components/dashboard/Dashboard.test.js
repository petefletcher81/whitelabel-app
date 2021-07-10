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
import {
  contentBuilder,
  nockError,
  nockGetHelper,
} from "../../test-utils/test-helpers";
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
    const { enquiryContent, allContent, imageContent, footerContent } =
      contentBuilder();

    const enquiry = nockGetHelper("enquiries", enquiryContent);
    const content = nockGetHelper("content", allContent);
    const images = nockGetHelper("images", imageContent);
    const footer = nockGetHelper("footer", footerContent);

    render(<Dashboard />, { container });
    screen.getByText("Dashboard");
    await screen.findByText("test1@test.com");

    footer.done();
    content.done();
    images.done();
    enquiry.done();
  });

  it("should render content for pages / enquiries and images ", async () => {
    const { enquiryContent, imageContent, allContent, footerContent } =
      contentBuilder();
    const enquiry = nockGetHelper("enquiries", enquiryContent);
    const content = nockGetHelper("content", allContent);
    const images = nockGetHelper("images", imageContent);
    const footer = nockGetHelper("footer", footerContent);

    render(<Dashboard />, { container });

    await screen.findByText("test");
    screen.getAllByText("Heading 1");

    enquiry.done();
    footer.done();
    images.done();
    content.done();
  });

  it("should render correct classname if the item should be shaded", async () => {
    const { enquiryContent, imageContent, allContent, footerContent } =
      contentBuilder();
    const enquiry = nockGetHelper("enquiries", enquiryContent);
    const content = nockGetHelper("content", allContent);
    const images = nockGetHelper("images", imageContent);
    const footer = nockGetHelper("footer", footerContent);

    render(<Dashboard />, { container });

    await screen.findByText("test");
    screen.getAllByText("Heading 1");
    screen.getByText("2021-01-31T06:46:28.342Z");

    const contentWindow = screen.getByTestId("manage-enquiries");
    expect(contentWindow.getElementsByClassName("shaded").length).toBe(1);

    enquiry.done();
    footer.done();
    images.done();
    content.done();
  });

  it("should allow user to edit content of selected area by pressing edit", async () => {
    const mockSetToggleContentModal = jest.fn();
    const { enquiryContent, imageContent, allContent, footerContent } =
      contentBuilder();
    const enquiry = nockGetHelper("enquiries", enquiryContent);
    const content = nockGetHelper("content", allContent);
    const images = nockGetHelper("images", imageContent);
    const footer = nockGetHelper("footer", footerContent);

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

    const contentWindow4 = screen.getByTestId("manage-footer-company");
    const [contentButton4] = within(contentWindow4).getAllByText("Edit");
    fireEvent.click(contentButton4);

    const contentWindow5 = screen.getByTestId("manage-footer-social");
    const [contentButton5] = within(contentWindow5).getAllByText("Edit");
    fireEvent.click(contentButton5);

    expect(mockSetToggleContentModal).toHaveBeenCalled();

    enquiry.done();
    images.done();
    content.done();
    footer.done();
  });

  it("should render an error for content if one occurs", async () => {
    const { allContent, imageContent, footerContent, enquiryContent } =
      contentBuilder();

    const content = nockError("content");
    const enquiry = nockGetHelper("enquiries", enquiryContent);
    const images = nockGetHelper("images", imageContent);
    const footer = nockGetHelper("footer", footerContent);

    render(<Dashboard />, {
      container,
    });

    await screen.findByText(
      "Something went wrong while trying to add or get the content"
    );

    content.done();
    footer.done();
    enquiry.done();
    images.done();
  });

  it("should render an error for images if one occurs", async () => {
    const { allContent, imageContent, footerContent, enquiryContent } =
      contentBuilder();

    const content = nockGetHelper("content", allContent);
    const enquiry = nockGetHelper("enquiries", enquiryContent);
    const images = nockError("images");
    const footer = nockGetHelper("footer", footerContent);

    render(<Dashboard />, {
      container,
    });

    await screen.findByText(
      "Something went wrong while trying to add or get the content"
    );

    content.done();
    footer.done();
    enquiry.done();
    images.done();
  });

  it("should render an error for enquiries if one occurs", async () => {
    const { allContent, imageContent, footerContent, enquiryContent } =
      contentBuilder();

    const content = nockGetHelper("content", allContent);
    const enquiry = nockError("enquiries");
    const images = nockGetHelper("images", imageContent);
    const footer = nockGetHelper("footer", footerContent);

    render(<Dashboard />, {
      container,
    });

    await screen.findByText(
      "Something went wrong while trying to add or get the content"
    );

    content.done();
    footer.done();
    enquiry.done();
    images.done();
  });

  it("should render an error for footer if one occurs", async () => {
    const { allContent, imageContent, footerContent, enquiryContent } =
      contentBuilder();

    const content = nockGetHelper("content", allContent);
    const enquiry = nockGetHelper("enquiries", enquiryContent);
    const images = nockGetHelper("images", imageContent);
    const footer = nockError("footer");

    render(<Dashboard />, {
      container,
    });

    await screen.findByText(
      "Something went wrong while trying to add or get the content"
    );

    content.done();
    footer.done();
    enquiry.done();
    images.done();
  });
});
