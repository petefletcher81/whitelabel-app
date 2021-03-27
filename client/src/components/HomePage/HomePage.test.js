import React from "react";
import { render, screen, waitFor } from "../../test-utils/custom-utils";
import "@testing-library/jest-dom/extend-expect";
import nock from "nock";

import HomePage from "./HomePage";

describe("<HomePage />", () => {
  // TODO - sort these tests out
  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("should render component with main sections", async () => {
    const homeContent = [
      {
        id: "section-one",
        heading: "Heading 1",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        createdAt: "2021-01-17T06:25:57.066Z",
      },
    ];

    const imageContent = [
      {
        id: "ba8c816a-6007-4a9e-aeff-1bca70fc7e97",
        createdAt: "2021-01-31T06:46:28.741Z",
        section: "home",
        image: "https://test-for-home",
      },
      {
        id: "2bed3fc0-2a17-4519-8460-0dc8ab4e32a2",
        section: "contactus",
        createdAt: "2021-01-31T06:46:28.742Z",
        image: "https://test-for-contactus",
      },
    ];
    render(<HomePage />, {
      initialState: {
        content: { allContent: homeContent },
        images: { allImages: imageContent },
      },
    });

    await waitFor(() => {
      screen.getByText("Heading 1");
      screen.getByText(
        /Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum./i
      );
    });

    const displayedImage = document.querySelectorAll("img");
    expect(displayedImage[0].src).toContain("test-for-home");
  });

  it("should not render content when there is an error", async () => {
    render(<HomePage />, {
      initialState: {
        content: {
          error: {
            message:
              "Something went wrong while trying to add or get the content",
          },
        },
      },
    });

    await waitFor(() => {
      screen.getByText(
        /Something went wrong while trying to add or get the content/i
      );
    });
  });
});
