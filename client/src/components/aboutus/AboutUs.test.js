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
import AboutUs from "../aboutus/AboutUs";

describe("<AboutUs />", () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    cleanup();
  });

  it("should render about us content", async () => {
    const { allContent, imageContent } = contentBuilder();

    const content = nockGetHelper("content/aboutus", allContent);
    const images = nockGetHelper("images", imageContent);

    render(<AboutUs />);

    await screen.findByText("Heading 1");
    screen.getByText("Heading 2");
    screen.getByTestId("gallery-image-0");

    const displayedImage = document.querySelectorAll("img");

    content.done();
    images.done();
  });

  it("should not render content when there is an error", async () => {
    const content = nockError("content/aboutus");
    const images = nockError("images");

    render(<AboutUs />);

    await waitFor(() => {
      screen.getByText(
        /Something went wrong while trying to add or get the content/i
      );
    });

    content.done();
    images.done();
  });
});
