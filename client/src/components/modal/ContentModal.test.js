import { within } from "@testing-library/react";
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
  nockDeleteMock,
  nockOptions,
  nockPutMock,
} from "../../test-utils/test-helpers";
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

    screen.getByText("home");
    screen.getByText("https://test-for-home");
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
});

describe("Editing Content", () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    cleanup();
  });

  it("should allow user to edit content data and post data", async () => {
    const { allContent } = contentBuilder();
    /* need to match the body coming back or would not allow pass */
    const mockContent = {
      id: "section-1",
      heading: "New Heading",
      content: "Lorem ipsum dolor sit amet",
      createdAt: "2021-01-17T06:25:57.066Z",
      page: "home",
    };

    const options = nockOptions("content/home/section-1");
    const content = nockPutMock(mockContent, "content/home/section-1", {
      message: "This content has been successfully updated",
    });

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

    await screen.findByText("This content has been successfully updated");

    expect(screen.getByDisplayValue("New Heading")).toBeInTheDocument();

    content.done();
    options.done();
  });

  it("should allow user to delete content", async () => {
    const { allContent } = contentBuilder();

    const options = nockOptions("content/home/section-1");
    const content = nockDeleteMock("content/home/section-1", {
      message: "This content has now been deleted",
      item: "section-1",
    });

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

    await screen.findByText("This content has now been deleted");

    content.done();
    options.done();
  });

  it("should allow user to check the contacted box on the enquiry modal", async () => {
    const { enquiryContent } = contentBuilder();
    /* need to match the body coming back or would not allow pass */
    const mockContent = {
      email: "test1@test.com",
      name: "test",
      createdAt: "2021-01-17T06:25:57.066Z",
      contacted: true,
      key: "test1@test.com",
      page: "enquiries",
    };

    const options = nockOptions("enquiries/test1@test.com");
    const content = nockPutMock(mockContent, "enquiries/test1@test.com", {
      message: "This content has been successfully updated",
    });

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

    content.done();
    options.done();
  });

  it("should allow user to delete content that is not of type site-content", async () => {
    const { enquiryContent } = contentBuilder();

    const options = nockOptions("enquiries/test1@test.com");
    const content = nockDeleteMock("enquiries/test1@test.com", {
      message: "This content has now been deleted",
    });

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

    content.done();
    options.done();
  });

  it("should allow user to edit the footer company content and update the new data", async () => {
    const { footerContent } = contentBuilder();
    /* need to match the body coming back or would not allow pass */
    const mockContent = {
      id: "company",
      companyName: "New Heading",
      key: "company",
      page: "footer",
      companyAddress: "23 Made Up Street, Somewhere Nice, Awesome Town",
      companyNumber: "12345 678909",
      mobileNumber: "09872234837",
    };

    const options = nockOptions("footer/company");
    const content = nockPutMock(mockContent, "footer/company", {
      message: "This content has been successfully updated",
    });

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

    content.done();
    options.done();
  });

  it("should allow user to edit the footer social content and update the new data", async () => {
    const { footerContent } = contentBuilder();
    /* need to match the body coming back or would not allow pass */
    const mockContent = {
      socialLinkedin: "New Heading",
      socialFacebook: "fburl",
      socialInstagram: "instaurl",
      socialPinterest: "pinurl",
      socialTwitter: "twiturl",
      key: "social",
      page: "footer",
    };

    const options = nockOptions("footer/social");
    const content = nockPutMock(mockContent, "footer/social", {
      message: "This content has been successfully updated",
    });

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

    content.done();
    options.done();
  });
});
