import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import jwtDecode from "jwt-decode";
import { rest } from "msw";
import React from "react";
import { Router } from "react-router-dom";
import { server } from "../mocks/server";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../test-utils/custom-utils";
import App from "./App";

let mockDate = new Date();
const history = createMemoryHistory();
jest.mock("jwt-decode");
const mockJwt = require("jwt-decode");

describe("App ", () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    jest.spyOn(console, "error");
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });

  afterEach(() => {
    console.error.mockRestore();
    server.resetHandlers();
    cleanup();
    // the below will reset the history
    history.push("/");
  });

  afterAll(() => {
    server.close();
  });

  it("should render content / images from redux", async () => {
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await waitFor(() => {
      screen.getByText("Heading 1");
      screen.getAllByText(/Lorem ipsum dolor sit amet/i);
      const displayedImage = document.querySelectorAll("img");
      expect(displayedImage[0].src).toContain("test-for-home");
      expect(screen.queryByTestId("homepage-section")).toBeInTheDocument();
    });
  });

  it("should open the image modal when an image is clicked and close the image modal when backdrop clicked", async () => {
    window.innerWidth = 990;

    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await screen.findAllByTestId("home-content");
    fireEvent.click(screen.getByText("About Us"));
    expect(history.location.pathname).toBe("/aboutus");

    await screen.findByTestId("aboutus-section");
    await screen.findByTestId("gallery-image-0");
    fireEvent.click(screen.getByTestId("gallery-image-0"));

    await screen.getByTestId("backdrop");
    fireEvent.click(screen.getByTestId("backdrop"));
    expect(screen.queryByTestId("backdrop")).not.toBeInTheDocument();
  });

  it("should open the content modal when an user is in dashboard and content is clicked and close the image modal when backdrop clicked", async () => {
    window.innerWidth = 990;

    localStorage.setItem("token", "qwerty");

    mockJwt.mockImplementation(() => {
      return { exp: mockDate.getTime(), admin: true };
    });

    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await screen.findByText("Heading 1");
    fireEvent.click(screen.getByText("Dashboard"));

    await screen.findByText("test1@test.com");

    screen.getByText("Manage Content");
    const [contentButton] = screen.getAllByText("Edit");
    fireEvent.click(contentButton);

    await screen.findAllByText("Dashboard");
  });

  it("should render error from content reducer", async () => {
    server.use(
      rest.get(
        "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/content/home",
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

    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await waitFor(() => {
      screen.getByText(
        /Something went wrong while trying to add or get the content/i
      );
    });
  });
});

describe("App -- Nav items", () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    jest.spyOn(console, "error");
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });

  afterEach(() => {
    console.error.mockRestore();
    server.resetHandlers();
    cleanup();
    // the below will reset the history
    history.push("/");
  });

  afterAll(() => {
    server.close();
    jest.clearAllMocks();
  });

  it("should render dashboard link and allow user to navigate to page, if there is an admin token within localstorage", async () => {
    const history = createMemoryHistory();
    window.innerWidth = 990;
    localStorage.setItem("token", "qwerty");

    mockJwt.mockImplementation(() => {
      return { exp: mockDate.getTime(), admin: true };
    });

    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await screen.findByText("Heading 1");

    fireEvent.click(screen.getByText("Dashboard"));
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

    const menu = screen.getByRole("button");
    fireEvent.click(menu);
    expect(screen.queryByText("Home")).toBeInTheDocument();
    expect(screen.queryByText("About Us")).toBeInTheDocument();
    expect(screen.queryByText("Contact Us")).toBeInTheDocument();

    fireEvent.click(menu);
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("About Us")).not.toBeInTheDocument();
    expect(screen.queryByText("Contact Us")).not.toBeInTheDocument();

    fireEvent.click(menu);
    fireEvent.click(document.body);
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("About Us")).not.toBeInTheDocument();
    expect(screen.queryByText("Contact Us")).not.toBeInTheDocument();
  });
});

describe("Signout", () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    jest.spyOn(console, "error");
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });

  afterEach(() => {
    console.error.mockRestore();
    server.resetHandlers();
    jest.clearAllMocks();
    cleanup();
    // the below will reset the history
    history.push("/");
  });

  afterAll(() => {
    server.close();
  });

  it("should render the sign out icon when user is signed in and allow them to sign out with a click", async () => {
    const history = createMemoryHistory();
    window.innerWidth = 990;
    localStorage.setItem("token", "qwerty");

    mockJwt.mockImplementation(() => {
      return { exp: mockDate.getTime(), admin: true };
    });

    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await screen.findByText("Heading 1");

    expect(
      screen.queryByRole("img", { name: "sign out icon" })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("menuitem", { name: "sign out button" }));
    await screen.findByText("You have been succesfully signed out");
  });

  it("should NOT render the sign out icon when user NOT signed in or NOT admin", async () => {
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

    await screen.findByText("Heading 1");

    expect(
      screen.queryByRole("img", { name: "sign out icon" })
    ).not.toBeInTheDocument();
  });

  it("should render error if signout fails", async () => {
    server.use(
      rest.post(
        "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app/signout",
        (req, res, ctx) => {
          return res(
            ctx.status(404),
            ctx.json({
              message: "You have NOT been successfully signed out",
            })
          );
        }
      )
    );

    const history = createMemoryHistory();
    window.innerWidth = 990;
    localStorage.setItem("token", "qwerty");

    mockJwt.mockImplementation(() => {
      return { exp: mockDate.getTime(), admin: true };
    });

    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await screen.findByText("Heading 1");

    expect(
      screen.queryByRole("img", { name: "sign out icon" })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("menuitem", { name: "sign out button" }));
    await screen.findByText("You have NOT been successfully signed out");
  });
});
