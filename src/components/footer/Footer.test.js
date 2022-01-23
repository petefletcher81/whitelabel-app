import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import React from "react";
import { server } from "../../mocks/server";
import Footer from "./Footer.js";

describe("<Footer />", () => {
  it("should render the footer at the bottom of the page", async () => {
    render(<Footer />);

    await waitFor(() => {
      screen.getByText("Big Trees");
    });
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
