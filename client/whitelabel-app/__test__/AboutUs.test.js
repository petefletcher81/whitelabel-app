import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import AboutUs from "../pages/aboutus";
import { contentBuilder } from "../test-utils/test-helpers";

describe("<AboutUs />", () => {
  it("should render about us content", async () => {
    const { imageContent, aboutUsContent } = contentBuilder();
    render(<AboutUs content={aboutUsContent} images={imageContent} />);

    await screen.findByText("Heading 1");
    screen.getByText("Heading 2");
  });

  it("should render error if content fails", async () => {
    const { imageContent } = contentBuilder();
    render(<AboutUs content={null} images={imageContent} />);

    await waitFor(() => {
      screen.getAllByText("Missing content / Failed to load");
    });
  });

  it("should render error if content fails", async () => {
    const { aboutUsContent } = contentBuilder();
    render(<AboutUs content={aboutUsContent} images={null} />);

    await waitFor(() => {
      screen.getAllByText("Missing content / Failed to load");
    });
  });

  it("should open the image modal when an image is clicked and close the image modal when backdrop clicked", async () => {
    window.innerWidth = 990;
    const { imageContent, aboutUsContent } = contentBuilder();
    render(<AboutUs content={aboutUsContent} images={imageContent} />);

    await screen.findByTestId("aboutus-section");
    await screen.findByTestId("gallery-image-0");
    fireEvent.click(screen.getByTestId("gallery-image-0"));

    await screen.getByTestId("backdrop");
    fireEvent.click(screen.getByTestId("backdrop"));
    expect(screen.queryByTestId("backdrop")).not.toBeInTheDocument();
  });
});
