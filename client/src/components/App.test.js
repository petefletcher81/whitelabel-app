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
import { mockContent, mockFooter, mockImage } from "../test-utils/mockdata";
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
    const homeContent = [
      {
        id: "section-one",
        heading: "Heading 1",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        createdAt: "2021-01-17T06:25:57.066Z",
      },
    ];
    const imageContent = [
      {
        id: "ba8c816a-6007-4a9e-aeff-1bca70fc7e97",
        createdAt: "2021-01-31T06:46:28.741Z",
        section: "home",
        image: "https://test-for-home",
      },
      {
        id: "2bed3fc0-2a17-4519-8460-0dc8ab4e32a2",
        section: "contactus",
        createdAt: "2021-01-31T06:46:28.742Z",
        image: "https://test-for-contactus",
      },
    ];
    const footerContent = [
      {
        id: "company",
        companyName: "Big Trees",
      },
      {
        id: "social",
        socialLinkedin: "linkedinurl",
      },
    ];

    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "home",
      })
      .reply(200, homeContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const image = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images/home/image")
      .reply(200, imageContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const footer = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/footer")
      .reply(200, footerContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    render(
      <Router history={history}>
        <App />
      </Router>
    );

    await waitFor(() => {
      screen.getByText("Heading 1");
      screen.getByText(
        /Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum./i
      );
      const displayedImage = document.querySelectorAll("img");
      expect(displayedImage[0].src).toContain("test-for-home");
      expect(screen.queryByTestId("homepage-section")).toBeInTheDocument();
    });

    image.done();
    content.done();
    footer.done();
  });

  it("should render error from content reducer", async () => {
    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "home",
      })
      .reply(
        400,
        {
          message:
            "Something went wrong while trying to add or get the content",
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        }
      );

    const image = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images/home/image")
      .reply(
        400,
        {
          message:
            "Something went wrong while trying to add or get the content",
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        }
      );

    const contentFooter = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/footer")
      .reply(
        400,
        {
          message:
            "Something went wrong while trying to add or get the content",
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        }
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

    image.done();
    contentFooter.done();
    content.done();
  });

  it("should open the modal when an image is clicked and close the modal when backdrop clicked", async () => {
    window.innerWidth = 990;
    const contentAboutus = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "aboutus",
      })
      .reply(200, mockContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const contentHome = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "home",
      })
      .reply(200, mockContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const imageHome = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images/home/image")
      .reply(200, mockImage, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const imageAboutus = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images")
      .reply(200, mockImage, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const footer = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/footer")
      .reply(200, mockFooter, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

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

  // it("should NOT render dashboard link and NOT allow user to navigate to page, if there is NO admin token within localstorage", () => {
  //   render(
  //     <Router history={history}>
  //       <App />
  //     </Router>
  //   );

  //   expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
  // });
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
    const homeContent = [
      {
        id: "section-one",
        heading: "Heading 1",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        createdAt: "2021-01-17T06:25:57.066Z",
      },
    ];
    const imageContent = [
      {
        id: "ba8c816a-6007-4a9e-aeff-1bca70fc7e97",
        createdAt: "2021-01-31T06:46:28.741Z",
        section: "home",
        image: "https://test-for-home",
      },
      {
        id: "2bed3fc0-2a17-4519-8460-0dc8ab4e32a2",
        section: "contactus",
        createdAt: "2021-01-31T06:46:28.742Z",
        image: "https://test-for-contactus",
      },
    ];
    const footerContent = [
      {
        id: "company",
        companyName: "Big Trees",
      },
      {
        id: "social",
        socialLinkedin: "linkedinurl",
      },
    ];

    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "home",
      })
      .reply(200, homeContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const image = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images/home/image")
      .reply(200, imageContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const footer = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/footer")
      .reply(200, footerContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });
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
    image.done();
    footer.done();
  });

  it("should render not dashboard link and not allow user to navigate to page, if token out of date", async () => {
    const homeContent = [
      {
        id: "section-one",
        heading: "Heading 1",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        createdAt: "2021-01-17T06:25:57.066Z",
      },
    ];
    const imageContent = [
      {
        id: "ba8c816a-6007-4a9e-aeff-1bca70fc7e97",
        createdAt: "2021-01-31T06:46:28.741Z",
        section: "home",
        image: "https://test-for-home",
      },
      {
        id: "2bed3fc0-2a17-4519-8460-0dc8ab4e32a2",
        section: "contactus",
        createdAt: "2021-01-31T06:46:28.742Z",
        image: "https://test-for-contactus",
      },
    ];
    const footerContent = [
      {
        id: "company",
        companyName: "Big Trees",
      },
      {
        id: "social",
        socialLinkedin: "linkedinurl",
      },
    ];

    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "home",
      })
      .reply(200, homeContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const image = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images/home/image")
      .reply(200, imageContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const footer = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/footer")
      .reply(200, footerContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

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
    image.done();
    footer.done();
  });

  it("should render not dashboard if there is admin", async () => {
    const homeContent = [
      {
        id: "section-one",
        heading: "Heading 1",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        createdAt: "2021-01-17T06:25:57.066Z",
      },
    ];
    const imageContent = [
      {
        id: "ba8c816a-6007-4a9e-aeff-1bca70fc7e97",
        createdAt: "2021-01-31T06:46:28.741Z",
        section: "home",
        image: "https://test-for-home",
      },
      {
        id: "2bed3fc0-2a17-4519-8460-0dc8ab4e32a2",
        section: "contactus",
        createdAt: "2021-01-31T06:46:28.742Z",
        image: "https://test-for-contactus",
      },
    ];
    const footerContent = [
      {
        id: "company",
        companyName: "Big Trees",
      },
      {
        id: "social",
        socialLinkedin: "linkedinurl",
      },
    ];

    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "home",
      })
      .reply(200, homeContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const image = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images/home/image")
      .reply(200, imageContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const footer = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/footer")
      .reply(200, footerContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

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
    image.done();
    footer.done();
  });

  it("should allow user to toggle the menu button to show hide sidebar", async () => {
    const history = createMemoryHistory();
    window.innerWidth = 414;
    const homeContent = [
      {
        id: "section-one",
        heading: "Heading 1",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        createdAt: "2021-01-17T06:25:57.066Z",
      },
    ];
    const imageContent = [
      {
        id: "ba8c816a-6007-4a9e-aeff-1bca70fc7e97",
        createdAt: "2021-01-31T06:46:28.741Z",
        section: "home",
        image: "https://test-for-home",
      },
    ];
    const footerContent = [
      {
        id: "company",
        companyName: "Big Trees",
      },
      {
        id: "social",
        socialLinkedin: "linkedinurl",
      },
    ];

    const content = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/content")
      .query({
        page: "home",
      })
      .reply(200, homeContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const image = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/images/home/image")
      .reply(200, imageContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

    const footer = nock(
      "https://europe-west2-whitelabel-website-7d72b.cloudfunctions.net/app"
    )
      .get("/footer")
      .reply(200, footerContent, {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      });

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
    image.done();
    footer.done();
  });
});
