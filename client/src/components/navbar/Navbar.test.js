import React from "react";
import { fireEvent, render, screen } from "../../test-utils/custom-utils";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";

import Navbar from "./Navbar";

const history = createMemoryHistory();

describe("<Navbar/> desktop", () => {
  it("should render component", () => {
    window.innerWidth = 990;
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );
    screen.getByText("Home");
    screen.getByText("About Us");
    screen.getByText("Contact Us");

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

describe("<Navbar /> mobile", () => {
  it("should not render text when mobile mode", () => {
    window.innerWidth = 414;
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("About Us")).not.toBeInTheDocument();
    expect(screen.queryByText("Contact Us")).not.toBeInTheDocument();
    screen.getByRole("button");
  });

  it("should allow user to toggle the menu button to show hide sidebar", () => {
    window.innerWidth = 414;
    const mockToggle = jest.fn();
    render(<Navbar handleToggle={mockToggle} />);

    const menu = screen.getByRole("button");
    fireEvent.click(menu);
    expect(mockToggle).toHaveBeenCalled();
    fireEvent.click(menu);

    expect(mockToggle).toHaveBeenCalledTimes(2);
  });

  it("should route user to about us when link clicked", () => {
    window.innerWidth = 990;
    render(
      <Router history={history}>
        <Navbar />
      </Router>
    );

    fireEvent.click(screen.getByText("About Us"));
    expect(history.location.pathname).toBe("/aboutus");
  });
});
