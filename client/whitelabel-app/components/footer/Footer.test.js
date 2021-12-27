import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import { rest } from "msw";
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { server } from "../../mocks/server";
import Footer from "./Footer.js";

describe("<Footer />", () => {
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
    render(<Footer />);

    await screen.findByText("Big Trees");
    screen.getByText("09872234837");
    screen.getByText("23 Made Up Street, Somewhere Nice, Awesome Town");
  });

  it("should not render footer content when there is an error", async () => {
    server.use(
      rest.get(
        "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/footer",
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              message:
                "Something went wrong while trying to add or get the content",
            })
          );
        }
      )
    );

    render(<Footer />);

    await screen.findAllByText(
      "Something went wrong while trying to add or get the content"
    );
  });
});
