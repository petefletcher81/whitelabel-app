import React from "react";
import { fireEvent, render, screen } from "../../test-utils/custom-utils";
import ImageModal from "./ImageModal";

describe("<ImageModal />", () => {
  it("should open the image modal with the correct content", () => {
    render(<ImageModal imgUrl={"test-url"} />);

    const displayedImage = document.querySelectorAll("img");
    expect(displayedImage[0].src).toContain("test-url");
  });

  it("should allow user to close the image modal", () => {
    const mockClose = jest.fn();
    render(<ImageModal imgUrl={"test-url"} setSelectedImage={mockClose} />);
    fireEvent.click(screen.getByTestId("backdrop"));
    expect(mockClose).toHaveBeenCalled();
  });
});
