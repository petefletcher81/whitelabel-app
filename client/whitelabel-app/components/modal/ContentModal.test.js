import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import React from "react";
import { server } from "../../mocks/server";
import { contentBuilder } from "../../test-utils/test-helpers";
import ContentModal from "./ContentModal";

describe("<ContentModal />", () => {
  it("should open the content modal with the correct content with type of site", () => {
    const { allContent } = contentBuilder();
    render(
      <ContentModal
        data={{
          item: allContent[0],
          type: "site-content",
          page: "home",
        }}
        setToggleContentModal={jest.fn()}
      />
    );

    screen.getByDisplayValue("Heading 1");
    screen.getByDisplayValue("section-1");
  });

  it("should open the modal with the correct content with type image", () => {
    const { imageContent } = contentBuilder();
    render(
      <ContentModal
        data={{ item: imageContent[0], type: "image-content" }}
        setToggleContentModal={jest.fn()}
      />
    );

    screen.getByText(
      "Are you sure you want to delete this image from the home page"
    );

    expect(screen.getByRole("img", { name: "chosen image" }));
  });

  it("should open the modal with the correct content with type image", () => {
    const { imageContent } = contentBuilder();
    render(
      <ContentModal
        data={{ item: imageContent[1], type: "image-content" }}
        setToggleContentModal={jest.fn()}
      />
    );

    screen.getByText(
      "Are you sure you want to delete this image from the contactus page"
    );
    const displayedImage = document.querySelectorAll("img");
    expect(displayedImage[0].src).toContain("test-for-contactus");
  });

  it("should open the modal with the correct content with type enquiries", () => {
    const { enquiryContent } = contentBuilder();
    render(
      <ContentModal
        data={{ item: enquiryContent[0], type: "enquiries-content" }}
        setToggleContentModal={jest.fn()}
      />
    );

    screen.getByText("test1@test.com");
    screen.getByText("test");
  });

  it("should open the modal with the correct content with type footer", () => {
    const { footerContent } = contentBuilder();
    render(
      <ContentModal
        data={{ item: footerContent[0], type: "footer-content" }}
        setToggleContentModal={jest.fn()}
      />
    );

    screen.getByDisplayValue("Big Trees");
  });

  it("should allow user to close the modal", () => {
    const { footerContent } = contentBuilder();
    const mockClose = jest.fn();
    render(
      <ContentModal
        data={{ content: footerContent[0], type: "footer-content" }}
        setToggleContentModal={mockClose}
      />
    );

    fireEvent.click(screen.getByText("Close"));
    expect(mockClose).toHaveBeenCalled();
  });

  it("render correct class dependant on size", () => {
    const { allContent } = contentBuilder();

    render(
      <ContentModal
        data={{
          item: allContent[0],
          type: "site-content",
          page: "home",
        }}
        setToggleContentModal={jest.fn()}
      />
    );

    const contentWindow = screen.getByText("Content");
    expect(contentWindow).toHaveClass("shaded");
  });

  it("should render gallery component", () => {
    const { imageContent } = contentBuilder();

    render(
      <ContentModal
        data={{
          item: imageContent[3],
          type: "image-content",
          page: "aboutus",
        }}
        setToggleContentModal={jest.fn()}
      />
    );

    screen.getByText(
      "Are you sure you want to delete this image from the aboutus page"
    );

    const displayedImage = document.querySelectorAll("img");
    expect(displayedImage[0].src).toContain("test-for-aboutus-gallery");
  });
});

