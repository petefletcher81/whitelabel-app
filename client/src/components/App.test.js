import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import jwtDecode from "jwt-decode";
import nock from "nock";
import React from "react";
import { Router } from "react-router-dom";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "../test-utils/custom-utils";
import {
  contentBuilder,
  nockError,
  nockGetHelper,
} from "../test-utils/test-helpers";
import App from "./App";

let mockDate = new Date();
const history = createMemoryHistory();
jest.mock("jwt-decode");
const mockJwt = require("jwt-decode");

describe("App ", () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  beforeEach(() => {
    jest.spyOn(console, "error");
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });

  afterEach(() => {
    nock.cleanAll();
    console.error.mockRestore();
    cleanup();
  });

  it("should render content / images from redux", async () => {
    const { allContent, imageContent, footerContent } = contentBuilder();

    const content = nockGetHelper("content/home", allContent);
    const images = nockGetHelper("images/home/image", imageContent);
    const footer = nockGetHelper("footer", footerContent);

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

    images.done();
    content.done();
    footer.done();
  });

  it("should render error from content reducer", async () => {
    const { allContent, imageContent, footerContent } = contentBuilder();

    const content = nockError("content/home");
    const images = nockError("images/home/image");
    const footer = nockError("footer");

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

    images.done();
    footer.done();
    content.done();
  });

  it("should open the image modal when an image is clicked and close the image modal when backdrop clicked", async () => {
    const { allContent, imageContent, footerContent } = contentBuilder();
    window.innerWidth = 990;

    const contentHome = nockGetHelper("content/home", allContent);
    const imageHome = nockGetHelper("images/home/image", imageContent);
    const contentAboutus = nockGetHelper("content/aboutus", allContent);
    const imageAboutus = nockGetHelper("images", imageContent);
    const footer = nockGetHelper("footer", footerContent);

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

    contentAboutus.done();
    contentHome.done();
    imageHome.done();
    imageAboutus.done();
    footer.done();
  });
});

describe("App -- Nav items", () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  beforeEach(() => {
    jest.spyOn(console, "error");
    nock.cleanAll();
    cleanup();
    console.error.mockImplementation(() => null);
  });

  afterEach(() => {
    localStorage.removeItem("token", "qwerty");
    nock.cleanAll();
    console.error.mockRestore();
    cleanup();
  });

  afterEach(() => {});

  it("should render dashboard link and allow user to navigate to page, if there is an admin token within localstorage", async () => {
    const { allContent, imageContent, footerContent } = contentBuilder();

    const content = nockGetHelper("content/home", allContent);
    const images = nockGetHelper("images/home/image", imageContent);
    const footer = nockGetHelper("footer", footerContent);

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

    await waitFor(() => {
      screen.getByText("Heading 1");
    });

    fireEvent.click(screen.getByText("Dashboard"));
    screen.getByTestId("dashboard-screen");
    expect(jwtDecode).toHaveBeenCalled();

    content.done();
    images.done();
    footer.done();
  });

  it("should render not dashboard link and not allow user to navigate to page, if token out of date", async () => {
    const { allContent, imageContent, footerContent } = contentBuilder();

    const content = nockGetHelper("content/home", allContent);
    const images = nockGetHelper("images/home/image", imageContent);
    const footer = nockGetHelper("footer", footerContent);

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

    content.done();
    images.done();
    footer.done();
  });

  it("should render not dashboard if there is admin", async () => {
    const { allContent, imageContent, footerContent } = contentBuilder();

    const content = nockGetHelper("content/home", allContent);
    const images = nockGetHelper("images/home/image", imageContent);
    const footer = nockGetHelper("footer", footerContent);

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

    content.done();
    images.done();
    footer.done();
  });

  it("should allow user to toggle the menu button to show hide sidebar", async () => {
    const history = createMemoryHistory();
    window.innerWidth = 414;
    const { allContent, imageContent, footerContent } = contentBuilder();

    const content = nockGetHelper("content/home", allContent);
    const images = nockGetHelper("images/home/image", imageContent);
    const footer = nockGetHelper("footer", footerContent);

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

    content.done();
    images.done();
    footer.done();
  });
});
