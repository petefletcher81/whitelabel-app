import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import React from "react";
import { server } from "../mocks/server";
import { getContent, getImages } from "../pages/api/apiCalls";
import ContactUs from "../pages/contactus";
import { contentBuilder } from "../test-utils/test-helpers";

describe("<ContactUs /> Mobile", () => {
  it("should render heading and form", async () => {
    render(<ContactUs />);

    await screen.findByText("vestibulum morbi blandit cursus");
    expect(
      screen.getByRole("textbox", { name: "enquirers name" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "enquirers email" })
    ).toBeInTheDocument();
  });

  it("should render content / images from the server", async () => {
    const { imageContent, contactUsContent } = contentBuilder();
    render(<ContactUs content={contactUsContent} images={imageContent} />);

    screen.getByText("Heading 1");
    screen.getAllByText("Lorem ipsumsof dolor adipiscing elit");
  });

  it("should render error if content fails", async () => {
    const { imageContent, contactUsContent } = contentBuilder();
    render(<ContactUs content={null} images={imageContent} />);

    await waitFor(() => {
      screen.getAllByText("Missing content / Failed to load");
    });
  });

  it("should allow user to submit contact details", async () => {
    const inputValueName = "Fred";
    const inputValueEmail = "Fred@flintstone.com";

    const { imageContent, contactUsContent } = contentBuilder();
    render(<ContactUs content={contactUsContent} images={imageContent} />);

    await screen.findByText("Heading 1");

    screen.getByTestId("contact-form");

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: inputValueName },
    });

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: inputValueEmail },
    });

    fireEvent.click(screen.getByText("Submit"));
    await screen.findByText("Thank you Fred, someone will contact you soon");
  });

  it("should allow user to submit contact details and surface error if email already exists", async () => {
    const inputValueName = "Fred";
    const inputValueEmail = "Fred@flintstone.com";

    server.use(
      rest.post(
        "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/enquiries",
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              message:
                "Hey, this email already exists, someone will contact you soon",
            })
          );
        }
      )
    );

    const { imageContent, contactUsContent } = contentBuilder();
    render(<ContactUs content={contactUsContent} images={imageContent} />);

    await screen.findByText("Heading 1");

    screen.getByTestId("contact-form");

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: inputValueName },
    });

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: inputValueEmail },
    });

    fireEvent.click(screen.getByText("Submit"));
    await screen.findByText(
      "Hey, this email already exists, someone will contact you soon"
    );
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
});

describe("API calls for the page", () => {
  it("should make a call serverside for content", async () => {
    const { contactUsContent } = contentBuilder();

    const result = await getContent("contactus");
    expect(result).toEqual(contactUsContent);
  });

  it("should make a call serverside for images", async () => {
    const { imageContent } = contentBuilder();

    const result = await getImages("contactus");
    expect(result).toEqual(imageContent);
  });
});
