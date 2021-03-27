import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import nock from "nock";

import Footer from "./Footer";

describe("<App />", () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("should render the footer at the bottom of the page", async () => {
    render(<Footer />);
    const footerContent = [
      {
        id: "company",
        companyName: "Big Trees",
        companyAddress: "address",
        contactNumber: "12345",
        mobileNumber: "09876",
      },
      {
        id: "social",
        socialLinkedin: "linkedinurl",
        socialFacebook: "facebook",
        socialTwitter: "twitter",
        socialInstagram: "insta",
        socialPinterest: "pinterest",
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
      const socialIcons = screen.getAllByRole("link");
      expect(socialIcons[0]).toHaveAttribute("href", "facebook");
      expect(socialIcons[1]).toHaveAttribute("href", "twitter");
      expect(socialIcons[2]).toHaveAttribute("href", "insta");
      expect(socialIcons[3]).toHaveAttribute("href", "linkedinurl");
      expect(socialIcons[4]).toHaveAttribute("href", "pinterest");
      screen.getByText("Big Trees");
      screen.getByText("12345");
      screen.getByText("09876");
      screen.getByText("address");
    });
    contentFooter.done();
  });

  it("should not render footer content when there is an error", async () => {
    render(<Footer />);

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

    await waitFor(() => {
      screen.getByText(
        /Something went wrong while trying to add or get the content/i
      );
    });

    contentFooter.done();
  });
});
