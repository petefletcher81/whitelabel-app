import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { fAQOptions } from "../dashboard/options";
import Accordion from "./Accordion";

describe("<Accordion />", () => {
  it("should render the footer at the bottom of the page", async () => {
    render(<Accordion options={fAQOptions} />);
    screen.getByText("How long can I book lessons for");
    screen.getByText("How often should I have lessons");
  });
});
