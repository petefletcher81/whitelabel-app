import { fireEvent, render, screen } from "../../test-utils/custom-utils";
import React from "react";
import Modal from "../modal/Modal";

describe("<Modal />", () => {
  it("should open the modal with the correct content", () => {
    render(<Modal imgUrl={"test-url"} />);

    const displayedImage = document.querySelectorAll("img");
    expect(displayedImage[0].src).toContain("test-url");
  });

  it("should allow user to close the modal", () => {
    const mockClose = jest.fn();
    render(<Modal imgUrl={"test-url"} setSelectedImage={mockClose} />);
    fireEvent.click(screen.getByTestId("backdrop"));
    expect(mockClose).toHaveBeenCalled();
  });
});
