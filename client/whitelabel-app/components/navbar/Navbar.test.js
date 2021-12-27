import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Navbar from "./Navbar";

jest.mock("next/link", () => {
  return ({ children }) => {
    return children;
  };
});

describe("<Navbar/> desktop", () => {
  it("should render component", () => {
    window.innerWidth = 990;
    render(<Navbar />);
    screen.getByText("Home");
    screen.getByText("About Us");
    screen.getByText("Contact Us");
  });
});

describe("<Navbar /> mobile", () => {
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

  xit("should route user to about us when link clicked", () => {
    window.innerWidth = 990;
    const mockToggle = jest.fn();
    render(<Navbar handleToggle={mockToggle} />);

    fireEvent.click(screen.getByText("About Us"));
    expect(mockToggle).toHaveBeenCalled();
  });
});
