import React from "react";
import { fireEvent, render, screen } from "../../test-utils/custom-utils";
import Dropdown from "./Dropdown";

describe("<Dropdown />", () => {
  const mockSelectedChange = jest.fn();
  const options = [
    {
      label: "Homepage",
      value: "homepage",
    },

    {
      label: "About Us",
      value: "aboutus",
    },

    {
      label: "Contact Us",
      value: "contactus",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the dropdown", () => {
    render(
      <Dropdown
        onSelectedChange={mockSelectedChange}
        selected={options[0]}
        options={options}
      />
    );

    screen.getAllByText("Homepage");

    fireEvent.click(screen.getByText("Homepage"));
    screen.getByText("About Us");

    fireEvent.click(screen.getByText("About Us"));

    expect(mockSelectedChange).toHaveBeenCalledWith({
      label: "About Us",
      value: "aboutus",
    });

    jest.clearAllMocks();

    fireEvent.click(screen.getByText("Homepage"));

    expect(mockSelectedChange).not.toHaveBeenCalled();
  });

  it("should allow the user to toggle the dropdown open and closed", () => {
    render(
      <Dropdown
        onSelectedChange={mockSelectedChange}
        selected={options[0]}
        options={options}
      />
    );

    expect(screen.queryByText("Contact Us")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("combobox", { name: "dropdown" }));
    fireEvent.click(screen.getByRole("option", { name: "Contact Us" }));

    expect(mockSelectedChange).toHaveBeenCalled();
  });
});
