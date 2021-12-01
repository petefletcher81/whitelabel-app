import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { server } from "../../mocks/server";
import { fAQOptions } from "../dashboard/options";
import Accordion from "./Accordion";

describe("<Accordion />", () => {
  let container = null;
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    const testid = document.createAttribute("data-testid");
    testid.value = "test-body";
    container.setAttributeNode(testid);
    document.body.appendChild(container);
  });

  afterEach(() => {
    cleanup();
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should render the footer at the bottom of the page", async () => {
    render(<Accordion options={fAQOptions} />);
    screen.getByText("How long can I book lessons for");
    screen.getByText("How often should I have lessons");
  });
});
