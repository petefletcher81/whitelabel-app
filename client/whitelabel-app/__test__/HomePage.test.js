import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { default as React } from "react";
import HomePage from "../pages/index";
import { contentBuilder } from "../test-utils/test-helpers";

let mockDate = new Date();
jest.mock("jwt-decode");
const mockJwt = require("jwt-decode");

describe("App ", () => {
  it("should render content / images from redux", async () => {
    const { imageContent, homeContent } = contentBuilder();
    render(<HomePage content={homeContent} images={imageContent} />);

    await waitFor(() => {
      screen.getByText("Heading 1");
      screen.getAllByText(/Lorem ipsum dolor sit amet/i);
      const displayedImage = document.querySelectorAll("img");
      expect(displayedImage[0].src).toContain("https://test-for-home/");
      expect(screen.queryByTestId("homepage-section")).toBeInTheDocument();
    });
  });

  // about us test

  // Dashboard test
  xit("should open the content modal when an user is in dashboard and content is clicked and close the image modal when backdrop clicked", async () => {
    window.innerWidth = 990;

    localStorage.setItem("token", "qwerty");

    mockJwt.mockImplementation(() => {
      return { exp: mockDate.getTime(), admin: true };
    });

    render(<App />);

    await screen.findByText("Heading 1");
    fireEvent.click(screen.getAllByText("Dashboard")[0]);

    await screen.findByText("test1@test.com");

    screen.getByText("Manage Content");
    const [contentButton] = screen.getAllByText("Edit");
    fireEvent.click(contentButton);

    await screen.findAllByText("Dashboard");
  });

  it("should render error if content fails", async () => {
    const { imageContent, homeContent } = contentBuilder();
    render(<HomePage content={null} images={imageContent} />);

    await waitFor(() => {
      screen.getAllByText("Missing content / Failed to load");
    });
  });

  it("should render error if content fails", async () => {
    const { imageContent, homeContent } = contentBuilder();
    render(<HomePage content={homeContent} />);

    await waitFor(() => {
      screen.getAllByText("Missing content / Failed to load");
    });
  });
});
