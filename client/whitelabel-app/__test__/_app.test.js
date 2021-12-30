import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import { default as React } from "react";
import MyApp from "../pages/_app";

let mockDate = new Date();
jest.mock("jwt-decode");
const mockJwt = require("jwt-decode");

describe("_app Navbar -- Nav items", () => {
  xit("should render dashboard link and allow user to navigate to page, if there is an admin token within localstorage", async () => {
    // window.innerWidth = 990;
    // localStorage.setItem("token", "qwerty");

    // mockJwt.mockImplementation(() => {
    //   return { exp: mockDate.getTime(), admin: true };
    // });

    render(<MyApp />);

    await screen.findAllByText("Heading 1");

    // fireEvent.click(screen.getAllByText("Dashboard")[0]);
    // screen.getByTestId("dashboard-screen");
    // await expect(jwtDecode).toHaveBeenCalled();
  });

  xit("should render not dashboard link and not allow user to navigate to page, if token out of date", async () => {
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

  xit("should render not dashboard if there is admin", async () => {
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
});

xdescribe("Name of the group", () => {
  it("should allow user to toggle the menu button to show hide sidebar", async () => {
    const { imageContent, homeContent } = contentBuilder();
    render(<HomePage content={homeContent} images={imageContent} />);
    window.innerWidth = 414;

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

xdescribe("Signout", () => {
  it("should render the sign out icon when user is signed in and allow them to sign out with a click", async () => {
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
      screen.queryAllByRole("img", { name: "sign out icon" })[0]
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getAllByRole("menuitem", { name: "sign out button" })[0]
    );
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
      screen.queryAllByRole("img", { name: "sign out icon" })[0]
    ).toBeFalsy();
  });

  it("should render error if signout fails", async () => {
    server.use(
      rest.post(
        "https://europe-west2-gav-driving-school2021.cloudfunctions.net/app/signout",
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
      screen.queryAllByRole("img", { name: "sign out icon" })[0]
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getAllByRole("menuitem", { name: "sign out button" })[0]
    );
    await screen.findByText("You have NOT been successfully signed out");
  });
});