describe("Editing Content", () => {
  it("should allow user to edit content data and post data", async () => {
    const { allContent } = contentBuilder();
    /* need to match the body coming back or would not allow pass */

    render(
      <ContentModal
        data={{
          item: allContent[0],
          type: "site-content",
          page: "home",
        }}
        setToggleContentModal={jest.fn()}
      />
    );

    const heading = await screen.findByDisplayValue("Heading 1");
    screen.getByTestId("edit-content-modal");
    fireEvent.change(heading, { target: { value: "New Heading" } });

    screen.getByDisplayValue("New Heading");
    fireEvent.click(screen.getByText("Save"));

    await screen.findByText("This content has been successfully updated");

    expect(screen.getByDisplayValue("New Heading")).toBeInTheDocument();
  });

  it("should allow user to delete content", async () => {
    const { allContent } = contentBuilder();

    render(
      <ContentModal
        data={{
          item: allContent[0],
          type: "site-content",
          page: "home",
        }}
        setToggleContentModal={jest.fn()}
      />
    );

    screen.getByDisplayValue("Heading 1");
    screen.getByTestId("edit-content-modal");

    userEvent.click(screen.getByText("Delete"));

    await screen.findByText("This content has now been deleted");
  });

  it("should surface an error if there is a problem response with content on delete", async () => {
    server.use(
      rest.delete(
        "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/content/home/section-1",
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              message: "Something went wrong when trying to remove content",
            })
          );
        }
      )
    );

    const { allContent } = contentBuilder();

    render(
      <ContentModal
        data={{
          item: allContent[0],
          type: "site-content",
          page: "home",
        }}
        setToggleContentModal={jest.fn()}
      />
    );

    const heading = screen.getByDisplayValue("Heading 1");
    screen.getByTestId("edit-content-modal");

    fireEvent.click(screen.getByText("Delete"));

    await screen.findByText(
      "Something went wrong when trying to remove content"
    );
  });

  it("should surface an error if there is a problem rsponse with contetn on post", async () => {
    server.use(
      rest.put(
        "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/content/home/section-1",
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              message: "Something went wrong when trying to remove content",
            })
          );
        }
      )
    );

    const { allContent } = contentBuilder();

    render(
      <ContentModal
        data={{
          item: allContent[0],
          type: "site-content",
          page: "home",
        }}
        setToggleContentModal={jest.fn()}
      />
    );

    const heading = screen.getByDisplayValue("Heading 1");
    screen.getByTestId("edit-content-modal");
    fireEvent.change(heading, { target: { value: "New Heading" } });

    screen.getByDisplayValue("New Heading");
    fireEvent.click(screen.getByText("Save"));

    await screen.findByText(
      "Something went wrong when trying to remove content"
    );
  });

  it("should allow user to check the contacted box on the enquiry modal", async () => {
    const { enquiryContent } = contentBuilder();
    /* need to match the body coming back or would not allow pass */

    render(
      <ContentModal
        data={{
          item: enquiryContent[0],
          type: "enquiries-content",
          page: "contactus",
        }}
        setToggleContentModal={jest.fn()}
      />
    );

    const enquiryContainer = screen.getByTestId("enquiry-content");
    const checkbox = within(enquiryContainer).getByRole("checkbox");
    within(enquiryContainer).getByRole("checkbox", { checked: false });

    fireEvent.click(checkbox);

    within(enquiryContainer).getByRole("checkbox", { checked: true });
    fireEvent.click(screen.getByText("Save"));

    await screen.findByText("This content has been successfully updated");
  });

  it("should allow user to delete content that is not of type site-content", async () => {
    const { enquiryContent } = contentBuilder();

    render(
      <ContentModal
        data={{
          item: enquiryContent[0],
          type: "enquiries-content",
          page: "contactus",
        }}
        setToggleContentModal={jest.fn()}
      />
    );

    screen.getByText("test");
    screen.getByTestId("enquiry-content");

    fireEvent.click(screen.getByText("Delete"));

    await screen.findByText("This content has now been deleted");
  });

  it("should allow user to edit the footer company content and update the new data", async () => {
    const { footerContent } = contentBuilder();

    render(
      <ContentModal
        data={{
          item: footerContent[0],
          type: "footer-content",
          page: "footer",
        }}
        setToggleContentModal={jest.fn()}
      />
    );

    const heading = screen.getByDisplayValue("Big Trees");
    expect(heading).toBeInTheDocument();

    fireEvent.change(heading, { target: { value: "New Heading" } });

    screen.getByDisplayValue("New Heading");
    fireEvent.click(screen.getByText("Save"));

    await screen.findByText("This content has been successfully updated");

    expect(screen.getByDisplayValue("New Heading")).toBeInTheDocument();

    await screen.findByText("This content has been successfully updated");
  });

  it("should allow user to edit the footer social content and update the new data", async () => {
    const { footerContent } = contentBuilder();
    /* need to match the body coming back or would not allow pass */

    render(
      <ContentModal
        data={{
          item: footerContent[1],
          type: "footer-content",
          page: "footer",
        }}
        setToggleContentModal={jest.fn()}
      />
    );

    const heading = screen.getByDisplayValue("linkedinurl");
    expect(heading).toBeInTheDocument();

    fireEvent.change(heading, { target: { value: "New Heading" } });

    screen.getByDisplayValue("New Heading");
    fireEvent.click(screen.getByText("Save"));

    await screen.findByText("This content has been successfully updated");

    expect(screen.getByDisplayValue("New Heading")).toBeInTheDocument();

    await screen.findByText("This content has been successfully updated");
  });

  it("should allow user to delete footer company content", async () => {
    const { footerContent } = contentBuilder();

    render(
      <ContentModal
        data={{
          item: footerContent[0],
          type: "footer-content",
          page: "footer",
        }}
        setToggleContentModal={jest.fn()}
      />
    );

    screen.getByDisplayValue("Big Trees");
    screen.getByTestId("footer-content-company");

    fireEvent.click(screen.getByText("Delete"));

    await screen.findByText("This content has now been deleted");
  });

  it("should allow user to delete footer social content", async () => {
    const { footerContent } = contentBuilder();

    render(
      <ContentModal
        data={{
          item: footerContent[1],
          type: "footer-content",
          page: "footer",
        }}
        setToggleContentModal={jest.fn()}
      />
    );

    screen.getByDisplayValue("linkedinurl");
    screen.getByTestId("footer-content-social");

    fireEvent.click(screen.getByText("Delete"));

    await screen.findByText("This content has now been deleted");
  });

  it("should allow usr to delete image content", async () => {
    const { imageContent } = contentBuilder();

    render(
      <ContentModal
        data={{
          item: imageContent[0],
          type: "image-content",
          page: "home",
        }}
        setToggleContentModal={jest.fn()}
      />
    );

    screen.getByTestId("image-content-wrapper");

    fireEvent.click(screen.getByText("Delete"));

    await screen.findByText("This content has now been deleted");
  });

  it("should surface an error if there is a problem response with !content on deleteItem", async () => {
    server.use(
      rest.delete(
        "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/footer/social",
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              message: "Something went wrong when trying to remove content",
            })
          );
        }
      )
    );
    const { footerContent } = contentBuilder();

    render(
      <ContentModal
        data={{
          item: footerContent[1],
          type: "footer-content",
          page: "footer",
        }}
        setToggleContentModal={jest.fn()}
      />
    );

    screen.getByDisplayValue("linkedinurl");
    screen.getByTestId("footer-content-social");

    fireEvent.click(screen.getByText("Delete"));

    await screen.findByText(
      "Something went wrong when trying to remove content"
    );
  });
});
