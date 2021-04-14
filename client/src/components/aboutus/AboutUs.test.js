import { render, screen, waitFor } from "../../test-utils/custom-utils";
import React from "react";
import AboutUs from "../aboutus/AboutUs";
import { mockContent, mockImage } from "../../test-utils/mockdata";

import nock from "nock";

describe("<AboutUs />", () => {
  it("should render about us content", async () => {
    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "aboutus",
      })
      .reply(200, mockContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const image = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images")
      .reply(200, mockImage, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    render(<AboutUs />);

    await screen.findByText("Heading 1");
    screen.getByText("Heading 2");
    screen.getByTestId("gallery-image-0");

    content.done();
    image.done();
  });

  it("should not render content when there is an error", async () => {
    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "aboutus",
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

    render(<AboutUs />);

    await waitFor(() => {
      screen.getByText(
        /Something went wrong while trying to add or get the content/i
      );
    });

    content.done();
    image.done();
  });
});