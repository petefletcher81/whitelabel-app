import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import {
  getAllContent,
  getAllImages,
  getEnquiries,
  getFooterContent,
} from "../pages/api/apiCalls";
import Dashboard from "../pages/dashboard";
import { contentBuilder } from "../test-utils/test-helpers";

describe("Dashboard", () => {
  it("should render component ", async () => {
    const { enquiryContent, allContent, imageContent, footerContent } =
      contentBuilder();

    render(
      <Dashboard
        initContent={allContent}
        initImages={imageContent}
        initEnquiries={enquiryContent}
        footerContent={footerContent}
      />
    );

    screen.getByText("Dashboard");
    await screen.findByText("test1@test.com");
  });

  it("should render content for pages / enquiries and images ", async () => {
    const { enquiryContent, allContent, imageContent, footerContent } =
      contentBuilder();

    render(
      <Dashboard
        initContent={allContent}
        initImages={imageContent}
        initEnquiries={enquiryContent}
        footerContent={footerContent}
      />
    );

    await screen.findByText("test");
    await screen.findAllByText("Heading 1");
  });

  it("should render correct classname if the item should be shaded", async () => {
    const { enquiryContent, allContent, imageContent, footerContent } =
      contentBuilder();

    render(
      <Dashboard
        initContent={allContent}
        initImages={imageContent}
        initEnquiries={enquiryContent}
        footerContent={footerContent}
      />
    );

    await screen.findByText("test");
    await screen.findAllByText("Heading 1");
    screen.getByText("2021-01-31T06:46:28.342Z");

    const contentWindow = screen.getByTestId("manage-enquiries");
    expect(contentWindow.getElementsByClassName("shaded").length).toBe(1);
  });

  it("should allow user to edit content of selected area by pressing edit", async () => {
    const mockSetToggleContentModal = jest.fn();

    const { enquiryContent, allContent, imageContent, footerContent } =
      contentBuilder();

    render(
      <Dashboard
        initContent={allContent}
        initImages={imageContent}
        initEnquiries={enquiryContent}
        footerContent={footerContent}
      />
    );

    await screen.findByText("test");
    await screen.findAllByText("Heading 1");
    screen.getByText("2021-01-31T06:46:28.342Z");

    const contentWindow = screen.getByTestId("manage-enquiries");
    expect(contentWindow.getElementsByClassName("shaded").length).toBe(1);

    await screen.findByText("test");

    const [contentButton] = within(contentWindow).getAllByText("Edit");
    fireEvent.click(contentButton);

    expect(screen.getByTestId("content-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByTestId("content-modal")).not.toBeInTheDocument();

    const contentWindow2 = screen.getByTestId("manage-content");
    const [contentButton2] = within(contentWindow2).getAllByText("Edit");
    fireEvent.click(contentButton2);

    expect(screen.getByTestId("content-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByTestId("content-modal")).not.toBeInTheDocument();

    const contentWindow3 = screen.getByTestId("manage-images");
    const [contentButton3] = within(contentWindow3).getAllByText("Edit");
    fireEvent.click(contentButton3);

    expect(screen.getByTestId("content-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByTestId("content-modal")).not.toBeInTheDocument();

    const contentWindow4 = screen.getByTestId("manage-footer-company");
    const [contentButton4] = within(contentWindow4).getAllByText("Edit");
    fireEvent.click(contentButton4);

    const contentWindow5 = screen.getByTestId("manage-footer-social");
    const [contentButton5] = within(contentWindow5).getAllByText("Edit");
    fireEvent.click(contentButton5);

    expect(screen.getByTestId("content-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByTestId("content-modal")).not.toBeInTheDocument();
  });

  it("should render an error for content if one occurs", async () => {
    const { imageContent, footerContent, enquiryContent } = contentBuilder();

    render(
      <Dashboard
        initContent={null}
        initImages={imageContent}
        initEnquiries={enquiryContent}
        footerContent={footerContent}
      />
    );

    await screen.findAllByText(
      "Something went wrong when trying to display content"
    );
  });

  it("should render an error for images if one occurs", async () => {
    const { allContent, footerContent, enquiryContent } = contentBuilder();

    render(
      <Dashboard
        initContent={allContent}
        initImages={null}
        initEnquiries={enquiryContent}
        footerContent={footerContent}
      />
    );

    await screen.findAllByText(
      "Something went wrong when trying to display content"
    );
  });

  it("should render an error for enquiries if one occurs", async () => {
    const { allContent, imageContent, footerContent, enquiryContent } =
      contentBuilder();

    render(
      <Dashboard
        initContent={allContent}
        initImages={imageContent}
        initEnquiries={null}
        footerContent={footerContent}
      />
    );

    await screen.findAllByText(
      "Something went wrong when trying to display content"
    );
  });
});

describe("API calls for the page", () => {
  it("should make a call serverside for content", async () => {
    const { allContent } = contentBuilder();

    const result = await getAllContent();
    expect(result).toEqual(allContent);
  });

  it("should make a call serverside for images", async () => {
    const { imageContent } = contentBuilder();

    const result = await getAllImages();
    expect(result).toEqual(imageContent);
  });

  it("should make a call serverside for enquiries", async () => {
    const { enquiryContent } = contentBuilder();

    const result = await getEnquiries();
    expect(result).toEqual(enquiryContent);
  });

  it("should make a call serverside for footerContent", async () => {
    const { footerContent } = contentBuilder();

    const result = await getFooterContent();
    expect(result).toEqual(footerContent);
  });
});
