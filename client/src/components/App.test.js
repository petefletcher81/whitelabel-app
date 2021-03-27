import React from "react";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "../test-utils/custom-utils";
import { createMemoryHistory } from "history";
import nock from "nock";
import App from "./App";

const history = createMemoryHistory();

describe("App - Redux testing", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("should render content / images from redux", async () => {
    const contentTest = [
      {
        id: "section-one",
        heading: "Heading 1",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        createdAt: "2021-01-17T06:25:57.066Z",
      },
    ];

    const imageTest = [
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

    render(
      <Router history={history}>
        <App />
      </Router>,
      {
        initialState: {
          content: { allContent: contentTest },
          images: { allImages: imageTest },
        },
      }
    );

    await screen.findByText("Heading 1");

    const displayedImage = document.querySelectorAll("img");
    expect(displayedImage[0].src).toContain("test-for-home");
  });

  it("should render error from content reducer", async () => {
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

    const image = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images")
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

    const contentFooter = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/footer")
      .reply(
        400,
        {
          message:
            "Something went wrong while trying to add or get the content",
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        }
      );

    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await waitFor(() => {
      screen.getByText(
        /Something went wrong while trying to add or get the content/i
      );
    });

    image.done();
    contentFooter.done();
    content.done();
  });
});
