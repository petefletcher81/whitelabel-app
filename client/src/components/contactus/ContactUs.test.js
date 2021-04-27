import {
  screen,
  render,
  fireEvent,
  getByLabelText,
  cleanup,
} from "../../test-utils/custom-utils";
import React from "react";
import ContactUs from "./ContactUs";
import nock from "nock";
import "@testing-library/jest-dom/extend-expect";

import { mockContent, mockBannerImage } from "../../test-utils/mockdata";

describe("<ContactUs /> Mobile", () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    cleanup();
  });

  it("should render content from Api", async () => {
    render(<ContactUs />);
    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "contactus",
      })
      .reply(200, mockContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const banner = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images/contactus/banner")
      .reply(200, mockBannerImage, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    await screen.findByText("Heading 1");
    screen.getByText("Heading 2");
    content.done();
    banner.done();
  });

  it("should render error if content not retreived from Api", async () => {
    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "contactus",
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

    const banner = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images/contactus/banner")
      .reply(200, mockBannerImage, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    render(<ContactUs />);

    await screen.findByText(
      "Something went wrong while trying to add or get the content"
    );
    content.done();
    banner.done();
  });

  it("should have banner text with a heading", async () => {
    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "contactus",
      })
      .reply(200, mockContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const banner = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images/contactus/banner")
      .reply(200, mockBannerImage, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    render(<ContactUs />);

    await screen.findByText("Heading 1");

    screen.getByText("vestibulum morbi blandit cursus risus at ultrices mi");
    content.done();
    banner.done();
  });

  it("should allow user to submit contact details", async () => {
    const inputValueName = "Fred";
    const inputValueEmail = "Fred@flintstone.com";
    const postReply = {
      message: "Thank you Fred, someone will contact you soon",
    };

    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "contactus",
      })
      .reply(200, mockContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const enquiry = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app",
      { encodedQueryParams: true }
    )
      .post("/enquiries", { name: "Fred", email: "Fred@flintstone.com" })
      .reply(201, postReply, [
        "Access-Control-Allow-Origin",
        "http://localhost",
        "Content-Type",
        "application/json; charset=utf-8",
      ]);

    const options = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app",
      { encodedQueryParams: true }
    )
      .options("/enquiries")
      .reply(204, "", [
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Allow-Origin",
        "http://localhost",
      ]);

    const banner = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images/contactus/banner")
      .reply(200, mockBannerImage, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    // nock.recorder.rec();

    render(<ContactUs />);

    await screen.findByText("Heading 1");

    screen.getByTestId("contact-form");
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: inputValueName },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: inputValueEmail },
    });

    fireEvent.click(screen.getByText("Submit"));
    await screen.findByTestId("confirmation-modal");
    screen.getByText("Thank you Fred, someone will contact you soon");

    content.done();
    enquiry.done();
    options.done();
    banner.done();
  });

  it("should allow user to submit contact details and surface error if email already exists", async () => {
    const inputValueName = "Fred";
    const inputValueEmail = "Fred@flintstone.com";

    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "contactus",
      })
      .reply(200, mockContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const enquiry = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app",
      { encodedQueryParams: true }
    )
      .post("/enquiries", { name: "Fred", email: "Fred@flintstone.com" })
      .reply(
        400,
        {
          message:
            "Hey, this email already exists, someone will contact you soon",
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        }
      );

    const banner = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images/contactus/banner")
      .reply(200, mockBannerImage, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const options = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app",
      { encodedQueryParams: true }
    )
      .options("/enquiries")
      .reply(204, "", [
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Allow-Origin",
        "http://localhost",
      ]);

    render(<ContactUs />);

    await screen.findByText("Heading 1");

    screen.getByTestId("contact-form");
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: inputValueName },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: inputValueEmail },
    });

    fireEvent.click(screen.getByText("Submit"));
    await screen.findByTestId("error-modal");
    screen.getByText(
      "Hey, this email already exists, someone will contact you soon"
    );

    content.done();
    enquiry.done();
    options.done();
    banner.done();
  });

  it("should display banner image for page", async () => {
    const banner = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images/contactus/banner")
      .reply(200, mockBannerImage, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "contactus",
      })
      .reply(200, mockContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });
    render(<ContactUs />);

    await screen.findByText("Heading 1");
    screen.getByText("Heading 2");

    await screen.getByTestId("contactus-banner");
    const displayedImage = document.querySelectorAll("img");
    expect(displayedImage[0].src).toContain("test-for-contactus");

    content.done();
    banner.done();
  });

  it("should display banner image error content if bad response from api", async () => {
    const banner = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images/contactus/banner")
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

    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "contactus",
      })
      .reply(200, mockContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });
    render(<ContactUs />);

    await screen.findByText("Heading 1");
    screen.getByText("Heading 2");

    await screen.findByText(
      "Something went wrong while trying to add or get the content"
    );

    expect(screen.queryByTestId("contactus-banner")).not.toBeInTheDocument();

    content.done();
    banner.done();
  });
});
