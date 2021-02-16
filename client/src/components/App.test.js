import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import nock from "nock";

import App from "./App";

describe("<App />", () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("should render component with main sections", async () => {
    render(<App />);
    // nav
    screen.getByText(/Home/i);
    screen.getByText(/About Us/i);
    screen.getByText(/Contact Us/i);

    const homeContent = [
      {
        id: "section-one",
        "heading-one": "Heading 1",
        "content-1":
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        createdAt: "2021-01-17T06:25:57.066Z",
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

    const footerContent = [
      {
        id: "company",
        companyName: "Big Trees",
      },
      {
        id: "social",
        socialLinkedin: "linkedinurl",
      },
    ];

    const contentFooter = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/footer")
      .reply(200, footerContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    await waitFor(() => {
      screen.getByText("Heading 1");
    });

    contentFooter.done();
    content.done();
  });

  it("should not render content when there is an error", async () => {
    render(<App />);

    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "home",
      })
      .reply(
        400,
        {
          message:
            "Something went wrong while trying to add or get the content",
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        }
      );

    const footerContent = [
      {
        id: "company",
        companyName: "Big Trees",
      },
      {
        id: "social",
        socialLinkedin: "linkedinurl",
      },
    ];

    const contentFooter = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/footer")
      .reply(200, footerContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    await waitFor(() => {
      screen.getByText(
        /Something went wrong while trying to add or get the content/i
      );
    });

    contentFooter.done();
    content.done();
  });

  it("should render the footer at the bottom of the page", async () => {
    render(<App />);
    const homeContent = [
      {
        id: "section-one",
        "heading-one": "Heading 1",
        "content-1":
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        createdAt: "2021-01-17T06:25:57.066Z",
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

    const footerContent = [
      {
        id: "company",
        companyName: "Big Trees",
      },
      {
        id: "social",
        socialLinkedin: "linkedinurl",
      },
    ];

    const contentFooter = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/footer")
      .reply(200, footerContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    await waitFor(() => {
      screen.getByText("Big Trees");
      screen.getByText("linkedinurl");
    });
    contentFooter.done();
    content.done();
  });
});
