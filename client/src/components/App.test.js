import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import nock from "nock";

import App from "./App";

describe("<App />", () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });
  it("should render component with main sections and images", async () => {
    render(<App />);
    // nav

    screen.getByText(/Home/i);
    screen.getByText(/About Us/i);
    screen.getByText(/Contact Us/i);
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
    // content and images
    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "home",
      })
      .reply(200, homeContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const image = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images")
      .reply(200, imageContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    await waitFor(() => {
      screen.getByText(/Heading 1/);
      screen.getByText(
        /Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum./i
      );
    });

    const displayedImage = document.querySelectorAll("img");
    expect(displayedImage[0].src).toContain("test-for-home");

    screen.debug();
    image.done();
    content.done();
    // footer
  });
});
