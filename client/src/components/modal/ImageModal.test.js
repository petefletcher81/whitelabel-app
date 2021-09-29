import React from "react";
import { fireEvent, render, screen } from "../../test-utils/custom-utils";
import { contentBuilder } from "../../test-utils/test-helpers";
import ImageModal from "./ImageModal";

describe("<ImageModal />", () => {
  it("should open the image modal with the correct content", () => {
    const { allContent, imageContent } = contentBuilder();
    render(
      <ImageModal
        data={{
          images: imageContent,
          page: "dashboard",
          relatedContent: allContent[0],
        }}
        setSelectedImage={jest.fn()}
      />
    );

    const displayedImage = document.querySelectorAll("img");
    expect(displayedImage[0].src).toContain("https://test-for-contactus");
  });

  it("should allow user to close the image modal", () => {
    const { allContent, imageContent } = contentBuilder();
    const mockClose = jest.fn();
    render(
      <ImageModal
        data={{
          images: imageContent,
          page: "dashboard",
          relatedContent: allContent[0],
        }}
        setSelectedImage={mockClose}
      />
    );

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    expect(mockClose).toHaveBeenCalled();
  });
});
