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

  // xit("should route user to about us when link clicked", () => {
  //   window.innerWidth = 990;
  //   const mockToggle = jest.fn();
  //   render(<Navbar handleToggle={mockToggle} />);

  //   fireEvent.click(screen.getByText("About Us"));
  //   expect(mockToggle).toHaveBeenCalled();
  // });
});

xdescribe("Navbar -- Nav items", () => {
  it("should render dashboard link and allow user to navigate to page, if there is an admin token within localstorage", async () => {
    window.innerWidth = 990;
    localStorage.setItem("token", "qwerty");

    mockJwt.mockImplementation(() => {
      return { exp: mockDate.getTime(), admin: true };
    });

    const { imageContent, homeContent } = contentBuilder();
    render(<HomePage content={homeContent} />);

    await screen.findAllByText("Heading 1");

    fireEvent.click(screen.getAllByText("Dashboard")[0]);
    screen.getByTestId("dashboard-screen");
    await expect(jwtDecode).toHaveBeenCalled();
  });

  it("should render not dashboard link and not allow user to navigate to page, if token out of date", async () => {
    const history = createMemoryHistory();
    window.innerWidth = 990;
    localStorage.setItem("token", "qwerty");

    mockJwt.mockImplementation(() => {
      return { exp: 1, admin: false };
    });

    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await waitFor(() => {
      screen.getByText("Heading 1");
    });

    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });

  it("should render not dashboard if there is admin", async () => {
    const history = createMemoryHistory();

    window.innerWidth = 990;

    localStorage.setItem("token", "qwerty");

    mockJwt.mockImplementation(() => {
      return { exp: mockDate.getTime(), admin: false };
    });

    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await waitFor(() => {
      screen.getByText("Heading 1");
    });

    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  });

  it("should allow user to toggle the menu button to show hide sidebar", async () => {
    const history = createMemoryHistory();
    window.innerWidth = 414;

    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await waitFor(() => {
      screen.getByText("Heading 1");
    });

    const menu = screen.getAllByRole("button")[0];

    fireEvent.click(menu);
    expect(screen.queryAllByText("Home")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("About Us")[0]).toBeInTheDocument();
    expect(screen.queryAllByText("Contact Us")[0]).toBeInTheDocument();

    fireEvent.click(menu);
    expect(screen.queryAllByText("home").length).toBe(0);
    expect(screen.queryAllByText("about us").length).toBe(0);
    expect(screen.queryAllByText("contact us").length).toBe(0);

    fireEvent.click(menu);
    fireEvent.click(document.body);
    expect(screen.queryAllByText("home").length).toBe(0);
    expect(screen.queryAllByText("about us").length).toBe(0);
    expect(screen.queryAllByText("contact us").length).toBe(0);
  });
});
