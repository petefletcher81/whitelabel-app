import "@testing-library/jest-dom/extend-expect";
import nock from "nock";
import React from "react";
import {
  cleanup,
  render,
  screen,
  waitFor,
} from "../../test-utils/custom-utils";
import {
  contentBuilder,
  nockError,
  nockGetHelper,
} from "../../test-utils/test-helpers";
import HomePage from "./HomePage";

describe("<HomePage />", () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    cleanup();
  });

  it("should render component with main sections", async () => {
    const { allContent, imageContent } = contentBuilder();

    const homeContent = allContent.filter((page) => page.page === "home");
    const content = nockGetHelper("content/home", homeContent);
    const images = nockGetHelper("images/home/image", imageContent);

    render(<HomePage />);

    await waitFor(() => {
      screen.getByText("Heading 1");
      screen.getAllByText(/Lorem ipsum dolor sit amet/i);
    });

    const displayedImage = document.querySelectorAll("img");
    expect(displayedImage[0].src).toContain("test-for-home");

    images.done();
    content.done();
  });

  it("should not render content when there is an error", async () => {
    const content = nockError("content/home");
    const images = nockError("images/home/image");

    render(<HomePage />);

    await waitFor(() => {
      screen.getByText(
        /Something went wrong while trying to add or get the content/i
      );
    });

    content.done();
    images.done();
  });
});
