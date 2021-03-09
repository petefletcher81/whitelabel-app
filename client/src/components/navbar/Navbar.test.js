import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import nock from "nock";

import Navbar from "./Navbar";

describe("<Navbar/>", () => {
  it("should render component", () => {
    render(<Navbar />);
    screen.getByText("Home");
    screen.getByText("About Us");
    screen.getByText("Contact Us");
  });

  it("should not render text when mobile mode", () => {
    window.innerWidth = 414;
    render(<Navbar />);
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("About Us")).not.toBeInTheDocument();
    expect(screen.queryByText("Contact Us")).not.toBeInTheDocument();
    screen.getByRole("button");
  });
});
