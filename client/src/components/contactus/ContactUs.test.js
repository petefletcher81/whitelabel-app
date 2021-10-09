import "@testing-library/jest-dom/extend-expect";
import nock from "nock";
import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "../../test-utils/custom-utils";
import {
  contentBuilder,
  nockError,
  nockGetHelper,
  nockOptions,
  nockPostMock,
} from "../../test-utils/test-helpers";
import ContactUs from "./ContactUs";

describe("<ContactUs /> Mobile", () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    cleanup();
  });

  it("should render content from Api", async () => {
    const { allContent, imageContent } = contentBuilder();

    const content = nockGetHelper("content/contactus", allContent);
    const banner = nockGetHelper("images/contactus/banner", imageContent);

    render(<ContactUs />);

    await screen.findByText("Heading 1");
    content.done();
    banner.done();
  });

  it("should render error if content not retrieved from Api", async () => {
    const content = nockError("content/contactus");
    const banner = nockError("images/contactus/banner");

    render(<ContactUs />);

    await screen.findByText(
      "Something went wrong while trying to add or get the content"
    );
    content.done();
    banner.done();
  });

  it("should have banner text with a heading", async () => {
    const { allContent, imageContent } = contentBuilder();

    const content = nockGetHelper("content/contactus", allContent);
    const banner = nockGetHelper("images/contactus/banner", imageContent);

    render(<ContactUs />);

    await screen.findByText("Heading 1");

    screen.getByText("vestibulum morbi blandit cursus");

    content.done();
    banner.done();
  });

  it("should allow user to submit contact details", async () => {
    const { allContent, imageContent } = contentBuilder();

    const inputValueName = "Fred";
    const inputValueEmail = "Fred@flintstone.com";
    const postReply = {
      message: "Thank you Fred, someone will contact you soon",
    };

    const content = nockGetHelper("content/contactus", allContent);
    const banner = nockGetHelper("images/contactus/banner", imageContent);
    const options = nockOptions("enquiries");
    const enquiry = nockPostMock(
      { name: "Fred", email: "Fred@flintstone.com" },
      "enquiries",
      postReply
    );

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
    const { allContent, imageContent } = contentBuilder();
    const inputValueName = "Fred";
    const inputValueEmail = "Fred@flintstone.com";

    const content = nockGetHelper("content/contactus", allContent);
    const banner = nockGetHelper("images/contactus/banner", imageContent);
    const options = nockOptions("enquiries");

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

  // TODO - add banners back to codebase
  // it("should display banner image for page", async () => {
  //   const { allContent, imageContent } = contentBuilder();

  //   const content = nockGetHelper("content/contactus", allContent);
  //   const banner = nockGetHelper("images/contactus/banner", imageContent);

  //   render(<ContactUs />);

  //   await screen.findByText("Heading 1");
  //   screen.getByText("Heading 2");

  //   await screen.getByTestId("contactus-banner");
  //   const displayedImage = document.querySelectorAll("img");
  //   expect(displayedImage[0].src).toContain("test-for-contactus");

  //   content.done();
  //   banner.done();
  // });

  it("should display banner image error content if bad response from api", async () => {
    const { allContent } = contentBuilder();

    const content = nockGetHelper("content/contactus", allContent);
    const banner = nockError("images/contactus/banner");

    render(<ContactUs />);

    await screen.findByText("Heading 1");
    screen.getByText("Heading 2");

    await screen.findAllByText(
      "Something went wrong while trying to add or get the content"
    );

    expect(screen.queryByTestId("contactus-banner")).not.toBeInTheDocument();

    content.done();
    banner.done();
  });
});
