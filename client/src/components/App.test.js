import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from "./App";

describe("<App />", () => {
  it("should render component", () => {
    const { container, getByText } = render(<App />);
    expect(container).toBeInTheDocument();
    expect(getByText("Website Template")).toBeInTheDocument();
  });
});
