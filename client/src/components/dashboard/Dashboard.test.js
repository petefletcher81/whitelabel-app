import nock from "nock";
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { cleanup, render, screen } from "../../test-utils/custom-utils";
import { contentBuilder, nockGetHelper } from "../../test-utils/test-helpers";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  let container = null;
  beforeEach(() => {
    nock.disableNetConnect();
    container = document.createElement("div");
    const testid = document.createAttribute("data-testid");
    testid.value = "test-body";
    container.setAttributeNode(testid);
    document.body.appendChild(container);
  });

  afterEach(() => {
    nock.cleanAll();
    cleanup();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("should render component ", async () => {
    const { enquiryContent, allContent, imageContent } = contentBuilder();

    const enquiry = nockGetHelper("enquiries", enquiryContent);
    const content = nockGetHelper("content", allContent);
    const images = nockGetHelper("images", imageContent);

    render(<Dashboard />, { container });
    screen.getByText("Dashboard");
    await screen.findByText("test1@test.com");

    content.done();
    images.done();
    enquiry.done();
  });

  it("should render content for pages / enquiries and images ", async () => {
    const { enquiryContent, imageContent, allContent } = contentBuilder();
    const enquiry = nockGetHelper("enquiries", enquiryContent);
    const content = nockGetHelper("content", allContent);
    const images = nockGetHelper("images", imageContent);

    render(<Dashboard />, { container });

    await screen.findByText("test");
    screen.getAllByText("Heading 1");
    screen.getByText("https://test-for-home");

    enquiry.done();
    images.done();
    content.done();
  });

  it("should render ", () => {});
});
